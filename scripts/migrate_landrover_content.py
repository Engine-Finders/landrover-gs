#!/usr/bin/env python3
"""
Land Rover Garage content migration script.

Generates src/data/{model,variant,engine-family}/*.json and matching
src/app/landrover-*/page.js routes for every source file in:
  _src_content/Land Rover_Models/*.md
  "_src_content/Garage Site - variants Pages Land Rover"/*.txt
  "_src_content/Garage Site - Engine Pages Land Rover"/*.txt

Strategy (mirrors the BMW migration): the 3 already-built reference pages
(C-Class model, AMG GT 53 variant, M139 engine) are used as JSON *templates*.
For every new source file we deep-copy the matching template, text-substitute
the reference vehicle's name for the new one across all string leaves (so
boilerplate copy reads correctly), then override the specific data-bearing
fields (price, specs, generations, engine codes, FAQ, variant lists,
applications tables, related links) with values parsed out of the new source.

Usage:
  python scripts/migrate_mercedes_content.py --type model|variant|engine|all [--dry-run] [--limit N]
"""
import argparse
import copy
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
DATA = SRC / "data"
APP = SRC / "app"

SRC_CONTENT = ROOT / "_src_content"
MODEL_MD_DIR = SRC_CONTENT / "LandRover_Models"
VARIANT_TXT_DIR = SRC_CONTENT / "Garage Site - Variants Pages Land Rover"
ENGINE_TXT_DIR = SRC_CONTENT / "Garage Site - Engine Pages Land Rover"

OUT_DIR = ROOT / "scripts" / "output"

# Reference pages used as JSON templates (already hand-tuned, never overwritten)
MODEL_REF = {"slug": "defender-engines", "prefix": "landroverDefender", "name": "Defender", "count": 18}
VARIANT_REF = {"slug": "landrover-defender-d250-engines", "prefix": "landroverDefenderD250", "name": "Defender D250", "count": 13}
ENGINE_REF = {"slug": "landrover-aj300d-engine", "prefix": "landroveraj300d", "name": "AJ300D", "count": 11}

# Source files that map onto an already-built reference page — skip, don't regenerate.
SKIP_SOURCE = {
    "landrover-amg m139.txt",          # engine — hand-built reference page
    "mercedes c-class-model-page.md",  # (not present, defensive)
    "mercedes amg gt 53.txt",          # variant — hand-built reference page
}

# Engine-code detector for Land Rover: OM###, M###(L), K9K, plus optional trailing letter.
ENGINE_CODE_RE = re.compile(r"\b(OM\d{3}|M\d{2,3}[A-Z]?|K9K)\b")

SAFE_ICONS = [
    "engine", "gear", "gears", "cog", "chain", "bearing", "gasket", "turbo",
    "pump", "oil", "fuel", "clipboard", "wrench", "tool", "shield-check",
    "shield", "truck", "car", "search", "calendar", "code", "note", "price",
    "piston", "gauge", "pulse", "crane", "flag", "refresh", "clock", "star",
    "medal", "layers", "phone", "building", "link", "guide",
]


# ---------------------------------------------------------------------------
# generic helpers
# ---------------------------------------------------------------------------
def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")


def camel(slug_core):
    parts = [p for p in re.split(r"[^a-z0-9]+", slug_core.lower()) if p]
    if not parts:
        return "x"
    return parts[0] + "".join(p.capitalize() for p in parts[1:])


def model_prefix(slug):
    core = slug.replace("landrover-", "", 1)
    core = re.sub(r"-engines?$", "", core)
    return "landrover" + camel(core)[0].upper() + camel(core)[1:]


def variant_prefix(slug):
    return model_prefix(slug)



def strip_brand(name):
    return re.sub(r"^Land Rover[\s-]+", "", name).strip()

def load_template(prefix, count, folder):
    out = {}
    for n in range(1, count + 1):
        p = DATA / folder / f"{prefix}Sec{n}.json"
        out[n] = json.loads(p.read_text(encoding="utf-8"))
    return out


def replace_strings(obj, replacements):
    if isinstance(obj, dict):
        return {k: replace_strings(v, replacements) for k, v in obj.items()}
    if isinstance(obj, list):
        return [replace_strings(v, replacements) for v in obj]
    if isinstance(obj, str):
        out = obj
        for old, new in replacements:
            if old and old != new:
                out = out.replace(old, new)
        return out
    return obj


def set_path(d, path, value):
    parts = path.split(".")
    cur = d
    for p in parts[:-1]:
        if not isinstance(cur, dict) or p not in cur:
            return False
        cur = cur[p]
    if not isinstance(cur, dict):
        return False
    cur[parts[-1]] = value
    return True


def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def read_text(path):
    return path.read_text(encoding="utf-8", errors="replace")


def clean_line(s):
    s = s.replace("&nbsp;", " ").replace("**", "").strip()
    return re.sub(r"\s+", " ", s)


def strip_md_links(s):
    """`[Label](#x)` -> `Label`;  `[Label →]` -> `Label →`."""
    s = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", s)
    s = re.sub(r"\[([^\]]+)\]", r"\1", s)
    return s


# ---------------------------------------------------------------------------
# frontmatter + shared content extraction
# ---------------------------------------------------------------------------
def parse_frontmatter(text):
    lines = text.splitlines()
    fm = {}
    if lines and lines[0].strip() == "---":
        for l in lines[1:]:
            if l.strip() == "---":
                break
            if ":" in l:
                k, v = l.split(":", 1)
                fm[k.strip()] = v.strip().strip('"')
    return fm


def strip_frontmatter(text):
    lines = text.splitlines()
    if lines and lines[0].strip() == "---":
        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                return "\n".join(lines[i + 1:])
    return text


def extract_price(text):
    m = re.search(r"[Ss]tarting [Ff]rom\s*£\s*([\d,]+)", text)
    if not m:
        m = re.search(r"—\s*[Ff]rom\s*£\s*([\d,]+)", text)
    if not m:
        m = re.search(r"£\s*([\d,]{3,})", text)
    return m.group(1).replace(",", "") if m else None


def gbp(n):
    try:
        return f"£{int(n):,}"
    except (TypeError, ValueError):
        return None


def extract_md_table(block):
    lines = [l for l in block.splitlines() if l.strip().startswith("|")]
    if len(lines) < 2:
        return []

    def cells(line):
        return [c.strip() for c in line.strip().strip("|").split("|")]

    header = cells(lines[0])
    rows = []
    for line in lines[2:]:
        vals = cells(line)
        if len(vals) != len(header):
            continue
        rows.append({header[i]: vals[i] for i in range(len(header))})
    return rows


def extract_any_table(block):
    """Markdown pipe table OR tab-separated table (first row = header)."""
    lines = [l for l in block.splitlines() if l.strip()]
    if not lines:
        return []
    if lines[0].lstrip().startswith("|"):
        return extract_md_table(block)
    rows = [l.split("\t") for l in lines if "\t" in l]
    if len(rows) < 2:
        return []
    header = [c.strip() for c in rows[0]]
    out = []
    for r in rows[1:]:
        vals = [c.strip() for c in r]
        if len(vals) != len(header):
            continue
        out.append({header[i]: vals[i] for i in range(len(header))})
    return out


def find_col(row, *names):
    for k, v in row.items():
        if any(n.lower() in k.lower() for n in names):
            return v
    return ""


def extract_tab_kv(block):
    out = {}
    for line in block.splitlines():
        if "\t" not in line:
            continue
        k, v = line.split("\t", 1)
        k, v = k.strip(), v.strip()
        if k and v:
            out[k] = v
    return out


