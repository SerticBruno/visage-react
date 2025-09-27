import { Service } from './types';

export const chemicalPeel: Service = {
  id: 'kemijski-piling',
  title: 'Kemijski Piling',
  akuzativTitle: 'kemijskim pilingom',
  description: 'Otkrijte tajnu blistave kože uz TOSKANI pilinge',
  longDescription: `Želite li postići <strong>ujednačen ten</strong>, <strong>smanjiti vidljivost pora</strong> ili se riješiti <strong>nepravilnosti</strong>? <strong>TOSKANI kemijski piling</strong> pružit će vam upravo to, <strong>svjež, zdrav i mladenački izgled kože</strong>.

<strong>Kemijski piling</strong> je tehnika koja se koristi za poboljšanje izgleda kože putem <strong>kontroliranog kemijskog oštećenja</strong> određenih slojeva epiderme ili dermisa.

Ova tehnika je <strong>ključan korak u njezi kože</strong>, jer <strong>uklanja mrtve stanice</strong> s površine kože, <strong>potiče regeneraciju stanica</strong> te <strong>smanjuje pojavu nepravilnosti</strong> poput hiperpigmentacija, preranog starenja, akni i proširenih pora.

Koristi se najčešće u <strong>sinergiji s drugim estetskim tretmanima</strong>: <a href="/usluge/mezoterapija">mezoterapija</a>, <a href="/usluge/prp">PRP tretman</a> i <a href="/usluge/skin-boosteri">skin boosteri</a>.

U <strong>Visage studiju</strong> prilagođavamo svaki tretman vašim <strong>individualnim potrebama</strong> koristeći kombinaciju <strong>nježnih kiselina</strong> kako bismo postigli <strong>optimalne rezultate</strong>.`,
  benefits: [
  ],
  image: '/images/services/kemijski-piling/tretman-kemijski-piling.webp',
  heroImage: '/images/services/kemijski-piling/socialmedia_peelings_combined.webp',
  metaDescription: 'Profesionalni kemijski piling u VISAGE studiju u Siska. Obnovite svoju kožu uz pomoć naprednih kemijskih pilinzi TOSKANI. Rezultati odmah vidljivi.',
  metaKeywords: 'kemijski piling, piling lica, obnova kože, estetski studio Sisak, VISAGE studio, TOSKANI piling, kemijski piling Sisak',
  tags: ['kemijski-piling', 'piling', 'obnova-kože', 'nježni-tretmani'],
  pricingCategory: 'Kemijski Piling',
  relatedServices: ['mezoterapija', 'prp', 'skin-boosteri'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaStar',
      image: '/images/services/kemijski-piling/kemijski-piling-prednosti-estetski-studio-sisak.jpg',
      focalPoint: '30% 25%'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/kemijski-piling/kemijski-piling-toskani-woman-estetski-studio.jpg'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaClipboard',
      image: '/images/services/kemijski-piling/kemijski-piling-priprema-estetski-studio-sisak.jpg',
      focalPoint: '50% 25%'
    },
    { 
      id: 'tijek-tretmana', 
      label: 'Tijek tretmana', 
      icon: 'FaRegClock',
      image: '/images/services/kemijski-piling/toskani-bg.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaHome',
      image: '/images/services/kemijski-piling/kemijski-piling-toskani-estetski-studio.png'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti kemijskog pilinga:
- Uklanja mrtve stanice i nečistoće s kože
- Poboljšava izgled kože sklone aknama, poboljšava čvrstoću i zaglađuje teksturu kože
- Ublažava hiperpigmentacije
- Umanjuje učinke fotostarenja
- Minimalno neugodan tretman`,
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
    'tijek-tretmana': `Tretman kemijskim pilingom je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Priprema kože - Čišćenje kože s <a href="/katalog?product=1">Toskani Energizing Cleanserom</a>, odmašćivanje kože i zaštita madeža.

2. Priprema kemijskog pilinga - Nanošenje kemijskog pilinga, praćenje reakcije kože i neutralizacija pilinga.

3. Završna njega - Nanošenje Toskani Antistress maske koja ima umirujuća svojstva za kožu i držanje iste 10ak minuta, nanošenje <a href="/katalog?product=8">Toskani Total Recovery gela</a> koji pomaže regeneraciji kože i nanošenje kreme sa zaštitnim faktorom <a href="/katalog?product=39">Toskani Sun Shiel-D SPF50+</a>.

4. Preporuka za kućnu njegu - Svim klijentima koji kod nas rade kemijski piling preporučujemo korištenje <a href="/katalog?product=8">Toskani Total Recovery gela</a> i obavezno je korištenje kreme sa zaštitnim faktorom <a href="/katalog?product=39">Toskani Sun Shiel-D SPF50+</a>.`,
    'oporavak': 'Oporavak može trajati nekoliko dana, uz blago crvenilo i ljuštenje kože. Nuspojave mogu uključivati:\n1. Crvenilo\n2. Osjetljivost\n3. Peckanje\n4. Stvaranje ljuskica\n5. Perutanje kože',
    'nakon-tretmana': `Za najbolje rezultate preporučuje se protokol:

Napraviti 4 do 6 tretmana u razmaku od 2 do 3 tjedna, ovisno o stanju kože, te ponavljanje svakih 3 do 6 mjeseci.

Nakon kemijskog pilinga preporučuje se:

- Ne nanosite kozmetiku s retinolom minimalno tjedan dana nakon tretmana
- Ne koristiti grube ručnike tijekom skincare rutine
- Ne koristiti mehaničke pilinge nakon tretmana minimalno tjedan dana
- Izbjegavajte izlaganje suncu i solariju
- Ne skidati ljuskice i pustiti kožu da se sama obnovi
- Korištenje <a href="/katalog?product=8">Toskani Recovery gela</a>
- Korištenje kreme sa zaštitnim faktorom <a href="/katalog?product=39">Toskani Sun Shiel-D SPF50+</a>`,
    'cijena': 'Cijena ovisi o tipu pilinga i broju potrebnih tretmana.'
  }
}; 