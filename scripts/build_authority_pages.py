#!/usr/bin/env python3
"""
Parses mercedes-garage/AuthoritivepagesMercedes.txt (a stack of ~34 standalone
HTML documents separated by "Tab N" lines) into clean, theme-consistent
Authority pages driven by the shared AuthorityPage component.

For each tab:
  - pulls <title>, <meta description>, JSON-LD @id
  - extracts semantic sections (hero / prose / steps / faq / link lists)
  - remaps the source's internal href scheme onto the real routes on this site
    (drops the link, keeping the text, if no real route matches)
  - writes src/data/authority/<slug>.json + src/app/<slug>/page.js
  - appends the pages to the sitemap manifest and adds a "Guides" nav dropdown

Usage: python scripts/build_authority_pages.py
"""
import html as htmlmod
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
APP = ROOT / "src" / "app"
SRC_FILE = ROOT / "AuthoritivepagesMercedes.txt"

# title -> slug for the tabs whose JSON-LD lacks an @id
TITLE_SLUG = {
    "Mercedes-Benz Engine Rebuild Specialists": "mercedes-engine-rebuild",
    "Mercedes-Benz Engine Replacement & Fitting": "mercedes-engine-replacement",
    "Mercedes-Benz Engine Supply & Fit": "mercedes-engine-supply-fit",
    "Mercedes-Benz Engine Breakdown Recovery & Nationwide Collection": "mercedes-engine-recovery",
    "Mercedes Diesel Timing Chain & Injector Repair": "mercedes-diesel-timing-chain-repair",
    "Mercedes AMG V8 Valve Seal & Coolant Repair": "mercedes-amg-v8-valve-seal-repair",
    "Mercedes 4-Cylinder Timing Chain Repair (M270/M274)": "mercedes-4cyl-timing-chain-repair",
    "Mercedes OM654 Coolant System Repair": "mercedes-om654-coolant-repair",
    "Mercedes Engine Bearing Replacement": "mercedes-engine-bearing-replacement",
    "Mercedes Cylinder Head Repair & Rebuild": "mercedes-cylinder-head-repair",
    "Mercedes Turbo & Ancillary Repair": "mercedes-turbo-ancillary-repair",
    "Mercedes Engine Machining & Rebuild Preparation": "mercedes-engine-machining",
    "Mercedes-Benz Engine Failure Repair Specialists": "mercedes-engine-failure-repair",
    "Mercedes-Benz Failed Engine Rebuild Remediation": "mercedes-failed-rebuild-remediation",
    "Mercedes-Benz Timing Chain Failure Repair": "mercedes-timing-chain-failure-repair",
    "Mercedes-Benz Engine Rebuild vs Replacement": "mercedes-rebuild-vs-replacement",
    "Mercedes-Benz Rebuild vs Replacement": "mercedes-rebuild-vs-replacement",
    "Mercedes-Benz Rebuild vs Used Engine": "mercedes-rebuild-vs-used",
    "Mercedes-Benz Rebuild vs Remanufactured": "mercedes-rebuild-vs-remanufactured",
    "Mercedes-Benz Rebuild vs Reconditioned": "mercedes-rebuild-vs-reconditioned",
    "Mercedes-Benz Repair vs Full Rebuild": "mercedes-repair-vs-rebuild",
    "Mercedes-Benz Engine Inspection & Assessment": "mercedes-engine-inspection-assessment",
    "Mercedes-Benz Engine Matching by Registration & VIN": "mercedes-engine-matching",
    "Mercedes-Benz Engine Compatibility & Application Matching": "mercedes-engine-compatibility",
    "Mercedes-Benz Engine Components We Replace (Overview)": "mercedes-engine-components-replaced",
    "Mercedes-Benz Engine Rebuild Warranty Explained": "mercedes-engine-rebuild-warranty",
    "Mercedes-Benz Trade & Fleet Engine Services": "mercedes-trade-fleet-engine-services",
    "Mercedes-Benz Engine Removal, Refit & Final Testing": "mercedes-engine-removal-refit",
    "Mercedes-Benz High-Mileage Engine Rebuild": "mercedes-high-mileage-engine-rebuild",
    "Mercedes-AMG Performance Engine Rebuild": "mercedes-amg-performance-engine-rebuild",
    "Mercedes-Benz Engine Rebuild Process": "mercedes-engine-rebuild-process",
    "Mercedes Oil Leak & Gasket Repair": "mercedes-oil-leak-gasket-repair",
}

