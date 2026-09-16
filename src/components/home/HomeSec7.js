import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

function ModelCard({ m, size = "md" }) {
  const imgH = size === "sm" ? "h-20" : "h-28";
  return (
    <a
      href={m.href}
      className={`group relative overflow-hidden rounded-2xl p-3 text-center transition-shadow hover:shadow-md ${
        m.featured ? "border" : "glass-card"
      }`}
      style={
        m.featured
          ? {
              borderColor: "#d9c7a8",
              background: "linear-gradient(155deg, #f3ead9 0%, #f8f4ec 45%, #ffffff 100%)",
            }
          : undefined
      }
    >
      <div className={`relative mb-2 w-full overflow-hidden rounded-md ${imgH}`}>
        <Image src={m.image} alt={m.name} fill className="object-contain" sizes="220px" />
      </div>
      <p className="text-sm font-bold uppercase tracking-wide text-[#1a1a1a]">{m.name}</p>
      <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-hero-blue">
        Explore Engines
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </a>
  );
}

export default function HomeSec7({ data }) {
  return (
    <section className="theme-light relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-hero-blue/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-hero-blue/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        {/* ===== mobile ===== */}
        <div className="md:hidden">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-hero-blue/40" />
            <LandRoverLogo className="h-14 w-14 text-[#1a1a1a]" />
            <span className="h-px w-12 bg-hero-blue/40" />
          </div>
          <h2 className="h2 -skew-x-6 scale-y-115 scale-x-92 mb-4 text-center uppercase text-[#1a1a1a]">
            Find Your <span className="text-hero-blue">Land Rover</span> Model
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {data.models.map((m) => (
              <ModelCard key={m.slug} m={m} size="sm" />
            ))}
          </div>

          <div
            className="glass-card -mx-4 mt-5 flex items-stretch rounded-2xl px-1.5 py-4"
            style={{ boxShadow: "0 0 40px -8px rgba(173,135,92,0.35)" }}
          >
            {data.trustBadges.map((b, i) => (
              <div key={b.label} className="flex min-w-0 flex-1 items-stretch justify-center">
                {i > 0 && <span className="mr-0.5 w-0.5 shrink-0 self-center bg-hero-blue/45" style={{ height: "75%" }} />}
                <div className="flex min-w-0 flex-col items-center gap-1.5 text-center">
                  <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                  <p className="label-text w-full font-semibold leading-tight text-[#1a1a1a]" style={{ hyphens: "auto" }}>{b.label}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={data.cta.href}
            className="btn-text mt-4 block rounded-sm border-2 border-hero-blue px-6 py-3 text-center uppercase text-hero-blue"
          >
            {data.cta.label} →
          </a>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden md:block">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-20 bg-hero-blue/40" />
            <LandRoverLogo className="h-16 w-16 text-[#1a1a1a]" />
            <span className="h-px w-20 bg-hero-blue/40" />
          </div>
          <h2 className="h2 -skew-x-6 scale-y-115 scale-x-92 mb-6 text-center uppercase text-[#1a1a1a]">
            Find Your <span className="text-hero-blue">Land Rover</span> Model
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {data.models.map((m) => (
              <ModelCard key={m.slug} m={m} />
            ))}
          </div>

          <div
            className="glass-card mt-6 flex items-stretch rounded-2xl px-6 py-6"
            style={{ boxShadow: "0 0 40px -8px rgba(173,135,92,0.35)" }}
          >
            {data.trustBadges.map((b, i) => (
              <div key={b.label} className="flex min-w-0 flex-1 items-stretch justify-center">
                {i > 0 && (
                  <span className="mr-6 w-0.5 shrink-0 self-center bg-hero-blue/45" style={{ height: "75%" }} />
                )}
                <div className="flex min-w-0 flex-1 items-stretch gap-2 px-1 text-left">
                  <Icon name={b.icon} className="h-full w-8 shrink-0 text-hero-blue" />
                  <p className="flex items-center text-sm font-semibold text-[#1a1a1a]">{b.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href={data.cta.href}
              className="btn-text inline-block rounded-sm border-2 border-hero-blue px-6 py-3 uppercase text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
            >
              {data.cta.label} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
