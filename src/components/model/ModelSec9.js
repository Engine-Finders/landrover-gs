"use client";

import Link from "next/link";
import useRegLookup from "@/components/reusable/useRegLookup";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import RegLookupGlass from "@/components/reusable/RegLookupGlass";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import RegPlate from "@/components/reusable/RegPlate";
import { useQuoteModal } from "@/components/shared/QuoteModal";

const BROWSE_HREFS = ["#model-year-coverage", "/engines", "/engines", "/engines", "#variant-coverage"];

export default function ModelSec9({ data }) {
  const [line1, line2] = data.h2.split("|");
  const { reg, setReg, loading, error, submit } = useRegLookup();
  const { open: openQuote } = useQuoteModal();

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        {/* 70/30 split: text gets the left 70%, the photo's right edge (technician at the lookup
            screen) shows in the remaining 30%. Uses the desktop photo - the mobile crop has a blank
            white panel baked in behind the technician. Box grows with the text, min 16rem. */}
        <div className="relative min-h-64 pb-2">
          <Image src={data.image} alt="Technician running registration and engine diagnostics on a computer beside a Land Rover Defender" fill className="object-cover object-right-top" sizes="100vw" />
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/85 via-55% to-transparent to-80%" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-(--theme-light-bg)" />

          <div className="relative max-w-[70%] pl-6 pr-2 pt-6">
            <LandRoverStripe className="h-4 w-8" />
            <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase" style={{ fontSize: "34px" }}>
              <span className="block text-[#101828]">{line1}</span>{" "}
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <span className="mt-3 block h-px w-16 bg-hero-blue/50" />
            <p className="body-text mt-3 text-[#101828]">{data.subhead}</p>
          </div>
        </div>

        <div className="relative px-4 pb-8">
          {/* reg lookup card */}
          <form
            onSubmit={submit}
            className="relative mt-2 rounded-2xl p-5"
            style={{
              background: "var(--theme-light-bg)",
              boxShadow: "0 0 0 1px rgba(16,24,40,0.12), 0 16px 34px -12px rgba(16,24,40,0.35)",
            }}
          >
            <RegPlate value={reg} onChange={setReg} heightClass="[--ph:72px]" className="max-w-none!" ariaLabel="Vehicle registration" />

            {error && <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="btn-text mt-3 flex h-16 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark uppercase text-white shadow-[0_10px_25px_-8px_rgba(96,112,86,0.7)] disabled:cursor-wait disabled:opacity-70 transition duration-200 hover:-translate-y-0.5 hover:brightness-110">
              <Icon name="search" className="h-6 w-6" />
              {loading ? "Searching…" : data.lookupButton}
            </button>

            <div className="mt-3 flex items-start gap-2 border-t border-black/10 pt-3">
              <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
              <p className="text-xs leading-snug text-[#101828]">{data.apiNote}</p>
            </div>
          </form>

          {/* divider */}
          <div className="relative mt-6 flex items-center">
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(96,112,86,0.4))" }} />
            <p className="label-text relative px-4 font-extrabold uppercase tracking-widest text-[#101828]">
              {data.dividerLabel}
              <span
                className="pointer-events-none absolute left-1/2 top-full h-1.5 w-14 -translate-x-1/2 translate-y-2"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(143,160,131,0.9) 40%, rgba(96,112,86,0.4) 65%, transparent 85%)",
                  boxShadow: "0 0 15px rgba(143,160,131,0.8), 0 0 4px rgba(255,255,255,0.9)",
                }}
              />
            </p>
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(96,112,86,0.4), transparent)" }} />
          </div>

          {/* browse grid */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            {data.browseCards.map((c, i) => (
              <button
                type="button"
                onClick={() => openQuote({ heading: "Find Out Your Car Details" })}
                key={c.label}
                className={`relative flex items-center justify-between gap-2 rounded-xl bg-white/70 px-4 py-4 text-left backdrop-blur-2xl ${i === 4 ? "col-span-2" : ""} transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg`}
                style={{
                  boxShadow: "0 0 0 1px rgba(16,24,40,0.1), inset 0 1px 0 rgba(255,255,255,0.9), 0 6px 18px -8px rgba(16,24,40,0.18)",
                }}
              >
                <span className="flex items-center gap-2">
                  <Icon name={c.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <span className="label-text font-extrabold uppercase tracking-wide text-[#101828]">{c.label}</span>
                </span>
                <span className="text-hero-blue" aria-hidden>
                  ›
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center">
            <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="text-xs text-[#101828]">{data.footerNote}</p>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 pb-10 pt-16 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Technician running registration and engine diagnostics on a computer beside a Land Rover Defender" fill className="object-cover object-[80%_10%]" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-lg pt-8">
          <LandRoverStripe className="h-4.5 w-9" />
          <div role="heading" aria-level="2" className="h2 origin-left scale-y-110 scale-x-90 mt-3 uppercase">
            <span className="block text-[#101828]">{line1}</span>{" "}
            <span className="block text-hero-blue">{line2}</span>
          </div>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />
          <p className="body-text mt-4 max-w-md text-[#101828]">{data.subhead}</p>
        </div>

        {/* faint blurred blue blobs so the glass cards below have a whisper of color to refract */}
        <div className="pointer-events-none absolute left-[20%] top-[38%] h-56 w-56 rounded-full bg-hero-blue/12 blur-3xl" />
        <div className="pointer-events-none absolute right-[8%] top-[55%] h-48 w-48 rounded-full bg-hero-blue/10 blur-3xl" />

        {/* reg lookup card - proportions taken from the reference (846px wide card) */}
        <div
          className="relative mt-10 grid items-center overflow-hidden rounded-3xl bg-white/60 backdrop-blur-2xl"
          style={{
            containerType: "inline-size",
            gridTemplateColumns: "386fr 150fr 207fr",
            columnGap: "2.4%",
            padding: "2.7% 5.1% 2.7% 2.4%",
            boxShadow:
              "0 0 0 1px rgba(16,24,40,0.12), inset 0 1px 0 rgba(255,255,255,0.95), 0 12px 30px -10px rgba(16,24,40,0.2), 0 0 20px -6px rgba(255,255,255,0.9)",
          }}
        >
          <RegLookupGlass buttonLabel={data.lookupButton} />

          <div className="flex items-start gap-3 border-l border-black/15 py-3" style={{ paddingLeft: "2.4cqw" }}>
            <Icon name="info" className="h-6 w-6 shrink-0 text-hero-blue" />
            <p className="text-sm leading-relaxed text-[#101828]">
              {data.apiNote.split(/(?<=\.)\s+/).map((t, i) => (
                <span key={i} className="block">{t}</span>
              ))}
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="relative mt-8 flex items-center">
          <span
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, transparent, rgba(96,112,86,0.4))" }}
          />
          <p className="relative px-5 text-xs font-extrabold uppercase tracking-widest text-[#101828]">
            {data.dividerLabel}
            <span
              className="pointer-events-none absolute left-1/2 top-full h-1.5 w-16 -translate-x-1/2 translate-y-2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(143,160,131,0.9) 40%, rgba(96,112,86,0.4) 65%, transparent 85%)",
                boxShadow: "0 0 15px rgba(143,160,131,0.8), 0 0 4px rgba(255,255,255,0.9)",
              }}
            />
          </p>
          <span
            className="h-px flex-1"
            style={{ background: "linear-gradient(90deg, rgba(96,112,86,0.4), transparent)" }}
          />
        </div>

        {/* browse grid */}
        <div className="mt-5 grid grid-cols-5 gap-4">
          {data.browseCards.map((c, i) => (
            <Link
              href={BROWSE_HREFS[i] || "/engines"}
              key={c.label}
              className="glass-card relative flex items-center justify-between gap-2 rounded-xl px-4 py-6 text-left transition hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-2">
                <Icon name={c.icon} className="h-5 w-5 shrink-0 text-hero-blue" />
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#101828]">{c.label}</span>
              </span>
              <span className="text-hero-blue" aria-hidden>›</span>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          <Icon name="info" className="h-4 w-4 shrink-0 text-hero-blue" />
          <p className="text-xs text-[#101828]">{data.footerNote}</p>
        </div>
      </div>
      </div>
    </section>
  );
}
