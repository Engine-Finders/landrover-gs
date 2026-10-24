// Strict tiered matcher that picks the closest front-angle photo for the details returned by the
// registration lookup. Port of the v2 matcher in VEHICLE_IMAGE_MATCHING_IMPLEMENTATION.md
// (originally vehicle-image.php on enginefinders.co.uk); the photo file NAME is the data.
//
// Priority (strict):
//   1. MAKE must match the photo's brand, otherwise nothing is returned.
//   2. Within that brand, the same MODEL first, then the same VARIANT, then the closest YEAR.
//   3. If the model is not in the library, any photo of the brand (closest year), tier "brand".

const NON_IDENTITY = new Set([
  "petrol", "diesel", "hybrid", "electric", "mhev", "phev", "hev",
  "lpg", "cng", "biofuel", "ethanol", "automatic", "manual", "auto",
  "cvt", "awd", "fwd", "rwd", "4wd", "2wd", "hatchback", "estate",
  "saloon", "suv", "coupe", "convertible", "roadster", "mpv", "van",
  "pickup", "door", "doors", "special", "standard", "new",
]);

// Mercedes files that start with the model name instead of "mercedes-benz-".
const MERCEDES_BRANDLESS = new Set([
  "a", "b", "c", "e", "g", "s", "v", "x", "cla", "clb", "clc", "clk", "cls", "gla", "glb",
  "glc", "gle", "gls", "sl", "slc", "slk", "citan", "vito", "amggt", "sprinter",
  "eqa", "eqb", "eqc", "eqe", "eqs", "eqv",
]);

const alnum = (v) => String(v).toLowerCase().replace(/[^a-z0-9]/g, "");

/** Lower-case word list, order kept, with non-identity words (petrol, automatic ...) removed. */
function tokens(value) {
  const parts = String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
  return parts.filter((p) => !NON_IDENTITY.has(p));
}

/** Normalises the make from the lookup into the brand key used for files. */
function brandKey(make, series) {
  const k = alnum(make);
  if (!k) return "";
  const aliases = {
    mercedes: "mercedesbenz", merc: "mercedesbenz", mercedesbenz: "mercedesbenz",
    vw: "volkswagen",
    landrover: "landrover", rangerover: "landrover",
  };
  if (aliases[k]) return aliases[k];
  // Old Range Rovers / Discoverys / Defenders are registered under the make "ROVER".
  if (k === "rover" && /range\s*rover|discovery|defender|freelander/i.test(series)) return "landrover";
  return k;
}

/** Brand key of an image file, from the first part of its name. */
function fileBrand(filename) {
  const k = alnum(filename.split("-")[0]);
  if (k === "landrover" || k === "rangerover") return "landrover";
  if (k === "mercedes" || k === "mercedesbenz" || MERCEDES_BRANDLESS.has(k)) return "mercedesbenz";
  return k;
}

/** Words of a file name that describe the car (brand prefix and the "45 angle front view" suffix removed). */
function fileTokens(filename) {
  const name = filename.replace(/\.webp$/i, "").replace(/-45-angle-front-view$/i, "");
  let t = tokens(name);
  const first = alnum(filename.split("-")[0]);
  if (first === "landrover" && t[0] === "land" && t[1] === "rover") {
    t = t.slice(2);
  } else if ((first === "mercedes" || first === "mercedesbenz") && t[0] === "mercedes") {
    t = t.slice(t[1] === "benz" ? 2 : 1);
  }
  return t;
}

/** [firstYear, lastYear] found in the file name, or null. "2022–" counts as still in production. */
function yearRange(filename) {
  const found = filename.match(/(?:19|20)\d{2}/g);
  if (!found) return null;
  const years = found.map(Number);
  const first = Math.min(...years);
  let last = Math.max(...years);
  if (/((?:19|20)\d{2})–(?!\d)/.test(filename)) last = Math.max(last, new Date().getFullYear());
  return [first, last];
}

const sameRun = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

/** Length of the longest run of the input words, STARTING AT THE FIRST WORD, found back-to-back in the file words. */
function runLength(input, file) {
  for (let len = input.length; len >= 1; len--) {
    const run = input.slice(0, len);
    if (run.join("").length < 2) continue; // a lone "3" or "a" is not a model
    for (let i = 0; i <= file.length - len; i++) {
      if (sameRun(file.slice(i, i + len), run)) return len;
    }
  }
  return 0;
}

