import { Service } from './types';

export const chemicalPeel: Service = {
  id: 'kemijski-piling',
  title: 'Kemijski Piling',
  description: 'Otkrijte tajnu blistave kože uz TOSKANI pilinge',
  longDescription: `TOSKANI kemijski piling pružit će vam upravo to, svjež, zdrav i mladenački izgled kože.

Kemijski piling je tehnika koja se koristi za poboljšanje izgleda kože putem kontroliranog kemijskog oštećenja određenih slojeva epiderme ili dermisa.

Ova tehnika je ključan korak u njezi kože, jer uklanja mrtve stanice s površine kože, potiče regeneraciju stanica te smanjuje pojavu nepravilnosti poput hiperpigmentacija, preranog starenja, akni i proširenih pora.

Koristi se najčešće u sinergiji s drugim estetskim tretmanima: mezoterapija, PRP tretman i skinboosteri.

U Visage studiju prilagođavamo svaki tretman vašim individualnim potrebama koristeći kombinaciju nježnih kiselina kako bismo postigli optimalne rezultate.`,
  benefits: [
  ],
  image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp',
  heroImage: '/images/services/kemijski-piling/toskani-bg.webp',
  metaDescription: 'Profesionalni kemijski piling u VISAGE studiju u Siska. Obnovite svoju kožu uz pomoć naprednih kemijskih pilinzi TOSKANI. Rezultati odmah vidljivi.',
  metaKeywords: 'kemijski piling, piling lica, obnova kože, estetski studio Sisak, VISAGE studio, TOSKANI piling, kemijski piling Sisak',
  tags: ['kemijski-piling', 'piling', 'obnova-kože', 'nježni-tretmani'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/kemijski-piling/toskani-peelings.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/kemijski-piling/toskani-duosomal.webp'
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/kemijski-piling/kombinirani-pilinzi.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/kemijski-piling/toskani-bg.webp'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd',
      image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti kemijskog pilinga:
- Uklanja mrtve stanice i nečistoće s kože
- Poboljšava izgled kože sklone aknama, poboljšava čvrstoću i zaglađuje teksturu kože
- Ublažava hiperpigmentacije
- Umanjuje učinke fotostarenja
- Minimalno neugodan tretman.`,
    'kandidati': `Kemijski piling je idealan za osobe koje žele:
- Poboljšati ton i teksturu kože
- Smanjiti fine linije i bore
- Ublažiti nepravilnosti od akni
- Ublažiti hiperpigmentacije
- Poboljšati apsorpciju kozmetičkih proizvoda
- Osvježiti i revitalizirati kožu`,
    'priprema': `Prije kemijskog pilinga potrebno je:
1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Preporuka odgovarajućeg tipa pilinga za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože (npr. retinol)
- Ne smijete laserski uklanjati dlačice`,
    'tijek-zahvata': `Tretman kemijskim pilingom je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Priprema kože - Čišćenje kože s Toskani Energizing Cleanserom, odmašćivanje kože i zaštita madeža.

2. Priprema kemijskog pilinga - Nanošenje kemijskog pilinga, praćenje reakcije kože i neutralizacija pilinga.

3. Završna njega - Nanošenje Toskani Antistress maske koja ima umirujuća svojstva za kožu i držanje iste 10ak minuta, nanošenje Toskani Total Recovery Gela koji pomaže regeneraciji kože i nanošenje kreme sa zaštitnim faktorom Toskani Sun Shiel-D SPF 50+.

4. Preporuka za kućnu njegu - Svim klijentima koji kod nas rade kemijski piling preporučamo korištenje Toskani Total Recovery Gela i obavezno je korištenje kreme sa zaštitnim faktorom Toskani Sun Shiel-D SPF 50+.`,
    'oporavak': 'Oporavak može trajati nekoliko dana, uz blago crvenilo i ljuštenje kože. Nuspojave mogu uključivati:\n- Crvenilo\n- Osjetljivost\n- Peckanje\n- Stvaranje ljuskica\n- Perutanje kože',
    'nakon-tretmana': `Nakon kemijskog pilinga važno je:

- Zaštita od sunca - Obavezno koristite kremu sa zaštitnim faktorom SPF 50+ i izbjegavajte izravno izlaganje suncu.

- Njega kože - Koristite blage proizvode za čišćenje i hidrataciju kože, izbjegavajte agresivne proizvode.

- Izbjegavanje dodatnih tretmana - Tjedan dana nakon pilinga izbjegavajte druge estetske tretmane.

- Redovno praćenje - Pratite stanje kože i javite se ako primijetite bilo kakve neobične reakcije.

- Preporučeni proizvodi - Nastavite koristiti Toskani Total Recovery Gel i Toskani Sun Shiel-D SPF 50+ za optimalne rezultate.`,
    'cijena': 'Cijena ovisi o tipu pilinga i broju potrebnih tretmana.'
  }
}; 