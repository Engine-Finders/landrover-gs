import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";

// Related panel is derived from the page's own links ("Land Rover Defender Td5 Engine" ->
// model "Defender"), so every variant page labels it with its own model automatically.
const stripBrand = (label) => label.replace(/^Land Rover\s+/i, "");
function relatedModel(links) {
  const counts = {};
  for (const l of links) {
    const words = stripBrand(l.label || l).replace(/\s+Engines?$/i, "").split(/\s+/);
    if (words.length < 2) continue;
    const model = words.slice(0, -1).join(" ");
    counts[model] = (counts[model] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

export default function VariantSec12({ data }) {
  const { yearBanner, costs, related, bottomInfo } = data;
  const model = relatedModel(related.links);
  const relatedTitle = model ? `Related Land Rover ${model} Variants` : related.title;
  const viewAllLabel = model && related.viewAllHref !== "/models" ? `View All Land Rover ${model} Engines` : related.viewAll;

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-10 pt-7 md:hidden">
        <div className="glass-card rounded-2xl p-4">
          <p className="font-title max-w-[85%] text-base font-bold uppercase leading-snug text-[#101828]">
            {yearBanner.titlePre}
            <span className="text-hero-blue">{yearBanner.titleHighlight}</span>
            {yearBanner.titlePost}
          </p>
          <div className="mt-3 overflow-hidden">
          <div className="-ml-[13px] flex flex-wrap gap-y-2">
            {yearBanner.years.map((y) => (
              <div key={y} className="flex items-center gap-1.5 border-l border-black/10 pl-3 pr-1">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black">
                  <Icon name="check" className="h-4 w-4 text-[#9fb08c]" />
                </span>
                <p className="text-xs leading-tight text-[#101828]">
                  {yearBanner.vehicleLabel ? <>{yearBanner.vehicleLabel} <br /> </> : null}
                  {y} Engine Rebuild
                </p>
              </div>
            ))}
          </div>
          </div>
          <p className="mt-3 border-t border-black/10 pt-3 text-xs leading-snug text-[#101828]">{yearBanner.footer}</p>
        </div>

        <div className="theme-dark relative mt-4 overflow-hidden rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <p className="font-title whitespace-nowrap text-lg font-bold uppercase leading-snug">
              <span className="text-white">{costs.titlePre}</span>
              <span className="text-[#c9a96e]">{costs.titleHighlight}</span>
            </p>
          </div>

          <p className="mt-2 text-xs text-white">{costs.intro}</p>
          <p className="w-fit text-3xl font-extrabold bg-linear-to-b from-[#ecd59b] via-[#c9a96e] to-[#9c7d45] bg-clip-text text-transparent">{costs.price}</p>
          <p className="mt-2 text-xs leading-snug text-white">{costs.body}</p>

          <div className="relative mt-3 flex items-center justify-center gap-4">
            <div className="relative h-44 w-60">
              <Image src={costs.image} alt="Land Rover engine" fill className="object-contain" sizes="240px" />
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Icon
                name="shield-check"
                className="h-11 w-11 shrink-0 text-[#c9a96e]"
                style={{ filter: "drop-shadow(0 0 10px rgba(201,169,110,0.55))" }}
              />
              <p className="text-xs font-extrabold leading-snug text-white">{costs.warranty.line1}</p>
              <p className="label-text leading-snug text-white">{costs.warranty.line2}</p>
              <p className="label-text leading-snug text-white">{costs.warranty.line3}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {costs.subCards.map((c) => (
              <div key={c.title} className="glass-card-dark rounded-xl p-3 text-center" style={{ borderColor: "rgba(201,169,110,0.4)" }}>
                <Icon name={c.icon} className="mx-auto block h-9 w-9 shrink-0 text-[#c9a96e]" />
                <p className="label-text mt-1.5 font-extrabold uppercase leading-tight text-white">{c.title}</p>
                <p className="label-text mt-1 text-white">• {c.item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card mt-4 rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <Icon name="link" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="text-xs font-extrabold uppercase tracking-wide text-[#101828]">{relatedTitle}</p>
          </div>
          <div className="mt-3 divide-y divide-black/10">
            {related.links.map((l) => (
              <Link key={l.label || l} href={l.href || "#"} className="flex items-center justify-between py-2.5 text-xs font-semibold text-[#101828]">
                {stripBrand(l.label || l)} <span aria-hidden className="text-hero-blue">→</span>
              </Link>
            ))}
          </div>
          <a
            href={related.viewAllHref}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-xs font-bold text-hero-blue transition-colors hover:bg-(--theme-light-bg)"
          >
            <span aria-hidden>→</span> {viewAllLabel}
          </a>
        </div>

        <div className="glass-card relative mt-4 overflow-hidden rounded-2xl">
          <div className="grid grid-cols-2 divide-x divide-black/10">
            <div className="flex items-start gap-2 p-4 pr-3">
              <Icon name={bottomInfo.timeframe.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
              <p className="text-xs leading-snug text-[#101828]">
                {bottomInfo.timeframe.textPre}
                <span className="font-bold text-hero-blue">{bottomInfo.timeframe.textHighlight}</span>
                {bottomInfo.timeframe.textPost}
              </p>
            </div>
            <div className="p-4 pl-3">
              <p className="text-xs leading-snug text-[#101828]">{bottomInfo.recoveryText}</p>
            </div>
          </div>
          <div className="relative h-28 w-full border-t border-black/10">
            <Image src={bottomInfo.image} alt="Land Rover vehicle recovery and collection" fill className="object-contain p-3" sizes="100vw" />
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="glass-card rounded-2xl p-6">
            <p className="font-title text-2xl font-bold uppercase leading-snug text-[#101828]">
              {yearBanner.titlePre}
              <span className="text-hero-blue">{yearBanner.titleHighlight}</span>
              {yearBanner.titlePost}
            </p>
            {/* thin dividers between items: every item has a left border, and the grid is pulled
                left by (padding + 1px) inside a clipping wrapper so the first column's border is hidden */}
            <div className="mt-4 overflow-hidden">
            <div className="-ml-[17px] grid grid-cols-[repeat(auto-fill,minmax(10.5rem,1fr))] gap-y-4">
              {yearBanner.years.map((y) => (
                <div key={y} className="flex items-center gap-2 border-l border-black/10 pl-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black">
                    <Icon name="check" className="h-4 w-4 text-[#9fb08c]" />
                  </span>
                  <p className="text-sm leading-tight text-[#101828]">
                    <span className="font-bold">{y}</span> <br /> Engine Rebuild
                  </p>
                </div>
              ))}
            </div>
            </div>
            <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-snug text-[#101828]">{yearBanner.footer}</p>
          </div>

          <div className="mt-6 grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-stretch gap-6">
            <div className="theme-dark relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-8">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center gap-8">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-title whitespace-nowrap text-2xl font-bold uppercase leading-snug">
                      <span className="text-white">{costs.titlePre}</span>
                      <span className="text-[#c9a96e]">{costs.titleHighlight}</span>
                    </p>
                  </div>
                  <p className="mt-4 text-base text-white">{costs.intro}</p>
                  <p className="w-fit text-7xl font-extrabold bg-linear-to-b from-[#ecd59b] via-[#c9a96e] to-[#9c7d45] bg-clip-text text-transparent">{costs.price}</p>
                  <p className="mt-4 text-base leading-relaxed text-white">{costs.body}</p>
                </div>

                <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
                  <div className="relative h-52 w-56 shrink-0">
                    <Image src={costs.image} alt="Land Rover engine" fill className="object-contain" sizes="224px" />
                  </div>
                  <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                    <Icon
                      name="shield-check"
                      className="h-16 w-16 shrink-0 text-[#c9a96e]"
                      style={{ filter: "drop-shadow(0 0 14px rgba(201,169,110,0.55))" }}
                    />
                    <p className="text-base font-extrabold leading-snug text-white">{costs.warranty.line1}</p>
                    <p className="text-sm leading-snug text-white">{costs.warranty.line2}</p>
                    <p className="text-sm leading-snug text-white">{costs.warranty.line3}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5">
                {costs.subCards.map((c) => (
                  <div key={c.title} className="glass-card-dark flex items-start gap-3.5 rounded-xl p-5" style={{ borderColor: "rgba(201,169,110,0.4)" }}>
                    <Icon name={c.icon} className="h-11 w-11 shrink-0 text-[#c9a96e]" />
                    <div className="min-w-0">
                      <p className="text-base font-extrabold uppercase text-white">{c.title}</p>
                      <p className="mt-2 text-sm text-white">• {c.item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Icon name="link" className="h-7 w-7 shrink-0 text-hero-blue" />
                <p className="text-lg font-extrabold uppercase leading-snug tracking-wide text-[#101828]">{relatedTitle}</p>
              </div>
              <div className="mt-4 divide-y divide-black/10">
                {related.links.map((l) => (
                  <Link key={l.label || l} href={l.href || "#"} className="flex items-center justify-between gap-3 py-3 text-sm font-semibold text-[#101828] transition-colors hover:text-hero-blue">
                    {stripBrand(l.label || l)} <span aria-hidden className="text-hero-blue">→</span>
                  </Link>
                ))}
              </div>
              <a
                href={related.viewAllHref}
                className="mt-4 flex items-center gap-3 rounded-lg border border-[#101828]/70 bg-white/60 px-5 py-3.5 text-sm font-bold text-[#101828] transition-colors hover:bg-white"
              >
                <span aria-hidden>→</span> {viewAllLabel}
              </a>
            </div>
          </div>

          <div className="glass-card relative mt-6 grid grid-cols-[1fr_1fr_auto] items-center overflow-hidden rounded-2xl">
            <div className="flex items-center gap-3 border-r border-black/10 px-6 py-5">
              <Icon name={bottomInfo.timeframe.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
              <p className="text-sm leading-snug text-[#101828]">
                {bottomInfo.timeframe.textPre}
                <span className="font-bold text-hero-blue">{bottomInfo.timeframe.textHighlight}</span>
                {bottomInfo.timeframe.textPost}
              </p>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-snug text-[#101828]">{bottomInfo.recoveryText}</p>
            </div>
            <div className="relative h-24 w-48 shrink-0">
              <Image src={bottomInfo.image} alt="Land Rover vehicle recovery and collection" fill className="object-contain" sizes="192px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
