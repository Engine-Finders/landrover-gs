import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverStripe from "@/components/reusable/LandRoverStripe";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import MobileSplitTitle from "@/components/variant/MobileSplitTitle";

export default function VariantSec10({ data }) {
  const { about, codes, compatibility, applications } = data;

  return (
    <>
      {/* ============ div 1: about ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative md:hidden">
          <div className="px-4 pb-6 pt-6">
            <MobileSplitTitle titlePre={about.titlePre} titleHighlight={about.titleHighlight} stripeVariant="left" />

            <div className="relative -mx-4 mt-4 aspect-[1881/1144] w-screen overflow-hidden">
              <Image src={about.imageMobile} alt="Land Rover engine and vehicle" fill className="object-cover" sizes="100vw" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 15%, transparent 85%, #fff 100%)" }}
              />
            </div>

            <div className="mt-4 space-y-3 text-xs leading-snug text-[#101828]">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="font-bold text-[#101828]">{about.boldParagraph}</p>
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={about.image} alt="Land Rover engine and vehicle" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #fff 0%, #fff 46%, rgba(255,255,255,0.9) 56%, rgba(255,255,255,0.35) 66%, transparent 76%)" }}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-lg">
              <LandRoverStripe className="h-10 w-16 shrink-0" />
              <h2 className="h2 mt-3 uppercase">
                {about.titlePre} <span className="block text-hero-blue">{about.titleHighlight}</span>
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#101828]">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p className="font-bold text-[#101828]">{about.boldParagraph}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ div 2: engine codes ============ */}
      <section className="theme-dark relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pb-8 pt-6 md:hidden">
          <h2 className="h2 uppercase">
            <LandRoverStripe className="float-left mr-2 mt-0.5 h-6 w-12 shrink-0" />
            <span className="text-white">{codes.titlePre}</span>
            <span className="text-hero-blue">{codes.titleHighlight}</span>
          </h2>

          <div className="mt-5 space-y-4">
            {codes.cards.map((c) => (
              <div key={c.codeHighlight} className="relative overflow-hidden border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-28 shrink-0">
                    <Image src={codes.image} alt={c.codeHighlight} fill className="object-contain" sizes="112px" />
                  </div>
                  <p className="text-base font-bold leading-tight">
                    {c.codeHref ? <Link href={c.codeHref} ><span className="text-hero-blue">{c.codeHighlight}</span></Link> : <span className="text-hero-blue">{c.codeHighlight}</span>} <span className="text-white">{c.codeRest}</span>
                  </p>
                </div>
                <p className="mt-3 text-xs leading-snug text-white">{c.body}</p>
                <a
                  href="#quote-form"
                  className="btn-text mt-4 inline-flex items-center gap-1.5 rounded-md border border-hero-blue/50 bg-white/5 px-4 py-2.5 text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
                >
                  {c.cta} <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <div className="flex items-start gap-3">
              <span className="h2 flex h-[1.05em] shrink-0 items-center" aria-hidden="true">
                <LandRoverStripe className="h-[0.85em] w-[1.35em] shrink-0" />
              </span>
              <h2 className="h2 uppercase">
                <span className="text-white">{codes.titlePre}</span>
                <span className="text-hero-blue">{codes.titleHighlight}</span>
              </h2>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              {codes.cards.map((c) => (
                <div key={c.codeHighlight} className="relative flex items-stretch gap-6">
                  <div className="relative w-64 shrink-0">
                    <Image src={codes.image} alt={c.codeHighlight} fill className="object-cover" sizes="256px" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 py-8 pr-4">
                    <p className="text-lg font-bold leading-tight">
                      {c.codeHref ? <Link href={c.codeHref} ><span className="text-hero-blue">{c.codeHighlight}</span></Link> : <span className="text-hero-blue">{c.codeHighlight}</span>} <span className="text-white">{c.codeRest}</span>
                    </p>
                    <p className="text-sm leading-relaxed text-white">{c.body}</p>
                    <a
                      href="#quote-form"
                      className="mt-1 inline-flex w-fit items-center gap-2 rounded-md border border-hero-blue/50 bg-white/5 px-5 py-2.5 text-sm font-bold text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
                    >
                      {c.cta} <span aria-hidden>→</span>
                    </a>
                  </div>
                  <div className="relative flex w-52 shrink-0 items-center justify-center pr-10">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "radial-gradient(circle at center, rgba(96,112,86,0.22) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    />
                    <LandRoverLogo className="relative h-28 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ div 3: compatibility ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative md:hidden">
          <div className="px-4 pb-6 pt-6">
            <MobileSplitTitle titlePre={compatibility.titlePre} titleHighlight={compatibility.titleHighlight} stripeVariant="left" />

            <div className="relative -mx-4 mt-4 aspect-430/363 w-screen overflow-hidden">
              <Image src={compatibility.imageMobile} alt="Land Rover Land Rover vehicle in workshop" fill className="object-cover" sizes="100vw" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 15%, transparent 85%, #fff 100%)" }}
              />
            </div>

            <p className="mt-4 text-xs leading-snug text-[#101828]">{compatibility.intro}</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {compatibility.points.map((p) => (
                <div key={p.text} className="glass-card relative flex flex-col items-center rounded-xl p-3 text-center">
                  <Icon name={p.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
                  <p className="label-text mt-2 leading-snug text-[#101828]">{p.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-snug text-[#101828]">{compatibility.footer}</p>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0">
            <Image src={compatibility.image} alt="Land Rover Land Rover vehicle in workshop" fill className="object-cover" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, #fff 0%, #fff 48%, rgba(255,255,255,0.9) 60%, transparent 75%)" }}
            />
          </div>
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3">
              <span className="h2 flex h-[1.05em] shrink-0 items-center" aria-hidden="true">
                <LandRoverStripe className="h-[0.85em] w-[1.35em] shrink-0" />
              </span>
              <h2 className="h2 uppercase">
                <span className="text-[#101828]">{compatibility.titlePre}</span>
                <span className="text-hero-blue">{compatibility.titleHighlight}</span>
              </h2>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#101828]">{compatibility.intro}</p>

            <div className="mt-5 grid max-w-2xl grid-cols-4 gap-4">
              {compatibility.points.map((p) => (
                <div key={p.text} className="glass-card relative flex flex-col items-center rounded-xl p-4 text-center transition-transform hover:-translate-y-0.5">
                  <Icon name={p.icon} className="h-10 w-10 shrink-0 text-hero-blue" />
                  <p className="mt-2 text-xs leading-snug text-[#101828]">{p.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#101828]">{compatibility.footer}</p>
          </div>
        </div>
      </section>

      {/* ============ div 4: applications table ============ */}
      <section className="theme-light relative overflow-hidden">
        {/* ===== mobile ===== */}
        <div className="relative px-4 pb-8 pt-6 md:hidden">
          <MobileSplitTitle titlePre={applications.titlePre} titleHighlight={applications.titleHighlight} stripeVariant="left" />

          <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4">
            <div className="glass-card relative min-w-200 overflow-hidden rounded-lg">
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "20%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "40%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "60%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "80%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />

              <div className="grid grid-cols-5 bg-hero-dark">
                {applications.columns.map((c, i) => (
                  <p
                    key={c}
                    className={`min-w-0 whitespace-nowrap px-4 py-2 text-[10px] font-extrabold uppercase tracking-wide text-white ${i === 0 ? "text-right" : "text-center"}`}
                  >
                    {c}
                  </p>
                ))}
              </div>

              {applications.rows.map((r, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-5 items-center ${i > 0 ? "border-t border-black/10" : ""} ${i % 2 === 1 ? "bg-white/40" : ""}`}
                >
                  <div className="flex min-w-0 items-center justify-between gap-2 px-4 py-1.5">
                    <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded bg-white">
                      <Image src={applications.image} alt={r.generation} fill className="object-contain" sizes="64px" />
                    </div>
                    <p className="min-w-0 whitespace-nowrap text-xs font-bold text-[#101828]">{r.generation}</p>
                  </div>
                  <p className="min-w-0 px-4 py-1.5 text-center text-xs text-[#101828]">{r.chassis}</p>
                  <p className="min-w-0 px-4 py-1.5 text-center text-xs text-[#101828]">{r.years}</p>
                  <p className="min-w-0 px-4 py-1.5 text-center text-xs font-extrabold text-hero-blue">
                    {r.codeHref ? <Link href={r.codeHref}>{r.engineCode}</Link> : r.engineCode}
                  </p>
                  <div className="flex min-w-0 items-center justify-center gap-1 px-4 py-1.5">
                    <Icon name="fuel" className="h-3.5 w-3.5 shrink-0 text-hero-blue" />
                    <p className="min-w-0 text-xs text-[#101828]">{r.fuel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== desktop ===== */}
        <div className="relative hidden px-4 py-6 sm:px-6 md:block lg:px-8">
          <div className="relative mx-auto max-w-6xl">
            <h2 className="h2 uppercase">
              <span className="text-[#101828]">{applications.titlePre}</span>
              <span className="text-hero-blue">{applications.titleHighlight}</span>
            </h2>

            <div className="glass-card relative mt-5 overflow-hidden rounded-lg">
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "20%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "40%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "60%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />
              <div className="pointer-events-none absolute bottom-0 top-0 w-px" style={{ left: "80%", background: "rgba(148,163,184,0.45)" }} aria-hidden="true" />

              <div className="grid grid-cols-5 bg-hero-dark">
                {applications.columns.map((c, i) => (
                  <p
                    key={c}
                    className={`min-w-0 px-6 py-2 text-xs font-extrabold uppercase tracking-wide text-white ${i === 0 ? "text-right" : "text-center"}`}
                  >
                    {c}
                  </p>
                ))}
              </div>

              {applications.rows.map((r, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-5 items-center ${i > 0 ? "border-t border-black/10" : ""} ${i % 2 === 1 ? "bg-white/40" : ""}`}
                >
                  <div className="flex min-w-0 items-center justify-between gap-3 px-6 py-1.5">
                    <div className="relative h-12 w-28 shrink-0 overflow-hidden rounded bg-white">
                      <Image src={applications.image} alt={r.generation} fill className="object-contain" sizes="112px" />
                    </div>
                    <p className="min-w-0 truncate text-sm font-bold text-[#101828]">{r.generation}</p>
                  </div>
                  <p className="min-w-0 px-6 py-1.5 text-center text-sm text-[#101828]">{r.chassis}</p>
                  <p className="min-w-0 px-6 py-1.5 text-center text-sm text-[#101828]">{r.years}</p>
                  <p className="min-w-0 px-6 py-1.5 text-center text-sm font-extrabold text-hero-blue">
                    {r.codeHref ? <Link href={r.codeHref}>{r.engineCode}</Link> : r.engineCode}
                  </p>
                  <div className="flex min-w-0 items-center justify-center gap-1.5 px-6 py-1.5">
                    <Icon name="fuel" className="h-4 w-4 shrink-0 text-hero-blue" />
                    <p className="min-w-0 text-sm text-[#101828]">{r.fuel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
