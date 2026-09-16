import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function ModelSec3({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="theme-dark relative md:hidden">
        <div className="relative h-72 w-full overflow-hidden">
          {/* solid dark header band reserved for the title — the car in this photo fills the
              frame from the very top with no headroom of its own, so the photo is pinned to
              the bottom of a taller box instead of the whole box, keeping the car clear of the
              title instead of overlapping it */}
          <div className="absolute inset-x-0 bottom-0 top-16">
            <Image src={data.imageMobile} alt="Land Rover C-Class in a dark Land Rover service workshop" fill className="object-cover object-top" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-b from-hero-dark/50 via-transparent to-hero-dark" />
          </div>

          <div className="relative px-4 pt-6">
            <div className="flex items-center gap-2">
              <LandRoverStripe className="h-4 w-8" />
              <p className="label-text uppercase tracking-widest text-white">{data.kicker}</p>
            </div>

            <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>
          </div>
        </div>

        <div className="relative px-4 pb-8 pt-4">
          <p className="label-text inline-block uppercase tracking-widest text-white">
            {data.startingFromLabel}
            <span
              className="mt-2 block h-0.5 w-full rounded-full bg-hero-blue"
              style={{ boxShadow: "0 0 14px rgba(173,135,92,0.55), 0 0 26px rgba(173,135,92,0.35)" }}
            />
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {data.cards.map((c) => (
              <div
                key={c.titlePre}
                className={`card-corner-glare relative rounded-xl border p-3 ${
                  c.featured ? "border-hero-blue/50 bg-(--color-light-surface)" : "border-hero-blue/30 bg-[#12100a]"
                }`}
              >
                {c.featured && (
                  <div className="mb-1.5 flex items-center gap-1">
                    <LandRoverStripe className="h-3 w-6" />
                    <span className="text-sm font-black italic text-[#101828]">M</span>
                  </div>
                )}

                <div className="flex items-center gap-2.5">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={data.cardImage} alt={`${c.titlePre} ${c.titleHighlight}`} fill className="object-contain" sizes="56px" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`label-text truncate font-extrabold uppercase leading-tight ${c.featured ? "text-[#101828]" : "text-white"}`}>
                      {c.titlePre}
                    </p>
                    <p className="label-text truncate font-extrabold uppercase leading-tight text-hero-blue">{c.titleHighlight}</p>
                    {c.code && (
                      c.codeHref ? (
                        <Link href={c.codeHref} className={`label-text block truncate uppercase ${c.featured ? "text-[#101828]" : "text-white"}`}>{c.code}</Link>
                      ) : (
                        <p className={`label-text truncate uppercase ${c.featured ? "text-[#101828]" : "text-white"}`}>{c.code}</p>
                      )
                    )}

                    <div className="mt-1.5">
                      <p className={`label-text font-semibold uppercase tracking-widest ${c.featured ? "text-[#101828]" : "text-white"}`}>
                        From
                      </p>
                      <p className={`text-lg font-extrabold ${c.featured ? "text-[#101828]" : "text-white"}`}>{c.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="glass-card-dark mt-4 flex items-center gap-2 rounded-xl border border-hero-blue/30 px-4 py-3 text-xs text-white">
            <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
            {data.disclaimer}
          </p>

          <div className="glass-card-dark card-corner-glare relative mt-4 rounded-xl border border-hero-blue/50 p-4">
            <div className="flex items-center gap-3">
              <Icon name="clock" className="h-8 w-8 shrink-0 text-hero-blue" />
              <p className="text-sm font-extrabold uppercase leading-tight text-white">
                <span className="block">{data.cta.line1}</span>
                <span className="block">{data.cta.line2}</span>
              </p>
            </div>

            <a
              href={data.cta.href}
              className="mt-4 flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
              style={{
                background: "linear-gradient(135deg, var(--color-hero-gold) 0%, #8c6c46 100%)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {data.cta.buttonLabel} <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Land Rover C-Class in a dark Land Rover service workshop" fill className="object-cover object-[65%_30%]" sizes="100vw" />
        <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/75 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <LandRoverStripe className="h-4.5 w-9" />
          <p className="label-text uppercase tracking-widest text-white">{data.kicker}</p>
        </div>

        <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-3 uppercase">
          <span className="block text-white">{line1}</span>
          <span className="block text-hero-blue">{line2}</span>
        </h2>

        <p className="mt-4 label-text inline-block uppercase tracking-widest text-white">
          {data.startingFromLabel}
          <span
            className="mt-2 block h-0.5 w-full rounded-full bg-hero-blue"
            style={{ boxShadow: "0 0 14px rgba(173,135,92,0.55), 0 0 26px rgba(173,135,92,0.35)" }}
          />
        </p>

        <div className="mt-5 grid max-w-3xl grid-cols-4 gap-4">
          {data.cards.map((c) => (
            <div
              key={c.titlePre}
              className={
                c.featured
                  ? "card-corner-glare relative rounded-xl border border-hero-blue/50 bg-(--color-light-surface) pb-4 pt-3"
                  : "card-corner-glare relative rounded-xl border border-hero-blue/50 bg-[#12100a] pb-4 pt-3"
              }
            >
              {c.featured ? (
                <div className="mb-1 flex items-center justify-center gap-0.5">
                  <LandRoverStripe className="h-4 w-8" />
                  <span className="text-lg font-black italic text-[#101828]">M</span>
                </div>
              ) : null}

              <div className="relative mx-auto h-28 w-full overflow-hidden">
                <Image src={data.cardImage} alt={`${c.titlePre} ${c.titleHighlight}`} fill className="object-contain" sizes="160px" />
              </div>

              <p className={`mt-2 px-3 text-center text-sm font-extrabold uppercase leading-tight ${c.featured ? "text-[#101828]" : "text-white"}`}>
                {c.titlePre} <span className="text-hero-blue">{c.titleHighlight}</span>
              </p>
              {c.code && (
                c.codeHref ? (
                  <Link href={c.codeHref} className={`block px-3 text-center text-xs uppercase ${c.featured ? "text-[#101828]" : "text-white"}`}>{c.code}</Link>
                ) : (
                  <p className={`px-3 text-center text-xs uppercase ${c.featured ? "text-[#101828]" : "text-white"}`}>{c.code}</p>
                )
              )}

              <div className="mx-3 mt-3 text-center">
                <p className={`label-text font-semibold uppercase tracking-widest ${c.featured ? "text-[#101828]" : "text-white"}`}>
                  From
                </p>
                <p className={`text-2xl font-extrabold ${c.featured ? "text-[#101828]" : "text-white"}`}>{c.price}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 flex max-w-3xl items-center gap-2 text-xs text-white">
          <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
          {data.disclaimer}
        </p>

        <div className="glass-card-dark card-corner-glare relative mt-6 flex max-w-3xl items-center justify-between gap-6 rounded-xl border border-hero-blue/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <Icon name="clock" className="h-9 w-9 shrink-0 text-hero-blue" />
            <p className="text-sm font-extrabold uppercase leading-tight text-white">
              <span className="block">{data.cta.line1}</span>
              <span className="block">{data.cta.line2}</span>
            </p>
          </div>

          <a
            href={data.cta.href}
            className="btn-text inline-flex shrink-0 items-center gap-2 rounded-sm border-2 border-hero-blue bg-hero-blue px-6 py-3 text-white transition-colors hover:bg-transparent hover:text-hero-blue"
          >
            {data.cta.buttonLabel} →
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
