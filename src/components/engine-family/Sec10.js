import Image from "next/image";
import EdgeFade from "@/components/reusable/EdgeFade";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

const GOLD = "text-[#c9a96e]";

// the three illustrative stages shown in "A Typical … Rebuild"
const STAGES = [
  { n: "01", icon: "tool", title: "Inspection & Strip-Down", body: "Careful inspection of the crankshaft, cylinder head, and timing components during strip-down.", image: "/engine/sec4.webp" },
  { n: "02", icon: "wrench", title: "Component Replacement", body: "Main bearings, connecting rod bearings, gaskets, seals and timing components replaced as required.", image: "/engine/sec4.webp" },
  { n: "03", icon: "shield-check", title: "Quality Checks", body: "All major rotating assemblies, oil pump, and cooling system components inspected for long-term reliability.", image: "/engine/sec4.webp" },
];

function HexIcon({ name, compact = false }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center bg-white ${compact ? "h-14 w-14" : "h-24 w-24"}`}
      style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)", boxShadow: "inset 0 0 0 2px #dfe3dc" }}
    >
      <Icon name={name} className={`${compact ? "h-7 w-7" : "h-11 w-11"} text-[#101828]`} />
    </span>
  );
}

export default function Sec10({ data }) {
  const t = data.typical;
  const code = (data.titleBigPost || "").trim();

  return (
    <>
      {/* ============ our workshop view ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 py-8 md:hidden">
          <div className="flex items-center gap-2.5">
            <LandRoverLogo className="h-8 w-14" />
            <p className="text-sm font-bold italic uppercase text-hero-blue">{data.titlePre}</p>
          </div>
          <h2 className="h2 mt-2 uppercase">
            <span className="block text-hero-blue">
              {data.titleBigPre}
              {data.titleBigHighlight}
            </span>
            <span className={`block ${GOLD}`}>{code}</span>
          </h2>
          <span className="gold-rule mt-3 block w-28" aria-hidden="true" />
          <div className="relative -mx-4 mt-4 aspect-[4/3] overflow-hidden">
            <Image src="/engine/sec9b_mv2.webp" alt={`Land Rover ${code} engine on a workshop stand`} fill className="object-cover object-right" sizes="100vw" />
            <EdgeFade color="var(--theme-light-bg)" />
          </div>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#101828]">
            {data.subtext.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <div className="mt-5 space-y-3">
            {data.columns.map((c) => (
              <div key={c.title} className="glass-card flex gap-4 rounded-xl p-4">
                <HexIcon name={c.icon} compact />
                <div className="min-w-0">
                  <p className="font-title text-base font-bold italic uppercase text-hero-blue">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#101828]">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden md:block">
          {/* sec9b.jpg is 16:9 with a white left half — full width, height compressed to the header (no cropping) */}
          {/* photo band starts 18% in, so the engine (right half of sec9b) clears the heading/subtext;
              the image's own left side is white, so the uncovered strip is plain white too */}
          <div className="absolute inset-x-0 top-0 h-[26rem] bg-white" aria-hidden="true">
            <div className="absolute inset-y-0 left-[18%] right-0">
              <Image src="/engine/sec9b.jpg" alt="" fill className="object-fill" sizes="82vw" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-(--theme-light-bg) to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
            <div className="max-w-xl">
              <LandRoverLogo className="h-12 w-20" />
              <h2 className="h2 mt-3 whitespace-nowrap uppercase text-[#101828]">{data.titlePre}</h2>
              <h2 className="h2 whitespace-nowrap uppercase">
                <span className="text-hero-blue">
                  {data.titleBigPre}
                  {data.titleBigHighlight}
                </span>{" "}
                <span className={GOLD}>{code}</span>
              </h2>
              <span className="gold-rule mt-5 block w-32" aria-hidden="true" />
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-[#101828]">
                {data.subtext.map((s) => (
                  <p key={s}>{s}</p>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-5">
              {data.columns.map((c) => (
                <div key={c.title} className="glass-card flex gap-5 rounded-xl p-6">
                  <HexIcon name={c.icon} />
                  <div className="min-w-0">
                    <p className="font-title text-base font-bold italic uppercase text-hero-blue">{c.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#101828]">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ a typical rebuild ============ */}
      <section className="theme-dark relative overflow-hidden bg-[#0b0d0b]">
        <div className="absolute inset-0 opacity-25" aria-hidden="true">
          <Image src="/engine/sec11_faq_mv2.webp" alt="" fill className="object-cover md:hidden" sizes="100vw" />
          <Image src="/engine/sec11_faq.jpg" alt="" fill className="hidden object-fill md:block" sizes="100vw" />
        </div>

        {/* ===== mobile ===== */}
        <div className="relative px-4 py-8 md:hidden">
          <div className="flex items-center gap-2.5">
            <LandRoverLogo className="h-8 w-14" />
            <p className="text-sm font-bold uppercase text-white">{t.kicker}</p>
          </div>
          <h2 className="h2 mt-2 uppercase text-white">{t.title}</h2>
          <span className="gold-rule mt-3 block w-28" aria-hidden="true" />
          <p className="mt-4 text-sm leading-relaxed text-white/90">{t.intro}</p>
          {t.body && <p className="mt-3 text-sm leading-relaxed text-white/90">{t.body}</p>}

          <div className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {STAGES.map((s) => (
              <div key={s.n} className="w-[70vw] shrink-0 snap-start overflow-hidden rounded-xl border border-white/15 bg-black/45 backdrop-blur-sm">
                <div className="relative aspect-4/3">
                  <Image src={s.image} alt={s.title} fill className="object-cover" sizes="70vw" />
                  <span className="absolute left-2 top-2 rounded-md bg-hero-blue px-2 py-1 text-sm font-extrabold text-white">{s.n}</span>
                </div>
                <div className="p-4">
                  <p className="flex items-center gap-2 font-title text-base font-bold italic uppercase text-white">
                    <Icon name={s.icon} className={`h-5 w-5 ${GOLD}`} />
                    {s.title}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/85">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card-dark mt-5 rounded-xl p-4" style={{ borderColor: "rgba(201,169,110,0.25)" }}>
            <p className={`font-title text-lg font-bold italic uppercase ${GOLD}`}>{t.scope.label}</p>
            <p className="mt-1 text-sm text-white">{t.scope.text}</p>
            <div className="mt-4 border-t border-white/10 pt-4 text-center">
              <p className="text-sm uppercase text-white">{t.startingFromLabel}</p>
              <p className="gold-text text-4xl font-extrabold">{t.startingFromPrice}</p>
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-14 sm:px-6 md:block lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] gap-6">
              <div>
                <div className="flex items-center gap-3">
                  <LandRoverLogo className="h-12 w-20" />
                  <p className="text-sm font-bold uppercase text-white">{t.kicker}</p>
                </div>
                <h3 className="h3 mt-3 uppercase text-white">{t.title}</h3>
                <span className="gold-rule mt-5 block w-32" aria-hidden="true" />
                <p className="mt-6 text-sm leading-relaxed text-white/90">{t.intro}</p>
                {t.body && <p className="mt-4 text-sm leading-relaxed text-white/90">{t.body}</p>}
              </div>

              {/* cards: compact (no empty filler), pushed to the bottom of the row so they sit just above the scope bar */}
              <div className="grid grid-cols-3 items-end gap-4 self-end">
                {STAGES.map((s) => (
                  <div key={s.n} className="flex flex-col overflow-hidden rounded-xl border border-white/15 bg-black/45 backdrop-blur-sm">
                    <div className="relative aspect-[4/3]">
                      <Image src={s.image} alt={s.title} fill className="object-cover" sizes="20vw" />
                      <span className="absolute left-3 top-3 rounded-md bg-hero-blue px-2.5 py-1 text-base font-extrabold text-white">{s.n}</span>
                    </div>
                    <div className="px-5 pb-5 pt-4">
                      <p className="flex items-center gap-2.5 font-title text-base font-bold italic uppercase leading-tight text-white">
                        <Icon name={s.icon} className={`h-7 w-7 shrink-0 ${GOLD}`} />
                        {s.title}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/85">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-dark mt-8 grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center divide-x divide-white/10 rounded-2xl px-8 py-6" style={{ borderColor: "rgba(201,169,110,0.25)" }}>
              <div className="flex items-center gap-6 pr-8">
                <HexDark />
                <div>
                  <p className={`font-title text-lg font-bold italic uppercase ${GOLD}`}>{t.scope.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white">{t.scope.text}</p>
                </div>
              </div>
              <div className="pl-8 text-center">
                <p className="text-sm uppercase text-white">{t.startingFromLabel}</p>
                <p className="gold-text text-4xl font-extrabold leading-tight">{t.startingFromPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HexDark() {
  return (
    <span
      className="flex h-20 w-20 shrink-0 items-center justify-center"
      style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)", background: "linear-gradient(145deg, rgba(201,169,110,0.5), rgba(201,169,110,0.15))" }}
    >
      <span className="flex h-[74px] w-[74px] items-center justify-center bg-[#101410]" style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}>
        <Icon name="cog" className="h-9 w-9 text-[#c9a96e]" />
      </span>
    </span>
  );
}
