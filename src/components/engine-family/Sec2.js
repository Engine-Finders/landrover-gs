import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function Sec2({ data }) {
  const { specs, price } = data;

  return (
    <section className="theme-light relative overflow-hidden pt-3">
      {/* ===== mobile ===== */}
      <div className="relative space-y-2 md:hidden">
        {/* specifications */}
        <div className="relative overflow-hidden">
          <div className="relative h-44 w-full overflow-hidden">
            <Image src={specs.imageMobile} alt="Land Rover engine" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 45%, var(--theme-light-bg) 100%)" }}
            />
          </div>

          <div className="relative px-4 pb-7">
            <h2 className="h2 uppercase">
              <span className="flex items-center gap-3 whitespace-nowrap text-[#101828]">
                <LandRoverStripe className="h-6 w-12 shrink-0" />
                the engine
              </span>
              <span className="mt-1 block text-hero-blue">{specs.titleHighlight}</span>
            </h2>

            <div className="relative mt-3 divide-y divide-black/8 rounded-xl bg-white px-4 shadow-sm">
              {specs.rows.map((r) => (
                <div key={r.label} className="flex items-center gap-3 py-3">
                  <Icon name={r.icon} className="h-5 w-5 shrink-0 text-[#101828]" />
                  <p className="w-28 shrink-0 text-xs font-bold text-[#101828]">{r.label}</p>
                  <p className="min-w-0 flex-1 text-xs leading-snug text-[#101828]">{r.value}</p>
                </div>
              ))}
            </div>

            <div
              className="-mx-1.5 mt-3 flex items-center gap-3 rounded-xl border border-[#607056]/35 bg-white p-3"
              style={{ boxShadow: "0 4px 16px -6px rgba(0,0,0,0.12)" }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hero-blue bg-white">
                <Icon name={specs.prompt.icon} className="h-4 w-4 text-hero-blue" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#101828]">{specs.prompt.titlePre}</p>
                <p className="text-[11px] text-[#101828]">{specs.prompt.subtext}</p>
              </div>
            </div>
            <a
              href={specs.prompt.href}
              className="mt-2.5 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-3 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {specs.prompt.buttonLabel}
            </a>
          </div>
        </div>

        {/* rebuild price */}
        <div className="relative overflow-hidden bg-white">
          <div className="relative px-4 pt-7">
            <h2 className="h2 uppercase">
              <span className="flex items-center gap-3 whitespace-nowrap text-[#101828]">
                <LandRoverStripe className="h-6 w-12 shrink-0" />
                the engine
              </span>
              <span className="mt-1 block text-hero-blue" style={{ paddingLeft: "60px" }}>{price.titleHighlight}</span>
            </h2>
          </div>

          <div className="relative mt-4 aspect-4/3 w-full overflow-hidden">
            <Image src={price.imageMobile} alt="Land Rover engine components" fill className="object-cover" sizes="100vw" />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-10"
              style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 100%)" }}
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
              style={{ background: "linear-gradient(to top, #fff 0%, transparent 100%)" }}
            />
          </div>

          <div className="relative px-4 pb-7">
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#101828]">{price.startingFromLabel}</p>
            <span className="mt-1 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
            <p className="mt-1 text-4xl font-extrabold text-hero-blue">{price.startingFromPrice}</p>
            <p className="mt-2 text-xs leading-snug text-[#101828]">{price.body}</p>

            <a
              href={price.cta.href}
              className="mx-auto mt-3 flex w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-3 py-3 text-xs font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              {price.cta.label}
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden space-y-3 md:block">
        {/* specifications — floating white card over a full-bleed workshop photo */}
        <div className="relative overflow-hidden bg-[#0d0d0d] px-6 py-6">
          <div className="absolute inset-0">
            <Image src={specs.image} alt="Land Rover engine" fill className="object-cover" sizes="100vw" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl bg-white px-8 py-8 shadow-2xl" style={{ maxWidth: "58%" }}>
              <h2 className="h2 uppercase">
                <span className="flex items-center gap-3 whitespace-nowrap text-[#101828]">
                  <LandRoverStripe className="h-10 w-16 shrink-0" />
                  the engine
                </span>
                <span className="mt-1 block text-hero-blue">{specs.titleHighlight}</span>
              </h2>

              <div className="relative mt-6 divide-y divide-black/8">
                <span className="pointer-events-none absolute bottom-0 top-0 w-px bg-black/10" style={{ left: "196px" }} aria-hidden="true" />
                {specs.rows.map((r) => (
                  <div key={r.label} className="flex items-center gap-4 py-3.5">
                    <Icon name={r.icon} className="h-5 w-5 shrink-0 text-[#101828]" />
                    <p className="w-40 shrink-0 text-sm font-bold text-[#101828]">{r.label}</p>
                    <p className="min-w-0 flex-1 pl-4 text-sm leading-snug text-[#101828]">{r.value}</p>
                  </div>
                ))}
              </div>

              <div
                className="-mx-3 mt-4 flex items-center gap-4 rounded-2xl border border-[#607056]/35 bg-white p-4"
                style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)" }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hero-blue bg-white">
                  <Icon name={specs.prompt.icon} className="h-5 w-5 text-hero-blue" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#101828]">{specs.prompt.titlePre}</p>
                  <p className="text-xs text-[#101828]">{specs.prompt.subtext}</p>
                </div>
                <a
                  href={specs.prompt.href}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  {specs.prompt.buttonLabel}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* rebuild price — full-bleed photo (built-in empty portion on the left for text) */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={price.image} alt="Land Rover engine components" fill className="object-cover" sizes="100vw" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(90deg, #fff 0%, #fff 42%, rgba(255,255,255,0.9) 55%, rgba(255,255,255,0.35) 68%, transparent 82%)" }}
              aria-hidden="true"
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <h2 className="h2 uppercase">
                <span className="flex items-center gap-3 whitespace-nowrap text-[#101828]">
                  <LandRoverStripe className="h-10 w-16 shrink-0" />
                  the engine
                </span>
                <span className="mt-1 block text-hero-blue" style={{ paddingLeft: "76px" }}>{price.titleHighlight}</span>
              </h2>

              <div className="mt-6 flex items-center gap-3">
                <p className="text-sm font-bold uppercase tracking-wide text-[#101828]">{price.startingFromLabel}</p>
                <span className="h-0.5 w-10 bg-[#101828]/30" />
              </div>
              <p className="text-6xl font-extrabold text-hero-blue">{price.startingFromPrice}</p>
              <p className="mt-4 text-sm leading-relaxed text-[#101828]">{price.body}</p>

              <a
                href={price.cta.href}
                className="mt-6 flex w-fit items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-4 py-4 text-sm font-bold uppercase text-white shadow-lg transition-transform hover:scale-[1.02]"
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
