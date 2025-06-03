'use client';

import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

const NotFoundHero = () => {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white overflow-hidden py-16">
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-3">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-versailles text-slate-700 mb-4">
            Stranica nije pronađena
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto mb-6">
            Oprostite, stranica koju tražite ne postoji ili je premještena.
          </p>
        </div>

        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <FaHome className="text-base" />
            Povratak na početnu stranicu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundHero; 