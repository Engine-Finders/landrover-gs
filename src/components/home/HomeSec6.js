"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "@/components/shared/ImageLightbox";

const TILE_FADE =
  "radial-gradient(60% 90% at 0% 0%, var(--theme-light-bg) 0%, transparent 55%), radial-gradient(60% 90% at 100% 0%, var(--theme-light-bg) 0%, transparent 55%), radial-gradient(60% 90% at 0% 100%, var(--theme-light-bg) 0%, transparent 55%), radial-gradient(60% 90% at 100% 100%, var(--theme-light-bg) 0%, transparent 55%)";

// Tap-to-enlarge is a phone interaction; on desktop the tiles zoom on hover instead.
const isPhone = () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

export default function HomeSec6({ data }) {
  const [open, setOpen] = useState(null);
  const portraitTrack = [...data.portrait, ...data.portrait];
  const landscapeTrack = [...data.landscape, ...data.landscape];
  const enlarge = (img) => () => isPhone() && setOpen(img);

  return (
    <section className="theme-light px-4 py-8 sm:px-6 lg:px-8">
      <div
        className="theme-light relative mx-auto max-w-6xl rounded-2xl border border-hero-blue/20 px-4 py-6 sm:px-6 sm:py-8"
        style={{ boxShadow: "0 0 60px -8px rgba(96,112,86,0.25), 0 0 20px rgba(0,0,0,0.06)" }}
      >
        {/* our logo sits half on / half off the card's own top edge, on a pill of the page colour so the card border doesn't cut through it */}
        <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-light-surface) px-4 py-1.5">
          <Image src="/brand/logo-icon-light.webp" alt="Land Rover Garage" width={512} height={197} className="h-11 w-auto" sizes="120px" />
        </span>

        <div className="pt-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-20 bg-hero-blue/40" />
            <h2 className="h2 text-[#1a1a1a]">{data.h2}</h2>
            <span className="h-px w-20 bg-hero-blue/40" />
          </div>
        </div>

        {/* a row pauses while the pointer is over it (desktop) */}
        <div>
        {/* portrait row - infinite scroll right */}
        <div className="gallery-row mt-6 overflow-hidden">
          <div className="animate-marquee-right flex w-max gap-1.5">
            {portraitTrack.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={enlarge(img)}
                aria-label={`View larger: ${img.alt}`}
                aria-hidden={i >= data.portrait.length ? true : undefined}
                tabIndex={i >= data.portrait.length ? -1 : undefined}
                className="gallery-tile relative h-56 w-40 shrink-0 cursor-pointer overflow-hidden rounded-xl sm:h-64 sm:w-44 md:cursor-default"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 ease-out" sizes="200px" />
                <div className="pointer-events-none absolute inset-0" style={{ background: TILE_FADE }} />
              </button>
            ))}
          </div>
        </div>

        {/* landscape row - infinite scroll left */}
        <div className="gallery-row mt-2 overflow-hidden">
          <div className="animate-marquee-left flex w-max gap-1.5">
            {landscapeTrack.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={enlarge(img)}
                aria-label={`View larger: ${img.alt}`}
                aria-hidden={i >= data.landscape.length ? true : undefined}
                tabIndex={i >= data.landscape.length ? -1 : undefined}
                className="gallery-tile relative h-40 w-64 shrink-0 cursor-pointer overflow-hidden rounded-xl sm:h-48 sm:w-80 md:cursor-default"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 ease-out" sizes="360px" />
                <div className="pointer-events-none absolute inset-0" style={{ background: TILE_FADE }} />
              </button>
            ))}
          </div>
        </div>
        </div>
      </div>

      {open && <ImageLightbox img={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
