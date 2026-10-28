import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-v8-supercharged-repair.json";

const PATH = "/landrover-v8-supercharged-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover V8 Supercharged Repair (AJ133) | Land Rover Garage",
  description: "Specialist AJ133 5.0L supercharged V8 timing chain repair for Range Rover, Sport, Defender, and Velar. Fixed-price rebuilds with 12-month warranty.",
  alternates: { canonical: PATH },
};

export default function LandRoverV8SuperchargedRepairPage() {
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
