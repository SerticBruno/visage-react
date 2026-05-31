import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleTagManager from "@/components/GoogleTagManager";
import { Analytics } from '@vercel/analytics/react';
import CookieConsent from "@/components/CookieConsent";
import { LocalBusinessStructuredData } from "@/components/StructuredData";
import { businessData } from "@/data/business";

const inter = Inter({ subsets: ["latin"] });

const versailles = localFont({
  src: '../../public/fonts/Versailles.ttf',
  variable: '--font-versailles',
});

const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL('https://visagestudio.hr'),
  alternates: {
    canonical: 'https://visagestudio.hr',
  },
  title: {
    default: "VISAGE Studio Sisak - Estetski & Kozmetički Tretmani",
    template: "%s | VISAGE Studio"
  },
  description: "VISAGE Studio - certificirani estetski studio u Sisku. Mezoterapija, PRP, Dermapen 4, fileri i beauty tretmani. Rezervirajte termin - dostupno i iz Zagreba.",
  keywords: [
    "estetski studio",
    "Sisak",
    "Zagreb",
    "TOSKANI",
    "kozmetički tretmani",
    "estetska medicina",
    "VISAGE studio",
    "estetski tretmani Zagreb",
    "mezoterapija Sisak",
    "mezoterapija Zagreb",
    "Dermapen Sisak",
    "PRP Sisak",
    "skin boosteri Sisak",
  ],
  authors: [{ name: "VISAGE Studio" }],
  creator: "VISAGE Studio",
  publisher: "VISAGE Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/images/products/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/products/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/products/favicon_io/favicon.ico', sizes: 'any' },
    ],
    apple: '/images/products/favicon_io/apple-touch-icon.png',
  },
  manifest: '/images/products/favicon_io/site.webmanifest',
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: "https://visagestudio.hr",
    siteName: "VISAGE Studio",
    title: "VISAGE Studio Sisak - Estetski & Kozmetički Tretmani",
    description: "VISAGE Studio - certificirani estetski studio u Sisku. Mezoterapija, PRP, Dermapen 4, fileri i beauty tretmani. Dostupno i iz Zagreba.",
    images: [
      {
        url: "/images/services/toskani-woman-visage-estetski-studio.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Estetski studio Sisak"
      }
    ],
    countryName: "Croatia",
    emails: ["info@visagestudio.hr"],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visage.estheticstudio',
    creator: '@visage.estheticstudio',
    title: 'VISAGE Studio Sisak - Estetski & Kozmetički Tretmani',
    description: 'Certificirani estetski studio u Sisku. Mezoterapija, PRP, Dermapen 4, fileri. Rezervirajte termin!',
    images: ['/images/services/toskani-woman-visage-estetski-studio.webp'],
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
  ...(googleSiteVerification
    ? {
        verification: { google: googleSiteVerification },
        other: { 'google-site-verification': googleSiteVerification },
      }
    : {}),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={`${inter.className} ${versailles.variable}`}>
        <LocalBusinessStructuredData data={businessData} />
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
