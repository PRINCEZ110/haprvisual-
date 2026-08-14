import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "HAPR Visual — Premium 3D Visualization & Motion Design Studio",
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
  openGraph: {
    title: "HAPR Visual — Premium 3D Visualization & Motion Design Studio",
    description:
      "Your vision, our renders. High-end 3D visualization for architecture, product design, and interior design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}