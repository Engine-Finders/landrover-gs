"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import QuoteForm from "@/components/shared/QuoteForm";

const QuoteModalContext = createContext({ open: () => {} });

// Any client component can call `useQuoteModal().open()` to show the shared quote popup.
export const useQuoteModal = () => useContext(QuoteModalContext);

export default function QuoteModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const value = useMemo(() => ({ open }), [open]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Get your free engine quote"
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-md sm:items-center"
          onClick={close}
        >
          <div
            className="theme-light relative my-3 w-full max-w-lg rounded-2xl border border-white/40 bg-[#f3f0eb] p-4 shadow-2xl sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-2xl leading-none text-[#1a1a1a] transition-colors hover:bg-black/20"
            >
              ×
            </button>
            <p className="h3 pr-8 uppercase text-[#1a1a1a]">Get Your Free Engine Quote</p>
            <p className="mb-3 mt-0.5 text-sm text-black/65">
              Enter your registration and we&apos;ll identify your engine, price the rebuild and arrange recovery.
            </p>
            <QuoteForm plate source="quote-popup" />
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}
