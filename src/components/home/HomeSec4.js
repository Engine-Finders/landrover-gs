import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

export default function HomeSec4({ data }) {
  return (
    <section className="px-2 pt-3 pb-8 sm:px-6 lg:px-8">
      <div className="theme-light relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-hero-blue/30 px-3 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
        <div className="text-center">
          <div className="mx-auto mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-hero-blue/40" />
            <LandRoverLogo className="h-13 w-13 text-[#1a1a1a]" />
            <span className="h-px w-16 bg-hero-blue/40" />
          </div>
          <h2 className="h2 text-[#1a1a1a]">{data.h2}</h2>
          <p className="body-text mt-2 text-[#1a1a1a]">{data.description}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {data.symptoms.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              className="group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image src={s.image} alt={s.label} fill className="object-cover" sizes="220px" />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(140% 100% at 0% 100%, rgba(241,237,232,0.95) 0%, transparent 55%), radial-gradient(110% 90% at 100% 100%, rgba(241,237,232,0.92) 0%, transparent 50%)",
                  }}
                />
                <Icon
                  name={s.icon}
                  className="absolute bottom-11 left-2 h-7 w-7 text-hero-blue drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] sm:bottom-16 sm:left-3 sm:h-9 sm:w-9"
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 px-2 py-1.5 backdrop-blur-md sm:px-3 sm:py-2.5"
                style={{
                  background: `
                    radial-gradient(65% 90% at 15% 115%, rgba(241,237,232,0.98) 0%, transparent 58%),
                    radial-gradient(80% 100% at 55% 120%, rgba(241,237,232,0.95) 0%, transparent 62%),
                    radial-gradient(55% 85% at 90% 115%, rgba(241,237,232,0.96) 0%, transparent 55%),
                    radial-gradient(120% 70% at 40% 110%, rgba(241,237,232,0.85) 0%, transparent 68%),
                    linear-gradient(to top, rgba(241,237,232,0.9) 0%, transparent 100%)
                  `,
                  paddingTop: "1rem",
                }}
              >
                <p className="text-xs font-semibold leading-tight text-[#1a1a1a] sm:text-sm">
                  {i + 1}. {s.label}
                </p>
                <span className="mt-1 block h-0.5 w-1/2 bg-hero-blue transition-all group-hover:w-full sm:mt-2" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
