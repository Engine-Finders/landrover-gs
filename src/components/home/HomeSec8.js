"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

export default function HomeSec8({ data }) {
  const [line1, line2, line3] = data.h2.split("|");
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section className="relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="theme-dark relative overflow-hidden md:hidden">
        <div className="relative px-4 py-8">
          <h2 className="h2 text-center uppercase text-white">
            <span className="block">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
            <span className="block">{line3}</span>
          </h2>

          <div className="no-scrollbar mt-5 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
            {data.stages.map((s) => (
              <div key={s.step} className="flex w-[30%] shrink-0 snap-start flex-col items-center gap-2">
                <TimelineBadge step={s.step} active={s.step === 1} size="sm" />
                <button
                  type="button"
                  onClick={() => setActiveStage(s)}
                  aria-label={`View full image for ${s.label}`}
                  className={`relative aspect-3/4 w-full overflow-hidden rounded-md ${
                    s.step === 1 ? "ring-2 ring-hero-blue" : "ring-1 ring-white/20"
                  } shadow-lg`}
                >
                  <Image src={s.image} alt={s.label} fill className="object-cover" sizes="120px" />
                </button>
                <span className="label-text text-center leading-tight text-white">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {data.highlights.map((h) => (
              <div key={h.label} className="glow-card flex flex-col items-center overflow-hidden p-2 text-center">
                <Icon name={h.icon} className="mx-auto mb-1.5 h-6 w-6 text-hero-blue" />
                <p className="label-text leading-tight text-white">{h.label}</p>
                <span className="mt-2 block h-px w-full bg-hero-blue/60" />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            <LandRoverLogo className="h-9 w-9" />
            <span className="text-xs font-semibold text-white">Land Rover</span>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="theme-dark relative hidden overflow-hidden pb-16 md:block">
        <div className="absolute inset-0">
          <Image src={data.bgImage} alt="" fill quality={95} className="object-cover" sizes="100vw" priority={false} />
          <div className="absolute inset-0 bg-hero-dark/25" />
        </div>

        <div className="relative flex flex-col gap-8 py-8 lg:flex-row lg:gap-6 lg:py-10">
          {/* left: header + guarantee cards, on its own dark overlay so the diagonal
              gold stripe in the background photo stays clear of the text */}
          <div className="relative shrink-0 px-4 sm:px-6 lg:w-[34%] lg:pl-8">
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark via-hero-dark/85 to-transparent" />
            <div className="relative">
              <h2 className="h2 uppercase text-white">
                <span className="block">{line1}</span>
                <span className="block text-hero-blue">{line2}</span>
                <span className="block">{line3}</span>
              </h2>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {data.highlights.map((h) => (
                  <div key={h.label} className="glow-card flex flex-col items-center overflow-hidden p-3 text-center sm:p-4">
                    <Icon name={h.icon} className="mb-4 h-9 w-9 text-hero-blue sm:mb-6" />
                    <p className="text-xs text-white sm:text-sm">{h.label}</p>
                    <span className="mt-3 block h-px w-full bg-hero-blue/60 sm:mt-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* right: step timeline + portrait cards, wall-to-wall to the viewport edge */}
          <div className="min-w-0 flex-1 pl-4 sm:pl-6 lg:pl-0">
            <div className="relative">
              <div className="relative flex">
                {data.stages.map((s) => (
                  <div key={s.step} className="flex min-w-0 flex-1 flex-col items-center text-center">
                    <TimelineBadge step={s.step} active={s.step === 1} />
                    <span className="label-text mt-2 px-0.5 leading-tight text-white">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-1 pr-4 lg:pr-0">
                {data.stages.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveStage(s)}
                    aria-label={`View full image for ${s.label}`}
                    className={`relative h-40 min-w-0 flex-1 overflow-hidden rounded-md sm:h-52 lg:h-64 ${
                      s.step === 1 ? "ring-2 ring-hero-blue" : "ring-1 ring-white/15"
                    }`}
                  >
                    <Image src={s.image} alt={s.label} fill className="object-cover" sizes="150px" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* bottom-centered w.r.t. the whole section, logo vertically centered against the text,
            flanked by gold lines on both sides */}
        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-hero-blue/50" />
          <div className="flex items-center gap-3">
            <LandRoverLogo className="h-16 w-16" />
            <span className="text-2xl font-semibold text-white">Land Rover</span>
          </div>
          <span className="h-px w-16 bg-hero-blue/50" />
        </div>
      </div>

      {/* lightbox: full view of the clicked stage image, shared by both mobile and desktop cards */}
      {activeStage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveStage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveStage(null)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-xl text-white transition-colors hover:bg-black/70"
          >
            ✕
          </button>

          <div className="relative h-full max-h-[85vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image src={activeStage.image} alt={activeStage.label} fill className="object-contain" sizes="90vw" />
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm font-semibold uppercase tracking-wide text-white">
            {activeStage.step}. {activeStage.label}
          </p>
        </div>
      )}
    </section>
  );
}

function TimelineBadge({ step, active, size = "lg" }) {
  const outer = size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const inner = size === "sm" ? "h-6 w-6" : "h-8 w-8";
  return (
    <div className={`relative flex shrink-0 items-center justify-center ${outer}`}>
      <div className="absolute inset-0 rounded-full bg-hero-blue/25 blur-md" />
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-hero-blue/40" />
      <div className="absolute inset-[3px] rounded-full border border-hero-blue/60" />
      {active && <div className="absolute -right-0.5 top-0 h-3 w-3 rounded-full bg-white blur-[2px]" />}
      <div className={`relative z-10 flex items-center justify-center rounded-full bg-[#1a1a1a] text-xs font-bold text-white ring-1 ring-hero-blue/70 ${inner}`}>
        {step}
      </div>
    </div>
  );
}
