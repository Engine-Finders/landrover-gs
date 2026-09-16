"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function GetQuoteClient() {
  const params = useSearchParams();
  const router = useRouter();

  const vrm = params.get("vrm") || "";
  const make = params.get("brand") || params.get("make") || "";
  const series = params.get("series") || params.get("model") || "";
  const year = params.get("year") || "";
  const engineCapacity = params.get("engineCapacity") || "";
  const fuelType = params.get("fuelType") || "";

  const summary = [make, series, year].filter(Boolean).join(" – ");

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
      vehicle_reg: year,
      vehicle_vrm: vrm,
      engine_capacity: engineCapacity,
      fuel_type: fuelType,
      ...form,
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-hero-gold)] sm:text-3xl">Get Your Land Rover Engine Quote</h1>
        <p className="mt-2 text-gray-600">Compare engine quotes from trusted Land Rover specialists — instantly.</p>

        {(summary || vrm) && (
          <div className="mt-6 flex flex-col items-center gap-2">
            {summary && <p className="border-b border-gray-300 pb-2 text-lg font-semibold">{summary}</p>}
            {vrm && (
              <div
                className="inline-block rounded-md border-4 px-6 py-2 text-2xl font-black uppercase tracking-widest text-white"
                style={{
                  fontFamily: '"Charles Wright", sans-serif',
                  backgroundColor: "var(--color-hero-gold)",
                  borderColor: "var(--color-hero-gold)",
                }}
              >
                {vrm}
              </div>
            )}
          </div>
        )}
      </div>

      {status === "success" ? (
        <p className="rounded-md bg-green-50 p-6 text-center text-green-700">
          Thanks — your quote request has been sent. Redirecting you home…
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input required placeholder="Name*" className="rounded-md border border-gray-300 px-4 py-3" value={form.name} onChange={update("name")} />
          <input required type="tel" placeholder="Mobile (WhatsApp) Number*" className="rounded-md border border-gray-300 px-4 py-3" value={form.number} onChange={update("number")} />
          <input required type="email" placeholder="Email Address*" className="rounded-md border border-gray-300 px-4 py-3" value={form.email} onChange={update("email")} />
          <input required placeholder="Postcode*" className="rounded-md border border-gray-300 px-4 py-3" value={form.postcode} onChange={update("postcode")} />
          <textarea placeholder="Add any extra notes about your vehicle here." className="rounded-md border border-gray-300 px-4 py-3" rows={4} value={form.description} onChange={update("description")} />

          <p className="text-xs text-gray-500">
            By clicking &quot;Get Quote&quot; you agree to our{" "}
            <a href="/terms-and-conditions" className="underline">Terms &amp; Conditions</a> and{" "}
            <a href="/privacy-policy" className="underline">Privacy Policy</a>.
          </p>

          {status === "error" && <p className="text-sm font-semibold text-red-600">{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 rounded-sm bg-[var(--color-hero-gold)] px-6 py-3 font-bold text-white transition-colors hover:opacity-90 disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Get Quote"}
          </button>
        </form>
      )}
    </div>
  );
}
