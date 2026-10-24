// Display name for a looked-up vehicle: the registry gives upper-case "BMW" / "320I M SPORT".
// Returns { title: "BMW 3 Series", subtitle: "320i M Sport" } (subtitle only when the model is a
// BMW or Mercedes variant code), otherwise { title: "Land Rover Discovery Sport", subtitle: "" }.

const KEEP_UPPER = new Set(["GLA", "GLB", "GLC", "GLE", "GLS", "CLA", "CLB", "CLS", "CLK", "SLK", "SLC", "AMG", "HSE", "SVR", "GTI", "TDI", "TSI", "CDI", "TFSI", "SUV", "MHEV", "PHEV"]);

function word(w) {
  if (KEEP_UPPER.has(w.toUpperCase())) return w.toUpperCase();
  if (/^\d+[A-Za-z]{1,2}$/.test(w) || /^[A-Za-z]\d+[A-Za-z]{0,2}$/.test(w)) {
    return w.replace(/^(\d+|[A-Za-z]\d+)([A-Za-z]*)$/, (_, a, b) => a.toUpperCase() + b.toLowerCase());
  }
  if (/\d/.test(w)) return w.toUpperCase();
  if (w.length <= 2) return w.toUpperCase();
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
}

const titleCase = (s) =>
  String(s || "")
    .trim()
    .split(/([\s-]+)/)
    .map((p) => (/^[\s-]+$/.test(p) ? p : word(p)))
    .join("");

function makeName(make, model = "") {
  const m = String(make || "").trim();
  if (/^rover$/i.test(m) && /range\s*rover|discovery|defender|freelander/i.test(model)) return "Land Rover";
  if (/^mercedes/i.test(m)) return "Mercedes-Benz";
  if (/^land\s?rover$/i.test(m)) return "Land Rover";
  if (m.length <= 3) return m.toUpperCase();
  return titleCase(m);
}

export function vehicleTitle(make, model) {
  const brand = makeName(make, model);
  const m = String(model || "").trim();
  // Range Rover is its own marque: "Range Rover Sport", not "Land Rover Range Rover Sport"
  if (/^range\s*rover(\s|$)/i.test(m) && /rover/i.test(make)) return { title: titleCase(m), subtitle: "" };
  const bmw = /bmw/i.test(make) && m.match(/^([1-8])\d{2}[A-Za-z]{0,2}\b/);
  if (bmw) return { title: `${brand} ${bmw[1]} Series`, subtitle: titleCase(m) };
  const merc = /mercedes/i.test(make) && m.match(/^([ABCEGSVX])\s?\d{2,3}\b/i);
  if (merc) return { title: `${brand} ${merc[1].toUpperCase()}-Class`, subtitle: titleCase(m) };
  const gl = /mercedes/i.test(make) && m.match(/^(GLA|GLB|GLC|GLE|GLS|CLA|CLS|CLK|SLK|SLC)\s?\d{0,3}\b/i);
  if (gl) return { title: `${brand} ${gl[1].toUpperCase()}`, subtitle: titleCase(m) };
  return { title: [brand, titleCase(m)].filter(Boolean).join(" "), subtitle: "" };
}
