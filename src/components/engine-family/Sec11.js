"use client";

import { useState } from "react";
import Image from "next/image";
import EdgeFade from "@/components/reusable/EdgeFade";
import useLeadForm, { LeadStatus } from "@/components/reusable/useLeadForm";
import Icon from "@/components/reusable/Icon";
import GbBadge from "@/components/reusable/GbBadge";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

const GOLD = "text-[#c9a96e]";

const COMPARISON_BULLETS = [
  ["Strip down & inspect", "Pressure-test", "Replace worn components", "12-month unlimited-mileage warranty"],
  ["Supplied & fitted by our team", "OEM quality", "12-month unlimited-mileage warranty"],
  ["Low-mileage units", "Quick turnaround", "Condition risk — we advise honestly"],
];

const TERMS = [
  { icon: "cog", term: "Rebuilt:", text: "Existing engine stripped, inspected and rebuilt to original specification." },
  { icon: "refresh", term: "Reconditioned:", text: "Broad industry term; we define our rebuild as a full strip and rebuild." },
  { icon: "shield-check", term: "Remanufactured:", text: "Usually implies a defined restoration process; our rebuild meets this standard." },
  { icon: "calendar", term: "Used:", text: "Existing engine from another vehicle; we can source and fit these." },
];

function GoldRing({ icon, compact = false }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#0f1a13] ${compact ? "h-11 w-11" : "h-16 w-16"}`}
      style={{ boxShadow: "0 0 0 1.5px rgba(201,169,110,0.7), 0 0 18px -2px rgba(201,169,110,0.35)" }}
    >
      <Icon name={icon} className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-white`} />
    </span>
  );
}

function Bullets({ items = [] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((b) => (
        <li key={b} className="flex items-center gap-2.5 text-sm text-white">
          <Icon name="check" className="h-4 w-4 shrink-0 rounded-full border border-[#c9a96e] p-0.5 text-[#c9a96e]" />
          {b}
        </li>
      ))}
    </ul>
  );
}

function PriceFactors({ items = [], compact = false }) {
  if (!items.length) return null;
  return (
    <div
      className={`rounded-xl border border-black/10 ${compact ? "mt-4 p-4" : "p-5"}`}
      style={{ background: "rgba(255,255,255,0.96)", boxShadow: "0 18px 40px -18px rgba(16,24,40,0.45)" }}
    >
      <p className={`font-title text-base font-bold italic uppercase ${GOLD}`}>Price Factors</p>
      <ul className="mt-3 divide-y divide-black/8">
        {items.map((f) => (
          <li key={f} className="flex items-start gap-3 py-2.5 text-xs leading-snug text-[#101828]">
            <Icon name="engine" className="h-5 w-5 shrink-0 text-[#8a7445]" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OptionIcon({ icon, compact = false }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${compact ? "h-10 w-10" : "h-14 w-14"}`}>
      <Icon name={icon} className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-[#16241a]`} />
    </span>
  );
}

