import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import "./globals.css";

import SmoothScroll from "@/components/providers/SmoothScroll";
import SiteShell from "@/components/layout/SiteShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Geist({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TrustWork",
  description: "Verify Before You Apply",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}
          ${geistMono.variable}
          ${instrumentSerif.variable}
          antialiased
        `}
      >
        {""}
        <SmoothScroll>
          {""}
          <SiteShell>{children} </SiteShell>{" "}
        </SmoothScroll>{""}
      </body>{""}
    </html>
  );
}
