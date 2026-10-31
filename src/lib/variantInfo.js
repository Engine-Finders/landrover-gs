// Variant facts derived from a variant page's Sec1/Sec2/Sec3 data, shared by the variant hero and
// the costs/problems sections so every variant page renders from the data it already has.

const MODEL_SLUGS = {
  Defender: "defender-engines",
  Discovery: "discovery-engines",
  "Discovery Sport": "discovery-sport-engines",
  Freelander: "freelander-engines",
  "Range Rover": "range-rover-engines",
  "Range Rover Evoque": "range-rover-evoque-engines",
  Evoque: "range-rover-evoque-engines",
  "Range Rover Sport": "range-rover-sport-engines",
  "Range Rover Velar": "range-rover-velar-engines",
};

const clean = (s = "") => s.replace(/\s+/g, " ").trim();
const isMissing = (s = "") => /\[MISSING/i.test(s);

export function deriveVariant(data, sec2, sec3) {
  const name = clean(data.h1.split("|")[0]);
  const specs = Object.fromEntries((sec2?.specs || []).map((s) => [s.label, clean(s.value)]));
  const model = specs.Model || "";
  const at = model ? name.indexOf(model) : -1;
  const short = at >= 0 ? clean(name.slice(at + model.length)) || name : name;

  const cards = sec3?.cards || [];
  const codes = [...new Set(cards.map((c) => clean((c.code || "").replace(/\([^)]*\)/g, ""))).filter((c) => c && !isMissing(c)))];
  let engineCode = codes.slice(0, 3).join(" / ");
  if (codes.length > 3) engineCode += ` +${codes.length - 3} more`;
  if (!engineCode && specs.Engine && !isMissing(specs.Engine)) engineCode = specs.Engine;

  const prices = cards.map((c) => Number(String(c.price || "").replace(/[^\d]/g, ""))).filter(Boolean);
  const fmt = (n) => `£${n.toLocaleString("en-GB")}`;
  const min = prices.length ? Math.min(...prices) : null;
  const max = prices.length ? Math.max(...prices) : null;
  const priceText = min ? (max > min ? `${fmt(min)} to ${fmt(max)}` : fmt(min)) : specs["Rebuild From"] || "";

  const cap = (specs.Capacity || "").match(/^(\d\.\d)L/);
  const fuelRaw = (specs.Fuel || "").toLowerCase();
  const fuel = /plug-in|phev/.test(fuelRaw) ? "plug-in hybrid" : fuelRaw.startsWith("diesel") ? "diesel" : fuelRaw.startsWith("petrol") ? "petrol" : "";
  const engineDesc = [cap ? `${cap[1]}-litre` : "", fuel].filter(Boolean).join(" ");

  const gens = new Set(cards.map((c) => c.generation).filter(Boolean)).size || 1;

  return {
    name,
    rebuildFrom: min,
    family: resolveFamily(cards, specs),
    short,
    model,
    modelHref: MODEL_SLUGS[model] ? `/${MODEL_SLUGS[model]}` : "/models",
    engineHref: cards.find((c) => c.codeHref)?.codeHref || null,
    engineCode,
    priceText,
    engineDesc,
    gens,
    carImage: (sec3?.carImage || "").replace("/cars/card/", "/cars/") || null,
  };
}

// Engine family key into src/data/shared/engineGuide.json. Uses the first engine-page link on the
// variant, falling back to the engine code text for variants without one.
const FAMILY_BY_HREF = {
  "/landrover-200tdi-engine": "200tdi",
  "/landrover-300tdi-engine": "300tdi",
  "/landrover-td5-engine": "td5",
  "/landrover-m47d20-bmw-sourced-engine": "m47",
  "/landrover-rover-k-series-engine": "kseries",
  "/landrover-aj41-engine": "aj41",
  "/landrover-tdv6-sdv6-engine": "tdv6",
  "/landrover-tdv8-sdv8-engine": "tdv8",
  "/landrover-ford-duratorq-engine": "duratorq",
  "/landrover-ford-ecoboost-engine": "ecoboost",
  "/landrover-aj150d-engine": "aj200d",
  "/landrover-aj200d-engine": "aj200d",
  "/landrover-aj200p-engine": "aj200p",
  "/landrover-aj300d-engine": "aj300d",
  "/landrover-aj300p-engine": "aj300p",
  "/landrover-aj133-engine": "aj133",
  "/landrover-aj-v8-engine": "aj133",
  "/landrover-n63-engine": "n63",
  "/landrover-s68-engine": "s68",
};

function resolveFamily(cards, specs) {
  const href = cards.map((c) => c.codeHref).find((h) => FAMILY_BY_HREF[h]);
  if (href) return FAMILY_BY_HREF[href];
  const text = `${cards.map((c) => c.code).join(" ")} ${specs.Engine || ""} ${specs.Capacity || ""}`;
  if (/AJ-?V6/i.test(text)) return "ajv6";
  if (/1\.5L|I3/i.test(text)) return "i3phev";
  if (/AJ300/i.test(text)) return "aj300p";
  if (/2\.5L V6/i.test(text)) return "kv6";
  return null;
}
