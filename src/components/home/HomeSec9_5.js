import Image from "next/image";
import { floatingParts } from "@/lib/partImage";
import Icon from "@/components/reusable/Icon";

// The floating parts sit on one ring around the engine at equal angular steps and a single radius,
// so every part is the same distance from the engine and from its neighbours. Values are % of the
// square stage; `rotate` just varies how each part is tilted.
const RING = { count: 11, radius: 41, size: 13 };
const ROTATIONS = [-10, -18, 8, 20, 15, 10, -8, -12, 30, -22, -25];
const FLOATERS = Array.from({ length: RING.count }, (_, i) => {
  const angle = (-90 + (i * 360) / RING.count) * (Math.PI / 180);
  return {
    left: `${(50 + RING.radius * Math.cos(angle) - RING.size / 2).toFixed(2)}%`,
    top: `${(50 + RING.radius * Math.sin(angle) - RING.size / 2).toFixed(2)}%`,
    size: `${RING.size}%`,
    rotate: ROTATIONS[i],
    opacity: 0.92,
    delay: `${((i * 0.4) % 2).toFixed(1)}s`,
  };
});

export default function HomeSec9_5({ data }) {
  // each floating part is a different component: the ones listed on this section first, then the main engine parts
  const parts = floatingParts(data.parts.map((p) => p.name), FLOATERS.length);
  const [line1, line2] = data.h2.split("|");
  const [line2a, line2b] = line2.split(" ");

  return (
    <section className="theme-light relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-hero-blue/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-hero-blue/8 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <p className="label-text uppercase tracking-widest text-hero-blue">{data.eyebrow}</p>
          <h2 className="h2 -skew-x-6 origin-left scale-y-115 scale-x-92 mt-2 uppercase text-[#1a1a1a]">
            <span className="block">{line1}</span>{" "}
            <span className="block">
              {line2a} <span className="text-hero-blue">{line2b}</span>
            </span>
          </h2>

          <p className="mt-4 max-w-md text-sm text-[#1a1a1a]">{data.description}</p>

          <ul className="mt-5 divide-y divide-black/5">
            {data.parts.map((p) => (
              <li key={p.name} className="flex items-center gap-4 py-3">
                <Icon name={p.icon} className="h-12 w-12 shrink-0 text-hero-blue" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-hero-blue">{p.name}</p>
                  <p className="mt-1 text-sm text-[#1a1a1a]">{p.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-xl lg:max-w-2xl">
          {/* ambient glow behind the core */}
          <div className="absolute inset-8 rounded-full bg-hero-blue/15 blur-3xl" />

          {FLOATERS.map((f, i) => (
            <div
              key={i}
              className="animate-float absolute drop-shadow-[0_8px_16px_rgba(16,24,40,0.18)]"
              style={{
                top: f.top,
                left: f.left,
                width: f.size,
                height: f.size,
                opacity: f.opacity,
                animationDelay: f.delay,
              }}
            >
              <div className="relative h-full w-full" style={{ transform: `rotate(${f.rotate}deg)` }}>
                <Image src={parts[i] ?? data.partImage} alt="Timing chain, sprockets and bolts from an engine rebuild kit" fill className="object-contain" sizes="150px" />
              </div>
            </div>
          ))}

          <div className="animate-float-core absolute inset-[19%] z-10">
            <Image src={data.engineImage} alt="Engine core" fill className="object-contain" sizes="700px" priority={false} />
          </div>
        </div>
      </div>

      <div className="glass-card mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-x-2 gap-y-5 rounded-xl px-4 py-5 sm:grid-cols-4 sm:divide-x-2 sm:divide-black/35 sm:px-6">
        {data.highlights.map((h, i) => (
          <div key={h.suffix} className="relative flex items-center justify-center gap-3 px-2">
            {i % 2 === 1 && (
              <span className="absolute -left-2 top-1/2 h-[85%] w-0.5 -translate-y-1/2 bg-black/35 sm:hidden" />
            )}
            <Icon name={h.icon} className="h-9 w-9 shrink-0 text-hero-blue" />
            <p className="text-sm leading-snug">
              <span className="block font-extrabold text-[#1a1a1a]">{h.prefix}</span>
              <span className="block text-[#1a1a1a]">{h.suffix}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="h-px w-16 bg-black/15" />
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-[#1a1a1a]">{data.footer}</p>
        <span className="h-px w-16 bg-black/15" />
      </div>
    </section>
  );
}
