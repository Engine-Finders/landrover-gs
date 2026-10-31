import VIcon from "@/components/variant/VariantIcons";

// Section 8: FAQ accordion (native <details>, no client JS) built from the variant's Sec13 FAQs -
// the same list that feeds the page's FAQPage schema - plus a pricing disclaimer.

const GREEN = "#8fb35a";
const GOLD = "#c9a24a";
const SERIF = { fontFamily: "var(--font-serif-display), Georgia, 'Times New Roman', serif" };

function FaqItem({ item, n, open }) {
  return (
    <details open={open} className="group border-b border-white/10 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-4 md:gap-4 md:px-5 [&::-webkit-details-marker]:hidden">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold md:h-8 md:w-8 md:text-[14px]" style={{ borderColor: `${GREEN}99`, color: GREEN, background: "rgba(143,179,90,0.1)" }}>
          {n}
        </span>
        <span className="flex-1 pt-0.5 text-[15px] font-medium leading-snug text-white md:pt-1 md:text-[16px]">{item.q}</span>
        <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-white/70 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <p className="-mt-1 pb-4 pl-[56px] pr-4 text-[14px] leading-[1.65] text-white/75 md:pl-[68px] md:pr-8 md:text-[14.5px]">{item.a}</p>
    </details>
  );
}

export default function VariantSec8({ faq }) {
  const left = faq?.faqLeft || [];
  const right = faq?.faqRight || [];
  if (!left.length && !right.length) return null;

  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b0d0a] text-white">
      <div className="relative mx-auto max-w-[90rem] border-t border-white/10 px-4 py-10 sm:px-6 md:py-14 lg:px-10 xl:px-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] md:text-[13px]" style={{ color: GOLD }}>Your Questions Answered</p>
            <h2 className="mt-2 text-[30px] leading-[1.08] sm:text-[38px] lg:text-[46px]" style={SERIF}>Frequently Asked Questions</h2>
          </div>
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-[28px] sm:flex md:h-16 md:w-16" style={{ ...SERIF, borderColor: GOLD, color: GOLD }} aria-hidden="true">
            ?
          </span>
        </div>

        <div className="mt-6 grid items-start gap-3 md:gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.03]">
            {left.map((item, i) => (
              <FaqItem key={item.q} item={item} n={i + 1} open={i === 0} />
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border border-white/12 bg-white/[0.03]">
            {right.map((item, i) => (
              <FaqItem key={item.q} item={item} n={left.length + i + 1} open={false} />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3.5 rounded-xl border border-white/12 bg-white/[0.03] p-4 md:items-center md:gap-5 md:p-5">
          <VIcon name="shield" className="h-8 w-8 shrink-0 md:h-10 md:w-10" style={{ color: GOLD }} />
          <p className="text-[13px] leading-[1.6] text-white/70 md:text-[14px]">
            All prices are indicative UK guide ranges. Actual costs vary by variant, engine condition, damage severity and workshop location — submit
            your registration for a tailored quote. Every engine supplied carries a minimum 12-month unlimited-mileage warranty; always confirm terms
            before you commit.
          </p>
        </div>
      </div>
    </section>
  );
}
