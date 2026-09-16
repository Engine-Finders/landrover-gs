import HomeSec1 from "@/components/home/HomeSec1";
import HomeSec3 from "@/components/home/HomeSec3";
import HomeSec4 from "@/components/home/HomeSec4";
import HomeSec4_5 from "@/components/home/HomeSec4_5";
import HomeSec5 from "@/components/home/HomeSec5";
import HomeSec6 from "@/components/home/HomeSec6";
import HomeSec7 from "@/components/home/HomeSec7";
import HomeSec8 from "@/components/home/HomeSec8";
import HomeSec9 from "@/components/home/HomeSec9";
import HomeSec9_5 from "@/components/home/HomeSec9_5";
import HomeSec10 from "@/components/home/HomeSec10";
import HomeSec10Cta from "@/components/home/HomeSec10Cta";
import HomeSec11 from "@/components/home/HomeSec11";
import HomeSec12 from "@/components/home/HomeSec12";
import HomeSec13 from "@/components/home/HomeSec13";

import homeSec1 from "@/data/home/homeSec1.json";
import homeSec2 from "@/data/home/homeSec2.json";
import homeSec3 from "@/data/home/homeSec3.json";
import homeSec4 from "@/data/home/homeSec4.json";
import homeSec4_5 from "@/data/home/homeSec4_5.json";
import homeSec5 from "@/data/home/homeSec5.json";
import homeSec6 from "@/data/home/homeSec6.json";
import homeSec7 from "@/data/home/homeSec7.json";
import homeSec8 from "@/data/home/homeSec8.json";
import homeSec9 from "@/data/home/homeSec9.json";
import homeSec9_5 from "@/data/home/homeSec9_5.json";
import homeSec10 from "@/data/home/homeSec10.json";
import homeSec11 from "@/data/home/homeSec11.json";
import homeSec12 from "@/data/home/homeSec12.json";
import homeSec13 from "@/data/home/homeSec13.json";

// Mirrors bmw-garage's home page: each section component carries its own
// md:hidden / hidden md:block branch, this file just wires them up.
export default function Home() {
  return (
    <>
      <HomeSec1 hero={homeSec1} lookup={homeSec2} />
      <div className="bg-linear-to-b from-(--color-light-surface) to-(--color-light-surface) pb-6 pt-40 md:pt-28">
        <HomeSec3 data={homeSec3} />
        <HomeSec4 data={homeSec4} />
      </div>
      {/* bg-(--color-light-surface) shows through Sec4_5's diagonal clip-path cut at the
          bottom — matches Sec5 right after it instead of the page's default background. */}
      <div className="bg-(--color-light-surface)">
        <HomeSec4_5 data={homeSec4_5} />
      </div>
      <HomeSec5 data={homeSec5} />
      <HomeSec6 data={homeSec6} />
      <HomeSec7 data={homeSec7} />
      <HomeSec8 data={homeSec8} />
      <HomeSec9 data={homeSec9} />
      <HomeSec9_5 data={homeSec9_5} />
      <HomeSec10 data={homeSec10} />
      <HomeSec11 data={homeSec11} />
      <HomeSec12 data={homeSec12} />
      <HomeSec13 data={homeSec13} />
      <HomeSec10Cta data={homeSec10} />
    </>
  );
}
