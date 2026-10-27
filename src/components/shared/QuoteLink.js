"use client";

import { useQuoteModal } from "@/components/shared/QuoteModal";

// A CTA that opens the shared quote popup instead of jumping down the page. The href stays as the
// no-JS / open-in-new-tab fallback; only in-page quote anchors (#quote...) are intercepted.
export default function QuoteLink({ href = "#quote-form", onClick, children, ...rest }) {
  const { open } = useQuoteModal();
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (typeof href === "string" && href.startsWith("#quote")) {
          e.preventDefault();
          open();
        }
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
