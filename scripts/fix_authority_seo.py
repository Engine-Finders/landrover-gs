#!/usr/bin/env python3
"""
One-off fix-up over the authority pages (inline-HTML page.js files):
  - remaps legacy/guessed internal links to real routes (no dead links)
  - normalises the old 01268 number to the live 0203 488 4649
  - repairs in-page anchors that pointed at ids which don't exist
  - fills empty meta descriptions from the hero lede
Idempotent. Usage: python scripts/fix_authority_seo.py
"""
import html as htmllib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"
ROUTES = {p.parent.name for p in APP.glob("*/page.js")}

MODEL_HUBS = {
    "defender": "defender-engines",
    "discovery": "discovery-engines",
    "discovery-sport": "discovery-sport-engines",
    "freelander": "freelander-engines",
    "range-rover-evoque": "range-rover-evoque-engines",
    "range-rover-sport": "range-rover-sport-engines",
    "range-rover-velar": "range-rover-velar-engines",
    "range-rover": "models",  # no full-size Range Rover model page
}

EXPLICIT = {
    "landrover-engine-rebuild": "land-rover-engine-rebuild-process",
    "engine-matching": "land-rover-engine-matching-by-registration-vin",
    "landrover-engine-matching": "land-rover-engine-matching-by-registration-vin",
    "landrover-bmw-v8-hot-vee-repair": "land-rover-bmw-sourced-v8-hot-vee-repair",
    "landrover-cylinder-head-repair": "land-rover-cylinder-head-repair-rebuild",
    "landrover-engine-compatibility": "land-rover-engine-compatibility-application-matching",
    "landrover-engine-components-replaced": "land-rover-engine-components-we-replace",
    "landrover-engine-recovery": "land-rover-nationwide-engine-recovery",
    "landrover-engine-removal-refit": "land-rover-engine-removal-refit-and-final-testing",
    "landrover-engine-supply-fit": "land-rover-engine-supply-and-fit",
    "landrover-engine-warranty": "land-rover-engine-rebuild-warranty-explained",
    "landrover-inside-workshop": "land-rover-inside-our-workshop",
    "landrover-rebuild-vs-reconditioned": "land-rover-rebuild-vs-reconditioned-what-s-the-difference",
    "landrover-rebuild-vs-used": "land-rover-rebuild-vs-used-engine",
    "landrover-repair-vs-rebuild": "land-rover-repair-vs-full-rebuild",
    "landrover-trade-fleet-engines": "land-rover-trade-fleet-engine-services",
    "landrover-tdv6sdv6-m57d30-engine": "landrover-tdv6-sdv6-engine",
    "landrover-tdv8sdv8-engine": "landrover-tdv8-sdv8-engine",
    "landrover-n63-bmw-sourced-engine": "landrover-n63-engine",
    # no blog on this site: point each article link at the page covering the same topic
    "blog/buying-land-rover-aj200d-engine-guide": "landrover-aj200d-engine",
    "blog/buying-land-rover-tdv6sdv6-m57d30-engine-guide": "landrover-tdv6-sdv6-engine",
    "blog/land-rover-inside-our-machine-shop-boring-honing-and-grinding-explained": "land-rover-engine-machining",
    "blog/land-rover-rebuild-replacement-or-used-engine-how-we-actually-decide": "land-rover-rebuild-vs-replacement",
    "blog/land-rover-what-actually-determines-an-engine-rebuild-cost": "pricing-legal-disclaimer",
    "blog/land-rover-what-we-check-on-every-rebuild-every-time": "land-rover-engine-inspection-assessment",
    "blog/land-rover-why-compatibility-risk-matters-more-than-price": "land-rover-engine-compatibility-application-matching",
}

squash = lambda s: re.sub(r"[^a-z0-9]", "", s)
SQUASHED = {squash(r): r for r in ROUTES}


def resolve(slug):
    if slug in ROUTES:
        return slug
    if slug in EXPLICIT:
        return EXPLICIT[slug]
    m = re.fullmatch(r"landrover-(.+)-engines", slug)
    if m:
        body = m.group(1)
        if body in MODEL_HUBS:
            return MODEL_HUBS[body]
        # "landrover-defender-defender-td5-engines" -> "landrover-defender-td5-engines"
        for model in sorted(MODEL_HUBS, key=len, reverse=True):
            short = model.split("-")[-1]
            for dup in (f"{model}-{model}-", f"{model}-{short}-"):
                if body.startswith(dup):
                    variant = body[len(dup):]
                    for cand in (f"landrover-{model}-{variant}-engines", f"landrover-{short}-{variant}-engines"):
                        if cand in ROUTES:
                            return cand
                        if squash(cand) in SQUASHED:
                            return SQUASHED[squash(cand)]
                    return MODEL_HUBS[model]
    cand = "land-rover-" + slug[len("landrover-"):] if slug.startswith("landrover-") else None
    return cand if cand in ROUTES else None


def main():
    unresolved, changed = set(), 0
    for p in sorted(APP.glob("*/page.js")):
        t = p.read_text(encoding="utf-8")
        if "authority-page" not in t:
            continue
        orig = t

        def fix_href(m):
            path, rest = m.group(1), m.group(2) or ""
            target = resolve(path)
            if target is None:
                unresolved.add(path)
                return m.group(0)
            return f'href=\\"/{target}{rest}\\"'

        t = re.sub(r'href=\\"/([a-z0-9/-]+?)(#[^\\"]*)?\\"', fix_href, t)

        # phone: old 01268 line -> live number (WhatsApp mobile is a separate, valid line)
        t = re.sub(r"tel:\+?44 ?0?1268 ?944 ?234", "tel:02034884649", t)
        t = t.replace("+44 01268 944 234", "0203 488 4649").replace("01268 944 234", "0203 488 4649")

        # anchors pointing at ids which don't exist
        t = t.replace('href=\\"#how-we-work\\"', 'href=\\"#our-process\\"')
        if 'href=\\"#applicable-models\\"' in t and 'id=\\"applicable-models\\"' not in t:
            t = re.sub(
                r'<section class=\\"(section(?:-alt)?)\\">(\\n\s*<div class=\\"section-inner\\">\\n\s*<h2>Applicable )',
                r'<section class=\\"\1\\" id=\\"applicable-models\\">\2',
                t,
                count=1,
            )

        # empty meta description -> hero lede
        if re.search(r'description: "",\n', t):
            body = json.loads(re.search(r'__html: (".*?"),?\n\s*}}', t, re.S).group(1))
            lede = re.search(r'class="lede">(.*?)</p>', body, re.S)
            if lede:
                d = htmllib.unescape(re.sub(r"<[^>]+>", "", lede.group(1))).strip()
                d = re.sub(r"\s+", " ", d)
                if not d.endswith("."):
                    d += "."
                if len(d) < 110:
                    d += " Fixed-price quotes, nationwide recovery and a 12-month unlimited-mileage warranty."
                enc = json.dumps(d, ensure_ascii=False)
                t = t.replace('description: "",\n', f"description: {enc},\n", 1)
                t = t.replace('description: "", path:', f"description: {enc}, path:", 1)

        if t != orig:
            p.write_text(t, encoding="utf-8")
            changed += 1
    print(f"patched {changed} authority pages")
    if unresolved:
        print("UNRESOLVED:", sorted(unresolved))


if __name__ == "__main__":
    main()
