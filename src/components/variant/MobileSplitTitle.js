import LandRoverStripe from "@/components/reusable/LandRoverStripe";

export default function MobileSplitTitle({ titlePre, titleHighlight, className = "", baseColorClass = "text-[#101828]", stripeVariant = "right" }) {
  const words = [
    ...titlePre.trim().split(/\s+/).filter(Boolean).map((w) => ({ w, highlight: false })),
    ...titleHighlight.trim().split(/\s+/).filter(Boolean).map((w) => ({ w, highlight: true })),
  ];

  const heading = (
    <h2 className={`h2 uppercase ${className}`}>
      {words.map((t, i) => (
        <span key={i} className={t.highlight ? "text-hero-blue" : baseColorClass}>
          {t.w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );

  if (stripeVariant === "left") {
    return (
      <h2 className={`h2 uppercase ${className}`}>
        <LandRoverStripe className="float-left mr-2 mt-0.5 h-6 w-12 shrink-0" />
        {words.map((t, i) => (
          <span key={i} className={t.highlight ? "text-hero-blue" : baseColorClass}>
            {t.w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
    );
  }

  return (
    <div className="relative overflow-hidden pr-9">
      {heading}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 flex gap-1"
        style={{ transform: "skewX(-20deg)", transformOrigin: "top right" }}
        aria-hidden="true"
      >
        <span className="h-full w-2.5" style={{ background: "var(--color-bmw-blue)" }} />
        <span className="h-full w-2.5" style={{ background: "var(--color-bmw-violet)" }} />
        <span className="h-full w-2.5" style={{ background: "var(--color-bmw-red)" }} />
      </div>
    </div>
  );
}
