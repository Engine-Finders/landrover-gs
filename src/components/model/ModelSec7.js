import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function ModelSec7({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-10 md:hidden">
        <div className="flex items-center gap-2">
          <LandRoverStripe className="h-6 w-12" />
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="text-[#101828]">Our </span>
            <span className="text-hero-blue">Workshop</span>
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {data.cards.map((c) => (
            <div
              key={c.number}
              className="flex flex-col overflow-hidden rounded-md bg-(--color-light-surface) shadow-[0_10px_25px_-8px_rgba(0,0,0,0.35)]"
              style={{ aspectRatio: "1" }}
            >
              <div className="relative flex-1 overflow-hidden">
                <Image src={c.image} alt={c.title} fill className="object-cover" sizes="50vw" />
                <span
                  className="absolute left-0 top-0 flex h-7 w-9 items-center justify-center bg-hero-blue text-[10px] font-extrabold text-white"
                  style={{ clipPath: "path('M0 0H24Q32 0 32 8L36 28L0 28Z')" }}
                >
                  {c.number}
                </span>
              </div>
              <div
                className="flex shrink-0 items-center justify-center px-2 py-3"
                style={{ background: "var(--theme-light-bg)" }}
              >
                <p className="label-text text-center font-extrabold uppercase leading-tight tracking-wide text-black">{c.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <Link href="/land-rover-inside-our-workshop" className="btn-text flex items-center gap-2 rounded-lg border-2 border-hero-blue bg-white/70 px-5 py-2.5 uppercase text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
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

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-center gap-2.5">
          <LandRoverStripe className="h-10 w-16" />
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="text-[#101828]">Our </span>
            <span className="text-hero-blue">Workshop</span>
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-4">
          {data.cards.map((c) => (
            <div
              key={c.number}
              className="flex flex-col overflow-hidden rounded-xl bg-(--color-light-surface) shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)]"
              style={{ aspectRatio: "1" }}
            >
              <div className="relative flex-1 overflow-hidden">
                <Image src={c.image} alt={c.title} fill className="object-cover" sizes="20vw" />
                <span
                  className="absolute bottom-0 left-0 flex h-9 w-11 items-center justify-center bg-hero-blue text-xs font-extrabold text-white"
                  style={{ clipPath: "path('M0 0H30Q40 0 40 10L44 36L0 36Z')" }}
                >
                  {c.number}
                </span>
              </div>
              <div className="shrink-0 px-2 py-3" style={{ background: "var(--theme-light-bg)" }}>
                <p className="label-text text-center font-extrabold uppercase leading-tight tracking-wide text-black">
                  {c.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/land-rover-inside-our-workshop" className="btn-text flex items-center gap-2 rounded-md border-2 border-hero-blue bg-white/70 px-6 py-2.5 uppercase text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
            {data.viewMoreLabel} <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="relative mt-6 flex items-center justify-between overflow-hidden border-t border-black/10 pt-5">
          <div className="flex items-center gap-2">
            <Icon name="camera" className="h-5 w-5 shrink-0 text-[#101828]" />
            <p className="text-xs text-[#101828]">{data.footerNote}</p>
          </div>
          <div
            className="pointer-events-none absolute bottom-0 right-0 z-10 flex gap-1.5"
            style={{ height: "50px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
            aria-hidden="true"
          >
            <span className="h-full w-3.5" style={{ background: "var(--color-bmw-blue)" }} />
            <span className="h-full w-3.5" style={{ background: "var(--color-bmw-violet)" }} />
            <span className="h-full w-3.5" style={{ background: "var(--color-bmw-red)" }} />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
