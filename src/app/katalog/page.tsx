'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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

  // Handle modal open/close with scrollbar width
  useEffect(() => {
    if (isModalOpen) {
      // Get the scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      // Store the original padding-right
      const originalPaddingRight = document.body.style.paddingRight;
      // Store the original overflow
      const originalOverflow = document.body.style.overflow;
      
      // Apply the styles
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        document.body.style.paddingRight = originalPaddingRight;
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

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
                    flex flex-col h-full cursor-pointer
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
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                      {product.isPopular && (
                        <span className="flex items-center text-indigo-600">
                          <FaStar className="mr-1" />
                          Popularno
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="text-xl font-bold text-gray-900">{product.price}</div>
                      <button 
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(product);
                        }}
                      >
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
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50"
            onClose={() => setIsModalOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-blur-sm bg-white/30" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-4 shadow-2xl transition-all border border-gray-100">
                    <div className="flex justify-between items-start mb-3 pb-3 border-b border-gray-100">
                      <Dialog.Title as="h2" className="text-xl font-bold text-gray-900">
                        {selectedProduct?.title}
                      </Dialog.Title>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                      >
                        <FaTimes size={20} />
                      </button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-2/5">
                        <div className="relative h-64 md:h-96 bg-gray-50 rounded-xl overflow-hidden shadow-sm">
                          <Image
                            src={selectedProduct?.image || ''}
                            alt={selectedProduct?.title || ''}
                            fill
                            className="object-contain p-6"
                          />
                        </div>
                        <div className="mt-3 flex items-center justify-center bg-gray-50 rounded-xl p-3">
                          <div className="text-xl font-bold text-gray-900">{selectedProduct?.price}</div>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-3/5 space-y-3">
                        <div className="bg-gray-50 rounded-xl p-3">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">Opis</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{selectedProduct?.description}</p>
                        </div>

                        {selectedProduct?.volume && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Sadržaj</h3>
                            <p className="text-sm text-gray-600">{selectedProduct.volume}</p>
                          </div>
                        )}

                        {selectedProduct?.activeIngredients && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Aktivni sastojci</h3>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                              {selectedProduct.activeIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedProduct?.application && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Primjena</h3>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                              {selectedProduct.application.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedProduct?.tags && (
                          <div className="bg-gray-50 rounded-xl p-3">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Oznake</h3>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedProduct.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-0.5 bg-white text-gray-600 rounded-full text-xs font-medium shadow-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
      <CTASection />
      <ContactSection />
    </main>
  );
} 