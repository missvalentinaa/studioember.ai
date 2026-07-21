import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "./globals.css";

const generalSans = localFont({
  variable: "--font-general-sans",
  display: "swap",
  src: [
    { path: "./fonts/GeneralSans-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studioember.ai"),
  title: "Ember Studio — Premium web & AI agents for startups",
  description:
    "A web & AI studio for startups. We design premium websites and build AI agents that handle real work. Built with taste. Shipped at speed.",
  keywords: [
    "web studio",
    "AI agents",
    "startup website",
    "premium web design",
    "brand",
    "product design",
  ],
  openGraph: {
    title: "Ember Studio — Premium web & AI agents for startups",
    description:
      "We make early startups look funded — and ship the web and AI agents they don't have time to build.",
    url: "https://studioember.ai",
    siteName: "Ember Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ember Studio — Premium web & AI agents for startups",
    description:
      "Premium websites and AI agents for startups. Built with taste. Shipped at speed.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf9f6",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={generalSans.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <MotionProvider>
          <CursorGlow />
          <div className="grain" aria-hidden="true" />
          {children}
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
