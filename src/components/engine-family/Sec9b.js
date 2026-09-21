import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import AMGBadge from "@/components/reusable/AMGBadge";

export default function Sec9b({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="flex items-center gap-2">
          <LandRoverLogo className="h-7 w-7" />
          <AMGBadge className="h-3.5" />
        </div>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-hero-blue">{data.kicker}</p>
        <h2 className="h2 mt-1 uppercase">
          <span className="block text-white">{data.titlePre}</span>
          <span className="block text-hero-blue">{data.titleHighlight}</span>
        </h2>
        <span className="mt-3 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
        <p className="mt-3 text-xs leading-relaxed text-white">{data.intro}</p>

        <div className="mt-5 space-y-4">
          {data.rows.map((r) => (
            <div key={r.number} className="glass-card-dark overflow-hidden rounded-2xl p-4">
              <div className="flex gap-3">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-black/40">
                  <span className="absolute left-1.5 top-1.5 z-10 rounded bg-hero-blue px-1.5 py-0.5 text-[9px] font-extrabold text-white">{r.number}</span>
                  <Image src={data.image} alt={r.title} fill className="object-cover" sizes="96px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold uppercase leading-tight text-white">
                    {r.title} <span className="text-hero-blue">{r.titleHighlight}</span>
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-white">{r.body}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-white/70">Starting from</p>
                  <p className="text-lg font-extrabold text-hero-blue">{r.startingFrom}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {r.ctas.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="whitespace-nowrap rounded-md border border-hero-blue px-3 py-1.5 text-[10px] font-bold uppercase text-hero-blue"
                    >
                      {c.label} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card-dark mt-5 rounded-xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hero-blue">
              <Icon name={data.prompt.icon} className="h-4 w-4 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white">{data.prompt.titlePre}</p>
              <p className="text-[11px] text-white">{data.prompt.subtext}</p>
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

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <LandRoverLogo className="h-9 w-9" />
            <AMGBadge className="h-4" />
          </div>
          <p className="mt-3 text-sm font-bold uppercase tracking-widest text-hero-blue">{data.kicker}</p>
          <h2 className="h2 mt-1 uppercase">
            <span className="block text-white">{data.titlePre}</span>
            <span className="block text-hero-blue">{data.titleHighlight}</span>
          </h2>
          <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white">{data.intro}</p>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {data.rows.map((r) => (
              <div key={r.number} className="grid grid-cols-[auto_minmax(0,1fr)_260px] items-center gap-8 py-7">
                <div className="relative h-28 w-52 shrink-0 overflow-hidden rounded-lg bg-black/30">
                  <span className="absolute left-0 top-0 z-10 rounded-br-lg rounded-tl-lg bg-hero-blue px-3 py-1.5 text-sm font-extrabold text-white">
                    {r.number}
                  </span>
                  <Image src={data.image} alt={r.title} fill className="object-cover" sizes="208px" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold uppercase leading-tight text-white">
                    {r.title} <span className="text-hero-blue">{r.titleHighlight}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{r.body}</p>
                </div>
                <div className="h-full border-l border-hero-blue/30 pl-8">
                  <p className="text-xs font-bold uppercase tracking-wide text-hero-blue/80">Starting from</p>
                  <p className="text-3xl font-extrabold text-hero-blue">{r.startingFrom}</p>
                  <div className="mt-3 flex flex-col items-start gap-2">
                    {r.ctas.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-hero-blue px-4 py-2 text-xs font-bold uppercase tracking-wide text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
                      >
                        {c.label} <span aria-hidden>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="relative mt-6 flex items-center justify-between gap-4 overflow-hidden rounded-2xl px-6 py-4"
            style={{ background: "rgba(15,15,15,0.85)", border: "1px solid rgba(96,112,86,0.3)" }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                <Icon name={data.prompt.icon} className="h-4.5 w-4.5 text-white" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">{data.prompt.titlePre}</p>
                <p className="text-xs text-white/70">{data.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={data.prompt.href}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md bg-hero-blue px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {data.prompt.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
