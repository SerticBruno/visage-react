import { Service } from './types';

export const skinBoosteri: Service = {
  id: 'skin-boosteri',
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
  tags: ['skin-boosteri', 'hidratacija', 'revitalizacija', 'minimalno-invazivni'],
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
- Postići dugotrajne rezultate`,
    'priprema': `Prije tretmana skin boosterima potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg boostera za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tretman Skin Boosters je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg koktela, plan tretmana i objašnjenje postupka. Ova faza je ključna za postizanje optimalnih rezultata.

2. Priprema kože (15 min) - Dubinsko čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za primjenu tretmana.

3. Primjena Skin Boosters (20-30 min) - Precizne mikroinjekcije, praćenje reakcije kože, prilagodba dubine injekcija i masiranje područja. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (15 min) - Primjena umirujućih proizvoda, regenerativnih seruma, zaštitnog krema i fotografiranje prije/nakon. Ova faza osigurava optimalno oporavak kože.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata.`,
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