def extract_kv_pipe(block):
    """`| **Key** | Value |` 2-col table used as key/value pairs."""
    out = {}
    for line in block.splitlines():
        line = line.strip()
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) != 2:
            continue
        key = cells[0].strip("*").strip()
        val = cells[1].strip().strip("*").strip()
        if not key or set(key) <= {"-", " "} or not val or set(val) <= {"-", " "}:
            continue
        out[key] = val
    return out


def extract_checklist(block):
    """Pull items from a `✔ a ✔ b` / `✓ a ✓ b` run (single or multi-line)."""
    items = []
    for chunk in re.split(r"[✔✓]", block):
        c = clean_line(strip_md_links(chunk))
        c = c.strip(" ·—-")
        if c and len(c) > 2 and not c.lower().startswith(("http", "gallery", "review")):
            items.append(c)
    return items


def extract_faq(text):
    """Q/A pairs. Handles `**Q?**\\nA` and plain `Q?\\nA\\n\\n`."""
    m = re.search(r"#{0,3}\s*Frequently Asked Questions\s*\n(.*?)(?:\n---|\n<a name|\Z)", text, re.S)
    if not m:
        return []
    body = m.group(1)
    pairs = re.findall(r"\*\*(.+?\?)\*\*\s*\n(.+?)(?=\n\*\*|\Z)", body, re.S)
    if not pairs:
        pairs = re.findall(r"^(.+?\?)\s*\n(.+?)(?=\n\s*\n|\Z)", body.strip(), re.S | re.M)
    out = []
    for q, a in pairs:
        q = clean_line(q)
        a = clean_line(a.replace("\n", " "))
        if q and a:
            out.append({"q": q, "a": a})
    return out


def split_half(items):
    half = (len(items) + 1) // 2
    return items[:half], items[half:]


def section_body(text, heading_pattern):
    """Return the text between a `#`/`##`/`###` heading matching the pattern
    and the next heading / `---` / EOF."""
    m = re.search(
        r"(?:^|\n)#{1,4}\s*" + heading_pattern + r"[^\n]*\n(.*?)(?=\n#{1,4}\s|\n---|\Z)",
        text, re.S | re.I,
    )
    return m.group(1).strip() if m else ""


def first_paragraphs(block, limit=2):
    paras = [clean_line(strip_md_links(p)) for p in re.split(r"\n\s*\n", block) if p.strip()]
    paras = [p for p in paras if p and not p.startswith(("`[", "[GALLERY", "[REVIEW", "[REG", "[RECENT", "|"))]
    return paras[:limit]


def engine_codes_in(text):
    seen = []
    for c in ENGINE_CODE_RE.findall(text):
        if c not in seen:
            seen.append(c)
    return seen


# ---------------------------------------------------------------------------
# MODEL
# ---------------------------------------------------------------------------
def parse_model_md(path):
    raw = read_text(path)
    fm = parse_frontmatter(raw)
    body = strip_frontmatter(raw)

    h1_m = re.search(r"^#\s+(.+)$", body, re.M)
    sub_m = re.search(r"^###\s+(.+)$", body, re.M)
    model = fm.get("model", path.stem.replace("landrover-", "").replace("-model-page", ""))
    slug = fm.get("slug", "/landrover-" + slugify(model) + "-engines").strip().strip("/")

    # known-issue heading (Sec2)
    ki_m = re.search(r"##\s*⚠️?\s*(Land Rover[^\n?]*\??)", body)
    known_issue_title = clean_line(ki_m.group(1)) if ki_m else ""
    known_issue_desc = ""
    if ki_m:
        after = body[ki_m.end():]
        known_issue_desc = first_paragraphs(after, 1)
        known_issue_desc = known_issue_desc[0] if known_issue_desc else ""

    # small pricing table (Sec3)
    price_tier_rows = extract_md_table(section_body(body, r"Land Rover .+? Rebuild Pricing"))

    # full price guide (Sec4)
    guide_rows = extract_md_table(section_body(body, r"Land Rover .+? Engine Rebuild Price Guide"))

    # popular variants (Sec10 / Sec17)
    pop_block = section_body(body, r"Most Popular Land Rover .+? Rebuilds")
    variant_names = [clean_line(v) for v in re.findall(r"^\d+\.\s+(.+)$", pop_block, re.M)]

    # why choose (Sec11)
    why_items = extract_checklist(section_body(body, r"Why Land Rover Owners Choose Us"))

    # coverage: generations (Sec15)
    gens = []
    for gm in re.finditer(r"\*\*([\d]{4}[–\-][\d]{4}|[\d]{4}[–\-]present)\s*\(([^)]+)\):\*\*\s*(.+)", body):
        gens.append({"years": gm.group(1).replace("-", "–"), "code": gm.group(2).strip(),
                     "list": clean_line(gm.group(3))})

    # coverage: "We Cover Every Land Rover X Model:" checklist (Sec15)
    cov_var, cov_items = "", []
    cm = re.search(r"We Cover Every (Land Rover [^\n:]+?) Model:\s*\n(.+)", body)
    if cm:
        cov_var = cm.group(1).strip()
        cov_items = extract_checklist(cm.group(2))

    # engine sizes (Sec16)
    sizes = re.findall(r"([\d.]+)\s*Litre", section_body(body, r"Engine Sizes"))
    sizes = list(dict.fromkeys(sizes))

    # full variant coverage line (Sec17)
    fvc = section_body(body, r"Full Variant Coverage")
    fvc_line = ""
    for l in fvc.splitlines():
        if "·" in l:
            fvc_line = clean_line(strip_md_links(l))
            break
    coverage_variants = [v.strip() for v in fvc_line.split("·") if v.strip()] if fvc_line else []

    faq = extract_faq(body)
    price = extract_price(body)

    return {
        "slug": slug, "model": model,
        "title": fm.get("meta_title", fm.get("title", "")),
        "meta_description": fm.get("meta_description", ""),
        "subhead": clean_line(sub_m.group(1)) if sub_m else "",
        "price": price,
        "known_issue_title": known_issue_title,
        "known_issue_desc": known_issue_desc,
        "price_tier_rows": price_tier_rows,
        "guide_rows": guide_rows,
        "variant_names": variant_names,
        "why_items": why_items,
        "generations": gens,
        "coverage_var": cov_var, "coverage_items": cov_items,
        "engine_sizes": sizes,
        "coverage_variants": coverage_variants,
        "faq": faq,
    }


def make_known_issue_h2(title, model):
    """`Land Rover E-Class OM642 Swirl Flap & OM651 Timing Chain Issues?`
    -> 3 pipe-delimited lines (ModelSec2 destructures exactly line1|line2|line3):
    `Land Rover E-Class|**OM642** Swirl Flap|& **OM651** Timing Chain Issues?`"""
    t = title.strip()
    prefix = f"Land Rover {model}"
    rest = t[len(prefix):].strip() if t.startswith(prefix) else t
    rest = ENGINE_CODE_RE.sub(lambda m: f"**{m.group(0)}**", rest).strip()
    if not rest:
        return f"{prefix}|Engine Rebuild|& Replacement"
    if " & " in rest:
        a, b = rest.split(" & ", 1)
        return f"{prefix}|{a.strip()}|& {b.strip()}"
    words = rest.split()
    if len(words) > 3:
        mid = len(words) // 2
        return f"{prefix}|{' '.join(words[:mid])}|{' '.join(words[mid:])}"
    return f"{prefix}|{rest}|Issues?"


