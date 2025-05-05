'use client';

import { useState, useRef, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import HeroSection from '@/components/sections/HeroSection';
import ContactSection from '@/components/sections/ContactSection';
import CTASection from '@/components/sections/CTASection';
import { products, productCategories, type Product } from '@/data/products';
import { FaSearch, FaStar, FaTimes, FaSpinner } from 'react-icons/fa';
import { FaTag, FaFire, FaLeaf } from 'react-icons/fa6';
import Image from 'next/image';

export default function KatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const productsPerPage = 9;
  const productsRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesBadges = selectedBadges.length === 0 || 
      (selectedBadges.includes('new') && product.isNew) ||
      (selectedBadges.includes('sale') && product.isOnSale) ||
      (selectedBadges.includes('limited') && product.isLimited);
    return matchesSearch && matchesCategory && matchesBadges;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories]);

  // Reset filtering state after a delay
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFiltering]);

  const scrollToProducts = () => {
    const navbarHeight = 80;
    const productsTop = productsRef.current?.offsetTop || 0;
    const scrollPosition = productsTop - navbarHeight - 30;

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth' as ScrollBehavior
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      setIsScrolling(true);
      setCurrentPage(newPage);
      
      // Use requestAnimationFrame to ensure DOM is updated before scrolling
      requestAnimationFrame(() => {
        scrollToProducts();
        setTimeout(() => {
          setIsScrolling(false);
        }, 500);
      });
    }
  };

  const toggleCategory = (category: string) => {
    setIsFiltering(true);
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );

    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(scrollToProducts);
  };

  const toggleBadge = (badge: string) => {
    setIsFiltering(true);
    setSelectedBadges(prev => 
      prev.includes(badge)
        ? prev.filter(b => b !== badge)
        : [...prev, badge]
    );

    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(scrollToProducts);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFiltering(true);
    setSearchTerm(e.target.value);

    // Use requestAnimationFrame to ensure DOM is updated before scrolling
    requestAnimationFrame(scrollToProducts);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <main>
      <HeroSection
        title="Katalog proizvoda"
        description="Otkrijte našu široku ponudu proizvoda za njegu lica i tijela"
        image="/images/services/katalog-hero.webp"
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

              {/* Badges Filter */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oznake
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBadges.includes('new')}
                      onChange={() => toggleBadge('new')}
                      className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <FaLeaf className="w-3 h-3 text-green-500" />
                      Novo
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBadges.includes('sale')}
                      onChange={() => toggleBadge('sale')}
                      className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <FaTag className="w-3 h-3 text-red-500" />
                      Akcija
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBadges.includes('limited')}
                      onChange={() => toggleBadge('limited')}
                      className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 flex items-center gap-1">
                      <FaFire className="w-3 h-3 text-purple-500" />
                      Limitirano
                    </span>
                  </label>
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
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${isScrolling || isFiltering ? 'opacity-25' : 'opacity-100'}`}>
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className={`
                    bg-white rounded-lg shadow-md overflow-hidden border
                    ${product.isPopular ? 'border-indigo-500' : 'border-gray-200'}
                    hover:shadow-lg transition-all duration-300
                    flex flex-col h-full cursor-pointer relative
                  `}
                  onClick={() => openProductModal(product)}
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-2"
                      loading="lazy"
                    />
                    {/* Product Badges */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <FaLeaf className="w-3 h-3" />
                          Novo
                        </span>
                      )}
                      {product.isOnSale && product.oldPrice && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <FaTag className="w-3 h-3" />
                          Akcija
                        </span>
                      )}
                      {product.isLimited && (
                        <span className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                          <FaFire className="w-3 h-3" />
                          Limitirano
                        </span>
                      )}
                    </div>
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
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col h-12 justify-center">
                          {product.isOnSale && product.oldPrice ? (
                            <>
                              <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
                              <span className="text-xl font-bold text-red-500">{product.price}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-gray-900">{product.price}</span>
                          )}
                        </div>
                        {product.isOnSale && product.oldPrice && (
                          <span className="bg-red-500 text-white text-xs font-bold w-10 h-10 rounded-full shadow-lg transform -rotate-12 flex items-center justify-center">
                            -{Math.round((1 - parseFloat(product.price) / parseFloat(product.oldPrice)) * 100)}%
                          </span>
                        )}
                      </div>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => {
                    handlePageChange(Math.max(currentPage - 1, 1));
                  }}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Prethodna
                </button>
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        handlePageChange(page);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                        currentPage === page
                          ? 'bg-indigo-600 text-white border-b-2 border-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:border-b-2 hover:border-gray-600'
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    handlePageChange(Math.min(currentPage + 1, totalPages));
                  }}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Sljedeća
                </button>
              </div>
            )}

            {currentProducts.length === 0 && (
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
                          {/* Product Badges in Modal */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2">
                            {selectedProduct?.isNew && (
                              <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                <FaLeaf className="w-4 h-4" />
                                Novo
                              </span>
                            )}
                            {selectedProduct?.isOnSale && selectedProduct?.oldPrice && (
                              <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                <FaTag className="w-4 h-4" />
                                Akcija
                              </span>
                            )}
                            {selectedProduct?.isLimited && (
                              <span className="bg-purple-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                                <FaFire className="w-4 h-4" />
                                Limitirano
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-xl p-3">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              {selectedProduct?.isOnSale && selectedProduct?.oldPrice ? (
                                <>
                                  <span className="text-sm text-gray-500 line-through">{selectedProduct.oldPrice}</span>
                                  <span className="text-xl font-bold text-red-500">{selectedProduct.price}</span>
                                </>
                              ) : (
                                <span className="text-xl font-bold text-gray-900">{selectedProduct?.price}</span>
                              )}
                            </div>
                            {selectedProduct?.isOnSale && selectedProduct?.oldPrice && (
                              <span className="bg-red-500 text-white text-sm font-bold w-12 h-12 rounded-full shadow-lg transform -rotate-12 flex items-center justify-center">
                                -{Math.round((1 - parseFloat(selectedProduct.price) / parseFloat(selectedProduct.oldPrice)) * 100)}%
                              </span>
                            )}
                          </div>
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