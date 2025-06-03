'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutContent = () => {
  return (
    <section className="py-16" style={{ background: 'linear-gradient(to bottom, #ffffff, #e5e7eb)' }}>
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
                Utemeljeni smo 2023. godine u Sisku. Visage studio je estetski studio specijaliziran za nekiruršku estetsku medicinu.
                U Visage studiju smo posvećeni regeneriranju kože, poboljšanju zdravlja kože i zaustavljanju znakova starenja. 
                Nudimo individualni pristup i tretmane prilagođavamo vašim željama i potrebama.
              </p>
              <p className="text-gray-600 mb-4">
                Uporabom najsuvremenijih tehnologija i metoda, Visage studio pruža najnovije tretmane i zahvate za regeneriranje kože. 
                Kod nas, prvi put u Sisku, možete napraviti bleferoplazmu, postupak uklanjanja viška kože s gornjeg i donjeg kapka korištenjem tehnologije frakcijske plazme.
              </p>
              <p className="text-gray-600 mb-4">
                Također, nudimo mezoterapiju Dermapenom 4 i Mesoject Gunom te možemo tretirati čak i najosjetljiviju kožu.
                U Visage studiju nudimo mezoterapiju egzosomima i polinukleotidima te aktiviramo prirodnu sposobnost kože da se sama regenerira
              </p>
              <p className="text-gray-600 mb-4">
                U našem studiju možete, uz savjet kozmetologinje, kupiti dermokozmetičke proizvode i suplemente za njegu lica, tijela i vlasišta renomiranih svjetskih marki.
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
              <h3 className="text-xl font-semibold">Tatjana Torinek</h3>
              <p className="text-gray-600 pt-3">Tatjana Torinek je diplomirala 1992. godine na Medicinskom fakultetu u Zagrebu, a od tada se bavi obiteljskom medicinom. Završila je specijalizaciju iz Obiteljske medicine i uspješno vodi svoju ambulantu već 18 godina. Estetskom medicinom se počela baviti prije 4 godine te se specijalizirala za obavljanje nekirurških estetskih tretmana. Prošla je brojne edukacije i tečajeve te redovito prisustvuje kongresima i predavanjima iz estetske medicine.
              Omiljeni tretmani su joj mezoterapija egzosomima, skin boosteri i plasmage</p>
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
              <h3 className="text-xl font-semibold">Mia Torinek</h3>
              <p className="text-gray-600">Mia Torinek je diplomirala marketing na Ekonomskom fakultetu u Zagrebu. Osnovala je Visage studio 2023. godine skupa s majkom Tatjanom. 2024. godine je završila prekvalifikaciju za kozmetičara te se specijalizira za obavljanje neinvazivnih estetskih tretmana. Redovito odlazi na edukacije, tečajeve, radionice i kongrese iz estetske medicine te je uvijek u toku s trendovima.
              Omiljeni tretmani: PRP, mezoterapija polinukleotidima i skin boosteri</p>
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
              <h3 className="text-xl font-semibold">Helena Torinek</h3>
              <p className="text-gray-600">Estetski tehničar lorem kozmetičara te se specijalizira za obavljanje neinvazivnih estetskih tretmana. Redovito odlazi na edukacije, tečajeve, radionice i kongrese iz estetske medicine te je uvijek u toku s trendovima.
              Omiljeni tretmani: PRP, mezoterapija polinukleotidima i skin boosteri</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutContent; 