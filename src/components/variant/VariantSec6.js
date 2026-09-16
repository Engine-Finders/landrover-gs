import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function VariantSec6({ data }) {
  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div
        className="relative rounded-xl px-4 pb-10 pt-7 md:hidden"
        style={{ boxShadow: "0 12px 28px -18px rgba(16,24,40,0.35)" }}
      >
        <h2 className="h2 text-[#101828] uppercase">
          <LandRoverStripe className="float-left mr-2 mt-0.5 h-6 w-12 shrink-0" />
          {data.titlePre}
          <span className="text-hero-blue">{data.titleHighlight}</span>
        </h2>

        <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1">
          {data.steps.map((s, i) => (
            <div key={s.title} className="relative flex w-[38vw] shrink-0 snap-start flex-col items-center text-center">
              <span
                className={`pointer-events-none absolute top-7 border-t-2 border-dashed border-hero-blue/30 ${
                  i === 0 ? "left-1/2 right-0" : i === data.steps.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                }`}
                aria-hidden="true"
              />
              <span
                className="relative z-10 flex h-14 w-14 shrink-0 rounded-full p-[1.5px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--color-bmw-blue) 0deg, rgba(173,135,92,0.15) 60deg, transparent 100deg, transparent 260deg, rgba(173,135,92,0.15) 300deg, var(--color-bmw-red) 360deg), var(--theme-light-bg)",
                  boxShadow: "0 8px 18px -6px rgba(16,24,40,0.35)",
                }}
              >
                <span className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-(--theme-light-bg) to-[#eaf3fc]">
                  <Icon name={s.icon} className="h-6 w-6 text-hero-blue-dark" />
                </span>
              </span>
              <p className="mt-2 flex items-center gap-1.5">
                <span className="text-xs font-bold text-hero-blue">{i + 1}</span>
                <span className="text-xs font-bold text-[#101828]">{s.title}</span>
              </p>
              <p className="body-text mt-1 line-clamp-3 leading-snug text-[#101828]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
        <div
          className="relative mx-auto max-w-6xl rounded-2xl px-8 py-10 lg:px-12"
          style={{ boxShadow: "0 16px 34px -20px rgba(16,24,40,0.35)" }}
        >
          <div className="flex items-start gap-3">
            <LandRoverLogo className="h-14 w-14 shrink-0" />
            <h2 className="h2 text-[#101828] uppercase">
              {data.titlePre}
              <span className="text-hero-blue">{data.titleHighlight}</span>
            </h2>
          </div>

          <div className="relative mt-10 grid grid-cols-10 gap-2">
            <span className="pointer-events-none absolute left-[5%] right-[5%] top-9 border-t-2 border-dashed border-hero-blue/30" aria-hidden="true" />
            {data.steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                <span
                  className="relative z-10 flex h-[72px] w-[72px] shrink-0 rounded-full p-0.5"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--color-bmw-blue) 0deg, rgba(173,135,92,0.15) 60deg, transparent 100deg, transparent 260deg, rgba(173,135,92,0.15) 300deg, var(--color-bmw-red) 360deg), #f7f9fc",
                    boxShadow: "0 12px 26px -8px rgba(16,24,40,0.35)",
                  }}
                >
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-(--theme-light-bg) to-[#eaf3fc]">
                    <Icon name={s.icon} className="h-8 w-8 text-hero-blue-dark" />
                  </span>
                </span>
                <p className="mt-2 text-lg font-extrabold text-hero-blue">{i + 1}</p>
                <p className="mt-1 text-sm font-bold leading-tight text-[#101828]">{s.title}</p>
                <p className="mt-1.5 px-1 text-xs leading-snug text-[#101828]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
