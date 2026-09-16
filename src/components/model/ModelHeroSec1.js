import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function ModelHeroSec1({ data }) {
  const [line1, line2, line3] = data.h1.split("|");

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="Land Rover technician rebuilding an engine block" fill priority className="object-cover object-top" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-hero-dark/15 to-hero-dark" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark/75 via-hero-dark/20 to-transparent" />
        </div>

        <div className="relative px-4 pb-4 pt-4">
          <div className="max-w-[85%]">
            <div className="flex items-center gap-2">
              <LandRoverStripe className="h-4 w-8" />
              <p className="label-text uppercase tracking-widest text-white">{data.kicker}</p>
            </div>

            <h1 className="h1 origin-left scale-y-110 scale-x-90 mt-1.5 uppercase">
              <span className="block whitespace-nowrap text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>

            <p className="mt-1.5 text-xs leading-snug text-white">{data.subhead}</p>

            <div className="glass-card-dark mt-2 flex items-center gap-2 rounded-lg px-3 py-1.5">
              <div className="flex shrink-0 gap-0.5 text-[var(--color-hero-gold)]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3 w-3 fill-current" />
                ))}
              </div>
              <p className="label-text uppercase leading-tight text-white">{data.rating.label}</p>
            </div>
          </div>

          {/* five-column feature breakdown */}
          <div
            className="glass-luminous card-glare relative mt-2.5 grid grid-cols-5 divide-x divide-white/15 rounded-xl px-1 py-2.5"
            style={{ border: "1px solid rgba(173,135,92,0.45)" }}
          >
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-1 px-1 text-center">
                <Icon name={t.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-[8px] font-medium leading-tight text-white">{t.label}</p>
              </div>
            ))}
          </div>

          {/* pricing callout banner */}
          <a
            href={data.priceCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center divide-x divide-white/15 rounded-xl px-2 py-3"
            style={{ border: "1px solid rgba(173,135,92,0.45)" }}
          >
            <div className="flex shrink-0 items-center gap-2 pr-2">
              <Icon name={data.priceCta.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
              <div>
                <p className="label-text whitespace-nowrap uppercase tracking-wide text-white">{data.priceCta.kicker}</p>
                <p className="whitespace-nowrap text-lg font-extrabold text-white">{data.priceCta.price}</p>
              </div>
            </div>
            <p className="min-w-0 flex-1 whitespace-nowrap pl-2 text-[10px] font-bold uppercase leading-tight text-hero-blue">{data.priceCta.label}</p>
          </a>

          {/* registration lookup */}
          <div className="glass-card-dark mt-2.5 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Icon name="car" className="h-5 w-5 shrink-0 text-hero-blue" />
              <p className="text-sm font-extrabold uppercase tracking-wide text-white">{data.quickQuote.title}</p>
            </div>
            <p className="mt-1 text-xs text-white">{data.quickQuote.subhead}</p>

            <div className="mt-2">
              <RegLookupForm buttonLabel="Check Match" row compactButton hideArrow short />
            </div>

            <div className="mt-2 flex items-center gap-1.5">
              <Icon name="lock" className="h-3.5 w-3.5 shrink-0 text-white" />
              <p className="label-text text-white">{data.quickQuote.securityNote}</p>
            </div>
          </div>

          {/* direct contact CTA */}
          <a
            href={data.phoneCta.href}
            className="glass-luminous card-glare relative mt-2.5 flex items-center gap-3 rounded-xl p-3"
            style={{ border: "1px solid rgba(173,135,92,0.45)" }}
          >
            <div
              className="pointer-events-none absolute bottom-0 right-0 h-full"
              style={{
                width: "90px",
                background:
                  "linear-gradient(135deg, transparent 0%, transparent 55%, var(--color-bmw-blue) 55%, var(--color-bmw-blue) 68%, var(--color-bmw-violet) 68%, var(--color-bmw-violet) 78%, var(--color-bmw-red) 78%, var(--color-bmw-red) 88%, transparent 88%, transparent 100%)",
              }}
              aria-hidden="true"
            />
            <Icon name={data.phoneCta.icon} className="relative h-7 w-7 shrink-0 text-hero-blue" />
            <div className="relative">
              <p className="label-text uppercase tracking-wide text-white">{data.phoneCta.label}</p>
              <p className="text-lg font-extrabold text-white">{data.phoneCta.phone}</p>
            </div>
          </a>

          {/* trust footer */}
          <div
            className="glass-luminous card-glare relative mt-2.5 flex items-center justify-center gap-2 rounded-lg px-3 py-2"
            style={{ border: "1px solid rgba(173,135,92,0.45)" }}
          >
            <Icon name="shield-check" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="label-text font-medium text-white">{data.trustFooter}</p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 py-8 sm:px-6 md:block lg:px-8">
        <div className="absolute inset-0">
          <Image src={data.image} alt="Land Rover technician rebuilding an engine block" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <LandRoverStripe className="h-4.5 w-9" />
              <p className="label-text uppercase tracking-widest text-white">{data.kicker}</p>
            </div>

            <h1 className="h1 origin-left scale-y-110 scale-x-90 mt-3 uppercase">
              <span className="block whitespace-nowrap text-white">{line1}</span>
              <span className="block whitespace-nowrap text-hero-blue">{line2}</span>
              <span className="block text-white">{line3}</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm text-white">{data.subhead}</p>

            <div className="glass-luminous card-glare relative mt-3 inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5">
              <div className="flex shrink-0 gap-0.5 text-[var(--color-hero-gold)]">
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="label-text uppercase leading-tight text-white">{data.rating.label}</p>
            </div>

            {/* reg lookup */}
            <div className="mt-3 max-w-md">
              <RegLookupForm buttonLabel="Look Up" row />
            </div>
          </div>

          {/* trust bar spans the full width of the hero content column, not just the
              max-w-3xl text block above it */}
          <div
            className="card-glare relative mt-3 flex items-stretch justify-between divide-x divide-white/15 rounded-xl px-6 py-5 backdrop-blur-md"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.02) 100%)" }}
          >
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex flex-1 items-center gap-4 px-5">
                <Icon name={t.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                <p className="text-sm leading-tight font-medium text-white">{t.label}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl">

            <div className="mt-3 flex flex-wrap items-stretch gap-4">
              <a
                href={data.priceCta.href}
                className="card-glare relative flex w-80 shrink-0 flex-col justify-between rounded-xl px-8 py-5 transition-transform hover:scale-[1.02]"
                style={{ background: "#CCBBAB" }}
              >
                <div className="flex items-center gap-4">
                  <Icon name={data.priceCta.icon} className="h-14 w-14 shrink-0" style={{ color: "#8A663D" }} />
                  <div>
                    <p className="text-sm font-semibold uppercase leading-snug tracking-wide text-black">{data.priceCta.kicker}</p>
                    <p className="mt-1 text-4xl font-extrabold italic leading-none text-black">{data.priceCta.price}</p>
                  </div>
                </div>
                <p className="mt-2 pl-4 text-sm font-bold uppercase leading-tight text-black">{data.priceCta.label}</p>
              </a>

              <a
                href={data.phoneCta.href}
                className="glass-luminous card-glare relative flex w-80 shrink-0 flex-col justify-center rounded-xl px-8 py-5 transition-colors hover:bg-white/5"
              >
                <div
                  className="pointer-events-none absolute bottom-0 right-0 h-full"
                  style={{
                    width: "140px",
                    background:
                      "linear-gradient(135deg, transparent 0%, transparent 62%, var(--color-bmw-blue) 62%, var(--color-bmw-blue) 68%, var(--color-bmw-violet) 68%, var(--color-bmw-violet) 74%, var(--color-bmw-red) 74%, var(--color-bmw-red) 80%, transparent 80%, transparent 100%)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-4">
                  <Icon name={data.phoneCta.icon} className="h-14 w-14 shrink-0 text-hero-blue" />
                  <div>
                    <p className="text-sm font-semibold uppercase leading-snug tracking-wide text-white">{data.phoneCta.label}</p>
                    <p className="mt-1 whitespace-nowrap text-2xl font-extrabold leading-none text-white">{data.phoneCta.phone}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
