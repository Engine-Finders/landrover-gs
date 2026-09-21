import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import AMGBadge from "@/components/reusable/AMGBadge";

const HEX_POINTS = "50,2 96,25 96,75 50,98 4,75 4,25";

function HexIcon({ icon, boxClass, iconClass }) {
  return (
    <div className={`relative mx-auto ${boxClass}`}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        style={{ filter: "drop-shadow(0 0 10px rgba(96,112,86,0.9)) drop-shadow(0 0 4px rgba(96,112,86,0.9))" }}
      >
        <polygon points={HEX_POINTS} fill="#0d0d0d" stroke="#607056" strokeWidth="4" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={icon} className={`${iconClass} text-white`} />
      </div>
    </div>
  );
}

function ColumnAccent({ className = "" }) {
  return (
    <span className={`mx-auto mt-1.5 flex items-center justify-center gap-1 ${className}`} aria-hidden="true">
      <span className="h-0.5 w-6 bg-hero-blue" />
      <span
        className="h-0.5 w-6"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-bmw-red) 0px, var(--color-bmw-red) 3px, transparent 3px, transparent 6px)" }}
      />
    </span>
  );
}

export default function Sec10({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="flex items-center gap-2">
          <LandRoverLogo className="h-8 w-8" />
          <AMGBadge className="h-3.5" />
        </div>
        <h2 className="h2 mt-2 uppercase text-white">{data.titlePre}</h2>
        <h2 className="h2 uppercase">
          <span className="text-white">{data.titleBigPre}</span>
          <span className="text-hero-blue">{data.titleBigHighlight}</span>
          <span className="text-white">{data.titleBigPost}</span>
        </h2>
        <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />

        <div className="mt-3 space-y-1">
          {data.subtext.map((l) => (
            <p key={l} className="text-xs leading-snug text-white">
              {l}
            </p>
          ))}
        </div>

        <div className="no-scrollbar relative -mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
          {data.columns.map((c) => (
            <div
              key={c.title}
              className="glass-card-dark w-[78%] shrink-0 snap-center rounded-2xl p-5 text-center"
              style={{ boxShadow: "0 20px 45px -20px rgba(96,112,86,0.35)" }}
            >
              <HexIcon icon={c.icon} boxClass="h-20 w-20" iconClass="h-11 w-11" />
              <p className="mt-3 text-sm font-extrabold uppercase tracking-wide text-hero-blue">{c.title}</p>
              <ColumnAccent />
              <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-white">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="glass-card-dark relative mt-6 flex items-start gap-3 overflow-hidden rounded-xl px-4 py-3.5">
          <span className="absolute bottom-0 left-0 top-0 w-1 bg-hero-blue" aria-hidden="true" />
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-xs font-bold text-hero-blue">
            i
          </span>
          <p className="text-xs italic leading-snug text-white">
            <span className="font-bold not-italic text-white">{data.notice.highlight}</span>
            {data.notice.rest}
          </p>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-14 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <LandRoverLogo className="h-11 w-11" />
            <AMGBadge className="h-5" />
          </div>
          <h2 className="h2 mt-3 uppercase text-white">{data.titlePre}</h2>
          <h2 className="h2 uppercase">
            <span className="text-white">{data.titleBigPre}</span>
            <span className="text-hero-blue">{data.titleBigHighlight}</span>
            <span className="text-white">{data.titleBigPost}</span>
          </h2>
          <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-hero-blue via-white to-hero-blue" />

          <div className="mt-4 max-w-2xl space-y-1">
            {data.subtext.map((l) => (
              <p key={l} className="text-base text-white">
                {l}
              </p>
            ))}
          </div>

          <div className="relative mt-12 grid grid-cols-3 gap-8">
            {data.columns.map((c, i) => (
              <div key={c.title} className="relative text-center">
                {i > 0 && (
                  <span className="pointer-events-none absolute -left-4 top-0 h-full w-px" aria-hidden="true">
                    <span
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(96,112,86,0.6) 12%, rgba(96,112,86,0.6) 88%, transparent 100%)" }}
                    />
                    <span className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full bg-hero-blue" style={{ boxShadow: "0 0 8px rgba(96,112,86,0.9)" }} />
                    <span className="absolute -bottom-1 -left-[3px] h-2 w-2 rounded-full bg-hero-blue" style={{ boxShadow: "0 0 8px rgba(96,112,86,0.9)" }} />
                  </span>
                )}
                <HexIcon icon={c.icon} boxClass="h-32 w-32" iconClass="h-16 w-16" />
                <p className="mt-4 text-lg font-extrabold uppercase tracking-wide text-hero-blue">{c.title}</p>
                <ColumnAccent className="mt-2" />
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="glass-card-dark relative mt-10 flex items-center gap-4 overflow-hidden rounded-2xl px-6 py-5">
            <span className="absolute bottom-0 left-0 top-0 w-1 bg-hero-blue" aria-hidden="true" />
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-sm font-bold text-hero-blue">
              i
            </span>
            <p className="text-sm italic leading-relaxed text-white">
              <span className="font-bold not-italic text-white">{data.notice.highlight}</span>
              {data.notice.rest}
            </p>
          </div>
        </div>
      </div>

      {/* ============ a typical rebuild ============ */}
      <div className="relative border-t border-white/10 theme-light">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pt-7 md:hidden">
          <p className="text-xs font-bold uppercase tracking-widest text-hero-blue">{data.typical.kicker}</p>
          <h3 className="h3 mt-1 uppercase text-[#101828]">
            {data.typical.title}
          </h3>
          <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
        </div>

        <div className="relative mt-4 aspect-square w-full overflow-hidden bg-(--theme-light-bg) md:hidden">
          <Image src={data.typical.imageMobile} alt="Land Rover exploded engine components" fill className="object-contain" sizes="100vw" />
        </div>

        <div className="relative px-4 pb-7 md:hidden">
          <p className="mt-4 text-xs italic leading-relaxed text-[#4a5568]">{data.typical.intro}</p>
          <p className="mt-3 text-xs leading-relaxed text-[#101828]">{data.typical.body}</p>

          <div className="glass-card relative mt-5 flex flex-col gap-3 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Icon name="chain" className="mt-0.5 h-6 w-6 shrink-0 text-hero-blue" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#101828]">{data.typical.scope.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-[#4a5568]">{data.typical.scope.text}</p>
              </div>
            </div>
            <div className="border-t border-black/10 pt-3">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#101828]">{data.typical.startingFromLabel}</p>
                <p className="text-2xl font-extrabold text-hero-blue">{data.typical.startingFromPrice}</p>
              </div>
              <a
                href={data.typical.cta.href}
                className="mt-3 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-3 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {data.typical.cta.label}
              </a>
            </div>
          </div>
        </div>

        {/* ===== desktop — full-bleed exploded-parts photo on the right ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={data.typical.image} alt="Land Rover exploded engine components" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, var(--theme-light-bg) 0%, var(--theme-light-bg) 42%, rgba(241,237,232,0.85) 54%, rgba(241,237,232,0.3) 68%, transparent 82%)" }}
            />
          </div>

          <div className="relative px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-widest text-hero-blue">{data.typical.kicker}</p>
              <h3 className="h3 mt-1 uppercase text-[#101828]">
                {data.typical.title}
              </h3>
              <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-hero-blue via-white to-hero-blue" />

              <p className="mt-5 text-sm italic leading-relaxed text-[#4a5568]">{data.typical.intro}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#101828]">{data.typical.body}</p>
            </div>

            <div className="glass-card relative mt-8 grid grid-cols-[minmax(0,1.6fr)_auto_minmax(0,1fr)_auto] items-center gap-6 rounded-2xl p-6">
              <div className="flex min-w-0 items-start gap-3">
                <Icon name="chain" className="mt-0.5 h-8 w-8 shrink-0 text-hero-blue" />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#101828]">{data.typical.scope.label}</p>
                  <p className="mt-1 text-sm leading-snug text-[#4a5568]">{data.typical.scope.text}</p>
                </div>
              </div>
              <span className="h-16 w-px shrink-0 bg-black/10" aria-hidden="true" />
              <div className="shrink-0">
                <p className="text-xs font-bold uppercase tracking-wide text-[#101828]">{data.typical.startingFromLabel}</p>
                <p className="text-3xl font-extrabold text-hero-blue">{data.typical.startingFromPrice}</p>
              </div>
              <a
                href={data.typical.cta.href}
                className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-6 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {data.typical.cta.label}
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
