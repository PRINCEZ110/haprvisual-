import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F0E8",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://haprvisual.vercel.app"),
  title: "HAPR Visual — 3D Visualization & Motion Design Studio",
  description:
    "Hapr is a 3D visualization studio merging expertise and artistic vision. We create visualizations that tell stories, evoke emotions, and add value.",
  keywords: [
    "3D visualization",
    "3D rendering",
    "motion design",
    "interior rendering",
    "exterior rendering",
    "product rendering",
    "animation",
    "HAPR Visual",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "HAPR Visual — 3D Visualization & Motion Design Studio",
    description:
      "Your vision, our renders. High-end 3D visualization for architecture, product design, and interior design.",
    type: "website",
    url: "https://haprvisual.vercel.app",
    siteName: "HAPR Visual",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}