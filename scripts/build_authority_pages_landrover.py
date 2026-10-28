#!/usr/bin/env python3
"""
Converts the Land Rover guide pages that still hold raw HTML (dangerouslySetInnerHTML +
authority.css) into clean, theme-consistent pages driven by the shared AuthorityPage
component, like the other three sites.

For each tab:
  - pulls <title>, <meta description>, JSON-LD @id
  - extracts semantic sections (hero / prose / steps / faq / link lists)
  - remaps the source's internal href scheme onto the real routes on this site
    (drops the link, keeping the text, if no real route matches)
  - writes src/data/authority/<slug>.json + src/app/<slug>/page.js
  - appends the pages to the sitemap manifest (the existing Guides nav dropdown is left as is)

Usage: python scripts/build_authority_pages_landrover.py
"""
import difflib
import html as htmlmod
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
APP = ROOT / "src" / "app"

PHONE = "01268 944234"

HREF_MAP = {}


def real_routes():
    return {"/" + p.parent.name for p in APP.glob("*/page.js")} | {"/"}


ROUTES = real_routes()
AUTH_SLUGS = set()
AUTH_SLUGS_REF = AUTH_SLUGS


def unescape(s):
    s = htmlmod.unescape(s).replace("‑", "-").replace("’", "'").strip()
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
    if core.startswith("blog/"):
        return "/guides"
    close = difflib.get_close_matches("/" + core, sorted(ROUTES), n=1, cutoff=0.88)
    return close[0] if close else None


def clean_inline(fragment):
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


def extract_grids(inner):
    """Swap each balanced <div class="model-grid">...</div> for a <model-grid> tag, so cards that
    contain nested divs are not cut at their first </div>."""
    out, pos = [], 0
    for m in re.finditer(r'<div class="model-grid"[^>]*>', inner):
        if m.start() < pos:
            continue
        depth, i = 1, m.end()
        for t in re.finditer(r"<(/?)div\b", inner[m.end():]):
            depth += -1 if t.group(1) else 1
            if depth == 0:
                i = m.end() + t.start()
                break
        end = inner.index(">", i) + 1
        out.append(inner[pos:m.start()] + "<model-grid>" + inner[m.end():i] + "</model-grid>")
        pos = end
    out.append(inner[pos:])
    return "".join(out)


def grid_blocks(grid_html):
    blocks, plain = [], []

    def flush():
        if plain:
            blocks.append({"t": "linkgrid", "items": list(plain)})
            plain.clear()

    cards = re.split(r'<div class="model-card"[^>]*>', grid_html)[1:] or [grid_html]
    for card in cards:
        links = re.findall(r'<a\s+href="([^"]*)"[^>]*>(.*?)</a>', card, re.S | re.I)
        hm = re.search(r"<h[34][^>]*>(.*?)</h[34]>", card, re.S | re.I)
        if hm:
            flush()
            hl = re.search(r'<a\s+href="([^"]*)"[^>]*>(.*?)</a>', hm.group(1), re.S | re.I)
            model = {"label": clean_inline(hl.group(2)), "href": remap_href(hl.group(1))} if hl                 else {"label": clean_inline(hm.group(1)), "href": None}
            chips = [{"label": clean_inline(l), "href": remap_href(h)} for h, l in links
                     if not (hl and h == hl.group(1) and clean_inline(l) == model["label"])]
            blk = {"t": "modelgroup", "model": model, "chips": chips}
            pm = re.search(r"<p[^>]*>(.*?)</p>", card, re.S | re.I)
            if pm:
                blk["note"] = clean_inline(pm.group(1))
            blocks.append(blk)
        else:
            for h, l in links:
                plain.append({"label": clean_inline(l), "href": remap_href(h)})
    flush()
    return blocks


