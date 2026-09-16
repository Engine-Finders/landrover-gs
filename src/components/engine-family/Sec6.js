"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import RegLookupForm from "@/components/reusable/RegLookupForm";

function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z" />
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 010-4.56V6.61H1.27a12 12 0 000 10.78z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function CtaLabel({ text }) {
  const i = text.lastIndexOf(" ");
  return (
    <>
      {text.slice(0, i + 1)}
      <span className="text-hero-blue">{text.slice(i + 1)}</span>
    </>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className="h-3.5 w-3.5 fill-[#f5c518] text-[#f5c518]" />
      ))}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div>
      <LandRoverStripe className="float-left mr-3 mt-1.5 h-10 w-16 shrink-0" />
      {children}
    </div>
  );
}

export default function Sec6({ data }) {
  const { reviews, coverage, whyChoose } = data;
  const whyChooseWords = [
    ...whyChoose.titlePre.trim().split(/\s+/).map((w) => ({ w, highlight: false })),
    ...whyChoose.titleHighlight.trim().split(/\s+/).map((w) => ({ w, highlight: true })),
  ];
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    setActiveIndex(Math.round(ratio * (reviews.items.length - 1)));
  }

  return (
    <>
      {/* ============ reviews ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative md:hidden">
          <div className="relative px-4 pb-8 pt-8">
          <div className="overflow-hidden">
            <LandRoverStripe className="float-left mr-2 mt-0.5 h-6 w-12 shrink-0" />
            <h2 className="h2 uppercase">
              <span className="text-[#101828]">{reviews.titlePre}</span>
              <span className="text-hero-blue">{reviews.titleHighlight}</span>
            </h2>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
          >
            {reviews.items.map((r) => (
              <div
                key={r.name}
                className="glow-card--sm relative flex min-h-56 w-[82%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl p-5"
                style={{ background: "rgba(13,13,13,0.95)", border: "1px solid rgba(173,135,92,0.35)", boxShadow: "0 15px 35px -20px rgba(0,0,0,0.5)" }}
              >
                <div className="relative flex items-center justify-between">
                  <Stars />
                  {r.platform === "google" ? <GoogleG className="h-5 w-5" /> : <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />}
                </div>
                <p className="mt-3 text-base font-bold text-white">{r.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-auto pt-3 text-xs font-bold uppercase tracking-wide text-hero-blue">{r.tag}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-1.5">
            {reviews.items.map((r, i) => (
              <span
                key={r.name}
                className={`rounded-full transition-all ${i === activeIndex ? "h-2 w-6 bg-hero-blue" : "h-2 w-2 bg-[#101828]/15"}`}
              />
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <button className="relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-[#101828] shadow-sm transition hover:-translate-y-0.5">
              <GoogleG className="h-5 w-5" />
              <CtaLabel text={reviews.googleCta} /> <span aria-hidden className="text-hero-blue">→</span>
            </button>
            <button className="relative flex w-full items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-[#101828] shadow-sm transition hover:-translate-y-0.5">
              <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
              <CtaLabel text={reviews.trustpilotCta} /> <span aria-hidden className="text-hero-blue">→</span>
            </button>
          </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <SectionTitle>
              <h2 className="h2 uppercase">
                <span className="text-[#101828]">{reviews.titlePre}</span>
                <span className="text-hero-blue">{reviews.titleHighlight}</span>
              </h2>
            </SectionTitle>

            <div className="relative mt-6 px-11">
            <button
              type="button"
              aria-label="Previous reviews"
              className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-hero-blue shadow-lg transition hover:bg-hero-blue hover:text-white"
            >
              <Icon name="chevron-left" className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-hero-blue shadow-lg transition hover:bg-hero-blue hover:text-white"
            >
              <Icon name="chevron-right" className="h-4 w-4" />
            </button>
            <div className="grid grid-cols-5 gap-3">
              {reviews.items.map((r) => (
                <div
                  key={r.name}
                  className="glow-card--sm relative flex min-h-64 flex-col overflow-hidden rounded-xl p-4"
                  style={{ background: "rgba(13,13,13,0.95)", border: "1px solid rgba(173,135,92,0.35)", boxShadow: "0 15px 35px -20px rgba(0,0,0,0.5)" }}
                >
                  <div className="relative flex items-center justify-between">
                    <Stars />
                    {r.platform === "google" ? <GoogleG className="h-4 w-4" /> : <Icon name="star" className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" />}
                  </div>
                  <p className="mt-3 text-sm font-bold text-white">{r.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white">&ldquo;{r.text}&rdquo;</p>
                  <p className="mt-auto pt-3 text-[11px] font-bold uppercase tracking-wide text-hero-blue">{r.tag}</p>
                </div>
              ))}
            </div>
            </div>

            <div className="mt-5 flex justify-center gap-4">
              <button className="relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#101828] shadow-sm transition hover:-translate-y-0.5">
                <GoogleG className="h-5 w-5" />
                <CtaLabel text={reviews.googleCta} /> <span aria-hidden className="text-hero-blue">→</span>
              </button>
              <button className="relative flex items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-6 py-3 text-sm font-bold text-[#101828] shadow-sm transition hover:-translate-y-0.5">
                <Icon name="star" className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
                <CtaLabel text={reviews.trustpilotCta} /> <span aria-hidden className="text-hero-blue">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ coverage banner ============ */}
      <section
        className="relative z-10 border-y border-black/10 bg-white"
        style={{ boxShadow: "0 25px 45px -15px rgba(16,24,40,0.55), 0 -25px 45px -15px rgba(16,24,40,0.55)" }}
      >
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-6 md:hidden">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-white shadow-sm">
              <Icon name={coverage.icon} className="h-6 w-6 text-hero-blue" />
            </span>
            <h4 className="h4 uppercase">
              <span className="block text-[#101828]">{coverage.titlePre}</span>
              <span className="block text-hero-blue">{coverage.titleHighlight}</span>
            </h4>
          </div>

          <p className="mt-3 text-xs text-[#101828]">{coverage.body}</p>

          <div className="mt-4">
            <RegLookupForm buttonLabel={coverage.buttonLabel} stacked hideButton />
            <button
              type="button"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-sm border-2 border-hero-blue bg-hero-blue text-sm font-bold text-white transition-colors hover:bg-white hover:text-hero-blue"
            >
              {coverage.buttonLabel} →
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            {coverage.ticks.map((t) => (
              <span key={t} className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[#101828]">
                <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={coverage.image} alt="Land Rover front grille" fill className="object-cover object-right" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-r from-white via-white/95 to-transparent" />
          </div>

          <div className="relative mx-auto flex max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:px-8">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm">
              <Icon name={coverage.icon} className="h-8 w-8 text-hero-blue" />
            </span>

            <div className="shrink-0 border-r border-black/10 pr-8">
              <h2 className="h2 uppercase">
                <span className="block text-[#101828]">{coverage.titlePre}</span>
                <span className="block text-hero-blue">{coverage.titleHighlight}</span>
              </h2>
              <p className="mt-2 max-w-xs text-sm text-[#101828]">{coverage.body}</p>
            </div>

            <div className="max-w-md flex-1">
              <RegLookupForm buttonLabel={coverage.buttonLabel} row />
              <div className="mt-3 flex items-center gap-4">
                {coverage.ticks.map((t, i) => (
                  <span key={t} className="flex items-center gap-3 text-sm font-medium text-[#101828]">
                    {i > 0 && <span className="h-1 w-1 rounded-full bg-[#101828]/30" aria-hidden="true" />}
                    <span className="flex items-center gap-1.5">
                      <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                      {t}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ why choose us ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <h2 className="h2 uppercase">
            <LandRoverStripe className="float-left mr-2 mt-0.5 h-6 w-12 shrink-0" />
            {whyChooseWords.map((t, i) => (
              <span key={i} className={t.highlight ? "text-hero-blue" : "text-[#101828]"}>
                {t.w}
                {i < whyChooseWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4">
            {whyChoose.items.map((item) => (
              <div key={item.title} className="flex items-center gap-2">
                <Icon name={item.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                <div>
                  <p className="text-xs font-bold leading-snug text-[#101828]">{item.title}</p>
                  <p className="text-[10px] leading-snug text-[#4a5568]">{item.subtext}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card relative mt-5 grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-stretch overflow-hidden rounded-xl">
            <div className="relative z-10 flex items-start gap-3 p-4">
              <Icon name={whyChoose.notice.icon} className="mt-0.5 h-6 w-6 shrink-0 text-hero-blue" />
              <p className="text-xs leading-snug text-[#101828]">
                <span className="font-semibold">{whyChoose.notice.line1}</span> {whyChoose.notice.line2}
              </p>
            </div>
            <div className="relative overflow-hidden bg-(--theme-light-bg)">
              <Image src={whyChoose.notice.image} alt="" fill className="object-cover opacity-25" sizes="140px" />
              <div className="absolute inset-0 bg-linear-to-r from-white via-white/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <SectionTitle>
              <h2 className="h2 uppercase">
                <span className="text-[#101828]">{whyChoose.titlePre}</span>
                <span className="text-hero-blue">{whyChoose.titleHighlight}</span>
              </h2>
            </SectionTitle>

            <div className="mt-8 grid grid-cols-3 gap-x-10 gap-y-6">
              {whyChoose.items.map((item) => (
                <div key={item.title} className="flex min-w-0 items-center gap-3">
                  <Icon name={item.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                  <div className="min-w-0">
                    <p className="min-w-0 text-sm font-bold leading-snug text-[#101828]">{item.title}</p>
                    <p className="min-w-0 text-xs leading-snug text-[#4a5568]">{item.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card relative mt-8 grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] items-stretch overflow-hidden rounded-2xl">
              <div className="relative z-10 flex items-center gap-4 px-6 py-5">
                <Icon name={whyChoose.notice.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
                <p className="text-sm leading-relaxed text-[#101828]">
                  <span className="font-semibold">{whyChoose.notice.line1}</span> {whyChoose.notice.line2}
                </p>
              </div>
              <div className="relative overflow-hidden bg-(--theme-light-bg)">
                <Image src={whyChoose.notice.image} alt="" fill className="object-cover opacity-25" sizes="320px" />
                <div className="absolute inset-0 bg-linear-to-r from-white via-white/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
