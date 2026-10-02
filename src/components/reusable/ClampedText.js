"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/reusable/Icon";

// Body copy clamped to `lines` lines with an ellipsis. A "Read more" chevron toggle appears
// only when the text actually overflows, and expands it in place.
export default function ClampedText({ children, lines = 4, className = "", toggleClassName = "" }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (!expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  return (
    <div>
      <p
        ref={ref}
        className={className}
        style={
          expanded
            ? undefined
            : { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: lines, overflow: "hidden" }
        }
      >
        {children}
      </p>
      {(overflows || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`mt-1 inline-flex items-center gap-1 text-xs font-bold text-hero-blue ${toggleClassName}`}
        >
          {expanded ? "Show less" : "Read more"}
          <Icon name="chevron-down" className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}
