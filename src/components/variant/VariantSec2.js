import guide from "@/data/shared/engineGuide.json";
import VIcon from "@/components/variant/VariantIcons";
import { deriveVariant } from "@/lib/variantInfo";

// Section 2: engine replacement cost table (used / reconditioned / rebuilt / main dealer), guide
// note, labour estimate and compare CTA. Bands come from the engine family in engineGuide.json;
// the Rebuilt row is anchored to the variant's own "rebuild from" price.

const GREEN = "#7f9f4f";
const RATE = { lo: 65, hi: 95 };

const r100 = (n) => Math.round(n / 100) * 100;
const gbp = (n) => `£${n.toLocaleString("en-GB")}`;
const band = ([a, b]) => `${gbp(a)} – ${gbp(b)}`;
const fitted = ([a, b], [h1, h2]) => [r100(a + h1 * RATE.lo), r100(b + h2 * RATE.hi)];

function buildRows(fam, rebuildFrom) {
  const w = guide.warranty;
  const rebuilt = rebuildFrom ? [rebuildFrom, r100(rebuildFrom * 1.6)] : null;
  return [
    {
      icon: "tag", type: "Used Engine",
      supply: band(fam.used), fit: band(fitted(fam.used, fam.hours)), warranty: w.used,
      bestIcon: "car", best: "Budget priority; project vehicles",
    },
    {
      icon: "cog", type: "Reconditioned Engine",
      supply: fam.recon ? band(fam.recon) : "N/A", fit: fam.recon ? band(fitted(fam.recon, fam.hours)) : "N/A", warranty: fam.recon ? w.recon : "N/A",
      bestIcon: "scale", best: fam.recon ? "Most owners — best cost/warranty balance" : "Too new for exchange units",
    },
    {
      icon: "piston", type: "Rebuilt Engine",
      supply: rebuilt ? band(rebuilt) : "On request", fit: rebuilt ? band(fitted(rebuilt, fam.hours)) : "On request", warranty: w.rebuilt,
      bestIcon: "clock", best: "Long-term ownership; 3+ year horizon",
    },
    fam.dealer
      ? { icon: "star", type: "Main Dealer New", supply: "Dealer only", fit: band(fam.dealer), warranty: w.dealer, bestIcon: "shield", best: "Nearly-new cars still under manufacturer cover" }
      : { icon: "star", type: "Main Dealer New", supply: "N/A", fit: "N/A", warranty: "N/A", bestIcon: "shield", best: "No longer available new" },
  ];
}

function TypeIcon({ name }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#7f9f4f]/30 bg-[#1d2a18] text-white md:h-11 md:w-11">
      <VIcon name={name} className="h-5 w-5 md:h-[22px] md:w-[22px]" />
    </span>
  );
}

const isNA = (v) => v === "N/A";

