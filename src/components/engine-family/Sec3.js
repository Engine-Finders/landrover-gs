import Image from "next/image";
import Link from "next/link";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import Icon from "@/components/reusable/Icon";
import MobileSplitTitle from "@/components/variant/MobileSplitTitle";

const TABLE_COLS = "grid-cols-[3.75rem_minmax(0,1.15fr)_minmax(0,0.9fr)_minmax(0,1.05fr)_minmax(0,0.85fr)_minmax(0,1.05fr)_minmax(0,1.05fr)]";
const GRID_COLS = "grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.1fr)]";

// "Land Rover 200Tdi Applications —" -> brand / code / rest, code rendered green
function splitTitle(t = "") {
  const m = t.match(/^(Land Rover)\s+(\S+)\s*(.*)$/i);
  return m ? [m[1], m[2], m[3]] : ["", "", t];
}

export default function Sec3({ data }) {
  const [brand, code, rest] = splitTitle(data.titlePre);
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative px-4 py-7">
          <MobileSplitTitle titlePre={data.titlePre} titleHighlight={data.titleHighlight} className="text-xl" baseColorClass="text-white" stripeVariant="left" />

          <div className="no-scrollbar -mx-4 mt-5 overflow-x-auto px-4">
            <div
              className="relative min-w-[780px] overflow-hidden rounded-xl"
              style={{ background: "rgba(13,13,13,0.96)", border: "1px solid rgba(96,112,86,0.35)" }}
            >
              <div className={`grid ${GRID_COLS} divide-x divide-white/10 border-b border-white/10`}>
                {data.columns.map((c) => (
                  <div key={c.label} className="flex min-w-0 items-center justify-center px-3 py-2.5">
                    <p className="whitespace-nowrap text-[10px] font-extrabold uppercase tracking-wide text-white">{c.label}</p>
                  </div>
                ))}
              </div>

              <div className="thin-scrollbar max-h-72 overflow-y-auto">
                {data.rows.map((r, i) => (
                  <div
                    key={`${r.model}-${r.variant}-${i}`}
                    className={`group relative grid ${GRID_COLS} items-center transition-colors hover:bg-hero-blue/10 ${i > 0 ? "border-t border-white/10" : ""}`}
                  >
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 origin-left scale-y-0 bg-hero-blue transition-transform group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <p className="flex min-w-0 items-center gap-1.5 px-3 py-2.5 text-xs font-extrabold text-white">
                      <LandRoverLogo className="h-3 w-3 shrink-0" />
                      <span className="min-w-0 whitespace-nowrap">
                        {r.modelHref ? <Link href={r.modelHref}>{r.model}</Link> : r.model}
                      </span>
                    </p>
                    <p className="min-w-0 px-3 py-2.5 text-center text-xs text-white">
                      {r.variantHref ? <Link href={r.variantHref}>{r.variant}</Link> : r.variant}
                    </p>
                    <p className="min-w-0 px-3 py-2.5 text-center text-xs text-white">{r.generation}</p>
                    <p className="min-w-0 px-3 py-2.5 text-center text-xs text-white">{r.chassis}</p>
                    <p className="min-w-0 px-3 py-2.5 text-center text-xs text-white">{r.years}</p>
                    <p className="min-w-0 px-3 py-2.5 text-center text-xs text-white">{r.powertrain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card-dark mt-4 rounded-xl px-4 py-3.5">
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
              className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-2.5 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {data.prompt.buttonLabel}
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        {/* sec3.jpg bakes a dark-green diagonal panel (rgb 10,49,30) into its left half. The photo starts 22%
            in, so its diagonal lands at ~58–66% of the section, clear of the copy; the uncovered strip on
            the left is filled with the same green. */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgb(10,49,30)" }} aria-hidden="true">
          <div className="absolute inset-y-0 left-[22%] right-0">
            <Image src={data.image} alt="" fill className="object-fill" sizes="78vw" />
          </div>
        </div>

        <div className="relative mx-auto max-w-[76rem] px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <LandRoverLogo className="h-12 w-20" />
            <span className="h-28 w-px bg-[#c9a96e]/50" aria-hidden="true" />
            <h2 className="h2 uppercase">
              {/* 3 short lines so the title stays on the green panel, clear of the photo's diagonal */}
              <span className="block whitespace-nowrap text-white">
                {brand && `${brand} `}
                <span className="text-hero-blue">{code}</span>
              </span>
              <span className="block whitespace-nowrap text-white">{rest}</span>
              <span className="block whitespace-nowrap text-[#c9a96e]">{data.titleHighlight}</span>
            </h2>
          </div>

          {/* reference layout: icon column under MODEL, VARIANT header spanning model name + variant,
              everything centred, gold-tinted rules; VARIANT and YEARS headers bold white, rest muted gold */}
          <div
            className="mt-8 max-w-[56%] overflow-hidden rounded-xl"
            style={{ background: "rgba(10,14,11,0.92)", border: "1px solid rgba(201,169,110,0.3)", boxShadow: "0 25px 60px -30px rgba(0,0,0,0.6)" }}
          >
            <div className={`grid ${TABLE_COLS} border-b border-[#c9a96e]/25 text-center`}>
              <p className="flex items-center justify-center px-2 py-3.5 text-xs uppercase tracking-wide text-[#d8c79a]">{data.columns[0]?.label}</p>
              <p className="col-span-2 flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-3.5 text-xs font-bold uppercase tracking-wide text-white">
                {data.columns[1]?.label}
              </p>
              {data.columns.slice(2).map((c) => (
                <p
                  key={c.label}
                  className={`flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-3.5 text-xs uppercase leading-tight tracking-wide ${
                    /years/i.test(c.label) ? "font-bold text-white" : "text-[#d8c79a]"
                  }`}
                >
                  {c.label}
                </p>
              ))}
            </div>

            {data.rows.map((r, i) => (
              <div
                key={`${r.model}-${r.variant}-${i}`}
                className={`grid ${TABLE_COLS} items-stretch text-center transition-colors hover:bg-white/[0.03] ${i > 0 ? "border-t border-[#c9a96e]/15" : ""}`}
              >
                <span className="flex items-center justify-center px-2 py-5">
                  <Icon name="car" className="h-8 w-8 text-[#c9a96e]" />
                </span>
                <p className="flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-5 text-sm leading-snug text-white">
                  {r.modelHref ? <Link href={r.modelHref} className="hover:text-[#e3c27d]">{r.model}</Link> : r.model}
                </p>
                <p className="flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-5 text-sm leading-snug text-white">
                  {r.variantHref ? <Link href={r.variantHref} className="hover:text-[#e3c27d]">{r.variant}</Link> : r.variant}
                </p>
                <p className="flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-5 text-sm leading-snug text-white">{r.generation}</p>
                <p className="flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-5 text-sm leading-snug text-white">{r.chassis}</p>
                <p className="flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-5 text-sm leading-snug text-white">{r.years}</p>
                <p className="flex items-center justify-center border-l border-[#c9a96e]/20 px-2 py-5 text-sm leading-snug text-white">{r.powertrain}</p>
              </div>
            ))}
          </div>

          <div className="glass-card-dark mt-4 flex max-w-[56%] items-center justify-between gap-4 rounded-2xl px-6 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-blue">
                <Icon name={data.prompt.icon} className="h-4.5 w-4.5 text-white" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">{data.prompt.titlePre}</p>
                <p className="text-xs text-white">{data.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={data.prompt.href}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {data.prompt.buttonLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
