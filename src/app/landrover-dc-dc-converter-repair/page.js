import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-dc-dc-converter-repair.json";

const PATH = "/landrover-dc-dc-converter-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover DC-DC Converter Repair (Ingenium MHEV) | Land Rover Garage",
  description: "Specialist DC-DC converter repair for Land Rover Ingenium MHEV models. 48V to 12V converter replacement with JLR diagnostics. Book your inspection today.",
  alternates: { canonical: PATH },
};

export default function LandRoverDcDcConverterRepairPage() {
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
