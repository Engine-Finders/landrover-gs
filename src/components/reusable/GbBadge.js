export default function GbBadge({ className = "w-12" }) {
  return (
    <span
      className={`flex ${className} shrink-0 flex-col items-center justify-center gap-0.5 bg-hero-blue text-white`}
      aria-hidden="true"
    >
      <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white text-[9px] leading-none">★</span>
      <span className="text-[10px] font-extrabold tracking-wide">GB</span>
    </span>
  );
}
