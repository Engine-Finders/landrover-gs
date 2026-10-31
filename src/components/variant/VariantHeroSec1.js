import Image from "next/image";
import Link from "next/link";
import VariantHeroQuoteForm from "@/components/variant/VariantHeroQuoteForm";
import { deriveVariant } from "@/lib/variantInfo";
import { GroundedCar } from "@/components/variant/PhotoScene";

// Variant hero: breadcrumb, title, trust chips, price/engine-code card, reg quote form and a
// ticker strip. Everything variant-specific is derived from the page's Sec1/Sec2/Sec3 data so the
// same markup serves all variant pages without per-page hero data.

const GREEN = "#7f9f4f";

const TICKER = ["Instant Quotes", "No Obligation", "100% Free", "Reconditioned", "Rebuilt", "Used", "Supply & Fit Available", "UK-Wide Network"];

/* ---------- icons (outline, sized by the caller) ---------- */
const svg = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", "aria-hidden": true };
const IconWrench = (p) => (
  <svg {...svg} {...p}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
);
const IconShield = (p) => (
  <svg {...svg} {...p}><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M12 6.2l4.5 1.9V12c0 3-2 5-4.5 6.1C9.5 17 7.5 15 7.5 12V8.1z" /><path d="m9.6 12 1.7 1.7 3.1-3.2" /></svg>
);
const IconTruck = (p) => (
  <svg {...svg} {...p}><path d="M2.5 6.5h11v9.5h-11z" /><path d="M13.5 9.5h4l3.5 3.6V16h-7.5" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
);
const IconUsers = (p) => (
  <svg {...svg} {...p}><circle cx="8.5" cy="8" r="3.2" /><circle cx="16.5" cy="8" r="3.2" /><path d="M2.5 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" /><path d="M14.3 14.2c.7-.1 1.4-.2 2.2-.2 3 0 5.4 1.8 6 5" /></svg>
);
const IconTag = (p) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M11.2 2.5H20a1.5 1.5 0 0 1 1.5 1.5v8.8a1.5 1.5 0 0 1-.44 1.06l-7.7 7.7a1.5 1.5 0 0 1-2.12 0L2.44 12.76a1.5 1.5 0 0 1 0-2.12l7.7-7.7a1.5 1.5 0 0 1 1.06-.44z" />
    <circle cx="16.6" cy="7.4" r="1.7" fill="#0d100c" />
  </svg>
);
const Chevron = (p) => (
  <svg {...svg} strokeWidth={2} {...p}><path d="m9 6 6 6-6 6" /></svg>
);

const CHIPS = [
  { Icon: IconWrench, a: "Supply & Fit", b: "Available" },
  { Icon: IconShield, a: "12-Month", b: "Warranty" },
  { Icon: IconTruck, a: "Nationwide", b: "Delivery" },
  { Icon: IconUsers, a: "12", b: "Specialists" },
];

function Crumb({ href, children }) {
  return (
    <>
      <Link href={href} className="shrink-0 whitespace-nowrap transition-colors hover:text-white" style={{ color: GREEN }}>
        {children}
      </Link>
      <Chevron className="h-2.5 w-2.5 shrink-0 text-white/40 md:h-3 md:w-3" />
    </>
  );
}

