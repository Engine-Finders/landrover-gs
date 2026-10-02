import Icon from "@/components/reusable/Icon";

function SectionHeader({ icon, title, dark = true }) {
  return (
    <div className="flex items-center gap-3">
      <Icon name={icon} className="h-7 w-7 shrink-0 text-hero-blue" />
      <div className="inline-flex flex-col items-start">
        <h3 className={`h3 origin-left scale-y-110 scale-x-90 ${dark ? "text-white" : "text-[#101828]"}`}>{title}</h3>
        <span className="mt-2 block h-0.5 w-full bg-linear-to-r from-bmw-red via-hero-blue to-transparent" />
      </div>
    </div>
  );
}

export default function ModelSec16({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden text-white">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden" style={{ background: "linear-gradient(135deg, #141813 0%, #0a0c09 100%)" }}>
        <div className="relative px-4 pb-8 pt-10">
          {/* engine sizes */}
          <SectionHeader icon={data.engineSizes.icon} title={data.engineSizes.title} />

          <div className="mt-5 divide-y divide-white/10">
            {Array.from({ length: Math.ceil(data.engineSizes.items.length / 2) }).map((_, ri) => {
              const left = data.engineSizes.items[ri * 2];
              const right = data.engineSizes.items[ri * 2 + 1];
              return (
                <div key={ri} className="grid grid-cols-2 items-center">
                  <div className="flex items-center gap-2.5 py-3 pr-3">
                    <Icon name="engine" className="h-7 w-7 shrink-0 text-hero-blue" />
                    <p className="text-xs leading-tight">
                      <span className="block text-white">Land Rover C-Class</span>
                      <span className="block font-bold text-white">{left} Litre Engine</span>
                    </p>
                  </div>
                  {right && (
                    <div className="relative flex items-center gap-2.5 py-3 pl-3">
                      <span className="absolute left-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-white/15" aria-hidden="true" />
                      <Icon name="engine" className="h-7 w-7 shrink-0 text-hero-blue" />
                      <p className="text-xs leading-tight">
                        <span className="block text-white">Land Rover C-Class</span>
                        <span className="block font-bold text-white">{right} Litre Engine</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* fuel types */}
          <div className="mt-8">
            <SectionHeader icon={data.fuelTypes.icon} title={data.fuelTypes.title} />

            <div className="mt-5 space-y-3">
              {data.fuelTypes.items.map((f) => (
                <div key={f.label} className="neon-card neon-card--soft relative flex items-center gap-3 rounded-xl px-4 py-4">
                  <Icon name={f.icon} className="h-11 w-11 shrink-0 text-hero-blue" />
                  <p className="flex-1 text-sm leading-tight">
                    <span className="block text-white">Land Rover C-Class</span>
                    <span className="block font-bold text-white">{f.label}</span>
                  </p>
                  <span className="shrink-0 text-lg text-hero-blue" aria-hidden>
                    ›
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* services available */}
        <div className="relative mt-2 overflow-hidden rounded-t-3xl bg-(--color-light-surface) px-3 pb-3 pt-6">
          <SectionHeader icon="cog" title={data.services.title} dark={false} />

          {/* BMW mobile ref (S-16): tight 5-col row, short 2-line labels, "(where suitable)" as small subtext */}
          <div className="mt-5 grid grid-cols-5 items-start divide-x divide-black/10">
            {data.services.items.map((s) => {
              const [main, note] = s.label.split(/\s*(\(.*\))\s*$/);
              return (
                <div key={s.label} className="flex min-w-0 flex-col items-center gap-2 px-1 text-center">
                  <Icon name={s.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <p className="text-[11px] font-medium leading-tight text-[#101828] [hyphens:auto]">{main}</p>
                  {note && <p className="-mt-1 text-[9px] leading-tight text-[#4a5568]">{note}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div
        className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8"
        style={{ background: "linear-gradient(135deg, #141813 0%, #0a0c09 100%)" }}
      >
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(96,112,86,0.35) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-hero-blue/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* engine sizes */}
        <SectionHeader icon={data.engineSizes.icon} title={data.engineSizes.title} />

        <div className="mt-5 grid grid-cols-4 gap-4">
          {data.engineSizes.items.map((size, i) => (
            <div
              key={size}
              className="neon-card neon-card--soft relative flex items-center gap-3 rounded-xl px-4 py-4"
              style={i === 8 ? { gridColumn: "2 / 3" } : undefined}
            >
              <Icon name="engine" className="h-8 w-8 shrink-0 text-hero-blue" />
              <p className="text-sm leading-tight">
                <span className="block text-white">Land Rover C-Class</span>
                <span className="block font-bold text-white">{size} Litre Engine</span>
              </p>
            </div>
          ))}
        </div>

        {/* fuel types */}
        <div className="mt-10">
          <SectionHeader icon={data.fuelTypes.icon} title={data.fuelTypes.title} />

          <div className="mt-5 grid grid-cols-3 gap-4">
            {data.fuelTypes.items.map((f) =>
              f.color === "red" ? (
                <div
                  key={f.label}
                  className="relative flex items-center gap-4 rounded-xl border-2 px-5 py-6"
                  style={{
                    borderColor: "var(--color-hero-gold)",
                    background: "linear-gradient(135deg, rgba(40,30,10,0.7) 0%, rgba(10,8,5,0.9) 100%)",
                    boxShadow: "0 0 0 3px rgba(96,112,86,0.18), 0 0 30px -4px rgba(96,112,86,0.75)",
                  }}
                >
                  <Icon name={f.icon} className="h-13 w-13 shrink-0 text-hero-blue" />
                  <p className="text-sm leading-tight">
                    <span className="block text-white">Land Rover C-Class</span>
                    <span className="block font-bold text-white">{f.label}</span>
                  </p>
                </div>
              ) : (
                <div key={f.label} className="neon-card neon-card--soft relative flex items-center gap-4 rounded-xl px-5 py-6">
                  <Icon name={f.icon} className="h-13 w-13 shrink-0 text-hero-blue" />
                  <p className="text-sm leading-tight">
                    <span className="block text-white">Land Rover C-Class</span>
                    <span className="block font-bold text-white">{f.label}</span>
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* services available */}
        <div className="mt-10 rounded-2xl bg-(--color-light-surface) px-6 pb-4 pt-5 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)]">
          <SectionHeader icon="cog" title={data.services.title} dark={false} />

          <div className="mt-3 grid grid-cols-5">
            {data.services.items.map((s, i) => (
              <div key={s.label} className="relative flex flex-col items-center gap-2 px-4 text-center">
                {i > 0 && <span className="absolute left-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-black/10" />}
                <Icon name={s.icon} className="h-14 w-14 shrink-0 text-hero-blue" />
                <p className="text-sm font-semibold text-[#101828]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
