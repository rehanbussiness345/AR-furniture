import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Instrument_Serif, Outfit } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StoreProvider } from "@/providers/StoreProvider";
import { getCatalogList } from "@/lib/queries";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AR Furniture — Luxury Beds & Sofas Online",
    template: "%s | AR Furniture",
  },
  description:
    "AR Furniture crafts premium beds and sofas that work better and last longer. King beds, storage beds, L-shaped sofas, designer sofas — delivered free across India with a 5-year warranty.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const catalog = await getCatalogList();
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${instrument.variable}`}>
      <body className="font-sans text-ink antialiased">
        <StoreProvider catalogList={catalog}>
          <Header />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
