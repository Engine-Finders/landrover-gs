/** Central Supabase lead helpers (same system as bmwengines.uk). Server-only. */

export const LEAD_SOURCE = "landrovergarage.co.uk";
export const LEADS_PER_PAGE = 10;

const WEBHOOK_URL = process.env.SUPABASE_WEBHOOK_URL || "";
const ANON_KEY = process.env.SUPABASE_ANON_KEY || "";
// REST base is derived from the webhook host unless overridden.
const REST_URL =
  process.env.SUPABASE_REST_URL || (WEBHOOK_URL ? `${new URL(WEBHOOK_URL).origin}/rest/v1` : "");

function capacityToLitres(engineCapacity) {
  const raw = engineCapacity ? String(engineCapacity).replace(/[^\d.]/g, "") : "";
  const n = raw ? Number(raw) : NaN;
  if (!Number.isFinite(n) || n <= 0) return "";
  // DVLA returns cc (e.g. 1995); the CRM wants litres.
  return n >= 100 ? (n / 1000).toFixed(1) : String(n);
}

const str = (v) => (v === undefined || v === null ? "" : String(v).trim());

/**
 * The page a lead was submitted from, as "domain/path" (no query string, so reg plates and other
 * personal bits never end up in it). Uses the page URL the form sends, else the request's Referer;
 * anything not on this site falls back to the bare domain.
 */
export function leadSourcePage(pageUrl, referer) {
  for (const candidate of [pageUrl, referer]) {
    try {
      const u = new URL(String(candidate || ""));
      const host = u.hostname.replace(/^www\./, "");
      const isLocalDev = process.env.NODE_ENV !== "production" && host === "localhost";
      if (host !== LEAD_SOURCE && !isLocalDev) continue;
      const path = u.pathname.replace(/\/+$/, "");
      return `${isLocalDev ? u.host : LEAD_SOURCE}${path}`;
    } catch {}
  }
  return LEAD_SOURCE;
}

/** Map whatever the form posts to the Edge Function's field names. */
export function toCrmLeadPayload(p = {}, sourcePage = LEAD_SOURCE) {
  const reg = str(p.vehicle_reg || p.vehicle_vrm).replace(/\s+/g, "").toUpperCase();
  const vrm = str(p.vehicle_vrm || p.vehicle_reg).replace(/\s+/g, "").toUpperCase();
  return {
    name: str(p.name),
    email: str(p.email),
    number: str(p.number || p.phone),
    postcode: str(p.postcode),
    vehicle_brand: str(p.vehicle_brand || p.brand),
    vehicle_model: str(p.vehicle_model || p.model),
    vehicle_reg: reg,
    vehicle_vrm: vrm,
    vehicle_series: str(p.vehicle_series || p.series),
    engine_capacity: capacityToLitres(p.engine_capacity),
    fuel_type: str(p.fuel_type),
    vehicle_part: str(p.vehicle_part) || "Engine",
    description: str(p.description),
    source: LEAD_SOURCE,
    source_page: sourcePage,
  };
}

/** POST a lead to the central receive-lead Edge Function. Never throws. */
export async function sendLeadToCRM(crmPayload) {
  if (!WEBHOOK_URL || !ANON_KEY) return { ok: false, error: "Supabase is not configured" };
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${ANON_KEY}`, apikey: ANON_KEY },
      body: JSON.stringify(crmPayload),
      signal: AbortSignal.timeout(15000),
    });
    // 409 = the Edge Function already has this lead (duplicate window): nothing to retry.
    if (res.status === 409) return { ok: true, duplicate: true };
    if (!res.ok) return { ok: false, error: `receive-lead responded ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

/** One page of this site's leads, newest first, plus the total count. */
export async function fetchSiteLeads({ page = 1 } = {}) {
  if (!ANON_KEY || !REST_URL) throw new Error("Supabase is not configured");

  const get = (p) => {
    const params = new URLSearchParams({
      source: `eq.${LEAD_SOURCE}`,
      order: "createdAt.desc",
      limit: String(LEADS_PER_PAGE),
      offset: String((p - 1) * LEADS_PER_PAGE),
    });
    return fetch(`${REST_URL}/leads?${params}`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}`, Accept: "application/json", Prefer: "count=exact" },
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
  };
  // content-range looks like "0-9/42", or "*/42" when the requested page is past the end
  const totalOf = (res) => Number((res.headers.get("content-range") || "").split("/")[1]);

  let safePage = Math.max(1, Math.floor(Number(page)) || 1);
  let res = await get(safePage);

  // Page past the end (416): jump to the last real page, or return an empty list if there are no leads.
  if (res.status === 416) {
    const total = totalOf(res);
    if (Number.isFinite(total) && total > 0) {
      safePage = Math.ceil(total / LEADS_PER_PAGE);
      res = await get(safePage);
    } else {
      return { leads: [], page: 1, perPage: LEADS_PER_PAGE, total: 0, totalPages: 1 };
    }
  }
  if (!res.ok) throw new Error(`Failed to fetch leads (${res.status})`);

  const leads = await res.json();
  const total = totalOf(res);
  const count = Number.isFinite(total) ? total : Array.isArray(leads) ? leads.length : 0;
  return {
    leads: Array.isArray(leads) ? leads : [],
    page: safePage,
    perPage: LEADS_PER_PAGE,
    total: count,
    totalPages: Math.max(1, Math.ceil(count / LEADS_PER_PAGE)),
  };
}
