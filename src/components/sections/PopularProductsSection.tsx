import Image from 'next/image';
import Link from 'next/link';

const popularProducts = [
  {
    title: 'ALMOND OIL',
    description: 'Prirodno bademovo ulje za negu kože i kose',
    image: '/images/products/Almond-Oil-12.webp',
    link: '/proizvodi/almond-oil',
    features: [
      '100% prirodno',
      'Bogato vitaminima',
      'Dubinsko hidrira',
      'Za sve tipove kože'
    ]
  },
  {
    title: 'ANTI HAIR LOSS',
    description: 'Serum protiv opadanja kose',
    image: '/images/products/anti-hair-loss-background.webp',
    link: '/proizvodi/anti-hair-loss',
    features: [
      'Jača folikule',
      'Sprečava opadanje',
      'Podstiče rast',
      'Prirodna formula'
    ]
  },
  {
    title: 'TOSKANI',
    description: 'Premium linija proizvoda za negu',
    image: '/images/products/toskani-products.webp',
    link: '/proizvodi/toskani',
    features: [
      'Italijanski brend',
      'Luksuzna formula',
      'Profesionalna linija',
      'Vrhunski rezultati'
    ]
  },
  {
    title: 'SKIN ARCHITECT',
    description: 'Profesionalna linija za negu kože',
    image: '/images/products/skin-architect-linija.webp',
    link: '/proizvodi/skin-architect',
    features: [
      'Napredna formula',
      'Dermatološki testirano',
      'Prirodni sastojci',
      'Dokazana efikasnost'
    ]
  },
];

const PopularProductsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Popularni proizvodi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map((product) => (
            <div 
              key={product.title}
              className="group relative bg-white rounded-xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center h-full relative z-10">
                <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4 text-center">
                  {product.title}
                </h3>
                <p className="text-slate-600 text-center mb-6">
                  {product.description}
                </p>
                <div className="w-full space-y-3 mb-6">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={product.link}
                  className="mt-auto inline-flex items-center text-sky-600 hover:text-sky-800 font-medium transition-colors duration-300 cursor-pointer relative z-20"
                >
                  Saznajte više
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-sky-200 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/proizvodi"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Pogledajte sve proizvode
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularProductsSection; 