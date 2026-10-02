import Image from "next/image";
import EdgeFade from "@/components/reusable/EdgeFade";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

// "Land Rover 200Tdi" -> brand "Land Rover" + engine code "200Tdi" (code rendered in green)
function splitBrand(titlePre = "") {
  const m = titlePre.match(/^(Land Rover)\s*(.*)$/i);
  return m ? [m[1], m[2]] : ["", titlePre];
}

function Title({ titlePre, titleHighlight, className = "" }) {
  const [brand, code] = splitBrand(titlePre);
  return (
    <h2 className={`h2 uppercase ${className}`}>
      <span className="block text-[#101828] md:whitespace-nowrap">
        {brand && `${brand} `}
        <span className="text-hero-blue">{code}</span>
      </span>
      <span className="block text-[#101828] md:whitespace-nowrap">{titleHighlight}</span>
    </h2>
  );
}

function SpecRows({ rows, compact = false }) {
  return (
    <div className="glass-card relative divide-y divide-black/8 overflow-hidden rounded-xl">
      {rows.map((r) => (
        <div key={r.label} className={`grid items-center ${compact ? "grid-cols-[1.75rem_7rem_minmax(0,1fr)] gap-2 px-3 py-2.5" : "grid-cols-[2.5rem_11rem_minmax(0,1fr)] gap-3 px-5 py-3"}`}>
          <Icon name={r.icon} className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0 text-hero-blue`} />
          <p className={`${compact ? "text-xs" : "text-sm"} font-semibold text-[#101828]`}>{r.label}</p>
          <p className={`${compact ? "text-xs" : "border-l border-black/10 pl-6 text-sm"} min-w-0 leading-snug text-[#101828]`}>{r.value}</p>
        </div>
      ))}
    </div>
  );
}

export default function Sec2({ data }) {
  const { specs, price } = data;

  return (
    <section className="theme-light relative overflow-hidden" style={{ backgroundColor: "#fff" }}>
      {/* ===== mobile ===== */}
      <div className="relative space-y-2 md:hidden">
        {/* specifications */}
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image src={specs.imageMobile} alt="Land Rover engine on a workshop bench" fill className="object-cover object-center" sizes="100vw" />
            <EdgeFade color="#fff" top="h-10" bottom="h-24" />
          </div>

          <div className="relative px-4 pb-7">
            <div className="flex items-center gap-3">
              <LandRoverLogo className="h-8 w-14" />
              <span className="h-10 w-px bg-[#c9a96e]/60" aria-hidden="true" />
              <Title titlePre={specs.titlePre} titleHighlight={specs.titleHighlight} />
            </div>

            <div className="mt-4">
              <SpecRows rows={specs.rows} compact />
            </div>

            <div className="glass-card mt-3 flex items-center gap-3 rounded-xl p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hero-blue/40 bg-white">
                <Icon name={specs.prompt.icon} className="h-4 w-4 text-hero-blue" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#101828]">{specs.prompt.titlePre}</p>
                <p className="text-[11px] text-[#101828]">{specs.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={specs.prompt.href}
              className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {specs.prompt.buttonLabel}
            </a>
          </div>
        </div>

        {/* rebuild price — mercedes mobile pattern: no card; title, edge-to-edge parts photo (sec2_price_mv2:
            photo half of sec2_bottom on pure white, seam removed) with soft top/bottom fades, then copy */}
        <div className="relative pb-7">
          <div className="px-4 pt-5">
            <Title titlePre={price.titlePre} titleHighlight={price.titleHighlight} />
          </div>

          <div className="relative mt-3 aspect-[644/380] w-full overflow-hidden">
            <Image src="/engine/sec2_price_mv2.webp" alt="Land Rover engine block, crankshaft and connecting rods" fill className="object-cover" sizes="100vw" />
            <EdgeFade color="#fff" top="h-8" bottom="h-12" />
          </div>

          <div className="px-4">
            <div className="mt-3 flex items-center gap-3">
              <p className="text-sm text-[#101828]">{price.startingFromLabel}</p>
              <span className="h-px w-10 bg-[#c9a96e]" aria-hidden="true" />
            </div>
            <p className="gold-text text-4xl font-extrabold">{price.startingFromPrice}</p>
            <p className="mt-2 text-xs leading-snug text-[#101828]">{price.body}</p>

            <a
              href={price.cta.href}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {price.cta.label}
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden md:block">
        {/* specifications — sec2.jpg has a clean white left half, so the copy sits straight on the photo */}
        <div className="relative overflow-hidden">
          {/* sec2.jpg is a blank white left half + photo right half with a hard seam at 50%.
              Only the photo half is shown, in a narrower right-hand box (object-right drops the empty
              white half), and its left edge is feathered into the page bg so there's no hard cut. */}
          <div className="absolute inset-y-0 right-0 w-[38%]">
            <Image src={specs.image} alt="Land Rover engine on a workshop bench in front of a Defender" fill className="object-cover object-right" sizes="38vw" />
            <div
              className="absolute inset-y-0 left-0 w-1/3"
              style={{ background: "linear-gradient(to right, #fff 0%, rgba(255,255,255,0.6) 40%, transparent 100%)" }}
              aria-hidden="true"
            />
          </div>

          <div className="relative mx-auto max-w-[76rem] px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-[56%]">
              <div className="flex items-center gap-5">
                <LandRoverLogo className="h-12 w-20" />
                <span className="h-16 w-px bg-[#c9a96e]/60" aria-hidden="true" />
                <Title titlePre={specs.titlePre} titleHighlight={specs.titleHighlight} />
              </div>

              <div className="mt-6">
                <SpecRows rows={specs.rows} />
              </div>

              <div className="glass-card mt-4 flex items-center gap-4 rounded-xl p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-hero-blue/40 bg-white">
                  <Icon name={specs.prompt.icon} className="h-6 w-6 text-hero-blue" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#101828]">{specs.prompt.titlePre}</p>
                  <p className="text-sm text-[#101828]">{specs.prompt.subtext}</p>
                </div>
                <a
                  href={specs.prompt.href}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  {specs.prompt.buttonLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* rebuild price — no card: full-bleed white band, parts photo (sec2_price_bg.webp = photo half of
            sec2_bottom on a pure-white canvas, seam removed) anchored right, copy sits straight on it */}
        <div className="relative overflow-hidden bg-white">
          <div className="absolute inset-0" aria-hidden="true">
            <Image src="/engine/sec2_price_bg.webp" alt="" fill className="object-cover object-right" sizes="100vw" />
          </div>
          <div className="relative mx-auto max-w-[76rem] px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <Title titlePre={price.titlePre} titleHighlight={price.titleHighlight} />

              <div className="mt-5 flex items-center gap-3">
                <p className="text-base text-[#101828]">{price.startingFromLabel}</p>
                <span className="h-px w-12 bg-[#c9a96e]" aria-hidden="true" />
              </div>
              <p className="gold-text text-6xl font-extrabold leading-tight">{price.startingFromPrice}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#101828]">{price.body}</p>

              <a
                href={price.cta.href}
                className="mt-6 flex w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                {price.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
