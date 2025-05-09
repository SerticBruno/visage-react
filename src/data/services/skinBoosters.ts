import { Service } from './types';

export const skinBoosters: Service = {
  title: 'Skin boosteri',
  description: 'Napredni skin boosteri za hidrataciju i revitalizaciju',
  longDescription: 'Skin boosteri su napredni tretmani koji pružaju duboku hidrataciju i revitalizaciju kože. Ova metoda koristi visokokvalitetne sastojke za dugotrajno poboljšanje kvalitete kože.',
  benefits: [
    'Duboka hidratacija kože',
    'Poboljšava ton i sjaj kože',
    'Smanjuje fine linije',
    'Poboljšava elastičnost kože',
    'Dugotrajni rezultati'
  ],
  image: '/images/services/obrve-i-trepavice.webp',
  heroImage: '/images/services/toskani-hero.webp',
  metaDescription: 'Skin boosteri u VISAGE studiju. Duboka hidratacija i revitalizacija kože. Vidljivi i dugotrajni rezultati.',
  metaKeywords: 'skin boosteri, hidratacija kože, revitalizacija kože, estetski studio Sisak, VISAGE studio',
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
    'opis-zahvata': `Skin boosteri su napredni tretmani koji pružaju duboku hidrataciju i revitalizaciju kože. Ova metoda koristi visokokvalitetne sastojke za dugotrajno poboljšanje kvalitete kože.

U VISAGE studiju koristimo najkvalitetnije skin boostere, prilagođene vašem tipu kože i specifičnim potrebama. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `Skin boosteri su idealni za osobe koje žele:
- Duboku hidrataciju kože
- Poboljšati ton i sjaj kože
- Smanjiti fine linije
- Poboljšati elastičnost kože
- Postići dugotrajne rezultate

Nisu preporučljivi za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe koje su nedavno prošle kroz agresivne tretmane kože
- Osobe s alergijama na sastojke boostera`,
    'priprema': `Prije tretmana skin boosterima potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg boostera za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tijek tretmana skin boosterima uključuje:
1. Čišćenje kože
2. Primjena anestetika (po potrebi)
3. Injekcija boostera u kožu
4. Primjena umirujućih i regenerativnih proizvoda
5. Primjena zaštitnog krema

Cijeli postupak traje oko 30-45 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon tretmana skin boosterima:
- Koža može biti osjetljiva i crvenkasta 1-2 dana
- Moguća su mala modrica na mjestima injekcija
- Potrebno je izbjegavati izravno sunce 2 tjedna
- Koristiti blage proizvode za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju

Redoviti tretmani svakih 4-6 tjedana daju najbolje rezultate.`,
    'mjere-opreza': `Važne mjere opreza:
- Izbjegavati izravno sunce 2 tjedna nakon tretmana
- Koristiti zaštitni krem s visokim SPF-om
- Izbjegavati korištenje agresivnih proizvoda za njegu kože
- Ne češati i ne trljati kožu
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih nuspojava, odmah nas kontaktirajte.`,
    'cijena': `Cijena tretmana skin boosterima:
- Pojedinačni tretman: 600 kn
- Paket od 3 tretmana: 1.500 kn
- Paket od 6 tretmana: 2.800 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman skin boosterima
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 