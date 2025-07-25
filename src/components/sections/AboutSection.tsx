import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="pt-20" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">O nama</h2>
            <p className="text-lg text-gray-600 mb-4">
              VISAGE Studio je estetski studio u centru Siska specijaliziran za nekirurške estetske tretmane.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Kod nas možete, po prvi put u Sisku, obavljati neke od najpopularnijih neinvazivnih tretmana: mezoterapiju Mesoject Gunom i Dermpenom 4 te bleferoplazmu Plasmage uređajem.
            </p>
            <Link
              href="/o-nama"
              className="inline-flex items-center px-8 py-4 border border-slate-600 text-base font-medium rounded-xl shadow-lg text-white bg-slate-800 hover:bg-slate-700 transition-all duration-300 hover:shadow-xl"
            >
              Saznajte više
            </Link>
          </div>
          <div className="relative h-96">
            <Image
              src="/images/services/toskani-hero-visage-estetski-studio.webp"
              alt="VISAGE Studio"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 