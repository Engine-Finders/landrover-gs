"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";

const MOBILE_VISIBLE_COUNT = 6;

export default function VariantSec5({ data }) {
  const [showAll, setShowAll] = useState(false);
  const mobileItems = showAll ? data.items : data.items.slice(0, MOBILE_VISIBLE_COUNT);

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-10 pt-7 md:hidden">
        <div className="flex items-center gap-2">
          <h2 className="h2 uppercase">
            {data.titlePre}
            <span className="text-hero-blue">{data.titleHighlight}</span>
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {mobileItems.map((it) => (
            <div key={it.number} className="neon-card neon-card--soft relative rounded-xl">
              <div className="relative aspect-[4/3]">
                <Image src={data.image} alt={it.label} fill className="object-cover" sizes="50vw" />
                <span className="absolute bottom-2 left-2 rounded-sm bg-hero-blue px-1.5 py-0.5 text-[9px] font-extrabold text-white">{it.number}</span>
              </div>
              <div className="px-2.5 py-2" style={{ background: "rgba(5,12,28,0.9)" }}>
                <p className="label-text font-extrabold uppercase leading-tight text-[#f3ead9]">{it.label}</p>
              </div>
            </div>
          ))}
        </div>

        {data.items.length > MOBILE_VISIBLE_COUNT && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="btn-text flex items-center gap-2 rounded-lg border border-hero-blue/60 bg-hero-dark/60 px-5 py-2.5 uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-hero-blue/10"
            >
              {showAll ? "View Less" : data.viewMoreLabel}
              <span className={`text-hero-blue transition-transform ${showAll ? "rotate-180" : ""}`} aria-hidden>
                ↓
              </span>
            </button>
          </div>
        )}

        <div className="glass-card-dark relative mt-5 flex items-center gap-3 overflow-hidden rounded-xl py-3.5 pl-4 pr-9">
          <Icon name="camera" className="h-6 w-6 shrink-0 text-white" />
          <p className="relative z-10 min-w-0 text-xs text-white">{data.footerNote}</p>

          <div
            className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1"
            style={{ height: "40px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
            aria-hidden="true"
          >
            <span className="h-full w-3" style={{ background: "var(--color-bmw-blue)" }} />
            <span className="h-full w-3" style={{ background: "var(--color-bmw-violet)" }} />
            <span className="h-full w-3" style={{ background: "var(--color-bmw-red)" }} />
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-start gap-3">
            <h2 className="h2 uppercase">
              {data.titlePre}
              <span className="text-hero-blue">{data.titleHighlight}</span>
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-4">
            {data.items.map((it) => (
              <div key={it.number} className="neon-card neon-card--soft relative rounded-xl">
                <div className="relative aspect-square">
                  <Image src={data.image} alt={it.label} fill className="object-cover" sizes="20vw" />
                  <span className="absolute bottom-2 left-2 rounded-sm bg-hero-blue px-2 py-1 text-[11px] font-extrabold text-white">{it.number}</span>
                </div>
                <div className="px-3 py-2.5 backdrop-blur-md" style={{ background: "rgba(5,12,28,0.9)" }}>
                  <p className="label-text font-extrabold uppercase leading-tight text-[#f3ead9]">{it.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/land-rover-inside-our-workshop" className="flex items-center gap-2 rounded-lg border border-hero-blue/60 bg-hero-dark/60 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-hero-blue/10">
              {data.viewMoreLabel} <span className="text-hero-blue" aria-hidden>→</span>
            </Link>
          </div>

          <div className="glass-card-dark relative mt-6 flex items-center justify-between gap-3 overflow-hidden rounded-xl px-6 py-5">
            <div className="relative z-10 flex items-center gap-3">
              <Icon name="camera" className="h-8 w-8 shrink-0 text-white" />
              <p className="text-sm text-white">{data.footerNote}</p>
            </div>

            <div
              className="pointer-events-none absolute bottom-0 right-0 z-0 flex gap-1.5"
              style={{ height: "70px", transform: "skewX(-25deg)", transformOrigin: "bottom right" }}
              aria-hidden="true"
            >
              <span className="h-full w-5" style={{ background: "var(--color-bmw-blue)" }} />
              <span className="h-full w-5" style={{ background: "var(--color-bmw-violet)" }} />
              <span className="h-full w-5" style={{ background: "var(--color-bmw-red)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
