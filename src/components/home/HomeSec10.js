import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function HomeSec10({ data }) {
  return (
    <section className="theme-dark">
      {/* ===== mobile ===== */}
      <div className="relative overflow-hidden md:hidden">
        <div className="absolute inset-0">
          <Image src={data.mobileImage} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-hero-dark/45" />
        </div>

        <div className="relative px-4 py-7">
          <h2 className="h2 uppercase">
            Why <span className="text-hero-blue">Land Rover</span> Owners Travel Across The UK To Us
          </h2>
          <p className="body-text mt-3 text-white">{data.description}</p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {data.reasons.map((r) => (
              <div key={r.label} className="glow-card glow-card--green flex flex-col items-center gap-2 p-3 text-center">
                <Icon name={r.icon} className="h-8 w-8 shrink-0 text-white" />
                <span className="h-px w-6 bg-hero-blue" />
                <p className="label-text leading-tight text-white">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden md:block">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={data.bgImage1} alt="" fill quality={95} className="object-cover object-left" sizes="100vw" />
            <div className="absolute inset-0 bg-hero-dark/25" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
            <div className="max-w-[46%]">
              <h2 className="h2 uppercase">
                Why <span className="text-hero-blue">Land Rover</span> Owners Travel Across The UK To Us
              </h2>
              <p className="body-text mt-2 text-white">{data.description}</p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:max-w-[70%]">
              {data.reasons.map((r) => (
                <div key={r.label} className="glow-card glow-card--green flex flex-col items-center gap-2 p-3 text-center">
                  <Icon name={r.icon} className="h-10 w-10 shrink-0 text-white" />
                  <span className="h-px w-6 bg-hero-blue" />
                  <p className="text-xs leading-tight text-white">{r.label}</p>
                </div>
              ))}
            </div>

            <div className="h-8 sm:h-10 lg:h-12" />
          </div>
        </div>
      </div>
    </section>
  );
}
