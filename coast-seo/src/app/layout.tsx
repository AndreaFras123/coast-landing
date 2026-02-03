import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coast - University Past Papers & AI Solutions",
  description:
    "Access past exam papers and AI-powered solutions for your university courses. Learn faster, retain longer, pass everything.",
  keywords: [
    "university past papers",
    "exam solutions",
    "study resources",
    "AI tutoring",
    "Maastricht University",
  ],
  authors: [{ name: "Coast" }],
  icons: {
    icon: "/Blackbird-base.svg",
  },
  openGraph: {
    title: "Coast - University Past Papers & AI Solutions",
    description: "Access past exam papers and AI-powered solutions",
    type: "website",
    siteName: "Coast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${nunitoSans.variable}`}>
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
