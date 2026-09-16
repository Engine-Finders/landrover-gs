import Image from "next/image";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function HomeSec12({ data }) {
  const [kicker, headline] = data.h2.split("|");
  const [headlineA, ...headlineRest] = headline.split(" ");
  const headlineB = headlineRest.join(" ");

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative flex md:hidden">
        {/* left: all text content, on the solid dark background */}
        <div className="min-w-0 flex-1 px-4 py-5">
          <p className="label-text whitespace-nowrap uppercase tracking-widest text-white">{kicker}</p>

          <h2 className="h2 mt-1 uppercase">
            <span className="block text-white">{headlineA}</span>
            <span className="block text-hero-blue">{headlineB}</span>
          </h2>

          <p className="mt-2 text-xs leading-snug text-gray-300">
            {data.descriptionPre}
            <span className="font-bold text-hero-blue">{data.descriptionEmphasis}</span>
            {data.descriptionPost}
          </p>

          <div className="mt-3">
            <RegLookupForm buttonLabel={data.ctaButton} stacked whiteBorder matchHeight />
          </div>

          <p className="label-text mt-2.5 flex items-center gap-1.5 uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {data.note}
          </p>
        </div>

        {/* right: the car photo, faded into the left text panel — object-cover so it fills the
            column at the row's natural (content-driven) height, matching bmw-garage's layout */}
        <div className="relative w-[40%] shrink-0 overflow-hidden">
          <Image src={data.mobileImage} alt="Land Rover-AMG driving through London at night" fill className="object-cover" sizes="45vw" />
          <div className="absolute inset-0 bg-hero-dark/25" />
          <div className="absolute inset-y-0 left-0 w-2/5 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.bgImage} alt="Land Rover-AMG driving through London at night" fill quality={95} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
        </div>

        <LandRoverLogo className="absolute bottom-6 right-6 z-10 h-14 w-14" />

        <div className="relative mx-auto max-w-6xl px-4 py-9 sm:px-6 lg:px-8">
          <h2 className="h2 max-w-xl uppercase">
            <span className="block text-2xl leading-tight text-white sm:text-3xl">{kicker}</span>
            <span className="block whitespace-nowrap text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              <span className="text-hero-blue">{headlineA}</span> {headlineB}
            </span>
          </h2>

          <p className="mt-3 max-w-md text-sm text-gray-300">
            {data.descriptionPre}
            <span className="font-bold text-white">{data.descriptionEmphasis}</span>
            {data.descriptionPost}
          </p>

          <div className="mt-6 max-w-lg">
            <RegLookupForm buttonLabel={data.ctaButton} compact whiteBorder matchHeight />
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {data.note}
          </p>
        </div>
      </div>
    </section>
  );
}
