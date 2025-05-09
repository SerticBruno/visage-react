import { Service } from './types';

export const wrinkleTherapy: Service = {
  id: 'terapija-bora-lica',
  title: 'Terapija bora lica',
  description: 'Efikasna terapija za smanjenje bora',
  longDescription: 'Terapija bora lica je specijalizirana metoda za smanjenje i prevenciju bora. Koristimo napredne tehnike i proizvode za optimalne rezultate.',
  benefits: [
    'Smanjivanje bora',
    'Prevencija novih bora',
    'Poboljšava ton kože',
    'Poboljšava elastičnost',
    'Prirodni izgled'
  ],
  image: '/images/services/manikura.webp',
  heroImage: '/images/services/toskani-woman.webp',
  metaDescription: 'Terapija bora lica u VISAGE studiju. Smanjite i spriječite bore uz pomoć naprednih metoda. Prirodni i dugotrajni rezultati.',
  metaKeywords: 'terapija bora, bore lica, prevencija bora, estetski studio Sisak, VISAGE studio',
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
    'opis-zahvata': `Terapija bora lica je specijalizirana metoda za smanjenje i prevenciju bora. Koristimo napredne tehnike i proizvode za optimalne rezultate.

U VISAGE studiju koristimo najkvalitetnije proizvode i tehnike za terapiju bora, prilagođene vašem tipu kože i specifičnim potrebama. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `Terapija bora je idealna za osobe koje žele:
- Smanjiti postojeće bore
- Spriječiti pojavu novih bora
- Poboljšati ton kože
- Poboljšati elastičnost kože
- Postići prirodan izgled`,
    'priprema': `Prije terapije bora potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg tretmana za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tretman za smanjenje bora je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema kože (15 min) - Dubinsko čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za primjenu tretmana.

3. Primjena tretmana (20-30 min) - Precizna primjena proizvoda, praćenje reakcije kože i masiranje područja. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena umirujućih proizvoda, regenerativnih seruma, zaštitnog krema i fotografiranje prije/nakon. Ova faza osigurava optimalno oporavak kože.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
    'oporavak': `Nakon terapije bora:
- Koža može biti osjetljiva 1-2 dana
- Potrebno je izbjegavati izravno sunce 2 tjedna
- Koristiti blage proizvode za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju
- Redovito koristiti preporučene proizvode za njegu

Redoviti tretmani svakih 4-6 tjedana daju najbolje rezultate.`,
    'mjere-opreza': `Važne mjere opreza:
- Izbjegavati izravno sunce 2 tjedna nakon tretmana
- Koristiti zaštitni krem s visokim SPF-om
- Izbjegavati korištenje agresivnih proizvoda za njegu kože
- Ne češati i ne trljati kožu
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih nuspojava, odmah nas kontaktirajte.`,
    'cijena': `Cijena terapije bora:
- Pojedinačni tretman: 450 kn
- Paket od 3 tretmana: 1.200 kn
- Paket od 6 tretmana: 2.200 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman terapijom bora
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 