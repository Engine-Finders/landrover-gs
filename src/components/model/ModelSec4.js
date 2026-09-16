import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

const boldPhrases = ["engine code", "request a free quote", "exact fixed price"];

function withEmphasis(text) {
  const regex = new RegExp(`(${boldPhrases.join("|")})`, "g");
  return text.split(regex).map((part, i) =>
    boldPhrases.includes(part) ? (
      <strong key={i} className="font-bold text-[#101828]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function ModelSec4({ data }) {
  const [disclaimerLine1, disclaimerLine2] = data.disclaimer.split(/(?<=components\.)\s+/);
  const hasChassis = data.columns.length > 4;
  const mobileGridCols = hasChassis ? "grid-cols-[1.1fr_0.65fr_0.65fr_0.8fr_1fr]" : "grid-cols-[1.3fr_0.75fr_0.75fr_1.1fr]";
  const desktopGridCols = hasChassis ? "grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr_1.2fr]" : "grid-cols-[1.6fr_0.9fr_0.9fr_1.3fr]";

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-8 pt-8 md:hidden">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-15"
          style={{
            maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
          }}
          aria-hidden="true"
        >
          <Image src="/model/sec15_part.webp" alt="" fill className="object-cover" sizes="192px" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-2">
            <LandRoverStripe className="h-4 w-8" />
            <p className="label-text uppercase tracking-widest text-[#101828]">{data.kicker}</p>
          </div>

          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
            <span className="block text-[#101828]">{data.headlinePre}</span>
            <span className="block text-hero-blue">{data.headlineHighlight}</span>
          </h2>

          <p className="body-text mt-3 text-[#101828]">{withEmphasis(data.description)}</p>

          {/* pricing table */}
          <div className="glass-card mt-5 overflow-hidden rounded-2xl">
            <div className={`grid ${mobileGridCols} divide-x divide-black/10 border-b border-black/10 bg-white/60`}>
              <div className="flex min-w-0 flex-col items-start gap-1 px-1.5 py-2">
                <Icon name="gear" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                <p className="label-text min-w-0 font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.columns[0]}</p>
              </div>
              <div className="flex min-w-0 flex-col items-start gap-1 px-1.5 py-2">
                <Icon name="fuel" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                <p className="label-text min-w-0 font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.columns[1]}</p>
              </div>
              <div className="flex min-w-0 flex-col items-start gap-1 px-1.5 py-2">
                <Icon name="gears" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                <p className="label-text min-w-0 font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.columns[2]}</p>
              </div>
              {hasChassis && (
                <div className="flex min-w-0 flex-col items-start gap-1 px-1.5 py-2">
                  <Icon name="car" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                  <p className="label-text min-w-0 font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.columns[3]}</p>
                </div>
              )}
              <div className="flex min-w-0 flex-col items-start gap-1 px-1.5 py-2">
                <Icon name="price" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                <p className="label-text font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.columns[hasChassis ? 4 : 3]}</p>
              </div>
            </div>

            {data.rows.map((r, i) => (
              <div
                key={r.family}
                className={`grid ${mobileGridCols} divide-x divide-black/10 ${i > 0 ? "border-t border-black/10" : ""} ${i % 2 === 1 ? "bg-white/40" : ""}`}
              >
                <p className="label-text px-2 py-2.5 font-bold leading-tight text-[#101828]">
                  {r.familyHref ? <Link href={r.familyHref} >{r.family}</Link> : r.family}
                </p>
                <p className={`label-text px-2 py-2.5 font-semibold leading-tight ${r.fuel === "Petrol" ? "text-bmw-red" : "text-hero-blue"}`}>
                  {r.fuel}
                </p>
                <p className="label-text px-2 py-2.5 leading-tight text-[#101828]">{r.size}</p>
                {hasChassis && <p className="label-text px-2 py-2.5 leading-tight text-[#101828]">{r.chassis}</p>}
                <p className="label-text px-2 py-2.5 font-bold leading-tight text-[#101828]">{r.range}</p>
              </div>
            ))}
          </div>

          {/* feature cards 2x2 */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {data.features.map((f) => (
              <div key={f.title} className="glass-card flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
                <Icon name={f.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
                <div className="min-w-0">
                  <p className="label-text font-extrabold uppercase leading-tight tracking-wide text-[#101828]">{f.title}</p>
                  <p className="label-text mt-0.5 leading-snug text-[#101828]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* disclaimer */}
          <div className="relative mt-4 flex items-start gap-3 overflow-hidden rounded-xl border border-black/5 bg-(--color-light-surface) px-4 py-4 shadow-sm">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-hero-blue text-[10px] font-black text-white">
              i
            </span>
            <p className="relative z-10 text-xs leading-relaxed text-[#101828]">{data.disclaimer}</p>

            <div
              className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1 opacity-20"
              style={{ height: "60px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
              aria-hidden="true"
            >
              <span className="h-full w-4" style={{ background: "var(--color-bmw-blue)" }} />
              <span className="h-full w-4" style={{ background: "var(--color-bmw-violet)" }} />
              <span className="h-full w-4" style={{ background: "var(--color-bmw-red)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      {/* faint decorative engine watermark, top-right, faded edges so no hard box is visible */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 opacity-15"
        style={{
          maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
        }}
        aria-hidden="true"
      >
        <Image src="/model/sec15_part.webp" alt="" fill className="object-cover" sizes="256px" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <LandRoverStripe className="h-4.5 w-9" />
          <p className="label-text uppercase tracking-widest text-[#101828]">{data.kicker}</p>
        </div>

        <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
          <span className="text-[#101828]">{data.headlinePre} </span>
          <span className="text-hero-blue">{data.headlineHighlight}</span>
        </h2>

        <p className="body-text mt-2 max-w-3xl text-[#101828]">{data.description}</p>

        {/* pricing table */}
        <div className="glass-card mt-6 overflow-hidden rounded-2xl">
          <div className={`grid ${desktopGridCols} divide-x divide-black/10 border-b border-black/10 bg-white/60`}>
            <div className="flex items-center gap-2 px-6 py-3">
              <Icon name="gear" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.columns[0]}</p>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <Icon name="fuel" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.columns[1]}</p>
            </div>
            <div className="flex items-center gap-2 px-6 py-3">
              <Icon name="gears" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.columns[2]}</p>
            </div>
            {hasChassis && (
              <div className="flex items-center gap-2 px-6 py-3">
                <Icon name="car" className="h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.columns[3]}</p>
              </div>
            )}
            <div className="flex items-center gap-2 px-6 py-3">
              <Icon name="price" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.columns[hasChassis ? 4 : 3]}</p>
            </div>
          </div>

          {data.rows.map((r, i) => (
            <div
              key={r.family}
              className={`grid ${desktopGridCols} divide-x divide-black/10 ${i > 0 ? "border-t border-black/10" : ""} ${i % 2 === 1 ? "bg-white/40" : ""}`}
            >
              <p className="px-6 py-3 text-sm font-bold text-[#101828]">
                {r.familyHref ? <Link href={r.familyHref} >{r.family}</Link> : r.family}
              </p>
              <p className={`px-6 py-3 text-sm font-semibold ${r.fuel === "Petrol" ? "text-bmw-red" : "text-hero-blue"}`}>{r.fuel}</p>
              <p className="px-6 py-3 text-sm text-[#101828]">{r.size}</p>
              {hasChassis && <p className="px-6 py-3 text-sm text-[#101828]">{r.chassis}</p>}
              <p className="px-6 py-3 text-sm font-bold text-[#101828]">{r.range}</p>
            </div>
          ))}
        </div>

        {/* feature bar */}
        <div className="glass-card mt-5 flex items-stretch justify-between rounded-2xl px-6 py-6">
          {data.features.map((f, i) => (
            <div key={f.title} className="relative flex flex-1 items-stretch gap-3 px-4">
              {i > 0 && <span className="absolute left-0 top-1/2 h-3/4 w-px -translate-y-1/2 bg-black/10" />}
              <Icon name={f.icon} className="h-full w-14 shrink-0 text-hero-blue" />
              <div className="flex min-w-0 flex-col justify-center">
                <p className="text-xs font-extrabold uppercase tracking-wide text-[#101828]">{f.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-[#101828]">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* disclaimer */}
        <div className="relative mt-5 flex items-center justify-center overflow-hidden rounded-xl border border-black/5 bg-(--color-light-surface) px-6 py-4 shadow-sm">
          <div className="flex items-start gap-2">
            <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
            <p className="text-center text-xs text-[#101828]">
              {disclaimerLine1}
              <br />
              {disclaimerLine2}
            </p>
          </div>

          <div
            className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1.5 opacity-15"
            style={{ height: "90px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
            aria-hidden="true"
          >
            <span className="h-full w-6" style={{ background: "var(--color-bmw-blue)" }} />
            <span className="h-full w-6" style={{ background: "var(--color-bmw-violet)" }} />
            <span className="h-full w-6" style={{ background: "var(--color-bmw-red)" }} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
