import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/landrover-turbo-ancillary-repair.json";

const PATH = "/landrover-turbo-ancillary-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover Turbo & Ancillary Repair | Land Rover Garage",
  description: "Professional Land Rover turbocharger repair and replacement services. We work on all turbocharged diesel and petrol engines, from Td5 to modern Ingenium and BMW-sourced V8s.",
  alternates: { canonical: PATH },
};

export default function LandRoverTurboAncillaryRepairPage() {
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
