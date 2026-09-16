import Image from "next/image";

// Real Land Rover emblem (client-supplied PNG, background removed),
// replacing the earlier inline-SVG redraw. `className` still controls size
// (e.g. "h-8 w-8") exactly like before, so every call site is unchanged.
//
// Image `fill` needs *some* positioning context on this wrapper — normally
// "relative", but callers that need to position the whole logo themselves
// (e.g. "absolute ... -translate-x-1/2") pass their own position utility, and
// forcing "relative" here too made both classes compete for the CSS
// `position` property, with "relative" silently winning and breaking the
// caller's placement. Only fall back to "relative" when nothing else in the
// passed className already sets a position.
export default function LandRoverLogo({ className = "w-10 h-10" }) {
  const hasPosition = /\b(absolute|fixed|sticky|relative|static)\b/.test(className);
  return (
    <span className={`inline-block shrink-0 ${hasPosition ? "" : "relative"} ${className}`}>
      <Image src="/landrover_real_logo.webp" alt="Land Rover" fill className="object-contain" sizes="80px" />
    </span>
  );
}
