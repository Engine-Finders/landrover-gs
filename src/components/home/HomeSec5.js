"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

function TopStrip() {
  return (
    <span className="relative block h-2 w-full overflow-hidden">
      <span
        className="absolute inset-0"
        style={{
          background: "var(--color-hero-blue)",
          clipPath: "polygon(0% 0%, 53% 0%, 47% 100%, 0% 100%)",
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          background: "var(--color-hero-secondary)",
          clipPath: "polygon(53% 0%, 78% 0%, 72% 100%, 47% 100%)",
        }}
      />
      <span
        className="absolute inset-0"
        style={{
          background: "#ffffff",
          clipPath: "polygon(78% 0%, 100% 0%, 100% 100%, 72% 100%)",
        }}
      />
    </span>
  );
}

export default function HomeSec5({ data }) {
  const [line1, line2a, line2b] = data.h2.split("|");
  const [activeIndex, setActiveIndex] = useState(data.engines.length - 1);
  const n = data.engines.length;
  const step = 18;
  const maxShift = (n - 1) * step;

  return (
    <section className="theme-light relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-hero-blue/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-hero-blue/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <LandRoverLogo className="h-13 w-13 text-[#1a1a1a]" />
          </div>
          <h2 className="h2 text-[#1a1a1a]">
            <span className="block">{line1}</span>
            <span className="block">
              {line2a} <span className="text-hero-blue">{line2b}</span>
            </span>
          </h2>
          <p className="body-text mx-auto mt-2 max-w-xl text-[#1a1a1a]">{data.description}</p>
        </div>

        {/* ===== mobile: cascading stacked card deck, click any card to expand it ===== */}
        <div className="mt-6 overflow-x-hidden md:hidden">
          {data.engines.map((e, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={e.code}
                role="button"
                tabIndex={0}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setActiveIndex(i);
                  }
                }}
                className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-white text-left ${isActive ? "shadow-lg" : "shadow-sm"}`}
                style={{
                  marginTop: i === 0 ? 0 : -28,
                  marginLeft: isActive ? 0 : i * step,
                  width: isActive ? "100%" : `calc(100% - ${maxShift}px)`,
                  zIndex: isActive ? n + 10 : i + 1,
                }}
              >
                {isActive ? (
                  <div>
                    <TopStrip />
                    <div className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-(--color-light-surface)">
                          <Image src={e.image} alt={`${e.code} engine`} fill className="object-contain p-1.5" sizes="110px" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="h3 text-[#1a1a1a]">{e.code}</h3>
                          <p className="text-xs font-semibold text-[#1a1a1a]">{e.spec}</p>
                          <p className="text-xs text-[#1a1a1a]">
                            {e.models} | {e.years}
                          </p>
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-[#1a1a1a]">
                        <span className="font-semibold">Common symptom:</span> {e.symptom}
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/5 pt-4">
                        <div>
                          <p className="text-xs text-[#1a1a1a]">Typical rebuild cost</p>
                          <p className="text-lg font-semibold text-hero-blue">{e.cost}</p>
                          <a
                            href={e.href}
                            onClick={(ev) => ev.stopPropagation()}
                            className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-hero-blue"
                          >
                            View Engine →
                          </a>
                        </div>
                        <div>
                          <p className="text-xs text-[#1a1a1a]">Turnaround</p>
                          <p className="flex items-center gap-1 text-sm font-semibold text-[#1a1a1a]">
                            <Icon name="clock" className="h-4 w-4 text-[#1a1a1a]" />
                            {e.turnaround}
                          </p>
                        </div>
                      </div>

                      <a
                        href={e.href}
                        onClick={(ev) => ev.stopPropagation()}
                        className="btn-text mt-3 block whitespace-nowrap rounded-sm border-2 border-hero-blue bg-hero-blue px-2 py-2.5 text-center text-white transition-colors hover:bg-transparent hover:text-hero-blue"
                      >
                        Get a Fixed Price Quote →
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <TopStrip />
                    <div className="flex items-center gap-3 p-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-(--color-light-surface)">
                        <Image src={e.image} alt={`${e.code} engine`} fill className="object-contain p-1" sizes="80px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="h3 text-[#1a1a1a]">{e.code}</h3>
                        <p className="truncate text-xs font-semibold text-[#1a1a1a]">{e.spec}</p>
                        <p className="truncate text-xs text-[#1a1a1a]">{e.models}</p>
                        <p className="truncate text-xs text-[#1a1a1a]">{e.years}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <a
            href={data.cta.href}
            className="btn-text mt-5 block rounded-sm border-2 border-hero-blue px-6 py-3 text-center text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
          >
            {data.cta.label} →
          </a>
        </div>

        {/* ===== desktop: grid of full cards ===== */}
        <div className="mt-6 hidden md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {data.engines.map((e) => (
            <div key={e.code} className="glass-card overflow-hidden rounded-xl">
              <TopStrip />

              <div className="relative h-56 w-full overflow-hidden bg-(--color-light-surface)">
                <Image src={e.image} alt={`${e.code} engine`} fill className="object-contain p-1" sizes="360px" />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-(--color-light-surface) to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="h3 text-[#1a1a1a]">{e.code}</h3>
                <p className="text-xs font-semibold text-[#1a1a1a]">{e.spec}</p>
                <p className="mt-0.5 text-xs text-[#1a1a1a]">
                  {e.models} | {e.years}
                </p>

                <p className="mt-3 text-sm text-[#1a1a1a]">
                  <span className="font-semibold">Common symptom:</span> {e.symptom}
                </p>

                <div className="mt-4 flex items-stretch justify-between border-t border-black/5 pt-3">
                  <div>
                    <p className="text-xs uppercase text-[#1a1a1a]">Typical rebuild cost</p>
                    <p className="text-base font-semibold text-hero-blue">{e.cost}</p>
                  </div>
                  <span className="mx-3 w-px shrink-0 bg-black/10" />
                  <div className="text-right">
                    <p className="text-xs uppercase text-[#1a1a1a]">Turnaround</p>
                    <p className="flex items-center justify-end gap-1 h3 text-[#1a1a1a]">
                      <Icon name="clock" className="h-4 w-4" />
                      {e.turnaround}
                    </p>
                  </div>
                </div>

                <a href={e.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-hero-blue">
                  View Engine →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 hidden text-center md:block">
          <a
            href={data.cta.href}
            className="btn-text inline-block rounded-sm border-2 border-hero-blue px-6 py-3 text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
          >
            {data.cta.label} →
          </a>
        </div>
      </div>
    </section>
  );
}
