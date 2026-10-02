import { Geist, Geist_Mono, Roboto_Condensed, Inter, Audiowide } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import JsonLd from "@/components/shared/JsonLd";
import navbarData from "@/data/shared/navbar.json";
import footerData from "@/data/shared/footer.json";
import { businessGraph } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

// re-exported so existing imports from "@/app/layout" keep working
export { SITE_URL };

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Per the final typography spec: Roboto Condensed for all headings
// (H1-H4, weights 700-900, italic on H1/H2), Inter for body/labels/buttons.
// Replaces the earlier Barlow-based system site-wide.
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// AMG wordmark badge (engine-family pages) uses Audiowide, upright only.
const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Land Rover Engine Rebuild Specialists | Land Rover Garage",
  description:
    "Land Rover engine rebuild specialists. Td5, 300Tdi, Ingenium, V6 & V8 across Defender, Discovery and Range Rover. Fixed-price quotes from £1,900, 12-month unlimited-mileage warranty.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} ${inter.variable} ${audiowide.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={businessGraph()} />
        <Navbar data={navbarData} />
        <main className="flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
