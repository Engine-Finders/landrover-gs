import models from "@/data/home/homeSec7.json";

// Cut-out photo for a looked-up vehicle, matched on the model name from the VRM lookup
// (e.g. "DISCOVERY SPORT" -> the Discovery Sport card image). Null when it isn't one of our models.
const ALL = [...models.landRover.models, ...models.rangeRover.models].sort((a, b) => b.name.length - a.name.length);

export function vehiclePhoto(make = "", model = "") {
  const text = `${make} ${model}`.toUpperCase();
  if (!/LAND|ROVER|DEFENDER|DISCOVERY|FREELANDER|EVOQUE|VELAR/.test(text)) return null;
  const hit = ALL.find((m) => text.includes(m.name.toUpperCase()));
  if (hit) return hit.image;
  const by = (slug) => ALL.find((m) => m.slug === slug)?.image ?? null;
  if (text.includes("EVOQUE")) return by("range-rover-evoque");
  if (text.includes("VELAR")) return by("range-rover-velar");
  if (text.includes("RANGE") && text.includes("SPORT")) return by("range-rover-sport");
  return null;
}
