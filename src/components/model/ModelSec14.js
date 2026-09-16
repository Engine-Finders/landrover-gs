import Image from "next/image";

export default function ModelSec14({ data }) {
  const line1Words = data.line1.split(" ");
  const mobileLine1a = line1Words.slice(0, 3).join(" ");
  const mobileLine1b = line1Words.slice(3).join(" ");
  const [line2Word1, ...line2WordsRest] = data.line2Highlight.split(" ");
  const mobileLine2Rest = `${line2WordsRest.join(" ")}${data.line2Rest}`;

  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative h-44">
          <div className="absolute inset-0">
            <Image src={data.imageMobile} alt="Racked Land Rover replacement engines in storage" fill className="object-cover object-right" sizes="100vw" />
            <div className="absolute inset-0 bg-linear-to-r from-hero-dark/90 via-hero-dark/40 to-transparent" />
          </div>

          <div className="relative max-w-[68%] px-4 py-5">
            <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
              <span className="block text-white">{mobileLine1a}</span>
              <span className="block text-white">{mobileLine1b}</span>
              <span className="block text-hero-blue">{line2Word1}</span>
              <span className="block text-white">{mobileLine2Rest}</span>
            </h2>
          </div>
        </div>

        <div className="relative max-w-[85%] px-4 pb-10">
          <p className="text-sm leading-relaxed text-white">{data.paragraph}</p>

          <p className="mt-4 text-sm text-white">
            <span className="font-bold">{data.calloutBold}</span>
            <span className="text-white">{data.calloutRest}</span>
          </p>

          <a
            href={data.cta.href}
            className="mt-5 inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/30 px-5 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--color-hero-gold) 0%, #8c6c46 100%)",
              boxShadow: "0 8px 20px rgba(173,135,92,0.4)",
            }}
          >
            {data.cta.label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
      <div className="absolute inset-0">
        <Image src={data.image} alt="Racked Land Rover replacement engines in storage" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-[46%]">
          <h2 className="h2 origin-left scale-y-110 scale-x-90 uppercase">
            <span className="block whitespace-nowrap text-white">{data.line1}</span>
            <span className="block">
              <span className="text-hero-blue">{data.line2Highlight}</span>
              <span className="text-white">{data.line2Rest}</span>
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white">{data.paragraph}</p>

          <p className="mt-4 text-sm text-white">
            <span className="font-bold">{data.calloutBold}</span>
            <span className="text-white">{data.calloutRest}</span>
          </p>

          <a
            href={data.cta.href}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--color-hero-gold) 0%, #8c6c46 100%)",
              boxShadow: "0 8px 20px rgba(173,135,92,0.4)",
            }}
          >
            {data.cta.label} <span aria-hidden>→</span>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
