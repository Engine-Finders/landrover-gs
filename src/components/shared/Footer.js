import Link from "next/link";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

export default function Footer({ data }) {
  const brandWords = data.brand.split(" ");
  const brandLead = brandWords.slice(0, -1).join(" ");
  const brandLast = brandWords[brandWords.length - 1];

  return (
    <footer className="theme-dark bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <LandRoverLogo className="h-11 w-11 shrink-0 text-white" />
              <span className="font-title text-lg font-extrabold italic text-white">
                {brandLead} <span className="text-[var(--color-hero-blue)]">{brandLast}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">{data.blurb}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 md:flex md:gap-16">
            {data.columns.map((col) => (
              <div key={col.title} className="min-w-0 md:w-32">
                <h3 className="text-[var(--color-hero-blue)] font-semibold mb-3 text-xs sm:text-sm tracking-wide uppercase">
                  {col.title}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover:text-[var(--color-hero-blue)] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm">
          <div className="space-y-1">
            <p>{data.contact.address}</p>
            <p>
              {data.contact.phone} &nbsp;·&nbsp; {data.contact.email}
            </p>
            <p className="text-white">{data.contact.hours}</p>
          </div>
          <div className="flex gap-4">
            {data.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-hero-blue)] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-4 text-xs text-white">{data.copyright}</p>
      </div>
    </footer>
  );
}
