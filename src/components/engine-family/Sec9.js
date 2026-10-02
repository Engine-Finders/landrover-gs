import Image from "next/image";
import EdgeFade from "@/components/reusable/EdgeFade";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import Icon from "@/components/reusable/Icon";

// short gold dash rule under each title (reference: "— — —")
function GoldDash({ className = "" }) {
  return (
    <span className={`flex items-center gap-1 ${className}`} aria-hidden="true">
      <span className="h-0.5 w-8 bg-[#c9a96e]" />
      <span className="h-0.5 w-4 bg-[#c9a96e]/70" />
      <span className="h-0.5 w-4 bg-[#c9a96e]/50" />
    </span>
  );
}

// thin gold band with a slashed badge, between the three blocks
function GoldSeam() {
  return (
    <div className="relative h-0.5 bg-[#c9a96e]/70" aria-hidden="true">
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-1 bg-transparent">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-3 w-1.5 -skew-x-20 bg-[#c9a96e]" />
        ))}
      </span>
    </div>
  );
}

// first sentence (or two) as separate paragraphs, the way the reference breaks the about copy
function Paragraphs({ text, className }) {
  const parts = text.split(/(?<=\.)\s+(?=[A-Z])/);
  const groups = [];
  for (let i = 0; i < parts.length; i += 2) groups.push(parts.slice(i, i + 2).join(" ").trim());
  return groups.map((g, i) => (
    <p key={i} className={`${className} ${i > 0 ? "mt-3" : ""}`}>
      {g}
    </p>
  ));
}

