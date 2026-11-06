import { randomUUID } from "node:crypto";
import { SITE_URL } from "@/lib/site";

const SITE_HOST = new URL(SITE_URL).hostname.replace(/^www\./, "");
const SITE_NAME = {
  "jaguargarage.uk": "Jaguar Garage",
  "landrovergarage.co.uk": "Land Rover Garage",
  "mercedesgarage.uk": "Mercedes Garage",
  "bmwgarage.uk": "BMW Garage",
}[SITE_HOST] || "Garage";
const LOGO_PATH = "/brand/logo-icon-light.png";
const NOT_PROVIDED = "Not provided";

const TEMPLATE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Quote Request</title></head>
<body style="margin:0;padding:18px 8px;background:#eaf0f7;font-family:Arial,Helvetica,sans-serif;color:#101b2d">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(17,39,70,.16)">
      <tr><td style="background:#071d37;padding:14px 16px;color:#fff"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="padding-right:4px"><img src="{{LOGO_URL}}" alt="{{SITE_NAME}}" width="34" height="34" style="display:block;width:34px;height:34px;object-fit:contain;border:0;outline:none;text-decoration:none"></td>
        <td valign="middle" style="padding-left:4px"><div style="font-size:18px;line-height:21px;font-weight:800;letter-spacing:-.2px;color:#fff">{{SITE_NAME}}</div></td>
      </tr></table></td></tr>
      <tr><td style="padding:16px 12px 4px;background:#fff">
        <div style="font-size:21px;line-height:25px;font-weight:800;letter-spacing:-.2px;color:#08224b">New Quote Request</div>
        <div style="font-size:14px;line-height:19px;color:#53627a;padding-top:1px">A new enquiry has been submitted from your <span style="color:#075ccf;font-weight:700">{{SUBMISSION_CHANNEL}}</span>.</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:18px 0 14px;border-top:1px solid #dce5f0"><tr><td style="padding-top:11px;font-size:14px;line-height:19px;color:#53627a">Source: <a href="{{HEADER_SOURCE_URL}}" style="color:#075ccf;text-decoration:underline;font-weight:700">{{HEADER_SOURCE}}</a></td></tr></table>
        {{LEAD_CARD}}{{VEHICLE_CARD}}{{SOURCE_CARD}}
      </td></tr>
      <tr><td style="padding:12px 16px;background:#071d37;color:#fff"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="font-size:14px;line-height:20px;font-weight:700">Lead Reference: <span style="color:#42c8fb">{{LEAD_REFERENCE}}</span></td><td align="right" style="font-size:13px;line-height:20px;color:#eef7ff">&#128197; Received: {{RECEIVED_UK}}</td></tr></table></td></tr>
    </table>
  </td></tr></table>
</body></html>`;

function text(value) { return value === undefined || value === null ? "" : String(value).trim(); }
function displayValue(value) { return text(value) || NOT_PROVIDED; }
function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;"); }
function row(label, value) { return `<tr><td valign="top" width="39%" style="padding:9px 12px 9px 14px;background:#f4f8fd;color:#101b2d;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;font-weight:700">${escapeHtml(label)}</td><td valign="top" style="padding:9px 14px;background:#fff;color:#172238;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;overflow-wrap:anywhere">${escapeHtml(displayValue(value)).replace(/\r?\n/g, "<br>")}</td></tr>`; }
function linkRow(label, value, href) { const safe = displayValue(value); return safe === NOT_PROVIDED || !href ? row(label, safe) : `<tr><td valign="top" width="39%" style="padding:9px 12px 9px 14px;background:#f4f8fd;color:#101b2d;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;font-weight:700">${escapeHtml(label)}</td><td valign="top" style="padding:9px 14px;background:#fff;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;overflow-wrap:anywhere"><a href="${escapeHtml(href)}" style="color:#075ccf;text-decoration:underline;font-weight:700">${escapeHtml(safe)}</a></td></tr>`; }
function registrationRow(value) { const registration = text(value); return !registration ? row("Vehicle Reg", "") : `<tr><td valign="top" width="39%" style="padding:9px 12px 9px 14px;background:#f4f8fd;color:#101b2d;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;font-weight:700">Vehicle Reg</td><td valign="top" style="padding:9px 14px;background:#fff;border-bottom:1px solid #b9cce2"><span style="display:inline-block;min-width:126px;padding:3px 12px;background:#ffda18;border:1px solid #bf9100;border-radius:4px;color:#111827;font-size:18px;line-height:22px;font-weight:800;letter-spacing:1px;text-align:center">${escapeHtml(registration.toUpperCase())}</span></td></tr>`; }
function sectionCard(title, icon, rows) { return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 8px;border:1px solid #93b0d1;border-radius:8px;overflow:hidden"><tr><td style="padding:8px 10px;background:#071d37;color:#fff;font-size:16px;line-height:20px;font-weight:700">${icon}<span style="padding-left:7px">${escapeHtml(title)}</span></td></tr><tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">${rows}</table></td></tr></table>`; }
function formatEngineCapacity(value) { const raw = text(value).replace(/,/g, ""); if (!raw) return ""; const litres = raw.match(/^(\d+(?:\.\d{1,2})?)\s*l(?:itre|iter)?$/i); if (litres) { const n = Number(litres[1]); return n >= .5 && n <= 10 ? `${n.toFixed(1)} L` : ""; } const cc = raw.match(/^(\d{3,5})(?:\s*cc|\s*cm3)?$/i); if (!cc) return ""; const n = Number(cc[1]); return n >= 500 && n <= 10000 ? `${n.toLocaleString("en-GB")} cc (${(n / 1000).toFixed(1)} L)` : ""; }
function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
function sourcePageUrl(sourcePage) { try { const url = new URL(sourcePage.startsWith("http") ? sourcePage : `https://${sourcePage}`); return url.protocol === "https:" && url.hostname.replace(/^www\./, "") === SITE_HOST ? url.toString() : ""; } catch { return ""; } }
function receivedAtUk() { return `${new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/London" }).format(new Date())} (UK)`; }
function formatHtmlForMailTransport(html) { return html.replace(/>\s*</g, ">\r\n<"); }
function additionalInformationValues(lead) { const values = []; const product = text(lead.vehiclePart || lead.product || lead.enquiryType); const note = text(lead.description || lead.additionalInformation || lead.note); const engine = [formatEngineCapacity(lead.engineCapacity), text(lead.fuelType), text(lead.engineCode || lead.engine || lead.engineModel)].filter(Boolean); if (product) values.push(`Product enquiry: ${product}`); if (engine.length) values.push(`Engine specifications: ${engine.join(" · ")}`); if (lead.fitting) values.push(`Fitting: ${text(lead.fitting)}`); if (note) values.push(`Customer notes: ${note}`); return values; }
function subjectParts(lead) { const clean = (value) => text(value).replace(/[\r\n|]+/g, " ").replace(/\s+/g, " ").trim(); const vehicle = [clean(lead.vehicleBrand), clean(lead.vehicleModel)].filter(Boolean).join(" "); const registration = clean(lead.vehicleVrm).replace(/\s+/g, "").toUpperCase(); return [vehicle, registration].filter(Boolean); }

