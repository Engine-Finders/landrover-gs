"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import GbBadge from "@/components/reusable/GbBadge";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import AMGBadge from "@/components/reusable/AMGBadge";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

const HEX_POINTS = "50,2 96,25 96,75 50,98 4,75 4,25";

function HexIcon({ icon, boxClass, iconClass, strokeOpacity = 1, strokeWidth = 4 }) {
  return (
    <div className={`relative shrink-0 ${boxClass}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon points={HEX_POINTS} fill="none" stroke="#607056" strokeOpacity={strokeOpacity} strokeWidth={strokeWidth} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={icon} className={`${iconClass} text-hero-blue`} />
      </div>
    </div>
  );
}

function OptionAccent({ className = "" }) {
  return (
    <span className={`mt-1.5 flex items-center gap-1 ${className}`} aria-hidden="true">
      <span className="h-0.5 w-6 bg-hero-blue" />
      <span
        className="h-0.5 w-6"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-bmw-red) 0px, var(--color-bmw-red) 3px, transparent 3px, transparent 6px)" }}
      />
    </span>
  );
}

function FaqCard({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white/80 p-5 shadow-[0_15px_40px_-25px_rgba(16,24,40,0.4)] backdrop-blur-md">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 text-left">
        <span className="flex-1 text-sm font-medium text-[#101828]">{item.q}</span>
        <span
          className={`relative flex h-5 w-5 shrink-0 items-center justify-center transition-transform ${isOpen ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          <span className="absolute h-4 w-0.5 rounded-full bg-hero-blue" />
          <span className="absolute h-0.5 w-4 rounded-full bg-hero-blue" />
        </span>
      </button>
      {isOpen && <p className="mt-2 text-sm leading-relaxed text-[#101828]">{item.a}</p>}
    </div>
  );
}

function Field({ label, placeholder, type = "text", compact = false }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-white">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-hero-blue ${
          compact ? "mt-1.5 h-11" : "mt-2 h-12"
        }`}
      />
    </label>
  );
}

export default function Sec11({ data }) {
  const { costBanner, comparison, options, faq, quote } = data;
  const [openIndex, setOpenIndex] = useState(new Set());

  function toggle(i) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Lead form — dev to wire up submission endpoint.
  }

  return (
    <>
      {/* ============ engine rebuild cost ============ */}
      <section className="theme-dark relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pt-7 md:hidden">
          <div className="flex items-center gap-2">
            <LandRoverLogo className="h-7 w-7" />
            <AMGBadge className="h-3.5" />
          </div>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-hero-blue">{costBanner.titlePre}</p>
          <h2 className="h2 mt-1 uppercase">
            <span className="text-white">{costBanner.titleHighlight}</span>
            <span className="text-hero-blue">{costBanner.titlePost}</span>
          </h2>
          <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
        </div>

        <div className="relative mt-4 aspect-4/3 w-full overflow-hidden md:hidden">
          <Image src={costBanner.imageMobile} alt="Land Rover engine" fill className="object-cover" sizes="100vw" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-10"
            style={{ background: "linear-gradient(to bottom, #0d0d0d 0%, transparent 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
            style={{ background: "linear-gradient(to top, #0d0d0d 0%, transparent 100%)" }}
          />
        </div>

        <div className="relative px-4 pb-7 md:hidden">
          <div className="mt-4 space-y-3 text-xs leading-relaxed text-white">
            {costBanner.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="glass-card-dark mt-4 flex items-center justify-between rounded-xl px-4 py-3.5">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-white/70">{costBanner.startingFromLabel}</p>
              <p className="text-2xl font-extrabold text-hero-blue">{costBanner.startingFromPrice}</p>
            </div>
            <Icon name="engine" className="h-8 w-8 text-hero-blue" />
          </div>
        </div>

        {/* ===== desktop — full-bleed photo (built-in empty portion on the left for text) ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={costBanner.image} alt="Land Rover engine" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.9) 45%, rgba(13,13,13,0.55) 62%, rgba(13,13,13,0.15) 78%, transparent 92%)" }}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <div className="flex items-center gap-3">
                <LandRoverLogo className="h-9 w-9" />
                <AMGBadge className="h-4" />
              </div>
              <p className="mt-3 text-sm font-bold uppercase tracking-widest text-hero-blue">{costBanner.titlePre}</p>
              <h2 className="h2 mt-1 uppercase">
                <span className="text-white">{costBanner.titleHighlight}</span>
                <span className="text-hero-blue">{costBanner.titlePost}</span>
              </h2>
              <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-hero-blue via-white to-hero-blue" />

              <div className="mt-5 space-y-3 text-sm leading-relaxed text-white">
                {costBanner.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="glass-card-dark mt-6 flex w-fit items-center gap-6 rounded-xl px-6 py-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">{costBanner.startingFromLabel}</p>
                  <p className="text-4xl font-extrabold text-hero-blue">{costBanner.startingFromPrice}</p>
                </div>
                <span className="h-10 w-px bg-white/15" aria-hidden="true" />
                <Icon name="engine" className="h-10 w-10 text-hero-blue" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ rebuild vs replacement vs used ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <p className="text-xs font-bold uppercase tracking-widest text-hero-blue">{comparison.titlePre}</p>
          <h2 className="h2 mt-1 uppercase text-[#101828]">{comparison.titleHighlight}</h2>
          <span className="mt-2 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />

          <div className="mt-5 space-y-4">
            {comparison.cards.map((c, i) => (
              <div key={i} className="glass-card rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <HexIcon icon={c.icon} boxClass="h-12 w-12" iconClass="h-6 w-6" />
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold uppercase leading-tight text-[#101828]">
                      {c.title} <span className="text-hero-blue">{c.titleHighlight}</span>
                    </p>
                    <OptionAccent />
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#4a5568]">{c.body}</p>
              </div>
            ))}
          </div>

          <a
            href={comparison.cta.href}
            className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-hero-dark px-4 py-3.5 text-xs font-bold uppercase text-white"
          >
            {comparison.cta.label}
          </a>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-14 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-bold uppercase tracking-widest text-hero-blue">{comparison.titlePre}</p>
            <h2 className="h2 mt-1 uppercase text-[#101828]">{comparison.titleHighlight}</h2>
            <span className="mt-4 block h-0.5 w-40 bg-linear-to-r from-hero-blue via-white to-hero-blue" />

            <div className="mt-8 grid grid-cols-3 gap-6">
              {comparison.cards.map((c, i) => (
                <div key={i} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <HexIcon icon={c.icon} boxClass="h-14 w-14" iconClass="h-7 w-7" />
                    <div className="min-w-0">
                      <p className="text-base font-extrabold uppercase leading-tight text-[#101828]">
                        {c.title} <span className="text-hero-blue">{c.titleHighlight}</span>
                      </p>
                      <OptionAccent />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#4a5568]">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <a href={comparison.cta.href} className="flex items-center justify-center gap-2 rounded-lg bg-hero-dark px-8 py-4 text-sm font-bold uppercase text-white">
                {comparison.cta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ reconditioned / refurbished / remanufactured ============ */}
      <section className="theme-dark relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="px-4 py-7 md:hidden">
          <div className="space-y-3">
            {options.map((o, i) => (
              <div key={i} className="glass-card-dark rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <HexIcon icon={o.icon} boxClass="h-14 w-14" iconClass="h-7 w-7" />
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold uppercase leading-tight text-white">{o.titlePre}</p>
                    <p className="text-sm font-extrabold uppercase leading-tight">
                      <span className="text-hero-blue">{o.titleHighlight}</span>
                      <span className="text-white">{o.titlePost}</span>
                    </p>
                    <OptionAccent />
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white">{o.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10">
            {options.map((o, i) => (
              <div key={i} className={i === 0 ? "pr-8" : i === options.length - 1 ? "pl-8" : "px-8"}>
                <div className="flex items-center gap-4">
                  <HexIcon icon={o.icon} boxClass="h-20 w-20" iconClass="h-10 w-10" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <LandRoverStripe className="h-5 w-10 shrink-0" />
                      <span className="text-base font-extrabold uppercase leading-tight text-white">{o.titlePre}</span>
                    </div>
                    <p className="text-base font-extrabold uppercase leading-tight">
                      <span className="text-hero-blue">{o.titleHighlight}</span>
                      <span className="text-white">{o.titlePost}</span>
                    </p>
                    <OptionAccent />
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ faq ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hero-blue">
              <Icon name="note" className="h-4 w-4 text-hero-blue" />
            </span>
            <h2 className="h2 uppercase">
              <span className="text-[#101828]">{faq.kicker} </span>
              <span className="text-hero-blue">{faq.kickerHighlight}</span>
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            {[...faq.faqLeft, ...faq.faqRight].map((item, i) => (
              <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hero-blue">
                <Icon name="note" className="h-5 w-5 text-hero-blue" />
              </span>
              <h2 className="h2 uppercase">
                <span className="text-[#101828]">{faq.kicker} </span>
                <span className="text-hero-blue">{faq.kickerHighlight}</span>
              </h2>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                {faq.faqLeft.map((item, i) => (
                  <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
                ))}
              </div>
              <div className="space-y-4">
                {faq.faqRight.map((item, i) => {
                  const idx = faq.faqLeft.length + i;
                  return <FaqCard key={item.q} item={item} isOpen={openIndex.has(idx)} onToggle={() => toggle(idx)} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ quote form ============ */}
      <section className="theme-dark relative overflow-hidden" id="quote-form">
        {/* ===== mobile ===== */}
        <div className="px-4 py-7 md:hidden">
          <div className="flex items-start gap-3">
            <HexIcon icon={quote.icon} boxClass="h-14 w-14" iconClass="h-5 w-5" strokeOpacity={0.45} strokeWidth={3} />
            <h2 className="h2 uppercase">
              <span className="block text-white">{quote.headlinePre}</span>
              <span className="block text-hero-blue">{quote.headlineHighlight}</span>
              <span className="block text-white">{quote.headlinePost}</span>
            </h2>
          </div>
          <span className="ml-17 mt-2 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
          <p className="mt-2 text-xs text-white/70">{quote.subtext}</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">{quote.fields.reg.label}</span>
              <div className="mt-1.5 flex h-11 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                <GbBadge className="w-12" />
                <input
                  type="text"
                  placeholder={quote.fields.reg.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </label>
            <Field label={quote.fields.postcode.label} placeholder={quote.fields.postcode.placeholder} compact />
            <Field label={quote.fields.name.label} placeholder={quote.fields.name.placeholder} compact />
            <Field label={quote.fields.phone.label} placeholder={quote.fields.phone.placeholder} type="tel" compact />
            <Field label={quote.fields.email.label} placeholder={quote.fields.email.placeholder} type="email" compact />
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">{quote.fields.enquiry.label}</span>
              <div className="relative mt-1.5">
                <select className="h-11 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm text-white outline-none">
                  <option>{quote.fields.enquiry.placeholder}</option>
                </select>
                <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
              </div>
            </label>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #607056 0%, #4c5a45 100%)", boxShadow: "0 8px 20px rgba(96,112,86,0.4)" }}
            >
              {quote.submitLabel} <span aria-hidden>→</span>
            </button>
          </form>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-14 sm:px-6 md:block lg:px-8">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-14">
            <div>
              <div className="flex items-start gap-4">
                <HexIcon icon={quote.icon} boxClass="h-20 w-20" iconClass="h-8 w-8" strokeOpacity={0.45} strokeWidth={3} />
                <h2 className="h2 uppercase">
                  <span className="block text-white">{quote.headlinePre}</span>
                  <span className="block text-hero-blue">{quote.headlineHighlight}</span>
                  <span className="block text-white">{quote.headlinePost}</span>
                </h2>
              </div>
              <span className="ml-24 mt-4 block h-0.5 w-32 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
              <p className="mt-4 text-sm text-white/70">{quote.subtext}</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-white">{quote.fields.reg.label}</span>
                <div className="mt-2 flex h-12 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                  <GbBadge className="w-12" />
                  <input
                    type="text"
                    placeholder={quote.fields.reg.placeholder}
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                  />
                </div>
              </label>
              <Field label={quote.fields.postcode.label} placeholder={quote.fields.postcode.placeholder} />
              <Field label={quote.fields.name.label} placeholder={quote.fields.name.placeholder} />
              <Field label={quote.fields.phone.label} placeholder={quote.fields.phone.placeholder} type="tel" />
              <Field label={quote.fields.email.label} placeholder={quote.fields.email.placeholder} type="email" />
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-white">{quote.fields.enquiry.label}</span>
                <div className="relative mt-2">
                  <select className="h-12 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm text-white outline-none">
                    <option>{quote.fields.enquiry.placeholder}</option>
                  </select>
                  <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                </div>
              </label>

              <button
                type="submit"
                className="col-span-2 mt-2 flex items-center justify-center gap-2 rounded-lg py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
                style={{ background: "linear-gradient(135deg, #607056 0%, #4c5a45 100%)", boxShadow: "0 8px 20px rgba(96,112,86,0.4)" }}
              >
                {quote.submitLabel} <span aria-hidden>→</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
