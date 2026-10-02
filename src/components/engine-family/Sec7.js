import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

// "LAND ROVER 200Tdi ENGINE REBUILD " -> ["LAND ROVER", "200Tdi", "ENGINE REBUILD"]
function splitTitle(t = "") {
  const m = t.trim().match(/^(Land Rover)\s+(.+?)\s+(Engine Rebuild)$/i);
  return m ? [m[1], m[2], m[3]] : ["", "", t.trim()];
}

const RING = {
  background: "linear-gradient(145deg, rgba(201,169,110,0.85), rgba(96,112,86,0.55) 45%, rgba(201,169,110,0.35))",
  boxShadow: "0 0 18px -4px rgba(201,169,110,0.35), 0 12px 26px -8px rgba(0,0,0,0.6)",
};

function Title({ data }) {
  const [brand, code, rest] = splitTitle(data.titlePre);
  return (
    <h2 className="h2 uppercase md:max-w-[58rem]">
      {brand && <span className="text-white">{brand} </span>}
      {code && <span className="text-hero-blue">{code} </span>}
      <span className="text-white">{rest} </span>
      <span className="text-[#c9a96e]">{data.titleHighlight}</span>
    </h2>
  );
}

function PhotoNote({ code, compact = false }) {
  return (
    <div className={`relative flex items-center overflow-hidden rounded-xl border border-[#c9a96e]/25 bg-white/[0.03] ${compact ? "gap-3 p-4" : "gap-6 px-8 py-6"}`}>
      <span className={`flex shrink-0 items-center justify-center rounded-full border border-[#c9a96e]/40 ${compact ? "h-10 w-10" : "h-16 w-16"}`}>
        <Icon name="camera" className={`${compact ? "h-5 w-5" : "h-7 w-7"} text-hero-blue`} />
      </span>
      {!compact && <span className="h-14 w-px shrink-0 bg-[#c9a96e]/30" aria-hidden="true" />}
      <div className={`relative z-10 ${compact ? "text-xs" : "text-sm"} leading-relaxed text-white`}>
        <p>
          <span className="font-bold text-[#c9a96e]">Real photos from our workshop</span>
          <span className="text-white/80"> — not stock imagery.</span>
        </p>
        {code && <p className="text-white/80">This is what a genuine {code} rebuild looks like.</p>}
      </div>
      {!compact && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[34%]" aria-hidden="true">
          <Image src="/engine/sec11_faq.jpg" alt="" fill className="object-cover object-right" sizes="420px" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0b100c] via-[#0b100c]/40 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default function Sec7({ data }) {
  const code = splitTitle(data.titlePre)[1];

  return (
    <section className="theme-dark relative overflow-hidden bg-[#0b100c]">
      {/* ===== mobile ===== */}
      <div className="relative px-4 py-8 md:hidden">
        <div className="flex items-center gap-3">
          <LandRoverLogo className="h-8 w-14" />
          <span className="h-10 w-px shrink-0 bg-white/15" aria-hidden="true" />
          <Title data={data} />
        </div>

        <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1">
          {data.steps.map((s, i) => (
            <div key={s.title} className="relative flex w-[38vw] shrink-0 snap-start flex-col items-center text-center">
              <span
                className={`pointer-events-none absolute top-6 border-t border-dotted border-[#c9a96e]/60 ${
                  i === 0 ? "left-1/2 right-0" : i === data.steps.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                }`}
                aria-hidden="true"
              />
              <span className="relative z-10 flex h-12 w-12 shrink-0 rounded-full p-[1.5px]" style={RING}>
                <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0f1510]">
                  <Icon name={s.icon} className="h-6 w-6 text-white" />
                </span>
              </span>
              <p className="mt-2 text-lg font-extrabold text-hero-blue">{i + 1}</p>
              <p className="text-xs font-bold uppercase text-white">{s.title}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/80">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <PhotoNote code={code} compact />
        </div>
      </div>

      {/* ===== desktop ===== */}
      <div className="relative hidden px-4 py-12 sm:px-6 md:block lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div className="flex items-center gap-5">
            <LandRoverLogo className="h-12 w-20" />
            <span className="h-12 w-px shrink-0 bg-white/15" aria-hidden="true" />
            <Title data={data} />
          </div>

          <div className="relative mt-10 grid grid-cols-10 gap-2">
            {/* dotted connector with small gold beads between the rings */}
            <span className="pointer-events-none absolute left-[5%] right-[5%] top-[38px] border-t border-dotted border-[#c9a96e]/60" aria-hidden="true" />
            {data.steps.map((s, i) => (
              <div key={s.title} className="relative flex flex-col items-center text-center">
                {i > 0 && <span className="pointer-events-none absolute -left-1 top-[35px] h-1.5 w-1.5 rounded-full bg-[#c9a96e]" aria-hidden="true" />}
                <span className="relative z-10 flex h-[76px] w-[76px] shrink-0 rounded-full p-0.5" style={RING}>
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-[#0f1510]">
                    <Icon name={s.icon} className="h-9 w-9 text-white" />
                  </span>
                </span>
                <p className="mt-4 text-lg font-extrabold text-hero-blue">{i + 1}</p>
                <p className="mt-1 text-sm font-bold uppercase leading-tight text-white">{s.title}</p>
                <p className="mt-2 px-1 text-xs leading-relaxed text-white/80">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-8">
            <PhotoNote code={code} />
          </div>
        </div>
      </div>
    </section>
  );
}
