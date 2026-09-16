import { Suspense } from "react";
import GetQuoteClient from "./GetQuoteClient";

export const metadata = {
  title: "Get Your Land Rover Engine Quote | Land Rover Garage",
  description: "Get a fast, no-obligation Land Rover engine rebuild quote. Compare prices from trusted Land Rover specialists.",
  robots: { index: false, follow: false },
};

export default function GetQuotePage() {
  return (
    <Suspense fallback={null}>
      <GetQuoteClient />
    </Suspense>
  );
}
