import fs from "node:fs";
import path from "node:path";
import siteRoutes from "@/data/shared/siteRoutes.json";
import { SITE_URL } from "./layout";

// Built from the real route folders in src/app (not just the generation manifest), so every
// indexable page is listed and a page can never be missing from the sitemap. The manifest is only
// used to classify a route (priority / change frequency). Pages that set robots index:false
// (e.g. /get-quote), API routes, private/underscore folders and dynamic segments are skipped.
const PRIORITY = { model: 0.8, engine: 0.8, variant: 0.6, authority: 0.7, core: 0.4, directory: 0.5 };
const TYPE_BY_SLUG = new Map(siteRoutes.map((r) => [r.slug, r.type]));
const APP_DIR = path.join(process.cwd(), "src", "app");

function listRoutes() {
  const slugs = [];
  for (const entry of fs.readdirSync(APP_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const name = entry.name;
    if (name.startsWith("_") || name.startsWith("(") || name.startsWith("[") || name === "api") continue;
    const page = path.join(APP_DIR, name, "page.js");
    if (!fs.existsSync(page)) continue;
    if (/index:\s*false/.test(fs.readFileSync(page, "utf8"))) continue;
    slugs.push(name);
  }
  return slugs.sort();
}

export default function sitemap() {
  const now = new Date();
  const home = [{ url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 }];

  const pages = listRoutes().map((slug) => {
    const type = TYPE_BY_SLUG.get(slug);
    return {
      url: `${SITE_URL}/${slug}`,
      lastModified: now,
      changeFrequency: type === "core" || type === "directory" ? "yearly" : "monthly",
      priority: PRIORITY[type] ?? 0.6,
    };
  });

  return [...home, ...pages];
}
