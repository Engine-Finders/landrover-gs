import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/terms-and-conditions.json";

const PATH = "/terms-and-conditions";

export const metadata = {
  title: "Terms & Conditions | Land Rover Garage",
  description: "Terms and conditions for engine rebuilds, replacements, and repairs. Warranty terms, customer obligations, payment terms, and legal disclaimers for Land Rover Garage.",
  alternates: { canonical: PATH },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Terms & Conditions | Land Rover Garage", description: "Terms and conditions for engine rebuilds, replacements, and repairs. Warranty terms, customer obligations, payment terms, and legal disclaimers for Land Rover Garage.", path: PATH, type: "WebPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
