#!/usr/bin/env python3
"""
Site verification — checks the things in the build brief without needing a
running server (static analysis of routes + data), then optionally crawls a
running dev/prod server for live 200s.

Run:
  python scripts/verify_site.py            # static checks only
  python scripts/verify_site.py --crawl    # also hit every route on localhost:3000
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"
DATA = ROOT / "src" / "data"

OK = "\033[92mPASS\033[0m"
BAD = "\033[91mFAIL\033[0m"
WARN = "\033[93mWARN\033[0m"


def routes_on_disk():
    r = {"/" + p.parent.name for p in APP.glob("*/page.js")}
    r.add("/")
    return r


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--crawl", action="store_true")
    ap.add_argument("--base", default="http://localhost:3000")
    args = ap.parse_args()

    routes = routes_on_disk()
    manifest = json.loads((DATA / "shared" / "siteRoutes.json").read_text(encoding="utf-8"))
    by_type = {}
    for m in manifest:
        by_type.setdefault(m["type"], []).append(m["slug"])

    fails = 0

    # 1. page counts
    print("\n=== 1. PAGE INVENTORY ===")
    for t in ("model", "variant", "engine", "authority", "core", "directory"):
        n = len(by_type.get(t, []))
        print(f"  {t:10s} {n}")
    print(f"  total app routes on disk: {len(routes) - 1}")

    # 2. every manifest slug has a real page.js
    print("\n=== 2. MANIFEST <-> ROUTES ===")
    missing = [m["slug"] for m in manifest if f"/{m['slug']}" not in routes]
    if missing:
        fails += 1
        print(f"  {BAD} {len(missing)} manifest slugs with no page.js: {missing[:8]}")
    else:
        print(f"  {OK} all {len(manifest)} manifest routes exist on disk")

    # 3. no dead internal links / no bare '#'
    print("\n=== 3. INTERNAL LINKS ===")
    dead, bare = {}, []
    linkfields = r'"(?:href|codeHref|modelHref|variantHref|familyHref|viewAllHref|checklistHref)"\s*:\s*"(/[^"#]*)"'
    for f in DATA.rglob("*.json"):
        t = f.read_text(encoding="utf-8")
        if re.search(r'"href"\s*:\s*"#"', t):
            bare.append(f.name)
        for h in set(re.findall(linkfields, t)):
            if h and h not in routes:
                dead.setdefault(h, []).append(f.name)
        for h in set(re.findall(r'\]\((/[^)#]+)\)', t)):
            if h not in routes:
                dead.setdefault(h, []).append(f.name)
    if bare:
        fails += 1
        print(f"  {BAD} bare href=\"#\" in: {sorted(set(bare))}")
    else:
        print(f"  {OK} no bare href=\"#\" anywhere in data")
    if dead:
        fails += 1
        print(f"  {BAD} {len(dead)} dead internal targets:")
        for h, fs in list(dead.items())[:15]:
            print(f"      {h}  <- {sorted(set(fs))[:2]}")
    else:
        print(f"  {OK} every internal link points at a real route")

    # 4. per-page metadata
    print("\n=== 4. METADATA (title / description / canonical) ===")
    bad_meta = []
    for p in APP.glob("*/page.js"):
        t = p.read_text(encoding="utf-8")
        if "export const metadata" not in t:
            bad_meta.append((p.parent.name, "no metadata"))
            continue
        for key in ("title", "description", "canonical"):
            if key not in t:
                bad_meta.append((p.parent.name, f"no {key}"))
    # layout provides the global fallback title/description
    if bad_meta:
        fails += 1
        print(f"  {BAD} {len(bad_meta)} issues: {bad_meta[:10]}")
    else:
        print(f"  {OK} all {len(list(APP.glob('*/page.js')))} routes have title + description + canonical")

    # 5. sitemap + robots
    print("\n=== 5. SITEMAP / ROBOTS ===")
    sm = (APP / "sitemap.js").exists()
    rb = (APP / "robots.js").exists()
    print(f"  {'PASS' if sm else 'FAIL'} src/app/sitemap.js present  ({len(manifest) + 1} urls expected)")
    print(f"  {'PASS' if rb else 'FAIL'} src/app/robots.js present")
    if not (sm and rb):
        fails += 1

    # 6. business info consistency
    print("\n=== 6. BUSINESS INFO ===")
    PHONE = "0203 488 4649"
    stale = []
    for f in DATA.rglob("*.json"):
        t = f.read_text(encoding="utf-8")
        if "01268 944 234" in t:
            stale.append(f.name)
    nav = json.loads((DATA / "shared" / "navbar.json").read_text(encoding="utf-8"))
    foot = json.loads((DATA / "shared" / "footer.json").read_text(encoding="utf-8"))
    print(f"  navbar phone : {nav.get('phone')}")
    print(f"  footer phone : {foot.get('contact', {}).get('phone')}")
    if stale:
        fails += 1
        print(f"  {BAD} stale phone 01268 944 234 still in: {sorted(set(stale))}")
    else:
        print(f"  {OK} phone normalised to {PHONE} everywhere in data")

    # 7. header + footer wiring
    print("\n=== 7. HEADER / FOOTER NAV ===")
    nav_links = []

    def collect(links):
        for l in links:
            if l.get("href", "").startswith("/"):
                nav_links.append(l["href"].split("#")[0] or "/")
            collect(l.get("children", []))

    collect(nav.get("links", []))
    for col in foot.get("columns", []):
        collect(col.get("links", []))
    navdead = sorted({h for h in nav_links if h not in routes})
    if navdead:
        fails += 1
        print(f"  {BAD} nav/footer links with no route: {navdead}")
    else:
        print(f"  {OK} all {len(set(nav_links))} distinct header+footer links resolve")
    print(f"  nav top-level: {[l['label'] for l in nav['links']]}")

    # 8. quote-form anchor target exists in the 3 page-type form components
    print("\n=== 8. #quote-form ANCHOR ===")
    comp = ROOT / "src" / "components"
    checks = {
        "model": comp / "model" / "ModelSec18.js",
        "variant": comp / "variant" / "VariantSec13.js",
        "engine": comp / "engine-family" / "Sec11.js",
    }
    for k, fp in checks.items():
        has = fp.exists() and 'id="quote-form"' in fp.read_text(encoding="utf-8")
        print(f"  {'PASS' if has else 'FAIL'} {k} pages render id=\"quote-form\"")
        if not has:
            fails += 1

    # 9. optional live crawl
    if args.crawl:
        print("\n=== 9. LIVE CRAWL (this is slow in dev mode) ===")
        import urllib.request
        import urllib.error
        bad_live = []
        allslugs = ["/"] + [f"/{m['slug']}" for m in manifest]
        for i, u in enumerate(allslugs):
            try:
                code = urllib.request.urlopen(args.base + u, timeout=30).getcode()
            except urllib.error.HTTPError as e:
                code = e.code
            except Exception as e:
                code = f"ERR {e}"
            if code != 200:
                bad_live.append((code, u))
            if i % 25 == 0:
                print(f"  ...{i}/{len(allslugs)}")
        if bad_live:
            fails += 1
            print(f"  {BAD} {len(bad_live)} non-200 routes:")
            for c, u in bad_live[:20]:
                print(f"      {c}  {u}")
        else:
            print(f"  {OK} all {len(allslugs)} routes returned 200")

    print("\n" + ("=" * 40))
    print(f"  RESULT: {OK if fails == 0 else BAD}  ({fails} failing checks)")
    print("=" * 40)
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
