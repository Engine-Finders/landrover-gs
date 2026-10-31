import guide from "@/data/shared/engineGuide.json";
import VIcon from "@/components/variant/VariantIcons";
import { deriveVariant } from "@/lib/variantInfo";

// Section 7: "Market Intelligence" - six key facts for the variant's engine (failure, mileage,
// prices, code, labour) drawn from engineGuide.json and the variant data, plus a nationwide
// coverage map. No enquiry statistics are shown because none are collected yet. Light theme.

const GREEN = "#2f5a35";
const INK = "#1f3d24";
const GOLD = "#c9a24a";
const SERIF = { fontFamily: "var(--font-serif-display), Georgia, 'Times New Roman', serif" };
const gbp = (n) => `£${n.toLocaleString("en-GB")}`;

// simplified GB + Northern Ireland outline (lon/lat projected into a 640x940 box)
const GB_PATH =
  "M307.8 33 L328.2 36 L324.6 56 L291 88 L283.2 114 L256.8 148 L277.8 141 L313.2 128 L390 131 L403.2 150 L385.2 185 L361.8 229 L355.2 244 L331.8 254 L355.2 272 L318.6 300 L358.8 300 L390 323 L407.4 340 L424.8 398 L438 431 L473.4 451 L486 472 L505.2 488 L516.6 542 L530.4 586 L522 612 L539.4 606 L588 607 L613.8 640 L615 653 L591 704 L579 721 L552.6 746 L592.8 761 L588.6 788 L568.2 809 L525 827 L501.6 818 L462.6 827 L444.6 821 L397.2 828 L363 840 L306 838 L291.6 878 L261.6 863 L198 904 L167.4 893 L181.2 879 L205.8 859 L238.2 798 L262.8 779 L301.8 780 L331.2 765 L351 745 L330.6 745 L319.8 755 L273.6 740 L250.8 744 L228 733 L199.8 732 L192 712 L211.2 700 L230.4 690 L265.2 659 L267 646 L267 628 L225 621 L252 586 L235.8 570 L232.2 569 L247.8 558 L280.2 567 L300.6 568 L324 575 L330 558 L330 535 L327 518 L329.4 508 L337.8 493 L316.2 489 L291.6 451 L297 436 L315 405 L267 416 L218.4 436 L210 410 L232.2 354 L217.8 321 L225 305 L168 371 L174 320 L181.8 259 L138 240 L136.8 227 L160.2 200 L166.8 172 L168.6 127 L200.4 110 L195.6 85 L210 38 L225 43 L298.8 40Z";
const NI_PATH = "M150 375 L183 435 L177 465 L144 497 L114 495 L72 488 L21 455 L54 425 L72 385 L123 375Z";
const CITIES = [
  [255, 314], [318.6, 305], [384, 185], [256.8, 152], [413.4, 403], [417, 520], [375.6, 552], [396, 652],
  [441, 605], [319.2, 752], [354.6, 755], [502.8, 750], [426, 810], [298.2, 828], [588, 637], [154.2, 440],
];
// callout bubbles: [label, sub, bubble x/y (in % of the panel), anchor point on the map]
const CALLOUTS = [
  { label: "Scotland", at: [76, 22], to: [300, 230] },
  { label: "North & Midlands", at: [80, 47], to: [420, 560] },
  { label: "Wales & NI", at: [10, 49], to: [250, 680] },
  { label: "South & London", at: [78, 78], to: [480, 790] },
];

// Numeric figures stay on one line: the font scales with the card width (container query units)
// so long ranges like "£9,000–£12,000" never wrap or clip, on a 320px phone or a wide desktop.
function figureSize(value, max) {
  const cq = Math.min(18, 96 / (String(value).length * 0.56));
  return `min(${max}px, ${cq.toFixed(1)}cqw)`;
}

function StatCard({ icon, label, value, sub, note, wrap, wide }) {
  return (
    <div className={`@container flex min-w-0 flex-col rounded-xl ${wide ? "col-span-2 md:col-span-1" : ""} border border-[#e6e2d8] bg-white p-3.5 shadow-[0_8px_24px_-18px_rgba(31,61,36,0.4)] md:p-5`}>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white md:h-12 md:w-12" style={{ background: INK }}>
          <VIcon name={icon} className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.8} />
        </span>
        <p className="text-[12.5px] font-medium leading-snug text-[#2b3229] md:text-[13.5px]">{label}</p>
      </div>
      {wrap ? (
        <p className="mt-3 break-words leading-[1.15] text-[#141a13]" style={{ ...SERIF, fontSize: "min(26px, 15cqw)" }}>{value}</p>
      ) : (
        <p className="mt-3 whitespace-nowrap leading-[1.1] text-[#141a13]" style={{ ...SERIF, fontSize: figureSize(value, 34) }}>{value}</p>
      )}
      {sub && <p className="mt-1.5 text-[12.5px] leading-snug text-[#4a5048] md:text-[14px]">{sub}</p>}
      {note && <p className="mt-auto pt-2 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: GREEN }}>{note}</p>}
    </div>
  );
}

