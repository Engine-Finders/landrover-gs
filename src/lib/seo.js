// Shared meta helpers so every page title / description stays within SERP limits.
export function clipDescription(text = "", max = 160) {
  const t = String(text).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return cut.slice(0, sp > 100 ? sp : max - 1).replace(/[\s,;:–—-]+$/, "") + "…";
}

const BRAND = "Land Rover Garage";
export function withBrand(title = "") {
  const t = title.trim();
  if (t.includes(BRAND)) return t;
  const full = `${t} | ${BRAND}`;
  return full.length <= 65 ? full : t;
}
