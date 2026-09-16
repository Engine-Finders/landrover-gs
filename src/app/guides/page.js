import DirectoryPage from "@/components/shared/DirectoryPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/guides.json";

const PATH = "/guides";

export const metadata = {
  title: "Land Rover Engine Guides | Land Rover Garage",
  description: "Expert guides and articles on Land Rover engine repair, rebuilds and common issues.",
  alternates: { canonical: PATH },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Land Rover Engine Guides | Land Rover Garage", description: "Expert guides and articles on Land Rover engine repair, rebuilds and common issues.", path: PATH, type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: PATH }], PATH),
        ])}
      />
      <DirectoryPage data={data} />
    </>
  );
}
