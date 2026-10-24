import UnionJack from "@/components/reusable/UnionJack";

// Number-plate input shared by every registration box on the site. Everything is sized from the plate
// height (--ph) so the width, blue GB strip, flag, GB label and text keep the proportions of the
// hero trust card at any size. The text also shrinks to fit when the plate is squeezed narrower than that
// (phones, plate beside a button), so "YOUR REG" never clips. Callers set the height with `heightClass` (e.g. "[--ph:56px] sm:[--ph:80px]").
// plate width = 5.6 x height (max-w-[calc(var(--ph)*5.6)] below)

const TONES = {
  light: "bg-[#e4e8ec] text-black placeholder:text-black",
  white: "bg-white text-black placeholder:text-black/70",
  dark: "bg-[#232323] text-white placeholder:text-white/40",
};

export default function RegPlate({
  value,
  onChange,
  onBlur,
  tone = "light",
  heightClass = "[--ph:64px] sm:[--ph:80px]",
  borderClass = "border-[var(--color-hero-gold)]",
  className = "",
  ariaLabel = "Vehicle registration",
  readOnly = false,
}) {
  return (
    <div
      className={`flex h-(--ph) w-full min-w-0 max-w-[calc(var(--ph)*5.6)] overflow-hidden rounded-sm border-2 shadow-sm ${borderClass} ${heightClass} ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <span
        className="flex shrink-0 flex-col items-center justify-center bg-[#003399]"
        style={{ width: "calc(var(--ph) * 0.7)", gap: "calc(var(--ph) * 0.2)" }}
      >
        <span className="block" style={{ width: "calc(var(--ph) * 0.35)" }}>
          <UnionJack className="w-full" />
        </span>
        <span className="font-bold leading-none tracking-wide text-white" style={{ fontSize: "calc(var(--ph) * 0.175)" }}>
          GB
        </span>
      </span>
      <input
        type="text"
        readOnly={readOnly}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        onBlur={onBlur}
        placeholder="Your Reg"
        maxLength={8}
        aria-label={ariaLabel}
        style={{ fontFamily: '"Charles Wright", sans-serif', lineHeight: 0.8, fontSize: "min(calc(var(--ph) * 0.75), calc((100cqw - var(--ph) * 0.7 - 16px) / 5))" }}
        className={`min-w-0 flex-1 px-2 text-center font-normal uppercase tracking-[0.06em] outline-none ${TONES[tone]}`}
      />
    </div>
  );
}
