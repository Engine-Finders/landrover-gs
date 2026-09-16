#!/usr/bin/env python3
"""
Post-processing pass for the Mercedes site: reads every generated + reference
model / variant / engine-family JSON set and patches real internal hrefs into
the fields the components already know how to render as links.

Idempotent — recomputes hrefs fresh each run. Run AFTER
migrate_mercedes_content.py (needs src/data/shared/siteRoutes.json).

Usage: python scripts/inject_crosslinks_mercedes.py [--dry-run]
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
sys.path.insert(0, str(Path(__file__).resolve().parent))
from migrate_mercedes_content import model_prefix, camel, ENGINE_CODE_RE  # noqa: E402

REFS = [
    {"type": "model", "slug": "mercedes-c-class-engines"},
    {"type": "variant", "slug": "mercedes-amg-gt-53-engines"},
    {"type": "engine", "slug": "mercedes-amg-m139-engine"},
]


def norm(s):
    s = re.sub(r"^mercedes[- ]", "", s.strip(), flags=re.I)
    s = re.sub(r"\b(amg|benz|maybach)\b", "", s, flags=re.I)
    return re.sub(r"[^a-z0-9]+", " ", s.lower()).strip()


def load_json(p):
    return json.loads(Path(p).read_text(encoding="utf-8"))


def save_json(p, d, dry):
    if not dry:
        Path(p).write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def engine_code_from_slug(slug):
    core = slug[len("mercedes-"):-len("-engine")]
    core = re.sub(r"^amg-", "", core)
    return core.upper()


def engine_prefix(slug):
    return camel(re.sub(r"^amg-", "", slug[len("mercedes-"):-len("-engine")]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    dry = ap.parse_args().dry_run

    routes = load_json(DATA / "shared" / "siteRoutes.json") + REFS

    engine_href, model_href, variant_href = {}, {}, {}
    engine_prefixes, model_prefixes, variant_prefixes = {}, {}, {}
    for r in routes:
        slug, typ = r["slug"], r["type"]
        if typ == "engine":
            engine_href[engine_code_from_slug(slug)] = f"/{slug}"
            engine_prefixes[slug] = engine_prefix(slug)
        elif typ == "model":
            model_href[norm(slug.replace("-engines", ""))] = f"/{slug}"
            model_prefixes[slug] = model_prefix(slug)
        elif typ == "variant":
            variant_href[norm(slug.replace("-engines", ""))] = f"/{slug}"
            variant_prefixes[slug] = model_prefix(slug)

    # variant -> parent model (from its own Sec2 spec block)
    variant_parent = {}
    for slug, pref in variant_prefixes.items():
        p2 = DATA / "variant" / f"{pref}Sec2.json"
        if p2.exists():
            specs = {s.get("label"): s.get("value") for s in load_json(p2).get("specs", [])}
            if specs.get("Model"):
                variant_parent[slug] = specs["Model"]

    print(f"lookups: {len(engine_href)} engines, {len(model_href)} models, {len(variant_href)} variants")

    def find_code(text):
        for c in ENGINE_CODE_RE.findall(text or ""):
            if c in engine_href:
                return c
        return None

    n = 0

    # ---- ENGINE Sec3: model / variant cells ----
    for slug, pref in {**engine_prefixes, "mercedes-amg-m139-engine": "m139"}.items():
        p3 = DATA / "engine-family" / f"{pref}Sec3.json"
        if not p3.exists():
            continue
        d = load_json(p3)
        for row in d.get("rows", []):
            mh = model_href.get(norm(row.get("model", "")))
            if mh:
                row["modelHref"] = mh
            vh = variant_href.get(norm(row.get("variant", "")))
            if vh:
                row["variantHref"] = vh
        save_json(p3, d, dry)
        n += 1

    # ---- MODEL patches ----
    for slug, pref in {**model_prefixes, "mercedes-c-class-engines": "mercedesCClass"}.items():
        base = DATA / "model"
        p3 = base / f"{pref}Sec3.json"
        if p3.exists():
            d = load_json(p3)
            for c in d.get("cards", []):
                code = find_code(c.get("code", ""))
                if code:
                    c["codeHref"] = engine_href[code]
            save_json(p3, d, dry)
        p4 = base / f"{pref}Sec4.json"
        if p4.exists():
            d = load_json(p4)
            for r in d.get("rows", []):
                code = find_code(r.get("family", ""))
                if code:
                    r["familyHref"] = engine_href[code]
            save_json(p4, d, dry)
        p10 = base / f"{pref}Sec10.json"
        if p10.exists():
            d = load_json(p10)
            cards = d.get("cards", [])
            for c in cards:
                vh = variant_href.get(norm(c.get("model", "")))
                if vh:
                    c["href"] = vh
                else:
                    c.pop("href", None)
            linked = [c for c in cards if c.get("href")]
            # "Most Popular Rebuilds" is a navigation section — if any card can
            # link, keep only the ones that do and renumber; if none can (a model
            # with no dedicated variant pages yet) leave the list as plain info.
            if linked:
                for i, c in enumerate(linked, 1):
                    c["number"] = f"{i:02d}"
                d["cards"] = linked
                if isinstance(d.get("subhead"), str):
                    d["subhead"] = re.sub(r"these\s+\d+\s+are", "these are", d["subhead"])
            save_json(p10, d, dry)
        p15 = base / f"{pref}Sec15.json"
        if p15.exists():
            d = load_json(p15)
            m = re.match(r"Mercedes\s+(.+?)\s+Model:?$", d.get("checklistTitleHighlight", "").strip())
            vh = variant_href.get(norm(m.group(1))) if m else None
            # only keep the link if it resolves to a real variant page; the
            # template's leftover "#quote-form" would otherwise make these
            # per-year coverage items link to the quote form, which is wrong.
            if vh:
                d["checklistHref"] = vh
            else:
                d.pop("checklistHref", None)
            save_json(p15, d, dry)
        p17 = base / f"{pref}Sec17.json"
        if p17.exists():
            d = load_json(p17)
            new_tabs, new_tv = [], []
            for label, tab in zip(d.get("tabs", []), d.get("tabVariants", [])):
                kept = []
                for item in tab:
                    if not isinstance(item, dict):
                        item = {"label": str(item)}
                    vh = variant_href.get(norm(item.get("label", "")))
                    if vh:
                        item["href"] = vh
                        kept.append(item)
                if kept:
                    new_tabs.append(label)
                    new_tv.append(kept)
            if new_tabs:
                d["tabs"], d["tabVariants"], d["activeTab"] = new_tabs, new_tv, 0
            save_json(p17, d, dry)
        n += 1

    # ---- VARIANT patches ----
    for slug, pref in {**variant_prefixes, "mercedes-amg-gt-53-engines": "mercedesAmgGt53"}.items():
        base = DATA / "variant"
        p3 = base / f"{pref}Sec3.json"
        if p3.exists():
            d = load_json(p3)
            for c in d.get("cards", []):
                code = find_code(c.get("code", ""))
                if code:
                    c["codeHref"] = engine_href[code]
            save_json(p3, d, dry)
        p10 = base / f"{pref}Sec10.json"
        if p10.exists():
            d = load_json(p10)
            for c in d.get("codes", {}).get("cards", []):
                code = find_code(c.get("codeHighlight", ""))
                if code:
                    c["codeHref"] = engine_href[code]
            for r in d.get("applications", {}).get("rows", []):
                code = find_code(r.get("engineCode", ""))
                if code:
                    r["codeHref"] = engine_href[code]
            save_json(p10, d, dry)
        p11 = base / f"{pref}Sec11.json"
        if p11.exists():
            d = load_json(p11)
            for r in d.get("rows", []):
                code = find_code(r.get("engineCode", ""))
                if code:
                    r["codeHref"] = engine_href[code]
            save_json(p11, d, dry)
        p12 = base / f"{pref}Sec12.json"
        if p12.exists():
            d = load_json(p12)
            rel = d.setdefault("related", {})
            good = []
            for l in rel.get("links", []):
                if not isinstance(l, dict):
                    continue
                key = norm(re.sub(r"\bEngine\b", "", l.get("label", "")))
                href = variant_href.get(key) or (l.get("href") if l.get("href", "").strip("/") in
                                                 {r["slug"] for r in routes} else None)
                if href:
                    good.append({"label": l["label"], "href": href})
            if good:
                rel["links"] = good
            parent = variant_parent.get(slug)
            if parent and norm(parent) in model_href:
                rel["viewAllHref"] = model_href[norm(parent)]
                rel["viewAll"] = f"View All Mercedes {parent} Engines"
                rel["title"] = f"RELATED MERCEDES {parent.upper()} VARIANTS"
            save_json(p12, d, dry)
        n += 1

    print(f"Done. patched {n} page sets{' (dry-run)' if dry else ''}.")


if __name__ == "__main__":
    main()
