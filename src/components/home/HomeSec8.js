"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import ImageLightbox from "@/components/shared/ImageLightbox";

// Diagonal edge between the light panel and the dark timeline, drawn purely in CSS.
// Desktop: a slanted vertical edge (x in % of the container). Phone: a slanted horizontal edge
// (px drop) so the stripes follow the same line whatever the width.
const STRIPES_DESKTOP = [
  { bg: "linear-gradient(90deg, #f4f3f1, #b9bbb8 45%, #e8e9e7)", clip: "polygon(40% 0, 43.2% 0, 31.2% 100%, 28% 100%)" },
  { bg: "linear-gradient(90deg, #1e3a29, #2f5a40)", clip: "polygon(43.2% 0, 46.6% 0, 34.6% 100%, 31.2% 100%)" },
  { bg: "linear-gradient(90deg, #d6b676, #b8955c)", clip: "polygon(46.6% 0, 47.3% 0, 35.3% 100%, 34.6% 100%)" },
];
const STRIPES_MOBILE = [
  { bg: "linear-gradient(180deg, #f4f3f1, #b9bbb8 50%, #e8e9e7)", clip: "polygon(0 57px, 100% 29px, 100% 41px, 0 69px)" },
  { bg: "linear-gradient(180deg, #1e3a29, #2f5a40)", clip: "polygon(0 69px, 100% 41px, 100% 55px, 0 83px)" },
  { bg: "linear-gradient(180deg, #d6b676, #b8955c)", clip: "polygon(0 83px, 100% 55px, 100% 58px, 0 86px)" },
];

// Two rings of the same dashed "wheel" style: the outer one turns clockwise, the circle holding the
// number turns the opposite way. The number itself sits on top and never rotates.
function Wheel({ step }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center md:h-14 md:w-14">
      <div className="absolute inset-0 rounded-full bg-hero-blue/20 blur-md" />
      <div className="wheel-outer absolute inset-0 rounded-full border-2 border-dashed border-hero-blue/70" />
      <div className="wheel-inner absolute inset-[7px] rounded-full border-2 border-dashed border-hero-blue/70 bg-[#141813] md:inset-[8px]" />
      <span className="relative z-10 text-xs font-bold text-white md:text-sm">{step}</span>
    </div>
  );
}

