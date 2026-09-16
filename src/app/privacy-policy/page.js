import LegalPage from "@/components/shared/LegalPage";
import JsonLd from "@/components/shared/JsonLd";
import { webPageSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";
import data from "@/data/core/privacy-policy.json";

const PATH = "/privacy-policy";

export const metadata = {
  title: "Privacy Policy | Land Rover Garage",
  description: "How we collect, use, and protect your personal data. GDPR compliant. Information on warranty claims, vehicle data, and photo uploads. Based in Billericay, Essex.",
  alternates: { canonical: PATH },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          webPageSchema({ name: "Privacy Policy | Land Rover Garage", description: "How we collect, use, and protect your personal data. GDPR compliant. Information on warranty claims, vehicle data, and photo uploads. Based in Billericay, Essex.", path: PATH, type: "WebPage" }),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: PATH }], PATH),
        ])}
      />
      <LegalPage data={data} />
    </>
  );
}
