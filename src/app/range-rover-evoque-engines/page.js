import ModelHeroSec1 from "@/components/model/ModelHeroSec1";
import ModelSec2 from "@/components/model/ModelSec2";
import ModelSec3 from "@/components/model/ModelSec3";
import ModelSec4 from "@/components/model/ModelSec4";
import ModelSec5 from "@/components/model/ModelSec5";
import ModelSec6 from "@/components/model/ModelSec6";
import ModelSec7 from "@/components/model/ModelSec7";
import ModelSec8 from "@/components/model/ModelSec8";
import ModelSec9 from "@/components/model/ModelSec9";
import ModelSec10 from "@/components/model/ModelSec10";
import ModelSec11 from "@/components/model/ModelSec11";
import ModelSec12 from "@/components/model/ModelSec12";
import ModelSec13 from "@/components/model/ModelSec13";
import ModelSec14 from "@/components/model/ModelSec14";
import ModelSec15 from "@/components/model/ModelSec15";
import ModelSec16 from "@/components/model/ModelSec16";
import ModelSec17 from "@/components/model/ModelSec17";
import ModelSec18 from "@/components/model/ModelSec18";

import modelSec1 from "@/data/model/landroverRangeRoverEvoqueSec1.json";
import modelSec2 from "@/data/model/landroverRangeRoverEvoqueSec2.json";
import modelSec3 from "@/data/model/landroverRangeRoverEvoqueSec3.json";
import modelSec4 from "@/data/model/landroverRangeRoverEvoqueSec4.json";
import modelSec5 from "@/data/model/landroverRangeRoverEvoqueSec5.json";
import modelSec6 from "@/data/model/landroverRangeRoverEvoqueSec6.json";
import modelSec7 from "@/data/model/landroverRangeRoverEvoqueSec7.json";
import modelSec8 from "@/data/model/landroverRangeRoverEvoqueSec8.json";
import modelSec9 from "@/data/model/landroverRangeRoverEvoqueSec9.json";
import modelSec10 from "@/data/model/landroverRangeRoverEvoqueSec10.json";
import modelSec11 from "@/data/model/landroverRangeRoverEvoqueSec11.json";
import modelSec12 from "@/data/model/landroverRangeRoverEvoqueSec12.json";
import modelSec13 from "@/data/model/landroverRangeRoverEvoqueSec13.json";
import modelSec14 from "@/data/model/landroverRangeRoverEvoqueSec14.json";
import modelSec15 from "@/data/model/landroverRangeRoverEvoqueSec15.json";
import modelSec16 from "@/data/model/landroverRangeRoverEvoqueSec16.json";
import modelSec17 from "@/data/model/landroverRangeRoverEvoqueSec17.json";
import modelSec18 from "@/data/model/landroverRangeRoverEvoqueSec18.json";
import JsonLd from "@/components/shared/JsonLd";
import { serviceSchema, faqSchema, breadcrumbSchema, graphDoc } from "@/lib/schema";

const PATH = "/range-rover-evoque-engines";
const NAME = modelSec1.h1?.replaceAll("|", " ");
const FAQ = [...(modelSec18.faqLeft || []), ...(modelSec18.faqRight || [])];

export const metadata = {
  title: "Range Rover Evoque Engine Rebuild & Replacement | Land Rover Specialists",
  description: "Range Rover Evoque rebuilt engines from £2,200. Specialist Ingenium diesel timing chain issues, D165, D180 & all variants.",
  alternates: { canonical: PATH },
};

export default function LandroverRangeRoverEvoqueEnginesPage() {
  return (
    <>
      <JsonLd
        data={graphDoc([
          serviceSchema({ name: NAME, description: modelSec1.subhead, path: PATH, price: modelSec1.priceCta?.price }),
          faqSchema(FAQ, PATH),
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Models", path: "/models" }, { name: NAME, path: PATH }], PATH),
        ])}
      />
      <ModelHeroSec1 data={modelSec1} />
      <ModelSec2 data={modelSec2} />
      <ModelSec3 data={modelSec3} />
      <ModelSec4 data={modelSec4} />
      <ModelSec5 data={modelSec5} />
      <ModelSec6 data={modelSec6} />
      <ModelSec7 data={modelSec7} />
      <ModelSec8 data={modelSec8} />
      <ModelSec9 data={modelSec9} />
      <ModelSec10 data={modelSec10} />
      <ModelSec11 data={modelSec11} />
      <ModelSec12 data={modelSec12} />
      <ModelSec13 data={modelSec13} />
      <ModelSec14 data={modelSec14} />
      <ModelSec15 data={modelSec15} />
      <ModelSec16 data={modelSec16} />
      <ModelSec17 data={modelSec17} />
      <ModelSec18 data={modelSec18} />
    </>
  );
}
