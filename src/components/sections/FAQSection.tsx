'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Koje usluge nudite?",
    answer: "Nudimo širok spektar estetskih tretmana uključujući njegu lica, tretmane za tijelo, depilaciju, manikuru i pedikuru. Također smo certificirani predstavnik za TOSKANI proizvode."
  },
  {
    question: "Koliko unaprijed trebam rezervirati termin?",
    answer: "Preporučujemo rezervaciju najmanje 2-3 dana unaprijed, posebno za popularne tretmane i vikende. Za neke specijalne tretmane možda će biti potrebno i više vremena."
  },
  {
    question: "Kakve su cijene vaših usluga?",
    answer: "Cijene variraju ovisno o vrsti tretmana i trajanju. Detaljan cjenik možete pronaći na stranici Cjenik. Za točne cijene i pakete, slobodno nas kontaktirajte."
  },
  {
    question: "Prihvaćate li poklon bonove?",
    answer: "Da, nudimo poklon bonove za sve naše usluge. Poklon bon možete kupiti u salonu ili online. Bon vrijedi 12 mjeseci od dana kupnje."
  },
  {
    question: "Imate li parking?",
    answer: "Da, imamo ograničen broj parking mjesta ispred salona. Također, u blizini se nalazi javni parking."
  },
  {
    question: "Kakva je vaša politika otkazivanja?",
    answer: "Molimo vas da otkazujete termin najmanje 24 sata unaprijed. Za otkazivanje u roku manjem od 24 sata može se naplatiti 50% vrijednosti tretmana."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 mb-6 shadow-md ring-1 ring-slate-200/50">
            <FaQuestionCircle className="w-8 h-8 text-slate-700" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Često postavljana pitanja
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Pronađite odgovore na najčešća pitanja o našim uslugama
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-b from-white to-slate-50 rounded-xl shadow-sm overflow-hidden border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-slate-200 shadow-md ring-1 ring-slate-200/50' 
                  : 'border-slate-100 hover:border-slate-200 hover:shadow-sm'
              }`}
            >
              <button
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer hover:bg-slate-50/50 transition-colors duration-200"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className={`text-lg font-medium transition-colors duration-300 ${
                    openIndex === index ? 'text-slate-900' : 'text-slate-700'
                  }`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    <FaChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                      openIndex === index ? 'text-slate-700' : 'text-slate-400'
                    }`} />
                  </div>
                </div>
              </button>
              
              <div
                className={`px-8 transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 pb-6' 
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 