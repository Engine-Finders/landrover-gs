import { randomUUID } from "node:crypto";
import { SITE_URL } from "@/lib/site";

const SITE_NAME = "Land Rover Garage";
const ENGINE_PATH = "/home/engine-core.webp";
const NOT_PROVIDED = "Not provided";

const UNIVERSAL_EMAIL_TEMPLATE = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Quote Request</title></head><body style="margin:0;padding:18px 8px;background:#eaf0f7;font-family:Arial,Helvetica,sans-serif;color:#101b2d"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden"><tr><td style="background:#071d37;padding:0;color:#fff"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td valign="top" style="padding:20px 8px 18px 24px"><img src="{{LOGO_URL}}" alt="{{SITE_NAME}}" width="190" style="display:block;width:190px;max-width:100%;height:auto;border:0"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px"><tr><td width="38" height="38" align="center" valign="middle" style="width:38px;height:38px;background:#0b9fea;border:1px solid #61c7fb;border-radius:8px;font-size:21px;line-height:38px;color:#fff">&#9993;</td><td style="padding-left:11px"><div style="font-size:24px;line-height:28px;font-weight:700;color:#fff">New Quote Request</div><div style="font-size:14px;line-height:19px;color:#d6e8f7;padding-top:3px">A new enquiry has been submitted from your website.</div></td></tr></table></td><td width="170" align="right" valign="bottom" style="width:170px;padding:10px 14px 0 0"><img src="{{ENGINE_IMAGE_URL}}" alt="Engine" width="150" style="display:block;width:150px;max-width:100%;height:auto;border:0"></td></tr></table></td></tr><tr><td style="padding:18px 24px 8px;background:#fff">{{LEAD_CARD}}{{VEHICLE_CARD}}{{SOURCE_CARD}}</td></tr><tr><td style="padding:18px 24px;background:#071d37;color:#fff"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="font-size:14px;line-height:20px;font-weight:700">Lead Reference: <span style="color:#42c8fb">{{LEAD_REFERENCE}}</span></td><td align="right" style="font-size:13px;line-height:20px;color:#eef7ff">&#128197; Received: {{RECEIVED_UK}}</td></tr></table></td></tr></table></td></tr></table></body></html>';

