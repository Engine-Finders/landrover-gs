import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

const compBoldPhrases = ["original", "inspected & rebuilt", "updated OEM parts", "12-month unlimited mileage"];

function withCompEmphasis(text) {
  const regex = new RegExp(`(${compBoldPhrases.join("|")})`, "g");
  return text.split(regex).map((part, i) =>
    compBoldPhrases.includes(part) ? (
      <span key={i} className="font-semibold text-hero-blue">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ModelSec5({ data }) {
  const [line1, line2] = data.h2.split("|");
  const [warrantyPre, warrantyPost] = data.paragraphs[1].split("{{warranty}}");
  const pointIcons = ["tech", "wrench", "shield-check"];

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="Precision-machined Land Rover engine block" fill className="object-cover object-top" sizes="100vw" />
          {/* dark scrim behind the text column, fading out toward the engine photo */}
          <div className="absolute inset-0 bg-linear-to-r from-hero-dark/90 via-hero-dark/70 via-55% to-transparent" />
        </div>

        <div className="relative px-4 pb-8 pt-10">
          <div className="max-w-[78%]">
            <LandRoverStripe className="h-4 w-8" />

            <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-3 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <span className="mt-3 block h-px w-16 bg-hero-blue/50" />

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <Icon name={pointIcons[0]} className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-sm leading-relaxed text-white">{data.paragraphs[0]}</p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name={pointIcons[1]} className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-sm leading-relaxed text-white">
                  {warrantyPre}
                  <span className="font-semibold text-hero-blue">{data.warrantyHighlight}</span>
                  {warrantyPost}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Icon name={pointIcons[2]} className="mt-0.5 h-5 w-5 shrink-0 text-hero-blue" />
                <p className="text-sm leading-relaxed text-white">{data.paragraphs[2]}</p>
              </div>
            </div>
          </div>

          {/* rebuild vs. used engine swap header */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <p className="text-base font-extrabold uppercase text-white">Rebuild</p>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue bg-hero-blue text-lg font-black text-white shadow-[0_0_0_2px_rgba(255,255,255,0.35),0_0_16px_5px_rgba(96,112,86,0.55),0_0_0_5px_rgba(96,112,86,0.25)]">
              VS
            </span>
            <p className="text-sm font-extrabold uppercase leading-tight text-white">Used Engine Swap</p>
          </div>

          {/* comparison matrix */}
          <div className="glass-card-dark relative mt-5 overflow-hidden rounded-2xl">
            <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-white/15 border-b border-white/15">
              <div />
              <div className="flex items-center gap-1.5 px-2 py-3">
                <Icon name="shield-check" className="h-5 w-5 shrink-0 text-hero-blue" />
                <p className="label-text font-extrabold uppercase leading-tight tracking-wide text-hero-blue">{data.comparison.ourLabel}</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-3">
                <Icon name="shield" className="h-5 w-5 shrink-0 text-white" />
                <p className="label-text font-extrabold uppercase leading-tight tracking-wide text-white">{data.comparison.usedLabel}</p>
              </div>
            </div>

            {data.comparison.rows.map((r, i) => (
              <div
                key={r.feature}
                className={`grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)] divide-x divide-white/15 ${i > 0 ? "border-t border-white/15" : ""}`}
              >
                <div className="flex min-w-0 items-start gap-1.5 px-2 py-3">
                  <Icon name={r.icon} className="h-4 w-4 shrink-0 text-white" />
                  <p className="label-text min-w-0 break-words font-bold uppercase leading-tight text-white">{r.feature}</p>
                </div>
                <p className="label-text min-w-0 break-words px-2 py-3 leading-snug text-white">{withCompEmphasis(r.ours)}</p>
                <p className="label-text min-w-0 break-words px-2 py-3 leading-snug text-white">{r.used}</p>
              </div>
            ))}
          </div>

          {/* bottom action bar */}
          <div className="glass-card-dark relative mt-5 flex items-center justify-between gap-3 rounded-xl border border-hero-blue/50 px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <Icon name="clock" className="h-7 w-7 shrink-0 text-hero-blue" />
              <p className="label-text font-extrabold uppercase leading-tight text-white">{data.cta.text}</p>
            </div>

            <a
              href={data.cta.href}
              className="btn-text shrink-0 rounded-lg bg-hero-blue px-4 py-2.5 uppercase text-white"
            >
              {data.cta.buttonLabel} →
            </a>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 pb-8 pt-10 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Precision-machined Land Rover engine block" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-lg">
          <div className="flex items-center gap-2">
            <LandRoverStripe className="h-4.5 w-9" />
            <p className="label-text uppercase tracking-widest text-white">{data.kicker}</p>
          </div>

          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-3 uppercase">
            <span className="block text-white">{line1}</span>
            <span className="block text-hero-blue">{line2}</span>
          </h2>
          <span className="mt-3 block h-px w-16 bg-hero-blue/50" />

          <div className="body-text mt-5 space-y-4 text-white">
            <p>{data.paragraphs[0]}</p>
            <p>
              {warrantyPre}
              <span className="font-semibold text-hero-blue">{data.warrantyHighlight}</span>
              {warrantyPost}
            </p>
            <p>{data.paragraphs[2]}</p>
          </div>
        </div>

        {/* comparison matrix */}
        <div className="relative mt-10 rounded-2xl border border-hero-blue/30 bg-(--color-light-surface) shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6),0_0_30px_-10px_rgba(96,112,86,0.45)]">
          <div className="overflow-hidden rounded-2xl">
            {/* header row — no col1/col2 divider here (that separator only makes sense once
                there's a dedicated icon column of content below it) */}
            <div className="grid grid-cols-[64px_1fr_1.4fr_1.4fr]">
              <div />
              <div className="col-start-2 col-span-2 flex items-center gap-2 py-4 pl-3 pr-6">
                <Icon name="shield-check" className="h-7 w-7 shrink-0 text-hero-blue" />
                <p className="text-sm font-extrabold uppercase tracking-wide text-hero-blue">{data.comparison.ourLabel}</p>
              </div>
              <div className="flex items-center gap-2 border-l border-black/10 px-6 py-4">
                <Icon name="warning" className="h-7 w-7 shrink-0 text-[#101828]" />
                <p className="text-sm font-extrabold uppercase tracking-wide text-[#101828]">{data.comparison.usedLabel}</p>
              </div>
            </div>

            {data.comparison.rows.map((r, i) => (
              <div
                key={r.feature}
                className={`grid grid-cols-[64px_1fr_1.4fr_1.4fr] items-center divide-x divide-black/10 border-t border-black/5 ${i % 2 === 1 ? "bg-(--color-light-surface)/60" : ""}`}
              >
                <span className="flex h-full items-center justify-center py-4">
                  <Icon name={r.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
                </span>
                <p className="py-4 pl-3 pr-6 text-sm font-bold text-[#101828]">{r.feature}</p>
                <p className="px-6 py-4 text-sm text-[#101828]">{r.ours}</p>
                <p className="px-6 py-4 text-sm text-[#101828]">{r.used}</p>
              </div>
            ))}
          </div>

          {/* VS badge, centered over the middle ("Our Rebuild") column */}
          <div className="absolute top-0 left-[45%] z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-hero-blue bg-hero-blue text-xl font-black text-white shadow-[0_0_0_2px_rgba(255,255,255,0.95),0_0_20px_6px_rgba(255,255,255,0.85),0_0_0_6px_rgba(96,112,86,0.2),0_0_25px_6px_rgba(96,112,86,0.55)]">
            VS
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
