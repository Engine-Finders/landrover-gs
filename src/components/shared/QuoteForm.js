"use client";

import { useState } from "react";
import Link from "next/link";
import RegPlate from "@/components/reusable/RegPlate";
import { lookupVrm } from "@/lib/vrmLookup";

const FIELD_BASE =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition-colors placeholder:text-black/40 focus:border-hero-blue focus:ring-2 focus:ring-hero-blue/25";

function Label({ children, required, hint, compact }) {
  return (
    <label className={`${compact ? "mb-1" : "mb-1.5"} block text-sm font-semibold text-[#1a1a1a]`}>
      {children}
      {required && <span className="ml-0.5 text-red-600">*</span>}
      {hint && <span className="ml-1 font-normal text-black/50">{hint}</span>}
    </label>
  );
}

// Lead form shared by the quote popup and the contact page. Posts to /api/send-lead (same endpoint
// as /get-quote). `plate` puts the number-plate style registration box at the top (popup);
// without it the registration is an ordinary optional field (contact page).
export default function QuoteForm({ plate = false, source = "quote-form", onDone }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [reg, setReg] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const FIELD = plate ? FIELD_BASE.replace("py-3", "py-2") : FIELD_BASE;

  async function lookup() {
    if (reg.trim().length < 2) return;
    try {
      setVehicle(await lookupVrm(reg));
    } catch {
      setVehicle(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");
    try {
      const data = Object.fromEntries(new FormData(form));
      delete data.consent;
      const payload = {
        ...data,
        vehicle_vrm: reg.replace(/\s+/g, ""),
        ...(vehicle && {
          vehicle_brand: vehicle.make,
          vehicle_series: vehicle.model,
          year: vehicle.year,
          engine_capacity: vehicle.engineCapacity,
          fuel_type: vehicle.fuelType,
        }),
        page_url: window.location.href,
        lead_source: source,
      };
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
      setReg("");
      setVehicle(null);
      onDone?.();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or call us on 01268 944234.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-xl bg-hero-blue/10 p-6 text-center text-base font-bold text-hero-blue">
        Thanks - your request has been sent. We&apos;ll be in touch shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${plate ? "space-y-2.5" : "space-y-4"} text-left`}>
      {/* honeypot: bots fill it, people never see it */}
      <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {plate ? (
        <div>
          <RegPlate value={reg} onChange={setReg} onBlur={lookup} heightClass="[--ph:52px] sm:[--ph:64px]" className="mx-auto" />
          {vehicle?.make && (
            <p className="mt-2 text-center text-xs font-semibold text-hero-blue">
              {[vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ")}
            </p>
          )}
        </div>
      ) : null}

      <div>
        <Label required compact={plate}>Full Name</Label>
        <input name="name" required autoComplete="name" placeholder="Your full name" className={FIELD} />
      </div>

      <div className={`grid sm:grid-cols-2 ${plate ? "gap-2.5" : "gap-4"}`}>
        <div>
          <Label required compact={plate}>Email Address</Label>
          <input name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={FIELD} />
        </div>
        <div>
          <Label required compact={plate}>Phone Number</Label>
          <input name="number" type="tel" required autoComplete="tel" placeholder="07xxx xxx xxx" className={FIELD} />
        </div>
      </div>

      {!plate && (
        <div>
          <Label hint="(optional but helpful)">Vehicle Registration</Label>
          <input
            value={reg}
            onChange={(e) => setReg(e.target.value.toUpperCase())}
            onBlur={lookup}
            maxLength={8}
            placeholder="e.g., AB12 CDE"
            className={FIELD}
          />
        </div>
      )}

      <div>
        <Label required compact={plate}>Engine Code / Problem Description</Label>
        <textarea
          name="description"
          required
          rows={plate ? 2 : 4}
          placeholder="Describe your issue, engine code, symptoms, or what quote you need..."
          className={`${FIELD} resize-y`}
        />
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-black/70">
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-hero-blue" />
        <span>
          I consent to Land Rover Garage storing my data to respond to this enquiry. Your data is handled in accordance with our{" "}
          <Link href="/privacy-policy" className="font-semibold text-hero-blue underline">
            Privacy Policy
          </Link>
          . <span className="text-red-600">*</span>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-center text-sm font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`btn-text w-full rounded-full bg-hero-blue px-6 ${plate ? "py-2.5" : "py-3.5"} text-white shadow-lg transition-colors hover:bg-hero-dark disabled:cursor-wait disabled:opacity-70`}
      >
        {status === "loading" ? "Sending…" : plate ? "Get My Free Quote" : "Send Enquiry"}
      </button>

      <p className={`text-center text-xs text-black/55 ${plate ? "hidden sm:block" : ""}`}>
        We typically respond within 2 hours during business hours (Mon-Fri 9am-6pm, Sat 11am-2pm).
      </p>
    </form>
  );
}
