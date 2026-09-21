import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import EngineExplorerForm from "./EngineExplorerForm";
import explorer from "@/data/shared/engineExplorer.json";

export default function HomeSec13({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="h2 uppercase">
              <span className="block text-[#1a1a1a]">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>

            <p className="mt-2 text-xs text-[#1a1a1a]">{data.description}</p>
          </div>

          <div className="relative h-40 w-40 shrink-0 overflow-hidden">
            <LandRoverLogo className="absolute -right-1 -top-1 z-10 h-11 w-11 opacity-60" />
            <Image
              src={data.image}
              alt="Engine core"
              fill
              className="scale-[1.35] object-cover"
              sizes="200px"
            />
          </div>
        </div>

        <EngineExplorerForm fields={data.fields} explorer={explorer} ctaButton={data.ctaButton} mobile />

        <div
          className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 rounded-2xl border border-white/10 bg-hero-dark p-4"
          style={{ "--color-hero-blue": "#607056" }}
        >
          {data.trustBadges.map((b, i) => (
            <div key={b.label} className="relative flex items-center gap-2.5">
              {i % 2 === 1 && <span className="absolute -left-2 top-0 h-full w-0.5 bg-white/35" />}
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hero-blue/20 shadow-[0_0_12px_rgba(96,112,86,0.25)]">
                <Icon name={b.icon} className="h-6 w-6 text-hero-blue" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-extrabold uppercase text-white">{b.value}</p>
                <p className="label-text truncate uppercase text-white/80">{b.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden px-4 py-6 sm:px-6 md:block lg:px-8">
        <LandRoverLogo className="absolute right-6 top-6 h-14 w-14 opacity-60" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="h2 uppercase">
                <span className="block text-[#1a1a1a]">{line1}</span>
                <span className="block text-hero-blue">{line2}</span>
              </h2>
              <p className="mt-2 max-w-lg text-sm text-[#1a1a1a]">{data.description}</p>

              <EngineExplorerForm fields={data.fields} explorer={explorer} ctaButton={data.ctaButton} />
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden">
              <Image src={data.image} alt="Engine core" fill className="scale-[1.35] object-cover" sizes="480px" />
            </div>
          </div>

          <div className="glass-card mt-5 flex items-center justify-between gap-6 rounded-xl px-6 py-4">
            {data.trustBadges.map((b, i) => (
              <div key={b.label} className="flex flex-1 items-center gap-3">
                {i > 0 && <span className="mr-2 h-14 w-0.5 shrink-0 bg-black/25" />}
                <Icon name={b.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-sm font-bold uppercase text-[#1a1a1a]">{b.value}</p>
                  <p className="whitespace-nowrap text-xs uppercase text-[#1a1a1a]">{b.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
