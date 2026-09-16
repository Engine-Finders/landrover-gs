"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/reusable/Icon";

function Select({ label, icon, value, onChange, options, placeholder, disabled, mobile }) {
  const cls = mobile
    ? "flex items-center gap-2.5 rounded-xl border border-black/10 bg-white px-3 py-1.5 shadow-sm"
    : "";
  if (mobile) {
    return (
      <div className={cls}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-blue/10">
          <Icon name={icon} className="h-4 w-4 text-hero-blue" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="label-text uppercase tracking-wide text-[#1a1a1a]">{label}</p>
          <select
            className="w-full truncate bg-transparent text-sm text-[#1a1a1a] outline-none disabled:text-black/40"
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
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
      <div className="relative">
        <select
          className="w-full appearance-none rounded-md border border-black/10 bg-white px-3 py-2.5 pr-9 text-sm text-[#1a1a1a] disabled:bg-black/5 disabled:text-black/40"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#1a1a1a]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

export default function EngineExplorerForm({ fields, explorer, ctaButton, mobile }) {
  const router = useRouter();
  const [model, setModel] = useState("");
  const [engineCode, setEngineCode] = useState("");
  const [fuel, setFuel] = useState("");
  const [generation, setGeneration] = useState("");

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
    else router.push("/get-quote");
  }

  const selects = [
    { ...fields[0], value: model, onChange: (v) => { setModel(v); setEngineCode(""); setFuel(""); setGeneration(""); }, options: explorer.models },
    { ...fields[1], value: engineCode, onChange: (v) => { setEngineCode(v); setFuel(""); setGeneration(""); }, options: engineOptions },
    { ...fields[2], value: fuel, onChange: (v) => { setFuel(v); setGeneration(""); }, options: fuelOptions },
    { ...fields[3], value: generation, onChange: setGeneration, options: generationOptions },
    { ...fields[4], value: "", onChange: () => {}, options: [], disabled: true, placeholder: engineCode ? "Confirmed once we match your reg" : "Select an engine first" },
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
          className="btn-text mt-5 w-full rounded-md border-2 border-hero-blue bg-hero-blue py-3 uppercase text-white shadow-[0_0_20px_rgba(173,135,92,0.4)] transition-colors hover:bg-transparent hover:text-hero-blue"
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
        className="btn-text mt-4 w-full rounded-md border-2 border-hero-blue bg-hero-blue py-3 uppercase text-white shadow-[0_0_20px_rgba(173,135,92,0.4)] transition-colors hover:bg-transparent hover:text-hero-blue sm:w-auto sm:px-8"
      >
        {ctaButton} →
      </button>
    </>
  );
}