export default function Sec9({ data }) {
  const { about, byModel, compatibility } = data;
  const code = about.titleHighlight;

  return (
    <>
      {/* ============ about ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pt-7 md:hidden">
          <div className="flex items-center gap-2.5">
            <LandRoverLogo className="h-7 w-12" />
            <p className="text-sm font-bold uppercase text-hero-blue">{about.kicker}</p>
          </div>
          <h2 className="h2 mt-2 uppercase">
            <span className="block text-[#101828]">{about.titlePre}</span>
            <span className="block">
              <span className="text-hero-blue">{code}</span>
              <span className="text-[#101828]">{about.titlePost}</span>
            </span>
          </h2>
          <GoldDash className="mt-3" />
        </div>
        <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden md:hidden">
          <Image src={about.imageMobile} alt={`Land Rover ${code} engine on a workshop stand`} fill className="object-cover object-center" sizes="100vw" />
          <EdgeFade color="var(--theme-light-bg)" />
        </div>
        <div className="relative px-4 pb-7 pt-4 md:hidden">
          <Paragraphs text={about.body} className="text-sm leading-relaxed text-[#101828]" />
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          {/* sec9_top.jpg has its own white left fade; photo pinned right */}
          {/* photo starts 18% in so the engine clears the wider copy column; uncovered strip is white like the photo's own left edge */}
          <div className="absolute inset-0 bg-white">
            <div className="absolute inset-y-0 left-[18%] right-0">
              <Image src={about.image} alt={`Land Rover ${code} engine on a workshop stand`} fill className="object-fill" sizes="82vw" />
            </div>
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <LandRoverLogo className="h-10 w-16" />
                <p className="text-sm font-bold uppercase text-hero-blue">{about.kicker}</p>
              </div>
              <h2 className="h2 mt-4 uppercase">
                <span className="block text-[#101828]">{about.titlePre}</span>
                <span className="block">
                  <span className="text-hero-blue">{code}</span>
                  <span className="text-[#101828]">{about.titlePost}</span>
                </span>
              </h2>
              <GoldDash className="mt-5" />
              <div className="mt-5">
                <Paragraphs text={about.body} className="text-sm leading-relaxed text-[#101828] lg:text-[15px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldSeam />

      {/* ============ applications by model ============ */}
      <section className="theme-dark relative overflow-hidden bg-[#0d0f0d]">
        {/* ===== mobile ===== */}
        <div className="relative aspect-[3/2] w-full overflow-hidden md:hidden">
          <Image src={byModel.imageMobile} alt={`Land Rover Defender — ${code} application`} fill className="object-cover object-center" sizes="100vw" />
          <EdgeFade color="#0d0f0d" top="h-10" bottom="h-16" />
        </div>
        <div className="relative px-4 pb-7 pt-5 md:hidden">
          <div className="flex items-center gap-2">
            <Icon name="car" className="h-5 w-5 text-[#c9a96e]" />
            <p className="text-sm font-bold uppercase text-white">{byModel.kicker}</p>
          </div>
          <h2 className="h2 mt-2 uppercase">
            <span className="text-hero-blue">{byModel.titleHighlight}</span>
            <span className="text-white">{byModel.titlePost}</span>
          </h2>
          <GoldDash className="mt-3" />
          <p className="mt-4 text-sm leading-relaxed text-white">{byModel.body}</p>
        </div>

        {/* ===== desktop — Defender photo on the left (its right side is plain dark sky), copy right ===== */}
        <div className="relative hidden md:block">
          {/* full-bleed: sec9_middle is a wide panorama — Defender on the left, plain dark sky to the right */}
          <div className="absolute inset-0">
            <Image src={byModel.image} alt={`Land Rover Defender — ${code} application`} fill className="object-cover object-left" sizes="100vw" />
          </div>
          <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_auto] items-center gap-8 px-4 py-14 sm:px-6 lg:px-8">
            <span aria-hidden="true" />
            <div>
              <div className="flex items-center gap-3">
                <Icon name="car" className="h-7 w-7 text-[#c9a96e]" />
                <p className="text-sm font-bold uppercase text-white">{byModel.kicker}</p>
              </div>
              <h2 className="h2 mt-2 whitespace-nowrap uppercase">
                <span className="text-hero-blue">{byModel.titleHighlight}</span>
                <span className="text-white">{byModel.titlePost}</span>
              </h2>
              <GoldDash className="mt-4" />
              <div className="mt-5">
                <Paragraphs text={byModel.body} className="text-sm leading-relaxed text-white lg:text-[15px]" />
              </div>
            </div>
            <Icon name="clipboard" className="h-36 w-36 text-[#c9a96e]/80" />
          </div>
        </div>
      </section>

      <GoldSeam />

      {/* ============ compatibility ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pt-7 md:hidden">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-7 w-7 text-hero-blue" />
            <p className="text-sm font-bold uppercase text-hero-blue">{compatibility.kicker}</p>
          </div>
          <h2 className="h2 mt-2 uppercase">
            <span className="text-[#101828]">{compatibility.titleHighlight}</span>
            <span className="text-hero-blue">{compatibility.titlePost}</span>
          </h2>
          <GoldDash className="mt-3" />
          <p className="mt-4 text-sm leading-relaxed text-[#101828]">{compatibility.body}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#101828]">{compatibility.boldNote}</p>
        </div>
        <div className="relative mt-4 px-4 pb-7 md:hidden">
          <div className="space-y-2.5">
            {compatibility.points.map((p) => (
              <div key={p.title} className="glass-card flex items-center gap-3 rounded-xl p-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1e3324]">
                  <Icon name={p.icon} className="h-5 w-5 text-white" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#101828]">{p.title}</p>
                  <p className="text-[11px] uppercase leading-snug text-[#101828]">{p.text}</p>
                </div>
                <Icon name="check" className="h-5 w-5 shrink-0 rounded-full border border-hero-blue p-0.5 text-hero-blue" />
              </div>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          {/* sec9_bottom.jpg: Defender on a highland road, white on its left — pinned right */}
          <div className="absolute inset-0">
            <Image src={compatibility.image} alt={`Land Rover Defender — ${code} compatibility`} fill className="object-fill" sizes="100vw" />
          </div>

          <div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)_minmax(0,0.2fr)] items-center gap-10 px-4 py-14 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <Icon name="shield-check" className="h-9 w-9 text-hero-blue" />
                <p className="text-sm font-bold uppercase text-hero-blue">{compatibility.kicker}</p>
              </div>
              <h2 className="h2 mt-3 whitespace-nowrap uppercase">
                <span className="text-[#101828]">{compatibility.titleHighlight} </span>
                <span className="text-hero-blue">{compatibility.titlePost.trim()}</span>
              </h2>
              <GoldDash className="mt-4" />
              <p className="mt-5 text-sm leading-relaxed text-[#101828] lg:text-[15px]">{compatibility.body}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#101828] lg:text-[15px]">{compatibility.boldNote}</p>
            </div>

            <div className="space-y-2.5">
              {compatibility.points.map((p) => (
                <div key={p.title} className="glass-card flex items-center gap-4 rounded-xl p-2.5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1e3324]">
                    <Icon name={p.icon} className="h-6 w-6 text-white" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-[#101828]">{p.title}</p>
                    <p className="text-xs uppercase leading-snug text-[#101828]">{p.text}</p>
                  </div>
                  <Icon name="check" className="h-6 w-6 shrink-0 rounded-full border border-hero-blue p-0.5 text-hero-blue" />
                </div>
              ))}
            </div>
            <span aria-hidden="true" />
          </div>
        </div>
      </section>
    </>
  );
}
