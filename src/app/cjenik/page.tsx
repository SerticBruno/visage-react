'use client';

import { useState, useMemo } from 'react';
import { pricingData, pricingCategories, PricingItem } from '@/data/pricing';
import { FaSearch, FaStar, FaBox, FaTh, FaList } from 'react-icons/fa';
import React from 'react';
import HeroSection from '@/components/sections/HeroSection';

type ViewMode = 'grid' | 'table';

export default function PricingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const filteredItems = useMemo(() => {
    return pricingData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const TableView = () => {
    const groupedItems = useMemo(() => {
      const groups: { [key: string]: PricingItem[] } = {};
      filteredItems.forEach(item => {
        if (!groups[item.category]) {
          groups[item.category] = [];
        }
        groups[item.category].push(item);
      });
      return groups;
    }, [filteredItems]);

    return (
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usluga
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opis
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cijena
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Akcija
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(groupedItems).map(([category, items]) => (
              <React.Fragment key={`category-group-${category}`}>
                <tr className="bg-gray-100">
                  <td colSpan={4} className="px-6 py-3">
                    <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                  </td>
                </tr>
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                          {item.isPackage && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <FaBox className="mr-1" />
                              Paket
                            </span>
                          )}
                          {item.isPopular && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <FaStar className="mr-1" />
                              Popularno
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Rezerviraj
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className={`bg-white rounded-xl shadow-lg overflow-hidden border ${
            item.isPopular ? 'border-indigo-500' : 'border-gray-200'
          } hover:shadow-xl transition-shadow duration-300`}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
              <div className="flex items-center gap-2">
                {item.isPopular && (
                  <span className="flex items-center text-indigo-600">
                    <FaStar className="mr-1" />
                    Popularno
                  </span>
                )}
                {item.isPackage && (
                  <span className="flex items-center text-green-600">
                    <FaBox className="mr-1" />
                    Paket
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-gray-900">{item.price}</div>
            </div>
            {item.packageDetails && (
              <div className="mb-4 text-sm text-gray-500">
                {item.packageDetails}
              </div>
            )}
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Rezervirajte termin
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main>
      <HeroSection
        title="Cjenik usluga"
        description="Pronađite savršenu uslugu za vaše potrebe. Naš cjenik je transparentan i jasno prikazuje sve naše usluge i njihove cijene."
        image="/images/services/MYV_selfie_details.webp"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Pretražite usluge..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Sve kategorije</option>
                {pricingCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg ${
                  viewMode === 'table' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <FaList />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <FaTh />
              </button>
            </div>
          </div>
        </div>

        {/* Content View */}
        {viewMode === 'table' ? <TableView /> : <GridView />}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nema pronađenih usluga
            </h3>
            <p className="text-gray-600">
              Pokušajte promijeniti kriterije pretraživanja
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            * Cijene su informativne i mogu varirati ovisno o specifičnim zahtjevima
          </p>
          <p className="text-gray-600">
            Za više informacija i rezervacije, slobodno nas kontaktirajte
          </p>
        </div>
      </div>
    </main>
  );
} 