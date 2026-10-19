import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/land-rover-rebuild-vs-reconditioned-what-s-the-difference.json";

const PATH = "/land-rover-rebuild-vs-reconditioned-what-s-the-difference";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover Rebuild vs Reconditioned: What's the Difference? | Land Rover Garage",
  description: "Land Rover Engine Rebuild vs Reconditioned explained. Genuine differences in process, parts quality, and what to expect from each service.",
  alternates: { canonical: PATH },
};

export default function LandRoverRebuildVsReconditionedWhatSTheDifferencePage() {
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
