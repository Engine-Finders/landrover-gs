import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-engine-supply-fit.json";

const PATH = "/landrover-engine-supply-fit";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover Engine Supply & Fit | Land Rover Garage",
  description: "Land Rover engine supply and fit service — we source the correct replacement engine and professionally install it at our Essex workshop. Single-point responsibility, full warranty.",
  alternates: { canonical: PATH },
};

export default function LandRoverEngineSupplyAndFitPage() {
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
