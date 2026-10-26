"use client";

import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import { useQuoteModal } from "@/components/shared/QuoteModal";

export default function HomeSec4_5({ data }) {
  const [line1, line2] = data.h2.split("|");
  const { open: openQuote } = useQuoteModal();

  return (
    <section className="theme-dark relative overflow-hidden [clip-path:polygon(0_0,100%_0,100%_91%,50%_100%,0_91%)] md:[clip-path:polygon(0_0,100%_0,100%_93%,50%_100%,0_93%)]">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        {/* box uses the photo's own aspect (572x1024), so nothing is cropped and the section is no taller than the image */}
        <div className="relative w-full" style={{ aspectRatio: "572 / 1024" }}>
          <div className="absolute inset-0">
            <Image src={data.mobileImage} alt="Land Rover Defender driving along a wet mountain road under a stormy sky" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-hero-dark/35" />
            {/* solid black behind the whole top text block for legibility over the busy photo */}
            <div className="absolute inset-x-0 top-0 h-[52%] bg-linear-to-b from-black via-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-hero-dark to-transparent" />
          </div>

          <div className="absolute inset-x-0 top-0 flex flex-col px-4 pt-5">
            <p className="whitespace-nowrap text-center text-[10px] font-normal italic uppercase tracking-wide text-white">{data.kicker}</p>
            <h2 className="h2 mt-2 text-center uppercase">
              <span className="block text-white">{line1}</span>{" "}
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <p className="-skew-x-6 mt-1 text-center text-lg font-bold uppercase text-white">{data.subhead1}</p>
            <p className="-skew-x-6 text-center text-[10px] font-normal italic uppercase tracking-wide text-white">{data.subhead2}</p>

            <div className="mt-3 space-y-0.5 text-left text-xs leading-snug text-white/90">
              {data.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p>{data.bodyBold}</p>
            </div>
            <p className="mt-2.5 text-left text-[12.5px] leading-snug text-white/90">{data.bodyRest}</p>

            <div className="mt-3 grid grid-cols-3 divide-x divide-white/20">
              {data.features.map((f) => (
                <div key={f.label} className="flex items-center justify-center gap-1.5 px-1.5">
                  <Icon name={f.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <span className="text-[10px] font-semibold uppercase leading-[1.15]">{f.label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={openQuote}
              className="mx-auto mt-3 block w-fit whitespace-nowrap rounded-sm border-2 border-hero-blue bg-hero-blue px-6 py-2.5 text-center text-sm font-bold uppercase text-white shadow-[0_0_20px_rgba(96,112,86,0.4)] transition-colors hover:border-hero-blue hover:bg-[#1a1a1a] hover:text-white"
            >
              {data.cta.label} →
            </button>
          </div>

          {/* caption and logo are centred on the same axis as the V's apex (50%), clear of the slanted edges */}
          <div className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-2 px-4">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-white/25" />
              <p className="text-[10px] uppercase tracking-widest text-white">{data.footer}</p>
              <span className="h-px w-10 bg-white/25" />
            </div>
            <Image src="/brand/logo-icon.webp" alt="Land Rover Garage" width={512} height={197} className="h-8 w-auto" sizes="90px" />
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.bgImage} alt="Land Rover Defender driving along a wet mountain road under a stormy sky" fill quality={95} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-hero-dark/45" />
          <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-hero-dark/30" />
        </div>

        {/* headline stack, right-aligned over the photo's empty side */}
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 px-4 pt-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div />
          <div className="relative pb-16 lg:ml-auto lg:max-w-xl lg:pb-20 lg:pl-6">
            <p className="text-xs font-normal italic uppercase tracking-wide text-white">{data.kicker}</p>
            <div role="heading" aria-level="2" className="h2 mt-2 uppercase">
              <span className="block text-white">{line1}</span>{" "}
              <span className="block text-hero-blue">{line2}</span>
            </div>
            <p className="-skew-x-6 origin-left mt-3 text-xl font-bold uppercase text-white sm:text-2xl">{data.subhead1}</p>
            <p className="-skew-x-6 origin-left text-xs font-normal italic uppercase tracking-wide text-white">{data.subhead2}</p>

            <div className="mt-4 max-w-xs space-y-1 text-sm text-white lg:max-w-none">
              {data.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p>{data.bodyBold}</p>
            </div>
            <p className="mt-4 text-base text-white lg:whitespace-nowrap">{data.bodyRest}</p>

            {/* badges sit in a row from the left edge (first one flush with the text above), separated by thin dividers */}
            <div className="mt-6 flex items-center divide-x divide-white/20">
              {data.features.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 px-5 first:pl-0">
                  <Icon name={f.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                  <span className="text-xs font-semibold leading-snug sm:text-sm">
                    {f.label.split(" ").length === 2 ? (
                      <>
                        {f.label.split(" ")[0]}
                        <br />
                        {f.label.split(" ")[1]}
                      </>
                    ) : (
                      f.label
                    )}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={openQuote}
              className="btn-text mt-6 inline-block rounded-sm border-2 border-hero-blue bg-hero-blue px-7 py-3 text-white transition-colors hover:border-hero-blue hover:bg-[#1a1a1a] hover:text-white"
            >
              {data.cta.label} →
            </button>
          </div>
        </div>

        {/* footer tagline */}
        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/25" />
            <p className="text-xs uppercase tracking-widest text-white">{data.footer}</p>
            <span className="h-px w-16 bg-white/25" />
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-white/25" />
            <Image src="/brand/logo-icon.webp" alt="Land Rover Garage" width={512} height={197} className="h-8 w-auto" sizes="100px" />
            <span className="h-px w-8 bg-white/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
