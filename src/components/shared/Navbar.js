"use client";

import { useState } from "react";
import Link from "next/link";
import LandRoverLogo from "@/components/reusable/LandRoverLogo";
import Icon from "@/components/reusable/Icon";

export default function Navbar({ data }) {
  const [open, setOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const brandWords = data.brand.split(" ");
  const brandLead = brandWords.slice(0, -1).join(" ");
  const brandLast = brandWords[brandWords.length - 1];

  return (
    <header className="theme-dark relative z-50 bg-black text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <LandRoverLogo className="h-14 w-14 shrink-0 text-white" />
          <span>
            <span className="font-title block text-xl font-extrabold italic leading-none tracking-tight text-white sm:text-2xl">
              {brandLead} <span className="text-[var(--color-hero-blue)]">{brandLast}</span>
            </span>
            <span className="mt-1 block text-[11px] font-semibold leading-none tracking-[0.12em] text-white/80 sm:text-xs">
              {data.tagline}
            </span>
          </span>
        </Link>

        {/* desktop nav */}
        <nav className="hidden items-center gap-5 text-sm font-bold uppercase tracking-wide md:flex lg:gap-6">
          {data.links.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className="flex items-center gap-1 py-2 transition-colors hover:text-[var(--color-hero-blue)]"
              >
                {link.label}
                {link.children?.length ? <Icon name="chevron-down" className="h-3.5 w-3.5" /> : null}
              </Link>
              {link.children?.length ? (
                <div className="invisible absolute left-0 top-full z-50 min-w-[220px] translate-y-1 rounded-lg border border-white/10 bg-black/95 p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="menu-scroll max-h-[70vh] overflow-y-auto">
                    {link.children.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        className="block rounded px-3 py-2 text-xs font-semibold normal-case tracking-normal text-white/80 transition-colors hover:bg-white/10 hover:text-[var(--color-hero-blue)]"
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

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          {data.phone ? (
            <a
              href={data.phoneHref}
              className="hidden whitespace-nowrap text-sm font-bold text-[var(--color-hero-blue)] lg:inline"
            >
              {data.phone}
            </a>
          ) : null}
          {data.cta ? (
            <Link
              href={data.cta.href}
              className="whitespace-nowrap rounded-md bg-[var(--color-hero-blue)] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-[1.03]"
            >
              {data.cta.label}
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="mb-1.5 block h-0.5 w-6 bg-white" />
          <span className="mb-1.5 block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </div>

      {/* mobile nav */}
      {open ? (
        <nav className="flex flex-col border-t border-white/10 px-4 pb-4 text-sm font-bold uppercase tracking-wide md:hidden">
          {data.links.map((link) => (
            <div key={link.href} className="border-b border-white/5">
              <div className="flex items-center justify-between">
                <Link href={link.href} onClick={() => setOpen(false)} className="flex-1 py-3">
                  {link.label}
                </Link>
                {link.children?.length ? (
                  <button
                    type="button"
                    onClick={() => setMobileSub((s) => (s === link.label ? null : link.label))}
                    className="p-3"
                    aria-label={`Toggle ${link.label} submenu`}
                  >
                    <Icon
                      name="chevron-down"
                      className={`h-4 w-4 transition-transform ${mobileSub === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : null}
              </div>
              {link.children?.length && mobileSub === link.label ? (
                <div className="menu-scroll max-h-[50vh] overflow-y-auto pb-2 pl-3">
                  {link.children.map((c) => (
                    <Link
                      key={c.href + c.label}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-xs font-semibold normal-case tracking-normal text-white/75"
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
              onClick={() => setOpen(false)}
              className="mt-3 rounded-md bg-[var(--color-hero-blue)] px-4 py-2.5 text-center text-xs font-bold uppercase text-white"
            >
              {data.cta.label}
            </Link>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
