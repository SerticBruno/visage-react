import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cjenik - VISAGE Studio",
  description: "Pregledajte cjenik naših usluga. Transparentne cijene za sve tretmane estetske medicine i kozmetičke usluge.",
  openGraph: {
    title: "Cjenik - VISAGE Studio",
    description: "Pregledajte cjenik naših usluga. Transparentne cijene za sve tretmane estetske medicine i kozmetičke usluge.",
    images: [
      {
        url: "/images/services/toskani-woman.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - Cjenik"
      }
    ]
  }
};

export default function CjenikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 