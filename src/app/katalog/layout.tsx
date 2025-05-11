import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Katalog proizvoda - VISAGE Studio",
  description: "Pregledajte naš katalog proizvoda za njegu kože. Visokokvalitetni proizvodi TOSKANI i drugih vodećih brendova za profesionalnu i kućnu njegu.",
  openGraph: {
    title: "Katalog proizvoda - VISAGE Studio",
    description: "Pregledajte naš katalog proizvoda za njegu kože. Visokokvalitetni proizvodi TOSKANI i drugih vodećih brendova za profesionalnu i kućnu njegu.",
    images: [
      {
        url: "/images/services/toskani-woman.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Katalog proizvoda"
      }
    ]
  }
};

export default function KatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 