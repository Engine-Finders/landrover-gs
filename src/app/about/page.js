import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/about.json";

const PATH = "/about";

export const metadata = {
  title: "About Land Rover Garage | Independent Land Rover Engine Rebuild Specialists",
  description: "Independent Land Rover engine rebuild specialists based in Billericay, Essex. 15+ years of hands-on industry experience.",
  alternates: { canonical: PATH },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "About Land Rover Garage | Independent Land Rover Engine Rebuild Specialists", description: "Independent Land Rover engine rebuild specialists based in Billericay, Essex. 15+ years of hands-on industry experience.", path: PATH, type: "AboutPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Land Rover Garage", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
