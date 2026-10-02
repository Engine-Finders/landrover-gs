import DirectoryPage from "@/components/shared/DirectoryPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/models.json";

const PATH = "/models";

export const metadata = {
  title: "Land Rover Models | Land Rover Garage",
  description: "Engine rebuild and replacement coverage for every Land Rover model line.",
  alternates: { canonical: PATH },
};

export default function ModelsPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Land Rover Models | Land Rover Garage", description: "Engine rebuild and replacement coverage for every Land Rover model line.", path: PATH, type: "CollectionPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Land Rover Models", path: PATH }], PATH),
        ])}
      />
      <DirectoryPage data={data} />
    </>
  );
}
