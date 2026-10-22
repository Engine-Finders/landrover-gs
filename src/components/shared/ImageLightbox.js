"use client";

import { useEffect } from "react";
import Image from "next/image";

// Tap-to-enlarge popup: blurred glass backdrop, image centred in the visible viewport (dvh, so a phone's
// collapsing address bar doesn't push it down) and fully visible, a × top-right.
// Closes on ×, a tap outside the image, Escape, or as soon as the page is scrolled.
export default function ImageLightbox({ img, onClose }) {
  useEffect(() => {
    const startY = window.scrollY;
    const onScroll = () => Math.abs(window.scrollY - startY) > 8 && onClose();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      className="fixed inset-x-0 top-0 z-50 flex h-dvh items-center justify-center bg-black/35 p-4 backdrop-blur-xl backdrop-saturate-150"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 text-3xl leading-none text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/25"
      >
        ×
      </button>
      <Image
        src={img.src}
        alt={img.alt}
        width={1600}
        height={1200}
        sizes="92vw"
        onClick={(e) => e.stopPropagation()}
        className="h-auto max-h-[70dvh] w-auto max-w-[88vw] rounded-xl object-contain shadow-2xl ring-1 ring-white/30"
      />
    </div>
  );
}
