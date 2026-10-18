// Builds src/lib/partIndex.json from the filenames in public/parts, so a new photo needs no code change.
// Each file name (timing-chain-kit.webp) becomes searchable phrases ("timing chain kit", "timing chain").
// Numbered duplicates (cylinder-head, cylinder-head-2 ...) are grouped under one base name.
import { readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GENERIC = new Set(["kit", "assembly", "unit", "module", "set", "pack"]);
const STOP_SINGLE = new Set(["housing", "sensor", "valve", "actuator", "assembly", "converter", "control", "system"]);

const singular = (w) => (w.endsWith("ies") ? w.slice(0, -3) + "y" : w.endsWith("ss") || !w.endsWith("s") ? w : w.slice(0, -1));

const files = readdirSync(join(root, "public", "parts")).filter((f) => f.endsWith(".webp")).map((f) => f.slice(0, -5)).sort();
const groups = new Map();
for (const f of files) {
  const base = f.replace(/-\d+$/, "");
  if (!groups.has(base)) groups.set(base, []);
  groups.get(base).push(f);
}

const raw = new Map(); // base -> candidate phrases
for (const base of groups.keys()) {
  let words = base.split("-").map(singular);
  const trimmed = [...words];
  while (trimmed.length > 1 && GENERIC.has(trimmed[trimmed.length - 1])) trimmed.pop();
  const cands = new Set([trimmed.join(" ")]);
  for (let a = 0; a < trimmed.length; a++) for (let b = a + 2; b <= trimmed.length; b++) cands.add(trimmed.slice(a, b).join(" "));
  for (const w of trimmed) if (w.length >= 7 && !STOP_SINGLE.has(w)) cands.add(w);
  raw.set(base, cands);
}
// a phrase that would point at more than one part is ambiguous -> dropped (synonyms in partImage.js decide those)
const owners = new Map();
for (const [base, c] of raw) for (const p of c) owners.set(p, (owners.get(p) || new Set()).add(base));
const entries = [];
for (const [base, c] of raw) {
  const full = [...c][0]; // the part's own name always stays searchable, even when it is also a word of another part
  const phrases = [...c].filter((p) => p === full || (owners.get(p).size === 1 && !GENERIC.has(p)));
  entries.push({ base, files: groups.get(base), phrases });
}
writeFileSync(join(root, "src", "lib", "partIndex.json"), JSON.stringify(entries, null, 1) + "\n");
console.log(`part index: ${entries.length} parts, ${files.length} files`);
