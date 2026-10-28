"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/reusable/Icon";
import RegPlate from "@/components/reusable/RegPlate";
import { lookupVrm } from "@/lib/vrmLookup";
import { vehiclePhoto } from "@/lib/vehiclePhoto";
import { vehicleTitle } from "@/lib/vehicleTitle";

const litres = (cc) => {
  const n = Number(cc);
  return n > 0 ? `${(n / 1000).toFixed(1)}L` : cc;
};

// Registration row of the on-page quote forms (dark panel): the plate plus a go arrow that looks the vehicle up
// and shows it in place. The vehicle details travel with the form as hidden fields, so the lead carries them
// whether or not the visitor looked the plate up (without a lookup only vehicle_vrm is sent).
export default function QuoteRegField({ label, ariaLabel = "Vehicle registration", labelClass = "label-text uppercase tracking-wide text-white", starClass = "text-bmw-red" }) {
  const [reg, setReg] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [looking, setLooking] = useState(false);
  const [error, setError] = useState("");
  const root = useRef(null);

  // the form's own reset (after a lead is sent) also clears the plate and the vehicle card
  useEffect(() => {
    const form = root.current?.closest("form");
    if (!form) return;
    const clear = () => {
      setReg("");
      setVehicle(null);
      setError("");
    };
    form.addEventListener("reset", clear);
    return () => form.removeEventListener("reset", clear);
  }, []);

  async function lookup() {
    setError("");
    setLooking(true);
    try {
      setVehicle(await lookupVrm(reg));
    } catch (err) {
      setVehicle(null);
      setError(err.message || "Please enter a valid UK registration number.");
    } finally {
      setLooking(false);
    }
  }

  const title = vehicle ? vehicleTitle(vehicle.make, vehicle.model) : null;
  const photo = vehicle ? vehiclePhoto(vehicle.make, vehicle.model, vehicle.year) : null;
  const vrm = (vehicle?.vrm || reg).replace(/\s+/g, "");

  return (
    <div ref={root} data-vehicle={vehicle ? "" : undefined} className="md:group-has-[[data-vehicle]]/reg:row-span-3 md:group-has-[[data-vehicle]]/reg:flex md:group-has-[[data-vehicle]]/reg:flex-col">
      <span className={labelClass}>
        {label} <span className={starClass}>*</span>
      </span>

      <input type="hidden" name="vehicle_vrm" value={vrm} />
      {vehicle && (
        <>
          <input type="hidden" name="vehicle_brand" value={vehicle.make} />
          <input type="hidden" name="vehicle_series" value={vehicle.model} />
          <input type="hidden" name="year" value={vehicle.year} />
          <input type="hidden" name="engine_capacity" value={vehicle.engineCapacity} />
          <input type="hidden" name="fuel_type" value={vehicle.fuelType} />
        </>
      )}

      {vehicle ? (
        <div className="mt-2 rounded-xl border border-white/15 bg-white/5 p-3 md:flex-1">
          <div className="grid grid-cols-[40%_1fr] items-center gap-3">
            {/* background-removed copy of the photo (public/vehicle-photos-nobg) so the car sits straight on the dark panel */}
            <div className="relative h-20 md:h-24">
              <Image src={photo ? photo.replace("/vehicle-photos/", "/vehicle-photos-nobg/") : "/home/engine-core.webp"} alt={[vehicle.make, vehicle.model].filter(Boolean).join(" ") || "Your vehicle"} fill sizes="200px" className="object-contain" />
            </div>
            <div className="min-w-0">
              <RegPlate value={vehicle.vrm} onChange={() => {}} readOnly yellowPlate heightClass="[--ph:40px]" ariaLabel="Your registration" />
              <p className="mt-1.5 truncate text-base font-extrabold leading-tight text-white">{title.title || vehicle.vrm}</p>
              {title.subtitle && <p className="truncate text-xs text-white/80">{title.subtitle}</p>}
            </div>
          </div>
          <ul className="mt-2 space-y-1 border-t border-white/10 pt-2 text-xs text-white md:text-sm">
            {vehicle.year && (
              <li className="flex items-center gap-1.5">
                <Icon name="calendar" className="h-3.5 w-3.5 text-hero-blue md:h-4 md:w-4" /> Year: {vehicle.year}
              </li>
            )}
            {vehicle.fuelType && (
              <li className="flex items-center gap-1.5">
                <Icon name="fuel" className="h-3.5 w-3.5 text-hero-blue md:h-4 md:w-4" /> Fuel Type: {vehicle.fuelType}
              </li>
            )}
            {vehicle.engineCapacity && (
              <li className="flex items-center gap-1.5">
                <Icon name="engine" className="h-3.5 w-3.5 text-hero-blue md:h-4 md:w-4" /> Engine: {litres(vehicle.engineCapacity)}
              </li>
            )}
          </ul>
          <button type="button" onClick={() => setVehicle(null)} className="mt-2 text-xs font-semibold text-white underline md:text-sm">
            Not your vehicle? Change registration
          </button>
        </div>
      ) : (
        <>
          <div
            className="mt-2 flex items-stretch gap-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                lookup();
              }
            }}
          >
            <div className="min-w-0 flex-1">
              <RegPlate value={reg} onChange={setReg} required heightClass="[--ph:56px]" className="max-w-none!" ariaLabel={ariaLabel} />
            </div>
            <button
              type="button"
              onClick={lookup}
              disabled={looking}
              aria-label="Look up vehicle"
              className="flex w-14 shrink-0 items-center justify-center rounded-lg bg-hero-blue text-white transition duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
            >
              <span aria-hidden className="text-2xl leading-none">{looking ? "…" : "→"}</span>
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-1.5 text-xs font-semibold text-red-400">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
