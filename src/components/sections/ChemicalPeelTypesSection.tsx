import Image from 'next/image';

const peelTypes = [
  {
    title: 'Mono Pilinzi',
    description: 'Individualni pilinzi koji se prilagođavaju vašem tipu kože',
    image: '/images/services/kemijski-piling/toskani-peelings.webp',
    types: [
      'SALICILNA KISELINA - uklanja mrtve stanice i nečistoće s kože',
      'LAKTIČNA KISELINA - poboljšava čvrstoću, zaglađuje teksturu, idealna za osjetljivu kožu',
      'MANDELIČNA KISELINA - ublažava nepravilnu pigmentaciju',
      'GLIKOLNA KISELINA - umanjuje učinke fotostarenja i akni'
    ]
  },
  {
    title: 'Kombinirani Pilinzi',
    description: 'Napredni pilinzi koji kombiniraju različite kiseline za optimalne rezultate',
    image: '/images/services/kemijski-piling/kombinirani-pilinzi.webp',
    types: [
      'PHOTO-AGEING PEEL - smanjuje hiperpigmentacije na izloženoj koži',
      'PURIFYING PEEL - obnavlja kožu uklanjanjem keratiniziranih stanica',
      'REJUVENATING PEEL - učinak liftinga bez invazivnog oštećenja',
      'RADIANCE PEEL - površinski piling s inovativnim sastojkom za izbjeljivanje',
      'MESOSHINE PEEL - površinski piling koji potiče stanično obnavljanje'
    ]
  },
  {
    title: 'Duosomal Pilinzi',
    description: 'Nova generacija kemijskih pilinzi koji pružaju trenutne rezultate bez nelagode',
    image: '/images/services/kemijski-piling/toskani-duosomal.webp',
    types: [
      'SALISOME DUO - regeneracija kože i poboljšan izgled masne kože',
      'MANDESOME DUO - regeneracija kože i manje uočljive hiperpigmentacije',
      'GLYCOSOME DUO - regeneracija kože i smanjenje znakova starenja',
      'LACTISOME DUO - regeneracija kože i poboljšan izgled osjetljive kože'
    ]
  }
];

export default function ChemicalPeelTypesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            TOSKANI KEMIJSKI PILINZI
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Linija visoko kvalitetnih kemijskih pilinzi, različitih postotaka te sigurni i učinkoviti proizvodi koji se mogu prilagoditi potrebama klijenata.
          </p>
        </div>

        <div className="space-y-16">
          {peelTypes.map((peel, index) => (
            <div 
              key={peel.title}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={peel.image}
                    alt={peel.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{peel.title}</h3>
                <p className="text-gray-600 mb-6">{peel.description}</p>
                <ul className="space-y-3">
                  {peel.types.map((type, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 