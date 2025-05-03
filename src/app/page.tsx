import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const popularTreatments = [
    {
      title: 'PRP',
      description: 'Prirodna obnova i revitalizacija kože',
      image: '/images/services/TKNHA3_.webp',
      link: '/usluge/prp',
    },
    {
      title: 'SKIN BOOSTERI',
      description: 'Dubinska hidratacija i revitalizacija kože',
      image: '/images/products/skin-architect-linija.webp',
      link: '/usluge/skin-boosteri',
    },
    {
      title: 'MEZOTERAPIJA',
      description: 'Dubinska njega za vašu kožu',
      image: '/images/services/Mesoterapia-transdermica-facial.webp',
      link: '/usluge/mezoterapija',
    },
    {
      title: 'PLASMAGE',
      description: 'Revolucionarna tehnologija za podmlađivanje kože',
      image: '/images/plasmage-hero.webp',
      link: '/usluge/plasmage',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/services/toskani-hero.webp"
              alt="VISAGE Studio"
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            VISAGE studio
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI
          </p>
          <Link
            href="/kontakt"
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Zakažite termin
          </Link>
        </div>
      </section>

      {/* Popular Treatments Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popularni tretmani</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularTreatments.map((treatment) => (
              <Link
                key={treatment.title}
                href={treatment.link}
                className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{treatment.title}</h3>
                  <p className="text-gray-600">{treatment.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/usluge"
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Pogledajte sve tretmane
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
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
                src="/images/services/toskani-woman.webp"
                alt="VISAGE Studio"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
