import Image from "next/image";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import AMGBadge from "@/components/reusable/AMGBadge";
import Icon from "@/components/reusable/Icon";

function Kicker() {
  return (
    <div className="flex items-center gap-2">
      <LandRoverLogo className="h-7 w-7" />
      <AMGBadge className="h-3.5" />
    </div>
  );
}

function Title({ kicker, titlePre, titleHighlight, titlePost, dark = false, kickerClass, nowrap = false }) {
  return (
    <>
      <p className={`mt-3 text-xs font-bold uppercase tracking-widest ${kickerClass || (dark ? "text-white/70" : "text-[#4a5568]")}`}>{kicker}</p>
      <h2 className="h2 mt-1 uppercase">
        {titlePre && <span className={`block ${dark ? "text-white" : "text-[#101828]"}`}>{titlePre}</span>}
        <span className={`block ${nowrap ? "whitespace-nowrap" : ""}`}>
          <span className="text-hero-blue">{titleHighlight}</span>
          <span className={dark ? "text-white" : "text-[#101828]"}>{titlePost}</span>
        </span>
      </h2>
      <span className="mt-3 block h-0.5 w-24 bg-linear-to-r from-hero-blue via-white to-hero-blue" />
    </>
  );
}

export default function Sec9({ data }) {
  const { about, byModel, compatibility } = data;

  return (
    <>
      {/* ============ about ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative bg-white px-4 py-7 md:hidden">
          <Kicker kicker={about.kicker} />
          <Title {...about} />
        </div>
        <div className="relative -mt-1 aspect-4/3 w-full overflow-hidden md:hidden">
          <Image src={about.imageMobile} alt="the engine engine on workshop stand" fill className="object-cover" sizes="100vw" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-10"
            style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 100%)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
            style={{ background: "linear-gradient(to top, #fff 0%, transparent 100%)" }}
          />
        </div>
        <div className="relative bg-white px-4 pb-7 md:hidden">
          <p className="text-xs leading-relaxed text-[#101828]">{about.body}</p>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={about.image} alt="the engine engine on workshop stand" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #fff 0%, #fff 45%, rgba(255,255,255,0.85) 58%, rgba(255,255,255,0.3) 72%, transparent 88%)" }}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-md">
              <Kicker kicker={about.kicker} />
              <Title {...about} />
              <p className="mt-4 text-sm leading-relaxed text-[#101828] lg:text-[15px]">{about.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ applications by model ============ */}
      <section className="theme-dark relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pt-7 md:hidden">
          <Title {...byModel} dark kickerClass="text-hero-blue" />
        </div>

        <div className="relative mt-4 aspect-1024/289 w-full overflow-hidden bg-black md:hidden">
          <Image src={byModel.imageMobile} alt="Land Rover lineup in showroom" fill className="object-cover" sizes="100vw" />
        </div>

        <div className="relative px-4 pb-7 md:hidden">
          <p className="mt-4 text-xs leading-relaxed text-white">{byModel.body}</p>
        </div>

        {/* ===== desktop — full-bleed, shifted right, solid dark block on the left so the ===== */}
        {/* ===== image's own dark background blends seamlessly into the section bg      ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image
              src={byModel.image}
              alt="Land Rover lineup in showroom"
              fill
              className="object-cover"
              style={{ objectPosition: "85% center" }}
              sizes="100vw"
            />
            {/* solid block — flat-matches the section's #0d0d0d, not a fade, so there's no visible seam */}
            <div className="absolute inset-y-0 left-0 w-[46%]" style={{ background: "#0d0d0d" }} aria-hidden="true" />
            {/* short blend zone at the edge of the block into the visible photo */}
            <div
              className="absolute inset-y-0 left-[46%] w-[18%]"
              style={{ background: "linear-gradient(to right, #0d0d0d 0%, rgba(13,13,13,0.7) 45%, transparent 100%)" }}
              aria-hidden="true"
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <Title {...byModel} dark kickerClass="text-hero-blue" />
              <p className="mt-4 text-sm leading-relaxed text-white lg:text-[15px]">{byModel.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ compatibility ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative bg-white px-4 py-7 md:hidden">
          <Title {...compatibility} kickerClass="text-hero-blue" nowrap />
          <p className="mt-4 text-xs leading-relaxed text-[#101828]">{compatibility.body}</p>
          <p className="mt-2 text-xs font-bold leading-relaxed text-[#101828]">{compatibility.boldNote}</p>

          <div className="relative mt-5 overflow-hidden rounded-2xl">
            <div className="absolute inset-0">
              <Image src={compatibility.imageMobile} alt="the engine engine compatibility scan" fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-linear-to-b from-white/85 via-white/55 to-white/85" />
            </div>
            <div className="relative space-y-2.5 p-4">
              {compatibility.points.map((p) => (
                <div key={p.title} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white/90 p-3 shadow-sm">
                  <Icon name={p.icon} className="h-6 w-6 shrink-0 text-hero-blue" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#101828]">{p.title}</p>
                    <p className="text-[10px] leading-snug text-[#4a5568]">{p.text}</p>
                  </div>
                  <Icon name="check" className="h-5 w-5 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={compatibility.image} alt="the engine engine compatibility scan" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #fff 0%, #fff 36%, rgba(255,255,255,0.6) 48%, rgba(255,255,255,0.15) 62%, transparent 74%)" }}
            />
          </div>

          <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-0 px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <Title {...compatibility} kickerClass="text-hero-blue" nowrap />
              <p className="mt-4 text-sm leading-relaxed text-[#101828] lg:text-[15px]">{compatibility.body}</p>
              <p className="mt-3 text-sm font-bold leading-relaxed text-[#101828]">{compatibility.boldNote}</p>
            </div>

            <div className="w-full max-w-69 space-y-3">
              {compatibility.points.map((p) => (
                <div key={p.title} className="flex items-center gap-4 rounded-xl border border-black/10 bg-white/55 p-4 shadow-sm backdrop-blur-sm">
                  <Icon name={p.icon} className="h-7 w-7 shrink-0 text-hero-blue" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold uppercase tracking-wide text-[#101828]">{p.title}</p>
                    <p className="text-xs leading-snug text-[#4a5568]">{p.text}</p>
                  </div>
                  <Icon name="check" className="h-6 w-6 shrink-0 rounded-full border border-hero-blue text-hero-blue" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