export default function VariantHeroSec1({ data, sec2, sec3 }) {
  const h = deriveVariant(data, sec2, sec3);

  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b0d0a] text-white">
      {/* ---------- top band: copy on the left, the variant's car on the highland photo on the right ---------- */}
      <div className="relative">
        {/* desktop backdrop: dusk highland photo (car-free, CC0 Poly Haven "Champagne Castle", graded) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] lg:block" aria-hidden="true">
          <Image src="/variant/hero-landscape-v3.webp" alt="" fill priority sizes="68vw" className="object-cover object-[0%_45%]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0b0d0a 0%, rgba(11,13,10,0.75) 8%, rgba(11,13,10,0.3) 20%, transparent 34%)" }} />
          <div className="absolute inset-x-0 top-0 h-[22%]" style={{ background: "linear-gradient(to bottom, rgba(11,13,10,0.7), transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: "linear-gradient(to top, #0b0d0a, transparent)" }} />
        </div>

        <div className="relative mx-auto max-w-[90rem] px-4 pt-4 sm:px-6 md:pt-6 lg:px-10 lg:pb-10 xl:px-14">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb">
            <div className="inline-flex max-w-full flex-wrap items-center gap-x-1 gap-y-1.5 rounded-lg border border-white/20 px-2.5 py-2 text-[10.5px] leading-none tracking-[-0.01em] min-[390px]:gap-x-1.5 min-[390px]:text-[11.5px] md:gap-x-2.5 md:px-4 md:py-2.5 md:text-[13px] md:tracking-normal">
              <Crumb href="/">Land Rover Engine</Crumb>
              {h.model && <Crumb href={h.modelHref}>{h.model}</Crumb>}
              {h.engineHref ? (
                <Crumb href={h.engineHref}>{h.short}</Crumb>
              ) : (
                <>
                  <span className="shrink-0" style={{ color: GREEN }}>{h.short}</span>
                  <Chevron className="h-2.5 w-2.5 shrink-0 text-white/40 md:h-3 md:w-3" />
                </>
              )}
              <span aria-current="page" className="shrink-0 whitespace-nowrap text-white/90">
                {h.gens} Engine Generation{h.gens > 1 ? "s" : ""}
              </span>
            </div>
          </nav>

          <div className="lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-x-4">
            <div>
              <h1 className="mt-5 text-[29px] font-semibold leading-[1.12] tracking-[-0.02em] text-white min-[375px]:text-[32px] sm:text-[42px] md:mt-8 md:text-[50px] lg:mt-9 lg:text-[46px] xl:text-[54px] 2xl:text-[60px]" style={{ fontFamily: "var(--font-instrument-sans), var(--font-inter), Arial, sans-serif" }}>
                {h.name} Engine Replacement —{" "}
                <span style={{ color: GREEN }}>Compare Prices &amp; Get Quotes</span>
              </h1>

              <p className="mt-3 max-w-[540px] text-[15px] leading-[1.65] text-white/85 md:mt-5 md:text-[17px] md:leading-[1.7]">
                Get quotes today from trusted UK Land Rover <span style={{ color: GREEN }}>{h.short}</span> specialists. Compare reconditioned, rebuilt and used{" "}
                {h.engineDesc ? `${h.engineDesc} ` : ""}engines — supply &amp; fit available nationwide.
              </p>
            </div>

            {/* vehicle - desktop: large, standing on the hillside in the photo */}
            {h.carImage && (
              <div className="relative hidden lg:block" aria-hidden="true">
                <div className="relative ml-auto mt-10 w-[88%] max-w-[760px] translate-x-[3%]">
                  <GroundedCar src={h.carImage} priority sizes="(min-width: 1024px) 55vw, 1px" />
                </div>
              </div>
            )}
          </div>

          {/* vehicle - mobile/tablet: the photo scene between the copy and the chips */}
          {h.carImage && (
            <div className="relative -mx-4 mt-4 aspect-[16/11] overflow-hidden sm:-mx-6 sm:aspect-[16/9] lg:hidden" aria-hidden="true">
              <Image src="/variant/hero-landscape-m-v3.webp" alt="" fill priority sizes="100vw" className="object-cover object-[18%_55%]" />
              <div className="absolute inset-x-0 top-0 h-[28%]" style={{ background: "linear-gradient(to bottom, #0b0d0a, transparent)" }} />
              <div className="absolute inset-x-0 bottom-0 h-[18%]" style={{ background: "linear-gradient(to top, #0b0d0a, transparent)" }} />
              <div className="absolute bottom-[7%] left-1/2 w-[72%] max-w-[540px] -translate-x-[46%]">
                <GroundedCar src={h.carImage} priority sizes="(min-width: 640px) 540px, 72vw" />
              </div>
            </div>
          )}

          {/* trust chips */}
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:mt-6 lg:mt-7 lg:max-w-[66%] lg:gap-3 xl:max-w-[62%]">
            {CHIPS.map(({ Icon, a, b }) => (
              <li key={a} className="flex items-center gap-2.5 rounded-lg border border-white/20 bg-[#0b0d0a]/55 px-3 py-3 md:py-4 lg:gap-3 lg:px-3.5 xl:px-4">
                <Icon className="h-7 w-7 shrink-0 md:h-9 md:w-9" style={{ color: GREEN }} />
                <span className="text-[13px] leading-[1.35] text-white md:text-[14px] xl:text-[15px]">
                  <span className="block">{a}</span>
                  <span className="block">{b}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* price + engine code */}
          <div className="mt-2.5 flex flex-col rounded-xl border border-white/15 bg-[#0b0d0a]/70 sm:flex-row sm:items-center md:mt-4 lg:max-w-[66%] xl:max-w-[62%]">
            <div className="flex flex-1 items-center gap-3.5 px-4 py-4 md:px-5 md:py-5">
              <IconTag className="h-8 w-8 shrink-0 -scale-x-100 text-[#a89a6c] md:h-9 md:w-9" />
              <p className="text-[15px] font-semibold leading-snug text-white md:text-[17px]">
                {h.name} Engines — {h.priceText && <>from <span className="whitespace-nowrap" style={{ color: GREEN }}>{h.priceText}</span></>}
              </p>
            </div>
            {h.engineCode && (
              <p className="border-t border-white/15 px-4 py-3 text-[14px] text-white/85 sm:border-l sm:border-t-0 sm:px-6 sm:py-1 md:text-[15px] xl:px-10">
                Engine code: <span className="font-semibold" style={{ color: GREEN }}>{h.engineCode}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* reg quote form */}
      <div className="relative mx-auto max-w-[90rem] px-4 pb-5 sm:px-6 md:pb-10 lg:px-10 xl:px-14">
        <div className="mt-3 rounded-xl border border-white/15 bg-white/[0.02] p-3 md:mt-4 md:p-5">
          <VariantHeroQuoteForm buttonLabel={`Get My Free ${h.short} Engine Quotes Now`} />
        </div>
      </div>

      {/* ticker strip */}
      <div className="relative border-y border-white/10 bg-[#0d110c]">
        <div className="mx-auto max-w-[90rem] overflow-hidden lg:px-10 xl:px-14">
          <ul className="hero-ticker flex w-max items-center py-3.5 md:py-4 lg:w-full lg:justify-between lg:gap-4">
            {[...TICKER, ...TICKER].map((t, i) => (
              <li key={i} className={`flex shrink-0 items-center gap-2.5 pl-7 text-[13px] text-white/85 lg:pl-0 lg:text-[14px] ${i >= TICKER.length ? "lg:hidden" : ""}`} aria-hidden={i >= TICKER.length || undefined}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