function Terminology({ compact = false }) {
  return (
    <div className={`glass-card rounded-xl ${compact ? "p-4" : "p-7"}`}>
      <p className="font-title text-base font-bold italic uppercase text-[#101828]">Terminology Explained</p>
      <span className="gold-rule mt-2 block w-20" aria-hidden="true" />
      <div className="mt-4 space-y-4">
        {TERMS.map((t) => (
          <div key={t.term} className="flex gap-3">
            <Icon name={t.icon} className="h-6 w-6 shrink-0 text-[#8a7445]" />
            <div>
              <p className="text-sm font-bold text-[#101828]">{t.term}</p>
              <p className="text-xs leading-relaxed text-[#101828]">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RebuildMeaning({ compact = false }) {
  return (
    <div className={`glass-card flex items-center gap-5 rounded-xl ${compact ? "p-4" : "px-7 py-5"}`}>
      <Icon name="shield-check" className={`${compact ? "h-8 w-8" : "h-10 w-10"} shrink-0 text-[#16241a]`} />
      <div className="min-w-0 flex-1">
        <p className="font-title text-sm font-bold italic uppercase text-[#101828]">What Land Rover Garage means by &ldquo;rebuild&rdquo;</p>
        <p className="mt-1 text-sm leading-relaxed text-[#101828]">
          Full strip-down, inspection, measurement, machining where required, replacement of worn components, reassembly, testing, and refit — with a
          12-month unlimited-mileage warranty.
        </p>
      </div>
      {!compact && (
        <div className="flex shrink-0 items-center gap-4">
          <LandRoverLogo className="h-12 w-20" />
          <p className="text-sm font-bold uppercase leading-tight text-[#101828]">
            Built to last.
            <br />
            Backed by experts.
          </p>
        </div>
      )}
    </div>
  );
}

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


const QUOTE_BENEFITS = [
  { icon: "price", title: "Fixed price", text: "Transparent quotes with no hidden extras." },
  { icon: "shield-check", title: "12-month warranty", text: "Unlimited mileage for total peace of mind." },
  { icon: "clock", title: "Quick response", text: "Most quotes returned within 30 minutes during working hours." },
];

function IconField({ icon, label, name, type = "text" }) {
  return (
    <label className="flex h-12 items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4">
      <Icon name={icon} className="h-4.5 w-4.5 shrink-0 text-[#c9a96e]" />
      <input name={name} required type={type} aria-label={label} placeholder={label} className="min-w-0 flex-1 bg-transparent text-sm uppercase text-white placeholder:text-white/60 outline-none" />
    </label>
  );
}

function FaqCard({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-black/8 py-4 last:border-b-0">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-4 text-left" aria-expanded={isOpen}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/8 text-lg font-extrabold text-[#101828]">?</span>
        <span className="flex-1 font-title text-base font-bold text-[#101828]">{item.q}</span>
        <span
          className={`relative flex h-5 w-5 shrink-0 items-center justify-center transition-transform ${isOpen ? "rotate-45" : ""}`}
          aria-hidden="true"
        >
          <span className="absolute h-4 w-0.5 rounded-full bg-hero-blue" />
          <span className="absolute h-0.5 w-4 rounded-full bg-hero-blue" />
        </span>
      </button>
      {isOpen && <p className="mt-1.5 pl-13 text-sm leading-relaxed text-[#101828]">{item.a}</p>}
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", compact = false }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wide text-white">{label}</span>
      <input
        name={name}
        required
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
  const optionsTitle = `${options[0]?.titlePre || ""} Reconditioned, Refurbished or Remanufactured?`;
  const [openIndex, setOpenIndex] = useState(new Set());
  const appsCount = data.appsCount || 0;
  const engineCode = quote.headlineHighlight.replace(/^Land Rover\s+/i, "");
  const quoteStats = [
    { icon: "car", text: appsCount ? `${appsCount} ${engineCode} model application${appsCount === 1 ? "" : "s"} covered` : "Every application covered" },
    { icon: "wrench", text: "Rebuild, replacement or used options" },
    { icon: "truck", text: "Nationwide recovery from £70" },
    { icon: "clock", text: "Most vehicles collected within a few hours" },
  ];

  function toggle(i) {
    setOpenIndex((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  const lead = useLeadForm();
  const handleSubmit = lead.handleSubmit;

  return (
    <>
      {/* ============ engine rebuild cost ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pt-7 md:hidden">
          <LandRoverLogo className="h-8 w-14" />
          <h2 className="h2 mt-2 italic uppercase">
            <span className="block text-[#101828]">{costBanner.titlePre}</span>
            <span className={`block ${GOLD}`}>
              {costBanner.titleHighlight}
              {costBanner.titlePost}
            </span>
          </h2>
          <span className="gold-rule mt-3 block w-28" aria-hidden="true" />
        </div>
        <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden md:hidden">
          <Image src={costBanner.imageMobile} alt={`${costBanner.titlePre} engine on a workshop bench`} fill className="object-cover object-right" sizes="100vw" />
          <EdgeFade color="var(--theme-light-bg)" />
        </div>
        <div className="relative px-4 pb-7 md:hidden">
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#101828]">
            {costBanner.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="glass-card rounded-xl px-5 py-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#101828]">{costBanner.startingFromLabel}</p>
              <p className="text-3xl font-extrabold text-[#101828]">{costBanner.startingFromPrice}</p>
            </div>
            <a href="#quote-form" className="flex-1 rounded-lg bg-[#16241a] px-4 py-3.5 text-center text-xs font-bold uppercase text-white">
              Submit Your Registration →
            </a>
          </div>
          <PriceFactors items={costBanner.priceFactors} compact />
        </div>

        {/* ===== desktop — sec10_rebuild_cost.jpg (16:9, white left half) full width, height compressed, no cropping ===== */}
        <div className="relative hidden overflow-hidden md:block">
          {/* sec10_cost_wide.webp = sec10_rebuild_cost.jpg + a mirrored workshop strip on the right (3:1), sized to the
              section height (~505px). The engine (≈48–84% of the original, centre ≈66% ≈ 37.3rem in) is placed at 66% of the
              viewport — midway between the copy and the Price Factors card at 1440–1900px — so neither overlaps it. */}
          <div className="absolute inset-0 bg-white" aria-hidden="true">
            <div className="absolute inset-y-0 right-0" style={{ left: "calc(66% - 37.3rem)" }}>
              <Image src="/engine/sec10_cost_wide.webp" alt="" fill className="object-cover object-left" sizes="100vw" />
            </div>
            <div className="absolute inset-y-0 left-0 w-[52%] bg-linear-to-r from-white from-60% to-transparent" />
          </div>

          <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,36rem)_minmax(0,1fr)] items-center gap-8 px-4 py-10 sm:px-6 lg:px-8">
            <div>
              <LandRoverLogo className="h-12 w-20" />
              <h2 className="h2 mt-4 italic uppercase">
                <span className="block text-[#101828]">{costBanner.titlePre}</span>
                <span className={`block ${GOLD}`}>
                  {costBanner.titleHighlight}
                  {costBanner.titlePost}
                </span>
              </h2>
              <span className="gold-rule mt-4 block w-48" aria-hidden="true" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#101828]">
                {costBanner.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-5">
                <div className="glass-card rounded-xl px-7 py-3.5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#101828]">{costBanner.startingFromLabel}</p>
                  <p className="text-4xl font-extrabold text-[#101828]">{costBanner.startingFromPrice}</p>
                </div>
                <div>
                  <a href="#quote-form" className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-[#16241a] px-6 py-3.5 text-sm font-bold uppercase text-white transition-colors hover:bg-[#22382a]">
                    Submit Your Registration →
                  </a>
                  <p className="mt-2 text-xs text-[#101828]">Get a fixed-price quote within 30 minutes.</p>
                </div>
              </div>
            </div>
            <span aria-hidden="true" />
          </div>
          <div className="absolute right-8 top-1/2 w-[17rem] -translate-y-1/2">
            <PriceFactors items={costBanner.priceFactors} />
          </div>
        </div>
      </section>

      {/* ============ rebuild vs replacement vs used ============ */}
      <section className="theme-dark relative overflow-hidden bg-[#0f1a13]">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-8 md:hidden">
          <h2 className="h2 text-center italic uppercase text-white" style={{ fontSize: "22px" }}>
            {comparison.titlePre} {comparison.titleHighlight}
          </h2>
          <span className="gold-rule mx-auto mt-3 block w-28" aria-hidden="true" />
          <div className="mt-6 space-y-4">
            {comparison.cards.map((c, i) => (
              <div key={i} className="rounded-xl border border-[#c9a96e]/25 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <GoldRing icon={c.icon} compact />
                  <p className={`font-title text-base font-bold italic uppercase leading-tight ${GOLD}`}>
                    {c.title} {c.titleHighlight}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/90">{c.body}</p>
                <Bullets items={COMPARISON_BULLETS[i]} />
              </div>
            ))}
          </div>
          <a href={comparison.cta.href} className={`mt-5 flex items-center justify-center rounded-lg border border-[#c9a96e]/60 px-4 py-3 text-sm font-bold uppercase ${GOLD}`}>
            {comparison.cta.label}
          </a>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className={`text-center text-sm font-bold uppercase tracking-widest ${GOLD}`}>{comparison.titlePre}</p>
            <h2 className="h2 mt-1 whitespace-nowrap text-center italic uppercase text-white">{comparison.titleHighlight}</h2>
            <span className="gold-rule mx-auto mt-3 block w-48" aria-hidden="true" />

            <div className="mt-14 grid grid-cols-3 divide-x divide-[#c9a96e]/20 rounded-xl border border-[#c9a96e]/20 bg-white/[0.02]">
              {comparison.cards.map((c, i) => (
                <div key={i} className="relative px-8 pb-8 pt-12">
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <GoldRing icon={c.icon} />
                  </span>
                  <p className={`text-center font-title text-base font-bold italic uppercase ${GOLD}`}>
                    {c.title} {c.titleHighlight}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/90">{c.body}</p>
                  <Bullets items={COMPARISON_BULLETS[i]} />
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <a href={comparison.cta.href} className={`flex items-center gap-2 rounded-lg border border-[#c9a96e]/60 px-20 py-3 text-sm font-bold uppercase transition-colors hover:bg-[#c9a96e]/10 ${GOLD}`}>
                {comparison.cta.label}
              </a>
              <p className="text-sm text-white">Enter your registration and we&apos;ll talk you through both options honestly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ reconditioned / refurbished / remanufactured + terminology ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative space-y-4 px-4 py-8 md:hidden">
          <div className="glass-card rounded-xl p-4">
            <p className="font-title text-base font-bold italic uppercase text-[#101828]">{optionsTitle}</p>
            <span className="gold-rule mt-2 block w-20" aria-hidden="true" />
            <div className="mt-3 divide-y divide-black/8">
              {options.map((o, i) => (
                <div key={i} className="flex gap-3 py-3">
                  <OptionIcon icon={o.icon} compact />
                  <div className="min-w-0">
                    <p className="font-title text-sm font-bold italic uppercase leading-tight text-[#101828]">
                      {o.titlePre} {o.titleHighlight}
                      {o.titlePost}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#101828]">{o.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Terminology compact />
          <RebuildMeaning compact />
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl space-y-5">
            <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] gap-5">
              <div className="glass-card rounded-xl p-7">
                <p className="font-title text-base font-bold italic uppercase text-[#101828]">{optionsTitle}</p>
                <span className="gold-rule mt-2 block w-20" aria-hidden="true" />
                <div className="mt-4 divide-y divide-black/8">
                  {options.map((o, i) => (
                    <div key={i} className="grid grid-cols-[3.5rem_10rem_minmax(0,1fr)] items-center gap-5 py-4">
                      <OptionIcon icon={o.icon} />
                      <p className="font-title text-sm font-bold italic uppercase leading-tight text-[#101828]">
                        {o.titlePre}
                        <br />
                        {o.titleHighlight}
                        {o.titlePost}
                      </p>
                      <p className="text-xs leading-relaxed text-[#101828]">{o.body}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Terminology />
            </div>
            <RebuildMeaning />
          </div>
        </div>
      </section>

      {/* ============ faq ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-7 md:hidden">
          <LandRoverLogo className="h-8 w-14" />
          <h2 className="h2 mt-2 uppercase">
            <span className="text-[#101828]">{faq.kicker} </span>
            <span className={GOLD}>{faq.kickerHighlight}</span>
          </h2>
          <span className="gold-rule mt-3 block w-28" aria-hidden="true" />

          <div className="glass-card mt-5 rounded-xl px-4">
            {[...faq.faqLeft, ...faq.faqRight].map((item, i) => (
              <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl">
            <LandRoverLogo className="h-12 w-20" />
            <h2 className="h2 mt-3 uppercase">
              <span className="text-[#101828]">{faq.kicker} </span>
              <span className={GOLD}>{faq.kickerHighlight}</span>
            </h2>
            <span className="gold-rule mt-3 block w-32" aria-hidden="true" />

            <div className="mt-6 grid grid-cols-2 items-start gap-6">
              <div className="glass-card rounded-xl px-6">
                {faq.faqLeft.map((item, i) => (
                  <FaqCard key={item.q} item={item} isOpen={openIndex.has(i)} onToggle={() => toggle(i)} />
                ))}
              </div>
              <div className="glass-card rounded-xl px-6">
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
                  name="vehicle_vrm" required maxLength={8} type="text"
                  placeholder={quote.fields.reg.placeholder}
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 outline-none"
                />
              </div>
            </label>
            <Field name="postcode" label={quote.fields.postcode.label} placeholder={quote.fields.postcode.placeholder} compact />
            <Field name="name" label={quote.fields.name.label} placeholder={quote.fields.name.placeholder} compact />
            <Field name="number" label={quote.fields.phone.label} placeholder={quote.fields.phone.placeholder} type="tel" compact />
            <Field name="email" label={quote.fields.email.label} placeholder={quote.fields.email.placeholder} type="email" compact />
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-white">{quote.fields.enquiry.label}</span>
              <div className="relative mt-1.5">
                <select name="description" required className="h-11 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm text-white outline-none">
                  <option value="">{quote.fields.enquiry.placeholder}</option>
                  {["Engine Failure", "Replacement Needed", "General Enquiry"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
                <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
              </div>
            </label>

            <button
              type="submit"
            disabled={lead.status === "loading"}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
              style={{ background: "linear-gradient(135deg, #607056 0%, #4c5a45 100%)", boxShadow: "0 8px 20px rgba(96,112,86,0.4)" }}
            >
              {quote.submitLabel} <span aria-hidden>→</span>
            </button>
          <LeadStatus lead={lead} />
          </form>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden md:block">
          {/* sec11_faq.jpg: 16:9 dark workshop shot — full width, height compressed to the section (no cropping) */}
          {/* engine sits at ~58% of sec11_faq.jpg — the photo is shifted 12% left so it lands mid-section
              (~46%), as in the reference; the uncovered strip on the right is the photo's own near-black */}
          <div className="absolute inset-0 bg-[#050605]" aria-hidden="true">
            <div className="absolute inset-y-0 -left-[12%] w-full">
              <Image src="/engine/sec11_faq.jpg" alt="" fill className="object-fill" sizes="100vw" />
            </div>
            <div className="absolute inset-0 bg-linear-to-r from-[#070a08]/80 via-transparent to-[#070a08]/60" />
          </div>

          <div className="relative px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14">
              <div className="self-center pt-6">
                <h2 className="h2 uppercase">
                  <span className="block text-white">{quote.headlinePre}</span>
                  <span className="block text-white">{quote.headlineHighlight}</span>
                  <span className={`block ${GOLD}`}>{quote.headlinePost}</span>
                </h2>
                <span className="gold-rule mt-4 block w-32" aria-hidden="true" />

                <div className="mt-8 space-y-6">
                  {QUOTE_BENEFITS.map((b) => (
                    <div key={b.title} className="flex items-center gap-4">
                      <span
                        className="flex h-14 w-14 shrink-0 items-center justify-center"
                        style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)", background: "rgba(201,169,110,0.45)" }}
                      >
                        <span className="flex h-[52px] w-[52px] items-center justify-center bg-[#0c110d]" style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}>
                          <Icon name={b.icon} className={`h-6 w-6 ${GOLD}`} />
                        </span>
                      </span>
                      <div>
                        <p className="text-sm font-bold uppercase text-white">{b.title}</p>
                        <p className="text-sm text-white/80">{b.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="rounded-2xl border p-7 backdrop-blur-md" style={{ borderColor: "rgba(201,169,110,0.25)", background: "rgba(8,11,9,0.82)", boxShadow: "0 20px 50px -20px rgba(0,0,0,0.8)" }}>
                <p className="text-base leading-snug text-white">Enter your details and we&apos;ll provide a fixed-price quote within 30 minutes.</p>
                <div className="mt-5 space-y-3">
                  <div className="flex h-12 overflow-hidden rounded-lg border border-white/15 bg-white/5">
                    <GbBadge className="w-12" />
                    <input name="vehicle_vrm" required maxLength={8} type="text" aria-label={quote.fields.reg.label} placeholder={quote.fields.reg.label} className="min-w-0 flex-1 bg-transparent px-4 text-sm uppercase text-white placeholder:text-white/60 outline-none" />
                  </div>
                  <IconField name="postcode" icon="pin" label={quote.fields.postcode.label} />
                  <div className="grid grid-cols-2 gap-3">
                    <IconField name="name" icon="tech" label={quote.fields.name.label} />
                    <IconField name="number" icon="phone" label={quote.fields.phone.label} type="tel" />
                  </div>
                  <IconField name="email" icon="note" label={quote.fields.email.label} type="email" />
                  <div className="relative">
                    <select name="description" required aria-label={quote.fields.enquiry.label} className="h-12 w-full appearance-none rounded-lg border border-white/15 bg-white/5 px-4 pr-10 text-sm uppercase text-white/80 outline-none">
                      <option value="">{quote.fields.enquiry.label}</option>
                      {["Engine Failure", "Replacement Needed", "General Enquiry"].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <Icon name="chevron-down" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  </div>
                  <p className="px-1 text-xs text-white/60">{quote.fields.enquiry.placeholder}</p>
                </div>

                <button
                  type="submit"
            disabled={lead.status === "loading"}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110"
                  style={{ background: "linear-gradient(180deg, #d4b47a 0%, #a8874f 100%)", boxShadow: "0 8px 20px rgba(201,169,110,0.3)" }}
                >
                  Get My Quote <span aria-hidden>→</span>
                </button>
                <LeadStatus lead={lead} />

                <a href="tel:02034884649" className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <Icon name="phone" className={`h-8 w-8 ${GOLD}`} />
                  <span>
                    <span className={`block text-sm font-bold uppercase ${GOLD}`}>Call a specialist</span>
                    <span className="block text-xs text-white/80">Speak to a Land Rover engine expert — 0203 488 4649</span>
                  </span>
                </a>
              </form>
            </div>

            <div className="mx-auto mt-8 grid max-w-6xl grid-cols-4 divide-x divide-white/10 rounded-xl border border-white/10 bg-black/40 px-6 py-5 backdrop-blur-sm">
              {quoteStats.map((x) => (
                <div key={x.text} className="flex items-center gap-4 px-6 first:pl-0 last:pr-0">
                  <Icon name={x.icon} className={`h-9 w-9 shrink-0 ${GOLD}`} />
                  <p className="text-sm leading-snug text-white">{x.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-(--theme-light-bg) px-4 py-6 sm:px-6 lg:px-8">
            <div className="glass-card mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center divide-x divide-black/10 rounded-xl px-8 py-5">
              <div className="flex items-center gap-5 pr-8">
                <Icon name="shield-check" className="h-12 w-12 shrink-0 text-[#101828]" />
                <div>
                  <p className="font-title text-base font-bold uppercase text-[#101828]">Data Verification</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a5568]">
                    The application data on this page is sourced from the Land Rover Master Engine Data File and has been verified against manufacturer technical documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-8">
                <Icon name="calendar" className="h-11 w-11 text-[#101828]" />
                <div>
                  <p className="text-xs font-bold uppercase text-[#4a5568]">Last verified:</p>
                  <p className="font-title text-2xl font-bold uppercase text-[#101828]">August 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
