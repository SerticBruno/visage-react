import Image from 'next/image';

const recoveryInfo = {
  title: 'Nuspojave i Oporavak',
  sideEffects: [
    'Crvenilo',
    'Osjetljivost',
    'Peckanje',
    'Perutanje kože',
    'Stvaranje ljuskica'
  ],
  recommendations: [
    'Ne nanosite kreme s retinolom noć prije i nakon kemijskog pilinga',
    'Ne izvodite naporne vježbe tijekom 7 dana nakon nanošenja',
    'Izbjegavajte izlaganje suncu i solariju',
    'Koristite Total Recovery kremu ili gel i zaštitu od sunca TKN SPF50',
    'Ne skidajte ljuskice i pustite kožu da se sama obnovi i odljušti',
    'Ne koristite mehaničke pilinge nakon tretmana minimalno 10 dana',
    'Ne koristite grube ručnike tijekom skincare rutine'
  ]
};

export default function ChemicalPeelRecoverySection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {recoveryInfo.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oporavak traje nekoliko dana, uz blago crvenilo i ljuštenje. Nakon tretmana se preporučuje njega Total Recovery kremom ili gelom i korištenje Sun Protection kreme SPF50.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl mb-8">
              <Image
                src="/images/services/kemijski-piling/toskani-recovery.webp"
                alt="Recovery process"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/services/kemijski-piling/toskani-spf.webp"
                alt="SPF protection"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Moguće nuspojave</h3>
              <ul className="space-y-3">
                {recoveryInfo.sideEffects.map((effect, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-gray-600">{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Preporuke nakon tretmana</h3>
              <ul className="space-y-3">
                {recoveryInfo.recommendations.map((recommendation, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 