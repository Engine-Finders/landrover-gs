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

  return { status, error, handleSubmit };
}

export function LeadStatus({ lead }) {
  if (lead.status === "success")
    return (
      <p role="status" className="mt-3 text-center text-sm font-bold text-hero-blue">
        Thanks — your request has been sent. We&apos;ll be in touch shortly.
      </p>
    );
  if (lead.status === "error")
    return (
      <p role="alert" className="mt-3 text-center text-sm font-semibold text-red-400">
        {lead.error}
      </p>
    );
  return null;
}
