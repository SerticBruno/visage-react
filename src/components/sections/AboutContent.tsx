'use client';

import Image from 'next/image';
import { FaAward, FaUserMd, FaHandHoldingHeart, FaCheck, FaStar } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';
import { motion } from 'framer-motion';

const AboutContent = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story Section - First Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Naša priča</h2>
              <p className="text-gray-600 mb-4">
                VISAGE Studio je estetski studio u centru Siska koji je certificirani predstavnik za TOSKANI.
                Naša misija je pružiti vrhunsku uslugu u području estetske medicine, koristeći najmodernije tehnologije
                i najkvalitetnije proizvode.
              </p>
              <p className="text-gray-600 mb-4">
                Kod nas možete, po prvi put u Sisku, obavljati jedne od najpopularnijih neinvazivnih tretmana:
                Plasmage i Mesoject Gun mezoterapija koja je dobila Gracia Award za BEST OF BEAUTY 2023.g.
              </p>
            </div>
            <div className="relative h-96">
              <Image
                src="/images/services/botox-face-girl.webp"
                alt="VISAGE Studio interior"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Team Section - Second Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Naš tim</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src="/images/services/plasmage-hero.webp"
                  alt="Team member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold">Ime Prezime</h3>
              <p className="text-gray-600">Estetski tehničar</p>
            </div>

            <div className="text-center group">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src="/images/services/manikura.webp"
                  alt="Team member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold">Ime Prezime</h3>
              <p className="text-gray-600">Estetski tehničar</p>
            </div>

            <div className="text-center group">
              <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                <Image
                  src="/images/services/TKNHA3_.webp"
                  alt="Team member"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold">Ime Prezime</h3>
              <p className="text-gray-600">Estetski tehničar</p>
            </div>
          </div>
        </motion.div>

        {/* Vision, Mission, Values Section - Third Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Naše vrijednosti</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full mr-4">
                  <FaAward className="text-2xl text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold">Vizija</h3>
              </div>
              <p className="text-gray-600">
                Biti vodeći estetski studio u regiji, poznat po inovativnim tretmanima i izvrsnoj usluzi.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full mr-4">
                  <GiHealthNormal className="text-2xl text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold">Misija</h3>
              </div>
              <p className="text-gray-600">
                Pružiti klijentima najbolje moguće tretmane koristeći najmoderniju tehnologiju i iskustvo naših stručnjaka.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full mr-4">
                  <FaHandHoldingHeart className="text-2xl text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold">Vrijednosti</h3>
              </div>
              <p className="text-gray-600">
                Profesionalizam, pouzdanost, inovativnost i individualni pristup svakom klijentu.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us Section - Final Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Zašto odabrati nas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full">
                  <FaUserMd className="text-xl text-slate-700" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Certificirani stručnjaci</h3>
                <p className="text-gray-600">Naš tim čine iskusni stručnjaci s dugogodišnjim iskustvom u estetskoj medicini.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full">
                  <MdHealthAndSafety className="text-xl text-slate-700" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Najmodernija oprema</h3>
                <p className="text-gray-600">Koristimo najnoviju tehnologiju i opremu vrhunskih proizvođača.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full">
                  <FaStar className="text-xl text-slate-700" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Individualni pristup</h3>
                <p className="text-gray-600">Svakom klijentu prilazimo individualno, prilagođavajući tretmane njihovim potrebama.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-3 rounded-full">
                  <FaCheck className="text-xl text-slate-700" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Sigurnost i kvaliteta</h3>
                <p className="text-gray-600">Strogo se pridržavamo svih sigurnosnih standarda i koristimo najkvalitetnije proizvode.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContent; 