def build_model_json(template, p, ref_name):
    out = copy.deepcopy(template)
    model = p["model"]
    reps = [(f"Land Rover {ref_name}", f"Land Rover {model}"), (ref_name, model)]
    for n in out:
        out[n] = replace_strings(out[n], reps)

    example = p["variant_names"][0].replace("Land Rover ", "") if p["variant_names"] else model
    for n in out:
        out[n] = replace_strings(out[n], [("C220d", example)])

    # Sec1
    if p["subhead"]:
        out[1]["subhead"] = p["subhead"]
    if p["price"]:
        set_path(out[1], "priceCta.price", gbp(p["price"]))

    # Sec2 known issue
    if p["known_issue_title"]:
        out[2]["h2"] = make_known_issue_h2(p["known_issue_title"], model)
    if p["known_issue_desc"]:
        out[2]["description"] = p["known_issue_desc"]

    # Sec3 price tiers
    if p["price_tier_rows"]:
        cards = []
        for r in p["price_tier_rows"]:
            keys = list(r.values())
            label = clean_line(keys[0])
            price = clean_line(keys[-1])
            cm = re.search(r"\(([^)]*)\)", label)
            code = f"({cm.group(1)})" if cm else ""
            label_clean = re.sub(r"\s*\([^)]*\)", "", label).strip()
            words = label_clean.split()
            title_pre = " ".join(words[:-1]) if len(words) > 1 else label_clean
            title_hi = words[-1] if len(words) > 1 else "Rebuild"
            cards.append({
                "titlePre": title_pre, "titleHighlight": title_hi, "code": code,
                "price": price if price.startswith("£") else ("£" + price.lstrip("£")),
                "featured": "AMG" in label,
            })
        if cards:
            out[3]["cards"] = cards

    # Sec4 price guide
    if p["guide_rows"]:
        rows = []
        for r in p["guide_rows"]:
            v = list(r.values())
            if len(v) >= 5:
                rows.append({"family": v[0], "fuel": v[1], "size": v[2], "chassis": v[3], "range": v[4]})
        if rows:
            out[4]["rows"] = rows

    # Sec8 reviews — keep generic template cards (populated by team), just name-subbed
    if "reviews" in template.get(8, {}):
        out[8]["reviews"] = copy.deepcopy(template[8]["reviews"])
        out[8]["reviews"] = replace_strings(out[8]["reviews"], reps)

    # Sec10 popular rebuilds
    if p["variant_names"] and "cards" in out.get(10, {}):
        cards = []
        for i, name in enumerate(p["variant_names"]):
            nm = name if name.startswith("Land Rover") else f"Land Rover {name}"
            cards.append({"number": f"{i + 1:02d}", "model": nm,
                          "spec": variant_spec_summary(nm)})
        out[10]["cards"] = cards

    # Sec11 why choose
    if p["why_items"] and "checklist" in out.get(11, {}):
        out[11]["checklist"] = p["why_items"]

    # Sec12 recent recoveries — restore generic template cards
    if "cards" in out.get(12, {}) and "cards" in template.get(12, {}):
        out[12]["cards"] = replace_strings(copy.deepcopy(template[12]["cards"]), reps)

    # Sec15 coverage
    if p["generations"] and "generations" in out.get(15, {}):
        out[15]["generations"] = p["generations"]
    if p["coverage_var"] and "checklistTitleHighlight" in out.get(15, {}):
        out[15]["checklistTitleHighlight"] = f"{p['coverage_var']} Model:"
        if p["coverage_items"]:
            l, r = split_half(p["coverage_items"])
            out[15]["checklistLeft"] = l
            out[15]["checklistRight"] = r

    # Sec16 engine sizes
    if p["engine_sizes"] and "engineSizes" in out.get(16, {}):
        out[16]["engineSizes"]["items"] = p["engine_sizes"]

    # Sec17 full variant coverage
    cov = p["coverage_variants"] or [v.replace("Land Rover ", "") for v in p["variant_names"]]
    if cov and "tabVariants" in out.get(17, {}):
        out[17]["tabs"] = ["All Variants"]
        out[17]["activeTab"] = 0
        out[17]["tabVariants"] = [[{"label": c} for c in cov]]

    # Sec18 FAQ
    if p["faq"] and "faqLeft" in out.get(18, {}):
        l, r = split_half(p["faq"])
        out[18]["faqLeft"] = l
        out[18]["faqRight"] = r

    return out


# ---------------------------------------------------------------------------
# VARIANT
# ---------------------------------------------------------------------------
_VARIANT_INDEX = None


def is_ev_variant(path):
    """Pure-electric variants (eVito, eSprinter, EQV, GLC EV, SLS Electric Drive,
    G580 EQ ...) have no combustion engine to rebuild — the source file itself
    says so. Skip them entirely rather than fabricate a rebuild page."""
    raw = read_text(path)
    body = strip_frontmatter(raw)
    fm = parse_frontmatter(raw)
    # 1) title / meta markers (structural — first ~3 lines + frontmatter titles)
    head_lines = [l.strip().lower() for l in body.splitlines() if l.strip()][:3]
    titles = " | ".join(head_lines + [fm.get("title", "").lower(), fm.get("meta_title", "").lower()])
    for kw in ("combustion engine rebuilds", "we do combustion only", "combustion only",
               "out of scope for rebuild", "electric powertrain service", "electric motor?",
               "electric motor support", "electric van engine rebuild", "electric drive motor & battery",
               "eq technology — engine service", "eq technology - engine service"):
        if kw in titles:
            return True
    # 2) spec-table fuel/engine rows that state electric-only (no combustion code)
    S = variant_sections(body)
    spec = extract_tab_kv(S.get("spec", "")) or extract_kv_pipe(S.get("spec", "")) or extract_tab_kv(chr(10).join(body.splitlines()[:45]))
    fuel = (spec.get("Fuel", "")).lower()
    eng = " ".join(v for k, v in spec.items() if "engine" in k.lower() or "powertrain" in k.lower()).lower()
    head_raw = body[:1600].lower()
    fuel_electric = (
        fuel in ("electric", "electric (bev)", "battery electric")
        or re.search(r"(?:^|\n)fuel\t+electric\b", head_raw)
        or re.search(r"\|\s*\*\*fuel\*\*\s*\|\s*electric\s*\|", head_raw)
    )
    combustion_code = bool(ENGINE_CODE_RE.search(eng))
    if fuel_electric and not combustion_code:
        return True
    if ("no combustion engine" in eng or "fully electric" in eng) and not combustion_code:
        return True
    return False


def variant_file_index():
    global _VARIANT_INDEX
    if _VARIANT_INDEX is None:
        _VARIANT_INDEX = {}
        for f in VARIANT_TXT_DIR.glob("*.txt"):
            if f.name.lower() in SKIP_SOURCE:
                continue
            stem = strip_brand(f.stem)
            key = re.sub(r"[^a-z0-9]", "", stem.lower())
            _VARIANT_INDEX.setdefault(key, f)
    return _VARIANT_INDEX


def variant_spec_summary(name):
    bare = strip_brand(name)
    key = re.sub(r"[^a-z0-9]", "", bare.lower())
    f = variant_file_index().get(key)
    if not f:
        return "Rebuild & Replacement Available"
    p = parse_variant_txt(f, bare)
    bits = " ".join(x for x in (p.get("capacity"), p.get("fuel")) if x).strip()
    codes = p.get("engine") or " / ".join(p.get("engine_codes", []))
    return f"{bits} ({codes})".strip() if codes else (bits or "Rebuild & Replacement Available")


