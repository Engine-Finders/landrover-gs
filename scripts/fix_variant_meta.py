#!/usr/bin/env python3
"""Repair corrupted variant hero subheads ("Model: X" / HTML comments) from the client
source files and add metaTitle/metaDescription (from source frontmatter where present)."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_src_content" / "Garage Site - Variants Pages Land Rover"
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())

src = {}
for f in SRC.glob("*.txt"):
    t = f.read_text(encoding="utf-8").replace("\r", "")
    body = t
    meta = {}
    if t.startswith("---"):
        fm, body = t.split("---", 2)[1:]
        meta = dict(re.findall(r'^(meta_title|meta_description): "?(.*?)"?\s*$', fm, re.M))
    lines = [l.strip() for l in body.split("\n") if l.strip() and not l.strip().startswith("<!--")]
    h = next((l for l in lines if "— From" in l or "From £" in l), None)
    if not h: continue
    i = lines.index(h)
    sub = lines[i + 1].lstrip("# ").strip() if i + 1 < len(lines) else ""
    src[norm(h.lstrip("# "))] = (sub, meta)

fixed = metas = missing = 0
for p in sorted((ROOT / "src" / "app").glob("*/page.js")):
    t = p.read_text(encoding="utf-8")
    m = re.search(r'variant/(\w+)Sec1\.json', t)
    if not m: continue
    jf = ROOT / "src" / "data" / "variant" / f"{m.group(1)}Sec1.json"
    d = json.loads(jf.read_text(encoding="utf-8"))
    key = norm(d["h1"].replace("|", " "))
    hit = src.get(key)
    if not hit:
        missing += 1; print("no source for", p.parent.name, d["h1"]); continue
    sub, meta = hit
    ch = False
    bad = d.get("subhead", "").startswith(("<!--", "Model:")) or not d.get("subhead")
    if bad and sub:
        d["subhead"] = sub; fixed += 1; ch = True
    if meta.get("meta_title") and d.get("metaTitle") != meta["meta_title"]:
        d["metaTitle"] = meta["meta_title"]; ch = True
    if meta.get("meta_description") and d.get("metaDescription") != meta["meta_description"]:
        d["metaDescription"] = meta["meta_description"]; metas += 1; ch = True
    if ch:
        jf.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"subheads fixed {fixed}, source meta applied {metas}, unmatched {missing}")
