import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

export default function ModelSec10({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-10 md:hidden">
        <LandRoverLogo className="absolute right-4 top-8 h-14 w-14 opacity-90" />
        <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
          <span className="block text-[#101828]">{data.headlinePre}</span>
          <span className="block text-hero-blue">{data.headlineHighlight}</span>
        </h2>
        <p className="mt-2 text-sm text-[#101828]">{data.subhead}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {data.cards.map((c) => {
            const Wrapper = c.href ? Link : "div";
            const wrapperProps = c.href ? { href: c.href } : {};
            return (
              <Wrapper
                key={c.number}
                {...wrapperProps}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-black/5 bg-(--color-light-surface) shadow-sm"
              >
                <div className="relative aspect-[1536/840] bg-(--color-light-surface)">
                  <Image src={c.image || data.image} alt={c.model} fill className="object-cover" sizes="50vw" />
                  <span
                    className="absolute left-0 top-0 flex h-6 items-center bg-hero-blue px-2.5 text-xs font-bold text-white"
                    style={{ clipPath: "polygon(0 0, 100% 0, 78% 100%, 0% 100%)" }}
                  >
                    {c.number.replace(/^0/, "")}
                  </span>
                </div>
                <div className="px-3 py-2.5">
                  <p className="text-sm font-extrabold text-[#101828]">{c.model}</p>
                  {c.spec && <p className="mt-0.5 text-xs text-[#101828]">{c.spec}</p>}
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center">
          <button className="btn-text flex items-center gap-2 rounded-lg border-2 border-hero-blue bg-white/70 px-5 py-2.5 uppercase text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
            {data.viewMoreLabel} <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      {/* faint decorative engine watermark, top-right, faded edges so no hard box is visible */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 opacity-15"
        style={{
          maskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 35%, transparent 70%)",
        }}
        aria-hidden="true"
      >
        <Image src="/model/sec15_part.webp" alt="" fill className="object-cover" sizes="256px" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <LandRoverLogo className="absolute right-0 top-6 h-16 w-16 opacity-90" />
        <div className="pt-8">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="text-[#101828]">{data.headlinePre} </span>
            <span className="text-hero-blue">{data.headlineHighlight}</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[#101828]">{data.subhead}</p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {data.cards.map((c) => {
            const Wrapper = c.href ? Link : "div";
            const wrapperProps = c.href ? { href: c.href } : {};
            return (
              <Wrapper
                key={c.number}
                {...wrapperProps}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-black/5 bg-(--color-light-surface) shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[1536/840] bg-(--color-light-surface)">
                  <Image src={c.image || data.image} alt={c.model} fill className="object-cover" sizes="25vw" />
                  <span
                    className="absolute left-0 top-0 flex h-8 items-center bg-hero-blue px-3 text-sm font-bold text-white"
                    style={{ clipPath: "polygon(0 0, 100% 0, 78% 100%, 0% 100%)" }}
                  >
                    {c.number.replace(/^0/, "")}
                  </span>
                </div>
                <div className="px-3 py-2">
                  <p className="text-base font-extrabold text-[#101828]">{c.model}</p>
                  {c.spec && <p className="text-sm font-normal text-[#101828]">{c.spec}</p>}
                </div>
              </Wrapper>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="btn-text flex items-center gap-2 rounded-md border-2 border-hero-blue bg-white/70 px-6 py-2.5 uppercase text-hero-blue backdrop-blur-md transition hover:bg-hero-blue hover:text-white">
            {data.viewMoreLabel} <span aria-hidden>→</span>
          </button>
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
