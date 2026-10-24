"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/reusable/Icon";

// Custom dropdown instead of a native <select>: the browser's own popup can't be styled, runs wider than
// the field on phones and runs off the card. The list is `fixed` to the field's rect so no ancestor clips it.
function Dropdown({ value, onChange, options, placeholder, disabled, className = "", children }) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const btn = useRef(null);
  const wrap = useRef(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    // only this dropdown's own field + list count as "inside", so opening another one closes this one
    const onDown = (e) => !wrap.current?.contains(e.target) && close();
    const onKey = (e) => e.key === "Escape" && close();
    // the page scrolling moves the field, so follow it; scrolling the list itself is left alone
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
    if (disabled) return;
    if (!open) setRect(btn.current.getBoundingClientRect());
    setOpen(!open);
  }

  const pick = (v) => {
    onChange(v);
    close();
  };
  const row = "block w-full px-3 py-2.5 text-left text-sm leading-snug text-[#1a1a1a] hover:bg-hero-blue/10";

  return (
    <div ref={wrap} className="relative">
      <button
        ref={btn}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        className={`flex w-full items-center justify-between gap-2 text-left text-sm text-[#1a1a1a] outline-none disabled:text-black/40 ${className}`}
      >
        <span className={`min-w-0 flex-1 truncate ${value ? "" : "text-black/60"}`}>{value || placeholder}</span>
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {children}
      {open && rect && (
        <ul
          role="listbox"
          className="fixed z-[90] max-h-60 overflow-y-auto rounded-lg border border-black/10 bg-white py-1 shadow-xl"
          style={{
            left: rect.left,
            width: rect.width,
            ...(window.innerHeight - rect.bottom < 260 && rect.top > 260 ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
          }}
        >
          <li role="option" aria-selected={!value}>
            <button type="button" className={`${row} text-black/55`} onClick={() => pick("")}>
              {placeholder}
            </button>
          </li>
          {options.map((o) => (
            <li key={o} role="option" aria-selected={o === value}>
              <button type="button" className={`${row} ${o === value ? "bg-hero-blue/10 font-semibold" : ""}`} onClick={() => pick(o)}>
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Select({ label, icon, value, onChange, options, placeholder, disabled, mobile }) {
  if (mobile) {
    return (
      <div className="flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-sm">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue/10">
          <Icon name={icon} className="h-4 w-4 text-hero-blue" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="label-text uppercase tracking-wide text-[#1a1a1a]">{label}</p>
          <Dropdown value={value} onChange={onChange} options={options} placeholder={placeholder} disabled={disabled} />
        </div>
      </div>
    );
  }
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#1a1a1a]">
        <Icon name={icon} className="h-4 w-4" />
        {label.toUpperCase()}
      </label>
      <Dropdown
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        className="rounded-md border border-black/10 bg-white px-3 py-2.5 disabled:bg-black/5"
      />
    </div>
  );
}

export default function EngineExplorerForm({ fields, explorer, ctaButton, mobile }) {
  const router = useRouter();
  const [model, setModel] = useState("");
  const [engineCode, setEngineCode] = useState("");
  const [fuel, setFuel] = useState("");
  const [generation, setGeneration] = useState("");
  const [issue, setIssue] = useState("");

  const filteredByModel = useMemo(() => (model ? explorer.entries.filter((e) => e.model === model) : explorer.entries), [model, explorer]);
  const filteredByEngine = useMemo(() => (engineCode ? filteredByModel.filter((e) => e.engineCode === engineCode) : filteredByModel), [engineCode, filteredByModel]);
  const filteredByFuel = useMemo(() => (fuel ? filteredByEngine.filter((e) => e.fuel === fuel) : filteredByEngine), [fuel, filteredByEngine]);

  const engineOptions = useMemo(() => [...new Set(filteredByModel.map((e) => e.engineCode))].sort(), [filteredByModel]);
  const fuelOptions = useMemo(() => [...new Set(filteredByEngine.map((e) => e.fuel).filter(Boolean))].sort(), [filteredByEngine]);
  const generationOptions = useMemo(() => [...new Set(filteredByFuel.map((e) => e.generation).filter(Boolean))].sort(), [filteredByFuel]);

  const match = filteredByFuel.find((e) => !generation || e.generation === generation) || filteredByFuel[0];

  function handleFindEngine() {
    if (match?.engineHref) router.push(match.engineHref);
    else if (match?.modelHref) router.push(match.modelHref);
    else router.push(`/get-quote?${issue ? `issue=${encodeURIComponent(issue)}&` : ""}from=${encodeURIComponent(window.location.pathname)}`);
  }

  const selects = [
    { ...fields[0], value: model, onChange: (v) => { setModel(v); setEngineCode(""); setFuel(""); setGeneration(""); }, options: explorer.models },
    { ...fields[1], value: engineCode, onChange: (v) => { setEngineCode(v); setFuel(""); setGeneration(""); }, options: engineOptions },
    { ...fields[2], value: fuel, onChange: (v) => { setFuel(v); setGeneration(""); }, options: fuelOptions },
    { ...fields[3], value: generation, onChange: setGeneration, options: generationOptions },
    { ...fields[4], value: issue, onChange: setIssue, options: explorer.knownIssues, placeholder: "Select a known issue" },
  ];

  if (mobile) {
    return (
      <>
        <div className="space-y-1.5">
          {selects.map((s) => (
            <Select key={s.label} {...s} mobile />
          ))}
        </div>
        <button
          type="button"
          onClick={handleFindEngine}
          className="btn-text mt-5 w-full rounded-md border-2 border-hero-blue py-3 uppercase text-hero-blue transition-colors hover:border-[#607056] hover:bg-[#607056] hover:text-white"
        >
          {ctaButton} →
        </button>
      </>
    );
  }

  return (
    <>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {selects.map((s) => (
          <Select key={s.label} {...s} />
        ))}
      </div>
      <button
        type="button"
        onClick={handleFindEngine}
        className="btn-text mt-4 w-full rounded-md border-2 border-hero-blue py-3 uppercase text-hero-blue transition-colors hover:border-[#607056] hover:bg-[#607056] hover:text-white sm:w-auto sm:px-8"
      >
        {ctaButton} →
      </button>
    </>
  );
}
