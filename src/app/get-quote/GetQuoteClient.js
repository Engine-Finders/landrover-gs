"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { vehiclePhoto } from "@/lib/vehiclePhoto";
import RegPlate from "@/components/reusable/RegPlate";
import Icon from "@/components/reusable/Icon";

const FIELD =
  "w-full rounded-lg border border-black/15 bg-white py-2.5 pl-10 pr-3 text-sm text-[#101828] outline-none transition-colors placeholder:text-black/40 focus:border-hero-blue focus:ring-2 focus:ring-hero-blue/25";

function Labelled({ icon, label, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-[#101828]">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/45">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        {children}
      </div>
    </div>
  );
}

export default function GetQuoteClient() {
  const params = useSearchParams();
  const router = useRouter();

  const vrm = params.get("vrm") || "";
  const make = params.get("brand") || params.get("make") || "";
  const series = params.get("series") || params.get("model") || "";
  const year = params.get("year") || "";
  const engineCapacity = params.get("engineCapacity") || "";
  const fuelType = params.get("fuelType") || "";
  const from = params.get("from") || "";

  const photo = vehiclePhoto(make, series, year);
  const summary = [make, series, year].filter(Boolean).join(" - ");

  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    postcode: "",
    description: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      vehicle_brand: make,
      vehicle_series: series,
      vehicle_year: year,
      vehicle_vrm: vrm,
      engine_capacity: engineCapacity,
      fuel_type: fuelType,
      ...form,
      // the page the visitor started on (carried through the redirect), else this page
      page_url: `${window.location.origin}${from.startsWith("/") && !from.startsWith("//") ? from : window.location.pathname}`,
      lead_source: "get-quote",
    };

    try {
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  const details = [
    year && { icon: "calendar", text: `Year: ${year}` },
    fuelType && { icon: "fuel", text: `Fuel Type: ${fuelType}` },
    engineCapacity && { icon: "engine", text: `Engine: ${engineCapacity}` },
  ].filter(Boolean);

  return (
    <div className="theme-light bg-(--color-light-surface) px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_-25px_rgba(16,24,40,0.4)] ring-1 ring-black/10">
        <div className="bg-hero-dark px-6 py-6 text-white">
          <h1 className="h2 text-white" style={{ fontStyle: "normal", fontSize: "clamp(22px, 6vw, 32px)", lineHeight: 1.05 }}>
            Get My Vehicle <span className="text-hero-blue brightness-200 saturate-150">Information</span>
          </h1>
          <p className="mt-2 text-sm text-white/80">Compare engine quotes from trusted Land Rover specialists - instantly.</p>
        </div>

        <div className="p-5 sm:p-7">
          {(summary || vrm) && (
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[40%_1fr]">
              {photo && (
                <div className="relative h-32 sm:h-40">
                  <Image src={photo} alt={summary || "Your vehicle"} fill sizes="240px" className="object-contain mix-blend-multiply" />
                </div>
              )}
              <div className="min-w-0">
                {vrm && <RegPlate value={vrm} onChange={() => {}} readOnly yellowPlate heightClass="[--ph:48px]" ariaLabel="Your registration" />}
                {summary && <p className="mt-2 text-lg font-extrabold leading-tight text-[#101828]">{[make, series].filter(Boolean).join(" ") || summary}</p>}
                {details.length > 0 && (
                  <ul className="mt-2 space-y-1 border-t border-black/10 pt-2 text-sm text-[#101828]">
                    {details.map((d) => (
                      <li key={d.text} className="flex items-center gap-2">
                        <Icon name={d.icon} className="h-4 w-4 text-hero-blue" /> {d.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <div className="mb-3 mt-5 flex items-center gap-3 border-t border-black/10 pt-4">
            <p className="h4 shrink-0 text-[#101828]">
              Enter Your <span className="text-hero-blue">Details</span>
            </p>
            <span className="h-px flex-1 bg-linear-to-r from-hero-blue to-transparent" />
          </div>

          {status === "success" ? (
            <p role="status" className="rounded-xl bg-hero-blue/10 p-6 text-center text-base font-bold text-[#101828]">
              Your Enquiry Has Been Submitted - a specialist will be in touch soon. Redirecting you home…
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Labelled icon="user" label="Name">
                  <input required placeholder="John Smith" autoComplete="name" className={FIELD} value={form.name} onChange={update("name")} />
                </Labelled>
                <Labelled icon="mail" label="Email">
                  <input required type="email" placeholder="john@example.com" autoComplete="email" className={FIELD} value={form.email} onChange={update("email")} />
                </Labelled>
                <Labelled icon="phone" label="Phone Number">
                  <input required type="tel" placeholder="07XXXXXXXXX" autoComplete="tel" className={FIELD} value={form.number} onChange={update("number")} />
                </Labelled>
                <Labelled icon="pin" label="Post Code">
                  <input required placeholder="W12 9AB" autoComplete="postal-code" className={FIELD} value={form.postcode} onChange={update("postcode")} />
                </Labelled>
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-[#101828]">
                  Any Remarks <span className="font-normal text-black/55">(Additional Information - Optional)</span>
                </label>
                <textarea
                  placeholder="Please enter any info you would like us to know."
                  className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-sm text-[#101828] outline-none placeholder:text-black/40 focus:border-hero-blue focus:ring-2 focus:ring-hero-blue/25"
                  rows={3}
                  value={form.description}
                  onChange={update("description")}
                />
              </div>

              <p className="text-xs text-black/55">
                By clicking &quot;Get Your Free Replacement Engine Quote&quot; you agree to our{" "}
                <a href="/terms-and-conditions" className="underline">Terms &amp; Conditions</a> and{" "}
                <a href="/privacy-policy" className="underline">Privacy Policy</a>.
              </p>

              {status === "error" && <p className="text-sm font-semibold text-red-600">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-linear-to-br from-hero-blue to-hero-blue-dark px-6 py-3.5 font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-60"
              >
                <Icon name="engine" className="h-6 w-6" />
                {status === "loading" ? "Sending…" : "Get Your Free Replacement Engine Quote"} <span aria-hidden>→</span>
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs text-black/60">
                <Icon name="lock" className="h-4 w-4 shrink-0" />
                Your details are secure, no spam - genuine quote from UK vetted engine specialists only.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
