import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

export default function HomeSec4_5({ data }) {
  const [line1, line2] = data.h2.split("|");

  return (
    <section
      className="theme-dark relative overflow-hidden"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 93%, 52% 100%, 0 93%)" }}
    >
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        {/* fixed aspect box matching the real crop, so the flex-1 spacer below reliably pushes
            the footer down to the photo's bottom edge instead of collapsing to content height */}
        <div className="relative w-full" style={{ aspectRatio: "819 / 1900" }}>
          <div className="absolute inset-0">
            <Image src={data.mobileImage} alt="Land Rover-AMG driving through London at dusk" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-hero-dark/35" />
            {/* solid black behind the whole top text block for legibility over the busy photo */}
            <div className="absolute inset-x-0 top-0 h-[58%] bg-linear-to-b from-black via-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-hero-dark to-transparent" />
          </div>

          {/* content flows from the top only — no flex-1 spacer stretching to the box's full
              height, so a taller box (needed to clear the car under the button) doesn't also
              blow out the gap before the footer. Footer is pinned near the bottom independently. */}
          <div className="absolute inset-x-0 top-0 flex flex-col px-4 pt-6">
            <div className="flex items-center gap-2">
              <LandRoverLogo className="h-8 w-8 shrink-0" />
              <p className="label-text uppercase leading-tight tracking-widest text-white">
                <span className="block">Performance</span>
                <span className="block">Belongs On The Road</span>
              </p>
            </div>
            <div className="text-center">
              <p className="label-text mt-3 whitespace-nowrap uppercase tracking-wide text-white">{data.kicker}</p>
              <h2 className="h2 mt-1.5 uppercase">
                <span className="block text-white">{line1}</span>
                <span className="block text-hero-blue">{line2}</span>
              </h2>
              <p className="mt-2 text-xl font-bold uppercase text-white">{data.subhead1}</p>
              <p className="text-sm font-semibold uppercase tracking-wide text-white">{data.subhead2}</p>
            </div>

            <div className="body-text mt-2.5 space-y-0.5 text-center text-white">
              {data.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p className="font-semibold text-white">{data.bodyBold}</p>
              <p>{data.bodyRest}</p>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              {data.features.map((f, i) => (
                <div key={f.label} className={`flex shrink-0 items-center gap-1 ${i > 0 ? "border-l border-white/20 pl-2" : ""}`}>
                  <Icon name={f.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <span
                    className="text-[11px] font-semibold uppercase leading-tight"
                    style={{ maxWidth: i === 0 ? "48px" : i === 1 ? "74px" : "90px" }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={data.cta.href}
              className="mx-auto mt-3 block w-fit whitespace-nowrap rounded-sm border-2 border-hero-blue bg-hero-blue btn-text px-8 py-3 text-center uppercase text-white shadow-[0_0_20px_rgba(173,135,92,0.4)] transition-colors hover:bg-transparent hover:text-hero-blue"
            >
              {data.cta.label} →
            </a>
          </div>

          {/* pinned a fixed distance from the bottom, independent of the box's total height */}
          <div className="absolute inset-x-0 bottom-14 flex flex-col items-center px-4">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-white/25" />
              <p className="label-text uppercase tracking-widest text-white">{data.footer}</p>
              <span className="h-px w-10 bg-white/25" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden md:block">
        <div className="absolute inset-0">
          <Image src={data.bgImage} alt="Land Rover-AMG driving through London at dusk" fill quality={95} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-hero-dark/45" />
          <div className="absolute inset-0 bg-linear-to-t from-hero-dark via-transparent to-hero-dark/30" />
        </div>

        {/* top row: logo + two-line eyebrow, top-left corner */}
        <div className="relative mx-auto flex max-w-6xl items-center gap-2.5 px-4 pt-6 sm:px-6 lg:px-8">
          <LandRoverLogo className="h-13 w-13 shrink-0" />
          <span className="h-7 w-px shrink-0 bg-white/40" />
          <p className="label-text uppercase leading-tight tracking-widest text-white">
            <span className="block">Performance</span>
            <span className="block">Belongs On The Road</span>
          </p>
        </div>

        {/* headline stack, right-aligned over the photo's empty side */}
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-3 px-4 pt-10 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div />
          <div className="relative pb-16 lg:ml-auto lg:max-w-lg lg:pb-20 lg:pl-6">
            <p className="text-xs uppercase tracking-wide text-white">{data.kicker}</p>
            <h2 className="h2 mt-2 uppercase">
              <span className="block text-white">{line1}</span>
              <span className="block text-hero-blue">{line2}</span>
            </h2>
            <p className="-skew-x-6 origin-left mt-3 text-xl font-bold uppercase text-white sm:text-2xl">{data.subhead1}</p>
            <p className="-skew-x-6 origin-left text-xs font-semibold uppercase tracking-wide text-white">{data.subhead2}</p>

            <div className="mt-4 max-w-xs space-y-1 text-sm text-white lg:max-w-none">
              {data.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p className="font-semibold text-white">{data.bodyBold}</p>
              <p className="whitespace-nowrap text-xs">{data.bodyRest}</p>
            </div>

            <div className="mt-5 flex items-center gap-5">
              {data.features.map((f, i) => (
                <div
                  key={f.label}
                  className={`flex items-center gap-2 ${i > 0 ? "border-l border-white/20 pl-5" : ""}`}
                >
                  <Icon name={f.icon} className="h-8 w-8 shrink-0 text-hero-blue" />
                  <span
                    className={`${i === 0 ? "w-12" : i === 1 ? "w-16" : "w-28"} text-xs font-semibold leading-snug sm:text-sm`}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={data.cta.href}
              className="btn-text mt-6 inline-block rounded-sm border-2 border-hero-blue bg-hero-blue px-7 py-3 text-white transition-colors hover:bg-transparent hover:text-hero-blue"
            >
              {data.cta.label} →
            </a>
          </div>
        </div>

        {/* footer tagline */}
        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-white/25" />
            <p className="text-xs uppercase tracking-widest text-white">{data.footer}</p>
            <span className="h-px w-16 bg-white/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
