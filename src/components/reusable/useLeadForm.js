"use client";

import { useState } from "react";

// Submits an on-page quote form to /api/send-lead (same endpoint as /get-quote).
// Inputs are read by `name`: vehicle_vrm, postcode, name, number, email, description.
export default function useLeadForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError("");
    try {
      const payload = {
        ...Object.fromEntries(new FormData(form)),
        page_url: window.location.href,
        lead_source: "page-quote-form",
      };
      const res = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or call us on 0203 488 4649.");
    }
  }

  const dismiss = () => setStatus("idle");
  return { status, error, handleSubmit, dismiss };
}

export function LeadStatus({ lead }) {
  if (lead.status === "success")
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Enquiry submitted"
        className="fixed inset-x-0 top-0 z-[110] flex h-dvh items-center justify-center bg-black/50 p-4 backdrop-blur-md"
        onClick={lead.dismiss}
      >
        <div className="relative w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-hero-blue text-2xl text-white" aria-hidden>
            ✓
          </span>
          <p className="mt-4 text-xl font-extrabold text-[#101828]">Your Enquiry Has Been Submitted</p>
          <p className="mt-2 text-sm text-[#101828]">A specialist will be in touch soon.</p>
          <button type="button" onClick={lead.dismiss} className="mt-5 rounded-lg bg-hero-blue px-8 py-2.5 text-sm font-bold uppercase text-white transition hover:brightness-110">
            Close
          </button>
        </div>
      </div>
    );
  if (lead.status === "error")
    return (
      <p role="alert" className="mt-3 text-center text-sm font-semibold text-red-400">
        {lead.error}
      </p>
    );
  return null;
}
