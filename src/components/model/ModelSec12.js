import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

const mobileCardIndices = [0, 1, 2, 3, 4, 5, 6, 9];

export default function ModelSec12({ data }) {
  const mobileCards = mobileCardIndices.map((i) => data.cards[i]);

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div
          className="pointer-events-none absolute right-0 top-0 h-72 w-72"
          style={{ background: "radial-gradient(ellipse at top right, rgba(96,112,86,0.45) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="relative px-4 py-10">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block text-[#101828]">{data.headlinePre}</span>
            <span className="block text-hero-blue">{data.headlineHighlight}</span>
          </h2>
          <LandRoverStripe className="mt-3 h-3 w-6" />
          <p className="body-text mt-3 text-[#101828]">{data.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {mobileCards.map((c, i) => (
              <div key={`${c.model}-${i}`} className="neon-card relative rounded-xl">
                <div className="relative aspect-[4/3]">
                  <Image src={data.image} alt={c.model} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="px-3 py-2" style={{ background: "rgba(5,12,28,0.9)" }}>
                  <div className="flex items-center gap-1.5">
                    <Icon name={c.icon} className="h-4 w-4 shrink-0 text-[#607056]" />
                    <p className="truncate text-xs font-extrabold uppercase text-white">
                      {c.href ? <Link href={c.href}>{c.model}</Link> : c.model}
                    </p>
                  </div>
                  <p className="label-text mt-0.5 truncate uppercase tracking-wide text-white">{c.tag}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <Link href="/land-rover-before-after-rebuilds" className="btn-text flex items-center gap-2 rounded-lg border-2 border-hero-blue bg-white/70 px-5 py-2.5 uppercase text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
              {data.viewMoreLabel} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative mt-5 flex items-center gap-3 overflow-hidden rounded-xl border border-black/10 bg-white/60 px-4 py-3.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue text-white">
              <Icon name="camera" className="h-4 w-4" />
            </span>
            <p className="relative z-10 text-xs text-[#101828]">{data.footerNote}</p>

            <div
              className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1"
              style={{ height: "40px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
              aria-hidden="true"
            >
              <span className="h-full w-3" style={{ background: "var(--color-bmw-blue)" }} />
              <span className="h-full w-3" style={{ background: "var(--color-bmw-violet)" }} />
              <span className="h-full w-3" style={{ background: "var(--color-bmw-red)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-xl"
        style={{ background: "radial-gradient(ellipse at top right, rgba(96,112,86,0.55) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-hero-blue/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="max-w-xl">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block whitespace-nowrap text-[#101828]">{data.headlinePre}</span>
            <span className="block whitespace-nowrap text-hero-blue">{data.headlineHighlight}</span>
          </h2>
          <p className="body-text mt-3 text-[#101828]">{data.description}</p>
        </div>

        {/* 6x2 card grid */}
        <div className="mt-5 grid grid-cols-6 gap-4">
          {data.cards.map((c, i) => (
            <div key={`${c.model}-${i}`} className="neon-card relative rounded-xl">
              <div className="relative aspect-square">
                <Image src={data.image} alt={c.model} fill className="object-cover" sizes="16vw" />
              </div>
              <div className="px-3 py-2.5 backdrop-blur-md" style={{ background: "rgba(5,12,28,0.9)" }}>
                <p className="truncate text-xs font-extrabold uppercase text-white">
                  {c.href ? <Link href={c.href}>{c.model}</Link> : c.model}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <Icon name={c.icon} className="h-3.5 w-3.5 shrink-0 text-[#607056]" />
                  <p className="label-text truncate uppercase tracking-wide text-white">{c.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