# Variant .txt files use bare-line headings (no `#` prefix). Slice the body into
# named sections by matching each line against this ordered pattern list.
VARIANT_HEADINGS = [
    ("spec", r"Your (?:Land Rover )?.+? Engine$"),
    ("price", r"(?:Land Rover )?.+? Engine Rebuild Price$"),
    ("warning", r"⚠️?\s*.+"),
    ("options", r"(?:Land Rover )?.+? Engine Options$"),
    ("workshop", r"Our Workshop$"),
    ("process", r"(?:Land Rover )?.+? Engine Rebuild Process$"),
    ("reviews", r"What (?:Land Rover )?.+? Owners Say$"),
    ("coverfit", r"We Cover Your Exact Vehicle$"),
    ("whychoose", r"Why (?:Land Rover )?.+? Owners Choose Us$"),
    ("recent", r"Our Most Recent (?:Land Rover )?Recoveries & Rebuilds$"),
    ("howitworks", r"How It Works$"),
    ("usedreplace", r"Looking for a used or replacement engine instead\?$"),
    ("about", r"About the (?:Land Rover )?.+? Engine$"),
    ("codes", r"(?:Land Rover )?.+? Engine Codes?$"),
    ("compat", r"(?:Land Rover )?.+? Engine Compatibility$"),
    ("appsbygen", r"(?:Land Rover )?.+? Applications by Generation$"),
    ("byyear", r"(?:Land Rover )?.+? Engines by Year$"),
    ("coveryear", r"We Cover Every (?:Land Rover )?.+? Model Year:$"),
    ("sizes", r"(?:Land Rover )?.+? Engine Sizes$"),
    ("fueltypes", r"(?:Land Rover )?.+? Fuel Types$"),
    ("costs", r"(?:Land Rover )?.+? Engine Costs$"),
    ("related", r"Related (?:Land Rover )?.+? Variants$"),
    ("faq", r"Frequently Asked Questions$"),
    ("quote", r"Get Your Free (?:Land Rover )?.+? Fixed-Price Quote$"),
]


def variant_sections(body):
    lines = body.splitlines()
    hits = []  # (line_idx, name)
    for i, raw in enumerate(lines):
        l = raw.strip().lstrip("#").strip()
        if not l or "\t" in l or len(l) > 80:
            continue
        for name, pat in VARIANT_HEADINGS:
            if re.fullmatch(pat, l):
                hits.append((i, name))
                break
    out = {}
    for k, (idx, name) in enumerate(hits):
        end = hits[k + 1][0] if k + 1 < len(hits) else len(lines)
        out.setdefault(name, "\n".join(lines[idx + 1:end]).strip())
        if name in ("warning", "spec", "codes", "compat", "about"):
            # keep heading text too for these
            out[name + "__h"] = lines[idx].strip().lstrip("#").strip()
    return out


def parse_variant_txt(path, name_override=None):
    raw = read_text(path)
    body = strip_frontmatter(raw)
    lines = [l for l in body.splitlines() if l.strip()]
    title_line = (clean_line(lines[0]).lstrip("#").strip()) if lines else path.stem
    vname = name_override or strip_brand(path.stem)
    S = variant_sections(body)

    spec = extract_tab_kv(S.get("spec", "")) or extract_kv_pipe(S.get("spec", "")) or extract_tab_kv(chr(10).join(body.splitlines()[:45]))

    price = extract_price(title_line) or extract_price(body)

    price_rows = extract_any_table(S.get("price", ""))
    if not price_rows:
        blines = body.splitlines()
        st = next((n for n, l in enumerate(blines) if "Engine Code" in l and "Rebuild From" in l and (chr(9) in l or l.lstrip().startswith("|"))), None)
        if st is not None:
            blk = []
            for l in blines[st:]:
                if chr(9) not in l and not l.lstrip().startswith("|"):
                    break
                blk.append(l)
            price_rows = extract_any_table(chr(10).join(blk))
    apps = extract_any_table(S.get("appsbygen", ""))
    by_year = extract_any_table(S.get("byyear", ""))
    faq = extract_faq("Frequently Asked Questions\n" + S.get("faq", ""))

    # warning callout
    warn_title = clean_line(re.sub(r"^⚠️?\s*", "", S.get("warning__h", "")))
    warn_paras = first_paragraphs(S.get("warning", ""), 2)
    src_m = re.search(r"\[include_in_hero_hook:([^\]]+)\]", S.get("warning", ""))
    warn_source = "Source: " + src_m.group(1).split("Source:")[-1].strip(" .]") if src_m and "Source:" in src_m.group(1) else ""

    # about / codes / compatibility prose
    about_paras = first_paragraphs(S.get("about", ""), 1)
    compat_intro = first_paragraphs(S.get("compat", ""), 1)

    # engine-code cards
    codes_block = re.sub(r"^#{2,4}\s*", "", S.get("codes", ""), flags=re.M)
    codes_block = re.sub(r"^\*\*Check Your.*$", "Check Your", codes_block, flags=re.M)
    code_cards = []
    eng_default = spec.get("Engine", "") if isinstance(spec, dict) else ""
    for blk in re.split(r"^Check Your.*$", codes_block, flags=re.M):
        ls = [x.strip() for x in blk.strip().splitlines() if x.strip()]
        if not ls:
            continue
        if len(ls) >= 2 and len(ls[0]) <= 60 and not ls[0].endswith("."):
            head, body_txt = clean_line(ls[0]), " ".join(ls[1:])
        else:
            head, body_txt = clean_line(eng_default or vname), " ".join(ls)
        hm = re.match(r"([^(]+?)\s*(\(.*\))?\s*$", head)
        code = hm.group(1).strip() if hm else head
        code_cards.append({
            "codeHighlight": code,
            "codeRest": (hm.group(2) or "") if hm else "",
            "body": clean_line(body_txt),
            "cta": f"Check Your {code} {vname}",
        })


    if not code_cards and eng_default:
        ab = first_paragraphs(S.get("about", ""), 1)
        code_cards.append({"codeHighlight": eng_default, "codeRest": "", "body": ab[0] if ab else f"The {vname} uses the {eng_default}. We replace worn timing, sealing and bearing components as standard on every rebuild, and confirm the exact engine code against your registration before quoting.",
                           "cta": f"Check Your {eng_default} {vname}"})

    # related variants
    rel_block = S.get("related", "")
    rel_links = []
    for lm in re.finditer(r"\[(?:Land Rover )?([^\]→\n]+?) Engine\s*→?\]", rel_block):
        nm = lm.group(1).strip()
        if nm.lower().startswith("view all") or nm.startswith("←"):
            continue
        rel_links.append({"label": f"Land Rover {nm} Engine", "href": f"/landrover-{slugify(nm)}-engines"})
    viewall_m = re.search(r"View All (?:Land Rover )?([^\]\n]+?) Engines?\]", rel_block)
    view_all_href = ""
    if viewall_m:
        mdl = slugify(re.sub(r"^Land Rover\s+", "", viewall_m.group(1)))
        view_all_href = f"/{mdl}-engines"
    used_paras = [x for x in first_paragraphs(S.get("usedreplace", ""), 3) if not x.lower().startswith(("ask about", "["))]
    why_choose = extract_checklist(S.get("whychoose", ""))

    subhead = ""
    if len(lines) > 1:
        cand = clean_line(strip_md_links(lines[1])).lstrip("#").strip()
        if cand and not cand.startswith(("★", "✔", "[", "Starting from", "|")):
            subhead = cand

    return {
        "variant": vname, "title": title_line, "subhead": subhead,
        "model": spec.get("Model", ""),
        "fuel": spec.get("Fuel", ""),
        "engine": spec.get("Engine", ""),
        "capacity": spec.get("Capacity", ""),
        "generations": spec.get("Generations", spec.get("Generation", "")),
        "price": price,
        "price_rows": price_rows,
        "applications": apps,
        "by_year": by_year,
        "faq": faq,
        "engine_codes": engine_codes_in(body),
        "warn_title": warn_title, "warn_paras": warn_paras, "warn_source": warn_source,
        "about_paras": about_paras, "compat_intro": compat_intro,
        "code_cards": code_cards,
        "related_links": rel_links, "view_all_href": view_all_href,
        "why_choose": why_choose,
        "used_body": used_paras[0] if used_paras else "",
    }



