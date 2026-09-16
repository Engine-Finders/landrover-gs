// Small "////AMG" performance-division wordmark badge — four narrowing
// skewed bars followed by the AMG wordmark. Pairs with LandRoverLogo (the
// tri-star) wherever the reference UI shows both together above a headline.
export default function AMGBadge({
  className = "h-4",
  barColorClass = "bg-hero-blue",
  textClassName = "text-hero-blue",
  barWidthClass = "w-[3px]",
  barGapClass = "gap-[2px]",
  gapClass = "gap-1.5",
  textSizeClass = "text-base",
}) {
  return (
    <span className={`inline-flex items-center ${gapClass} ${className}`}>
      <span className={`inline-flex h-full items-stretch ${barGapClass}`} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`${barWidthClass} shrink-0 skew-x-[-20deg] ${barColorClass}`} style={{ opacity: 1 - i * 0.16 }} />
        ))}
      </span>
      <span className={`${textSizeClass} font-normal not-italic leading-none tracking-tight ${textClassName}`} style={{ fontFamily: "var(--font-audiowide)" }}>
        LAND ROVER
      </span>
    </span>
  );
}
