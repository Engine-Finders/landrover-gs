import Image from "next/image";
import { partImageFor } from "@/lib/partImage";
import Link from "next/link";

function inline(text, keyBase) {
  const nodes = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={`${keyBase}-b${i}`} className="font-semibold text-[#101828]">
          {m[1]}
        </strong>
      );
    } else {
      const href = m[3];
      const internal = href.startsWith("/") || href.startsWith("#");
      nodes.push(
        internal ? (
          <Link key={`${keyBase}-l${i}`} href={href} className="text-hero-blue underline underline-offset-2">
            {m[2]}
          </Link>
        ) : (
          <a
            key={`${keyBase}-l${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-hero-blue underline underline-offset-2"
          >
            {m[2]}
          </a>
        )
      );
    }
    last = re.lastIndex;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* offset gold frame around an image - the "fancy touch", kept cheap */
function FramedImage({ src, alt, className = "", contain = false, backdrop }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-3 -z-10 rounded-2xl border border-hero-blue/40" aria-hidden="true" />
      <div
        className="absolute -inset-3 -z-10 rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(96,112,86,0.18), transparent 60%)" }}
        aria-hidden="true"
      />
      <div
        className="relative aspect-4/3 overflow-hidden rounded-xl"
        style={contain ? undefined : {
          /* soft edge fade into the dark hero: all four edges blend out */
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 18%, #000 82%, transparent 100%), linear-gradient(180deg, transparent 0%, #000 18%, #000 82%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        {contain && <Image src={backdrop} alt="" fill className="object-cover opacity-30" sizes="(min-width:768px) 40vw, 100vw" />}
        <Image src={src} alt={alt} fill className={contain ? "object-contain p-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]" : "object-cover"} sizes="(min-width:768px) 40vw, 100vw" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.5))" }}
        />
      </div>
    </div>
  );
}

function ImageBand({ src, alt, kicker, title, cta, focus = 100 }) {
  return (
    <section className="relative overflow-hidden">
      {/* phone: the photo is a full-bleed background; the left 65% is the dark text area and the
          right 35% shows the photo's main subject; the band grows with its text.
          sm and up keeps the fixed-height band. */}
      <div className="absolute inset-0 sm:relative sm:h-[260px] sm:w-full">
        <Image src={src} alt={alt} fill className="object-cover sm:object-center!" style={{ objectPosition: `${focus}% 50%` }} sizes="100vw" />
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.92) 52%, rgba(10,10,10,0.3) 62%, rgba(10,10,10,0) 74%)",
          }}
        />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 45%, rgba(96,112,86,0.25) 100%)",
          }}
        />
      </div>
      <div className="relative flex min-h-[220px] items-center py-9 sm:absolute sm:inset-0 sm:min-h-0 sm:py-0">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="w-[65%] pr-2 sm:w-auto sm:pr-0">
            {kicker ? (
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] sm:text-xs sm:tracking-[0.25em]">{kicker}</p>
            ) : null}
            <p className="mt-2 max-w-xl text-xl font-extrabold uppercase italic leading-tight text-white sm:mt-3 sm:text-3xl">
              {title}
            </p>
            <span className="mt-4 block h-0.5 w-24 bg-[#c9a96e]" />
            {cta ? (
              <Link
                href={cta.href}
                className="mt-4 inline-block rounded-md bg-hero-blue px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.03] sm:mt-5 sm:px-6 sm:py-3 sm:text-sm"
              >
                {cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Blocks({ blocks }) {
  return (
    <div className="mt-5 max-w-4xl space-y-4">
      {(blocks || []).map((b, i) => {
        if (b.t === "h3") {
          return (
            <h3 key={i} className="mt-8 text-lg font-bold text-[#101828]">
              {inline(b.text, `h3-${i}`)}
            </h3>
          );
        }
        if (b.t === "modelgroup") {
          return (
            <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-t border-black/10 py-3 first:border-t-0 first:pt-0">
              <p className="shrink-0 text-sm font-bold text-[#101828]">
                {b.model.href ? (
                  <Link href={b.model.href} className="hover:text-hero-blue">
                    {b.model.label}
                  </Link>
                ) : (
                  b.model.label
                )}
              </p>
              {b.chips.some((c) => c.desc) ? (
                <ul className="basis-full space-y-1.5 text-sm leading-relaxed text-[#4a5568]">
                  {b.chips.map((c, j) => (
                    <li key={j} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hero-blue" aria-hidden="true" />
                      <span>
                        {c.href ? (
                          <Link href={c.href} className="font-semibold text-[#101828] hover:text-hero-blue">
                            {c.label}
                          </Link>
                        ) : (
                          <span className="font-semibold text-[#101828]">{c.label}</span>
                        )}
                        {c.desc ? <> - {c.desc}</> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {b.chips.map((c, j) =>
                    c.href ? (
                      <Link
                        key={j}
                        href={c.href}
                        className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs text-[#101828] transition-colors hover:border-hero-blue/50 hover:text-hero-blue"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span key={j} className="rounded-full border border-black/10 px-2.5 py-1 text-xs text-[#98a2b3]">
                        {c.label}
                      </span>
                    )
                  )}
                </div>
              )}
              {b.note ? <p className="basis-full text-sm leading-relaxed text-[#4a5568]">{b.note}</p> : null}
            </div>
          );
        }
        if (b.t === "callout") {
          return (
            <div
              key={i}
              className="card-glare relative overflow-hidden rounded-2xl border border-hero-blue/30 bg-white p-5"
              style={{ boxShadow: "0 16px 40px -18px rgba(96,112,86,0.4)" }}
            >
              <span className="absolute left-0 top-0 h-full w-1 bg-hero-blue" aria-hidden="true" />
              {b.heading ? (
                <p className="text-sm font-extrabold uppercase tracking-wide text-[#101828]">{b.heading}</p>
              ) : null}
              {(b.paras || []).map((p, j) =>
                typeof p === "string" ? (
                  <p key={j} className="mt-2 text-sm leading-relaxed text-[#4a5568]">
                    {inline(p, `c${i}-${j}`)}
                  </p>
                ) : (
                  <ul key={j} className="mt-3 grid gap-y-2 text-sm leading-relaxed text-[#4a5568]">
                    {(p.ul || []).map((it, k) => (
                      <li key={k} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hero-blue" aria-hidden="true" />
                        <span>{inline(it, `c${i}-${j}-${k}`)}</span>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>
          );
        }
        if (b.t === "table") {
          return (
            <div key={i} className="max-w-4xl overflow-x-auto rounded-xl border border-black/10 bg-white">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                {(b.head || []).length ? (
                  <thead>
                    <tr className="bg-black/[0.04]">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-[#101828]">
                          {inline(h, `th${i}-${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {(b.rows || []).map((r, j) => (
                    <tr key={j} className="border-t border-black/10">
                      {r.map((c, k) => (
                        <td key={k} className={`px-4 py-2.5 align-top leading-relaxed ${k === 0 ? "font-semibold text-[#101828]" : "text-[#4a5568]"}`}>
                          {inline(c, `td${i}-${j}-${k}`)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (b.t === "linkgrid") {
          return (
            <ul key={i} className="grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3">
              {b.items.map((it, j) =>
                it.href ? (
                  <li key={j}>
                    <Link
                      href={it.href}
                      className="block rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#101828] transition-colors hover:border-hero-blue/50 hover:text-hero-blue"
                    >
                      {it.label}
                    </Link>
                  </li>
                ) : (
                  <li key={j} className="rounded-lg border border-black/10 px-3 py-2 text-sm text-[#98a2b3]">
                    {it.label}
                  </li>
                )
              )}
            </ul>
          );
        }
        if (b.t === "ul") {
          return (
            <ul key={i} className="grid max-w-4xl gap-x-10 gap-y-2 text-sm leading-relaxed text-[#4a5568] sm:grid-cols-2">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hero-blue" aria-hidden="true" />
                  <span>{inline(it, `u${i}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed text-[#4a5568]">
            {inline(b.html || "", `p${i}`)}
          </p>
        );
      })}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div>
      <span className="mb-3 block h-1 w-10 bg-hero-blue" aria-hidden="true" />
      <h2 className="h3 uppercase text-[#101828]">{children}</h2>
    </div>
  );
}

function ProseSection({ s, idx }) {
  return (
    <section className={idx % 2 ? "theme-light" : "theme-light bg-(--theme-light-bg)"}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {s.heading ? <SectionHeading>{s.heading}</SectionHeading> : null}
        <Blocks blocks={s.blocks} />
      </div>
    </section>
  );
}

function StepsSection({ s, idx }) {
  return (
    <section className={idx % 2 ? "theme-light" : "theme-light bg-(--theme-light-bg)"}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {s.heading ? <SectionHeading>{s.heading}</SectionHeading> : null}
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.steps.map((st, i) => (
            <li
              key={i}
              className="relative rounded-2xl border border-black/10 bg-white p-5 transition-colors hover:border-hero-blue/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-hero-blue text-sm font-extrabold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              {st.title ? <p className="mt-3 font-bold text-[#101828]">{st.title}</p> : null}
              <p className="mt-1 text-sm leading-relaxed text-[#4a5568]">{inline(st.body, `s${i}`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqSection({ s, idx }) {
  return (
    <section className={idx % 2 ? "theme-light" : "theme-light bg-(--theme-light-bg)"}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading>{s.heading || "Frequently Asked Questions"}</SectionHeading>
        <div className="mt-5 max-w-4xl divide-y divide-black/10 border-y border-black/10">
          {s.items.map((it, i) => (
            <details key={i} className="group py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-[#101828] marker:hidden">
                {it.q}
                <span className="text-hero-blue transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-[#4a5568]">{inline(it.a, `f${i}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AuthorityPage({ data }) {
  const imgs = data.images || [];
  const heroPart = data.images?.[0]?.startsWith("/guides/") ? null : partImageFor(data.h1); // own generated hero: show it as-is, no part cut-out over it
  const sections = data.sections || [];
  const bandAt = Math.min(2, Math.max(1, Math.floor(sections.length / 3)));
  const faqIdx = sections.findIndex((s) => s.kind === "faq");

  return (
    <main>
      {/* hero */}
      <section className="theme-dark relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c9a96e]">Land Rover Garage</p>
            <h1 className="h1 mt-4 uppercase text-white">{data.h1}</h1>
            {data.lede ? (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{data.lede}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              {(data.ctas || []).map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  className={
                    i === 0
                      ? "rounded-md bg-hero-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.03]"
                      : "rounded-md border border-white/30 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-hero-blue hover:text-hero-blue"
                  }
                >
                  {c.label}
                </Link>
              ))}
            </div>
            {imgs[0] ? (
              <div className="mx-auto mt-10 w-[88%] max-w-md lg:hidden">
                <FramedImage src={heroPart || imgs[0]} alt={`${data.h1} - Land Rover Garage workshop`} contain={!!heroPart} backdrop={imgs[0]} />
              </div>
            ) : null}
            {data.stats?.length ? (
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-6">
                {data.stats.map((st, i) => (
                  <div key={i}>
                    <p className="text-2xl font-extrabold text-[#c9a96e]">{st.value}</p>
                    <p className="text-xs uppercase tracking-wide text-white/60">{st.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {imgs[0] ? (
            <div className="hidden lg:block">
              <FramedImage src={heroPart || imgs[0]} alt={`${data.h1} - Land Rover Garage workshop`} contain={!!heroPart} backdrop={imgs[0]} />
            </div>
          ) : null}
        </div>
      </section>

      {sections.map((s, i) => {
        const nodes = [];
        if (i === bandAt && imgs[1]) {
          nodes.push(
            <ImageBand
              key={`band-${i}`}
              src={imgs[1]}
              focus={data.bandFocus?.["2"]}
              alt={`${data.h1} in progress at our workshop`}
              kicker="Inside our workshop"
              title={data.h1}
            />
          );
        }
        if (i === faqIdx && faqIdx > 0 && imgs[2]) {
          nodes.push(
            <ImageBand
              key={`cta-${i}`}
              src={imgs[2]}
              focus={data.bandFocus?.["3"]}
              alt="Land Rover engine rebuild at Land Rover Garage"
              kicker="Fixed-price, fully warranted"
              title="Get your quote in under 30 minutes"
              cta={(data.ctas && data.ctas[0]) || { label: "Get a Quote", href: "/contact" }}
            />
          );
        }
        if (s.kind === "steps") nodes.push(<StepsSection key={i} s={s} idx={i} />);
        else if (s.kind === "faq") nodes.push(<FaqSection key={i} s={s} idx={i} />);
        else nodes.push(<ProseSection key={i} s={s} idx={i} />);
        return nodes;
      })}
    </main>
  );
}
