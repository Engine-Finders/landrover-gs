import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/financing.json";

const PATH = "/financing";

export const metadata = {
  title: "Financing & Payment Options | Pay Monthly for Your Engine Rebuild | Land Rover Garage",
  description: "Flexible payment options for engine rebuilds and replacements. No deposit required, pay on completion. Third-party financing coming soon.",
  alternates: { canonical: PATH },
};

export default function FinancingPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Financing & Payment Options | Pay Monthly for Your Engine Rebuild | Land Rover Garage", description: "Flexible payment options for engine rebuilds and replacements. No deposit required, pay on completion. Third-party financing coming soon.", path: PATH, type: "WebPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Financing & Payment Options", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
