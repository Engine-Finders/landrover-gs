"use client";

import { usePathname } from "next/navigation";
import { useQuoteModal } from "@/components/shared/QuoteModal";

// Pages that are already a quote/lead screen don't need the floating button.
const HIDDEN_ON = ["/get-quote", "/leads"];

export default function StickyQuoteCta() {
  const { open } = useQuoteModal();
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null;

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Get a free engine quote"
      className="btn-text fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border-2 border-white/30 bg-hero-blue px-5 py-3 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-hero-dark sm:bottom-6 sm:right-6"
    >
      Get Free Quote
    </button>
  );
}
