import Link from "next/link";

/**
 * Renders a Core / Authoritative content page from a parsed block list.
 * data = { title, subtitle, updated, intro, blocks: [
 *   { type: "h2"|"h3", text },
 *   { type: "p", text },
 *   { type: "ul", items: [string] },
 * ] }
 * Inline markdown supported: **bold**, [label](href).
 */
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
      const isInternal = href.startsWith("/") || href.startsWith("#");
      nodes.push(
        isInternal ? (
          <Link key={`${keyBase}-l${i}`} href={href} className="text-hero-blue underline underline-offset-2">
            {m[2]}
          </Link>
        ) : (
          <a
            key={`${keyBase}-l${i}`}
            href={href}
            className="text-hero-blue underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
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

export default function LegalPage({ data }) {
  const blocks = data.blocks || [];
  return (
    <main className="theme-light">
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-hero-blue">Land Rover Garage</p>
        <h1 className="h2 mt-3 uppercase text-[#101828]">{data.title}</h1>
        {data.subtitle ? <p className="mt-3 text-lg text-[#4a5568]">{data.subtitle}</p> : null}
        {data.updated ? <p className="mt-2 text-sm text-[#98a2b3]">{data.updated}</p> : null}
        {data.intro ? (
          <p className="mt-6 border-l-2 border-hero-blue/40 pl-4 text-sm italic leading-relaxed text-[#4a5568]">
            {inline(data.intro, "intro")}
          </p>
        ) : null}

        <div className="mt-8 space-y-4">
          {blocks.map((b, i) => {
            if (b.type === "h2") {
              return (
                <h2 key={i} className="h4 mt-10 uppercase text-[#101828]">
                  {b.text}
                </h2>
              );
            }
            if (b.type === "h3") {
              return (
                <h3 key={i} className="mt-6 text-base font-bold text-[#101828]">
                  {b.text}
                </h3>
              );
            }
            if (b.type === "ul") {
              return (
                <ul key={i} className="ml-5 list-disc space-y-1.5 text-sm leading-relaxed text-[#4a5568]">
                  {(b.items || []).map((it, j) => (
                    <li key={j}>{inline(it, `${i}-${j}`)}</li>
                  ))}
                </ul>
              );
            }
            if (b.type === "ctaRow") {
              return (
                <div key={i} className="flex flex-wrap gap-3 py-1">
                  {b.items.map((it, j) => (
                    <Link
                      key={j}
                      href={it.href}
                      className={
                        j === 0
                          ? "rounded-md bg-hero-blue px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                          : "rounded-md border border-hero-blue px-5 py-2.5 text-sm font-bold text-hero-blue transition-colors hover:bg-hero-blue hover:text-white"
                      }
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <p key={i} className="text-sm leading-relaxed text-[#4a5568]">
                {inline(b.text || "", `p${i}`)}
              </p>
            );
          })}
        </div>
      </section>
    </main>
  );
}
