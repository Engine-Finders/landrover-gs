import VariantHeroSec1 from "@/components/variant/VariantHeroSec1";
import VariantSec2 from "@/components/variant/VariantSec2";
import VariantSec3 from "@/components/variant/VariantSec3";
import VariantSec4 from "@/components/variant/VariantSec4";
import VariantSec5 from "@/components/variant/VariantSec5";
import VariantSec6 from "@/components/variant/VariantSec6";
import VariantSec7 from "@/components/variant/VariantSec7";
import VariantSec8 from "@/components/variant/VariantSec8";
import VariantSec9 from "@/components/variant/VariantSec9";
import VariantSec10 from "@/components/variant/VariantSec10";
import VariantSec11 from "@/components/variant/VariantSec11";
import VariantSec12 from "@/components/variant/VariantSec12";
import VariantSec13 from "@/components/variant/VariantSec13";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";

import variantSec1 from "@/data/variant/landroverRangeRoverVelarP340Sec1.json";
import variantSec2 from "@/data/variant/landroverRangeRoverVelarP340Sec2.json";
import variantSec3 from "@/data/variant/landroverRangeRoverVelarP340Sec3.json";
import variantSec4 from "@/data/variant/landroverRangeRoverVelarP340Sec4.json";
import variantSec5 from "@/data/variant/landroverRangeRoverVelarP340Sec5.json";
import variantSec6 from "@/data/variant/landroverRangeRoverVelarP340Sec6.json";
import variantSec7 from "@/data/variant/landroverRangeRoverVelarP340Sec7.json";
import variantSec8 from "@/data/variant/landroverRangeRoverVelarP340Sec8.json";
import variantSec9 from "@/data/variant/landroverRangeRoverVelarP340Sec9.json";
import variantSec10 from "@/data/variant/landroverRangeRoverVelarP340Sec10.json";
import variantSec11 from "@/data/variant/landroverRangeRoverVelarP340Sec11.json";
import variantSec12 from "@/data/variant/landroverRangeRoverVelarP340Sec12.json";
import variantSec13 from "@/data/variant/landroverRangeRoverVelarP340Sec13.json";

const PATH = "/landrover-range-rover-velar-p340-engines";
const NAME = variantSec1.h1?.replaceAll("|", " ") || "landrover-range-rover-velar-p340-engines";
const FAQ = [...(variantSec13.faqLeft || []), ...(variantSec13.faqRight || [])];

export const metadata = {
  title: NAME,
  description: variantSec1.subhead || "",
  alternates: { canonical: PATH },
};

export default function LandroverRangeRoverVelarP340EnginesPage() {
  return (
    <>
      <JsonLd data={graphDoc([
        serviceSchema({ name: NAME, description: variantSec1.subhead, path: PATH, price: (variantSec1.priceCta?.kicker || variantSec1.h1) }),
        faqSchema(FAQ, PATH),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Variants", path: "/variants" }, { name: NAME, path: PATH }], PATH),
      ])} />
      <VariantHeroSec1 data={variantSec1} />
      <VariantSec2 data={variantSec2} />
      <VariantSec3 data={variantSec3} />
      <VariantSec4 data={variantSec4} />
      <VariantSec5 data={variantSec5} />
      <VariantSec6 data={variantSec6} />
      <VariantSec7 data={variantSec7} />
      <VariantSec8 data={variantSec8} />
      <VariantSec9 data={variantSec9} />
      <VariantSec10 data={variantSec10} />
      <VariantSec11 data={variantSec11} />
      <VariantSec12 data={variantSec12} />
      <VariantSec13 data={variantSec13} />
    </>
  );
}
