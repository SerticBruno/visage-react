import { Service } from './types';

export const beautyTreatments: Service = {
  id: 'beauty-tretmani',
  title: 'Beauty tretmani',
  description: 'Luksuzni beauty tretmani za potpuno opuštanje',
  longDescription: 'Beauty tretmani su luksuzni tretmani za lice i tijelo koji pružaju potpuno opuštanje i njegu. Koristimo najkvalitetnije proizvode za maksimalne rezultate.',
  benefits: [
    'Potpuno opuštanje',
    'Duboka njega kože',
    'Poboljšava ton kože',
    'Poboljšava hidrataciju',
    'Luksuzno iskustvo'
  ],
  image: '/images/services/socialmedia_peelings_combined.webp',
  heroImage: '/images/services/TKNHA3_.webp',
  metaDescription: 'Beauty tretmani u VISAGE studiju. Luksuzni tretmani za lice i tijelo. Potpuno opuštanje i njega.',
  metaKeywords: 'beauty tretmani, njega kože, opuštanje, estetski studio Sisak, VISAGE studio',
  steps: [
    { id: 'opis-zahvata', label: 'Opis zahvata', icon: 'FaRegFileAlt' },
    { id: 'kandidati', label: 'Kandidati', icon: 'FaUsers' },
    { id: 'priprema', label: 'Priprema', icon: 'FaRegEdit' },
    { id: 'tijek-zahvata', label: 'Tijek zahvata', icon: 'FaRegClock' },
    { id: 'oporavak', label: 'Oporavak', icon: 'FaRegHospital' },
    { id: 'mjere-opreza', label: 'Mjere opreza', icon: 'FaRegFile' },
    { id: 'cijena', label: 'Cijena', icon: 'FaHandHoldingUsd' }
  ],
  stepContents: {
    'opis-zahvata': `Beauty tretmani su luksuzni tretmani za lice i tijelo koji pružaju potpuno opuštanje i njegu. Koristimo najkvalitetnije proizvode za maksimalne rezultate.

U VISAGE studiju nudimo različite vrste beauty tretmana, prilagođene vašim potrebama i željama. Svaki tretman je jedinstveno iskustvo koje će vas osvježiti i revitalizirati.`,
    'kandidati': `Beauty tretmani su idealni za osobe koje žele:
- Potpuno opuštanje
- Duboku njegu kože
- Poboljšati ton kože
- Poboljšati hidrataciju kože
- Doživjeti luksuzno iskustvo

Nisu preporučljivi za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe s alergijama na sastojke proizvoda`,
    'priprema': `Prije beauty tretmana potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Odabir odgovarajućeg tretmana
3. Upute za pripremu prije tretmana

Dan prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tijek beauty tretmana uključuje:
1. Konzultacija i procjena potreba
2. Čišćenje kože
3. Primjena odgovarajućih proizvoda
4. Masiranje i opuštanje
5. Primjena zaštitnog krema

Cijeli postupak traje oko 60-90 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon beauty tretmana:
- Koža je osvježena i hidratizirana
- Potrebno je izbjegavati izravno sunce 24 sata
- Koristiti blage proizvode za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju
- Redovito koristiti preporučene proizvode za njegu

Redoviti tretmani svakih 4-6 tjedana daju najbolje rezultate.`,
    'mjere-opreza': `Važne mjere opreza:
- Izbjegavati izravno sunce 24 sata nakon tretmana
- Koristiti zaštitni krem s visokim SPF-om
- Izbjegavati korištenje agresivnih proizvoda za njegu kože
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih nuspojava, odmah nas kontaktirajte.`,
    'cijena': `Cijena beauty tretmana:
- Osnovni beauty tretman: 300 kn
- Premium beauty tretman: 450 kn
- Luxury beauty tretman: 600 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Odabrani beauty tretman
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 