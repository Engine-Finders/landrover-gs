import AuthorityPage from "@/components/shared/AuthorityPage";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/authority/land-rover-diesel-timing-chain-repair.json";

const PATH = "/land-rover-diesel-timing-chain-repair";
const FAQ = (data.sections || []).filter((s) => s.kind === "faq").flatMap((s) => s.items || []);

export const metadata = {
  title: "Land Rover Diesel Timing Chain Repair (TDV6/SDV6/TDV8/SDV8) | Land Rover Garage",
  description: "Replacing the timing chain and associated components on Land Rover TDV6, SDV6, TDV8 and SDV8 diesel engines.",
  alternates: { canonical: PATH },
};

export default function LandRoverDieselTimingChainRepairPage() {
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
