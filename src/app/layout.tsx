import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ScrollMotion } from "@/components/shared/scroll-motion";
import { siteConfig } from "@/config/site";
import { InquiryProvider } from "@/modules/inquiry/components/inquiry-provider";
import "./globals.css";
import "@/components/shared/site.css";
import "@/modules/catalog/styles/catalog.css";
import "@/modules/catalog/styles/scroll-morph.css";
import "@/modules/landing/styles/process.css";
import "@/modules/about/styles/about.css";
import "@/modules/inquiry/styles/inquiry.css";
import "@/modules/landing/styles/hero.css";
import "@/styles/motion.css";

export const metadata: Metadata = {
  title: "ALLEGRO — Sewa Perlengkapan Outdoor",
  description: siteConfig.description,
  robots: { index: false, follow: false }, // Prototype prices/claims are not yet verified.
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="id"><body><InquiryProvider>{children}</InquiryProvider><ScrollMotion /></body></html>;
}
