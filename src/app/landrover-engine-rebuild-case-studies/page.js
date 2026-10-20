import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-engine-rebuild-case-studies.json";

const PATH = "/landrover-engine-rebuild-case-studies";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover Engine Rebuild Case Studies | Land Rover Garage",
  description: "Land Rover engine rebuild case studies — real workshop examples across Defender, Discovery, Range Rover Sport, Evoque and more. See how we restore classic and modern Land Rover engines.",
  alternates: { canonical: PATH },
};

export default function LandRoverEngineRebuildCaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          serviceSchema({ name: data.h1, description: data.metaDescription, path: PATH }),
          faqSchema(FAQ, PATH),
          breadcrumbSchema(
            [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: data.h1, path: PATH }],
            PATH
          ),
        ])}
      />
      <AuthorityPage data={data} />
    </>
  );
}
