/**
 * JSON-LD builders. Every URL/@id is derived from SITE_URL so it follows the
 * env (localhost now, https://landrovergarage.co.uk once NEXT_PUBLIC_SITE_URL is set).
 */
import { SITE_URL } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#organization`;
const AUTOREPAIR_ID = `${SITE_URL}/#autorepair`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const BUSINESS = {
  name: "Land Rover Garage",
  legalName: "JLR Engine Specialists Ltd",
  telephone: "+44 203 488 4649",
  email: "info@landrovergarage.co.uk",
  foundingDate: "2009",
  priceRange: "££",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit A5 Windsor Road, Commercial Estate, Ramsden Heath",
    addressLocality: "Billericay",
    addressRegion: "Essex",
    postalCode: "CM11 1QE",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: "51.637092", longitude: "0.483956" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "14:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", bestRating: "5", reviewCount: "172" },
  sameAs: [
    "https://www.facebook.com/JLREngineSpecialists",
    "https://www.instagram.com/jlr_engine_specialists_ltd",
    "https://www.tiktok.com/@land.rover.engine",
  ],
};

/** Site-wide business graph — emit once in the root layout. */
export function businessGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        email: BUSINESS.email,
        telephone: BUSINESS.telephone,
        foundingDate: BUSINESS.foundingDate,
        address: BUSINESS.address,
        sameAs: BUSINESS.sameAs,
      },
      {
        "@type": ["AutoRepair", "LocalBusiness"],
        "@id": AUTOREPAIR_ID,
        name: `${BUSINESS.name} – Land Rover Engine Rebuild Specialists`,
        url: SITE_URL,
        telephone: BUSINESS.telephone,
        email: BUSINESS.email,
        priceRange: BUSINESS.priceRange,
        foundingDate: BUSINESS.foundingDate,
        address: BUSINESS.address,
        geo: BUSINESS.geo,
        areaServed: { "@type": "Country", name: "United Kingdom" },
        openingHoursSpecification: BUSINESS.openingHoursSpecification,
        aggregateRating: BUSINESS.aggregateRating,
        sameAs: BUSINESS.sameAs,
        parentOrganization: { "@id": ORG_ID },
        brand: { "@type": "Brand", name: "Land Rover" },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

function priceNumber(p) {
  if (!p) return undefined;
  const m = String(p).replace(/,/g, "").match(/(\d{3,})/);
  return m ? m[1] : undefined;
}

/** Service node for a model / variant / engine / authority page. */
export function serviceSchema({ name, description, path, price, serviceType }) {
  const url = `${SITE_URL}${path}`;
  const node = {
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    serviceType: serviceType || "Land Rover Engine Rebuild & Replacement",
    url,
    provider: { "@id": AUTOREPAIR_ID },
    areaServed: { "@type": "Country", name: "United Kingdom" },
  };
  if (description) node.description = description;
  const low = priceNumber(price);
  if (low) {
    node.offers = {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: low,
      url,
      availability: "https://schema.org/InStock",
    };
  }
  return node;
}

/** FAQPage node from [{q,a}] pairs. */
export function faqSchema(items, path) {
  const clean = (items || []).filter((x) => x && x.q && x.a);
  if (!clean.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: clean.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

/** BreadcrumbList from [{name, path}] (path "" or "/" = home). */
export function breadcrumbSchema(trail, path) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path === "/" ? "" : t.path}`,
    })),
  };
}

/** WebPage / ContactPage / AboutPage node for core pages. */
export function webPageSchema({ name, description, path, type }) {
  const url = `${SITE_URL}${path}`;
  const node = {
    "@type": type || "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    isPartOf: { "@id": WEBSITE_ID },
  };
  if (description) node.description = description;
  return node;
}

/** Wrap a list of nodes into a @graph document. */
export function graphDoc(nodes) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
