import { Fragment } from "react";
import Image from "next/image";
import carMeta from "@/data/shared/carMeta.json";

// Shared photographic vehicle scene for the dark variant sections: the variant's car cutout
// standing on the dusk highland photo (CC0 Poly Haven "Champagne Castle", graded), composited so
// it reads as one photograph rather than a cutout on a backdrop:
//  - the car is toned to the dusk light and planted per tyre (see GroundedCar),
//  - one grade, vignette and film grain sit over photo and car together.
// Fills its (relative, sized) parent. `ground` is the tyre line in % from the bottom.

const PHOTO = "/variant/hero-landscape-v3.webp";
const CAR_TONE = "brightness-[.76] contrast-[1.08] saturate-[.8] sepia-[.12]";

// box with the cutout's exact aspect ratio (carMeta.json, measured from each image), so overlays
// shaped by the car's own alpha line up pixel for pixel
const carRatio = (src) => (carMeta[src] ? `${carMeta[src].w} / ${carMeta[src].h}` : "633 / 419");
const carMask = (src) => ({ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" });
// light from the sky on the roof, ambient occlusion darkening toward the ground - clipped to the car
const AO = "linear-gradient(to bottom, rgba(150,170,200,0.10) 0%, transparent 35%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.6) 100%)";
// feathered tuft of real grass (cut from the same dusk photo), laid over a tyre's contact patch
const TUFT = {
  backgroundImage: "url(/variant/grass-strip.webp)",
  backgroundSize: "auto 100%",
  backgroundRepeat: "repeat-x",
  backgroundPosition: "center bottom",
  maskImage: "linear-gradient(to right, transparent, #000 30%, #000 70%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 30%, #000 70%, transparent)",
};
const FALLBACK_WHEELS = [[12, 94, 7], [60, 100, 6], [92, 84, 6]];

// The car's footprint on the ground: the three visible tyre contacts (front-left, near front,
// near rear - every cutout is a front-left three-quarter view) plus the hidden far-rear wheel that
// completes the parallelogram, pushed out a little so the shadow reaches past the tyres.
function footprint([fl, nf, rr]) {
  const pts = [fl, nf, rr, [fl[0] + rr[0] - nf[0], fl[1] + rr[1] - nf[1]]];
  const cx = pts.reduce((t, p) => t + p[0], 0) / 4;
  const cy = pts.reduce((t, p) => t + p[1], 0) / 4;
  return pts.map(([x, y]) => `${(cx + (x - cx) * 1.1).toFixed(1)},${(cy + (y - cy) * 1.3).toFixed(1)}`).join(" ");
}

// A car cutout planted on the ground. Every tyre's contact point is measured per image
// (carMeta.json), so each wheel - including the rear one, which sits higher in the photo - gets
// its own contact shadow and grass tuft, and the whole car casts a shadow across its footprint.
// Ambient occlusion clipped to the car's own outline darkens the body toward the ground.
export function GroundedCar({ src, sizes, priority = false }) {
  const wheels = carMeta[src]?.wheels || FALLBACK_WHEELS;
  return (
    <div className="relative w-full" style={{ aspectRatio: carRatio(src) }}>
      <svg className="absolute inset-0 h-full w-full overflow-visible blur-[9px]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points={footprint(wheels)} fill="rgba(0,0,0,0.78)" />
      </svg>
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className={`object-fill ${CAR_TONE}`} />
      <div className="absolute inset-0" style={{ ...carMask(src), background: AO }} />
      {wheels.map(([x, y, w], i) => (
        <Fragment key={i}>
          {/* grass in front of the tyre, in the car's shade, then the contact shadow pressed into it */}
          <div className="absolute brightness-[.55]" style={{ ...TUFT, left: `${x}%`, top: `${y}%`, width: `${w * 2.6}%`, height: "7%", transform: "translate(-50%, -62%)" }} />
          <div className="absolute rounded-[50%] bg-black/90 mix-blend-multiply blur-[5px]" style={{ left: `${x}%`, top: `${y}%`, width: `${w * 2}%`, height: "4%", transform: "translate(-50%, -55%)" }} />
        </Fragment>
      ))}
    </div>
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function PhotoScene({ car, ground = 11, carClass = "left-1/2 w-[76%] -translate-x-1/2", position = "18% 62%", sizes = "100vw", priority = false, children }) {
  const photo = { objectPosition: position };
  const carBox = `absolute ${carClass}`;
  const carPos = car ? { bottom: `${ground}%`, aspectRatio: carRatio(car) } : null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image src={PHOTO} alt="" fill sizes={sizes} priority={priority} className="object-cover" style={photo} />

      {car && (
        <div className={carBox} style={carPos}>
          <GroundedCar src={car} sizes={sizes} priority={priority} />
        </div>
      )}

      {/* one grade over everything: cool sky, darker foreground, vignette, grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 55%, transparent 55%, rgba(0,0,0,0.5) 100%), linear-gradient(to bottom, rgba(12,16,22,0.3), transparent 35%, transparent 72%, rgba(8,7,5,0.5))",
        }}
      />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      {children}
    </div>
  );
}

// Studio product plate for the engine: a warm spotlight, the engine on a dark floor with a soft
// reflection, and its code. Keeps the engine out of the landscape, where it would look pasted in.
export function EnginePlate({ engine, code, desc, vertical = false, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0e110d] ${className}`}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 75% at 50% 30%, rgba(201,169,110,0.18), transparent 70%), linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.35))" }} aria-hidden="true" />
      <div className={`relative flex ${vertical ? "h-full flex-col items-center justify-center gap-4 p-5 text-center" : "items-center gap-4 p-3.5 md:gap-5 md:p-4"}`}>
        <div className={`relative shrink-0 ${vertical ? "w-[82%] max-w-[230px]" : "w-[34%] max-w-[150px]"}`} aria-hidden="true">
          <Image src={engine} alt="" width={500} height={500} sizes={vertical ? "230px" : "150px"} className="relative h-auto w-full drop-shadow-[0_14px_14px_rgba(0,0,0,0.65)]" />
          <div className="absolute inset-x-[12%] bottom-[2%] h-[7%] rounded-[50%] bg-black/80 blur-[6px]" />
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c9a96e] md:text-[12px]">The engine we rebuild</p>
          {code && <p className="mt-1 text-[19px] font-semibold leading-tight text-white md:text-[21px]">{code}</p>}
          {desc && <p className="mt-0.5 text-[14px] leading-snug text-white/65 md:text-[15px]">{desc}</p>}
        </div>
      </div>
    </div>
  );
}
