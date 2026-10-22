import Link from "next/link";
import Image from "next/image";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import SocialIcons from "@/components/shared/SocialIcons";

const iconProps = { viewBox: "0 0 24 24", "aria-hidden": true, className: "h-4 w-4 shrink-0" };

function PhoneIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Footer({ data }) {
  const brandWords = data.brand.split(" ");
  const brandLead = brandWords.slice(0, -1).join(" ");
  const brandLast = brandWords[brandWords.length - 1];

  return (
    <footer className="theme-dark bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="mb-3 inline-block" aria-label={`${data.brand} — home`}>
              <Image
                src="/brand/logo-square.webp"
                alt="Land Rover Garage"
                width={797}
                height={274}
                className="h-16 w-auto"
                sizes="180px"
              />
            </Link>
            <SocialIcons className="mb-3" />
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
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a href={`tel:${data.contact.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 hover:text-white/70 transition-colors">
                <PhoneIcon />
                {data.contact.phone}
              </a>
              {data.contact.whatsapp && (
                <>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`https://wa.me/44${data.contact.whatsapp.replace(/\s+/g, "").replace(/^0/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${data.contact.whatsapp}`}
                    className="inline-flex items-center hover:text-white/70 transition-colors"
                  >
                    <WhatsAppIcon />
                  </a>
                </>
              )}
              <span aria-hidden="true">·</span>
              <a href={`mailto:${data.contact.email}`} className="inline-flex items-center gap-2 hover:text-white/70 transition-colors">
                <MailIcon />
                {data.contact.email}
              </a>
            </p>
            <p className="text-white">{data.contact.hours}</p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center gap-2 font-semibold text-white transition-colors hover:text-white/70"
            >
              View Contact &amp; Map
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>

        <p className="mt-4 text-xs text-white">{data.copyright}</p>
      </div>
    </footer>
  );
}
