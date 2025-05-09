import { Service } from './types';

export const plasmage: Service = {
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
    'kandidati': `Plasmage je idealan za osobe koje žele:
- Lifting kože
- Poboljšati ton i teksturu kože
- Smanjiti fine linije
- Poboljšati elastičnost kože
- Koristiti minimalno invazivnu metodu

Nije preporučljiv za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe koje su nedavno prošle kroz agresivne tretmane kože
- Osobe s poremećajima zgrušavanja krvi`,
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
    'tijek-zahvata': `Tijek Plasmage tretmana uključuje:
1. Čišćenje kože
2. Primjena anestetika
3. Generiranje plazme
4. Primjena plazme na kožu
5. Primjena umirujućih i regenerativnih proizvoda

Cijeli postupak traje oko 60-90 minuta i provodi se u ugodnom ambijentu našeg studija.`,
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

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 