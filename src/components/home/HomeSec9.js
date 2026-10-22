"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useQuoteModal } from "@/components/shared/QuoteModal";
import ImageLightbox from "@/components/shared/ImageLightbox";

export default function HomeSec9({ data }) {
  const trackRef = useRef(null);
  const { open: openQuote } = useQuoteModal();
  const [open, setOpen] = useState(null);
  // tap-to-enlarge is for phones; on desktop the cards zoom on hover instead
  const enlarge = (img) => () => window.matchMedia("(max-width: 767px)").matches && setOpen(img);

  function scrollBy(dir) {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  }

  const mobileImages = data.images.slice(0, 9);

  return (
    <section className="theme-dark relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-hero-blue/10 blur-3xl" />

      {/* Land Rover-green glare line along the top edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#607056]/25 to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-linear-to-r from-transparent via-[#d4dec8] to-transparent shadow-[0_0_14px_3px_rgba(159,176,140,0.55)]"
      />

      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-8 pt-10 md:hidden">
        <h2 className="h2 text-center uppercase text-white">
          <span className="block">Recently Completed</span>{" "}
          <span className="block text-hero-blue">Land Rover Rebuilds</span>
        </h2>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {mobileImages.map((img, i) => (
            <button key={i} type="button" onClick={enlarge(img)} aria-label={`View larger: ${img.alt}`} className="hud-card group block cursor-pointer text-left">
              <div className="hud-card-inner aspect-square">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="140px" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="w-fit rounded-sm p-0.5" style={{ background: "linear-gradient(90deg, #fff 0%, #607056 55%, #3b402b 100%)" }}>
            <button
              type="button"
              onClick={openQuote}
              className="block whitespace-nowrap rounded-[3px] border border-hero-blue bg-hero-blue px-8 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-[#1a1a1a] hover:text-white"
            >
              {data.cta.label} →
            </button>
          </div>
          <span className="label-text flex items-center gap-2 uppercase tracking-wide text-white/70">
            <Image src="/brand/logo-icon.webp" alt="Land Rover Garage" width={512} height={197} className="h-7 w-auto" sizes="90px" />
            {data.footerTagline}
          </span>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative mx-auto hidden max-w-6xl px-4 py-8 sm:px-6 md:block lg:px-8 lg:py-10">
        <div role="heading" aria-level="2" className="h2 text-center uppercase text-white">
          Recently Completed <span className="text-hero-blue">Land Rover</span> Rebuilds
        </div>

        <div className="relative mt-6">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex lg:hidden"
          >
            ❮
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex lg:hidden"
          >
            ❯
          </button>

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-2 lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:overflow-visible"
          >
            {data.images.map((img, i) => (
              <div key={i} className="hud-card group w-40 shrink-0 snap-start sm:w-48 lg:w-auto">
                <div className="hud-card-inner aspect-square">
                  <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-110" sizes="220px" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="rounded-sm p-0.5" style={{ background: "linear-gradient(90deg, #fff 0%, #607056 55%, #3b402b 100%)" }}>
            <button
              type="button"
              onClick={openQuote}
              className="block rounded-[3px] border border-hero-blue bg-hero-blue px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1a1a1a] hover:text-white"
            >
              {data.cta.label} →
            </button>
          </div>
          <span className="h-6 w-px bg-white/20" />
          <span className="label-text flex items-center gap-2 uppercase tracking-wide text-white/70">
            <Image src="/brand/logo-icon.webp" alt="Land Rover Garage" width={512} height={197} className="h-8 w-auto" sizes="100px" />
            {data.footerTagline}
          </span>
        </div>
      </div>

      {open && <ImageLightbox img={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
