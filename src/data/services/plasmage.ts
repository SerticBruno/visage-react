import { Service } from './types';

export const plasmage: Service = {
  id: 'plasmage',
  title: 'Plasmage',
  description: 'Napredna Plasmage terapija za lifting kože',
  longDescription: 'Plasmage je revolucionarna metoda koja koristi plazmu za lifting i obnavljanje kože. Ova metoda je minimalno invazivna i daje izvanredne rezultate.',
  benefits: [
    'Lifting kože',
    'Poboljšava ton i teksturu',
    'Smanjuje fine linije',
    'Poboljšava elastičnost',
    'Minimalno invazivna metoda'
  ],
  image: '/images/services/toskani-woman.webp',
  heroImage: '/images/services/plasmage-hero.webp',
  metaDescription: 'Plasmage terapija u VISAGE studiju. Lifting i obnavljanje kože uz pomoć plazme. Sigurna i učinkovita metoda.',
  metaKeywords: 'plasmage, lifting kože, plazma, estetski studio Sisak, VISAGE studio',
  tags: ['plasmage', 'lifting', 'plazma', 'minimalno-invazivni'],
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
    'opis-zahvata': `Plasmage je revolucionarna metoda koja koristi plazmu za lifting i obnavljanje kože. Ova metoda je minimalno invazivna i daje izvanredne rezultate.

U VISAGE studiju koristimo najnapredniju Plasmage opremu, što osigurava optimalne rezultate. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `Plasmage je napredni tretman koji koristi plazmu za lifting i obnavljanje kože. Idealni kandidati su osobe koje žele poboljšati izgled svoje kože, ali i one koje imaju specifične probleme koje žele riješiti. Prije tretmana, svaki klijent prolazi detaljnu konzultaciju s našim stručnjacima kako bismo osigurali sigurnost i optimalne rezultate.

Idealni kandidati za Plasmage su osobe koje žele:
- Poboljšati ton i teksturu kože
- Smanjiti fine linije i bore
- Ukloniti ožiljke od akni
- Poboljšati apsorpciju proizvoda za njegu kože
- Osvježiti i revitalizirati kožu
- Postići prirodan lifting bez operacije
- Poboljšati elastičnost kože
- Koristiti minimalno invazivnu metodu`,
    'priprema': `Prije Plasmage tretmana potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka broja tretmana za optimalne rezultate
3. Upute za pripremu kože prije tretmana
4. Analiza krvi (po potrebi)

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože
- Izbjegavati alkohol i pušenje`,
    'tijek-zahvata': `Tretman Plasmage je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema kože (15 min) - Dubinsko čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za primjenu tretmana.

3. Primjena Plasmage (20-30 min) - Precizna primjena plazme, praćenje reakcije kože i masiranje područja. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena umirujućih proizvoda, regenerativnih seruma, zaštitnog krema i fotografiranje prije/nakon. Ova faza osigurava optimalno oporavak kože.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
    'oporavak': `Nakon Plasmage tretmana:
- Koža može biti osjetljiva i crvenkasta 3-5 dana
- Potrebno je izbjegavati izravno sunce 2 tjedna
- Koristiti blage proizvode za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju
- Izbjegavati intenzivnu fizičku aktivnost 48 sati

Redoviti tretmani svakih 4-6 tjedana daju najbolje rezultate.`,
    'mjere-opreza': `Važne mjere opreza:
- Izbjegavati izravno sunce 2 tjedna nakon tretmana
- Koristiti zaštitni krem s visokim SPF-om
- Izbjegavati korištenje agresivnih proizvoda za njegu kože
- Ne češati i ne trljati kožu
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih nuspojava, odmah nas kontaktirajte.`,
    'cijena': `Cijena Plasmage tretmana:
- Pojedinačni tretman: 1.200 kn
- Paket od 3 tretmana: 3.000 kn
- Paket od 6 tretmana: 5.400 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman Plasmageom
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 