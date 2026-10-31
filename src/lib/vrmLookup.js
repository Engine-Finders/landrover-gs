"use client";

// Plate look-up goes through our own /api/vrm route: the provider key stays on the server (VRM_API_KEY).

export async function lookupVrm(rawReg) {
  const vrm = (rawReg || "").trim().toUpperCase();
  if (!vrm) {
    throw new Error("Please enter a vehicle registration number.");
  }

  const apiUrl = `/api/vrm?vrm=${encodeURIComponent(vrm)}`;
  const response = await fetch(apiUrl);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Please enter a valid UK registration number.");
  }

  return {
    vrm,
    make: data.make || "",
    model: data.model || "",
    year: data.yearOfManufacture || "",
    engineCapacity: data.engineCapacity || "",
    fuelType: data.fuelType || "",
    colour: data.colour || data.color || "",
  };
}

export function buildQuoteUrl(details) {
  const params = new URLSearchParams({
    vrm: details.vrm || "",
    year: details.year || "",
    brand: details.make || "",
    series: details.model || "",
    engineCapacity: details.engineCapacity || "",
    fuelType: details.fuelType || "",
  });
  // remember the page the lookup was run on, so the lead can report where it really came from
  if (typeof window !== "undefined") params.set("from", window.location.pathname);
  return `/get-quote?${params.toString()}`;
}
