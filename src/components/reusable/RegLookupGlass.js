"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lookupVrm, buildQuoteUrl } from "@/lib/vrmLookup";
import Icon from "@/components/reusable/Icon";
import UnionJack from "@/components/reusable/UnionJack";

// Glass-card lookup: the usual GB strip with the Union Jack, a soft "Your Reg" field and a search button in the site theme colour.

export default function RegLookupGlass({ buttonLabel = "Look Up" }) {
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
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

  // Sizes follow the reference card (846px wide): everything is in cqw of the card, which is the size container.
  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="flex w-full overflow-hidden rounded-[0.8cqw] bg-white/60" style={{ aspectRatio: "386 / 77", boxShadow: "0 0 0 1px rgba(16,24,40,0.1), inset 0 1px 0 rgba(255,255,255,0.95)" }}>
        <span className="flex shrink-0 flex-col items-center justify-center bg-[#003399]" style={{ width: "6.4cqw", gap: "1.8cqw" }}>
          <span className="block" style={{ width: "3.2cqw" }}>
            <UnionJack className="w-full" />
          </span>
          <span className="font-bold leading-none tracking-wide text-white" style={{ fontSize: "1.6cqw" }}>GB</span>
        </span>
        <input
          type="text"
          value={reg}
          onChange={(e) => setReg(e.target.value.toUpperCase())}
          placeholder="Your Reg"
          maxLength={8}
          aria-label="Vehicle registration"
          className="min-w-0 flex-1 bg-transparent px-2 text-center font-normal uppercase tracking-[0.06em] text-black outline-none placeholder:text-black"
          style={{ fontFamily: '"Charles Wright", sans-serif', lineHeight: 0.8, fontSize: "6.8cqw" }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-[0.8cqw] font-bold uppercase tracking-wide text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        style={{ aspectRatio: "150 / 58", gap: "1cqw", fontSize: "1.9cqw", background: "linear-gradient(180deg, var(--color-hero-blue) 0%, var(--color-hero-blue-dark) 100%)", boxShadow: "0 8px 20px -8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.3)" }}
      >
        <Icon name="search" className="shrink-0" style={{ width: "2.4cqw", height: "2.4cqw" }} />
        {loading ? "Searching…" : buttonLabel}
      </button>

      {error && <p role="alert" className="absolute left-4 top-full mt-1 whitespace-nowrap text-xs font-semibold text-red-500">{error}</p>}
    </form>
  );
}
