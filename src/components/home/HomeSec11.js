import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function HomeSec11({ data }) {
  return (
    <section className="theme-light">
      {/* ===== mobile ===== */}
      <div className="md:hidden">
        {/* mobile-specific crop has the same diagonal split as the desktop photo, just in a
            portrait aspect — same clip-path'd wedge technique, text in the wedge only (it
            narrows too much lower down for a cards band, so those go in a plain div below) */}
        <div className="relative w-full" style={{ aspectRatio: "687 / 820" }}>
          <Image src={data.mobileImage} alt="Inside the Land Rover Garage workshop" fill className="object-cover" sizes="100vw" />

          {/* light-surface wedge (matches the desktop version's fill), text zone ~60% of the
              width / image visible ~40%, with only a gentle diagonal taper. */}
          <div
            className="absolute inset-0"
            style={{
              background: "var(--theme-light-bg)",
              clipPath: "polygon(0 0, 67% 0, 63% 100%, 0 100%)",
            }}
          />

          <div className="absolute inset-0 px-4 pt-6">
            <div className="max-w-[54%] text-[#1a1a1a]">
              <h2 className="h2">
                <span className="block">Meet The</span>
                <span className="block text-hero-blue">Workshop</span>
              </h2>

              <div className="body-text mt-4 space-y-2 leading-relaxed text-[#1a1a1a]">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="body-text mt-3 italic leading-relaxed text-[#1a1a1a]">{data.note}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-4 py-6" style={{ background: "var(--theme-light-bg)" }}>
          {data.strip.map((s) => (
            <div key={s.label} className="glow-card glow-card--sm relative h-40 overflow-hidden">
              <Image src={data.cardImage} alt={s.label} fill className="object-cover" sizes="140px" />

              <div
                className="absolute inset-x-0 bottom-0 flex flex-col justify-center gap-1.5 border-t border-white/15 bg-white/10 px-1.5 py-2 backdrop-blur-lg"
                style={{ "--color-hero-blue": "#607056" }}
              >
                <div className="flex items-center gap-1">
                  <Icon name={s.icon} className="h-4 w-4 shrink-0 text-hero-blue" />
                  <p className="label-text font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {s.label}
                  </p>
                </div>
                <span className="block h-px w-full bg-hero-blue/60" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden md:block">
        {/* One instance of sec11.jpg, sized by its own real aspect ratio (1024/683) — no separate
            "photo block" + "card block". The text sits in the image's own top-left blank wedge and
            the cards sit in its own bottom blank band; a clip-path'd #F1EDE8 layer covers exactly
            those two blank zones (matching the photo's diagonal edge) so they read as the section's
            solid surface color instead of the source photo's plain white. */}
        <div className="relative mx-auto w-full max-w-6xl" style={{ aspectRatio: "1024 / 683" }}>
          <Image src={data.bgImage} alt="Inside the Land Rover Garage workshop" fill quality={95} className="object-cover" sizes="100vw" />

          <div
            className="absolute inset-0"
            style={{
              background: "var(--theme-light-bg)",
              clipPath: "polygon(0 0, 47% 0, 33% 64%, 100% 64%, 100% 100%, 0 100%)",
            }}
          />

          {/* text, in the top-left wedge — sized up to fill more of the wedge's height, with
              "Workshop" set noticeably larger than "Meet The" to match the reference weight */}
          <div className="absolute inset-0 flex items-start px-4 pt-8 sm:px-6 sm:pt-10 lg:px-10 lg:pt-14">
            <div className="max-w-[36%] text-[#1a1a1a] sm:max-w-[30%]">
              <h2 className="h2 -skew-x-6 origin-left scale-y-115 scale-x-92 uppercase">
                <span className="block text-2xl leading-[1.05] sm:text-3xl lg:text-4xl">Meet The</span>
                <span className="block text-4xl leading-[1.05] text-hero-blue sm:text-5xl lg:text-7xl">Workshop</span>
              </h2>

              <div className="mt-5 space-y-3 text-xs leading-relaxed text-[#1a1a1a] sm:mt-7 sm:space-y-4 sm:text-sm lg:text-base">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-5 text-xs italic leading-relaxed text-[#1a1a1a] sm:mt-7 sm:text-sm lg:text-base">{data.note}</p>
            </div>
          </div>

          {/* cards, in the bottom band */}
          <div className="absolute inset-x-0 bottom-0" style={{ top: "64%" }}>
            <div className="mx-auto grid h-full max-w-6xl grid-cols-3 gap-2 px-4 py-3 sm:grid-cols-6 sm:gap-3 sm:px-6 sm:py-4 lg:px-8">
              {data.strip.map((s) => (
                <div key={s.label} className="glow-card glow-card--sm relative h-full overflow-hidden">
                  <Image src={data.cardImage} alt={s.label} fill className="object-cover" sizes="200px" />

                  <div
                    className="absolute inset-x-0 bottom-0 flex flex-col justify-center gap-1 border-t border-white/15 bg-white/10 px-1.5 py-1.5 backdrop-blur-lg sm:gap-2 sm:px-3 sm:py-3"
                    style={{ "--color-hero-blue": "#607056" }}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Icon name={s.icon} className="h-4 w-4 shrink-0 text-hero-blue sm:h-6 sm:w-6" />
                      <p className="label-text font-bold uppercase leading-tight tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        {s.label}
                      </p>
                    </div>
                    <span className="hidden h-px w-full bg-hero-blue/60 sm:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