function CoverageMap() {
  return (
    <div className="relative mx-auto aspect-[640/940] w-full max-w-[380px] lg:max-w-[270px] xl:max-w-[300px]">
      <svg viewBox="0 0 640 940" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="vs7-glow" cx="62%" cy="74%" r="42%">
            <stop offset="0" stopColor="#2f5a35" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#7d9a72" stopOpacity="0.75" />
            <stop offset="1" stopColor="#d9ddd5" stopOpacity="0" />
          </radialGradient>
          <clipPath id="vs7-clip">
            <path d={GB_PATH} />
            <path d={NI_PATH} />
          </clipPath>
        </defs>
        <path d={GB_PATH} fill="#dcdfd8" stroke="#c4c9bf" strokeWidth="2" strokeLinejoin="round" />
        <path d={NI_PATH} fill="#dcdfd8" stroke="#c4c9bf" strokeWidth="2" strokeLinejoin="round" />
        <rect x="0" y="0" width="640" height="940" fill="url(#vs7-glow)" clipPath="url(#vs7-clip)" />
        {CALLOUTS.map((c) => (
          <g key={c.label}>
            <path d={`M${c.at[0] * 6.4} ${c.at[1] * 9.4} Q${(c.at[0] * 6.4 + c.to[0]) / 2} ${c.to[1]} ${c.to[0]} ${c.to[1]}`} fill="none" stroke="#9fb39a" strokeWidth="2" />
            <circle cx={c.to[0]} cy={c.to[1]} r="6" fill={INK} />
          </g>
        ))}
        {CITIES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="13" fill="#fff" opacity="0.35" />
            <circle cx={x} cy={y} r="5" fill="#fff" stroke={INK} strokeWidth="2" />
          </g>
        ))}
      </svg>
      {CALLOUTS.map((c) => (
        <span
          key={c.label}
          className="absolute flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border bg-white/95 text-center shadow-[0_6px_16px_-8px_rgba(31,61,36,0.5)] md:h-[80px] md:w-[80px]"
          style={{ left: `${c.at[0]}%`, top: `${c.at[1]}%`, borderColor: "#9fb39a" }}
        >
          <VIcon name="shield" className="h-4 w-4" style={{ color: INK }} />
          <span className="mt-0.5 px-1 text-[9.5px] font-semibold leading-tight text-[#1b211a] md:text-[10.5px]">{c.label}</span>
        </span>
      ))}
    </div>
  );
}

export default function VariantSec7({ sec1, sec2, sec3, sec11 }) {
  const v = deriveVariant(sec1, sec2, sec3);
  const fam = guide.families[v.family];
  if (!fam) return null;
  const top = fam.problems[0];
  const mileage = top.mileage.replace(/\s*miles$/i, "");
  const band = fam.recon || fam.used;
  const generation = sec11?.rows?.find((r) => r.generation)?.generation;

  return (
    <section className="theme-light relative overflow-hidden bg-[#f6f5f1] text-[#141a13]">
      <div className="relative mx-auto max-w-[90rem] px-4 py-10 sm:px-6 md:py-14 lg:px-10 xl:px-14">
        <div className="flex items-center gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a6a1f] md:text-[13px]">Engine Snapshot</p>
          <span className="h-px w-10 md:w-14" style={{ background: GOLD }} aria-hidden="true" />
        </div>
        <h2 className="mt-2 text-[34px] leading-[1.08] sm:text-[42px] lg:text-[52px]" style={{ ...SERIF, color: INK }}>Market Intelligence</h2>
        <p className="mt-2.5 text-[15px] leading-[1.6] text-[#2b3229] md:text-[17px]">
          Key facts and UK guide prices for the {v.name} engine, at a glance.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-5">
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-4">
            <StatCard icon={top.icon} label="Most Common Failure" value={top.title} sub={`Typically ${top.mileage}`} note={`Urgency: ${top.urgency}`} wrap />
            <StatCard icon="engine" label="Engine Code" value={v.engineCode || v.short} sub={generation ? `(${generation})` : null} wrap={(v.engineCode || v.short).length > 12} />
            <StatCard icon="gauge" label="Typical Failure Mileage" value={mileage} sub="miles" wide />
            <StatCard icon="pound" label="Average Replacement Cost" value={`${gbp(band[0])}–${gbp(band[1])}`} sub={fam.recon ? "reconditioned, supply only" : "used, supply only"} wide />
            <StatCard icon="piston" label="Rebuild From" value={v.rebuildFrom ? gbp(v.rebuildFrom) : "On request"} sub="your engine, rebuilt with a 12-month warranty" />
            <StatCard icon="wrench" label="Typical Fitting Time" value={`${fam.hours[0]}–${fam.hours[1]} hrs`} sub={`at ${guide.labourRates.independent} (independent)`} />
          </div>

          <div className="rounded-xl border border-[#e6e2d8] bg-white p-4 shadow-[0_8px_24px_-18px_rgba(31,61,36,0.4)] md:p-6">
            <h3 className="text-[20px] leading-tight md:text-[23px]" style={{ ...SERIF, color: "#141a13" }}>Nationwide Coverage</h3>
            <p className="mt-1 text-[13.5px] leading-snug text-[#4a5048]">{v.short} collection, supply and fitting across the UK.</p>
            <div className="mt-3">
              <CoverageMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
