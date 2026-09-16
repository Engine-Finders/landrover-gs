import Link from "next/link";

/**
 * Simple directory / index page.
 * data = { title, subtitle, groups: [ { heading, items: [ { label, href } ] } ] }
 */
export default function DirectoryPage({ data }) {
  return (
    <main className="theme-light">
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-hero-blue">Land Rover Garage</p>
        <h1 className="h2 mt-3 uppercase text-[#101828]">{data.title}</h1>
        {data.subtitle ? <p className="mt-3 max-w-2xl text-base text-[#4a5568]">{data.subtitle}</p> : null}

        <div className="mt-10 space-y-10">
          {(data.groups || []).map((g, i) => (
            <div key={i}>
              {g.heading ? (
                <h2 className="h4 uppercase text-[#101828]">{g.heading}</h2>
              ) : null}
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
                {g.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      className="block py-1.5 text-sm text-[#101828] transition-colors hover:text-hero-blue"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
