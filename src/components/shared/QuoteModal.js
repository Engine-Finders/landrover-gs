"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import QuotePopup from "@/components/shared/QuotePopup";

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
          className="fixed inset-x-0 top-0 z-[100] flex h-dvh items-center justify-center bg-black/40 p-3 backdrop-blur-md"
          onClick={close}
        >
          <div className="relative w-full max-w-lg sm:max-w-xl" onClick={(e) => e.stopPropagation()}>
            <QuotePopup onClose={close} />
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}