function escapeHtml(value) {
  return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function displayValue(value) {
  return String(value || "").trim() || NOT_PROVIDED;
}
function row(label, value) {
  return '<tr><td valign="top" width="39%" style="padding:9px 12px 9px 14px;background:#f4f8fd;color:#101b2d;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;font-weight:700">' + escapeHtml(label) + '</td><td valign="top" style="padding:9px 14px;background:#fff;color:#172238;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;overflow-wrap:anywhere">' + escapeHtml(displayValue(value)).replace(/\r?\n/g, "<br>") + "</td></tr>";
}
function linkRow(label, text, href) {
  const safeText = displayValue(text);
  if (safeText === NOT_PROVIDED || !href) return row(label, safeText);
  return '<tr><td valign="top" width="39%" style="padding:9px 12px 9px 14px;background:#f4f8fd;color:#101b2d;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;font-weight:700">' + escapeHtml(label) + '</td><td valign="top" style="padding:9px 14px;background:#fff;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;overflow-wrap:anywhere"><a href="' + escapeHtml(href) + '" style="color:#075ccf;text-decoration:underline;font-weight:700">' + escapeHtml(safeText) + "</a></td></tr>";
}
function registrationRow(value) {
  const registration = String(value || "").trim();
  if (!registration) return row("Vehicle Reg", "");
  return '<tr><td valign="top" width="39%" style="padding:9px 12px 9px 14px;background:#f4f8fd;color:#101b2d;border-bottom:1px solid #b9cce2;font-size:14px;line-height:20px;font-weight:700">Vehicle Reg</td><td valign="top" style="padding:9px 14px;background:#fff;border-bottom:1px solid #b9cce2"><span style="display:inline-block;min-width:126px;padding:3px 12px;background:#ffda18;border:1px solid #bf9100;border-radius:4px;color:#111827;font-size:18px;line-height:22px;font-weight:800;letter-spacing:1px;text-align:center">' + escapeHtml(registration.toUpperCase()) + "</span></td></tr>";
}
function sectionCard(title, icon, rows) {
  return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 20px;border:1px solid #93b0d1;border-radius:10px;overflow:hidden"><tr><td style="padding:10px 14px;background:#071d37;color:#fff;font-size:18px;line-height:22px;font-weight:700">' + icon + '<span style="padding-left:10px">' + escapeHtml(title) + '</span></td></tr><tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">' + rows + "</table></td></tr></table>";
}
function formatEngineCapacity(value) {
  const raw = String(value || "").trim().replace(/,/g, "");
  if (!raw) return "";
  const match = raw.match(/\d+(?:\.\d+)?/);
  if (!match) return "";
  const numericValue = Number(match[0]);
  if (!Number.isFinite(numericValue) || numericValue <= 0) return "";
  const isLitres = /litre|liter|\bl\b|l$/i.test(raw) && numericValue <= 20;
  const capacityCc = isLitres ? Math.round(numericValue * 1000) : Math.round(numericValue);
  if (capacityCc < 500 || capacityCc > 20000) return "";
  return capacityCc.toLocaleString("en-GB") + " cc (" + (capacityCc / 1000).toFixed(1) + "L)";
}
function receivedAtUk(date) {
  const formatted = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
  return formatted.replace(", ", " at ") + " (UK)";
}
function formatHtmlForMailTransport(html) {
  return html.replace(/>\s*</g, ">\r\n<");
}

export function renderUniversalLeadEmail(lead = {}) {
  const sourcePage = String(lead.sourcePage || SITE_URL + "/");
  const domain = new URL(SITE_URL).hostname;
  const logoUrl = new URL("/brand/logo-rectangular-light.webp", SITE_URL).toString();
  const engineImageUrl = new URL(ENGINE_PATH, SITE_URL).toString();
  const email = String(lead.email || "").trim();
  const phone = String(lead.number || lead.phone || "").trim();
  const additionalInformation = [lead.description, lead.engineCode ? "Engine code: " + lead.engineCode : "", lead.fitting ? "Fitting: " + lead.fitting : ""].filter(Boolean).join("\n");
  const engineCapacity = formatEngineCapacity(lead.engineCapacity);
  const reference = "#" + domain.split(".")[0].toUpperCase() + "-" + randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  const received = receivedAtUk(new Date());
  const vehicleName = [lead.vehicleBrand, lead.vehicleModel].filter(Boolean).join(" ").trim();
  const subject = ["New Lead", SITE_NAME, vehicleName, lead.vehicleVrm].filter(Boolean).join(" | ");
  const leadRows = [row("Name", lead.name), linkRow("Email", email, email ? "mailto:" + encodeURIComponent(email) : ""), linkRow("Phone Number", phone, phone ? "tel:" + encodeURIComponent(phone.replace(/\s+/g, "")) : ""), row("Postcode", lead.postcode), row("Additional Information", additionalInformation)].join("");
  const vehicleRows = [registrationRow(lead.vehicleVrm), row("Vehicle Make", lead.vehicleBrand), row("Vehicle Model", lead.vehicleModel), row("Vehicle Year", lead.vehicleYear), row("Engine Capacity", engineCapacity), row("Fuel Type", lead.fuelType)].join("");
  const sourceRows = [linkRow("Source", domain, SITE_URL), linkRow("Page", sourcePage, sourcePage)].join("");
  const html = formatHtmlForMailTransport(UNIVERSAL_EMAIL_TEMPLATE.replace(/{{SITE_NAME}}/g, escapeHtml(SITE_NAME)).replace("{{LOGO_URL}}", escapeHtml(logoUrl)).replace("{{ENGINE_IMAGE_URL}}", escapeHtml(engineImageUrl)).replace("{{LEAD_CARD}}", sectionCard("LEAD DETAILS", "&#128100;", leadRows)).replace("{{VEHICLE_CARD}}", sectionCard("VEHICLE DETAILS", "&#128663;", vehicleRows)).replace("{{SOURCE_CARD}}", sectionCard("SOURCE", "&#128279;", sourceRows)).replace("{{LEAD_REFERENCE}}", escapeHtml(reference)).replace("{{RECEIVED_UK}}", escapeHtml(received)));
  const text = [SITE_NAME + " - New Quote Request", "", "LEAD DETAILS", "Name: " + displayValue(lead.name), "Email: " + displayValue(email), "Phone Number: " + displayValue(phone), "Postcode: " + displayValue(lead.postcode), "Additional Information: " + displayValue(additionalInformation), "", "VEHICLE DETAILS", "Vehicle Reg: " + displayValue(lead.vehicleVrm), "Vehicle Make: " + displayValue(lead.vehicleBrand), "Vehicle Model: " + displayValue(lead.vehicleModel), "Vehicle Year: " + displayValue(lead.vehicleYear), "Engine Capacity: " + displayValue(engineCapacity), "Fuel Type: " + displayValue(lead.fuelType), "", "SOURCE INFORMATION", "Source: " + domain + " (" + SITE_URL + ")", "Page: " + sourcePage, "", "Lead reference: " + reference, "Received: " + received].join("\n");
  return { html, text, subject };
}

