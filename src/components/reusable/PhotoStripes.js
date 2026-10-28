// Brand stripes that used to be baked into the section photos, redrawn as vector bands that sit on top of
// the photo (a bit wider than the old ones so they hide them). The overlay is an <img> whose SVG has the
// same aspect ratio as the photo, so passing the photo's own object-fit / object-position / transform
// classes keeps the stripes locked to the picture at any crop.
// A band is { top: [x0, x1], bottom: [x0, x1], y: [yTop, yBottom], fill } in photo pixels (x at y[0] and y[1]).

const grad = (id, stops, dir = "h") =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${dir === "h" ? 1 : 0}" y2="${dir === "h" ? 0 : 1}">${stops
    .map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op != null ? ` stop-opacity="${op}"` : ""}/>`)
    .join("")}</linearGradient>`;

function build(p) {
  const defs = [];
  const shapes = [];
  p.bands.forEach((b, i) => {
    let fill = b.fill;
    if (Array.isArray(b.fill)) {
      defs.push(grad(`g${i}`, b.fill, b.dir));
      fill = `url(#g${i})`;
    }
    const pts = `${b.top[0]},${b.y[0]} ${b.top[1]},${b.y[0]} ${b.bottom[1]},${b.y[1]} ${b.bottom[0]},${b.y[1]}`;
    if (b.glow) {
      defs.push(`<filter id="f${i}" x="-60%" y="-5%" width="220%" height="110%"><feGaussianBlur stdDeviation="${b.glow}"/></filter>`);
      shapes.push(`<polygon points="${pts}" fill="${b.glowFill ?? (Array.isArray(b.fill) ? b.fill[0][1] : b.fill)}" opacity="0.6" filter="url(#f${i})"/>`);
    }
    shapes.push(`<polygon points="${pts}" fill="${fill}"${b.opacity != null ? ` opacity="${b.opacity}"` : ""}/>`);
  });
  let body = shapes.join("");
  if (p.clip) {
    defs.push(`<clipPath id="clip"><polygon points="${p.clip}"/></clipPath>`);
    body = `<g clip-path="url(#clip)">${body}</g>`;
  }
  if (p.fade) {
    const [y0, y1] = p.fade;
    defs.push(`<linearGradient id="fadeG" gradientUnits="userSpaceOnUse" x1="0" y1="${y0}" x2="0" y2="${y1}"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`);
    defs.push(`<mask id="fade" maskUnits="userSpaceOnUse" x="0" y="0" width="${p.w}" height="${p.h}"><rect width="${p.w}" height="${y0}" fill="#fff"/><rect y="${y0}" width="${p.w}" height="${y1 - y0}" fill="url(#fadeG)"/></mask>`);
    body = `<g mask="url(#fade)">${body}</g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.w} ${p.h}"><defs>${defs.join("")}</defs>${body}</svg>`;
}

const PRESETS = {
  // sec11 desktop: two flat bands side by side - dark olive, then light olive - running down-left behind the workshop
  sec11: {
    w: 1024,
    h: 572,
    bands: [
      { top: [564, 600], bottom: [352, 388], y: [0, 572], fill: "#3b402b" },
      { top: [600, 628], bottom: [388, 416], y: [0, 572], fill: "#8c9c78" },
    ],
  },
  // sec5 desktop: olive band with a gold edge, fading out towards the engine
  sec5: {
    w: 1024,
    h: 572,
    fade: [250, 420],
    bands: [
      { top: [401, 435], bottom: [602, 636], y: [0, 400], fill: [[0, "#1a1f15"], [0.75, "#464f3b"], [1, "#4d5640"]] },
      { top: [430, 438], bottom: [631, 639], y: [0, 400], fill: "#c3a36c" },
    ],
  },
  // sec15 desktop: dark green band, fine line and gold edge, fading into the white floor
  sec15: {
    w: 1024,
    h: 572,
    fade: [260, 340],
    bands: [
      { top: [566, 582], bottom: [431, 447], y: [0, 330], dir: "h", fill: [[0, "#0f1f16"], [1, "#15271d"]] },
      { top: [582, 584.5], bottom: [447, 449.5], y: [0, 330], fill: "#8c9682", opacity: 0.7 },
      { top: [584.5, 597], bottom: [449.5, 462], y: [0, 330], fill: "#35412f" },
      { top: [597.5, 606], bottom: [462, 470.5], y: [0, 330], fill: "#b39a5a" },
    ],
  },
  // sec2 desktop: olive + gold edge along the engine photo's diagonal cut, plus the corner stripes
  sec2: {
    w: 1024,
    h: 572,
    bands: [
      { top: [611, 627], bottom: [426, 441], y: [0, 440], dir: "v", fill: [[0, "#313a2b"], [1, "#464e3c"]] },
      { top: [627, 634], bottom: [441, 448], y: [0, 440], fill: "#c4b78d" },
      { top: [1008, 1022], bottom: [965, 979], y: [470, 572], fill: "#444b39" },
      { top: [1016, 1030], bottom: [985, 999], y: [500, 572], fill: "#444b39" },
    ],
  },
};

export default function PhotoStripes({ preset, className = "object-cover", style }) {
  const p = PRESETS[preset];
  const src = `data:image/svg+xml;utf8,${encodeURIComponent(build(p))}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full select-none ${className}`} style={style} />
  );
}
