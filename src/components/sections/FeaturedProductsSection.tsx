import Image from 'next/image';
import Link from 'next/link';

const FeaturedProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'TOSKANI Proizvodi',
      description: 'Profesionalna kozmetika za ljepotu i njegu kože',
      image: '/images/products/toskani-products.webp',
      href: '/proizvodi/toskani'
    },
    {
      id: 2,
      name: 'Skin Architect Linija',
      description: 'Napredna njega kože za mladolik izgled',
      image: '/images/products/skin-architect-linija.webp',
      href: '/proizvodi/skin-architect'
    },
    {
      id: 3,
      name: 'Almond Oil 12',
      description: 'Prirodna njega za vašu kožu',
      image: '/images/products/Almond-Oil-12.webp',
      href: '/proizvodi/almond-oil'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Istaknuti Proizvodi
          </h2>
          <p className="text-xl text-gray-600">
            Otkrijte našu kolekciju premium kozmetičkih proizvoda
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection; 