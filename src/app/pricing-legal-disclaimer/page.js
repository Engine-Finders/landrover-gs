import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/pricing-legal-disclaimer.json";

const PATH = "/pricing-legal-disclaimer";

export const metadata = {
  title: "Pricing & Legal Disclaimer | Engine Rebuild Estimates vs Fixed Quotes | Land Rover Garage",
  description: "Clear pricing disclaimer for engine rebuilds and repairs. Estimates vs fixed quotes, VAT, part numbers by VIN, and your right to approve additional costs.",
  alternates: { canonical: PATH },
};

export default function PricingLegalDisclaimerPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Pricing & Legal Disclaimer | Engine Rebuild Estimates vs Fixed Quotes | Land Rover Garage", description: "Clear pricing disclaimer for engine rebuilds and repairs. Estimates vs fixed quotes, VAT, part numbers by VIN, and your right to approve additional costs.", path: PATH, type: "WebPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pricing & Legal Disclaimer", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
