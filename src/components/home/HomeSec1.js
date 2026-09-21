import Image from "next/image";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function HomeSec1({ hero, lookup }) {
  const [line1, line2, line3] = hero.h1.split("|");

  return (
    <section id="find-my-landrover" className="theme-dark relative z-10">
      {/* ===== mobile ===== */}
      <div className="md:hidden">
        <div className="relative w-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={hero.mobileImage} alt="Land Rover technician working on an engine block beneath a Defender on a workshop lift" fill priority quality={95} className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-b from-hero-dark/75 via-hero-dark/15 to-hero-dark" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-0 h-2/3 bg-linear-to-b from-black/70 via-black/35 to-transparent" />
          </div>

          {/* dedicated dark backdrop behind the text column only, sized to the exact 60vw the
              text is constrained to — independent of the full-width gradient overlays above,
              so legibility doesn't depend on how dark the photo happens to be underneath */}
          <div className="absolute inset-y-0 left-0 w-[60vw] bg-black/45" />

          {/* content flows normally so the hero's real height tracks whatever the text/box
              actually need on this device — no reserved overlap padding, no scroll past fold. */}
          <div className="relative flex flex-col px-4 pb-40 pt-5">
            <div className="w-[62vw]">
              <h1 className="h1 uppercase">
                <span className="block text-white">{line1}</span>
                <span className="block text-hero-blue">{line2}</span>
                <span className="block text-white">{line3}</span>
              </h1>
              <p className="body-text mt-2 text-gray-300">{hero.subhead}</p>
            </div>

            <div
              className="absolute inset-x-4 bottom-0 z-10 translate-y-1/2 overflow-hidden rounded-2xl border border-white/40 p-3 shadow-[0_0_30px_rgba(255,255,255,0.2),0_30px_60px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(155deg, rgba(58,58,58,0.55) 0%, rgba(84,84,84,0.5) 30%, rgba(106,106,106,0.45) 50%, rgba(63,63,63,0.55) 72%, rgba(32,32,32,0.65) 100%)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.7) 47%, rgba(255,255,255,0.7) 53%, transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -left-1/4 -top-10 h-24 w-[150%] opacity-70"
                style={{
                  transform: "rotate(-4deg)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 80%)",
                  filter: "blur(3px)",
                }}
              />
              <div className="relative">
                <RegLookupForm
                  buttonLabel={lookup.h2}
                  compact
                  darkButton
                  left={
                    <div className="shrink-0">
                      <h2 className="h3 italic flex items-center justify-center gap-2 uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                        <span className="flex shrink-0 -skew-x-12 gap-0.5" aria-hidden="true">
                          <span className="h-5 w-1 bg-hero-blue" />
                          <span className="h-5 w-1 bg-hero-blue" />
                          <span className="h-5 w-1 bg-hero-blue" />
                        </span>
                        {lookup.h2}
                      </h2>
                      <p className="body-text mx-auto mt-1.5 max-w-xs text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">{lookup.description}</p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden md:block">
        {/* hero visual: sized by the h1/subhead/CTA content; deliberately NOT overflow-hidden so the
            card below can bleed past its bottom edge */}
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <Image src={hero.image} alt="Land Rover technician working on an engine block beneath a Defender on a workshop lift" fill priority quality={95} className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/55 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-transparent" />
          </div>

          {/* ambient gold glow */}
          <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-hero-blue/20 blur-[110px]" />

          <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-10">
            <h1 className="h1 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>
            <p className="body-text mt-5 max-w-lg text-gray-300">{hero.subhead}</p>

            <div
              className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-275 translate-y-1/2 overflow-hidden rounded-2xl border border-white/40 p-4 shadow-[0_0_30px_rgba(255,255,255,0.2),0_30px_60px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl sm:p-6"
              style={{
                background:
                  "linear-gradient(155deg, rgba(58,58,58,0.55) 0%, rgba(84,84,84,0.5) 30%, rgba(106,106,106,0.45) 50%, rgba(63,63,63,0.55) 72%, rgba(32,32,32,0.65) 100%)",
              }}
            >
              {/* mirror sheen — a bright diagonal streak plus a soft top-edge light-glint,
                  giving the panel a real glassy/reflective look instead of a flat gradient */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.7) 47%, rgba(255,255,255,0.7) 53%, transparent 70%)",
                }}
              />
              <div
                className="pointer-events-none absolute -left-1/4 -top-10 h-24 w-[150%] opacity-70"
                style={{
                  transform: "rotate(-4deg)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 80%)",
                  filter: "blur(3px)",
                }}
              />
              <div className="relative">
                <RegLookupForm
                  buttonLabel={lookup.h2}
                  large
                  darkButton
                  left={
                    <div className="shrink-0 sm:max-w-xs">
                      <h2 className="h3 italic flex items-center justify-center gap-2.5 uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] sm:justify-start">
                        <span className="flex shrink-0 -skew-x-12 gap-0.5" aria-hidden="true">
                          <span className="h-6 w-1 bg-hero-blue" />
                          <span className="h-6 w-1 bg-hero-blue" />
                          <span className="h-6 w-1 bg-hero-blue" />
                        </span>
                        {lookup.h2}
                      </h2>
                      <p className="body-text mx-auto mt-2 max-w-xs text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] sm:mx-0">{lookup.description}</p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