NAV_LABEL = {
    "mercedes-engine-rebuild": "Engine Rebuild",
    "mercedes-engine-replacement": "Engine Replacement",
    "mercedes-engine-supply-fit": "Engine Supply & Fit",
    "mercedes-engine-recovery": "Nationwide Recovery",
    "mercedes-engine-rebuild-process": "The Rebuild Process",
    "mercedes-diesel-timing-chain-repair": "Diesel Timing Chain Repair",
    "mercedes-4cyl-timing-chain-repair": "4-Cyl Timing Chain Repair",
    "mercedes-amg-v8-valve-seal-repair": "AMG V8 Valve Seal Repair",
    "mercedes-cylinder-head-repair": "Cylinder Head Repair",
    "mercedes-turbo-ancillary-repair": "Turbo & Ancillary Repair",
    "mercedes-engine-bearing-replacement": "Engine Bearing Replacement",
    "mercedes-oil-leak-gasket-repair": "Oil Leak & Gasket Repair",
    "mercedes-rebuild-vs-replacement": "Rebuild vs Replacement",
    "mercedes-rebuild-vs-used": "Rebuild vs Used Engine",
    "mercedes-engine-matching": "Engine Matching by Reg",
    "mercedes-engine-rebuild-warranty": "Rebuild Warranty Explained",
    "mercedes-trade-fleet-engine-services": "Trade & Fleet Services",
}

HREF_MAP = {
    "/get-a-quote": "/contact", "/contact-us": "/contact", "/about-us": "/about",
    "/pricing-disclaimer": "/pricing-legal-disclaimer", "/cookie-policy": "/privacy-policy",
    "/mercedes-engine-teardown": "/mercedes-engine-machining",
    "/mercedes-performance-engine-rebuild": "/mercedes-amg-performance-engine-rebuild",
    "/mercedes-engine-rebuild-case-studies": "/mercedes-engine-rebuild",
    "/mercedes-inside-workshop": "/about",
}


def real_routes():
    return {"/" + p.parent.name for p in APP.glob("*/page.js")} | {"/"}


ROUTES = real_routes()
AUTH_SLUGS = set()  # filled as we discover them, so intra-set links validate


PHONE = "0203 488 4649"


def unescape(s):
    s = htmlmod.unescape(s).replace("‑", "-").replace("’", "'").strip()
    # source HTML carries the old workshop number — normalise to the Contact-Us one
    s = s.replace("+44 01268 944 234", PHONE).replace("01268 944 234", PHONE)
    s = s.replace("tel:+4401268944234", "tel:" + PHONE.replace(" ", "")).replace("tel:01268944234", "tel:" + PHONE.replace(" ", ""))
    return s


def remap_href(href):
    href = href.split("#")[0].strip()
    if not href or href.startswith(("http", "mailto:", "tel:")):
        return href or None
    if href in HREF_MAP:
        href = HREF_MAP[href]
    if href in ROUTES or href.strip("/") in AUTH_SLUGS:
        return href
    core = href.strip("/")
    # engine pages already share our scheme
    if core.startswith("mercedes-") and core.endswith("-engine"):
        return href if href in ROUTES else None
    # model / variant pages: source omits the "mercedes-" prefix and prepends
    # the model slug to variants. Try progressively dropping leading segments.
    if core.endswith("-engines"):
        parts = core[:-len("-engines")].split("-")
        for k in range(len(parts)):
            cand = "/mercedes-" + "-".join(parts[k:]) + "-engines"
            if cand in ROUTES:
                return cand
        # fall back to the model index page
        cand = "/mercedes-" + parts[0] + ("-class" if parts[1:2] == ["class"] else "") + "-engines"
        if cand in ROUTES:
            return cand
    return None


