import Image from "next/image";
import Icon from "@/components/reusable/Icon";

export default function HomeSec4({ data }) {
  return (
    <section className="px-2 pt-3 pb-8 sm:px-6 lg:px-8">
      <div className="theme-light relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-hero-blue/30 px-3 pb-6 pt-4 sm:px-8 sm:pb-8 sm:pt-5">
        <div className="text-center">
          <h2 className="h2 text-[#1a1a1a]">{data.h2}</h2>
          <p className="body-text mt-2 text-[#1a1a1a]">{data.description}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {data.symptoms.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              className="group relative aspect-square overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
              style={{ background: "#f1ede8" }}
            >
              <Image src={s.image} alt={s.label} fill className="object-cover" sizes="220px" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(241,237,232,0) 0%, rgba(241,237,232,0.06) 36%, rgba(241,237,232,0.54) 61%, rgba(241,237,232,0.94) 81%, rgba(241,237,232,1) 100%)",
                }}
              />
              <Icon
                name={s.icon}
                className="absolute bottom-11 left-2 z-10 h-8 w-8 text-white sm:bottom-16 sm:left-3 sm:h-10 sm:w-10"
                style={{ filter: "drop-shadow(0 0 1.25px rgba(255,255,255,0.95)) drop-shadow(0 2px 2px rgba(0,0,0,0.85))" }}
              />
              <div className="absolute inset-x-0 bottom-0 z-10 px-2 py-1.5 sm:px-3 sm:py-2.5">
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
