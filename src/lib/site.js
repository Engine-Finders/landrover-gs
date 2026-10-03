// Flip to the live domain at go-live via NEXT_PUBLIC_SITE_URL.
// Drives canonical URLs, sitemap, robots and all JSON-LD @id/url values.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Public review profiles the "See All Reviews" CTAs open. Search-style URLs so they always resolve;
// swap for the exact profile links once the Google Business / Trustpilot pages are confirmed.
export const REVIEW_URLS = {
  google: "https://www.google.com/maps/search/?api=1&query=JLR+Engine+Specialists+Billericay",
  trustpilot: "https://uk.trustpilot.com/search?query=JLR%20Engine%20Specialists",
};
