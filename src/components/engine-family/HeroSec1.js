import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

const GOLD = "text-[#c9a96e]";

function Brand({ logoClass, textClass }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <LandRoverLogo className={logoClass} />
      <span className={`font-semibold uppercase tracking-[0.2em] text-white/85 ${textClass}`}>Above &amp; Beyond</span>
    </div>
  );
}

function Title({ data, className = "" }) {
  return (
    <h1 className={`h1 uppercase ${className}`}>
      <span className="block">
        <span className="text-white">Land Rover </span>
        <span className="text-hero-blue">{data.titlePre}</span>
      </span>
      <span className="block text-white">
        {data.titleHighlight} {data.titleLine2}
      </span>
    </h1>
  );
}

export default function HeroSec1({ data }) {
  return (
    <section className="theme-dark relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="absolute inset-0">
          <Image src={data.imageMobile} alt="Land Rover technician rebuilding an engine block" fill priority className="object-cover object-[75%_center]" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #0a0f0b 0%, rgba(10,15,11,0.9) 60%, rgba(10,15,11,0.55) 85%, rgba(10,15,11,0.35) 100%)" }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-hero-dark/10 to-hero-dark" />
        </div>

        <div className="relative px-4 pb-6 pt-5">
          <div className="max-w-[88%]">
            <Brand logoClass="h-9 w-16" textClass="text-[9px]" />
            <Title data={data} className="mt-3" />
            <span className="gold-rule mt-3 block w-40" aria-hidden="true" />

            <p className="mt-3 text-sm leading-snug text-white">{data.subhead}</p>

            <div className="mt-3 flex items-center gap-2">
              <div className={`flex shrink-0 gap-0.5 ${GOLD}`}>
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-[10px] font-semibold uppercase leading-tight text-white">{data.rating.label}</p>
            </div>
          </div>

          {/* five-column feature breakdown — gold line icons directly on the photo */}
          <div className="relative mt-4 grid grid-cols-5 divide-x divide-white/15">
            {data.trustBar.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-1 px-1 text-center">
                <Icon name={t.icon} className={`h-7 w-7 shrink-0 ${GOLD}`} />
                <p className="text-[8px] font-medium leading-tight text-white">{t.label}</p>
              </div>
            ))}
          </div>

          {/* price + CTAs */}
          <div className="mt-4 flex flex-col items-center text-center">
            <p className="text-sm italic text-white">{data.priceCta.kicker}</p>
            <p className="gold-text text-2xl font-extrabold italic">{data.priceCta.label}</p>
          </div>

          <a
            href={data.priceCta.href}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
          >
            {data.priceCta.buttonLabel}
          </a>

          <a
            href={data.phoneCta.href}
            className="mt-2.5 flex items-center justify-center gap-2 rounded-lg border border-[#c9a96e]/60 py-3 text-sm font-bold text-white"
          >
            <Icon name={data.phoneCta.icon} className={`h-4 w-4 shrink-0 ${GOLD}`} />
            {data.phoneCta.label}: {data.phoneCta.phone}
          </a>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden overflow-hidden md:block">
        <div className="absolute inset-0">
          {/* sec1.jpg already bakes a dark-green panel into its left half for the copy */}
          <Image src={data.image} alt="Land Rover technician rebuilding an engine block" fill priority className="object-fill" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(8,14,10,0.75) 0%, rgba(8,14,10,0.45) 40%, transparent 62%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-[76rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="max-w-xl">
            <Brand logoClass="h-12 w-20" textClass="text-[11px]" />

            <Title data={data} className="mt-4" />
            <span className="gold-rule mt-4 block w-full max-w-md" aria-hidden="true" />

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white lg:text-[15px]">{data.subhead}</p>

            <div className="mt-4 flex items-center gap-2.5">
              <div className={`flex shrink-0 gap-1 ${GOLD}`}>
                {Array.from({ length: data.rating.stars }).map((_, i) => (
                  <Icon key={i} name="star" className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="whitespace-nowrap text-sm font-medium text-white">{data.rating.label}</p>
            </div>

            {/* five-column feature breakdown — gold line icons directly on the photo, no card */}
            <div className="mt-6 grid grid-cols-5 divide-x divide-white/15">
              {data.trustBar.map((t) => (
                <div key={t.label} className="flex min-w-0 flex-col items-center gap-2 px-3 text-center">
                  <Icon name={t.icon} className={`h-10 w-10 shrink-0 ${GOLD}`} />
                  <p className="min-w-0 text-[11px] leading-snug text-white">{t.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-stretch gap-6">
              <div className="flex shrink-0 flex-col justify-center">
                <p className="text-base italic text-white">{data.priceCta.kicker}</p>
                <p className="gold-text text-5xl font-extrabold italic leading-tight">{data.priceCta.label}</p>
                <span className="gold-rule mt-1 block w-full" aria-hidden="true" />
              </div>
              <span className="w-px shrink-0 bg-white/15" aria-hidden="true" />
              <div className="flex flex-col justify-center gap-2.5">
                <a
                  href={data.priceCta.href}
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                  style={{ boxShadow: "0 15px 35px -15px rgba(96,112,86,0.6)" }}
                >
                  {data.priceCta.buttonLabel}
                </a>
                <a
                  href={data.phoneCta.href}
                  className="flex items-center gap-2.5 whitespace-nowrap rounded-lg border border-[#c9a96e]/60 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <Icon name={data.phoneCta.icon} className={`h-4 w-4 shrink-0 ${GOLD}`} />
                  {data.phoneCta.label}: {data.phoneCta.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
