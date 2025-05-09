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
- Dugotrajne rezultate`,
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
    'tijek-zahvata': `Dermalni fileri su napredna metoda za volumizaciju i obnavljanje kontura lica. Tretman se provodi u nekoliko faza, gdje svaka faza ima svoju specifičnu svrhu i trajanje. Naši stručnjaci prate svaki korak postupka kako bi osigurali optimalne rezultate i sigurnost tretmana.

1. Konzultacija i procjena (10 min) - Detaljna analiza stanja kože, odabir odgovarajućeg filera, plan tretmana i objašnjenje postupka. Ova faza je ključna za postizanje prirodnih i dugotrajnih rezultata.

2. Priprema kože (15 min) - Čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za sigurnu primjenu filera.

3. Primjena filera (20-30 min) - Precizne injekcije u odabrana područja, kontinuirano praćenje rezultata, prilagodba količine filera i masiranje. Ova faza zahtijeva maksimalnu preciznost i stručnost.

4. Završni koraci (10 min) - Primjena umirujućih proizvoda, zaštitnog krema, fotografiranje prije/nakon i detaljne upute za naknadnu njegu. Ova faza osigurava optimalno oporavak i dugotrajnost rezultata.

5. Naknadna kontrola (5 min) - Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata i prevenciju komplikacija.`,
    'oporavak': 'Nakon tretmana:\n- Blago crvenilo koje nestaje u roku od 24h\n- Moguća osjetljivost kože\n- Potrebno je izbjegavati sunčanje\n- Pratiti upute terapeuta za njegu',
    'mjere-opreza': 'Mjere opreze su važne za održavanje rezultata i prevenciju komplikacija.',
    'cijena': 'Cijena tretmana dermalnim filerima ovisi o mnogim faktorima, uključujući lokaciju, stručnost i količinu filera.'
  },
  treatmentSteps: [
    {
      title: 'Konzultacija i procjena',
      duration: '10 min',
      description: 'Detaljna analiza stanja kože, odabir odgovarajućeg filera, plan tretmana i objašnjenje postupka. Ova faza je ključna za postizanje prirodnih i dugotrajnih rezultata.'
    },
    {
      title: 'Priprema kože',
      duration: '15 min',
      description: 'Čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože. Ova faza osigurava optimalne uvjete za sigurnu primjenu filera.'
    },
    {
      title: 'Primjena filera',
      duration: '20-30 min',
      description: 'Precizne injekcije u odabrana područja, kontinuirano praćenje rezultata, prilagodba količine filera i masiranje. Ova faza zahtijeva maksimalnu preciznost i stručnost.'
    },
    {
      title: 'Završni koraci',
      duration: '10 min',
      description: 'Primjena umirujućih proizvoda, zaštitnog krema, fotografiranje prije/nakon i detaljne upute za naknadnu njegu. Ova faza osigurava optimalno oporavak i dugotrajnost rezultata.'
    },
    {
      title: 'Naknadna kontrola',
      duration: '5 min',
      description: 'Provjera rezultata, savjeti za njegu i planiranje sljedećeg tretmana. Ova faza je važna za održavanje rezultata i prevenciju komplikacija.'
    }
  ]
};