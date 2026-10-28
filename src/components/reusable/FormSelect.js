"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Custom dropdown for the enquiry-type field (same approach as the home page's EngineExplorerForm): the browser's
// own <select> popup can't be themed, so this draws the list itself. The list is `fixed` to the field's rect so no
// ancestor clips it. A transparent required <input> carries the value, so FormData and native validation still work.
export default function FormSelect({ name, required, options, placeholder, ariaLabel, className = "", theme = "dark" }) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const btn = useRef(null);
  const wrap = useRef(null);
  const close = useCallback(() => setOpen(false), []);

  // the form's own reset (after a lead is sent) clears the chosen option too
  useEffect(() => {
    const form = wrap.current?.closest("form");
    if (!form) return;
    const clear = () => setValue("");
    form.addEventListener("reset", clear);
    return () => form.removeEventListener("reset", clear);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !wrap.current?.contains(e.target) && close();
    const onKey = (e) => e.key === "Escape" && close();
    const follow = (e) => {
      if (wrap.current?.contains(e.target)) return;
      if (btn.current) setRect(btn.current.getBoundingClientRect());
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", follow, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", follow, true);
      window.removeEventListener("resize", close);
    };
  }, [open, close]);

  function toggle() {
    if (!open) setRect(btn.current.getBoundingClientRect());
    setOpen(!open);
  }

  const pick = (v) => {
    setValue(v);
    close();
  };

  const dark = theme === "dark";
  const row = `block w-full px-4 py-2.5 text-left text-sm leading-snug ${dark ? "text-white hover:bg-white/10" : "text-[#101828] hover:bg-hero-blue/10"}`;
  const muted = dark ? "text-white/60" : "text-black/55";

  return (
    // The field usually sits inside a <label>: a click anywhere in a label is re-fired on its first button (the
    // trigger), which would toggle the list straight back open after a pick. Only the trigger's own click may go through.
    <div ref={wrap} className="relative" onClick={(e) => !btn.current?.contains(e.target) && e.preventDefault()}>
      <button
        ref={btn}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        className={`flex w-full items-center justify-between gap-2 text-left outline-none ${className}`}
      >
        <span className="min-w-0 flex-1 truncate">{value || placeholder}</span>
        <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <input
        name={name}
        required={required}
        value={value}
        onChange={() => {}}
        onFocus={() => btn.current?.focus()}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
      {open && rect && (
        <ul
          role="listbox"
          className={`fixed z-[200] max-h-60 overflow-y-auto rounded-lg border py-1 shadow-xl ${dark ? "border-white/15 bg-[#141814]" : "border-black/10 bg-white"}`}
          style={{
            left: rect.left,
            width: rect.width,
            ...(window.innerHeight - rect.bottom < 260 && rect.top > 260 ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
          }}
        >
          <li role="option" aria-selected={!value}>
            <button type="button" className={`${row} ${muted}`} onClick={() => pick("")}>
              {placeholder}
            </button>
          </li>
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button type="button" className={`${row} ${o === value ? "font-semibold" : ""}`} onClick={() => pick(o)}>
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
