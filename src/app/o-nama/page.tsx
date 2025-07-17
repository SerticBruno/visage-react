import HeroSection from '@/components/sections/HeroSection';
import AboutContent from '@/components/sections/AboutContent';
import ContactSection from '@/components/sections/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "O nama",
  description: "Upoznajte VISAGE Studio - vodeći estetski studio u Siska. Naš tim stručnjaka pruža najkvalitetnije usluge estetske medicine i kozmetičke tretmane.",
  openGraph: {
    title: "O nama",
    description: "Upoznajte VISAGE Studio - vodeći estetski studio u Siska. Naš tim stručnjaka pruža najkvalitetnije usluge estetske medicine i kozmetičke tretmane.",
    images: [
      {
        url: "/images/services/Mesoterapia-transdermica-facial.webp",
        width: 1200,
        height: 630,
        alt: "VISAGE Studio - O nama"
      }
    ]
  }
};

export default function OnamaPage() {
  return (
    <main>
      <HeroSection
        title="O nama"
        description="Regenerirajte i pomladite svoju kožu s nama!"
        image="/images/services/Mesoterapia-transdermica-facial.webp"
      />
      <AboutContent />
      <ContactSection/>
    </main>
  );
} 