export default function VariantSec2({ sec1, data, sec3 }) {
  const v = deriveVariant(sec1, data, sec3);
  const fam = guide.families[v.family];
  if (!fam) return null;
  const rows = buildRows(fam, v.rebuildFrom);
  const hours = `${fam.hours[0]}–${fam.hours[1]} hours`;

  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b0d0a] text-white">
      <div className="relative mx-auto max-w-[90rem] px-4 py-10 sm:px-6 md:py-14 lg:px-10 xl:px-14">
        <span className="inline-block rounded bg-[#1d2a18] px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a9c47e] md:text-[11px]">
          Replacement Costs
        </span>
        <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[30px] lg:text-[36px]" style={{ fontFamily: "var(--font-instrument-sans), var(--font-inter), Arial, sans-serif" }}>
          {v.name} Engine Replacement Costs
        </h2>

        {/* ---------- mobile / tablet: one card per engine type ---------- */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:hidden">
          {rows.map((r) => (
            <article key={r.type} className="rounded-xl border border-white/12 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <TypeIcon name={r.icon} />
                <h3 className="text-[16px] font-semibold leading-tight">{r.type}</h3>
              </div>
              <dl className="mt-3.5 grid grid-cols-3 divide-x divide-white/10 rounded-lg border border-white/10 bg-black/30 py-2.5">
                {[["Supply only", r.supply], ["Fitted (indie)", r.fit], ["Warranty", r.warranty]].map(([k, val]) => (
                  <div key={k} className="px-1.5 text-center">
                    <dt className="text-[10px] font-medium uppercase tracking-[0.06em] text-white/55">{k}</dt>
                    <dd className={`mt-1 text-[12.5px] font-semibold leading-snug tracking-[-0.01em] min-[400px]:text-[13.5px] ${isNA(val) ? "text-white/45" : "text-white"}`}>{val.replace(" – ", "–")}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 flex items-start gap-2 text-[13px] leading-snug text-white/80">
                <VIcon name={r.bestIcon} className="mt-px h-4 w-4 shrink-0" style={{ color: GREEN }} />
                <span><span className="font-semibold text-white">Best for:</span> {r.best}</span>
              </p>
            </article>
          ))}
        </div>

        {/* ---------- desktop: table ---------- */}
        <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#7f9f4f]/35 lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#16231a] text-[15px] font-semibold">
                {["Engine Type", "Supply Only", "Fitted (Indie)", "Warranty", "Best For"].map((h, i) => (
                  <th key={h} scope="col" className={`border-white/10 px-5 py-3.5 ${i ? "border-l" : ""} ${i > 0 && i < 4 ? "text-center" : i === 0 ? "pl-16" : "pl-6"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.type} className="border-t border-white/10 text-[16px] transition-colors hover:bg-white/[0.025]">
                  <th scope="row" className="w-[22%] px-5 py-4 font-medium">
                    <span className="flex items-center gap-3.5">
                      <TypeIcon name={r.icon} />
                      {r.type}
                    </span>
                  </th>
                  <td className={`border-l border-white/10 px-4 py-4 text-center ${isNA(r.supply) ? "text-white/45" : ""}`}>{r.supply}</td>
                  <td className={`border-l border-white/10 px-4 py-4 text-center ${isNA(r.fit) ? "text-white/45" : ""}`}>{r.fit}</td>
                  <td className="border-l border-white/10 px-4 py-4">
                    <span className={`flex items-center justify-center gap-3 ${isNA(r.warranty) ? "text-white/45" : ""}`}>
                      {!isNA(r.warranty) && <VIcon name="shield" className="h-7 w-7 shrink-0" style={{ color: GREEN }} />}
                      {r.warranty}
                    </span>
                  </td>
                  <td className="w-[24%] border-l border-white/10 px-5 py-4">
                    <span className="flex items-center gap-3.5 text-[15px] leading-snug">
                      <VIcon name={r.bestIcon} className="h-7 w-7 shrink-0 text-white/80" />
                      {r.best}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* guide note */}
        <p className="mt-3 flex items-start gap-3 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[13.5px] leading-relaxed text-white/85 md:mt-4 md:items-center md:px-5 md:text-[15px]">
          <VIcon name="info" className="mt-0.5 h-5 w-5 shrink-0 md:mt-0 md:h-6 md:w-6" style={{ color: GREEN }} />
          <span>
            Guide prices for {v.short} engine replacement in the UK. Your exact quote depends on condition, mileage and spec
            {v.rebuildFrom ? <> — rebuilds start from <span style={{ color: GREEN }}>{gbp(v.rebuildFrom)}</span></> : null}.
          </span>
        </p>

        {/* labour + CTA */}
        <div className="mt-3 flex flex-col gap-4 rounded-xl border border-white/12 bg-white/[0.03] p-4 md:mt-4 md:p-5 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex flex-1 items-start gap-3.5 md:gap-5">
            <VIcon name="wrench" className="h-9 w-9 shrink-0 text-white/85 md:h-12 md:w-12" />
            <p className="text-[14px] leading-relaxed text-white/85 md:text-[15px]">
              <span className="font-semibold text-white">Labour estimate:</span> Fitting a {v.name} engine typically takes{" "}
              <span style={{ color: GREEN }}>{hours}</span> at {guide.labourRates.independent} (independent) or {guide.labourRates.london} (London/SE specialist).
            </p>
          </div>
          <a
            href="#quote-form"
            className="group flex items-center gap-4 rounded-lg border border-[#5a7a3c] bg-linear-to-br from-[#3e5a2c] to-[#2c4220] px-5 py-4 text-[15px] font-semibold leading-snug text-white shadow-[0_10px_30px_-12px_rgba(90,122,60,0.8)] transition-colors hover:from-[#4a6a35] hover:to-[#35502a] md:text-[17px] lg:w-[400px] lg:shrink-0 lg:border-l lg:px-6"
          >
            <VIcon name="arrow" className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" />
            Compare {v.short} engine prices from UK specialists
          </a>
        </div>
      </div>
    </section>
  );
}
