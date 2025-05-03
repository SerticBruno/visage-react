'use client';

import { useState, useRef, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { products, productCategories, type Product } from '@/data/products';
import { FaSearch, FaStar, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function KatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products);
  const productsRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setIsFiltering(true);
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (isFiltering) {
      // Calculate the scroll position accounting for the navbar
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const productsTop = productsRef.current?.offsetTop || 0;
      const scrollPosition = productsTop - navbarHeight;

      // First scroll to top
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });

      // Then update the displayed products after a short delay
      setTimeout(() => {
        setDisplayedProducts(filteredProducts);
        setIsFiltering(false);
      }, 300);
    }
  }, [isFiltering, filteredProducts, searchTerm, selectedCategories]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <main>
      <HeroSection
        title="Katalog proizvoda"
        description="Otkrijte našu široku ponudu proizvoda za njegu lica i tijela"
        image="/images/services/toskani-hero.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Naši proizvodi
          </h2>
          <p className="text-xl text-gray-600">
            Visokokvalitetni proizvodi za njegu lica i tijela
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar with Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtriraj proizvode</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Pretraži proizvode
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Naziv ili opis..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategorije
                </label>
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <label key={category} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Pronađeno proizvoda: <span className="font-semibold">{filteredProducts.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1" ref={productsRef}>
            {isFiltering && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
                <div className="animate-pulse text-gray-600">Filtriranje proizvoda...</div>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`
                    bg-white rounded-lg shadow-md overflow-hidden border
                    ${product.isPopular ? 'border-indigo-500' : 'border-gray-200'}
                    hover:shadow-lg transition-all duration-300
                    ${isFiltering ? 'opacity-50' : 'opacity-100'}
                  `}
                  onClick={() => openProductModal(product)}
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                      {product.isPopular && (
                        <span className="flex items-center text-indigo-600">
                          <FaStar className="mr-1" />
                          Popularno
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-gray-900">{product.price}</div>
                      <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                        Detalji
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {displayedProducts.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nema pronađenih proizvoda
                </h3>
                <p className="text-gray-600">
                  Pokušajte promijeniti kriterije pretraživanja
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Modal */}
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative h-64 md:h-96 bg-gray-100">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.title}
                      fill
                      className="object-contain p-4 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Opis</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    {selectedProduct.volume && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sadržaj</h3>
                        <p className="text-gray-600">{selectedProduct.volume}</p>
                      </div>
                    )}

                    {selectedProduct.activeIngredients && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aktivni sastojci</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {selectedProduct.activeIngredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProduct.application && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Primjena</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {selectedProduct.application.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProduct.tags && (
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Oznake</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-6">
                      <div className="text-2xl font-bold text-gray-900">{selectedProduct.price}</div>
                      <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Naruči
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <CTASection />
      <ContactSection />
    </main>
  );
} 