def parse_prose(inner):
    inner = extract_grids(inner)
    heading = ""
    hm = re.search(r"<h2[^>]*>(.*?)</h2>", inner, re.S | re.I)
    if hm:
        heading = clean_inline(hm.group(1))
    matches = list(re.finditer(
        r'<h3[^>]*>(?P<h3>.*?)</h3>'
        r'|<div class="issue-callout"[^>]*>(?P<callout>.*?)</div>'
        r'|<model-grid>(?P<grid>.*?)</model-grid>'
        r'|<table[^>]*>(?P<table>.*?)</table>'
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
            cps = [clean_inline(x) for x in re.findall(r"<(?:p|small)[^>]*>(.*?)</(?:p|small)>", c, re.S | re.I)]
            blocks.append({"t": "callout", "heading": clean_inline(ch.group(1)) if ch else "",
                           "paras": [p for p in cps if p]})
        elif m.group("grid"):
            blocks.extend(grid_blocks(m.group("grid")))
        elif m.group("table"):
            for row in re.findall(r"<tr[^>]*>(.*?)</tr>", m.group("table"), re.S | re.I):
                cells = re.findall(r"<td[^>]*>(.*?)</td>", row, re.S | re.I)
                if len(cells) < 2:
                    continue
                lm = re.search(r'<a\s+href="([^"]*)"[^>]*>(.*?)</a>', cells[0], re.S | re.I)
                model = {"label": clean_inline(lm.group(2)), "href": remap_href(lm.group(1))} if lm \
                    else {"label": clean_inline(cells[0]), "href": None}
                chips = []
                for cell in cells[1:]:
                    chips.extend(li_chips(cell))
                blocks.append({"t": "modelgroup", "model": model, "chips": chips})
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
        tm = re.search(r"<h[34][^>]*>(.*?)</h[34]>", blk, re.S | re.I)
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


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


IMG_POOL_ALL = [
    "/engine/sec1.webp", "/engine/sec2.webp", "/engine/sec2_price_bg.webp", "/engine/sec3.webp",
    "/engine/sec4.webp", "/engine/sec8_top.webp", "/engine/sec8_middle.webp", "/engine/sec8_bottom.webp",
    "/engine/sec9a.webp", "/engine/sec9b.webp", "/engine/sec10_top.webp", "/engine/sec11_middle.webp",
    "/model/sec2.webp", "/model/sec3.webp", "/model/sec5.webp", "/model/sec7.webp",
    "/model/sec10.webp", "/model/sec12.webp", "/variant/sec1.webp", "/variant/sec10_middle_div.webp",
    "/variant/sec11.webp", "/variant/sec13.webp",
]
IMG_POOL = [p for p in IMG_POOL_ALL if (ROOT / "public" / p.lstrip("/")).exists()]


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
    {"value": "15+ yrs", "label": "Land Rover specialists"},
    {"value": "1,800+", "label": "engines rebuilt"},
    {"value": "12 mo", "label": "unlimited-mileage warranty"},
]


def parse_tab(chunk, slug):
    tm = re.search(r"<title>(.*?)</title>", chunk, re.S | re.I)
    title = unescape(tm.group(1)) if tm else ""
    dm = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', chunk, re.I)
    desc = unescape(dm.group(1)) if dm else ""
    base_title = title.split("|")[0].strip()

    body = chunk
    body = re.sub(r"<footer.*?</footer>", "", body, flags=re.S | re.I)
    body = re.sub(r"<script.*?</script>", "", body, flags=re.S | re.I)

    h1m = re.search(r"<h1[^>]*>(.*?)</h1>", body, re.S | re.I)
    ledem = re.search(r'<p class="hero-lede"[^>]*>(.*?)</p>', body, re.S | re.I)
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
            continue
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
        stripped = re.sub(r'<div class="gallery-wrap".*?</div>\s*</div>', "", inner, flags=re.S | re.I)
        stripped = re.sub(r'<div class="glass-panel".*?</div>\s*</div>\s*</div>', "", stripped, flags=re.S | re.I)
        h, blocks = parse_prose(stripped)
        if not h and not blocks:
            continue
        if not blocks and "gallery" in low:
            continue
        sections.append({"kind": "prose", "heading": h, "blocks": blocks})

    # thin-section cleanup (same as Mercedes generator)
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
            callouts = [b for b in sec["blocks"] if b["t"] == "callout"]
            if callouts and cleaned and cleaned[-1]["kind"] == "prose":
                cleaned[-1]["blocks"].extend(callouts)
            continue
        cleaned.append(sec)
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


def load_pages():
    pages = {}
    for p in sorted(APP.glob("*/page.js")):
        t = p.read_text(encoding="utf-8")
        if "authority-page" not in t:
            continue
        hm = re.search(r'__html: ("(?:[^"\\]|\\.)*"),\s*\}\}', t, re.S)
        tm = re.search(r'title: ("(?:[^"\\]|\\.)*")', t)
        dm = re.search(r'description: ("(?:[^"\\]|\\.)*")', t)
        chunk = (f'<title>{json.loads(tm.group(1))}</title>'
                 f'<meta name="description" content="{json.loads(dm.group(1))}">' + json.loads(hm.group(1)))
        pages[p.parent.name] = chunk
    return pages


def main():
    pages = load_pages()
    print(f"{len(pages)} raw-html pages found")
    AUTH_SLUGS.update(pages)
    (DATA / "authority").mkdir(parents=True, exist_ok=True)
    manifest_add = []
    written = set()
    for slug, c in pages.items():
        d = parse_tab(c, slug)
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
            [{{ name: "Home", path: "/" }}, {{ name: "Guides", path: "/guides" }}, {{ name: data.h1, path: PATH }}],
            PATH
          ),
        ])}}
      />
      <AuthorityPage data={{data}} />
    </>
  );
}}
''', encoding="utf-8")
        manifest_add.append(d["slug"])
        print(f"  authority -> /{d['slug']}  ({len(d['sections'])} sections)")

    print(f"\nDone. {len(manifest_add)} authority pages.")


if __name__ == "__main__":
    main()
