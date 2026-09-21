import Image from "next/image";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

const TILE_FADE =
  "radial-gradient(60% 90% at 0% 0%, var(--theme-light-bg) 0%, transparent 55%), radial-gradient(60% 90% at 100% 0%, var(--theme-light-bg) 0%, transparent 55%), radial-gradient(60% 90% at 0% 100%, var(--theme-light-bg) 0%, transparent 55%), radial-gradient(60% 90% at 100% 100%, var(--theme-light-bg) 0%, transparent 55%)";

export default function HomeSec6({ data }) {
  const portraitTrack = [...data.portrait, ...data.portrait];
  const landscapeTrack = [...data.landscape, ...data.landscape];

  return (
    <section className="theme-light px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="theme-light relative mx-auto max-w-6xl rounded-2xl border border-hero-blue/20 px-4 py-6 sm:px-6 sm:py-8"
        style={{ boxShadow: "0 0 60px -8px rgba(96,112,86,0.25), 0 0 20px rgba(0,0,0,0.06)" }}
      >
        {/* logo sits half on / half off the card's own top edge */}
        <LandRoverLogo className="absolute left-1/2 top-0 z-10 h-18 w-18 -translate-x-1/2 -translate-y-1/2" />

        <div className="pt-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-20 bg-hero-blue/40" />
            <h2 className="h2 text-[#1a1a1a]">{data.h2}</h2>
            <span className="h-px w-20 bg-hero-blue/40" />
          </div>
        </div>

        {/* portrait row — infinite scroll right */}
        <div className="mt-6 overflow-hidden">
          <div className="animate-marquee-right flex w-max gap-1.5">
            {portraitTrack.map((img, i) => (
              <div key={i} className="relative h-56 w-40 shrink-0 overflow-hidden rounded-xl sm:h-64 sm:w-44">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="200px" />
                <div className="pointer-events-none absolute inset-0" style={{ background: TILE_FADE }} />
              </div>
            ))}
          </div>
        </div>

        {/* landscape row — infinite scroll left */}
        <div className="mt-2 overflow-hidden">
          <div className="animate-marquee-left flex w-max gap-1.5">
            {landscapeTrack.map((img, i) => (
              <div key={i} className="relative h-40 w-64 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-80">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="360px" />
                <div className="pointer-events-none absolute inset-0" style={{ background: TILE_FADE }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
