import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

function Header({ data, compact = false }) {
  return (
    <div className={`flex items-center ${compact ? "gap-3" : "gap-5"}`}>
      <LandRoverLogo className={compact ? "h-8 w-14" : "h-12 w-20"} />
      <span className={`w-px shrink-0 bg-white/20 ${compact ? "h-8" : "h-12"}`} aria-hidden="true" />
      <h2 className="h2 uppercase">
        <span className="text-white">{data.titlePre}</span>
        <span className="text-hero-blue">{data.titleHighlight}</span>
      </h2>
    </div>
  );
}

function Card({ it, code, compact = false }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121812]">
      <div className="relative aspect-[5/4] w-full overflow-hidden">
        <Image src={it.image} alt={`Land Rover ${code} — ${it.label.toLowerCase()}`} fill className="object-cover" sizes={compact ? "50vw" : "20vw"} />
        <span className={`absolute bottom-2 left-2 rounded-md bg-hero-blue font-extrabold text-white ${compact ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"}`}>
          {it.number}
        </span>
      </div>
      <div className={compact ? "px-3 py-2.5" : "px-4 py-3.5"}>
        <p className={`${compact ? "text-[11px]" : "text-sm"} font-extrabold uppercase leading-tight text-white`}>{it.label}</p>
        {it.body && <p className={`${compact ? "mt-1 text-[10px]" : "mt-2 text-xs"} leading-snug text-white/75`}>{it.body}</p>}
      </div>
    </div>
  );
}

function Footer({ data, compact = false }) {
  const [lead, rest] = (data.footerNote || "").split(/\s+—\s+/);
  return (
    <div className={`relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/5 ${compact ? "p-4" : "px-6 py-5"}`}>
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-white/10 ${compact ? "h-10 w-10" : "h-14 w-14"}`}>
        <Icon name="camera" className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-[#c9a96e]`} />
      </span>
      <div className={`relative z-10 ${compact ? "text-xs" : "text-sm"} leading-relaxed text-white`}>
        <p>
          <span className="font-bold">{lead}</span>
          {rest && <span className="text-white/80"> — {rest}</span>}
        </p>
        {data.engineCode && <p className="text-white/80">This is what a genuine {data.engineCode} rebuild looks like.</p>}
      </div>
      {!compact && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-64 opacity-[0.15]" aria-hidden="true">
          <Image src="/engine/sec2_bottom.webp" alt="" fill className="object-contain object-right grayscale invert" sizes="256px" />
        </div>
      )}
    </div>
  );
}

export default function Sec5({ data }) {
  const code = data.engineCode || "";
  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b100c]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-8 md:hidden">
        <Header data={data} compact />
        <div className="mt-5 grid grid-cols-2 gap-3">
          {data.items.map((it) => (
            <Card key={it.number} it={it} code={code} compact />
          ))}
        </div>
        <div className="mt-5 flex justify-center">
          <Link href="/land-rover-inside-our-workshop" className="flex items-center gap-2 rounded-lg border border-hero-blue/60 bg-hero-dark/60 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white">
            {data.viewMoreLabel} <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="mt-5">
          <Footer data={data} compact />
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <Header data={data} />

          <div className="mt-6 grid grid-cols-5 gap-4">
            {data.items.map((it) => (
              <Card key={it.number} it={it} code={code} />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/land-rover-inside-our-workshop" className="flex items-center gap-3 rounded-lg border border-hero-blue/60 bg-hero-dark/60 px-16 py-3.5 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-hero-blue/10">
              {data.viewMoreLabel} <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-6">
            <Footer data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
