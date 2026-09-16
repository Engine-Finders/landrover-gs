import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import MobileSplitTitle from "@/components/variant/MobileSplitTitle";

export default function VariantSec11({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative px-4 pb-6 pt-4">
          <MobileSplitTitle titlePre={data.titlePre} titleHighlight={data.titleHighlight} baseColorClass="text-white" />
          <p className="mt-2 text-xs leading-snug text-white">{data.description}</p>

          <div className="no-scrollbar -mx-4 mt-5 overflow-x-auto px-4">
            <div className="glass-card-dark min-w-130 overflow-hidden rounded-xl" style={{ background: "rgba(10,10,12,0.96)" }}>
              <div className="flex border-b border-white/10">
                {data.columns.map((c) => (
                  <div key={c.label} className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-3 py-2.5">
                    <Icon name={c.icon} className="h-4.5 w-4.5 shrink-0 text-hero-blue" />
                    <p className="label-text whitespace-nowrap font-extrabold uppercase tracking-wide text-hero-blue">{c.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative divide-y divide-white/10">
                <div className="pointer-events-none absolute inset-0 z-10 flex" aria-hidden="true">
                  <span className="min-w-0 flex-1 border-r border-white/10" />
                  <span className="min-w-0 flex-1 border-r border-white/10" />
                  <span className="min-w-0 flex-1 border-r border-white/10" />
                  <span className="min-w-0 flex-1 border-r border-white/10" />
                  <span className="min-w-0 flex-1" />
                </div>
                {data.rows.map((r) => (
                  <div key={r.year} className="group relative flex transition-colors hover:bg-hero-blue/10">
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-left scale-y-0 bg-hero-blue transition-transform group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs font-extrabold text-white">{r.year}</p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs leading-tight text-white">{r.generation}</p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs font-bold text-hero-blue">
                      {r.codeHref ? <Link href={r.codeHref} >{r.engineCode}</Link> : r.engineCode}
                    </p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs text-white">{r.fuel}</p>
                    <p className="min-w-0 flex-1 px-3 py-2.5 text-center text-xs text-white">{r.service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card-dark mt-4 flex items-start gap-3 rounded-xl px-4 py-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-xs font-bold text-hero-blue">
              i
            </span>
            <p className="text-xs leading-snug text-white">
              <span className="font-bold text-hero-blue">{data.notice.highlight}</span>
              {data.notice.rest}
            </p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.image} alt="Land Rover AMG GT 53 engine and sedan" fill className="object-cover" sizes="100vw" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="h2 uppercase">
              <span className="text-white">{data.titlePre}</span>
              <span className="text-hero-blue">{data.titleHighlight}</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white">{data.description}</p>
          </div>

          <div
            className="glass-card-dark mt-6 max-w-3xl overflow-hidden rounded-2xl"
            style={{ background: "rgba(10,10,12,0.96)", boxShadow: "0 25px 60px -30px rgba(173,135,92,0.5)" }}
          >
            <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.6fr)] border-b border-white/10">
              {data.columns.map((c) => (
                <div key={c.label} className="flex items-center gap-2 px-5 py-3.5">
                  <Icon name={c.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
                  <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{c.label}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute inset-0 z-10 grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.6fr)]"
                aria-hidden="true"
              >
                <span className="border-r border-white/10" />
                <span className="border-r border-white/10" />
                <span className="border-r border-white/10" />
                <span className="border-r border-white/10" />
                <span />
              </div>
              {data.rows.map((r, i) => (
                <div
                  key={r.year}
                  className={`group relative grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.6fr)] items-center transition-colors hover:bg-hero-blue/10 ${i > 0 ? "border-t border-white/10" : ""}`}
                >
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-left scale-y-0 bg-hero-blue transition-transform group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <p className="px-5 py-3 text-sm font-extrabold text-white">{r.year}</p>
                  <p className="px-5 py-3 text-sm text-white">{r.generation}</p>
                  <p className="px-5 py-3 text-sm font-bold text-hero-blue">
                    {r.codeHref ? <Link href={r.codeHref} >{r.engineCode}</Link> : r.engineCode}
                  </p>
                  <p className="px-5 py-3 text-sm text-white">{r.fuel}</p>
                  <p className="px-5 py-3 text-sm text-white">{r.service}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-dark mt-5 flex max-w-3xl items-start gap-3 rounded-xl px-6 py-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-sm font-bold text-hero-blue">
              i
            </span>
            <p className="text-sm leading-relaxed text-white">
              <span className="font-bold text-hero-blue">{data.notice.highlight}</span>
              {data.notice.rest}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
