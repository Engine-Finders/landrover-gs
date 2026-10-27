import Image from "next/image";
import PhotoStripes from "@/components/reusable/PhotoStripes";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function ModelSec11({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative bg-hero-dark md:hidden">
        <div className="relative px-4 pb-4 pt-10">
          <LandRoverStripe className="h-3 w-6" />
          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
            <span className="block text-white">{line1}</span>{" "}
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />
        </div>

        {/* 16:9 photo (the desktop frame is already 16:9, so it is shown whole instead of a tall portrait crop),
            faded into the dark panel above and below */}
        <div className="relative aspect-video w-full overflow-hidden">
          {/* the left ~40% of this frame is empty dark panel, so it is zoomed in from the right to give the mechanic and engine more of the width */}
          <div className="absolute inset-0" style={{ transform: "scale(1.35)", transformOrigin: "88% 15%" }}>
            <Image src={data.image} alt="Land Rover technician rebuilding an engine block" fill className="object-cover" sizes="100vw" />
            <PhotoStripes preset="sec11" className="object-cover" />
          </div>
          <div className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-hero-dark to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-hero-dark to-transparent" />
        </div>

        <div className="relative border-t border-white/15 pb-8">
          {data.checklist.map((item, i) => (
            <div key={item} className={`flex items-center gap-3 px-4 py-4 ${i % 2 ? "bg-white/[0.09]" : "bg-white/[0.03]"}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hero-blue/70">
                <Icon name="check" className="h-4 w-4 text-hero-blue" />
              </span>
              <p className="text-sm text-white">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-6 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Land Rover technician rebuilding an engine block" fill className="object-cover" sizes="100vw" />
        <PhotoStripes preset="sec11" className="object-cover" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[60%]">
          <LandRoverStripe className="h-6 w-11 shrink-0" />
          <div role="heading" aria-level="2" className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
            <span className="block whitespace-nowrap text-white">{line1}</span>
          </div>
          <div role="heading" aria-level="2" className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block text-hero-blue">{line2}</span>
          </div>

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
