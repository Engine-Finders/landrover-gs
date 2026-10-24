import models from "@/data/home/homeSec7.json";
import photos from "@/data/vehiclePhotos.json";
import { pickVehiclePhoto } from "@/lib/vehicleImageMatch";

// Cut-out photo for a looked-up vehicle, matched on the model name from the VRM lookup
// (e.g. "DISCOVERY SPORT" -> the Discovery Sport card image). Null when it isn't one of our models.
const ALL = [...models.landRover.models, ...models.rangeRover.models].sort((a, b) => b.name.length - a.name.length);

function modelCardPhoto(make = "", model = "") {
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

/**
 * Photo for a looked-up vehicle. Uses the shared tiered matcher over the photo library in
 * public/vehicle-photos (brand must match, then model, variant, year). When the library only has
 * the brand but not the model, the site's own model-card cut-out is preferred if there is one.
 * Null when the make is not ours or nothing matches.
 */
export function vehiclePhoto(make = "", model = "", year = null) {
  const y = /^(?:19|20)\d{2}$/.test(String(year ?? "")) ? Number(year) : null;
  const hit = pickVehiclePhoto(make, model, "", y, photos);
  if (hit?.tier === "model") return hit.src;
  return modelCardPhoto(make, model) ?? hit?.src ?? null;
}