def clean_inline(fragment):
    """HTML inline fragment -> plain text with [label](href) + **bold** markers,
    dropping links whose target doesn't resolve on this site."""
    def a_sub(m):
        href = remap_href(m.group(1))
        label = clean_inline(m.group(2))
        return f"[{label}]({href})" if href else label

    s = fragment
    s = re.sub(r'<a\s+[^>]*href="([^"]*)"[^>]*>(.*?)</a>', a_sub, s, flags=re.S | re.I)
    s = re.sub(r'<(strong|b)>(.*?)</\1>', lambda m: f"**{clean_inline(m.group(2))}**", s, flags=re.S | re.I)
    s = re.sub(r'<em>(.*?)</em>', r"\1", s, flags=re.S | re.I)
    s = re.sub(r"<[^>]+>", "", s)
    return unescape(re.sub(r"\s+", " ", s))


def li_chips(li_html):
    """A model-group <li> is either link-separated ('218d, 220d') or plain
    slash-joined text ('730d/740d') — pull out real {label, href} chips
    either way, instead of leaving it as one comma-joined text blob."""
    links = re.findall(r'<a\s+href="([^"]*)"[^>]*>(.*?)</a>', li_html, re.S | re.I)
    if links:
        return [{"label": clean_inline(lbl), "href": remap_href(href)} for href, lbl in links]
    text = clean_inline(li_html)
    return [{"label": part.strip(), "href": None} for part in re.split(r"\s*/\s*", text) if part.strip()]


