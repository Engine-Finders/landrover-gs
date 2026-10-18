// Picks the part / failure photo in /public/parts that matches the problem a heading or paragraph is about.
// The match is driven by the file names (partIndex.json is generated from them by scripts/build-part-index.mjs),
// so adding a photo named after a part needs no code change. SYNONYMS only bridges the words a customer-facing
// heading uses ("big end", "turbo", "oil leak") to the part's file name. No match -> null, so the caller keeps
// its normal image instead of showing a wrong part.
import index from "./partIndex.json";

const singular = (w) => (w.endsWith("ies") ? w.slice(0, -3) + "y" : w.endsWith("ss") || !w.endsWith("s") ? w : w.slice(0, -1));
const normalise = (text) =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map(singular)
    .join(" ");

const SYNONYMS = {
  "big end": "connecting-rod-bearing",
  "rod bearing": "connecting-rod-bearing",
  "con rod": "connecting-rod-bearing",
  "main bearing": "crankshaft-bearing",
  bearing: "crankshaft-bearing",
  "valve seal": "valve-stem-seal",
  stripped: "cylinder-head",
  "engine block": "cylinder-head",
  "parts & components": "crankshaft",
  hpfp: "high-pressure-fuel-pump",
  "fuel pump": "high-pressure-fuel-pump",
  cambelt: "timing-belt",
  turbo: "turbocharger",
  timing: "timing-chain-kit",
  chain: "timing-chain-kit",
  tensioner: "timing-chain-kit",
  gasket: "head-gasket",
  seal: "head-gasket",
  "oil leak": "valve-cover-gasket",
  "oil seal": "valve-cover-gasket",
  coolant: "coolant-expansion-tank",
  overheat: "radiator",
  "oil pressure": "oil-pump-assembly",
  dpf: "diesel-particulate-filter",
  particulate: "diesel-particulate-filter",
  egr: "egr-valve",
  injector: "fuel-injector",
  liner: "cylinder-liner",
  bore: "cylinder-liner",
  mechatronic: "gearbox-mechatronic-unit",
  gearbox: "gearbox-mechatronic-unit",
  transmission: "gearbox-mechatronic-unit",
};

const byBase = Object.fromEntries(index.map((e) => [e.base, e]));
const ENTRIES = [
  ...index.flatMap((e) => e.phrases.map((p) => [p, e.base])),
  ...Object.entries(SYNONYMS)
    .filter(([, base]) => byBase[base])
    .map(([p, base]) => [normalise(p), base]),
];

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

function matchesIn(clause) {
  const t = ` ${normalise(clause)} `;
  const found = [];
  for (const [phrase, base] of ENTRIES) {
    const at = t.indexOf(` ${phrase} `);
    if (at >= 0) found.push({ base, start: at, end: at + phrase.length });
  }
  return found;
}

// The first clause of a heading ("Timing Chain & Injector Seal Wear" -> "Timing Chain") is the main problem. Inside it the
// earliest term wins, but when terms overlap ("cylinder head gasket") the one naming the part itself (ending last) wins.
function bestBase(text) {
  for (const clause of String(text || "").split(/&|,|;|\/| and | with /i)) {
    const found = matchesIn(clause).sort((a, b) => a.start - b.start || b.end - a.end);
    if (!found.length) continue;
    const first = found[0];
    const group = found.filter((f) => f.start < first.end);
    return group.reduce((a, b) => (b.end > a.end ? b : a)).base;
  }
  return null;
}

const urlFor = (base, seed) => {
  const files = byBase[base].files;
  return `/parts/${files[hash(seed) % files.length]}.webp`;
};

/** First of the given texts (heading, highlighted term, body ...) that names a part gets its photo; else `fallback`. */
export function partImageFor(texts, fallback = null) {
  for (const text of [].concat(texts)) {
    const base = bestBase(text);
    if (base) return urlFor(base, normalise(text));
  }
  return fallback;
}

// Engine components shown together where no single failure is being discussed (floating parts around the engine).
const FEATURED = ["head-gasket", "timing-chain-kit", "connecting-rod-bearing", "camshaft", "valve-cover-gasket", "crankshaft-bearing",
  "water-pump", "oil-pump-assembly", "turbocharger", "crankshaft-pulley", "rocker-arm", "cylinder-liner", "timing-cover-gasket"];

/** `count` distinct part photos: the parts named in `texts` first (in order), then the featured engine components. */
export function floatingParts(texts = [], count = 11) {
  const picked = [];
  const add = (base) => base && !picked.includes(base) && byBase[base] && picked.push(base);
  texts.forEach((t) => add(bestBase(t)));
  FEATURED.forEach(add);
  return picked.slice(0, count).map((b, i) => urlFor(b, b + i));
}
