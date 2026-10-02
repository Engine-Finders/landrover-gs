"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";

const GOLD = "text-[#c9a96e]";

function Specs({ it, compact = false }) {
  const rows = [
    { icon: "car", label: "Model", value: it.model },
    { icon: "gear", label: "Generation", value: it.generation },
    { icon: "tool", label: "Chassis", value: it.chassis },
    { icon: "calendar", label: "Years", value: it.years },
    { icon: "fuel", label: "Powertrain", value: it.powertrain },
  ].filter((r) => r.value);
  return (
    <div className={`glass-card-dark rounded-xl ${compact ? "px-4 py-2" : "px-6 py-3"}`} style={{ borderColor: "rgba(201,169,110,0.25)" }}>
      <div className="divide-y divide-white/10">
        {rows.map((r) => (
          <div key={r.label} className={`flex items-center gap-4 ${compact ? "py-2.5" : "py-3.5"}`}>
            <Icon name={r.icon} className={`${compact ? "h-6 w-6" : "h-8 w-8"} shrink-0 ${GOLD}`} />
            <div className="min-w-0 text-sm leading-snug">
              <p className="uppercase text-white/80">{r.label}</p>
              <p className="text-white">{r.value}</p>
            </div>
          </div>
        ))}
        <div className={`flex items-center gap-4 ${compact ? "py-3" : "py-4"}`}>
          <span className={`${compact ? "text-3xl" : "text-5xl"} font-extrabold ${GOLD}`}>£</span>
          <div>
            <p className="text-sm uppercase text-white">Starting from</p>
            <p className={`gold-text ${compact ? "text-2xl" : "text-4xl"} font-extrabold`}>{it.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tabs({ items, active, onChange }) {
  if (items.length < 2) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <button
          key={it.heading}
          type="button"
          onClick={() => onChange(i)}
          className={`rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
            i === active ? "border-[#c9a96e] bg-[#c9a96e]/15 text-[#e3c27d]" : "border-white/15 text-white/80 hover:border-white/40"
          }`}
        >
          {it.model}
        </button>
      ))}
    </div>
  );
}

export default function SecApps({ data }) {
  const [active, setActive] = useState(0);
  if (!data?.items?.length) return null;
  const it = data.items[active] || data.items[0];

  const head = (
    <h2 className="h2 italic uppercase">
      <span className="block text-white md:whitespace-nowrap">{data.titlePre}</span>
      <span className={`block md:whitespace-nowrap ${GOLD}`}>{data.titleHighlight}</span>
    </h2>
  );

  const detail = (compact) => (
    <>
      <p className={`${compact ? "text-lg" : "text-xl"} font-title font-bold italic uppercase leading-tight text-white`}>
        {it.title} <span className="text-hero-blue">{it.subtitle}</span>
      </p>
      <p className={`mt-3 text-sm leading-relaxed text-white/90`}>{it.body}</p>
    </>
  );

  const priceAndCta = (compact) => (
    <div className={`flex ${compact ? "flex-col" : "items-center"} gap-4`}>
      <div className="glass-card-dark rounded-xl px-6 py-4 text-center" style={{ borderColor: "rgba(201,169,110,0.25)" }}>
        <p className="text-xs uppercase tracking-wide text-white">Starting from:</p>
        <p className="gold-text text-4xl font-extrabold">{it.price}</p>
      </div>
      <Link
        href={it.href}
        className="flex items-center justify-center gap-2 rounded-lg border border-hero-blue/60 bg-hero-dark/60 px-5 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-hero-blue/20"
      >
        {it.ctaLabel} <span className="text-hero-blue" aria-hidden>→</span>
      </Link>
    </div>
  );

  const prompt = (compact) => (
    <div className={`glass-card-dark flex items-center gap-4 rounded-xl ${compact ? "p-4" : "px-6 py-5"}`} style={{ borderColor: "rgba(201,169,110,0.25)" }}>
      <Icon name="info" className={`${compact ? "h-7 w-7" : "h-9 w-9"} shrink-0 ${GOLD}`} />
      <p className="text-sm leading-relaxed text-white">{data.prompt}</p>
    </div>
  );

  return (
    <section className="theme-dark relative overflow-hidden bg-[#06090a]">
      {/* full-width background; 16:9 photo compressed to the section height (no cropping) */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image src={data.image} alt="" fill className="hidden object-fill md:block" sizes="100vw" />
        <div className="absolute inset-0 hidden bg-linear-to-r from-[#06090a]/85 via-[#06090a]/30 to-[#06090a]/70 md:block" />
      </div>

      {/* ===== mobile ===== */}
      <div className="relative space-y-5 px-4 py-8 md:hidden">
        {head}
        <span className="gold-rule block w-32" aria-hidden="true" />
        <Tabs items={data.items} active={active} onChange={setActive} />
        <div>{detail(true)}</div>
        <Specs it={it} compact />
        {priceAndCta(true)}
        {prompt(true)}
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-14 sm:px-6 md:block lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_18rem] items-center gap-10">
          <div className="max-w-xl">
            {head}
            <span className="gold-rule mt-4 block w-40" aria-hidden="true" />
            <div className="mt-6">
              <Tabs items={data.items} active={active} onChange={setActive} />
            </div>
            <div className="mt-6">{detail(false)}</div>
            <div className="mt-8">{priceAndCta(false)}</div>
            <div className="mt-8">{prompt(false)}</div>
          </div>
          <Specs it={it} />
        </div>
      </div>
    </section>
  );
}
