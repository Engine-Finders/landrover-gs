import Image from "next/image";
import Icon from "@/components/reusable/Icon";

function renderTitleLine(line, defaultClassName) {
  const parts = line.split(/(\*\*.*?\*\*)/g).filter(Boolean);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*(.*)\*\*$/);
    return match ? (
      <span key={i} className="text-hero-blue">
        {match[1]}
      </span>
    ) : (
      <span key={i} className={defaultClassName}>
        {part}
      </span>
    );
  });
}

export default function ModelSec2({ data }) {
  const [line1, line2, line3] = data.h2.split("|");

  const allCards = [
    { icon: data.callout.icon, title: data.callout.title, body: data.callout.body },
    ...data.features,
  ];

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative md:hidden">
        <div className="relative z-10 bg-(--color-light-surface) px-4 pb-0 pt-8">
          <div className="flex items-center gap-2">
            <Icon name="warning" className="h-4 w-4 shrink-0 text-hero-blue" />
            <p className="label-text uppercase tracking-widest text-[#101828]">{data.kicker}</p>
          </div>

          <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-2 uppercase">
            <span className="block text-[#101828]">{renderTitleLine(line1, "text-[#101828]")}</span>
            <span className="block text-[#101828]">{renderTitleLine(line2, "text-[#101828]")}</span>
            <span className="block text-[#101828]">{renderTitleLine(line3, "text-[#101828]")}</span>
          </h2>

          <p className="body-text mt-3 text-[#101828]">{data.description}</p>
          <p className="mt-1 text-sm font-bold text-[#101828]">{data.descriptionEmphasis}</p>
        </div>

        {/* matches bmw-garage's own mobile treatment for this section: the wide desktop photo,
            diagonally clipped — not the dedicated mobile crop, which crops the engine out of
            frame. This container's aspect ratio is wider than the photo's, so object-cover only
            crops top/bottom, not left/right — the engine (which sits in the photo's right half)
            stays pinned right regardless of object-position. Zoomed + shifted via transform so
            the engine block itself sits centered in the frame instead. */}
        <div className="relative mt-2 h-56 w-full overflow-hidden">
          <div className="absolute inset-0" style={{ clipPath: "polygon(0 10%, 100% -14%, 100% 100%, 0% 100%)" }}>
            <div className="absolute inset-0" style={{ transform: "scale(2.3)", transformOrigin: "88% 45%" }}>
              <Image src={data.image} alt="Classic Land Rover diesel engine with exposed timing belt and camshaft pulleys on an engine stand" fill className="object-cover" style={{ objectPosition: "88% 45%" }} sizes="100vw" />
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-2/3"
            style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--color-light-surface) 80%, transparent) 0%, color-mix(in srgb, var(--color-light-surface) 45%, transparent) 45%, transparent 100%)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 32px 18px var(--color-light-surface), inset 0 -20px 24px -4px var(--color-light-surface)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-0 right-0"
            style={{
              top: "5%",
              height: "3px",
              background: "var(--color-hero-gold)",
              transform: "rotate(-8deg) scaleX(1.02)",
              transformOrigin: "left center",
              boxShadow: "0 0 8px rgba(96,112,86,0.55)",
            }}
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 -mt-28 px-4 pb-10">
          {/* stacked feature cards */}
          <div className="relative space-y-3">
            {allCards.map((c, i) => (
              <div
                key={c.title}
                className={`relative flex items-center gap-3 p-4 ${
                  i === 0 ? "rounded-md border border-hero-blue/30 bg-white shadow-lg" : "rounded-md border border-hero-blue/20 bg-white shadow-sm"
                }`}
              >
                <Icon name={c.icon} className={`shrink-0 text-hero-blue ${i === 0 ? "h-9 w-9" : "h-8 w-8"}`} />
                <div className="min-w-0">
                  <p className={`whitespace-nowrap font-extrabold uppercase ${i === 0 ? "text-sm text-hero-blue" : "text-xs text-[#101828]"}`}>{c.title}</p>
                  <p className={`label-text mt-0.5 leading-snug text-[#101828]`}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="hidden px-4 py-10 sm:px-6 md:block lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          {/* sec2.webp already bakes in the light left panel / diagonal photo split, matching
              the reference exactly — sized to the photo's own aspect ratio so there's no dead
              space below the text, text sits directly on it with no extra frosted panel */}
          <div className="relative min-h-[25rem] w-full lg:min-h-[28rem]">
            <Image src={data.image} alt="Classic Land Rover diesel engine with exposed timing belt and camshaft pulleys on an engine stand" fill className="object-cover" sizes="1152px" />

            <div className="relative flex flex-col px-8 pb-8 pt-8 lg:px-10 lg:pb-10 lg:pt-10">
              <div className="relative isolate max-w-[46%]">
                <div
                  className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10"
                  style={{ background: "radial-gradient(ellipse 75% 70% at 42% 48%, color-mix(in srgb, var(--theme-light-bg) 88%, transparent) 0%, color-mix(in srgb, var(--theme-light-bg) 65%, transparent) 50%, transparent 100%)" }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2">
                  <Icon name="warning" className="h-4 w-4 shrink-0 text-hero-blue" />
                  <p className="label-text uppercase tracking-widest text-[#101828]">{data.kicker}</p>
                </div>

                <h2 className="h2 origin-left scale-y-110 scale-x-90 mt-3 uppercase">
                  <span className="block text-[#101828]">{renderTitleLine(line1, "text-[#101828]")}</span>
                  <span className="block text-[#101828]">{renderTitleLine(line2, "text-[#101828]")}</span>
                  <span className="block text-[#101828]">{renderTitleLine(line3, "text-[#101828]")}</span>
                </h2>

                <p className="body-text mt-4 text-[#101828]">
                  {data.description} <span className="font-bold text-[#101828]">{data.descriptionEmphasis}</span>
                </p>

                <div
                  className="mt-5 flex max-w-xs items-start gap-3 rounded-md border border-hero-blue/40 px-4 py-2"
                  style={{ background: "var(--theme-light-bg)" }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-hero-blue/10">
                    <Icon name={data.heroHook.icon} className="h-5 w-5 text-hero-blue" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.heroHook.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#101828]">{data.heroHook.body}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* trust callout card, sitting on the diagonal seam between the light panel and the photo */}
            <div
              className="absolute bottom-6 right-6 max-w-80 rounded-md border border-hero-blue/30 p-4 shadow-lg lg:right-10"
              style={{ background: "var(--theme-light-bg)" }}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hero-blue/10">
                  <Icon name={data.callout.icon} className="h-6 w-6 text-hero-blue" />
                </span>
                <div className="min-w-0">
                  <p className="whitespace-nowrap text-xs font-extrabold uppercase tracking-wide text-hero-blue">{data.callout.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#101828]">{data.callout.body}</p>
                </div>
              </div>
            </div>
          </div>

          {/* feature bar */}
          <div className="relative z-10 mt-4 flex items-stretch justify-between rounded-md border border-hero-blue/20 bg-(--color-light-surface) px-6 py-5 shadow-sm">
            {data.features.map((f, i) => (
              <div key={f.title} className="relative flex flex-1 items-stretch gap-3 px-4">
                {i > 0 && <span className="absolute left-0 top-1/2 h-3/4 w-px -translate-y-1/2 bg-black/10" />}
                <Icon name={f.icon} className="h-full w-14 shrink-0 text-hero-blue" />
                <div className="flex min-w-0 flex-col justify-center">
                  <p className="text-sm font-extrabold uppercase tracking-wide text-[#101828]">{f.title}</p>
                  <p className="mt-0.5 text-xs leading-snug text-[#101828]">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
