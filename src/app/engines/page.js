import DirectoryPage from "@/components/shared/DirectoryPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/engines.json";

const PATH = "/engines";

export const metadata = {
  title: "Land Rover Engine Rebuilds | Land Rover Garage",
  description: "Every Land Rover-Benz engine family we rebuild and replace — click through for pricing, applications and known issues.",
  alternates: { canonical: PATH },
};

export default function EnginesPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Land Rover Engine Rebuilds | Land Rover Garage", description: "Every Land Rover-Benz engine family we rebuild and replace \u2014 click through for pricing, applications and known issues.", path: PATH, type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Land Rover Engine Rebuilds", path: PATH }], PATH),
        ])}
      />
      <DirectoryPage data={data} />
    </>
  );
}
