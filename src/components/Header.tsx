'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { services } from '@/data/services';
import { FaChevronDown, FaChevronUp, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

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

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed w-full bg-gradient-to-r from-white to-gray-50 shadow-sm z-50">
      {/* Contact Bar - Hidden on Mobile */}
      <div className="hidden sm:block bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8 text-sm">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">Certificirani predstavnik</span>
              <span className="text-indigo-600 font-medium">TOSKANI</span>
            </div>
            <div className="flex items-center">
              <a 
                href="tel:+385911105020" 
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 mr-4"
              >
                <FaWhatsapp className="w-3 h-3 mr-1" />
                <span>091 110 50 20</span>
              </a>
              <a 
                href="mailto:contact@visagestudio.hr" 
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300 mr-4"
              >
                <FaEnvelope className="w-3 h-3 mr-1" />
                <span>contact@visagestudio.hr</span>
              </a>
              <a 
                href="https://maps.google.com/?q=Ulica+Stjepana+i+Antuna+Radića+37,+Sisak" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300"
              >
                <FaMapMarkerAlt className="w-3 h-3 mr-1" />
                <span>Kako do nas</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-300 transform hover:scale-105"
          >
            VISAGE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-indigo-600 transition-all duration-300 relative group ${
                isActive('/') ? 'text-indigo-600' : ''
              }`}
            >
              Početna
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <Link
                href="/usluge"
                className={`text-gray-600 hover:text-indigo-600 transition-all duration-300 flex items-center gap-1 cursor-pointer relative group ${
                  isActive('/usluge') ? 'text-indigo-600' : ''
                }`}
                onClick={() => setIsServicesOpen(false)}
              >
                Usluge
                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                  isActive('/usluge') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
              
              {isServicesOpen && (
                <div 
                  className="absolute left-0 mt-3 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 transform transition-all duration-300 origin-top"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {Object.entries(services).map(([pageName, service]) => (
                    <Link
                      key={pageName}
                      href={`/usluge/${pageName}`}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 transform hover:translate-x-1 ${
                        isActive(`/usluge/${pageName}`) ? 'text-indigo-600 bg-indigo-50' : ''
                      }`}
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link 
              href="/cjenik" 
              className={`text-gray-600 hover:text-indigo-600 transition-all duration-300 relative group ${
                isActive('/cjenik') ? 'text-indigo-600' : ''
              }`}
            >
              Cjenik
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                isActive('/cjenik') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/katalog" 
              className={`text-gray-600 hover:text-indigo-600 transition-all duration-300 relative group ${
                isActive('/katalog') ? 'text-indigo-600' : ''
              }`}
            >
              Katalog
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                isActive('/katalog') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/o-nama" 
              className={`text-gray-600 hover:text-indigo-600 transition-all duration-300 relative group ${
                isActive('/o-nama') ? 'text-indigo-600' : ''
              }`}
            >
              O nama
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                isActive('/o-nama') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/kontakt" 
              className={`text-gray-600 hover:text-indigo-600 transition-all duration-300 relative group ${
                isActive('/kontakt') ? 'text-indigo-600' : ''
              }`}
            >
              Kontakt
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300 ${
                isActive('/kontakt') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
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
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 transform hover:translate-x-1"
            onClick={handleMobileLinkClick}
          >
            Početna
          </Link>
          
          <div className="relative">
            <button
              className="w-full text-left px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 flex items-center justify-between cursor-pointer"
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
                    className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 transform hover:translate-x-1"
                    onClick={handleMobileLinkClick}
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/cjenik"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 transform hover:translate-x-1"
            onClick={handleMobileLinkClick}
          >
            Cjenik
          </Link>
          <Link
            href="/katalog"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 transform hover:translate-x-1"
            onClick={handleMobileLinkClick}
          >
            Katalog
          </Link>
          <Link
            href="/o-nama"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 transform hover:translate-x-1"
            onClick={handleMobileLinkClick}
          >
            O nama
          </Link>
          <Link
            href="/kontakt"
            className="block px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all duration-300 transform hover:translate-x-1"
            onClick={handleMobileLinkClick}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </header>
  );
} 