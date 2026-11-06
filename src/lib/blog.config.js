// src/lib/blog.config.js
/**
 * Site-specific configuration for Headless CMS Blog & Lead Quote integration.
 * Tailored for Land Rover Garage.
 */

export const blogConfig = {
  // 1. Site Identity
  siteName: "Land Rover Garage",
  siteSlug: process.env.CMS_SITE_SLUG || "landrovergarage",
  siteDomain: "landrovergarage.co.uk",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://landrovergarage.co.uk").replace(/\/$/, ""),
  defaultAuthor: "Land Rover Master Technician",

  // 2. Headings & UI Copy
  copy: {
    metaTitle: "Land Rover Garage | Guides & Diagnostic Advice",
    metaDescription: "Specialist Land Rover & Range Rover servicing, air suspension, drivetrain repairs, and garage guidance.",
    blogTitlePrefix: "Land Rover Garage",
    blogTitleAccent: "Service Guides & Insights",
    blogSubtitle: "Specialist Land Rover & Range Rover servicing, air suspension, drivetrain repairs, and garage guidance.",
    emptyTitle: "No guides published yet",
    emptySubtitle: "Land Rover Garage technical articles and diagnostic guides published from the CMS will appear here.",
    readMoreText: "Read Guide",
    widgetTitle: "Instant Land Rover Service & Repair Quote",
    widgetSubtitle: "Enter your registration for fast pricing from approved Land Rover specialists.",
    widgetSubmitText: "Request Free Quote",
    widgetSuccessTitle: "Quote Request Received!",
    widgetSuccessSubtitle: "Our Land Rover Garage specialists will check stock and contact you shortly with the best pricing.",
    recentGuidesTitle: "Recent Guides",
    relatedGuidesTitle: "Related Guides",
    bottomCta: {
      enabled: true,
      badge: "Land Rover Garage Network",
      title: "Looking for an Approved Land Rover Garage?",
      subtitle: "Book professional diagnostics, servicing, or drivetrain repairs with verified UK specialists.",
      buttonText: "Get Free Land Rover Garage Quote »",
      buttonHref: "#sidebar-reg-input",
    },
  },

  // 3. Theme Colors
  theme: {
    fontFamily: "Arial, Helvetica, sans-serif",
    primaryColor: "#3b402b",
    primaryHover: "#2d3121",
    accentColor: "#3b402b",
    accentHover: "#2d3121",
    widgetBg: "#1f2416",
    widgetBorder: "#2e3522",
    widgetButtonBg: "#3b402b",
    widgetButtonHover: "#2d3121",
    ukBadgeBg: "#003399",
    fallbackThumbnail: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
  },
};
