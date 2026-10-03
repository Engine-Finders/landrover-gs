"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lookupVrm, buildQuoteUrl } from "@/lib/vrmLookup";

// Shared registration-lookup submit: VRM -> vehicle details -> prefilled /get-quote.
export default function useRegLookup() {
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e) {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      router.push(buildQuoteUrl(await lookupVrm(reg)));
    } catch (err) {
      setError(err.message || "Please enter a valid UK registration number.");
    } finally {
      setLoading(false);
    }
  }

  return { reg, setReg: (v) => setReg(v.toUpperCase()), loading, error, submit };
}