_ENGINE_KEYS = [("aj133","aj133"),("aj41","aj41"),("ajv8","aj-v8"),("aj150d","aj150d"),("aj200d","aj200d"),("aj200p","aj200p"),("aj300d","aj300d"),("aj300p","aj300p"),
    ("m47d20","m47d20-bmw-sourced"),("kseries","rover-k-series"),("duratorq","ford-duratorq"),("ecoboost","ford-ecoboost"),("n63","n63"),("s68","s68-bmw-sourced"),
    ("tdv8","tdv8-sdv8"),("sdv8","tdv8-sdv8"),("tdv6","tdv6-sdv6"),("sdv6","tdv6-sdv6"),("200tdi","200tdi"),("300tdi","300tdi"),("td5","td5"),("tdi","tdi")]


def engine_href(text):
    k = re.sub(r"[^a-z0-9]", "", (text or "").lower())
    for a, b in _ENGINE_KEYS:
        if a in k:
            return f"/landrover-{b}-engine"
    return None


def add_variant_code_hrefs(out):
    """Mercedes-style: every engine-code cell links to that engine's page."""
    for c in out.get(3, {}).get("cards", []):
        h = engine_href(c.get("code"))
        if h:
            c["codeHref"] = h
    for c in out.get(10, {}).get("codes", {}).get("cards", []):
        h = engine_href(c.get("codeHighlight"))
        if h:
            c["codeHref"] = h
    for r in out.get(10, {}).get("applications", {}).get("rows", []):
        h = engine_href(r.get("engineCode"))
        if h:
            r["codeHref"] = h
    for r in out.get(11, {}).get("rows", []):
        h = engine_href(r.get("engineCode"))
        if h:
            r["codeHref"] = h


def build_variant_json(template, p, ref_name):
    out = copy.deepcopy(template)
    v = p["variant"]
    reps = [(f"Land Rover {ref_name}", f"Land Rover {v}"), (f"LAND ROVER {ref_name.upper()}", f"LAND ROVER {v.upper()}"),
            (ref_name.upper(), v.upper()), (ref_name, v)]
    if p["model"]:
        reps += [("AMG GT", p["model"])] if p["model"] not in ("AMG GT",) else []
    if p.get("engine") and p["engine"] != "AJ300D":
        reps += [("AJ300D", p["engine"])]
    for n in out:
        out[n] = replace_strings(out[n], reps)

    price_gbp = gbp(p["price"]) if p["price"] else None

    # Sec1
    if p["title"]:
        tm = re.match(r"Land Rover .+? Engine Rebuild\s*[—-]\s*From\s*(£[\d,]+)", p["title"])
        if tm:
            out[1]["h1"] = f"Land Rover {v}|Engine Rebuild —|From {tm.group(1)}"
    if price_gbp and out[1].get("h1"):
        out[1]["h1"] = re.sub(r"From £[\d,]+", f"From {price_gbp}", out[1]["h1"])
    if price_gbp:
        set_path(out[1], "priceCta.kicker", f"Starting from {price_gbp} —")
    if p.get("subhead"):
        out[1]["subhead"] = p["subhead"]

    # Sec2 specs
    if "specs" in out.get(2, {}):
        fmap = {"Vehicle": f"Land Rover {v}", "Model": p["model"], "Variant": v, "Fuel": p["fuel"],
                "Engine": p["engine"], "Capacity": p["capacity"],
                "Generation": p["generations"], "Generations": p["generations"], "Rebuild From": price_gbp or ""}
        for row in out[2]["specs"]:
            if row.get("label") in fmap and fmap[row["label"]]:
                row["value"] = fmap[row["label"]]

    # Sec3 price cards + warning
    if p["price_rows"] and "cards" in out.get(3, {}):
        cards = []
        for r in p["price_rows"]:
            code = find_col(r, "Engine Code", "Code")
            gen = find_col(r, "Generation")
            price = find_col(r, "Rebuild From", "Price")
            cards.append({"code": code, "generation": gen,
                          "price": price if price.startswith("£") else ("£" + price.lstrip("£"))})
        if cards:
            out[3]["cards"] = cards
    elif p.get("engine") and price_gbp and "cards" in out.get(3, {}):
        out[3]["cards"] = [{"code": p["engine"], "generation": p["generations"], "price": price_gbp}]
    if price_gbp:
        out[3]["startingFromPrice"] = price_gbp
    if p["warn_title"] and "warning" in out.get(3, {}):
        wt = p["warn_title"]
        pm = re.search(r"\(([^)]*)\)\s*$", wt)
        if pm:
            out[3]["warning"]["titlePre"] = wt[:pm.start()].strip() + " "
            out[3]["warning"]["titleHighlight"] = f"({pm.group(1)})"
        else:
            out[3]["warning"]["titlePre"] = wt + " "
            out[3]["warning"]["titleHighlight"] = ""
        if p["warn_paras"]:
            out[3]["warning"]["paragraphs"] = p["warn_paras"]
        if p["warn_source"]:
            out[3]["warning"]["source"] = p["warn_source"]

    # Sec7 why choose
    if p.get("why_choose") and "whyChoose" in out.get(7, {}):
        out[7]["whyChoose"]["items"] = p["why_choose"]

    # Sec8 gallery — restore generic template
    if "gallery" in out.get(8, {}) and "gallery" in template.get(8, {}):
        out[8]["gallery"]["items"] = replace_strings(copy.deepcopy(template[8]["gallery"]["items"]), reps)

    # Sec10 about / codes / compatibility / applications
    if p["about_paras"] and "about" in out.get(10, {}):
        out[10]["about"]["paragraphs"] = p["about_paras"]
    if p["code_cards"] and set_path(out[10], "codes.cards", p["code_cards"]):
        pass
    if p["compat_intro"] and "compatibility" in out.get(10, {}):
        out[10]["compatibility"]["intro"] = p["compat_intro"][0]
    if p["applications"] and "applications" in out.get(10, {}):
        rows = []
        for r in p["applications"]:
            rows.append({
                "generation": find_col(r, "Generation"),
                "chassis": find_col(r, "Chassis"),
                "years": find_col(r, "Years"),
                "engineCode": find_col(r, "Engine Code"),
                "fuel": find_col(r, "Fuel"),
            })
        out[10]["applications"]["rows"] = rows
        if p["engine_codes"]:
            set_path(out[10], "compatibility.badge.title", p["engine_codes"][0])

    # Sec11 by year
    if p["by_year"] and "rows" in out.get(11, {}):
        rows = []
        for r in p["by_year"]:
            rows.append({
                "year": find_col(r, "Year"),
                "generation": find_col(r, "Generation"),
                "engineCode": find_col(r, "Engine Code"),
                "fuel": find_col(r, "Fuel"),
                "service": find_col(r, "Service") or "Rebuild / Replacement",
            })
        out[11]["rows"] = rows

    # Sec12 costs / related
    if price_gbp:
        set_path(out[12], "costs.price", price_gbp)
    if p["by_year"]:
        yrs = [find_col(r, "Year") for r in p["by_year"] if find_col(r, "Year")]
        if yrs and "yearBanner" in out.get(12, {}):
            out[12]["yearBanner"]["years"] = yrs
    if p["related_links"] and "related" in out.get(12, {}):
        out[12]["related"]["links"] = p["related_links"]
        if p["view_all_href"]:
            out[12]["related"]["viewAllHref"] = p["view_all_href"]

    # Sec13 FAQ
    if p["faq"] and "faqLeft" in out.get(13, {}):
        l, r = split_half(p["faq"])
        out[13]["faqLeft"] = l
        out[13]["faqRight"] = r

    if p.get("used_body") and 9 in out:
        out[9]["body"] = p["used_body"]
    add_variant_code_hrefs(out)
    return out


