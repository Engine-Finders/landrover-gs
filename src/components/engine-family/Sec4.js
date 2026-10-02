import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

const GROUP_ICON = { "Replaced as Standard": "gear", "Inspected and Measured": "search", "Application-Dependent": "layers" };

// pick a line icon from the component's name
function itemIcon(label) {
  const t = label.toLowerCase();
  if (/belt|chain/.test(t)) return "chain";
  if (/bearing/.test(t)) return "bearing";
  if (/gasket|seal/.test(t)) return "gasket";
  if (/pump|injector|injection|fuel/.test(t)) return "pump";
  if (/turbo/.test(t)) return "turbo";
  if (/crank/.test(t)) return "gears";
  if (/cool|radiator|thermostat/.test(t)) return "gauge";
  if (/head|block|piston|valve/.test(t)) return "engine";
  if (/vehicle|ancillar|variant|application/.test(t)) return "car";
  return "cog";
}

// "200Tdi Rebuild Components" -> code "200Tdi" + "Rebuild Components"
function splitHighlight(h = "") {
  const m = h.match(/^(.*?)\s+(Rebuild Components)$/i);
  return m ? [m[1], m[2]] : [h, ""];
}

function Header({ data, compact = false }) {
  const [code, rest] = splitHighlight(data.titleHighlight);
  return (
    <div className={`flex items-center ${compact ? "gap-3" : "gap-5"}`}>
      <span className={`flex shrink-0 items-center justify-center rounded-lg bg-[#16241a] ${compact ? "h-12 w-12" : "h-16 w-16"}`}>
        <LandRoverLogo className={compact ? "h-6 w-10" : "h-8 w-12"} />
      </span>
      <span className={`w-px shrink-0 bg-[#c9a96e]/60 ${compact ? "h-10" : "h-14"}`} aria-hidden="true" />
      <h2 className="h2 uppercase">
        <span className={`text-[#101828] ${compact ? "block" : "whitespace-nowrap"}`}>
          {data.titlePre.trim()} <span className="text-hero-blue">{code}</span>
        </span>
        {compact ? <span className="block text-[#101828]">{rest}</span> : <span className="whitespace-nowrap text-[#101828]"> {rest}</span>}
      </h2>
    </div>
  );
}

function GroupCard({ g, showSketch, compact = false }) {
  return (
    <div className="glass-card relative flex flex-col overflow-hidden rounded-xl">
      <div className={`flex items-center gap-2.5 bg-[#16241a] ${compact ? "px-4 py-2.5" : "px-5 py-3"}`}>
        <Icon name={GROUP_ICON[g.title] || g.icon || "cog"} className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0 text-white`} />
        <p className={`${compact ? "text-xs" : "text-sm"} font-extrabold uppercase tracking-wide text-white`}>{g.title}</p>
      </div>
      <ul className={`divide-y divide-black/8 ${compact ? "px-4" : "px-5"}`}>
        {g.items.map((it) => (
          <li key={it} className={`flex items-center gap-3 ${compact ? "py-2.5" : "py-3"}`}>
            <Icon name={itemIcon(it)} className={`${compact ? "h-4 w-4" : "h-5 w-5"} shrink-0 text-[#8a7445]`} />
            <span className={`${compact ? "text-xs" : "text-sm"} leading-snug text-[#101828]`}>{it}</span>
          </li>
        ))}
      </ul>
      {showSketch && (
        <div className="pointer-events-none relative mt-auto h-40 w-full opacity-[0.12]" aria-hidden="true">
          <Image src="/engine/sec2_bottom.webp" alt="" fill className="object-contain object-right-bottom grayscale" sizes="360px" />
        </div>
      )}
    </div>
  );
}

function Notice({ data, compact = false }) {
  return (
    <div className={`glass-card relative flex items-center gap-4 overflow-hidden rounded-xl ${compact ? "p-4" : "px-6 py-5"}`}>
      <span className={`flex shrink-0 items-center justify-center rounded-full bg-[#16241a] ${compact ? "h-9 w-9" : "h-12 w-12"}`}>
        <Icon name="info" className={`${compact ? "h-4 w-4" : "h-6 w-6"} text-white`} />
      </span>
      <p className={`relative z-10 ${compact ? "text-xs" : "max-w-xl text-sm"} leading-relaxed text-[#101828]`}>{data.notice}</p>
      {!compact && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[38%] opacity-[0.12]" aria-hidden="true">
          <Image src="/engine/sec2_bottom.webp" alt="" fill className="object-contain object-left grayscale" sizes="420px" />
        </div>
      )}
    </div>
  );
}

export default function Sec4({ data }) {
  const groups = data.groups?.length
    ? data.groups
    : [{ title: "Replaced as Standard", items: (data.cards || []).map((c) => c.title) }];

  return (
    <section className="theme-light relative overflow-hidden">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-7 md:hidden">
        <Header data={data} compact />
        <div className="mt-5 space-y-3">
          {groups.map((g) => (
            <GroupCard key={g.title} g={g} compact />
          ))}
        </div>
        <div className="mt-3">
          <Notice data={data} compact />
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-10 sm:px-6 md:block lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Header data={data} />

          <div className={`mt-8 grid items-stretch gap-6 ${groups.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {groups.map((g, i) => (
              <GroupCard key={g.title} g={g} showSketch={i === groups.length - 1 && groups.length >= 3} />
            ))}
          </div>

          <div className="mt-6">
            <Notice data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
