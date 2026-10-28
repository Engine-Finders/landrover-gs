"use client";

import Image from "next/image";

import { useRef, useState } from "react";
import Icon from "@/components/reusable/Icon";
import { GoogleG, TrustpilotMark } from "@/components/reusable/BrandLogos";
import Link from "next/link";

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5 fill-hero-blue text-hero-blue" />
      ))}
    </div>
  );
}

// Long model names ("Range Rover Evoque") run into the logo in the corner, so over MAX_NAME
// characters the leading brand word is dropped ("Range Rover Evoque"); anything still longer is cut with an ellipsis.
const MAX_NAME = 22;
function shortName(name) {
  let n = name.trim();
  if (n.length > MAX_NAME) n = n.replace(/^(Land Rover|Mercedes-Benz|Mercedes|Jaguar|BMW)\s+/i, "");
  return n.length > MAX_NAME ? `${n.slice(0, MAX_NAME - 1).trimEnd()}…` : n;
}

function renderTitleLine(line, defaultClassName) {
  const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*(.*)\*\*$/);
    return match ? (
      <span key={i} className="text-hero-blue">
        {shortName(match[1])}
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
        <Image src="/brand/logo-icon.webp" alt="Land Rover Garage" width={512} height={197} className="h-14 w-auto absolute right-4 top-4" sizes="120px" />

        <div className="relative px-4 pb-8 pt-8">
          <h2 className="h2 max-w-[68%] origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block text-white">{renderTitleLine(line1, "text-white")}</span>{" "}
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
                    <TrustpilotMark className="h-5 w-5" />
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
            <Link href="/our-reviews" className="btn-text card-glare-light relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 uppercase text-hero-blue transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg">
              Check All Our Reviews <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <Image src="/brand/logo-icon.webp" alt="Land Rover Garage" width={512} height={197} className="h-16 w-auto absolute right-6 top-6" sizes="120px" />

      <div className="relative mx-auto max-w-6xl">
        <div role="heading" aria-level="2" className="h2 max-w-[78%] origin-left scale-y-110 scale-x-90 pt-8 uppercase">
          <span className="text-white">{renderTitleLine(line1, "text-white")} </span>{" "}
          <span className="text-white">{renderTitleLine(line2, "text-white")}</span>
        </div>

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
                  <TrustpilotMark className="h-5 w-5" />
                )}
              </div>
              <p className="mt-4 text-base font-bold text-white">{r.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
              <p className="label-text mt-auto pt-4 uppercase tracking-wide text-hero-blue">{r.tag}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-4">
          <Link href="/our-reviews" className="btn-text card-glare-light relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-hero-blue transition hover:-translate-y-0.5">
            Check All Our Reviews <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
}
