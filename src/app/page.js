import HomeSec1 from "@/components/home/HomeSec1";
import HomeFindVehicle from "@/components/home/HomeFindVehicle";
import HomeKnowledge from "@/components/home/HomeKnowledge";
import HomeCompare from "@/components/home/HomeCompare";
import HomeDiagnose from "@/components/home/HomeDiagnose";
import HomeRankings from "@/components/home/HomeRankings";
import HomeFailures from "@/components/home/HomeFailures";
import HomeEconomics from "@/components/home/HomeEconomics";
import HomeMarket from "@/components/home/HomeMarket";
import HomeModels from "@/components/home/HomeModels";
import HomeSec10Cta from "@/components/home/HomeSec10Cta";
import HomeTrust from "@/components/home/HomeTrust";
import HomeFinal from "@/components/home/HomeFinal";
import HomeSec13 from "@/components/home/HomeSec13";

import homeSec1 from "@/data/home/homeSec1.json";
import homeFindVehicle from "@/data/home/homeFindVehicle.json";
import homeKnowledge from "@/data/home/homeKnowledge.json";
import homeCompare from "@/data/home/homeCompare.json";
import homeDiagnose from "@/data/home/homeDiagnose.json";
import homeRankings from "@/data/home/homeRankings.json";
import homeFailures from "@/data/home/homeFailures.json";
import homeEconomics from "@/data/home/homeEconomics.json";
import homeMarket from "@/data/home/homeMarket.json";
import homeSec10 from "@/data/home/homeSec10.json";
import homeModels from "@/data/home/homeModels.json";
import homeTrust from "@/data/home/homeTrust.json";
import homeFinal from "@/data/home/homeFinal.json";
import homeSec13 from "@/data/home/homeSec13.json";

// Mirrors bmw-garage's home page: each section component carries its own
// md:hidden / hidden md:block branch, this file just wires them up.
export default function Home() {
  return (
    <>
      <HomeSec1 hero={homeSec1} />
      <HomeFindVehicle data={homeFindVehicle} />
      <HomeDiagnose data={homeDiagnose} />
      <HomeRankings data={homeRankings} />
      <HomeFailures data={homeFailures} />
      <HomeKnowledge data={homeKnowledge} />
      <HomeCompare data={homeCompare} />
      <HomeEconomics data={homeEconomics} />
      <HomeMarket data={homeMarket} />
      <HomeModels data={homeModels} />
      <HomeTrust data={homeTrust} />
      <HomeFinal data={homeFinal} />
      <HomeSec13 data={homeSec13} />
      <HomeSec10Cta data={homeSec10} />
    </>
  );
}
