import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";

export default function VariantSec3({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-10 pt-7 md:hidden">
        <h2 className="h2 uppercase">
          <span className="block text-[#101828]">{data.headlinePre}</span>
          <span className="block text-hero-blue">{data.headlineHighlight}</span>
        </h2>

        <p className="mt-2 text-sm text-[#101828]">
          {data.startingFromLabel} <span className="font-extrabold text-hero-blue">{data.startingFromPrice}</span>
        </p>
        <span className="mt-2 block h-0.5 w-24 bg-hero-blue" />

        <div className="mt-5 space-y-3">
          {data.cards.map((c, i) => (
            <div
              key={`${c.code}-${i}`}
              className="overflow-hidden rounded-2xl p-4"
              style={{ background: "#f7f4ee", border: "1px solid rgba(160,130,90,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-14 shrink-0">
                    <Image src={data.engineImage} alt={`${c.code} engine`} fill className="object-contain" sizes="56px" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#8a715a]">Engine Code</p>
                    {c.codeHref ? (
                      <Link href={c.codeHref} className="mt-1 inline-block w-fit rounded-sm bg-[#a0825a] px-2 py-1 text-xs font-extrabold text-white">
                        {c.code}
                      </Link>
                    ) : (
                      <span className="mt-1 inline-block w-fit rounded-sm bg-[#a0825a] px-2 py-1 text-xs font-extrabold text-white">{c.code}</span>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#8a715a]">Rebuild From</p>
                  <p className="text-xl font-extrabold" style={{ color: "#a0825a" }}>
                    {c.price}
                  </p>
                </div>
              </div>

              <div
                className="mt-3 flex items-center gap-3 pt-3"
                style={{ borderTop: "1px solid rgba(160,130,90,0.2)" }}
              >
                {data.carImage && (
                  <div className="relative h-10 w-16 shrink-0">
                    <Image src={data.carImage} alt={c.generation} fill className="object-contain" sizes="64px" />
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-[#8a715a]">Generation</p>
                  <p className="text-sm font-bold leading-tight text-[#2a231c]">{c.generation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card mt-4 divide-y divide-black/10 rounded-xl px-4">
          {data.notes.map((n) => (
            <div key={n.text} className="flex items-start gap-3.5 py-5">
              <Icon name={n.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
              <p className="text-sm font-medium text-[#101828]">{n.text}</p>
            </div>
          ))}
        </div>

        <a
          href={data.cta.href}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-3 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
        >
          <Icon name={data.cta.icon} className="h-5 w-5 shrink-0" />
          {data.cta.label} <span aria-hidden>→</span>
        </a>

        <div className="relative mt-5 overflow-hidden rounded-xl bg-[#0d0d0d]">
          <div className="relative p-4">
            <div className="flex items-start gap-2">
              <Icon name="warning" className="mt-0.5 h-6 w-6 shrink-0 text-hero-blue" />
              <div>
                <h3 className="h3 text-white uppercase">
                  {data.warning.titlePre}
                  <span className="text-hero-blue">{data.warning.titleHighlight}</span>
                </h3>
                <span className="mt-2 block h-0.5 w-20 bg-hero-blue" />
              </div>
            </div>

            <div className="mt-3 space-y-3">
              {data.warning.paragraphs.map((p, i) => (
                <p key={i} className="text-xs leading-snug text-white">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-3">
              <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
              <p className="label-text italic text-hero-blue/80">{data.warning.source}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        {/* diagonal gold accent, top-right corner of the section */}
        <div
          className="pointer-events-none absolute -right-4 -top-4 flex h-44 gap-3"
          style={{ transform: "skewX(-16deg)", transformOrigin: "top right" }}
          aria-hidden="true"
        >
          <span className="h-full w-5" style={{ background: "linear-gradient(180deg, transparent, var(--color-hero-gold))" }} />
          <span className="h-full w-5" style={{ background: "linear-gradient(180deg, transparent, var(--color-hero-blue-dark))" }} />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <h2 className="h2 uppercase">
            <span className="block text-[#101828]">{data.headlinePre}</span>
            <span className="block text-hero-blue">{data.headlineHighlight}</span>
          </h2>
          <p className="mt-3 text-lg text-[#101828]">
            {data.startingFromLabel} <span className="font-extrabold text-hero-blue">{data.startingFromPrice}</span>
          </p>
          <span className="mt-2 block h-0.5 w-32 bg-hero-blue" />

          <div className="mt-6 grid grid-cols-[1.6fr_1fr] items-stretch gap-6">
            <div
              className="overflow-hidden rounded-2xl"
              style={{ background: "#f7f4ee", border: "1px solid rgba(160,130,90,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
            >
              <div
                className="grid grid-cols-[1.2fr_1.4fr_1fr] items-center py-1.5"
                style={{ background: "rgba(160,130,90,0.08)", borderBottom: "1px solid rgba(160,130,90,0.2)" }}
              >
                <p className="flex items-center px-4">
                  <span className="w-fit rounded-sm bg-[#a0825a] px-3 py-2 text-sm font-bold text-white">Engine Code</span>
                </p>
                <p className="px-4 text-left text-sm font-bold text-[#2a231c]">
                  Generation
                </p>
                <p className="px-4 text-left text-sm font-bold text-[#2a231c]">
                  Rebuild From
                </p>
              </div>

              {data.cards.map((c, i) => (
                <div
                  key={`${c.code}-${i}`}
                  className="grid grid-cols-[1.2fr_1.4fr_1fr] items-stretch"
                  style={{ borderTop: i > 0 ? "1px solid rgba(160,130,90,0.2)" : undefined }}
                >
                  {/* col 1: engine code + render */}
                  <div className="relative flex flex-col items-center justify-center px-4 py-3.5">
                    {c.codeHref ? (
                      <Link
                        href={c.codeHref}
                        className="absolute left-2.5 top-2.5 z-10 rounded-md bg-[#a0825a] px-2.5 py-1 text-xs font-extrabold text-white"
                      >
                        {c.code}
                      </Link>
                    ) : (
                      <span className="absolute left-2.5 top-2.5 z-10 w-fit rounded-md bg-[#a0825a] px-2.5 py-1 text-xs font-extrabold text-white">
                        {c.code}
                      </span>
                    )}
                    <div className="relative mt-3.5 h-20 w-24 shrink-0">
                      <Image src={data.engineImage} alt={`${c.code} engine`} fill className="object-contain" sizes="96px" />
                    </div>
                  </div>

                  {/* col 2: generation + car graphic */}
                  <div
                    className="flex flex-col items-center justify-center gap-1.5 px-4 py-3.5"
                    style={{ borderLeft: "1px solid rgba(160,130,90,0.2)" }}
                  >
                    <p className="text-sm font-bold text-[#2a231c]">{c.generation}</p>
                    {data.carImage && (
                      <div className="relative h-16 w-32 shrink-0">
                        <Image src={data.carImage} alt={c.generation} fill className="object-contain" sizes="128px" />
                      </div>
                    )}
                  </div>

                  {/* col 3: price */}
                  <div
                    className="flex items-center justify-center px-4 py-3.5"
                    style={{ borderLeft: "1px solid rgba(160,130,90,0.2)" }}
                  >
                    <p className="text-3xl font-extrabold" style={{ color: "#a0825a" }}>
                      {c.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="glass-card flex flex-1 flex-col justify-center divide-y divide-black/10 rounded-xl px-6">
                {data.notes.map((n) => (
                  <div key={n.text} className="flex items-start gap-4 py-7">
                    <Icon name={n.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                    <p className="text-base font-medium leading-snug text-[#101828]">{n.text}</p>
                  </div>
                ))}
              </div>

              <a
                href={data.cta.href}
                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-hero-blue to-hero-blue-dark px-6 py-3.5 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Icon name={data.cta.icon} className="h-6 w-6 shrink-0" />
                {data.cta.label} <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-[1.35fr_1fr] overflow-hidden rounded-2xl bg-[#0d0d0d]">
            <div className="relative z-10 px-8 py-6 lg:px-10 lg:py-7">
              <div className="flex items-start gap-3">
                <Icon name="warning" className="mt-1 h-8 w-8 shrink-0 text-hero-blue" />
                <div>
                  <h3 className="h3 text-white uppercase">
                    {data.warning.titlePre}
                    <span className="text-hero-blue">{data.warning.titleHighlight}</span>
                  </h3>
                  <span className="mt-3 block h-0.5 w-28 bg-hero-blue" />
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {data.warning.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-white">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2.5 border-t border-white/15 pt-4">
                <Icon name="info" className="h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-xs italic text-hero-blue/80">{data.warning.source}</p>
              </div>
            </div>

            <div className="relative" style={{ borderLeft: "1px solid rgba(173,135,92,0.35)" }}>
              <Image
                src={data.warning.bgImage}
                alt="Land Rover AMG GT 53 timing chain mechanism"
                fill
                className="object-cover"
                style={{ objectPosition: "68% 50%" }}
                sizes="480px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
