// Fades an image's top and bottom edges into the surrounding section colour so no hard edge shows.
// Mirrors mercedes-garage's top/bottom gradient strips, but uneven (taller at the bottom) and eased
// with several stops instead of a straight linear ramp. Place inside a `relative` image box.
function ease(color, dir) {
  return `linear-gradient(${dir}, ${color} 0%, color-mix(in srgb, ${color} 85%, transparent) 22%, color-mix(in srgb, ${color} 55%, transparent) 48%, color-mix(in srgb, ${color} 22%, transparent) 75%, transparent 100%)`;
}

export default function EdgeFade({ color = "#fff", top = "h-12", bottom = "h-20" }) {
  return (
    <>
      <div className={`pointer-events-none absolute inset-x-0 top-0 ${top}`} style={{ background: ease(color, "to bottom") }} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 ${bottom}`} style={{ background: ease(color, "to top") }} aria-hidden="true" />
    </>
  );
}
