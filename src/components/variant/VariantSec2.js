import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import RegLookupForm from "@/components/reusable/RegLookupForm";

export default function VariantSec2({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 pb-6 pt-7 md:hidden">
        <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 text-[#101828] uppercase">
          {data.headlinePre}
          <span className="text-hero-blue">{data.headlineHighlight}</span>
          {data.headlinePost}
        </h2>
        <span className="mt-2 block h-0.5 w-32 bg-linear-to-r from-bmw-blue via-white to-bmw-red" />

        <div className="relative mt-5 overflow-hidden rounded-xl">
          <Image src={data.image} alt="Land Rover turbocharged engine" width={600} height={480} className="mx-auto h-44 w-auto object-contain" />
        </div>

        <div className="relative mt-4 grid grid-cols-2 gap-2.5">
          {data.specs.map((s) => (
            <div
              key={s.label}
              className={`glass-card rounded-xl p-3 ${s.label === "Generations" ? "col-span-2" : ""}`}
            >
              <div className="flex items-center gap-1.5">
                <Icon name={s.icon} className="h-4 w-4 shrink-0 text-hero-blue" />
                <p className="label-text uppercase tracking-wide text-[#101828]">{s.label}</p>
              </div>
              <p className={`mt-1 text-xs leading-snug ${s.highlight ? "text-hero-blue" : "text-[#101828]"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div
          className="theme-dark card-glare relative mt-5 rounded-2xl p-4"
          style={{
            background: "linear-gradient(135deg, rgba(10,12,9,0.75) 0%, rgba(6,8,5,0.88) 100%)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(96,112,86,0.4)",
            boxShadow: "0 0 0 1px rgba(96,112,86,0.35), 0 25px 60px -25px rgba(96,112,86,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-base font-bold text-hero-blue">?</span>
            <div>
              <p className="text-sm font-extrabold text-white">{data.lookup.title}</p>
              <p className="mt-1 text-xs leading-snug text-white">{data.lookup.body}</p>
            </div>
          </div>

          <div className="mt-4">
            <RegLookupForm buttonLabel={data.lookup.buttonLabel} stacked hideButton />
            <button
              type="button"
              className="mt-3 flex h-11 w-full items-center justify-center rounded-sm border-2 border-hero-blue bg-hero-blue text-sm font-bold text-white transition-colors hover:bg-white hover:text-hero-blue"
            >
              {data.lookup.buttonLabel} →
            </button>
          </div>

          <div className="relative mt-4 flex items-stretch">
            {data.lookup.badges.map((b, i) => (
              <div key={b.label} className="relative flex flex-1 flex-col items-center gap-1 px-1.5 text-center">
                {i > 0 && <span className="absolute left-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-white/15" aria-hidden="true" />}
                <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                <p className="label-text leading-tight text-white">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-3 text-[#101828] uppercase">
            {data.headlinePre}
            <span className="text-hero-blue">{data.headlineHighlight}</span>
            {data.headlinePost}
          </h2>
          <span className="mt-3 block h-0.5 w-40 bg-linear-to-r from-bmw-blue via-white to-bmw-red lg:w-48" />

          <div className="mt-4 grid grid-cols-2 items-center gap-10">
            <div className="relative divide-y divide-black/10">
              <span className="pointer-events-none absolute bottom-0 top-0 left-40 w-px bg-black/10" aria-hidden="true" />
              {data.specs.map((s) => (
                <div key={s.label} className="flex items-stretch py-2.5">
                  <div className="flex w-40 shrink-0 items-center gap-3 pr-4">
                    <Icon name={s.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                    <p className="text-sm font-bold text-[#101828]">{s.label}</p>
                  </div>
                  <p className={`flex items-center pl-4 text-sm ${s.highlight ? "font-extrabold text-hero-blue" : "text-[#101828]"}`}>{s.value}</p>
                </div>
              ))}
            </div>

            <div
              className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl"
              style={{ background: "radial-gradient(ellipse at center, rgba(96,112,86,0.32) 0%, rgba(96,112,86,0.1) 45%, transparent 72%)" }}
            >
              <Image src={data.image} alt="Land Rover turbocharged engine" width={700} height={560} className="h-auto w-full max-w-md object-contain" />
            </div>
          </div>

          <div
            className="theme-dark card-glare relative mt-4 grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.65fr)] items-center gap-6 rounded-2xl p-8"
            style={{
              background: "linear-gradient(135deg, rgba(10,12,9,0.75) 0%, rgba(6,8,5,0.88) 100%)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(96,112,86,0.4)",
              boxShadow:
                "0 0 0 1px rgba(96,112,86,0.35), 0 0 40px 8px rgba(96,112,86,0.18), 0 25px 60px -25px rgba(96,112,86,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-hero-blue text-lg font-bold text-hero-blue">?</span>
              <div>
                <p className="text-base font-extrabold text-white">{data.lookup.title}</p>
                <p className="mt-1.5 text-sm leading-snug text-white">{data.lookup.body}</p>
              </div>
            </div>

            <div className="relative border-l border-white/15 pl-8">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <RegLookupForm buttonLabel={data.lookup.buttonLabel} row hideButton whiteField />
                </div>
                <a
                  href="#quote-form"
                  className="btn-text flex h-15 w-64 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border-2 border-hero-blue bg-linear-to-br from-hero-blue to-hero-blue-dark px-2 uppercase text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-none hover:bg-white hover:text-hero-blue"
                >
                  {data.lookup.buttonLabel} <span className="ml-1.5" aria-hidden>→</span>
                </a>
              </div>

              <div className="relative mt-5 flex items-stretch">
                {data.lookup.badges.map((b, i) => (
                  <div key={b.label} className="relative flex flex-1 items-center gap-2.5 px-4 first:pl-0">
                    {i > 0 && <span className="absolute left-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-white/15" aria-hidden="true" />}
                    <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                    <p className="text-sm leading-tight text-white">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