def parse_prose(inner):
    heading = ""
    hm = re.search(r"<h2[^>]*>(.*?)</h2>", inner, re.S | re.I)
    if hm:
        heading = clean_inline(hm.group(1))
    matches = list(re.finditer(
        r'<h3[^>]*>(?P<h3>.*?)</h3>'
        r'|<div class="issue-callout"[^>]*>(?P<callout>.*?)</div>'
        r'|<div class="model-grid"[^>]*>(?P<grid>.*?)</div>'
        r'|<ul[^>]*>(?P<ul>.*?)</ul>'
        r'|<p[^>]*>(?P<p>.*?)</p>',
        inner, re.S | re.I,
    ))
    blocks = []
    i = 0
    while i < len(matches):
        m = matches[i]
        if m.group("h3"):
            h3_raw = m.group("h3")
            # a model heading immediately followed by its variant-code list ->
            # one clean chip group, not a raw "[Label](href)" bullet dump
            nxt = matches[i + 1] if i + 1 < len(matches) else None
            if nxt is not None and nxt.group("ul") is not None:
                lm = re.search(r'<a\s+href="([^"]*)"[^>]*>(.*?)</a>', h3_raw, re.S | re.I)
                model = {"label": clean_inline(lm.group(2)), "href": remap_href(lm.group(1))} if lm \
                    else {"label": clean_inline(h3_raw), "href": None}
                chips = []
                for li in re.findall(r"<li[^>]*>(.*?)</li>", nxt.group("ul"), re.S | re.I):
                    chips.extend(li_chips(li))
                blocks.append({"t": "modelgroup", "model": model, "chips": chips})
                i += 2
                continue
            blocks.append({"t": "h3", "text": clean_inline(h3_raw)})
        elif m.group("callout"):
            c = m.group("callout")
            ch = re.search(r"<h[34][^>]*>(.*?)</h[34]>", c, re.S | re.I)
            cps = [clean_inline(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", c, re.S | re.I)]
            blocks.append({"t": "callout", "heading": clean_inline(ch.group(1)) if ch else "",
                           "paras": [p for p in cps if p]})
        elif m.group("grid"):
            items = []
            for lm in re.finditer(r'<a\s+href="([^"]*)"[^>]*>(.*?)</a>', m.group("grid"), re.S | re.I):
                href = remap_href(lm.group(1))
                items.append({"label": clean_inline(lm.group(2)), "href": href})
            if items:
                blocks.append({"t": "linkgrid", "items": items})
        elif m.group("ul") is not None:
            items = [clean_inline(li) for li in re.findall(r"<li[^>]*>(.*?)</li>", m.group("ul"), re.S | re.I)]
            items = [i for i in items if i]
            if items:
                blocks.append({"t": "ul", "items": items})
        elif m.group("p") is not None:
            t = clean_inline(m.group("p"))
            if t and "reg-input" not in t.lower():
                blocks.append({"t": "p", "html": t})
        i += 1
    return heading, blocks


def parse_steps(inner):
    hm = re.search(r"<h2[^>]*>(.*?)</h2>", inner, re.S | re.I)
    heading = clean_inline(hm.group(1)) if hm else ""
    steps = []
    for sm in re.finditer(r'<div class="(?:hiw-step|stepper-step)"[^>]*>(.*?)</div>', inner, re.S | re.I):
        blk = sm.group(1)
        tm = re.search(r"<h4[^>]*>(.*?)</h4>", blk, re.S | re.I)
        pm = re.search(r"<p[^>]*>(.*?)</p>", blk, re.S | re.I)
        steps.append({"title": clean_inline(tm.group(1)) if tm else "",
                      "body": clean_inline(pm.group(1)) if pm else ""})
    return heading, [s for s in steps if s["body"] or s["title"]]


def parse_faq(inner):
    hm = re.search(r"<h2[^>]*>(.*?)</h2>", inner, re.S | re.I)
    heading = clean_inline(hm.group(1)) if hm else "Frequently Asked Questions"
    items = []
    for dm in re.finditer(r"<details[^>]*>(.*?)</details>", inner, re.S | re.I):
        blk = dm.group(1)
        sm = re.search(r"<summary[^>]*>(.*?)</summary>", blk, re.S | re.I)
        if not sm:
            continue
        ans = re.sub(r"<summary[^>]*>.*?</summary>", "", blk, flags=re.S | re.I)
        paras = [clean_inline(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", ans, re.S | re.I)] or [clean_inline(ans)]
        items.append({"q": clean_inline(sm.group(1)), "a": " ".join(p for p in paras if p)})
    return heading, items


def parse_tab(chunk):
    tm = re.search(r"<title>(.*?)</title>", chunk, re.S | re.I)
    title = unescape(tm.group(1)) if tm else ""
    dm = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', chunk, re.I)
    desc = unescape(dm.group(1)) if dm else ""
    idm = re.search(r'"@id":\s*"https://mercedesgarage\.uk/([a-z0-9-]+)"', chunk)
    base_title = title.split("|")[0].strip()
    # the hand-checked TITLE_SLUG map wins; JSON-LD @id is often a stale copy
    slug = TITLE_SLUG.get(base_title) or (idm.group(1) if idm else None)
    if not slug:
        slug = re.sub(r"[^a-z0-9]+", "-", base_title.lower()).strip("-")

    body = chunk
    body = re.sub(r"<footer.*?</footer>", "", body, flags=re.S | re.I)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S | re.I)

    h1m = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S | re.I)
    ledem = re.search(r'<p class="lede"[^>]*>(.*?)</p>', body, re.S | re.I)
    ctas = []
    hero_m = re.search(r'<section class="hero[^"]*"[^>]*>(.*?)</section>', body, re.S | re.I)
    if hero_m:
        for cm in re.finditer(r'<a\s+href="([^"]*)"[^>]*class="btn-[^"]*"[^>]*>(.*?)</a>', hero_m.group(1), re.S | re.I):
            href = remap_href(cm.group(1))
            if href:
                ctas.append({"label": clean_inline(cm.group(2)), "href": href})

    sections = []
    for sm in re.finditer(r"<section\b[^>]*>(.*?)</section>", body, re.S | re.I):
        inner = sm.group(1)
        if "<h1" in inner.lower():
            continue  # hero handled separately
        low = inner.lower()
        if 'class="how-it-works"' in low or 'class="process-stepper"' in low:
            h, steps = parse_steps(inner)
            if steps:
                sections.append({"kind": "steps", "heading": h, "steps": steps})
            continue
        if 'class="faq-item"' in low:
            h, items = parse_faq(inner)
            if items:
                sections.append({"kind": "faq", "heading": h, "items": items})
            continue
        # strip galleries + repeated reg-lookup panels, then treat as prose
        stripped = re.sub(r'<div class="gallery-wrap".*?</div>\s*</div>', "", inner, flags=re.S | re.I)
        stripped = re.sub(r'<div class="glass-panel".*?</div>\s*</div>\s*</div>', "", stripped, flags=re.S | re.I)
        h, blocks = parse_prose(stripped)
        if not h and not blocks:
            continue
        if not blocks and "gallery" in low:
            continue
        sections.append({"kind": "prose", "heading": h, "blocks": blocks})

    # --- thin-section cleanup: the source has stray reg-lookup / one-liner CTA
    # blocks that render as big empty bands. Drop or fold them. ---
    def is_thin(sec):
        if sec["kind"] != "prose":
            return False
        bl = sec["blocks"]
        substantive = [b for b in bl if b["t"] in ("ul", "linkgrid", "callout", "modelgroup")
                       or (b["t"] == "p" and len(b.get("html", "")) >= 90)]
        return not substantive

    cleaned = []
    for sec in sections:
        if is_thin(sec):
            # a headed thin section whose only real block is a callout -> fold
            # the callout into the previous prose section instead of its own band
            callouts = [b for b in sec["blocks"] if b["t"] == "callout"]
            if callouts and cleaned and cleaned[-1]["kind"] == "prose":
                cleaned[-1]["blocks"].extend(callouts)
            # otherwise (stray CTA / reg-lookup remnant) drop entirely
            continue
        cleaned.append(sec)
    # a trailing prose section that's just a short sign-off line adds nothing the
    # hero + image-band CTA don't already say
    while cleaned and cleaned[-1]["kind"] == "prose" and not cleaned[-1]["blocks"]:
        cleaned.pop()
    sections = cleaned

    return {
        "slug": slug,
        "metaTitle": title or base_title,
        "metaDescription": desc,
        "h1": clean_inline(h1m.group(1)) if h1m else base_title,
        "lede": clean_inline(ledem.group(1)) if ledem else "",
        "ctas": ctas or [{"label": "Get a Quote", "href": "/contact"}],
        "images": pick_images(slug),
        "stats": STATS,
        "sections": sections,
    }


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


# real workshop photos already in /public — three are assigned per page so every
# Authority page carries imagery in the brand palette without new assets.
IMG_POOL = [
    "/engine/sec1.webp", "/engine/sec2.webp", "/engine/sec3.webp", "/engine/sec4.webp",
    "/engine/sec5.webp", "/engine/sec8.webp", "/engine/sec9_top.webp", "/engine/sec9_middle.webp",
    "/engine/sec9_bottom.webp", "/model/sec2.webp", "/model/sec3.webp", "/model/sec5.webp",
    "/model/sec7.webp", "/model/sec12.webp", "/model/sec15.webp", "/variant/sec3.webp",
    "/variant/sec4.webp", "/variant/sec5.webp", "/variant/sec11.webp", "/variant/sec13.webp",
]


def pick_images(slug):
    h = 0
    for ch in slug:
        h = (h * 131 + ord(ch)) & 0xFFFFFFFF
    idx, out = h % len(IMG_POOL), []
    while len(out) < 3:
        c = IMG_POOL[idx % len(IMG_POOL)]
        if c not in out:
            out.append(c)
        idx += 7
    return out


STATS = [
    {"value": "15+ yrs", "label": "Mercedes specialists"},
    {"value": "1,800+", "label": "engines rebuilt"},
    {"value": "12 mo", "label": "unlimited-mileage warranty"},
]


def main():
    raw = SRC_FILE.read_text(encoding="utf-8", errors="replace")
    chunks = re.split(r"(?m)^Tab \d+\s*$", raw)
    tabs = [c for c in chunks if "<title>" in c]
    print(f"{len(tabs)} tabs found")

    # pass 1 — discover every slug so cross-links between authority pages resolve
    slug_seen = []
    for c in tabs:
        d = parse_tab(c)
        if d["slug"] not in slug_seen:
            slug_seen.append(d["slug"])
            AUTH_SLUGS.add(d["slug"])

    # pass 2 — parse for real (now href validation knows the full set) + write
    (DATA / "authority").mkdir(parents=True, exist_ok=True)
    manifest_add = []
    written = set()
    for c in tabs:
        d = parse_tab(c)
        if d["slug"] in written:
            continue
        written.add(d["slug"])
        (DATA / "authority" / f"{d['slug']}.json").write_text(
            json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        (APP / d["slug"]).mkdir(parents=True, exist_ok=True)
        fn = "".join(w.capitalize() for w in d["slug"].split("-")) + "Page"
        (APP / d["slug"] / "page.js").write_text(
            f'''import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import {{ serviceSchema, faqSchema, breadcrumbSchema, graphDoc }} from "@/lib/schema";
import data from "@/data/authority/{d['slug']}.json";

const PATH = "/{d['slug']}";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {{
  title: "{esc(d['metaTitle'])}",
  description: "{esc(d['metaDescription'])}",
  alternates: {{ canonical: PATH }},
}};

export default function {fn}() {{
  return (
    <>
      <JsonLd
        data={{graphDoc([
          serviceSchema({{ name: data.h1, description: data.metaDescription, path: PATH }}),
          faqSchema(FAQ, PATH),
          breadcrumbSchema(
            [{{ name: "Home", path: "/" }}, {{ name: "Guides", path: "/mercedes-engine-rebuild" }}, {{ name: data.h1, path: PATH }}],
            PATH
          ),
        ])}}
      />
      <AuthorityPage data={{data}} />
    </>
  );
}}
''', encoding="utf-8")
        manifest_add.append((d["slug"], d["metaTitle"].split("|")[0].strip()))
        print(f"  authority -> /{d['slug']}  ({len(d['sections'])} sections)")

    # sitemap manifest
    mp = DATA / "shared" / "siteRoutes.json"
    routes = [r for r in json.loads(mp.read_text(encoding="utf-8")) if r["type"] != "authority"]
    routes += [{"type": "authority", "slug": s, "title": t} for s, t in manifest_add]
    routes.sort(key=lambda r: (r["type"], r["slug"]))
    mp.write_text(json.dumps(routes, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # nav: add a "Guides" dropdown
    nb = DATA / "shared" / "navbar.json"
    nav = json.loads(nb.read_text(encoding="utf-8"))
    nav["links"] = [l for l in nav["links"] if l["label"] != "Guides"]
    guides = [{"label": NAV_LABEL[s], "href": f"/{s}"} for s, _ in manifest_add if s in NAV_LABEL]
    guides.append({"label": "All guides →", "href": "/mercedes-engine-rebuild"})
    insert_at = next((i for i, l in enumerate(nav["links"]) if l["label"] == "About"), len(nav["links"]))
    nav["links"].insert(insert_at, {"label": "Guides", "href": "/mercedes-engine-rebuild", "children": guides})
    nb.write_text(json.dumps(nav, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"\nDone. {len(manifest_add)} authority pages.")


if __name__ == "__main__":
    main()
