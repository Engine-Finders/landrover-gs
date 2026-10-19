"use client";

import { Children, useState } from "react";

/* A grid that shows only the first `limit` items until "View More" is pressed.
   `limitLg` (optional) is the limit from the lg breakpoint up, for grids whose
   column count changes (limit = two rows at md, limitLg = two rows at lg).
   Every item stays in the DOM, so nothing is lost for crawlers. */
export default function ExpandGrid({
  children,
  className = "",
  style,
  limit,
  limitLg = limit,
  label = "View More",
  lessLabel = "View Less",
  wrapClass = "mt-6 flex justify-center",
  buttonClass = "",
}) {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);
  const n = items.length;
  const hidden = (i) => {
    if (open) return "contents";
    if (i < limit && i < limitLg) return "contents";
    if (i < limit) return "contents lg:hidden";
    if (i < limitLg) return "hidden lg:contents";
    return "hidden";
  };
  const btnVis = n > Math.max(limit, limitLg) ? "" : n > Math.min(limit, limitLg) ? (limitLg > limit ? "lg:hidden" : "hidden lg:flex") : "hidden";

  return (
    <>
      <div className={className} style={style}>
        {items.map((it, i) => (
          <div key={it.key ?? i} className={hidden(i)}>
            {it}
          </div>
        ))}
      </div>
      {n > Math.min(limit, limitLg) ? (
        <div className={`${wrapClass} ${open ? "" : btnVis}`}>
          <button type="button" aria-expanded={open} onClick={() => setOpen((v) => !v)} className={buttonClass}>
            {open ? lessLabel : label} <span aria-hidden>{open ? "↑" : "→"}</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
