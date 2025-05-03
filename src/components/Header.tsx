'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { services } from '@/data/services';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            VISAGE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Početna
            </Link>
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <Link
                href="/usluge"
                className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Usluge
                <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {isServicesOpen && (
                <div 
                  className="absolute left-0 mt-3 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {Object.entries(services).map(([pageName, service]) => (
                    <Link
                      key={pageName}
                      href={`/usluge/${pageName}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/o-nama" className="text-gray-600 hover:text-indigo-600 transition-colors">
              O nama
            </Link>
            <Link href="/kontakt" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Kontakt
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed top-16 left-0 right-0 bg-white border-t border-gray-100 transition-all duration-300 ease-in-out transform ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100 visible' 
            : '-translate-y-full opacity-0 invisible'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            onClick={handleMobileLinkClick}
          >
            Početna
          </Link>
          
          <div className="relative">
            <button
              className="w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors flex items-center justify-between cursor-pointer"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Usluge
              {isServicesOpen ? (
                <FaChevronUp className="w-3 h-3 transition-transform duration-300" />
              ) : (
                <FaChevronDown className="w-3 h-3 transition-transform duration-300" />
              )}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isServicesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pl-4 space-y-1">
                {Object.entries(services).map(([pageName, service]) => (
                  <Link
                    key={pageName}
                    href={`/usluge/${pageName}`}
                    className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    onClick={handleMobileLinkClick}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/o-nama"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            onClick={handleMobileLinkClick}
          >
            O nama
          </Link>
          <Link
            href="/kontakt"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
            onClick={handleMobileLinkClick}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </header>
  );
} 