import Image from "next/image";
import Link from "next/link";
import guide from "@/data/shared/engineGuide.json";
import VIcon from "@/components/variant/VariantIcons";
import { deriveVariant } from "@/lib/variantInfo";
import { GroundedCar } from "@/components/variant/PhotoScene";

// Section 3: the engine family's three common problems as cards, then the "Ready to Compare"
// banner. Problem content comes from engineGuide.json for the variant's engine family.

const GREEN = "#7f9f4f";
const URGENCY = {
  High: { text: "#f0645a", ring: "rgba(240,100,90,0.55)", bg: "rgba(160,40,32,0.28)" },
  Medium: { text: "#e8b84a", ring: "rgba(232,184,74,0.55)", bg: "rgba(150,110,20,0.28)" },
  Low: { text: "#9cc46a", ring: "rgba(156,196,106,0.5)", bg: "rgba(70,100,40,0.3)" },
};

function Row({ icon, label, children }) {
  return (
    <li className="flex gap-2.5">
      <VIcon name={icon} className="mt-[3px] h-4 w-4 shrink-0 text-white/55" />
      <p className="min-w-0 text-[13.5px] leading-[1.55] text-white/80 md:text-[14px]">
        <span className="font-semibold text-white">{label}:</span> {children}
      </p>
    </li>
  );
}

function ProblemCard({ p, n }) {
  const u = URGENCY[p.urgency] || URGENCY.Medium;
  return (
    <article className="flex flex-col rounded-xl border border-white/12 bg-white/[0.03] p-4 md:p-5">
      <header className="flex items-center gap-3.5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border" style={{ color: u.text, borderColor: u.ring, background: u.bg }}>
          <VIcon name={p.icon} className="h-6 w-6" />
        </span>
        <h3 className="text-[16px] font-semibold leading-snug text-white md:text-[17px]">
          {n}. {p.title}
          <span className="block font-normal text-white/75">({p.sub})</span>
        </h3>
      </header>

      <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
        <Row icon="clipboard" label="Symptoms">{p.symptoms}</Row>
        <Row icon="gauge" label="Typical Mileage">{p.mileage}.</Row>
        <Row icon="receipt" label="Repair Cost">{p.repair}.</Row>
        <Row icon="engine" label="Replacement Cost">{p.replacement}.</Row>
        <Row icon="alert" label="Urgency">
          <span className="font-semibold" style={{ color: u.text }}>{p.urgency}</span> — {p.urgencyNote}
        </Row>
      </ul>

      <div className="mt-3 flex gap-2.5 rounded-lg bg-black/30 p-3">
        <VIcon name="thumb" className="mt-[3px] h-4 w-4 shrink-0" style={{ color: GREEN }} />
        <p className="text-[13.5px] leading-[1.55] text-white/80 md:text-[14px]">
          <span className="block font-semibold text-white">Our recommendation:</span>
          {p.recommendation}
        </p>
      </div>

      <Link href={p.guide.href} className="group mt-auto pt-4 text-[14px] leading-snug" style={{ color: GREEN }}>
        <span className="underline-offset-4 group-hover:underline">Read the full {p.guide.label}</span> <span aria-hidden="true">→</span>
        <span className="block truncate text-[12.5px] text-white/45">{p.guide.href}/</span>
      </Link>
    </article>
  );
}

export default function VariantSec3({ sec1, sec2, data }) {
  const v = deriveVariant(sec1, sec2, data);
  const fam = guide.families[v.family];
  if (!fam) return null;

  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b0d0a] text-white">
      <div className="relative mx-auto max-w-[90rem] border-t border-white/10 px-4 pb-10 pt-10 sm:px-6 md:pb-14 md:pt-14 lg:px-10 xl:px-14">
        <span className="inline-block rounded bg-[#1d2a18] px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a9c47e] md:text-[11px]">
          Common Problems
        </span>
        <h2 className="mt-3 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[30px] lg:text-[36px]" style={{ fontFamily: "var(--font-instrument-sans), var(--font-inter), Arial, sans-serif" }}>
          Common Problems With {v.name} Engines
        </h2>

        <div className="mt-5 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {fam.problems.map((p, i) => (
            <ProblemCard key={p.title} p={p} n={i + 1} />
          ))}
        </div>

        {/* ---------- ready to compare ---------- */}
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-[#7f9f4f]/30 bg-[#0d110c] md:mt-8">
          {/* desktop: the dusk highland photo behind the car half, fading into the card under the copy */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] md:block" aria-hidden="true">
            <Image src="/variant/hero-landscape-v3.webp" alt="" fill sizes="54vw" className="object-cover object-[8%_58%]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0d110c 0%, rgba(13,17,12,0.7) 14%, rgba(13,17,12,0.2) 32%, transparent 48%)" }} />
            <div className="absolute inset-x-0 top-0 h-[22%]" style={{ background: "linear-gradient(to bottom, rgba(13,17,12,0.6), transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-[22%]" style={{ background: "linear-gradient(to top, rgba(13,17,12,0.75), transparent)" }} />
          </div>

          <div className="relative grid items-center md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-6">
            {v.carImage && (
              <div className="relative order-first flex aspect-[16/10] items-end justify-center overflow-hidden pb-[6%] md:order-last md:aspect-auto md:min-h-[300px] md:overflow-visible md:px-6 md:pb-[9%] md:pt-10" aria-hidden="true">
                {/* phones: the photo fills the car's own block and fades into the card above the copy */}
                <div className="absolute inset-0 md:hidden">
                  <Image src="/variant/hero-landscape-m-v3.webp" alt="" fill sizes="100vw" className="object-cover object-[22%_62%]" />
                  <div className="absolute inset-x-0 top-0 h-[22%]" style={{ background: "linear-gradient(to bottom, rgba(13,17,12,0.65), transparent)" }} />
                  <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: "linear-gradient(to top, #0d110c, transparent)" }} />
                </div>
                <div className="relative w-[74%] max-w-[340px] md:w-full md:max-w-[440px]">
                  <GroundedCar src={v.carImage} sizes="(min-width: 768px) 36vw, 74vw" />
                </div>
              </div>
            )}

            <div className="px-5 pb-6 pt-1 md:py-9 md:pl-8 lg:pl-10">
              <span className="inline-block rounded bg-[#1d2a18] px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a9c47e] md:text-[11px]">
                Free Quotes
              </span>
              <h3 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.02em] md:text-[34px] lg:text-[38px]" style={{ fontFamily: "var(--font-instrument-sans), var(--font-inter), Arial, sans-serif" }}>
                Ready to Compare?
              </h3>
              <p className="mt-1 text-[17px] font-medium leading-snug md:text-[21px] lg:text-[23px]" style={{ color: GREEN }}>
                Get Matched With a Vetted Land Rover Specialist <span aria-hidden="true">→</span>
              </p>
              <p className="mt-3 max-w-[480px] text-[14px] leading-relaxed text-white/85 md:text-[16px]">
                12 vetted Land Rover specialists, every {v.short} variant covered, with a 12-month warranty as standard.
              </p>
              <a
                href="#quote-form"
                className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#5a7a3c] bg-[#3e5a2c] px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(90,122,60,0.8)] transition-colors hover:bg-[#4a6a35] sm:w-auto sm:justify-start md:text-[16px]"
              >
                <span className="lg:hidden">Get My Free Quotes Now</span>
                <span className="hidden lg:inline">Get My Free {v.short} Engine Quotes Now</span>
                <VIcon name="arrow" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
