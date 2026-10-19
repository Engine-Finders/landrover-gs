import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/land-rover-bmw-sourced-v8-hot-vee-repair.json";

const PATH = "/land-rover-bmw-sourced-v8-hot-vee-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover BMW-Sourced V8 Hot-Vee Repair (N63/S68) | Land Rover Garage",
  description: "Specialist repair for Land Rover models with the BMW-sourced N63/S68 4.4L twin-turbo V8. Timing chain, hot-vee design, and full engine rebuilds.",
  alternates: { canonical: PATH },
};

export default function LandRoverBmwSourcedV8HotVeeRepairPage() {
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
