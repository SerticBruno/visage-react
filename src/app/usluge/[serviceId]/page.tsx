import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const services = {
  'kemijski-piling': {
    title: 'Kemijski Piling',
    description: 'Profesionalni kemijski piling za obnavljanje kože',
    longDescription: 'Kemijski piling je napredna estetska procedura koja koristi kemijske spojeve za uklanjanje mrtvih stanica s površine kože. Ova metoda potiče regeneraciju kože, poboljšava ton i teksturu, te pomaže u smanjenju bora i ožiljaka.',
    benefits: [
      'Poboljšava ton i teksturu kože',
      'Smanjuje fine linije i bore',
      'Uklanja mrtve stanice kože',
      'Poboljšava apsorpciju proizvoda za njegu',
      'Smanjuje ožiljke od akni'
    ],
    image: '/images/services/socialmedia_peelings_combined.webp'
  },
  'mezoterapija': {
    title: 'Mezoterapija',
    description: 'Napredna mezoterapija za revitalizaciju kože',
    longDescription: 'Mezoterapija je minimalno invazivna procedura koja uključuje injekciju koktela vitamina, minerala i drugih aktivnih sastojaka direktno u srednji sloj kože. Ova metoda pomaže u revitalizaciji kože i rješavanju specifičnih problema.',
    benefits: [
      'Duboka hidratacija kože',
      'Poboljšava ton i sjaj kože',
      'Smanjuje fine linije',
      'Poboljšava elastičnost kože',
      'Potiče proizvodnju kolagena'
    ],
    image: '/images/services/Mesoterapia-transdermica-facial.webp'
  },
  // Add other services here...
};

export default function ServicePage({ params }: { params: { serviceId: string } }) {
  const service = services[params.serviceId as keyof typeof services];

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Usluga nije pronađena</h1>
        <Link href="/usluge" className="text-indigo-600 hover:text-indigo-800">
          Povratak na sve usluge
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/usluge" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Povratak na sve usluge
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{service.longDescription}</p>
            
            <h2 className="text-2xl font-semibold mb-4">Prednosti</h2>
            <ul className="space-y-2 mb-8">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Zakažite termin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 