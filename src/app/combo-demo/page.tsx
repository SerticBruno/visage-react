import ComboPackagesSectionPreview from '@/components/sections/ComboPackagesSectionPreview';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Combo Paketi Demo - VISAGE Studio",
  description: "Pogledajte naše premium combo pakete koji kombiniraju najbolje tretmane za optimalne rezultate",
};

export default function ComboDemoPage() {
  return (
    <main>
      <div className="pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Combo Paketi Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ova stranica demonstrira kako koristiti novi ComboPackagesSectionPreview komponent.
          </p>
        </div>
      </div>
      
      <ComboPackagesSectionPreview />
    </main>
  );
} 