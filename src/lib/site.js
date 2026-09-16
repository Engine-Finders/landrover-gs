// Flip to the live domain at go-live via NEXT_PUBLIC_SITE_URL.
// Drives canonical URLs, sitemap, robots and all JSON-LD @id/url values.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