export function renderUniversalLeadEmail(lead = {}) {
  const sourcePage = text(lead.sourcePage || `${SITE_URL}/`);
  const pageUrl = sourcePageUrl(sourcePage);
  const email = text(lead.email); const phone = text(lead.number || lead.phone);
  const registration = text(lead.vehicleVrm || lead.vehicleReg).replace(/\s+/g, "").toUpperCase();
  const capacity = formatEngineCapacity(lead.engineCapacity);
  const reference = `#${SITE_HOST.split(".")[0].toUpperCase()}-${randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;
  const received = receivedAtUk(); const logoUrl = new URL(LOGO_PATH, SITE_URL).toString();
  const subject = ["New Lead", SITE_NAME, ...subjectParts({ ...lead, vehicleVrm: registration })].join(" ");
  const leadRows = [row("Name", lead.name), linkRow("Email", email, validEmail(email) ? `mailto:${encodeURIComponent(email)}` : ""), linkRow("Phone Number", phone, phone ? `tel:${encodeURIComponent(phone.replace(/\s+/g, ""))}` : ""), row("Postcode", lead.postcode), row("Additional Information", additionalInformationValues(lead).join("\n"))].join("");
  const vehicleRows = [registrationRow(registration), row("Vehicle Make", lead.vehicleBrand), row("Vehicle Model", lead.vehicleModel), row("Vehicle Year", lead.vehicleYear), row("Engine Capacity", capacity), row("Fuel Type", lead.fuelType)].join("");
  const sourceRows = [linkRow("Source", SITE_HOST, `https://${SITE_HOST}`), pageUrl ? linkRow("Page", sourcePage, pageUrl) : row("Page", sourcePage || SITE_HOST)].join("");
  const channel = `${text(lead.leadSource)} ${sourcePage}`.toLowerCase().includes("blog") ? "blog" : "website";
  const headerSource = `${text(lead.leadSource).replace(/[-_]+/g, " ") || "Website"} · ${sourcePage.replace(/^https?:\/\//, "") || SITE_HOST}`;
  const html = formatHtmlForMailTransport(TEMPLATE.replace(/{{SITE_NAME}}/g, escapeHtml(SITE_NAME)).replace("{{LOGO_URL}}", escapeHtml(logoUrl)).replace("{{HEADER_SOURCE}}", escapeHtml(headerSource)).replace("{{HEADER_SOURCE_URL}}", escapeHtml(pageUrl || `https://${SITE_HOST}`)).replace("{{SUBMISSION_CHANNEL}}", escapeHtml(channel)).replace("{{LEAD_CARD}}", sectionCard("LEAD DETAILS", "&#128100;", leadRows)).replace("{{VEHICLE_CARD}}", sectionCard("VEHICLE DETAILS", "&#128663;", vehicleRows)).replace("{{SOURCE_CARD}}", sectionCard("SOURCE", "&#128279;", sourceRows)).replace("{{LEAD_REFERENCE}}", escapeHtml(reference)).replace("{{RECEIVED_UK}}", escapeHtml(received)));
  const textBody = ["NEW QUOTE REQUEST", SITE_NAME, "", "LEAD DETAILS", `Name: ${displayValue(lead.name)}`, `Email: ${displayValue(email)}`, `Phone Number: ${displayValue(phone)}`, `Postcode: ${displayValue(lead.postcode)}`, `Additional Information: ${displayValue(additionalInformationValues(lead).join("\n"))}`, "", "VEHICLE DETAILS", `Vehicle Reg: ${displayValue(registration)}`, `Vehicle Make: ${displayValue(lead.vehicleBrand)}`, `Vehicle Model: ${displayValue(lead.vehicleModel)}`, `Vehicle Year: ${displayValue(lead.vehicleYear)}`, `Engine Capacity: ${displayValue(capacity)}`, `Fuel Type: ${displayValue(lead.fuelType)}`, "", "SOURCE INFORMATION", `Source: ${SITE_HOST} (${SITE_URL})`, `Page: ${sourcePage || SITE_HOST}`, "", `Lead reference: ${reference}`, `Received: ${received}`].join("\n");
  return { html, text: textBody, subject };
}
