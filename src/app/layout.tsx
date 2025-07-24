import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import { Analytics } from '@vercel/analytics/react';
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

const versailles = localFont({
  src: '../../public/fonts/Versailles.ttf',
  variable: '--font-versailles',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://visagestudio.hr'),
  alternates: {
    canonical: 'https://visagestudio.hr',
  },
  title: {
    default: "VISAGE Studio - Estetski studio Sisak",
    template: "%s | VISAGE Studio"
  },
  description: "VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI. Pružamo profesionalne usluge estetske medicine i kozmetičke tretmane.",
  keywords: ["estetski studio", "Sisak", "TOSKANI", "kozmetički tretmani", "estetska medicina", "VISAGE studio"],
  authors: [{ name: "VISAGE Studio" }],
  creator: "VISAGE Studio",
  publisher: "VISAGE Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "https://visagestudio.hr",
    siteName: "VISAGE Studio",
    title: "VISAGE Studio - Estetski studio Sisak",
    description: "VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI.",
    images: [
      {
        url: "/images/services/toskani-woman.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Estetski studio Sisak"
      }
    ],
    countryName: "Croatia",
    emails: ["info@visagestudio.hr"], // Add your email if you have one
  },
  twitter: {
    card: "summary_large_image",
    title: "VISAGE Studio - Estetski studio Sisak",
    description: "VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI.",
    images: ["/images/services/toskani-woman.webp"],
    creator: "@visagestudio", // Add your Twitter handle if you have one
    site: "@visagestudio", // Add your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
  other: {
    'google-site-verification': 'your-google-site-verification', // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={`${inter.className} ${versailles.variable}`}>
        <GoogleTagManager />
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  );
}
