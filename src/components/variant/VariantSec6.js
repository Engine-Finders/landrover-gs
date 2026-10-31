import Image from "next/image";
import Link from "next/link";
import guide from "@/data/shared/engineGuide.json";
import specs from "@/data/shared/engineSpecs.json";
import VIcon from "@/components/variant/VariantIcons";
import { Eyebrow } from "@/components/variant/VariantSec5";
import { deriveVariant } from "@/lib/variantInfo";

// Section 6: engine codes by generation/years (from the variant's Sec11 rows), technical specs for
// the engine family (engineSpecs.json) and a compare CTA. Light theme, continues Section 5.

const INK = "#a9c47e";
const SERIF = { fontFamily: "var(--font-serif-display), Georgia, 'Times New Roman', serif" };
const isMissing = (s = "") => /\[MISSING/i.test(String(s));
const clean = (s = "") => String(s).replace(/\s+/g, " ").trim();

// collapse the per-year rows into one row per engine code + generation
function groupRows(rows = []) {
  const out = [];
  for (const r of rows) {
    const code = isMissing(r.engineCode) || !clean(r.engineCode) ? "Confirmed by reg" : clean(r.engineCode);
    const last = out[out.length - 1];
    if (last && last.code === code && last.generation === r.generation) {
      last.to = r.year;
    } else {
      out.push({ code, generation: clean(r.generation), fuel: clean(r.fuel), from: r.year, to: r.year, href: r.codeHref });
    }
  }
  return out.map((r) => ({
    ...r,
    years: isMissing(r.from) ? "From launch" : r.from === r.to ? String(r.from) : `${r.from}–${r.to}`,
  }));
}

const SPEC_ROWS = [
  { key: "displacement", icon: "engine", label: "Displacement" },
  { key: "cylinders", icon: "cylinders", label: "Cylinders" },
  { key: "compression", icon: "gauge", label: "Compression Ratio" },
  { key: "fuel", icon: "fuel", label: "Fuel System" },
  { key: "torque", icon: "turbo", label: "Torque" },
];

function CodeLabel({ r }) {
  return r.href ? (
    <Link href={r.href} className="underline-offset-4 hover:underline" style={{ color: INK }}>{r.code}</Link>
  ) : (
    <span style={{ color: INK }}>{r.code}</span>
  );
}

export default function VariantSec6({ sec1, sec2, sec3, sec11 }) {
  const v = deriveVariant(sec1, sec2, sec3);
  const rows = groupRows(sec11?.rows);
  const fam = guide.families[v.family];
  const recon = fam?.recon ? `£${fam.recon[0].toLocaleString("en-GB")}–£${fam.recon[1].toLocaleString("en-GB")}` : "On request";
  const spec = specs.families[v.family]?.specs;

  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b0d0a] text-white">
      <div className="relative mx-auto grid max-w-[90rem] gap-y-4 border-t border-white/10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-x-10 lg:px-10 xl:px-14">
        {/* ---------- engine codes ---------- */}
        <div className="min-w-0">
          <Eyebrow>Engine Reference</Eyebrow>
          <h2 className="mt-2 text-[32px] uppercase leading-[1.05] tracking-[0.01em] sm:text-[40px] lg:text-[50px]" style={{ ...SERIF, color: "#fff" }}>
            Engine Codes
          </h2>
          <p className="mt-3 text-[15px] leading-[1.6] text-white/80 md:text-[17px]">
            Every engine code fitted to the {v.name}, by generation and year.
          </p>

          {/* mobile cards */}
          <ul className="mt-5 space-y-2.5 md:hidden">
            {rows.map((r) => (
              <li key={`${r.code}-${r.generation}-${r.from}`} className="flex gap-3 rounded-xl border border-white/12 bg-white/[0.03] p-3.5">
                <Image src="/variant/sec10_engine.webp" alt="" width={504} height={495} sizes="64px" className="h-16 w-16 shrink-0 object-contain" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[16px] font-semibold leading-snug"><CodeLabel r={r} /></p>
                    <p className="shrink-0 text-[13.5px] font-medium text-white/80">{r.years}</p>
                  </div>
                  <dl className="mt-2 grid grid-cols-3 gap-2 text-[12.5px] leading-snug">
                    {[["Generation", r.generation], ["Fuel", r.fuel || "—"], ["Avg. Recon", recon]].map(([k, val]) => (
                      <div key={k} className="min-w-0">
                        <dt className="text-[10.5px] font-medium uppercase tracking-[0.05em] text-white/50">{k}</dt>
                        <dd className="mt-0.5 font-medium text-white">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            ))}
          </ul>

          {/* tablet / desktop table */}
          <div className="mt-6 hidden overflow-hidden rounded-xl border border-[#7f9f4f]/35 md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-[14.5px] font-semibold text-white" style={{ background: "#16231a" }}>
                  <th scope="col" className="w-[110px] px-3 py-3.5"><span className="sr-only">Engine</span></th>
                  {["Engine Code", "Generation", "Years", "Fuel", "Avg. Recon Cost"].map((h) => (
                    <th key={h} scope="col" className="border-l border-white/15 px-4 py-3.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={`${r.code}-${r.generation}-${r.from}`} className="border-t border-white/10 text-[15px]">
                    {i === 0 && (
                      <td rowSpan={rows.length} className="px-3 py-3 align-middle">
                        <Image src="/variant/sec10_engine.webp" alt="" width={504} height={495} sizes="90px" className="mx-auto h-auto w-[86px]" aria-hidden="true" />
                      </td>
                    )}
                    <td className="border-l border-white/10 px-4 py-4 font-medium leading-snug"><CodeLabel r={r} /></td>
                    <td className="border-l border-white/10 px-4 py-4 leading-snug text-white/80">{r.generation}</td>
                    <td className="whitespace-nowrap border-l border-white/10 px-4 py-4 text-white/80">{r.years}</td>
                    <td className="border-l border-white/10 px-4 py-4 leading-snug text-white/80">{r.fuel || "—"}</td>
                    <td className="whitespace-nowrap border-l border-white/10 px-4 py-4 font-medium text-white">{recon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- specs + CTA ---------- */}
        <div className="flex flex-col gap-4 lg:pt-2">
          {spec && (
            <div className="rounded-xl border border-white/12 bg-[#0f130e]/90 p-4 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-white/10 pb-3">
                <h3 className="text-[21px] uppercase leading-tight md:text-[24px]" style={{ ...SERIF, color: "#fff" }}>Technical Specs</h3>
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em]" style={{ color: INK }}>{v.name.replace(/^Land Rover /, "")} Spec</p>
              </div>
              <dl className="divide-y divide-white/10">
                {SPEC_ROWS.map((s) => (
                  <div key={s.key} className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 py-3 text-[14px] md:text-[15px]">
                    <dt className="flex items-center gap-3 text-white/75">
                      <VIcon name={s.icon} className="h-6 w-6 shrink-0" style={{ color: INK }} />
                      {s.label}
                    </dt>
                    <dd className="leading-snug text-white">{spec[s.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <a
            href="#quote-form"
            className="group relative isolate flex min-h-[132px] items-center gap-4 overflow-hidden rounded-xl border border-[#7f9f4f]/35 px-5 py-5 text-white shadow-[0_18px_40px_-20px_rgba(60,100,40,0.8)] md:min-h-[150px] md:gap-6 md:px-7 md:py-6"
            style={{
              background:
                "radial-gradient(ellipse 30% 55% at 18% 25%, rgba(78,112,58,0.55) 0%, transparent 70%), radial-gradient(ellipse 35% 60% at 55% 85%, rgba(58,92,44,0.5) 0%, transparent 70%), radial-gradient(ellipse 25% 45% at 70% 15%, rgba(90,124,66,0.35) 0%, transparent 70%), linear-gradient(115deg, #1e3a1d 0%, #1a3319 45%, #132613 100%)",
            }}
          >
            {/* engine, blended into the green on its left edge */}
            <Image
              src="/variant/sec10_engine.webp"
              alt=""
              width={504}
              height={495}
              sizes="(min-width: 768px) 240px, 170px"
              className="pointer-events-none absolute -right-6 top-1/2 -z-10 h-auto w-[170px] -translate-y-1/2 opacity-55 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] sm:w-[210px] sm:opacity-80 md:-right-8 md:w-[230px] md:opacity-95"
              aria-hidden="true"
            />
            <span
              className="pointer-events-none absolute inset-0 -z-10"
              style={{ background: "linear-gradient(90deg, #1b3519 0%, rgba(27,53,25,0.95) 52%, rgba(27,53,25,0.45) 74%, transparent 100%)" }}
              aria-hidden="true"
            />
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#d4ab55] text-[#d4ab55] transition-colors group-hover:bg-[#d4ab55]/10 md:h-16 md:w-16">
              <VIcon name="arrow" className="h-6 w-6 transition-transform group-hover:translate-x-0.5 md:h-7 md:w-7" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 max-w-[70%] sm:max-w-[60%]">
              <span className="block text-[19px] font-semibold leading-[1.2] tracking-[-0.01em] md:text-[25px]" style={{ fontFamily: "var(--font-instrument-sans), var(--font-inter), Arial, sans-serif" }}>
                Compare {v.short} engine prices{v.model && v.model !== v.short ? ` for your ${v.model}` : ""}
              </span>
              <span className="mt-1.5 block text-[13.5px] leading-snug text-white/90 md:mt-2 md:text-[16px]">Get quotes from trusted UK specialists in minutes.</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
