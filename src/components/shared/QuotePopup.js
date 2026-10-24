"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/reusable/Icon";
import RegPlate from "@/components/reusable/RegPlate";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import { lookupVrm } from "@/lib/vrmLookup";
import { vehiclePhoto } from "@/lib/vehiclePhoto";
import { vehicleTitle } from "@/lib/vehicleTitle";

const OLIVE = "#607056";

const FIELD =
  "w-full rounded-lg border border-black/15 bg-white py-1.5 pl-9 pr-2 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-black/40 focus:border-[#607056] focus:ring-2 focus:ring-[#607056]/25";

const SVG = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const GLYPHS = {
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  phone: <path d="M6.5 3.5l2.5.5 1.2 3.4-1.7 1.3a11 11 0 005.3 5.3l1.3-1.7 3.4 1.2.5 2.5a2 2 0 01-2 2.3A15.5 15.5 0 014.2 5.5a2 2 0 012.3-2z" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-4 3.5V16H4z" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.5v4M16 3.5v4M4 10h16" />
    </>
  ),
};

function Glyph({ name, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...SVG}>
      {GLYPHS[name]}
    </svg>
  );
}

function Labelled({ icon, label, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-[#1a1a1a]">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-2.5 top-[9px] text-black/45">
          <Glyph name={icon} />
        </span>
        {children}
      </div>
    </div>
  );
}

const litres = (cc) => {
  const n = Number(cc);
  return n > 0 ? `${(n / 1000).toFixed(1)}L` : cc;
};

// Contents of the site-wide quote popup: look the registration up (optional), then fill in the details.
export default function QuotePopup({ onClose }) {
  const [reg, setReg] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleLookup(e) {
    e.preventDefault();
    setLookupError("");
    setLooking(true);
    try {
      setVehicle(await lookupVrm(reg));
    } catch (err) {
      setVehicle(null);
      setLookupError(err.message || "Please enter a valid UK registration number.");
    } finally {
      setLooking(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");
    try {
      const data = Object.fromEntries(new FormData(form));
      const payload = {
        ...data,
        vehicle_vrm: (vehicle?.vrm || reg).replace(/\s+/g, ""),
        ...(vehicle && {
          vehicle_brand: vehicle.make,
          vehicle_series: vehicle.model,
          year: vehicle.year,
          engine_capacity: vehicle.engineCapacity,
          fuel_type: vehicle.fuelType,
        }),
        page_url: window.location.href,
        lead_source: "quote-popup",
      };
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or call us on 0203 488 4649.");
    }
  }

  const title = vehicle ? vehicleTitle(vehicle.make, vehicle.model) : { title: "", subtitle: "" };
  const photo = vehicle ? vehiclePhoto(vehicle.make, vehicle.model, vehicle.year) : null;

  return (
    <div className="theme-light max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl shadow-2xl">
      {/* dark photo header */}
      <div className="relative px-5 pb-2 pt-4 sm:px-7">
        <Image src="/home/sec4.5_new.webp" alt="" fill sizes="520px" className="object-cover object-[30%_55%] opacity-70" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0d0f0c] via-[#0d0f0c]/75 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/30 text-2xl leading-none text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          ×
        </button>
        {vehicle && <LandRoverLogo className="absolute bottom-3 right-6 h-10 w-10 sm:right-8" />}
        <div className="relative">
          {/* inline size: the global .h2 rule would otherwise win at desktop widths and blow the title up */}
          <p className="h2 max-w-[88%] text-white" style={{ fontStyle: "normal", fontSize: "clamp(20px, 5.4vw, 30px)", lineHeight: 1.05 }}>
            Get My Vehicle <span style={{ color: "#8aa080" }}>Information</span>
          </p>
          <p className="mt-1.5 max-w-[92%] text-sm leading-snug text-white/80">Enter your vehicle registration to find best replacement engine quote.</p>
        </div>
      </div>

      {/* form: same panel as the header, no separate card */}
      <div className="relative px-4 pb-3 pt-3 sm:px-6">
        {status === "success" ? (
          <p role="status" className="rounded-xl bg-[#607056]/10 p-6 text-center text-base font-bold text-[#3b402b]">
            Thanks — your request has been sent. We&apos;ll be in touch shortly.
          </p>
        ) : (
          <>
            {vehicle ? (
              <div>
                <div className="grid grid-cols-[40%_1fr] items-center gap-3">
                  <div className="relative h-20 sm:h-28">
                    <Image
                      src={photo || "/home/engine-core.webp"}
                      alt={[vehicle.make, vehicle.model].filter(Boolean).join(" ") || "Your vehicle"}
                      fill
                      sizes="200px"
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="min-w-0">
                    <RegPlate value={vehicle.vrm} onChange={() => {}} readOnly yellowPlate heightClass="[--ph:44px]" ariaLabel="Your registration" />
                    <p className="mt-1.5 truncate text-lg font-extrabold leading-tight text-[#1a1a1a]">{title.title || vehicle.vrm}</p>
                    {title.subtitle && <p className="truncate text-sm text-[#1a1a1a]/80">{title.subtitle}</p>}
                    <ul className="mt-1 space-y-0.5 border-t border-black/10 pt-1 text-xs text-[#1a1a1a]">
                      {vehicle.year && (
                        <li className="flex items-center gap-1.5">
                          <Glyph name="calendar" className="h-3.5 w-3.5 text-[#3b402b]" /> Year: {vehicle.year}
                        </li>
                      )}
                      {vehicle.fuelType && (
                        <li className="flex items-center gap-1.5">
                          <Icon name="fuel" className="h-3.5 w-3.5 text-[#3b402b]" /> Fuel Type: {vehicle.fuelType}
                        </li>
                      )}
                      {vehicle.engineCapacity && (
                        <li className="flex items-center gap-1.5">
                          <Icon name="engine" className="h-3.5 w-3.5 text-[#3b402b]" /> Engine: {litres(vehicle.engineCapacity)}
                        </li>
                      )}
                      {vehicle.colour && (
                        <li className="flex items-center gap-1.5">
                          <span className="h-3.5 w-3.5 rounded-full border border-black/25" style={{ background: String(vehicle.colour).toLowerCase() }} />
                          Colour: {vehicle.colour}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <button type="button" onClick={() => setVehicle(null)} className="mt-1.5 text-xs font-semibold text-[#3b402b] underline">
                  Not your vehicle? Change registration
                </button>
              </div>
            ) : (
              <form onSubmit={handleLookup}>
                <div className="flex items-stretch gap-2">
                  <RegPlate value={reg} onChange={setReg} heightClass="[--ph:48px] sm:[--ph:56px]" className="flex-1" />
                  <button
                    type="submit"
                    disabled={looking}
                    className="btn-text flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md px-3 text-xs text-white transition-colors hover:bg-[#1a1a1a] disabled:cursor-wait disabled:opacity-70 sm:px-4 sm:text-sm"
                    style={{ background: OLIVE }}
                  >
                    {looking ? "Searching…" : "Get Instant Quote"} {!looking && "→"}
                  </button>
                </div>
                {lookupError && (
                  <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
                    {lookupError}
                  </p>
                )}
              </form>
            )}

            <div className="mb-1.5 mt-2 flex items-center gap-3 border-t border-black/10 pt-2">
              <p className="h4 shrink-0 text-[#1a1a1a]">
                Enter Your <span style={{ color: OLIVE }}>Details</span>
              </p>
              <span className="h-px flex-1 bg-gradient-to-r from-[#607056] to-transparent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-2">
                <Labelled icon="user" label="Name">
                  <input name="name" required autoComplete="name" placeholder="John Smith" className={FIELD} />
                </Labelled>
                <Labelled icon="mail" label="Email">
                  <input name="email" type="email" required autoComplete="email" placeholder="john@example.com" className={FIELD} />
                </Labelled>
                <Labelled icon="phone" label="Phone Number">
                  <input name="number" type="tel" required autoComplete="tel" placeholder="07XXXXXXXXX" className={FIELD} />
                </Labelled>
                <Labelled icon="pin" label="Post Code">
                  <input name="postcode" autoComplete="postal-code" placeholder="W12 9AB" className={FIELD} />
                </Labelled>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-[#1a1a1a]">
                  Any Remarks <span className="font-normal text-black/55">(Additional Information – Optional)</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-2.5 top-[9px] text-black/45">
                    <Glyph name="chat" />
                  </span>
                  <textarea name="description" rows={1} placeholder="Please enter any info you would like us to know." className={`${FIELD} resize-y`} />
                </div>
              </div>

              {status === "error" && (
                <p role="alert" className="text-center text-sm font-semibold text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-text flex w-full items-center justify-center gap-2.5 rounded-lg py-2.5 text-white shadow-lg transition-colors hover:bg-[#1a1a1a] disabled:cursor-wait disabled:opacity-70"
                style={{ background: OLIVE }}
              >
                <Icon name="engine" className="h-6 w-6" />
                {status === "loading" ? "Sending…" : "Get Your Free Engine Quote"} {status !== "loading" && "→"}
              </button>

              <p className="flex items-start justify-center gap-1.5 text-center text-[11px] leading-snug text-black/60 sm:text-xs">
                <Icon name="lock" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Your details are secure, no spam – genuine quote from UK vetted engine specialists only. By sending this you agree to our{" "}
                  <Link href="/privacy-policy" className="font-semibold underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
