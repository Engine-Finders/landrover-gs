import { sendLeadToCRM, toCrmLeadPayload, leadSourcePage } from "@/lib/leads";
import { renderUniversalLeadEmail } from "@/lib/universalLeadEmail";

async function sendRelay(email, to, cc) {
  if (!String(to || "").trim()) return { ok: false, error: "mail recipient is not configured" };

  try {
    const body = {
      to,
      fromAddress: process.env.MAIL_FROM_ADDRESS,
      fromName: process.env.MAIL_FROM_NAME,
      subject: email.subject,
      html: email.html,
    };
    if (String(cc || "").trim()) body.cc = cc;

    const res = await fetch(process.env.MAIL_RELAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Relay-Secret": process.env.MAIL_RELAY_SECRET,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    });
    if (res.ok) return { ok: true };
    const details = (await res.text().catch(() => "")).trim();
    return { ok: false, error: `relay responded ${res.status}${details ? `: ${details.slice(0, 500)}` : ""}` };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function sendLeadEmail(payload, sourcePage) {
  const email = renderUniversalLeadEmail({
    name: payload.name,
    email: payload.email,
    number: payload.number || payload.phone,
    postcode: payload.postcode,
    description: payload.description,
    vehicleVrm: payload.vehicle_vrm || payload.vehicle_reg,
    vehicleBrand: payload.vehicle_brand || payload.brand,
    vehicleModel: payload.vehicle_model || payload.model || payload.vehicle_series,
    vehicleYear: payload.year || payload.vehicle_year,
    engineCapacity: payload.engine_capacity,
    fuelType: payload.fuel_type,
    sourcePage,
  });

  return sendRelay(email, process.env.MAIL_TO_ADDRESS, process.env.MAIL_CC_ADDRESS);
}

export async function POST(request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ status: "error", message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend it worked, send nothing.
  if (payload.honeypot) return Response.json({ status: "success" });

  const sourcePage = leadSourcePage(payload.page_url, request.headers.get("referer"));
  const crmPayload = toCrmLeadPayload(payload, sourcePage);
  if (!crmPayload.email && !crmPayload.number) {
    return Response.json({ status: "error", message: "Email or phone number is required." }, { status: 400 });
  }

  // Email (+ cc) and the central CRM both get the lead, independently.
  const [emailResult, crmResult] = await Promise.all([sendLeadEmail(payload, sourcePage), sendLeadToCRM(crmPayload)]);

  if (!emailResult.ok) console.error("lead email failed:", emailResult.error);
  if (!crmResult.ok) console.error("lead CRM failed:", crmResult.error);

  if (!emailResult.ok && !crmResult.ok) {
    return Response.json({ status: "error", message: "Failed to submit lead." }, { status: 502 });
  }

  return Response.json({ status: "success" });
}
