"use client";

import { REVIEW_URLS } from "@/lib/site";
import { useRef, useState } from "react";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="var(--color-hero-gold)" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.82z" />
      <path fill="var(--color-hero-gold)" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z" />
      <path fill="var(--color-hero-gold)" d="M5.27 14.28a7.2 7.2 0 010-4.56V6.61H1.27a12 12 0 000 10.78z" />
      <path fill="var(--color-hero-gold)" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5 fill-hero-blue text-hero-blue" />
      ))}
    </div>
  );
}

function renderTitleLine(line, defaultClassName) {
  const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*(.*)\*\*$/);
    return match ? (
      <span key={i} className="text-hero-blue">
        {match[1]}
      </span>
    ) : (
      <span key={i} className={defaultClassName}>
        {part}
      </span>
    );
  });
}

export default function ModelSec8({ data }) {
  const [line1, line2] = data.headline.split("|");
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setActiveIndex(Math.round(ratio * (data.reviews.length - 1)));
  }

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <LandRoverLogo className="absolute right-4 top-4 h-14 w-14 opacity-90" />

        <div className="relative px-4 pb-8 pt-8">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block text-white">{renderTitleLine(line1, "text-white")}</span>
            <span className="block text-white">{renderTitleLine(line2, "text-white")}</span>
          </h2>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
          >
            {data.reviews.map((r) => (
              <div
                key={r.name}
                className="glow-card--sm relative flex min-h-64 w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl p-5"
                style={{
                  border: "1px solid rgba(96,112,86, 0.75)",
                  boxShadow: "0 -10px 20px -6px rgba(96,112,86, 0.65), 0 -2px 10px -2px rgba(96,112,86, 0.4)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 25%, transparent 48%)",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <Stars />
                  {r.platform === "google" ? (
                    <GoogleG className="h-5 w-5" />
                  ) : (
                    <Icon name="star" className="h-5 w-5 fill-hero-blue text-hero-blue" />
                  )}
                </div>
                <p className="mt-4 text-base font-bold text-white">{r.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                <p className="label-text mt-auto pt-4 uppercase tracking-wide text-hero-blue">{r.tag}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {data.reviews.map((r, i) => (
              <span
                key={r.name}
                className={`rounded-full transition-all ${i === activeIndex ? "h-2 w-6 bg-hero-blue" : "h-2 w-2 bg-white/25"}`}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <a href={REVIEW_URLS.google} target="_blank" rel="noopener noreferrer" className="btn-text card-glare-light relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 uppercase text-hero-blue">
              <GoogleG className="h-5 w-5" />
              {data.googleCta} <span aria-hidden className="text-hero-blue">→</span>
            </a>
            <a href={REVIEW_URLS.trustpilot} target="_blank" rel="noopener noreferrer" className="btn-text card-corner-glare relative flex w-full items-center justify-center gap-2 rounded-lg border border-hero-blue/50 bg-[#121511] px-6 py-3.5 uppercase text-white">
              <Icon name="star" className="h-5 w-5 fill-hero-blue text-hero-blue" />
              {data.trustpilotCta} <span aria-hidden className="text-hero-blue">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <LandRoverLogo className="absolute right-6 top-6 h-16 w-16 opacity-90" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="h2 origin-left scale-y-110 scale-x-90 pt-8 uppercase">
          <span className="text-white">{renderTitleLine(line1, "text-white")} </span>
          <span className="text-white">{renderTitleLine(line2, "text-white")}</span>
        </h2>

        <div className="mt-6 grid grid-cols-6 gap-3">
          {data.reviews.map((r) => (
            <div
              key={r.name}
              className="glow-card--sm relative flex min-h-72 flex-col overflow-hidden rounded-xl p-5"
              style={{
                border: "1px solid rgba(96,112,86, 0.75)",
                boxShadow: "0 -10px 20px -6px rgba(96,112,86, 0.65), 0 -2px 10px -2px rgba(96,112,86, 0.4)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 25%, transparent 48%)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <Stars />
                {r.platform === "google" ? (
                  <GoogleG className="h-5 w-5" />
                ) : (
                  <Icon name="star" className="h-5 w-5 fill-hero-blue text-hero-blue" />
                )}
              </div>
              <p className="mt-4 text-base font-bold text-white">{r.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
              <p className="label-text mt-auto pt-4 uppercase tracking-wide text-hero-blue">{r.tag}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <a href={REVIEW_URLS.google} target="_blank" rel="noopener noreferrer" className="btn-text card-glare-light relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-hero-blue transition hover:-translate-y-0.5">
            <GoogleG className="h-5 w-5" />
            {data.googleCta} <span aria-hidden className="text-hero-blue">→</span>
          </a>
          <a href={REVIEW_URLS.trustpilot} target="_blank" rel="noopener noreferrer" className="btn-text card-corner-glare relative flex items-center justify-center gap-2 rounded-md border border-hero-blue/50 bg-[#121511] px-6 py-3 text-white transition hover:-translate-y-0.5">
            <Icon name="star" className="h-5 w-5 fill-hero-blue text-hero-blue" />
            {data.trustpilotCta} <span aria-hidden className="text-hero-blue">→</span>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
