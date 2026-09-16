"use client";

import { useRef } from "react";
import Image from "next/image";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

export default function HomeSec9({ data }) {
  const trackRef = useRef(null);

  function scrollBy(dir) {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  }

  const mobileImages = data.images.slice(0, 9);

  return (
    <section className="theme-dark relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-hero-blue/10 blur-3xl" />

      {/* ===== mobile ===== */}
      <div className="relative px-4 py-8 md:hidden">
        <h2 className="h2 text-center uppercase text-white">
          <span className="block">Recently Completed</span>
          <span className="block text-hero-blue">Land Rover Rebuilds</span>
        </h2>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {mobileImages.map((img, i) => (
            <div key={i} className="hud-card">
              <div className="hud-card-inner aspect-square">
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="140px" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="w-fit rounded-sm p-0.5" style={{ background: "linear-gradient(90deg, #fff 0%, #ad875c 55%, #8c6c46 100%)" }}>
            <a
              href={data.cta.href}
              className="block whitespace-nowrap rounded-[3px] bg-hero-blue px-8 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-hero-dark hover:text-hero-blue"
            >
              {data.cta.label} →
            </a>
          </div>
          <span className="label-text flex items-center gap-2 uppercase tracking-wide text-white/70">
            <LandRoverLogo className="h-8 w-8" />
            {data.footerTagline}
          </span>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative mx-auto hidden max-w-6xl px-4 py-8 sm:px-6 md:block lg:px-8 lg:py-10">
        <h2 className="h2 text-center uppercase text-white">
          Recently Completed <span className="text-hero-blue">Land Rover</span> Rebuilds
        </h2>

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
              <div key={i} className="hud-card w-40 shrink-0 snap-start sm:w-48 lg:w-auto">
                <div className="hud-card-inner aspect-square">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="220px" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="rounded-sm p-0.5" style={{ background: "linear-gradient(90deg, #fff 0%, #ad875c 55%, #8c6c46 100%)" }}>
            <a
              href={data.cta.href}
              className="block rounded-[3px] bg-hero-blue px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-hero-dark hover:text-hero-blue"
            >
              {data.cta.label} →
            </a>
          </div>
          <span className="h-6 w-px bg-white/20" />
          <span className="label-text flex items-center gap-2 uppercase tracking-wide text-white/70">
            <LandRoverLogo className="h-9 w-9" />
            {data.footerTagline}
          </span>
        </div>
      </div>
    </section>
  );
}
