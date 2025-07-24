import { Service } from './types';

export const skinBoosteri: Service = {
  id: 'skin-boosteri',
  title: 'Skin boosteri',
  description: 'Hidratacija i revitalizacija kože',
  longDescription: `Doživite <strong>revolucionarnu metodu hidratacije i revitalizacije kože</strong> s našim <strong>skin booster tretmanima</strong>!

<strong>Skin boosteri</strong> su <strong>inovativni preparati</strong> koji pružaju <strong>dubinsku hidrataciju</strong> i <strong>hranjive tvari koži</strong>, dajući vam <strong>blistav i zdrav izgled</strong>.

Sastoje od <strong>neumrežene hijaluronske kiseline</strong> i dovode do <strong>čvršće i elastičnije kože</strong>.

Već <strong>prvi tjedan nakon tretmana</strong> se mogu vidjeti <strong>trenutačni učinci hidratacije</strong>, dok se <strong>značajniji rezultati</strong> mogu primjetiti <strong>mjesec dana nakon tretmana</strong>.

U <strong>Visage studiju</strong> koristimo <strong>bioremodulator Profhilo</strong> i <strong>biorevitalizator TKN HA3</strong>.

Koristi se najčešće u <strong>sinergiji s drugim estetskim tretmanima</strong>: <a href="/usluge/mezoterapija">mezoterapija</a>, <a href="/usluge/prp">PRP</a> i <a href="/usluge/kemijski-piling">kemijski piling</a>.

Osvježite svoju kožu i otkrijte <strong>snagu hidratacije</strong> sa skin booster tretmanima u <strong>Visage studiju</strong>.`,
  benefits: [
  ],
  image: '/images/services/skinboosteri-hero.webp',
  heroImage: '/images/services/skin-boosters/skin-booster-visage-estetski-studio-sisak.jpeg',
  metaDescription: 'Profesionalni skin boosteri u VISAGE studiju u Siska. Duboka hidratacija i revitalizacija kože uz pomoć naprednih skin booster tretmana. Vidljivi i dugotrajni rezultati.',
  metaKeywords: 'skin boosteri, hidratacija kože, revitalizacija kože, estetski studio Sisak, VISAGE studio, TKN HA3, Profhilo, skin booster tretmani',
  tags: ['skin-boosteri', 'hidratacija', 'revitalizacija', 'minimalno-invazivni', 'mikroinjekcije'],
  pricingCategory: 'Skin Boosteri',
  relatedServices: ['mezoterapija', 'prp', 'kemijski-piling'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/skin-boosters/skin-boosteri-prednosti-visage-estetski-studio.png'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/skin-boosters/skin-boosteri-kandidati-visage-estetski-studio.png'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/skin-boosters/skin-boosteri-tijek-zahvata-visage-estetski-studio.png'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/skin-boosters/skin-boosteri-oporavak-visage-estetski-studio.png'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/skin-boosters/skin-booster-nakon-tretmana-visage-estetski-studio-sisak.jpeg'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti skin booster tretmana su:

- Potiču dugoročnu hidrataciju
- Potiču obnovu kože
- Potiču proizvodnju kolagena i elastina
- Zaglađuju fine linije i bore
- Poboljšavaju kvalitetu kože
- Poboljšavaju elastičnost i čvstoću kože
- Glatka i nježna koža na dodir`,
    'kandidati': `Skin boosteri su idealni za osobe koje žele:

- Dubinsku hidrataciju kože
- Učvrstiti i poboljšati elastičnost kože
- Potaknuti prirodnu regeneraciju stanica
- Smanjiti fine linije i bore
- Poboljšati kvalitetu kože

Pogodni su za sve tipove kože i dobne skupine, a posebno za:

- Dehidriranu i suhu kožu
- Kožu s finim linijama
- Umornu i opuštenu kožu`,
    'priprema': `Prije tretmana skin boosterima potrebno je:

1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Preporuka odgovarajućeg skin boostera za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate`,
    'tijek-zahvata': `Tretman skin boosterima je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Priprema kože - Čištimo kožu s <a href="/katalog?product=1">Toskani Energizing Cleanserom</a> i dezinficiramo mjesta gdje ćemo injektirati skin booster. Na mjesta injektiranja nanosimo anestetsku kremu kako bi tretman bio što ugodniji.

2. Primjena skin boostera - Skin boosteri se injektiraju u 4, odnosno 5 mjesta sa svake strane lica.

3. Završna njega - Mjesta uboda masiramo <a href="/katalog?product=8">Toskani Total Recovery gelom</a> i nanosimo kremu sa zaštitnim faktorom <a href="/katalog?product=39">Toskani Sun Shiel-D SPF 50+</a>.

4. Preporuka za kućnu njegu - Preporučujemo korištenje odgovarajućih proizvoda iz Toskani Pro Age linije, kako bi rezultati bili što dugotrajniji, te korištenje kreme sa zaštitnim faktorom <a href="/katalog?product=39">Toskani Sun Shiel-D SPF 50+</a>.`,
    'oporavak': `Oporavak može trajati do 5 dana, ovisno o mjestu injektiranja.

Nuspojave mogu uključivati:

1. Crvenilo na mjestu injektiranja
2. Hematom na mjestu injektiranja
3. Osjetljivost mjesta injektiranja`,
    'nakon-tretmana': `Za najbolje rezultate se preporučuje protokol:

Napraviti 2 ili 3 tretmana u razmaku od mjesec dana, ovisno o stanju kože, te ponavljati tretman svakih 3 do 6 mjeseci.

Nakon tretmana skin boosterima važno je:

- Odgoditi trening iduća 2 dana
- Koristiti pravilnu kućnu njegu kako bi rezultati bili što dugotrajniji
- Piti dovoljno vode za optimalnu hidrataciju kože`,
    'cijena': `Cijena skin booster tretmana ovisi o tipu boostera i broju potrebnih tretmana. Naši skin boosteri uključuju:

- TKN HA3 - Napredni skin booster za duboku hidrataciju
- Profhilo - Premium skin booster za revitalizaciju
- RRS HA Long Lasting - Dugotrajni skin booster

Za optimalne rezultate preporučujemo seriju od 2-3 tretmana s intervalima od 4-6 tjedana. Za detaljne informacije o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 