import Image from "next/image";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function HomeSec10Cta({ data }) {
  return (
    <section className="theme-dark px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/25"
        style={{ boxShadow: "0 0 40px -8px rgba(255,255,255,0.25), 0 20px 45px -20px rgba(0,0,0,0.6)" }}
      >
        <div className="absolute inset-0 bg-[#0d0d0d]">
          <Image src={data.bgImage2} alt="Land Rover-AMG driving through the city at night" fill quality={95} className="object-cover object-right" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
        </div>

        {/* diagonal silver/bronze stripe accent, top-left corner */}
        <div
          className="pointer-events-none absolute -left-6 top-0 h-full w-14 -skew-x-12 sm:w-16"
          style={{ background: "linear-gradient(90deg, #efeeee 0%, #efeeee 40%, #5d4e3a 60%, #5d4e3a 100%)" }}
        />

        {/* single responsive layout — column on mobile, row on desktop — so both sizes share the
            exact same markup/behavior instead of two hand-tuned blocks drifting apart */}
        <div className="relative flex w-full flex-col items-center gap-5 px-6 py-8 text-center sm:px-8 lg:flex-row lg:items-center lg:justify-start lg:gap-12 lg:py-10 lg:pl-14 lg:text-left">
          <div className="lg:max-w-[28%]">
            <h3 className="h3">{data.ctaHeading}</h3>
            <p className="mt-1 text-xs text-white sm:text-sm">{data.ctaBody}</p>
          </div>

          <div className="w-full lg:w-auto">
            <RegLookupForm buttonLabel={data.ctaButton} row compact compactButton />
            <p className="label-text mt-3 flex items-center justify-center gap-1.5 uppercase tracking-wide text-white lg:justify-start">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {data.apiNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
