import Icon from "@/components/reusable/Icon";

export default function ModelSec6({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-3 md:hidden">
        <div className="mb-6 flex justify-center">
          <div
            className="h-px w-40"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-bmw-blue), var(--color-bmw-violet), var(--color-bmw-red), transparent)",
            }}
          />
        </div>

        <div
          className="glass-card-dark grid grid-cols-4 divide-x divide-white/15 rounded-2xl border border-hero-blue/50 px-2 py-2"
          style={{ boxShadow: "0 0 14px rgba(173,135,92,0.5)" }}
        >
          {data.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-1.5 px-1 text-center">
              <Icon name={m.icon} className="h-7 w-7 text-white" />
              <p className="text-sm font-extrabold leading-tight text-white">
                {m.value} {m.suffix && <span className="text-hero-blue">{m.suffix}</span>}
              </p>
              <p className="label-text font-semibold uppercase leading-tight tracking-wide text-hero-blue/90">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div
          className="glass-card-dark relative mx-auto grid max-w-6xl grid-cols-4 divide-x divide-white/25 rounded-2xl border border-hero-blue/50 px-6 py-6"
          style={{ boxShadow: "0 0 18px rgba(173,135,92,0.5)" }}
        >
          {data.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-hero-blue/40 bg-hero-blue/10">
                <Icon name={m.icon} className="h-7 w-7 text-white" />
              </span>
              <p className="text-2xl font-extrabold text-white lg:text-3xl">
                {m.value} {m.suffix && <span className="text-hero-blue">{m.suffix}</span>}
              </p>
              <p className="label-text uppercase tracking-widest text-hero-blue/90">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
