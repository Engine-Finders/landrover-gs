import siteRoutes from "@/data/shared/siteRoutes.json";
import { SITE_URL } from "./layout";

const PRIORITY = { model: 0.8, engine: 0.8, variant: 0.6, authority: 0.7, core: 0.4, directory: 0.5 };

export default function sitemap() {
  const now = new Date();
  const home = [{ url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 }];

  const generated = siteRoutes.map(({ slug, type }) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: type === "core" ? "yearly" : "monthly",
    priority: PRIORITY[type] ?? 0.6,
  }));

  return [...home, ...generated];
}
