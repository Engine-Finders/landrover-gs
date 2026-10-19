import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/land-rover-svr-sv-performance-engine-rebuild.json";

const PATH = "/land-rover-svr-sv-performance-engine-rebuild";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover SVR/SV Performance Engine Rebuild | Land Rover Garage",
  description: "Specialist performance engine rebuild for Land Rover SVR and SV models. AJ133 supercharged V8, BMW S68 twin-turbo V8 and Ingenium performance engines.",
  alternates: { canonical: PATH },
};

export default function LandRoverSvrSvPerformanceEngineRebuildPage() {
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
