"use client";

// Same VRM lookup provider used by the EngineFinders hero (asset/hero-logic.js),
// so all brand sites share one data source and one lead destination.
const API_KEY = "157be19933d191db7628a7a7afa10bc9";

export async function lookupVrm(rawReg) {
  const vrm = (rawReg || "").trim().toUpperCase();
  if (!vrm) {
    throw new Error("Please enter a vehicle registration number.");
  }

  const apiUrl = `https://api.checkcardetails.co.uk/vehicledata/vehicleregistration?apikey=${API_KEY}&vrm=${encodeURIComponent(vrm)}`;
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
  return `/get-quote?${params.toString()}`;
}
