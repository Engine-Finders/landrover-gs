import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-engine-removal-refit.json";

const PATH = "/landrover-engine-removal-refit";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Engine Removal, Refit & Final Testing | Land Rover Garage",
  description: "Professional engine removal, refit, and final testing for Land Rover vehicles. We use manufacturer procedures and JLR diagnostic systems for precise installation and validation.",
  alternates: { canonical: PATH },
};

export default function LandRoverEngineRemovalRefitAndFinalTestingPage() {
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
