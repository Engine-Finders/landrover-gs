"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { lookupVrm, buildQuoteUrl } from "@/lib/vrmLookup";
import UnionJack from "@/components/reusable/UnionJack";

// Region select + registration field + CTA used in the variant hero. Mobile: region and reg share
// a row with the button full-width beneath; md+: all three on one row.
export default function VariantHeroQuoteForm({ buttonLabel, mobileButtonLabel = "Get My Free Quotes Now" }) {
  const [region, setRegion] = useState("GB");
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [narrow, setNarrow] = useState(false);
  const router = useRouter();

  // the full placeholder doesn't fit beside the region select on phones
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const details = await lookupVrm(reg);
      router.push(buildQuoteUrl(details));
    } catch (err) {
      setError(err.message || "Please enter a valid UK registration number.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-[98px_minmax(0,1fr)] gap-2 sm:grid-cols-[108px_minmax(0,1fr)] sm:gap-2.5 md:grid-cols-[136px_minmax(0,1fr)] md:gap-4 lg:grid-cols-[136px_minmax(0,0.75fr)_minmax(0,1fr)]">
      <label className="relative flex h-13 items-center gap-2 rounded-lg border border-white/20 bg-black/40 pl-2.5 pr-2 md:h-[58px] md:gap-3 md:pl-3.5">
        <span className="sr-only">Region</span>
        <UnionJack className="w-6 shrink-0 md:w-9" />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-3.5 text-[15px] font-medium text-white outline-none md:text-[17px]"
        >
          <option value="GB" className="text-black">GB</option>
          <option value="NI" className="text-black">NI</option>
        </select>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2 h-4 w-4 text-white/80 md:right-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </label>

      <input
        type="text"
        value={reg}
        onChange={(e) => setReg(e.target.value.toUpperCase())}
        placeholder={narrow ? "Enter your reg" : "Enter your reg — e.g. AB12 CDE"}
        maxLength={8}
        autoComplete="off"
        aria-label="Vehicle registration"
        aria-invalid={error ? true : undefined}
        className="h-13 min-w-0 rounded-lg border border-white/20 bg-black/40 px-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/45 focus:border-[#7f9f4f] md:h-[58px] md:px-5 md:text-[17px]"
      />

      <button
        type="submit"
        disabled={loading}
        className="col-span-2 flex h-13 items-center justify-center gap-2.5 rounded-lg border border-[#5a7a3c] bg-[#3e5a2c] px-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(90,122,60,0.8)] transition-colors hover:bg-[#4a6a35] disabled:cursor-wait disabled:opacity-70 lg:col-span-1 md:h-[58px] md:text-[18px]"
      >
        <span className="truncate">
          {loading ? "Searching…" : (
            <>
              <span className="md:hidden">{mobileButtonLabel}</span>
              <span className="hidden md:inline">{buttonLabel}</span>
            </>
          )}
        </span>
        {!loading && (
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h16M14 6l6 6-6 6" />
          </svg>
        )}
      </button>

      {error && (
        <p role="alert" className="col-span-2 text-xs font-semibold text-red-400 lg:col-span-3">
          {error}
        </p>
      )}
    </form>
  );
}
