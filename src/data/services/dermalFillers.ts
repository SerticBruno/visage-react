import { Service } from './types';

export const dermalFillers: Service = {
  id: 'dermalni-fileri',
  title: 'Dermalni fileri',
  description: 'Profesionalni dermalni fileri za volumizaciju',
  longDescription: 'Dermalni fileri su napredna metoda za volumizaciju i obnavljanje kontura lica. Koriste se visokokvalitetni proizvodi koji su sigurni i daju prirodne rezultate.',
  benefits: [
    'Volumizacija lica',
    'Popravljanje kontura',
    'Smanjivanje bora',
    'Prirodni izgled',
    'Dugotrajni rezultati'
  ],
  image: '/images/services/TKNHA3_.webp',
  heroImage: '/images/services/botox-face-girl.webp',
  metaDescription: 'Dermalni fileri u VISAGE studiju. Volumizacija i obnavljanje kontura lica. Prirodni i dugotrajni rezultati.',
  metaKeywords: 'dermalni fileri, volumizacija lica, konture lica, estetski studio Sisak, VISAGE studio',
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
    'opis-zahvata': `Dermalni fileri su napredna metoda za volumizaciju i obnavljanje kontura lica. Koriste se visokokvalitetni proizvodi koji su sigurni i daju prirodne rezultate.

U VISAGE studiju koristimo najkvalitetnije dermalne filere, prilagođene vašem tipu kože i specifičnim potrebama. Postupak je siguran i učinkovit, a rezultati su vidljivi odmah nakon tretmana.`,
    'kandidati': `Dermalni fileri su idealni za osobe koje žele:
- Volumizaciju lica
- Popravljanje kontura
- Smanjivanje bora
- Postići prirodan izgled
- Dugotrajne rezultate

Nisu preporučljivi za:
- Osobe s aktivnim infekcijama kože
- Osobe s ozbiljnim kožnim stanjima
- Osobe koje su nedavno prošle kroz agresivne tretmane kože
- Osobe s alergijama na sastojke filera`,
    'priprema': `Prije tretmana dermalnim filerima potrebno je:
1. Konzultacija s našim stručnjacima za procjenu stanja kože
2. Preporuka odgovarajućeg filera za vaš tip kože
3. Preporuka količine filera za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože
- Izbjegavati alkohol i pušenje`,
    'tijek-zahvata': `Tijek tretmana dermalnim filerima uključuje:
1. Čišćenje kože
2. Primjena anestetika
3. Injekcija filera u odabrana područja
4. Masiranje i oblikovanje
5. Primjena zaštitnog krema

Cijeli postupak traje oko 30-60 minuta i provodi se u ugodnom ambijentu našeg studija.`,
    'oporavak': `Nakon tretmana dermalnim filerima:
- Koža može biti osjetljiva i crvenkasta 1-2 dana
- Moguća su mala modrica na mjestima injekcija
- Potrebno je izbjegavati izravno sunce 2 tjedna
- Koristiti blage proizvode za njegu kože
- Izbjegavati intenzivnu fizičku aktivnost 24 sata

Rezultati su vidljivi odmah i traju 6-18 mjeseci, ovisno o tipu filera.`,
    'mjere-opreza': `Važne mjere opreza:
- Izbjegavati izravno sunce 2 tjedna nakon tretmana
- Koristiti zaštitni krem s visokim SPF-om
- Izbjegavati korištenje agresivnih proizvoda za njegu kože
- Ne češati i ne trljati kožu
- Pratiti sve upute naših stručnjaka

U slučaju bilo kakvih nuspojava, odmah nas kontaktirajte.`,
    'cijena': `Cijena tretmana dermalnim filerima:
- Pojedinačni tretman: od 1.500 kn
- Cijena ovisi o:
  - Tipu filera
  - Količini potrebne tvari
  - Područjima koja se tretiraju

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman dermalnim filerima
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za više informacija o cijenama i mogućnostima plaćanja, kontaktirajte nas.`
  }
}; 