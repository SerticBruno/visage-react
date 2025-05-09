import { Service } from './types';

export const prp: Service = {
  title: 'PRP',
  description: 'PRP terapija za poticanje prirodne regeneracije',
  longDescription: 'PRP (Platelet Rich Plasma) terapija je revolucionarna metoda koja koristi vlastite trombocite pacijenta za poticanje prirodne regeneracije kože. Ova metoda je potpuno prirodna i sigurna.',
  benefits: [
    'Potiče prirodnu regeneraciju kože',
    'Poboljšava ton i teksturu kože',
    'Smanjuje fine linije i bore',
    'Poboljšava kvalitetu kože',
    'Potpuno prirodna metoda'
  ],
  image: '/images/services/plasmage-hero.webp',
  heroImage: '/images/services/MYV_selfie_details.webp',
  metaDescription: 'PRP terapija u VISAGE studiju. Koristite vlastite trombocite za regeneraciju kože. Prirodna i sigurna metoda.',
  metaKeywords: 'PRP terapija, regeneracija kože, trombociti, estetski studio Sisak, VISAGE studio',
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
    'opis-zahvata': `PRP (Platelet Rich Plasma) terapija je revolucionarna metoda koja koristi vlastite trombocite pacijenta za poticanje prirodne regeneracije kože. Ova metoda je potpuno prirodna i sigurna, jer koristi vlastite stanice pacijenta.

U VISAGE studiju koristimo najnapredniju opremu za pripremu PRP-a, što osigurava optimalnu koncentraciju trombocita i maksimalne rezultate. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `PRP terapija je idealna za osobe koje žele:
- Potaknuti prirodnu regeneraciju kože
- Poboljšati ton i teksturu kože
- Smanjiti fine linije i bore
- Poboljšati kvalitetu kože
- Koristiti potpuno prirodnu metodu

Nije preporučljiva za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe koje su nedavno prošle kroz agresivne tretmane kože
- Osobe s poremećajima zgrušavanja krvi`,
    'priprema': `Prije PRP terapije potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka broja tretmana za optimalne rezultate
3. Upute za pripremu kože prije tretmana
4. Analiza krvi (po potrebi)

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože
- Izbjegavati alkohol i pušenje`,
    'tijek-zahvata': `Tijek PRP terapije uključuje:
1. Uzimanje krvi pacijenta
2. Centrifugiranje krvi za dobivanje PRP-a
3. Primjena anestetika (po potrebi)
4. Injekcija PRP-a u kožu
5. Primjena umirujućih i regenerativnih proizvoda

Cijeli postupak traje oko 60-90 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon PRP terapije:
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
    'cijena': `Cijena PRP terapije:
- Pojedinačni tretman: 600 kn
- Paket od 3 tretmana: 1.500 kn
- Paket od 6 tretmana: 2.800 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman PRP terapijom
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 