import Image from 'next/image';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">O nama</h2>
            <p className="text-gray-600 mb-4">
              VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI.
            </p>
            <p className="text-gray-600 mb-4">
              Kod nas možete, po prvi put u Sisku, obavljati jedne od najpopularnijih neinvazivnih tretmana:
              Plasmage i Mesoject Gun mezoterapija koja je dobila Gracia Award za BEST OF BEAUTY 2023.g.
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