const esc = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ status: "error", message: "Invalid request." }, { status: 400 });
  }

  const rows = Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `<tr><td style="font-weight:bold;padding:4px 12px 4px 0;">${esc(key)}</td><td>${esc(value)}</td></tr>`)
    .join("");

  const emailResult = await fetch(process.env.MAIL_RELAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Relay-Secret": process.env.MAIL_RELAY_SECRET,
    },
    body: JSON.stringify({
      to: process.env.MAIL_TO_ADDRESS,
      cc: process.env.MAIL_CC_ADDRESS,
      fromAddress: process.env.MAIL_FROM_ADDRESS,
      fromName: process.env.MAIL_FROM_NAME,
      subject: "New Quote Request - Land Rover Garage",
      html: `<h2>New Quote Request</h2><table>${rows}</table>`,
    }),
  })
    .then((res) => (res.ok ? { ok: true } : { ok: false, error: `relay responded ${res.status}` }))
    .catch((err) => ({ ok: false, error: err.message }));

  const webhookResult = await fetch(process.env.SUPABASE_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ ...payload, source_site: "landrover-garage", created_at: new Date().toISOString() }),
  })
    .then(() => ({ ok: true }))
    .catch((err) => ({ ok: false, error: err.message }));

  if (!emailResult.ok && !webhookResult.ok) {
    return Response.json({ status: "error", message: "Failed to submit lead." }, { status: 502 });
  }

  return Response.json({ status: "success" });
}
