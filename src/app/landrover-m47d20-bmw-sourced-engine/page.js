import HeroSec1 from "@/components/engine-family/HeroSec1";
import Sec2 from "@/components/engine-family/Sec2";
import Sec3 from "@/components/engine-family/Sec3";
import Sec4 from "@/components/engine-family/Sec4";
import Sec5 from "@/components/engine-family/Sec5";
import Sec6 from "@/components/engine-family/Sec6";
import Sec7 from "@/components/engine-family/Sec7";
import Sec8 from "@/components/engine-family/Sec8";
import Sec9 from "@/components/engine-family/Sec9";
import SecApps from "@/components/engine-family/SecApps";
import Sec10 from "@/components/engine-family/Sec10";
import Sec11 from "@/components/engine-family/Sec11";
import { clipDescription, withBrand } from "@/lib/seo";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";

import sec1 from "@/data/engine-family/landroverm47d20bmwsourcedSec1.json";
import sec2 from "@/data/engine-family/landroverm47d20bmwsourcedSec2.json";
import sec3 from "@/data/engine-family/landroverm47d20bmwsourcedSec3.json";
import sec4 from "@/data/engine-family/landroverm47d20bmwsourcedSec4.json";
import sec5 from "@/data/engine-family/landroverm47d20bmwsourcedSec5.json";
import sec6 from "@/data/engine-family/landroverm47d20bmwsourcedSec6.json";
import sec7 from "@/data/engine-family/landroverm47d20bmwsourcedSec7.json";
import sec8 from "@/data/engine-family/landroverm47d20bmwsourcedSec8.json";
import sec9 from "@/data/engine-family/landroverm47d20bmwsourcedSec9.json";
import sec10 from "@/data/engine-family/landroverm47d20bmwsourcedSec10.json";
import sec11 from "@/data/engine-family/landroverm47d20bmwsourcedSec11.json";

const PATH = "/landrover-m47d20-bmw-sourced-engine";
const NAME = `Land Rover ${sec1.titlePre.trim()} Engine Rebuild & Replacement`;
const FAQ = [...(sec11.faq?.faqLeft || []), ...(sec11.faq?.faqRight || [])];

export const metadata = {
  title: withBrand(NAME),
  description: clipDescription(sec1.subhead),
  alternates: { canonical: PATH },
};

export default function LandroverM47d20BmwSourcedEnginePage() {
  return (
    <>
      <JsonLd data={graphDoc([
        serviceSchema({ name: NAME, description: sec1.subhead, path: PATH, price: (sec1.priceCta?.label || sec1.priceCta?.kicker) }),
        faqSchema(FAQ, PATH),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Engines", path: "/engines" }, { name: NAME, path: PATH }], PATH),
      ])} />
      <HeroSec1 data={sec1} />
      <Sec2 data={sec2} />
      <Sec3 data={sec3} />
      <Sec4 data={sec4} />
      <Sec5 data={sec5} />
      <Sec6 data={sec6} />
      <Sec7 data={sec7} />
      <Sec8 data={sec8} />
      <Sec9 data={sec9} />
      <SecApps data={sec9.apps} />
      <Sec10 data={sec10} />
      <Sec11 data={sec11} />
    </>
  );
}
