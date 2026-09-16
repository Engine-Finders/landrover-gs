"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";

const MOBILE_VISIBLE_COUNT = 6;

export default function Sec8({ data }) {
  const { gallery, howItWorks } = data;
  const [showAll, setShowAll] = useState(false);
  const mobileGalleryItems = showAll ? gallery.items : gallery.items.slice(0, MOBILE_VISIBLE_COUNT);

  return (
    <>
      {/* ============ recoveries & rebuilds gallery ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <h2 className="h2 uppercase">
            <span className="block text-[#101828]">{gallery.titlePre}</span>
            <span className="block text-hero-blue">{gallery.titleHighlight}</span>
          </h2>
          <p className="mt-2 text-xs leading-snug text-[#101828]">{gallery.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {mobileGalleryItems.map((it, i) => (
              <div key={`${it.model}-${i}`} className="glass-card relative overflow-hidden rounded-xl">
                <div className="relative aspect-[4/3]">
                  <Image src={it.image} alt={it.model} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <Icon name={it.icon} className="h-4 w-4 shrink-0 text-hero-blue" />
                    <p className="truncate text-xs font-extrabold uppercase text-[#101828]">{it.model}</p>
                  </div>
                  <p className="mt-0.5 truncate text-[9px] uppercase tracking-wide text-hero-blue">{it.status}</p>
                </div>
              </div>
            ))}
          </div>

          {gallery.items.length > MOBILE_VISIBLE_COUNT && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="flex items-center gap-2 rounded-lg border border-hero-blue/40 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#101828] shadow-sm transition-colors hover:bg-hero-blue/10"
              >
                {showAll ? "View Less" : "View More"}
                <span className={`text-hero-blue transition-transform ${showAll ? "rotate-180" : ""}`} aria-hidden>
                  ↓
                </span>
              </button>
            </div>
          )}
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <h2 className="h2 uppercase">
              <span className="block text-[#101828]">{gallery.titlePre}</span>
              <span className="block text-hero-blue">{gallery.titleHighlight}</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#101828]">{gallery.description}</p>

            <div className="mt-6 grid grid-cols-6 gap-4">
              {gallery.items.map((it, i) => (
                <div
                  key={`${it.model}-${i}`}
                  className="glass-card relative overflow-hidden rounded-xl transition-transform hover:-translate-y-0.5"
                >
                  <div className="relative aspect-square">
                    <Image src={it.image} alt={it.model} fill className="object-cover" sizes="16vw" />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="truncate text-xs font-extrabold uppercase text-[#101828]">{it.model}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Icon name={it.icon} className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                      <p className="truncate text-[10px] uppercase tracking-wide text-hero-blue">{it.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ how it works ============ */}
      <section className="theme-dark relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-6 md:hidden">
          <h2 className="h2 uppercase">
            <span className="text-white">{howItWorks.titlePre}</span>
            <span className="text-hero-blue">{howItWorks.titleHighlight}</span>
          </h2>

          {/* step-by-step vertical flow */}
          <div className="mt-4">
            {howItWorks.steps.map((s, i) => (
              <div key={s.linePre}>
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hero-blue text-base font-extrabold text-white"
                    style={{ boxShadow: "0 0 12px rgba(173,135,92,0.5)" }}
                  >
                    {i + 1}
                  </span>

                  <div className="glass-card-dark flex flex-1 items-center gap-3 rounded-2xl px-4 py-3">
                    <Icon name={s.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
                    <p className="text-sm font-extrabold uppercase leading-tight">
                      <span className="block text-white">{s.linePre}</span>
                      <span className="block text-hero-blue">{s.lineHighlight}</span>
                    </p>
                  </div>
                </div>

                {i < howItWorks.steps.length - 1 && (
                  <div className="flex w-11 justify-center py-1">
                    <span className="h-3 w-0 border-l-2 border-dashed border-hero-blue/40" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* bottom summary banner */}
          <div
            className="glass-card-dark relative mt-4 grid grid-cols-[1.3fr_1fr] divide-x divide-white/10 rounded-2xl px-4 py-4"
            style={{ boxShadow: "0 20px 45px -15px rgba(0,0,0,0.5), 0 0 30px -10px rgba(173,135,92,0.3)" }}
          >
            <div className="flex items-center gap-2.5 pr-3">
              <Icon name={howItWorks.summary.timeframe.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
              <p className="text-xs leading-snug text-white">{howItWorks.summary.timeframe.text}</p>
            </div>
            <div className="flex items-center gap-2.5 pl-3">
              <Icon name={howItWorks.summary.urgency.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
              <p className="text-xs font-semibold leading-snug text-white">
                {howItWorks.summary.urgency.textPre}
                <span className="font-bold text-hero-blue">{howItWorks.summary.urgency.textHighlight}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <h2 className="h2 uppercase">
              <span className="text-white">{howItWorks.titlePre}</span>
              <span className="text-hero-blue">{howItWorks.titleHighlight}</span>
            </h2>

            <div
              className="mt-8 grid items-stretch gap-3"
              style={{ gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr)" }}
            >
              {howItWorks.steps.map((s, i) => (
                <Fragment key={s.linePre}>
                  <div
                    className="glass-card-dark relative flex min-w-0 items-center gap-3 rounded-2xl px-5 py-3"
                    style={{ boxShadow: "0 15px 35px -20px rgba(0,0,0,0.5)" }}
                  >
                    <span className="relative ml-2 mt-2 shrink-0">
                      <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-hero-blue/15">
                        <Icon name={s.icon} className="h-9 w-9 text-hero-blue" />
                      </span>
                      <span className="absolute -left-4 -top-4 flex h-5 w-5 items-center justify-center rounded-full bg-hero-blue text-[10px] font-extrabold text-white">
                        {i + 1}
                      </span>
                    </span>
                    <p className="min-w-0 text-sm leading-tight">
                      <span className="block font-bold text-white">{s.linePre}</span>
                      <span className="block font-bold text-hero-blue">{s.lineHighlight}</span>
                    </p>
                  </div>
                  {i < howItWorks.steps.length - 1 && (
                    <span className="flex items-center text-xl text-white" aria-hidden="true">
                      →
                    </span>
                  )}
                </Fragment>
              ))}
            </div>

            <div className="glass-card-dark mt-6 flex items-stretch divide-x divide-white/10 rounded-2xl px-8 py-6">
              <div className="flex min-w-0 flex-1 items-center gap-4 pr-8">
                <Icon name={howItWorks.summary.timeframe.icon} className="h-12 w-12 shrink-0 text-hero-blue" />
                <p className="min-w-0 text-base leading-snug text-white">{howItWorks.summary.timeframe.text}</p>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-4 pl-8">
                <Icon name={howItWorks.summary.urgency.icon} className="h-12 w-12 shrink-0 text-hero-blue" />
                <p className="min-w-0 text-base leading-snug">
                  <span className="block font-bold text-white">{howItWorks.summary.urgency.textPre}</span>
                  <span className="block font-bold text-hero-blue">{howItWorks.summary.urgency.textHighlight}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
