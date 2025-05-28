'use client';

import { useState } from 'react';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Koje usluge nudite?",
    answer: "Nudimo širok spektar nekirurških estetskih usluga: mezoterapija, skin boosteri, PRP tretman, dermalni fileri, botox, plasmage, kemijski piling. Nadalje nudimo sljedeće beauty tretmane: Circadia Signature Dermaplaning facial, Circadia Beyond Botox Facial, Circadia Marshmallow Facial, Circadia Firming Peptide Facial i Dermalux Flex fototerapiju."
  },
  {
    question: "Gdje mogu dogovoriti termin?",
    answer: "Termin možete dogovoriti preko naših društvenih mreža, putem našeg Whatsappa i maila na službenoj web stranici."
  },
  {
    question: "Koje je vaše radno vrijeme?",
    answer: "Visage studio radi po dogovoru, što znači da morate unaprijed dogovoriti termin kako bismo Vas primili na konzultacije."
  },
  {
    question: "Koje načine plaćanja prihvaćate?",
    answer: "Prihvaćamo gotovinsko plaćanje, kartično plaćanje i plaćanje na rate. Jednkratno kartično plaćanje je moguće za Visa, Master, Maestro i Diners kartice. Plaćanje na rate je moguće za Visa, Master i Maestro kartice od 2 do 6 rata (*samo kartice izdane od Erste banke, HPB, Agram banke, Istarske kreditne banke i Slatinske banke) te za Diners kartice od 2 do 12 rata bez kamata."
  },
  {
    question: "Koje su cijene vaših usluga?",
    answer: "Cijene usluga variraju ovisno o vrsti tretmana i trajanju tretmana. Detaljan cjenik možete pogledati na našoj službenoj web stranici i društvenim mrežama."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16" style={{ background: 'linear-gradient(to bottom, #e5e7eb, #ffffff)' }}>
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