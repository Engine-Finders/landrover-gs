import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/warranty.json";

const PATH = "/warranty";

export const metadata = {
  title: "12-Month Unlimited Mileage Warranty | Terms, Conditions & Customer Responsibilities | Land Rover Garage",
  description: "Clear warranty terms for engine rebuilds. Non-transferable, mandatory 2000-mile service, no third-party repairs. Excludes ancillaries. Based in Billericay.",
  alternates: { canonical: PATH },
};

export default function WarrantyPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "12-Month Unlimited Mileage Warranty | Terms, Conditions & Customer Responsibilities | Land Rover Garage", description: "Clear warranty terms for engine rebuilds. Non-transferable, mandatory 2000-mile service, no third-party repairs. Excludes ancillaries. Based in Billericay.", path: PATH, type: "WebPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "12-Month Unlimited Mileage Warranty", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
