import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-failed-previous-rebuild-remediation.json";

const PATH = "/landrover-failed-previous-rebuild-remediation";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover Failed Previous Rebuild Remediation | Land Rover Garage",
  description: "Expert remediation for Land Rover engines with failed previous rebuilds. Full strip-down assessment, corrective rebuild, and 12-month warranty. Book your assessment today.",
  alternates: { canonical: PATH },
};

export default function LandRoverFailedPreviousRebuildRemediationPage() {
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