# ---------------------------------------------------------------------------
# ENGINE FAMILY
# ---------------------------------------------------------------------------
def parse_engine_txt(path):
    raw = read_text(path)
    fm = parse_frontmatter(raw)
    body = strip_frontmatter(raw)
    lines = [l for l in body.splitlines() if l.strip()]

    code = fm.get("engine_code", "").strip()
    if not code:
        code = re.sub(r"^Land Rover\s+", "", path.stem).strip()

    sub_m = re.search(r"^###\s+(.+)$", body, re.M)
    price = extract_price(body)

    spec = extract_kv_pipe(section_body(body, r"Land Rover.+? Engine Specifications"))

    apps = extract_md_table(section_body(body, r"Land Rover.+? Applications\s*[—-]\s*Every Model"))

    # rebuild components: bullets under "Replaced as Standard" / "Inspected and
    # Measured" — capture the whole ## section incl. its ### subheadings.
    cm = re.search(r"##\s*Land Rover.+? Rebuild Components[^\n]*\n(.*?)(?=\n##\s|\n---|\Z)", body, re.S | re.I)
    comp_block = cm.group(1) if cm else section_body(body, r"Land Rover.+? Rebuild Components")
    comp_bullets = [clean_line(b) for b in re.findall(r"^[-*]\s+(.+)$", comp_block, re.M)]
    comp_bullets = [b for b in comp_bullets if b and not b.startswith(("`[", "Photograph"))]

    about = first_paragraphs(section_body(body, r"About the Land Rover.+? Engine"), 1)
    by_model = first_paragraphs(section_body(body, r"Land Rover.+? Applications by Model"), 2)
    compat = first_paragraphs(section_body(body, r"Land Rover.+? Engine Compatibility"), 1)

    # workshop view
    wv_block = section_body(body, r"Our Workshop View of the Land Rover")
    wv = {}
    for key in ("Applications we see", "What we replace", "Known issues"):
        km = re.search(re.escape(key) + r":?\*?\*?\s*(.+?)(?=\n\*\*|\n\n|\Z)", wv_block, re.S | re.I)
        if km:
            wv[key] = clean_line(km.group(1))

    typical = first_paragraphs(section_body(body, r"A Typical Land Rover.+? Rebuild"), 1)
    tscope_m = re.search(r"\*\*Typical scope:\*\*\s*(.+)", body, re.I)

    cost_paras = first_paragraphs(section_body(body, r"Land Rover.+? Engine Rebuild Cost"), 2)

    why_items = extract_checklist(section_body(body, r"Why Choose Us for Land Rover.+? Rebuilds"))
    faq = extract_faq(body)

    fitted_m = re.search(r"Fitted Across (\d+)\s+Land Rover", body)

    return {
        "code": code,
        "title": fm.get("meta_title", fm.get("title", "")),
        "meta_description": fm.get("meta_description", ""),
        "subhead": clean_line(sub_m.group(1)) if sub_m else "",
        "price": price,
        "spec": spec,
        "applications": apps,
        "comp_bullets": comp_bullets,
        "about": about, "by_model": by_model, "compat": compat,
        "workshop_view": wv,
        "typical": typical,
        "typical_scope": clean_line(tscope_m.group(1)) if tscope_m else "",
        "cost_paras": cost_paras,
        "why_items": why_items,
        "faq": faq,
        "fitted_count": fitted_m.group(1) if fitted_m else "",
    }


def comp_icon(text):
    t = text.lower()
    for kw, ic in (("timing chain", "chain"), ("bearing", "bearing"), ("gasket", "gasket"),
                   ("seal", "gasket"), ("turbo", "turbo"), ("injector", "pump"),
                   ("fuel pump", "pump"), ("oil", "oil"), ("cool", "oil"),
                   ("crank", "piston"), ("cylinder head", "piston")):
        if kw in t:
            return ic
    return "clipboard"


# engine codes that are genuinely Land Rover units (the M139 template says
# "Land Rover" throughout — correct for these, wrong for every Benz engine).
AMG_ENGINE_CODES = {"M139", "M139L", "M152", "M156", "M159", "M177", "M178"}


