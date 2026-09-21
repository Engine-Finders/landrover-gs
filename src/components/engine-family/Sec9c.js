import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function Sec9c({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <p className="text-xs font-bold uppercase tracking-widest text-hero-blue">{data.titlePre}</p>
        <h2 className="h2 mt-1 whitespace-nowrap uppercase text-[#101828]">{data.titleHighlight}</h2>
        <span className="mt-3 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
        <p className="mt-3 text-xs leading-relaxed text-[#555]">{data.intro}</p>
      </div>

      <div className="relative aspect-4/3 w-full overflow-hidden md:hidden">
        <Image src={data.imageMobile} alt="Land Rover engine variants" fill className="object-cover" sizes="100vw" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-10"
          style={{ background: "linear-gradient(to bottom, var(--theme-light-bg) 0%, transparent 100%)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          style={{ background: "linear-gradient(to top, var(--theme-light-bg) 0%, transparent 100%)" }}
        />
      </div>

      <div className="relative px-4 pb-7 md:hidden">
        <div className="mt-5 space-y-3">
          {data.cards.map((c) => (
            <div key={c.number} className="glass-card flex items-start gap-3 rounded-2xl px-1.5 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-hero-blue text-[10px] font-extrabold text-white">
                {c.number}
              </span>
              <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                <Image src={c.thumbnail} alt={c.title} fill className="object-contain" sizes="80px" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-extrabold uppercase text-[#101828]">{c.title}</p>
                  <span className="whitespace-nowrap rounded-full bg-[#f3ede4] px-2 py-0.5 text-[9px] font-bold text-hero-blue">{c.hp}</span>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-[#4a5568]">
                  <span className="font-bold text-[#101828]">{c.applicationsLabel}</span> {c.applications}
                </p>
                <p className="mt-1 text-[10px] italic leading-snug text-[#4a5568]">{c.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-5 rounded-2xl bg-(--theme-light-bg) p-4"
          style={{ border: "1px solid rgba(96,112,86,0.3)", boxShadow: "0 12px 30px -10px rgba(0,0,0,0.18)" }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hero-blue">
              <Icon name={data.prompt.icon} className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#101828]">{data.prompt.titlePre}</p>
              <p className="text-[10px] text-[#4a5568]">{data.prompt.subtext}</p>
            </div>
          </div>
          <a
            href={data.prompt.href}
            className="mt-3 flex items-center justify-center gap-2 rounded-md bg-hero-blue px-4 py-2.5 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            {data.prompt.buttonLabel}
          </a>
        </div>
      </div>

      {/* ===== desktop — full-bleed engine + plate photo behind everything ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.image} alt="Land Rover engine variants" fill className="object-cover" style={{ objectPosition: "78% center" }} sizes="100vw" />
          {/* solid block — flat-matches the section's #f7f4ee, not a fade, so there's no visible seam */}
          <div className="absolute inset-y-0 left-0 w-[56%]" style={{ background: "var(--theme-light-bg)" }} aria-hidden="true" />
          <div
            className="absolute inset-y-0 left-[56%] w-[16%]"
            style={{ background: "linear-gradient(to right, var(--theme-light-bg) 0%, rgba(241,237,232,0.7) 45%, transparent 100%)" }}
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 lg:px-8">
          <div className="max-w-md">
            <p className="text-sm font-bold uppercase tracking-widest text-hero-blue">{data.titlePre}</p>
            <h2 className="h2 mt-1 whitespace-nowrap uppercase text-[#101828]">{data.titleHighlight}</h2>
            <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
            <p className="mt-4 text-sm leading-relaxed text-[#555]">{data.intro}</p>
          </div>

          <div className="mt-8 max-w-lg space-y-4">
            {data.cards.map((c) => (
              <div key={c.number} className="glass-card flex items-start gap-5 rounded-2xl px-3 py-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hero-blue text-sm font-extrabold text-white">
                  {c.number}
                </span>
                <div className="relative h-28 w-28 shrink-0 overflow-hidden">
                  <Image src={c.thumbnail} alt={c.title} fill className="object-contain" sizes="112px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-extrabold uppercase text-[#101828]">{c.title}</p>
                    <span className="whitespace-nowrap rounded-full bg-[#f3ede4] px-2.5 py-1 text-[10px] font-bold text-hero-blue">{c.hp}</span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-[#4a5568]">
                    <span className="font-bold text-[#101828]">{c.applicationsLabel}</span> {c.applications}
                  </p>
                  <p className="mt-1 text-xs italic leading-snug text-[#4a5568]">{c.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="relative mt-6 flex items-center justify-between gap-4 rounded-2xl bg-(--theme-light-bg) px-6 py-4"
            style={{ border: "1px solid rgba(96,112,86,0.3)", boxShadow: "0 12px 30px -10px rgba(0,0,0,0.18)" }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                <Icon name={data.prompt.icon} className="h-4.5 w-4.5 text-white" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#101828]">{data.prompt.titlePre}</p>
                <p className="text-xs text-[#4a5568]">{data.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={data.prompt.href}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-hero-blue px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {data.prompt.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
