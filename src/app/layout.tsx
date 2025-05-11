import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://visage-studio.hr'),
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
    url: "https://visage-studio.hr",
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
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VISAGE Studio - Estetski studio Sisak",
    description: "VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI.",
    images: ["/images/services/toskani-woman.webp"]
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
