"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";

const GOLD = "#d4a54c";

function Chevron({ className = "h-3.5 w-3.5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.6-3.6" />
    </svg>
  );
}

function Arrow({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

// Round outlined icon button used for search / menu on mobile.
const roundBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a54c]/40 bg-white/[0.03] text-white transition-colors hover:border-[#d4a54c]/80 sm:h-12 sm:w-12";

export default function Navbar({ data }) {
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const mobileLinks = [...data.links, ...(data.mobileExtraLinks ?? [])];

  // every destination in the menu, de-duplicated, for the search panel
  const allLinks = useMemo(() => {
    const seen = new Map();
    for (const l of mobileLinks) {
      for (const x of [l, ...(l.children ?? [])]) if (!seen.has(x.href)) seen.set(x.href, x);
    }
    return [...seen.values()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const results = query.trim()
    ? allLinks.filter((l) => l.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 12)
    : [];

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#0a0f0d] text-white">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between gap-4 px-4 py-3 sm:px-6 xl:px-6 xl:py-4 2xl:px-6">
        {/* brand */}
        <Link href="/" onClick={closeAll} className="flex min-w-0 items-center gap-2.5 sm:gap-3 xl:shrink-0 xl:gap-4" aria-label="Land Rover & Range Rover Ownership Guide - home">
          <LandRoverLogo crop className="h-[40px] w-[72px] shrink-0 sm:h-[48px] sm:w-[86px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] xl:h-[48px] xl:w-[86px]" />
          {/* mobile / tablet wording */}
          <span className="min-w-0 uppercase leading-tight xl:hidden">
            <span className="block truncate text-[15px] font-medium tracking-[0.02em] text-white sm:text-[18px]">{data.mobileLine1}</span>
            <span className="block truncate text-[11px] tracking-[0.04em] text-white/75 sm:text-[13px]">{data.mobileLine2}</span>
          </span>
          {/* desktop wording */}
          <span className="hidden uppercase leading-[1.35] xl:block">
            <span className="block whitespace-nowrap text-[14px] font-medium tracking-[0.01em] text-white">{data.brandLine1}</span>
            <span className="block whitespace-nowrap text-[14px] font-medium tracking-[0.03em]" style={{ color: GOLD }}>
              {data.brandLine2}
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-4 text-[12px] font-medium uppercase xl:flex 2xl:gap-5">
          {data.links.map((link) => (
            <div key={link.label} className="group relative">
              <Link href={link.href} className="flex items-center gap-1 whitespace-nowrap py-2 text-white/90 transition-colors hover:text-[#d4a54c]">
                {link.label}
                {link.children?.length ? <Chevron /> : null}
              </Link>
              {link.children?.length ? (
                <div className="invisible absolute left-0 top-full z-50 min-w-[240px] translate-y-1 rounded-lg border border-white/10 bg-[#0d1513]/98 p-2 opacity-0 shadow-xl backdrop-blur transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="menu-scroll max-h-[70vh] overflow-y-auto">
                    {link.children.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        className="block rounded px-3 py-2 text-[13px] font-medium normal-case tracking-normal text-white/80 transition-colors hover:bg-white/5 hover:text-[#d4a54c]"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3 xl:gap-4">
          {/* search: round button on mobile, bare icon on desktop */}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((v) => !v);
              setOpen(false);
            }}
            className={`${roundBtn} xl:h-auto xl:w-auto xl:rounded-none xl:border-0 xl:bg-transparent xl:hover:text-[#d4a54c]`}
            aria-label="Search the guide"
            aria-expanded={searchOpen}
          >
            <SearchIcon className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
          </button>

          {data.cta ? (
            <Link
              href={data.cta.href}
              className="hidden items-center gap-2 whitespace-nowrap rounded-md border border-[#2f6b4c] bg-[#0f2a1e]/70 px-3.5 py-3 text-[11.5px] font-semibold uppercase text-white transition-colors hover:bg-[#15392a] 2xl:inline-flex"
            >
              {data.cta.label}
              <Arrow />
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setSearchOpen(false);
            }}
            className={`${roundBtn} xl:hidden`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <span className="flex flex-col gap-[4px]">
                <span className="block h-[2px] w-[18px] rounded bg-white" />
                <span className="block h-[2px] w-[18px] rounded bg-white" />
                <span className="block h-[2px] w-[18px] rounded bg-white" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* search panel */}
      {searchOpen ? (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0a0f0d]/98 shadow-2xl backdrop-blur">
          <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/[0.04] px-4">
              <SearchIcon className="h-5 w-5 shrink-0 text-white/60" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search models, engines, guides…"
                className="h-12 w-full bg-transparent text-[16px] text-white placeholder:text-white/45 focus:outline-none"
              />
            </div>
            {results.length ? (
              <ul className="menu-scroll mt-2 max-h-[60vh] overflow-y-auto">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} onClick={closeAll} className="block rounded px-3 py-2.5 text-[15px] text-white/85 hover:bg-white/5 hover:text-[#d4a54c]">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query.trim() ? (
              <p className="px-3 pt-3 text-sm text-white/55">No matches - try a model or engine code, e.g. &ldquo;TDV6&rdquo;.</p>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* mobile nav */}
      {open ? (
        <nav className="absolute inset-x-0 top-full flex max-h-[calc(100dvh-80px)] flex-col overflow-y-auto border-b border-white/10 bg-[#0a0f0d]/98 px-4 pb-5 text-[14px] font-medium uppercase tracking-[0.04em] shadow-2xl backdrop-blur sm:px-6 xl:hidden">
          {mobileLinks.map((link) => (
            <div key={link.label} className="border-b border-white/[0.07]">
              <div className="flex items-center justify-between">
                <Link href={link.href} onClick={closeAll} className="flex-1 py-3.5">
                  {link.label}
                </Link>
                {link.children?.length ? (
                  <button
                    type="button"
                    onClick={() => setMobileSub((s) => (s === link.label ? null : link.label))}
                    className="p-3"
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <Chevron className={`h-4 w-4 transition-transform ${mobileSub === link.label ? "rotate-180" : ""}`} />
                  </button>
                ) : null}
              </div>
              {link.children?.length && mobileSub === link.label ? (
                <div className="menu-scroll max-h-[50vh] overflow-y-auto pb-2 pl-3">
                  {link.children.map((c) => (
                    <Link
                      key={c.href + c.label}
                      href={c.href}
                      onClick={closeAll}
                      className="block py-2 text-[13px] font-normal normal-case tracking-normal text-white/75"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {data.cta ? (
            <Link
              href={data.cta.href}
              onClick={closeAll}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#5fd19a]/40 bg-linear-to-b from-[#1f7a52] to-[#0e4730] py-3.5 text-[14px] font-semibold uppercase tracking-[0.06em] text-white"
            >
              {data.cta.label}
              <Arrow />
            </Link>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
