"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { lookupVrm, buildQuoteUrl } from "@/lib/vrmLookup";
import RegPlate from "@/components/reusable/RegPlate";

export default function RegLookupForm({
  buttonLabel = "Find My Land Rover",
  left = null,
  compact = false,
  row = false,
  stacked = false,
  large = false,
  compactButton = false,
  hideArrow = false,
  hideButton = false,
  formId,
  darkButton = false,
  whiteBorder = false,
  matchHeight = false,
  bigButtonText = false,
  short = false,
  darkField = false,
  whiteField = false,
  tight = false,
  fieldClass = "",
}) {
  const [reg, setReg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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

  const buttonHeight = matchHeight ? "h-14" : row ? (short ? "h-11" : "h-14") : stacked ? "h-9" : compact ? "h-12" : large ? "h-14" : "h-12";
  const fieldHeight = matchHeight
    ? "[--ph:56px]"
    : row
      ? short
        ? "[--ph:44px]"
        : "[--ph:56px]"
      : stacked
        ? "[--ph:64px]"
        : compact
          ? "[--ph:56px] sm:[--ph:80px]"
          : "[--ph:64px] sm:[--ph:80px]";
  const fieldBorder = whiteBorder ? "border-white/70" : "border-[var(--color-hero-gold)]";

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className={
        row
          ? "relative flex w-full items-center gap-2 text-left"
          : stacked
            ? "flex w-full flex-col items-start gap-3 text-left"
            : `flex w-full flex-col items-center ${tight ? "gap-3 sm:gap-6" : "gap-6"} text-center sm:flex-row sm:flex-wrap sm:text-left`
      }
    >
      {left}

      {error && (
        <p role="alert" className={`text-xs font-semibold text-red-400 ${row ? "absolute left-0 top-full mt-1 whitespace-nowrap" : "order-last w-full basis-full text-center sm:text-left"}`}>{error}</p>
      )}

      <RegPlate
        value={reg}
        onChange={setReg}
        tone={darkField ? "dark" : whiteField ? "white" : "light"}
        heightClass={fieldHeight}
        borderClass={fieldBorder}
        className={`${row ? "w-[calc(var(--ph)*5.6)]! shrink" : "shrink-0"} ${row || stacked ? "" : "sm:w-[calc(var(--ph)*5.6)]! sm:flex-1"} ${fieldClass}`}
      />

      {!hideButton && (
        <button
          type="submit"
          disabled={loading}
          className={`${buttonHeight} flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border-2 border-[var(--color-hero-gold)] font-bold transition-colors disabled:cursor-wait disabled:opacity-70 ${
            darkButton
              ? "bg-[var(--color-hero-gold)] text-white hover:bg-[#1a1a1a]"
              : "bg-[var(--color-hero-gold)] text-white hover:bg-[#1a1a1a]"
          } ${compactButton ? "px-2 text-[10px] gap-1 sm:px-2.5 sm:text-xs sm:gap-1.5" : bigButtonText ? "px-6 text-base sm:text-lg" : "px-6 text-sm"} ${
            stacked ? "w-full" : row ? "" : "w-full sm:w-auto"
          }`}
        >
          {loading ? "Searching…" : buttonLabel} {!loading && !hideArrow && "→"}
        </button>
      )}
    </form>
  );
}
