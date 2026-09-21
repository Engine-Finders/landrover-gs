import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function ModelSec11({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        {/* full-bleed photo — workshop scene up top, dark panel below, so the checklist sits directly
            on the image like the other dark sections */}
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="Land Rover technician rebuilding an engine block" fill className="object-cover object-top" sizes="100vw" />
          {/* dark backing behind the title so it doesn't fight the busy workshop signage
              directly behind it, fading out before the checklist zone below */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.7) 18%, rgba(13,13,13,0.3) 30%, transparent 40%, transparent 56%, rgba(13,13,13,0.6) 66%, rgba(13,13,13,0.85) 80%, rgba(13,13,13,0.92) 100%)",
            }}
          />
        </div>

        <div className="relative px-4 pb-8 pt-12">
          <LandRoverStripe className="h-3 w-6" />
          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />

          <div className="h-56" aria-hidden="true" />

          <div
            className="relative -mx-4 divide-y divide-white/15 border-t border-white/15 px-4"
          >
            {data.checklist.map((item, i) => (
              <div key={item} className={`flex items-center gap-3 py-4${i === 0 ? " -mx-4 bg-hero-dark px-4" : ""}`}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hero-blue/70">
                  <Icon name="check" className="h-4 w-4 text-hero-blue" />
                </span>
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-6 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Land Rover technician rebuilding an engine block" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[60%]">
          <LandRoverStripe className="h-6 w-11 shrink-0" />
          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
            <span className="block whitespace-nowrap text-white">{line1}</span>
          </h2>
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block text-hero-blue">{line2}</span>
          </h2>

          <div className="mt-3 divide-y divide-white/15 border-t border-white/15">
            {data.checklist.map((item) => (
              <div key={item} className="flex items-center gap-2.5 py-2">
                <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border border-hero-blue/60 bg-hero-blue/10">
                  <Icon name="check" className="h-3 w-3 text-hero-blue" />
                </span>
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
