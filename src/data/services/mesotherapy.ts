import { Service } from './types';

export const mesotherapy: Service = {
  title: 'Mezoterapija',
  description: 'Napredna mezoterapija za revitalizaciju kože',
  longDescription: 'Mezoterapija je minimalno invazivna procedura koja uključuje injekciju koktela vitamina, minerala i drugih aktivnih sastojaka direktno u srednji sloj kože. Ova metoda pomaže u revitalizaciji kože i rješavanju specifičnih problema.',
  benefits: [
    'Duboka hidratacija kože',
    'Poboljšava ton i sjaj kože',
    'Smanjuje fine linije',
    'Poboljšava elastičnost kože',
    'Potiče proizvodnju kolagena'
  ],
  image: '/images/services/botox-face-girl.webp',
  heroImage: '/images/services/Mesoterapia-transdermica-facial.webp',
  metaDescription: 'Napredna mezoterapija u VISAGE studiju. Revitalizirajte svoju kožu uz pomoć injekcija vitamina i minerala. Vidljivi rezultati nakon prvog tretmana.',
  metaKeywords: 'mezoterapija, injekcije vitamina, revitalizacija kože, estetski studio Sisak, VISAGE studio',
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
    'opis-zahvata': `Mezoterapija je minimalno invazivna procedura koja uključuje injekciju koktela vitamina, minerala i drugih aktivnih sastojaka direktno u srednji sloj kože. Ova metoda pomaže u revitalizaciji kože i rješavanju specifičnih problema.

U VISAGE studiju koristimo najkvalitetnije koktele za mezoterapiju, prilagođene vašem tipu kože i specifičnim potrebama. Postupak je siguran i učinkovit, a rezultati su vidljivi već nakon prvog tretmana.`,
    'kandidati': `Mezoterapija je idealna za osobe koje žele:
- Duboku hidrataciju kože
- Poboljšati ton i sjaj kože
- Smanjiti fine linije
- Poboljšati elastičnost kože
- Potaknuti proizvodnju kolagena

Nije preporučljiva za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe koje su nedavno prošle kroz agresivne tretmane kože
- Osobe s alergijama na sastojke koktela`,
    'priprema': `Prije mezoterapije potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg koktela za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'tijek-zahvata': `Tijek mezoterapije uključuje:
1. Čišćenje kože
2. Primjena anestetika (po potrebi)
3. Injekcija koktela u srednji sloj kože
4. Primjena umirujućih i regenerativnih proizvoda
5. Primjena zaštitnog krema

Cijeli postupak traje oko 30-45 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon mezoterapije:
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
    'cijena': `Cijena mezoterapije:
- Pojedinačni tretman: 500 kn
- Paket od 3 tretmana: 1.300 kn
- Paket od 6 tretmana: 2.400 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman mezoterapijom
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 