/** Alternative ways the same model is written (the lookup says "A 180 D", files say "a class"). */
function alternatives(brand, t) {
  const alts = [];
  const t0 = t[0] ?? "";
  let m;
  if (brand === "mercedesbenz" && t0) {
    if ((m = t0.match(/^(a|b|c|e|g|s|v|x)\d{2,3}[a-z]*$/))) alts.push([m[1], "class"]);
    else if (/^(a|b|c|e|g|s|v|x)$/.test(t0) && t[1] && /^\d{2,3}/.test(t[1])) alts.push([t0, "class"]);
    else if ((m = t0.match(/^(gla|glb|glc|gle|gls|cla|clb|cls|clk|slk|slc|sl)\d{0,3}[a-z]*$/))) alts.push([m[1]]);
  }
  if (brand === "bmw" && (m = t0.match(/^([1-8])\d{2}[a-z]{0,2}$/))) alts.push([m[1], "series"]);
  return alts;
}

/**
 * Chooses a photo from `files` (a list of { name, src }). Returns { src, tier } with tier
 * "model" or "brand", or null for "show nothing".
 */
export function pickVehiclePhoto(make, series, model, year, files) {
  const brand = brandKey(make, series);
  if (!brand) return null; // rule 1: no make, no picture

  const brandFiles = files.filter((f) => fileBrand(f.name) === brand);
  if (!brandFiles.length) return null; // rule 1: brand not in the library

  let seriesTokens = tokens(series);
  let modelTokens = tokens(model);
  const makeTokens = tokens(make);
  const dropMake = (list) =>
    makeTokens.length && list.length > makeTokens.length && sameRun(list.slice(0, makeTokens.length), makeTokens)
      ? list.slice(makeTokens.length)
      : list;
  seriesTokens = dropMake(seriesTokens);
  modelTokens = dropMake(modelTokens);

  const seriesAlts = alternatives(brand, seriesTokens);
  const modelAlts = alternatives(brand, modelTokens);
  const allRows = [];
  const matchedRows = [];

  for (const f of brandFiles) {
    const ft = fileTokens(f.name);
    let score = 0;
    let used = [];
    for (const [t, alts, weight] of [
      [seriesTokens, seriesAlts, 10],
      [modelTokens, modelAlts, 8],
    ]) {
      if (!t.length) continue;
      const run = runLength(t, ft);
      if (run > 0) {
        score += run * weight * 3;
        used = used.concat(t.slice(0, run));
        continue;
      }
      for (const alt of alts) {
        const altRun = runLength(alt, ft);
        if (altRun === alt.length) {
          score += altRun * weight;
          used = used.concat(alt);
          break;
        }
      }
    }

    let variant = 0;
    if (score > 0) {
      for (const t of [...seriesTokens, ...modelTokens]) {
        if (!used.includes(t) && (t.length >= 2 || /^\d+$/.test(t)) && ft.includes(t)) variant++;
      }
    }

    const range = yearRange(f.name);
    let inRange = 0;
    let gap = 0;
    if (year != null && range) {
      if (year >= range[0] && year <= range[1]) inRange = 1;
      else gap = Math.min(Math.abs(year - range[0]), Math.abs(year - range[1]));
    } else if (year != null) {
      gap = 999; // no year in the file name: least preferred
    }

    const row = { src: f.src, name: f.name, score, variant, inRange, gap };
    allRows.push(row);
    if (score > 0) matchedRows.push(row);
  }

  const tier = matchedRows.length ? "model" : "brand";
  const rows = tier === "model" ? matchedRows : allRows;
  rows.sort((a, b) => {
    if (tier === "model") {
      if (a.score !== b.score) return b.score - a.score; // model first
      if (a.variant !== b.variant) return b.variant - a.variant; // then variant
    }
    if (a.inRange !== b.inRange) return b.inRange - a.inRange; // then year
    if (a.gap !== b.gap) return a.gap - b.gap;
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  return { src: rows[0].src, tier };
}