export default function HomeSec8({ data }) {
  const [activeStage, setActiveStage] = useState(null);
  // phones: the wheel of the card last tapped keeps spinning (the first one by default); holding a card spins it too
  const [spinning, setSpinning] = useState(0);
  const last = data.stages.length - 1;

  return (
    <section className="theme-light relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[#0d0f0c] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.55)]">
        {/* dark base with a soft sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 80% 20%, #1c211a 0%, #0d0f0c 60%)" }}
        />

        {/* light panel (desktop): a slanted wedge */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden md:block"
          style={{
            background: "linear-gradient(140deg, #f6f4f0 0%, #e7e3dc 100%)",
            clipPath: "polygon(0 0, 40% 0, 28% 100%, 0 100%)",
          }}
        />

        {/* stripes along the slanted edge (desktop) */}
        {STRIPES_DESKTOP.map((s, i) => (
          <div key={i} aria-hidden="true" className="absolute inset-0 hidden md:block" style={{ background: s.bg, clipPath: s.clip }} />
        ))}

        <div className="relative grid md:grid-cols-[38%_minmax(0,1fr)]">
          {/* ===== left: heading + trust cards ===== */}
          <div className="relative px-4 pb-14 pt-8 md:px-7 md:pb-10 md:pt-10">
            {/* light panel (phones): slanted bottom edge, with the stripes laid along it */}
            <div
              aria-hidden="true"
              className="absolute inset-0 md:hidden"
              style={{
                background: "linear-gradient(160deg, #f6f4f0 0%, #e7e3dc 100%)",
                clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 28px), 0 100%)",
              }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-7.5 z-10 h-[87px] md:hidden">
              {STRIPES_MOBILE.map((st, k) => (
                <div key={k} className="absolute inset-0" style={{ background: st.bg, clipPath: st.clip }} />
              ))}
            </div>
            <h2 className="h2 relative uppercase text-[#1a1a1a]">
              {data.h2Lines.map((line, i) => (
                <span key={i} className="block">
                  {line.map((p, j) => (
                    <span key={j} className={p.c === "green" ? "text-hero-blue" : p.c === "gold" ? "text-[#b8955c]" : undefined}>
                      {p.t}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <div className="relative mt-6 grid grid-cols-3 gap-2.5 md:mt-8 md:gap-3">
              {data.highlights.map((h) => (
                <div
                  key={h.label}
                  className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-[#8aa080]/70 p-3 backdrop-blur-xl backdrop-saturate-150 md:p-4"
                  style={{
                    background: "linear-gradient(160deg, rgba(34,42,32,0.92) 0%, rgba(14,18,14,0.95) 100%)",
                    boxShadow:
                      "0 0 18px rgba(96,112,86,0.7), 0 0 8px rgba(255,255,255,0.22), 0 0 2px rgba(255,255,255,0.5), 0 16px 30px -14px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 0 22px rgba(96,112,86,0.22)",
                  }}
                >
                  {/* glass sheen: soft top-edge light and a faint diagonal streak */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{ background: "linear-gradient(125deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 38%), linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 22%)" }}
                  />
                  <Icon name={h.icon} className="relative h-8 w-8 text-white/90 md:h-10 md:w-10" />
                  <div className="relative">
                    <p className="text-[11px] leading-snug text-white md:text-sm">{h.label}</p>
                    <span
                      className="mt-3 block h-[3px] w-4/5 rounded-full"
                      style={{ background: "linear-gradient(90deg, #4a6a4c, #8aa080 50%, #c9a96e)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== right: timeline, 4.5 cards in view and a slim scroller for the rest ===== */}
          <div className="relative min-w-0 pb-6 pt-8 md:py-10 md:pl-6 md:pr-0">
            <div className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-3 [--n:2.5] md:[--n:4.5]">
              {data.stages.map((s, i) => (
                <div
                  key={s.step}
                  className={`wheel-stage group relative flex shrink-0 snap-start flex-col items-center px-1 ${i === spinning ? "wheel-spin" : ""}`}
                  style={{ flexBasis: "calc(100% / var(--n))" }}
                >
                  {/* dotted connector through the wheel centres */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-6 h-px border-t border-dotted border-white/25 md:top-7 ${i === 0 ? "left-1/2" : "left-0"} ${i === last ? "right-1/2" : "right-0"}`}
                  />
                  <Wheel step={s.step} />
                  <span className="label-text mt-2 min-h-8 px-0.5 text-center leading-tight text-white">{s.label}</span>

                  <button
                    type="button"
                    onClick={() => {
                      setSpinning(i);
                      setActiveStage(s);
                    }}
                    aria-label={`View full image for ${s.label}`}
                    className="relative mt-3 aspect-[3/4] w-full overflow-hidden rounded-md ring-1 ring-white/20 transition-shadow group-hover:ring-hero-blue md:aspect-[2/3]"
                  >
                    <Image
                      src={s.thumb || s.image}
                      alt={s.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      quality={90} sizes="(min-width: 768px) 360px, 240px"
                    />
                  </button>
                  <p className="mt-2 px-0.5 text-center text-[11px] leading-snug text-white/75 md:text-xs">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* closing statement */}
        <div className="relative z-10 border-t border-white/10 bg-[#0d0f0c] px-4 py-6 text-center md:px-7">
          <p className="text-sm font-bold text-white md:text-base">{data.footer.title}</p>
          <p className="mx-auto mt-1.5 max-w-3xl text-xs leading-relaxed text-white/75 md:text-sm">{data.footer.text}</p>
        </div>
      </div>

      {activeStage && <ImageLightbox img={{ src: activeStage.image, alt: activeStage.label }} onClose={() => setActiveStage(null)} />}
    </section>
  );
}
