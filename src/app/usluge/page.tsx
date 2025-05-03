import React from 'react';
import Image from 'next/image';

const services = [
  {
    id: 'kemijski-piling',
    title: 'Kemijski Piling',
    description: 'Profesionalni kemijski piling za obnavljanje kože',
    image: '/images/services/socialmedia_peelings_combined.webp'
  },
  {
    id: 'mezoterapija',
    title: 'Mezoterapija',
    description: 'Napredna mezoterapija za revitalizaciju kože',
    image: '/images/services/Mesoterapia-transdermica-facial.webp'
  },
  {
    id: 'prp',
    title: 'PRP',
    description: 'PRP terapija za poticanje prirodne regeneracije',
    image: '/images/services/MYV_selfie_details.webp'
  },
  {
    id: 'skin-boosteri',
    title: 'Skin Boosteri',
    description: 'Napredni skin boosteri za hidrataciju i revitalizaciju',
    image: '/images/services/toskani-hero.webp'
  },
  {
    id: 'dermalni-fileri',
    title: 'Dermalni Fileri',
    description: 'Profesionalni dermalni fileri za volumizaciju',
    image: '/images/services/botox-face-girl.webp'
  },
  {
    id: 'plasmage',
    title: 'Plasmage',
    description: 'Napredna Plasmage terapija za lifting kože',
    image: '/images/services/plasmage-hero.webp'
  },
  {
    id: 'terapija-bora',
    title: 'Terapija bora lica',
    description: 'Efikasna terapija za smanjenje bora',
    image: '/images/services/toskani-woman.webp'
  },
  {
    id: 'beauty-tretmani',
    title: 'Beauty Tretmani',
    description: 'Luksuzni beauty tretmani za potpuno opuštanje',
    image: '/images/services/TKNHA3_.webp'
  },
  {
    id: 'bio-sculpture',
    title: 'Bio Sculpture Sistemi',
    description: 'Profesionalni Bio Sculpture sistemi za nokte',
    image: '/images/services/manikura.webp'
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Naše Usluge</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.id} 
            id={service.id} 
            className="group bg-white rounded-lg shadow-lg overflow-hidden scroll-mt-16 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6 transition-colors duration-300 group-hover:bg-gray-50">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors duration-300">{service.title}</h2>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 