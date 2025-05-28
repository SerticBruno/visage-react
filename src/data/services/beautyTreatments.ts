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
  tags: ['beauty-tretmani', 'opuštanje', 'njega-kože', 'luksuzni-tretmani'],
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
- Doživjeti luksuzno iskustvo`,
    'priprema': `Prije beauty tretmana potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Odabir odgovarajućeg tretmana
3. Upute za pripremu prije tretmana

Dan prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tretman lica je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema kože (15 min) - Dubinsko čišćenje kože, primjena pripremnih proizvoda, oznaka područja za tretman. Ova faza osigurava optimalne uvjete za primjenu tretmana.

3. Primjena tretmana (30-45 min) - Precizna primjena proizvoda, masaža lica, maske i posebni tretmani. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena regenerativnih seruma, zaštitnog krema i fotografiranje prije/nakon. Ova faza osigurava optimalno oporavak kože.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
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

Za više informacija o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 