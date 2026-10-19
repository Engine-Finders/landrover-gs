"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadsLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/leads/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError("Incorrect password.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-24">
      <h1 className="text-2xl font-bold text-[#1a1a1a]">Leads</h1>
      <p className="mt-1 text-sm text-gray-600">Sign in to view leads.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <label htmlFor="leads-password" className="block text-sm font-semibold text-[#1a1a1a]">
          Password
        </label>
        <input
          id="leads-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-[#1a1a1a] outline-none focus:border-hero-blue"
        />
        {error ? (
          <p role="alert" className="text-sm font-semibold text-red-600">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={busy || !password}
          className="w-full rounded bg-hero-blue px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