def build_engine_json(template, p, ref_name):
    out = copy.deepcopy(template)
    code = p["code"]
    reps = [(f"Land Rover {ref_name}", f"Land Rover {code}"),
            (f"Land Rover|{ref_name}", f"Land Rover|{code}"),
            (ref_name, code)]
    for n in out:
        out[n] = replace_strings(out[n], reps)
    # for non-AMG engines, demote the leftover "Land Rover" brand label
    if code not in AMG_ENGINE_CODES:
        brand_reps = [("Land Rover", "Land Rover"), ("LAND ROVER-AMG", "LAND ROVER-BENZ"),
                      ("Land Rover‑AMG", "Land Rover"),
                      ("Rated AMG Engine Specialists", "Rated Land Rover Engine Specialists"),
                      ("AMG Engine Specialists", "Land Rover Engine Specialists")]
        for n in out:
            out[n] = replace_strings(out[n], brand_reps)

    price_gbp = gbp(p["price"]) if p["price"] else None

    # Sec1
    out[1]["titlePre"] = code
    if p["subhead"]:
        out[1]["subhead"] = p["subhead"]
    if price_gbp:
        set_path(out[1], "priceCta.label", price_gbp)
    if p["fitted_count"]:
        for t in out[1].get("trustBar", []):
            if "Fitted Across" in t.get("label", ""):
                t["label"] = f"Fitted Across {p['fitted_count']} Land Rover Models"

    # Sec2 specs + price
    if p["spec"] and "rows" in out.get(2, {}).get("specs", {}):
        for row in out[2]["specs"]["rows"]:
            for k, val in p["spec"].items():
                if k.lower() in row.get("label", "").lower() or row.get("label", "").lower() in k.lower():
                    row["value"] = val
    if price_gbp:
        set_path(out[2], "price.startingFromPrice", price_gbp)

    # Sec3 applications
    if p["applications"] and "rows" in out.get(3, {}):
        rows = []
        for r in p["applications"]:
            rows.append({
                "model": find_col(r, "Model"),
                "variant": find_col(r, "Variant"),
                "generation": find_col(r, "Generation"),
                "chassis": find_col(r, "Chassis"),
                "years": find_col(r, "Years"),
                "powertrain": find_col(r, "Fuel Sub-type", "Powertrain", "Fuel"),
            })
        out[3]["rows"] = rows

    # Sec4 rebuild components
    if p["comp_bullets"] and "cards" in out.get(4, {}):
        tmpl_card = template[4]["cards"][0] if template[4].get("cards") else {}
        cards = []
        for b in p["comp_bullets"][:6]:
            title = b.split("—")[0].split("(")[0].strip().rstrip(".")
            cards.append({"icon": comp_icon(b), "image": tmpl_card.get("image", "/engine/sec4.webp"),
                          "title": title[:48], "body": b})
        if cards:
            out[4]["cards"] = cards

    # Sec6 why choose
    if p["why_items"] and set_path(out[6], "whyChoose.items",
                                  [{"icon": "check", "title": w, "subtext": ""} for w in p["why_items"]]):
        for it in out[6]["whyChoose"]["items"]:
            it["icon"] = "shield-check"

    # Sec8 gallery restore
    if "gallery" in out.get(8, {}) and "gallery" in template.get(8, {}):
        out[8]["gallery"]["items"] = replace_strings(copy.deepcopy(template[8]["gallery"]["items"]), reps)

    # Sec9 about / by-model / compatibility
    if p["about"]:
        set_path(out[9], "about.body", p["about"][0])
    if p["by_model"]:
        set_path(out[9], "byModel.body", " ".join(p["by_model"]))
    if p["compat"]:
        set_path(out[9], "compatibility.body", p["compat"][0])
    if p["applications"]:
        lineup = []
        seen = set()
        for r in p["applications"]:
            m_ = find_col(r, "Model")
            g_ = find_col(r, "Generation")
            if m_ and m_ not in seen:
                seen.add(m_)
                lineup.append({"label": m_, "code": g_})
        if lineup:
            set_path(out[9], "byModel.lineup", lineup)

    # Sec10 workshop view
    wv = p["workshop_view"]
    if wv and "columns" in out.get(10, {}):
        keymap = {"APPLICATIONS WE SEE:": "Applications we see",
                  "WHAT WE REPLACE:": "What we replace",
                  "KNOWN ISSUES:": "Known issues"}
        for col in out[10]["columns"]:
            src = keymap.get(col.get("title", "").upper().strip())
            if src and wv.get(src):
                col["body"] = wv[src]
    if p["typical"]:
        set_path(out[10], "typical.body", p["typical"][0])
    if p["typical_scope"]:
        set_path(out[10], "typical.scope.text", p["typical_scope"])
    if price_gbp:
        set_path(out[10], "typical.startingFromPrice", price_gbp)

    # Sec11 cost / faq / quote
    if p["cost_paras"]:
        set_path(out[11], "costBanner.paragraphs", p["cost_paras"])
    if price_gbp:
        set_path(out[11], "costBanner.startingFromPrice", price_gbp)
    if p["faq"] and set_path(out[11], "faq.faqLeft", None):
        l, r = split_half(p["faq"])
        out[11]["faq"]["faqLeft"] = l
        out[11]["faq"]["faqRight"] = r

    return out


# ---------------------------------------------------------------------------
# page.js generators
# ---------------------------------------------------------------------------
def fn_name(slug):
    return "".join(w.capitalize() for w in re.split(r"[^a-z0-9]+", slug) if w) + "Page"


SCHEMA_IMPORT = ('import JsonLd from "@/components/shared/JsonLd";\n'
                 'import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";\n')


def gen_model_page(slug, prefix, count):
    imp = "\n".join(f'import ModelSec{n} from "@/components/model/ModelSec{n}";' for n in range(2, count + 1))
    dat = "\n".join(f'import modelSec{n} from "@/data/model/{prefix}Sec{n}.json";' for n in range(1, count + 1))
    ren = "\n      ".join(f"<ModelSec{n} data={{modelSec{n}}} />" for n in range(2, count + 1))
    return (f'import ModelHeroSec1 from "@/components/model/ModelHeroSec1";\n{imp}\n{SCHEMA_IMPORT}\n{dat}\n\n'
            f'const PATH = "/{slug}";\n'
            f'const NAME = modelSec1.h1?.replaceAll("|", " ") || "{slug}";\n'
            f'const FAQ = [...(modelSec{count}.faqLeft || []), ...(modelSec{count}.faqRight || [])];\n\n'
            f'export const metadata = {{\n'
            f'  title: NAME,\n'
            f'  description: modelSec1.subhead || "",\n  alternates: {{ canonical: PATH }},\n}};\n\n'
            f'export default function {fn_name(slug)}() {{\n  return (\n    <>\n'
            f'      <JsonLd data={{graphDoc([\n'
            f'        serviceSchema({{ name: NAME, description: modelSec1.subhead, path: PATH, price: modelSec1.priceCta?.price }}),\n'
            f'        faqSchema(FAQ, PATH),\n'
            f'        breadcrumbSchema([{{ name: "Home", path: "/" }}, {{ name: "Models", path: "/models" }}, {{ name: NAME, path: PATH }}], PATH),\n'
            f'      ])}} />\n'
            f'      <ModelHeroSec1 data={{modelSec1}} />\n      {ren}\n    </>\n  );\n}}\n')


def gen_variant_page(slug, prefix, count):
    imp = "\n".join(f'import VariantSec{n} from "@/components/variant/VariantSec{n}";' for n in range(2, count + 1))
    dat = "\n".join(f'import variantSec{n} from "@/data/variant/{prefix}Sec{n}.json";' for n in range(1, count + 1))
    ren = "\n      ".join(f"<VariantSec{n} data={{variantSec{n}}} />" for n in range(2, count + 1))
    return (f'import VariantHeroSec1 from "@/components/variant/VariantHeroSec1";\n{imp}\n{SCHEMA_IMPORT}\n{dat}\n\n'
            f'const PATH = "/{slug}";\n'
            f'const NAME = variantSec1.h1?.replaceAll("|", " ") || "{slug}";\n'
            f'const FAQ = [...(variantSec{count}.faqLeft || []), ...(variantSec{count}.faqRight || [])];\n\n'
            f'export const metadata = {{\n'
            f'  title: NAME,\n'
            f'  description: variantSec1.subhead || "",\n  alternates: {{ canonical: PATH }},\n}};\n\n'
            f'export default function {fn_name(slug)}() {{\n  return (\n    <>\n'
            f'      <JsonLd data={{graphDoc([\n'
            f'        serviceSchema({{ name: NAME, description: variantSec1.subhead, path: PATH, price: (variantSec1.priceCta?.kicker || variantSec1.h1) }}),\n'
            f'        faqSchema(FAQ, PATH),\n'
            f'        breadcrumbSchema([{{ name: "Home", path: "/" }}, {{ name: "Variants", path: "/variants" }}, {{ name: NAME, path: PATH }}], PATH),\n'
            f'      ])}} />\n'
            f'      <VariantHeroSec1 data={{variantSec1}} />\n      {ren}\n    </>\n  );\n}}\n')


