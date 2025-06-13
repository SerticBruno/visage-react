import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="pt-16" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">O nama</h2>
            <p className="text-gray-600 mb-4">
              VISAGE Studio je estetski studio u centru Siska specijaliziran za nekirurške estetske tretmane.
            </p>
            <p className="text-gray-600 mb-4">
              Kod nas možete, po prvi put u Sisku, obavljati neke od najpopularnijih neinvazivnih tretmana: mezoterapiju Mesoject Gunom i Dermpenom 4 te bleferoplazmu Plasmage uređajem.
            </p>
            <Link
              href="/o-nama"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Saznajte više
            </Link>
          </div>
          <div className="relative h-96">
            <Image
              src="/images/services/toskani-hero.webp"
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