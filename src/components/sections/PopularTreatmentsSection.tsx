import Image from 'next/image';
import Link from 'next/link';

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

const PopularTreatmentsSection = () => {
  return (
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
  );
};

export default PopularTreatmentsSection; 