def gen_engine_page(slug, prefix, count):
    imp = "\n".join(f'import Sec{n} from "@/components/engine-family/Sec{n}";' for n in range(2, count + 1))
    dat = "\n".join(f'import sec{n} from "@/data/engine-family/{prefix}Sec{n}.json";' for n in range(1, count + 1))
    ren = "\n      ".join(f"<Sec{n} data={{sec{n}}} />" for n in range(2, count + 1))
    return (f'import HeroSec1 from "@/components/engine-family/HeroSec1";\n{imp}\n{SCHEMA_IMPORT}\n{dat}\n\n'
            f'const PATH = "/{slug}";\n'
            f'const NAME = [sec1.titlePre, sec1.titleHighlight, sec1.titleLine2].filter(Boolean).join(" ") || "{slug}";\n'
            f'const FAQ = [...(sec{count}.faq?.faqLeft || []), ...(sec{count}.faq?.faqRight || [])];\n\n'
            f'export const metadata = {{\n'
            f'  title: NAME,\n'
            f'  description: sec1.subhead || "",\n  alternates: {{ canonical: PATH }},\n}};\n\n'
            f'export default function {fn_name(slug)}() {{\n  return (\n    <>\n'
            f'      <JsonLd data={{graphDoc([\n'
            f'        serviceSchema({{ name: NAME, description: sec1.subhead, path: PATH, price: (sec1.priceCta?.label || sec1.priceCta?.kicker) }}),\n'
            f'        faqSchema(FAQ, PATH),\n'
            f'        breadcrumbSchema([{{ name: "Home", path: "/" }}, {{ name: "Engines", path: "/engines" }}, {{ name: NAME, path: PATH }}], PATH),\n'
            f'      ])}} />\n'
            f'      <HeroSec1 data={{sec1}} />\n      {ren}\n    </>\n  );\n}}\n')


# ---------------------------------------------------------------------------
# orchestration
# ---------------------------------------------------------------------------
_cur_path = None  # set per-variant so build_variant_json can re-read source sections


def run_model(dry, limit):
    tmpl = load_template(MODEL_REF["prefix"], MODEL_REF["count"], "model")
    files = sorted(MODEL_MD_DIR.glob("*.md"))
    if limit:
        files = files[:limit]
    seen = {MODEL_REF["slug"]}
    manifest = []
    for f in files:
        if f.name.lower() in SKIP_SOURCE:
            continue
        p = parse_model_md(f)
        slug = p["slug"]
        if slug in seen:
            print(f"  skip dup /{slug}  ({f.name})")
            continue
        seen.add(slug)
        prefix = model_prefix(slug)
        out = build_model_json(tmpl, p, MODEL_REF["name"])
        manifest.append({"type": "model", "slug": slug, "title": p["title"] or f"Land Rover {p['model']}"})
        print(f"  model  -> /{slug}  ({f.name})  [{prefix}]")
        if not dry:
            for n, d in out.items():
                write_json(DATA / "model" / f"{prefix}Sec{n}.json", d)
            (APP / slug).mkdir(parents=True, exist_ok=True)
            (APP / slug / "page.js").write_text(gen_model_page(slug, prefix, MODEL_REF["count"]), encoding="utf-8")
    return manifest


def run_variant(dry, limit):
    global _cur_path
    tmpl = load_template(VARIANT_REF["prefix"], VARIANT_REF["count"], "variant")
    files = sorted(VARIANT_TXT_DIR.glob("*.txt"))
    if limit:
        files = files[:limit]
    seen = set()
    for mf in sorted(MODEL_MD_DIR.glob("*.md")):
        seen.add(parse_model_md(mf)["slug"])
    manifest = []
    for f in files:
        if f.name.lower() in SKIP_SOURCE:
            continue
        if re.search(r"\(\d+\)\s*$", f.stem):  # duplicate export
            print(f"  skip dup-export  ({f.name})")
            continue
        if is_ev_variant(f):
            print(f"  skip EV (no combustion engine)  ({f.name})")
            continue
        _cur_path = f
        name = strip_brand(f.stem)
        p = parse_variant_txt(f, name)
        slug = "landrover-" + slugify(name) + "-engines"
        if slug in seen:
            print(f"  skip dup /{slug}  ({f.name})")
            continue
        seen.add(slug)
        prefix = variant_prefix(slug)
        out = build_variant_json(tmpl, p, VARIANT_REF["name"])
        manifest.append({"type": "variant", "slug": slug, "title": f"Land Rover {name} Engine Rebuild"})
        print(f"  variant -> /{slug}  ({f.name})  [{prefix}]")
        if not dry:
            for n, d in out.items():
                write_json(DATA / "variant" / f"{prefix}Sec{n}.json", d)
            (APP / slug).mkdir(parents=True, exist_ok=True)
            (APP / slug / "page.js").write_text(gen_variant_page(slug, prefix, VARIANT_REF["count"]), encoding="utf-8")
    return manifest


def run_engine(dry, limit):
    tmpl = load_template(ENGINE_REF["prefix"], ENGINE_REF["count"], "engine-family")
    files = sorted(ENGINE_TXT_DIR.glob("*.txt"))
    if limit:
        files = files[:limit]
    seen = {ENGINE_REF["slug"]}
    manifest = []
    for f in files:
        if f.name.lower() in SKIP_SOURCE:
            print(f"  skip ref  ({f.name})")
            continue
        p = parse_engine_txt(f)
        code = p["code"]
        slug = f"landrover-{slugify(code)}-engine"
        if slug in seen:
            print(f"  skip dup /{slug}  ({f.name})")
            continue
        seen.add(slug)
        prefix = "landrover" + camel(slugify(code))
        out = build_engine_json(tmpl, p, ENGINE_REF["name"])
        manifest.append({"type": "engine", "slug": slug, "title": p["title"] or f"Land Rover {code} Engine"})
        print(f"  engine -> /{slug}  ({f.name})  [{prefix}]")
        if not dry:
            for n, d in out.items():
                write_json(DATA / "engine-family" / f"{prefix}Sec{n}.json", d)
            (APP / slug).mkdir(parents=True, exist_ok=True)
            (APP / slug / "page.js").write_text(gen_engine_page(slug, prefix, ENGINE_REF["count"]), encoding="utf-8")
    return manifest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--type", choices=["model", "variant", "engine", "all"], default="all")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    args = ap.parse_args()

    manifest = []
    if args.type in ("model", "all"):
        print("== MODELS ==")
        manifest += run_model(args.dry_run, args.limit)
    if args.type in ("variant", "all"):
        print("== VARIANTS ==")
        manifest += run_variant(args.dry_run, args.limit)
    if args.type in ("engine", "all"):
        print("== ENGINES ==")
        manifest += run_engine(args.dry_run, args.limit)

    # the 3 hand-built reference pages are never "generated" but must still be
    # in the manifest that feeds the sitemap.
    if args.type == "all":
        manifest += [
            {"type": "model", "slug": MODEL_REF["slug"], "title": "Land Rover C-Class Engine Rebuild"},
            {"type": "variant", "slug": VARIANT_REF["slug"], "title": "Land Rover AMG GT 53 Engine Rebuild"},
            {"type": "engine", "slug": ENGINE_REF["slug"], "title": "Land Rover M139 Engine Rebuild"},
        ]
        manifest.sort(key=lambda r: (r["type"], r["slug"]))

    if not args.dry_run:
        if args.type == "all":
            OUT_DIR.mkdir(parents=True, exist_ok=True)
            write_json(OUT_DIR / "site-routes.json", manifest)
            write_json(DATA / "shared" / "siteRoutes.json", manifest)
        else:
            # a partial run (--type model|variant|engine) must NOT clobber the
            # full manifest — merge this type's entries into what's on disk.
            mp = DATA / "shared" / "siteRoutes.json"
            existing = json.loads(mp.read_text(encoding="utf-8")) if mp.exists() else []
            kinds = {m["type"] for m in manifest} | {"model" if args.type == "model" else
                                                     "variant" if args.type == "variant" else "engine"}
            merged = [r for r in existing if r["type"] not in kinds] + manifest
            merged.sort(key=lambda r: (r["type"], r["slug"]))
            write_json(mp, merged)
            print(f"  (partial run — merged {len(manifest)} {args.type} routes into manifest, now {len(merged)})")
    print(f"\nDone. {len(manifest)} pages {'would be ' if args.dry_run else ''}generated.")


if __name__ == "__main__":
    main()
