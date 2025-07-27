import { Service } from './types';

export interface BeautyTreatment {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  benefits: string[];
  suitableFor: string[];
  preparation: string;
  procedure: string;
  aftercare: string;
  keyBenefits?: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export const beautyTreatments: Service = {
  id: 'beauty-tretmani',
  title: 'Beauty tretmani',
  akuzativTitle: 'beauty tretmanima',
  description: 'Otkrijte Timeless beauty s Circadia profesionalnim kozmetičkim protokolima',
  longDescription: `<strong>Circadia</strong> je profesionalna marka za njegu kože koji koristi prirodu i znanost putem prirodnih cirkadijalnih ritmova kože i tijela.

Srž koncepta je <strong>kronobiologija</strong>, znanost o obrani kože od vanjskih oštećenja tijekom dana te poticanju unutarnjih mehanizama popravka tijekom sna.

<strong>Circadia formulacije</strong> kombiniraju čiste biljke, matične stanice, vitamine druge generacije i inovativnu tehnologiju peptida kako bi postigle optimalno zdravlje i ljepotu kože.

<strong>Circadia specijalizirani tretmani</strong> koriste ove tehnologije kako bi riješili mnoga stanja kože, uključujući starenje, akne, dehidraciju, pigmentaciju i rozaceju.

Koristi se najčešće u <strong>sinergiji s drugim estetskim tretmanima</strong>: <a href="/usluge/fototerapija">Dermalux LED fototerapija</a>, <a href="/usluge/kemijski-piling">kemijski piling</a> i <a href="/usluge/mezoterapija">mezoterapija</a>.

Uživajte u <strong>hidratiziranoj i zdravoj koži</strong> te zaštitite kožu tijekom dana, a popravite preko noći. Naručite se na <strong>beauty tretman</strong> u <strong>Visage studiju</strong>.`,
  benefits: [
  ],
  image: '/images/services/beauty-tretmani/circadia-beauty-tretmani-visage-estetski-studio.png',
  heroImage: '/images/services/eyebrows-eyelashes-visage-estetski-studio.webp',
  metaDescription: 'Profesionalni beauty tretmani u VISAGE studiju u Siska. Luksuzni tretmani za lice i tijelo s premium proizvodima. Potpuno opuštanje i njega kože.',
  metaKeywords: 'beauty tretmani, njega kože, opuštanje, estetski studio Sisak, VISAGE studio, luksuzni tretmani, hidratacija kože',
  tags: ['beauty-tretmani', 'opuštanje', 'njega-kože', 'luksuzni-tretmani', 'hidratacija'],
  pricingCategory: 'Beauty Tretmani',
  relatedServices: ['foto-terapija', 'kemijski-piling', 'mezoterapija'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/beauty-treatment-visage-estetski-studio.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/beauty-treatment-visage-estetski-studio.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/beauty-treatment-visage-estetski-studio.webp'
    },
    { 
      id: 'tijek-tretmana', 
      label: 'Tijek tretmana', 
      icon: 'FaRegClock',
      image: '/images/services/beauty-treatment-visage-estetski-studio.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/beauty-treatment-visage-estetski-studio.webp'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/beauty-treatment-visage-estetski-studio.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti beauty tretmana:
- Potpuno opuštanje i osvježavanje
- Duboka hidratacija kože
- Poboljšanje tonusa i teksture kože
- Profesionalna masaža lica
- Luksuzno iskustvo u premium ambijentu
- Korištenje najkvalitetnijih proizvoda
- Trenutni rezultati opuštanja
- Sigurna i nježna metoda
- Prilagođeno individualnim potrebama
- Kompletna njega kože`,
    'kandidati': `Beauty tretmani su idealni za osobe koje žele:
- Potpuno opuštanje i osvježavanje
- Duboku njegu i hidrataciju kože
- Poboljšati tonus i teksturu kože
- Doživjeti luksuzno iskustvo njegovanja
- Profesionalnu masažu lica
- Koristiti premium proizvode za njegu

Pogodni su za sve tipove kože i dobne skupine, posebno za:
- Osobe koje traže opuštanje i osvježavanje
- Osobe s dehidriranom kožom
- Osobe koje žele premium iskustvo
- Osobe koje traže redovitu njegu kože`,
    'priprema': `Prije beauty tretmana potrebno je:
1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Odabir odgovarajućeg tretmana prema vašim potrebama
3. Upute za pripremu prije tretmana

Dan prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože
- Dolaziti opušteni i spremni za tretman`,
    'tijek-tretmana': `Tretman lica je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje.

2. Priprema kože - Dubinsko čišćenje kože, primjena pripremnih proizvoda, oznaka područja za tretman.

3. Primjena tretmana - Precizna primjena proizvoda, profesionalna masaža lica, maske i posebni tretmani.

4. Završna njega - Primjena regenerativnih seruma, zaštitnog krema sa SPF faktorom i finalna masaža.

5. Preporuka za kućnu njegu - Preporučujemo korištenje blagih proizvoda za čišćenje, hidratantnih kremova i obavezno korištenje SPF 50+ zaštite.`,
    'oporavak': `Oporavak je minimalan, uz osvježavanje i opuštanje kože. Nuspojave mogu uključivati:
1. Osvježavanje kože
2. Poboljšana hidratacija
3. Opuštanje mišića lica
4. Poboljšan tonus kože

Potrebno je izbjegavati izravno sunce 24 sata i koristiti blage proizvode za njegu kože.`,
    'nakon-tretmana': `Za najbolje rezultate se preporučuje protokol:

Nakon beauty tretmana važno je:

- Zaštita od sunca - Obavezno koristite kremu sa zaštitnim faktorom SPF 50+ i izbjegavajte izravno izlaganje suncu 24 sata.

- Njega kože - Koristite blage proizvode za čišćenje i hidrataciju kože, izbjegavajte agresivne proizvode.

- Redovito praćenje - Pratite stanje kože i javite se ako primijetite bilo kakve neobične reakcije.

- Kontinuirana njega - Redovito koristite preporučene proizvode za njegu za održavanje rezultata.

- Hidratacija - Piti dovoljno vode za optimalnu hidrataciju kože.`,
    'cijena': `Cijena beauty tretmana ovisi o tipu tretmana i trajanju. Naši beauty tretmani uključuju:

- Dermaplaning - Čišćenje lica, dermaplaning, umirujuća maska
- Masaža lica - Profesionalna masaža lica u trajanju od 30 min
- Firming Peptide Facial - Čišćenje lica, maska, serum, krema, spf
- Marshmallow Facial - Čišćenje lica, maska, serum, krema, spf
- Signature Dermaplaning Facial - Premium tretman s enzimskim pilingom
- Beyond Botox Facial - Napredni tretman s kemijskim pilingom

Za optimalne rezultate preporučujemo redovite tretmane svakih 4-6 tjedana. Za detaljne informacije o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
};

export const individualBeautyTreatments: BeautyTreatment[] = [
  {
    id: 'dermaplaning',
    title: 'Dermaplaning',
    description: `Neinvazivni mehanički piling u kojem se nježno uklanjaju površinski slojevi kože, uključujući i sitne dlačice. Ovaj tretman uklanja višak površinskih stanica kože i daje blistav ten.

Dermaplaning sa Circadijom predstavlja najnapredniji protokol svoje vrste. Temeljen na višegodišnjoj Circadia ekspertizi protokola te omogućuje najnaprednije dostupne rezultate na tržištu. 

Circadia dermaplaning je poseban i drugačiji od ostalih tehnika dermaplaninga koje se nude na tržištu - koristimo specijalne vrste nožića (made in USA) i posebne protokole koji daju najbolje moguće rezultate ove tehnike!

Kako izgleda tretman:

Čišćenje lica sa Circadia proizvodima za čišćenje lica
Dermaplaning
Aplikacija Snow Algae & Spirulina Cooling Mask
Maska se suši 10 do 20 minuta
Uklanjanje maske
Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    duration: '60 min',
    price: '70 EUR',
    image: '/images/services/beauty-tretmani/dermaplaning-visage-estetski-studio-sisak.webp',
    benefits: [
      'Neinvazivni mehanički piling',
      'Uklanjanje površinskih slojeva kože',
      'Uklanjanje sitnih dlačica',
      'Blistav ten',
      'Poboljšanje apsorpcije proizvoda',
      'Glatka i sjajna koža'
    ],
    suitableFor: [
      'Sve tipove kože',
      'Osobe s grubom kožom',
      'Osobe koje žele blistav ten',
      'Priprema za druge tretmane',
      'Redovita njega kože'
    ],
    preparation: `Prije dermaplaning tretmana potrebno je:
- Dolaziti s čistim licem bez make-upa
- Izbjegavati izlaganje suncu 24 sata prije tretmana
- Prekinuti korištenje retinol proizvoda 3-5 dana prije
- Dolaziti opušteni i spremni za tretman`,
    procedure: `1. Čišćenje lica sa Circadia proizvodima za čišćenje lica

2. Dermaplaning - Precizno uklanjanje površinskih slojeva kože

3. Aplikacija Snow Algae & Spirulina Cooling Mask

4. Maska se suši 10 do 20 minuta

5. Uklanjanje maske

6. Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    aftercare: `Nakon dermaplaning tretmana važno je:
- Izbjegavati izravno sunce 24-48 sata
- Koristiti blage proizvode za čišćenje
- Redovito koristiti SPF zaštitu
- Izbjegavati agresivne proizvode 3-5 dana
- Piti dovoljno vode za optimalnu hidrataciju`,
    isPopular: true
  },
  {
    id: 'marshmallow-facial',
    title: 'Marshmallow Facial',
    description: `Circadia kozmetički protokol s Marshmallow Whip Hydrating maskom. Maska hidratizira, a ljekoviti i umirujući biljni sastojci poboljšavaju opće zdravlje kože.

Kako izgleda tretman:

Čišćenje lica sa Circadia proizvodima za čišćenje lica
Aplikacija Marshmallow Whip Hydrating Mask
Maska se suši 10 do 20 minuta
Uklanjanje maske
Circadia serum ovisno o tipu i stanju kože
Circadia krema ovisno o tipu i stanju kože
Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    duration: '75 min',
    price: '60 EUR',
    image: '/images/services/beauty-tretmani/marshmallow-visage-estetski-studio-sisak.webp',
    benefits: [
      'Namijenjen svim tipovima kože',
      'Trenutna i intenzivna hidrataciju',
      'Umirujući učinak za kožu',
      'Obnova oštećene kože',
      'Ljekoviti biljni sastojci',
      'Poboljšanje općeg zdravlja kože'
    ],
    suitableFor: [
      'Sve tipove kože',
      'Osobe s dehidriranom kožom',
      'Osobe s oštećenom kožom',
      'Osobe koje traže umirujući učinak',
      'Priprema za posebne prilike'
    ],
    preparation: `Prije Marshmallow Facial tretmana:
- Dolaziti s čistim licem
- Izbjegavati agresivne proizvode 24 sata prije
- Piti dovoljno vode dan prije
- Dolaziti opušteni i spremni za tretman`,
    procedure: `1. Čišćenje lica sa Circadia proizvodima za čišćenje lica

2. Aplikacija Marshmallow Whip Hydrating Mask

3. Maska se suši 10 do 20 minuta

4. Uklanjanje maske

5. Circadia serum ovisno o tipu i stanju kože

6. Circadia krema ovisno o tipu i stanju kože

7. Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    aftercare: `Nakon Marshmallow Facial tretmana:
- Održavati hidrataciju kože
- Koristiti blage proizvode za njegu
- Redovito koristiti SPF zaštitu
- Izbjegavati agresivne proizvode 24 sata
- Piti dovoljno vode`,
    keyBenefits: [
      'Namijenjen koži s vidljivim znakovima starenja, suhoj i gruboj koži, koži s UV oštećenjima',
      'Trenutno zateže i učvršćuje kožu',
      'Služi za detoksikaciju i podizanje kože'
    ],
    isNew: true
  },
  {
    id: 'firming-peptide-facial',
    title: 'Firming Peptide Facial',
    description: `Circadia kozmetički protokol s Firming Peptide maskom koja pruža zatezanje i učvršćivanje kože. 
    
    Maska kombinira najnoviju tehnologiju u području peptida, antioksidansa i znanosti o regeneraciji kože, rezultirajući mikrocirkulacijom, detoksikacijom te trenutnim zatezanjem i učvršćivanjem kože.

Kako izgleda tretman:

Čišćenje lica sa Circadia proizvodima za čišćenje lica
Aplikacija Firming Peptide Mask
Maska se suši 10 do 30 minuta
Uklanjanje maske
Circadia serum ovisno o tipu i stanju kože
Circadia krema ovisno o tipu i stanju kože
Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme

UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!`,
    duration: '90 min',
    price: '60 EUR',
    image: '/images/services/beauty-tretmani/firming-peptide-visage-estetski-studio-sisak.webp',
    benefits: [
      'Namijenjen koži s vidljivim znakovima starenja',
      'Trenutno zateže i učvršćuje kožu',
      'Služi za detoksikaciju i podizanje kože',
      'Mikrocirkulacija kože',
      'Antioksidantna zaštita',
      'Regeneracija kože'
    ],
    suitableFor: [
      'Kožu s vidljivim znakovima starenja',
      'Suhoj i gruboj koži',
      'Koži s UV oštećenjima',
      'Osobe koje traže firming efekt',
      'Priprema za posebne prilike'
    ],
    preparation: `Prije Firming Peptide Facial tretmana:
- Dolaziti s čistim licem
- Prekinuti retinol proizvode 5-7 dana prije
- Izbjegavati izlaganje suncu 24 sata prije
- Dolaziti opušteni i spremni za tretman`,
    procedure: `1. Čišćenje lica sa Circadia proizvodima za čišćenje lica

2. Aplikacija Firming Peptide Mask

3. Maska se suši 10 do 30 minuta

4. Uklanjanje maske

5. Circadia serum ovisno o tipu i stanju kože

6. Circadia krema ovisno o tipu i stanju kože

7. Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    aftercare: `Nakon Firming Peptide Facial tretmana:
- Redovito koristiti SPF zaštitu
- Koristiti blage proizvode za njegu
- Izbjegavati agresivne proizvode 5-7 dana
- Redovite tretmane za održavanje rezultata
- Piti dovoljno vode`,
    keyBenefits: [
      'Namijenjen svim tipovima kože',
      'Daje koži trenutnu i intenzivnu hidrataciju',
      'Umirujući učinak za kožu i obnova oštećene kože'
    ],
    isPopular: true
  },
  {
    id: 'signature-dermaplaning-facial',
    title: 'Signature Dermaplaning Facial',
    description: `Circadia kozmetički protokol koji koristi tehniku dermaplaninga i Marshmallow Whip Hydrating masku. 
    
    Terapeutski piling koji ostavlja vašu kožu sjajnom i glatkom. Maska hidratizira, a ljekoviti i umirujući biljni sastojci poboljšavaju opće zdravlje kože. Premium tretman koji kombinira najbolje od dermaplaninga i hidratacije.

Kako izgleda tretman:

Čišćenje lica sa Circadia proizvodima za čišćenje lica
Dermaplaning
Caviar Lime & Passionfruit Enzym piling
Aplikacija Marshmallow Whip Hydrating Mask
Maska se suši 10 do 20 minuta
Uklanjanje maske
Circadia serum ovisno o tipu i stanju kože
Circadia krema ovisno o tipu i stanju kože
Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    duration: '90 min',
    price: '100 EUR',
    image: '/images/services/beauty-tretmani/sitgnature-dermaplaning-visage-estetski-studio-sisak.webp',
    benefits: [
      'Namijenjen svim tipovima kože',
      'Daje koži trenutnu i intenzivnu hidrataciju',
      'Umirujući učinak za kožu i obnova oštećene kože',
      'Terapeutski piling',
      'Sjajna i glatka koža',
      'Poboljšanje općeg zdravlja kože'
    ],
    suitableFor: [
      'Sve tipove kože',
      'Osobe koje traže premium iskustvo',
      'Osobe s grubom kožom',
      'Priprema za posebne prilike',
      'Redovita njega kože'
    ],
    preparation: `Prije Signature Dermaplaning Facial tretmana:
- Dolaziti s čistim licem
- Prekinuti retinol proizvode 5-7 dana prije
- Izbjegavati izlaganje suncu 24 sata prije
- Dolaziti opušteni i spremni za tretman`,
    procedure: `1. Čišćenje lica sa Circadia proizvodima za čišćenje lica

2. Dermaplaning

3. Caviar Lime & Passionfruit Enzym piling

4. Aplikacija Marshmallow Whip Hydrating Mask

5. Maska se suši 10 do 20 minuta

6. Uklanjanje maske

7. Circadia serum ovisno o tipu i stanju kože

8. Circadia krema ovisno o tipu i stanju kože

9. Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme`,
    aftercare: `Nakon Signature Dermaplaning Facial tretmana:
- Izbjegavati izravno sunce 48-72 sata
- Koristiti blage proizvode za njegu
- Redovito koristiti SPF zaštitu
- Izbjegavati agresivne proizvode 5-7 dana
- Piti dovoljno vode`,
    keyBenefits: [
      'Namijenjen svim tipovima kože',
      'Daje koži trenutnu i intenzivnu hidrataciju',
      'Umirujući učinak za kožu i obnova oštećene kože'
    ],
    isPopular: true
  },
  {
    id: 'beyond-botox-facial',
    title: 'Beyond Botox Facial',
    description: `Circadia kozmetički protokol koji koristi tehniku dermaplaninga i Firming Peptide masku za zatezanje i učvršćivanje. 
    
    Maska kombinira najnoviju tehnologiju u području peptida, antioksidansa i znanosti o regeneraciji kože, rezultirajući mikrocirkulacijom, detoksikacijom te trenutnim zatezanjem i učvršćivanjem kože.

Kako izgleda tretman:

Čišćenje lica sa Circadia proizvodima za čišćenje lica
Dermaplaning
Kemijski piling laktičnom kiselinom ili enzimski piling
Aplikacija Firming Peptide Mask
Maska se suši 10 do 30 minuta
Uklanjanje maske
Circadia serum ovisno o tipu i stanju kože
Circadia krema ovisno o tipu i stanju kože
Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme

POKLON: Post Peel Home Care`,
    duration: '120 min',
    price: '85 €',
    image: '/images/services/beauty-tretmani/beyond-botox-visage-estetski-studio-sisak.webp',
    benefits: [
      'Namijenjen koži s vidljivim znakovima starenja',
      'Trenutno zateže i učvršćuje kožu',
      'Služi za detoksikaciju i podizanje kože',
      'Čvršća i blistavija koža',
      'Mikrocirkulacija kože',
      'Antioksidantna zaštita'
    ],
    keyBenefits: [
      'Namijenjen koži s vidljivim znakovima starenja, suhoj i gruboj koži, koži s UV oštećenjima',
      'Trenutno zateže i učvršćuje kožu',
      'Služi za detoksikaciju i podizanje kože'
    ],
    suitableFor: [
      'Kožu s vidljivim znakovima starenja',
      'Suhoj i gruboj koži',
      'Koži s UV oštećenjima',
      'Osobe koje traže dramatične rezultate',
      'Priprema za posebne prilike'
    ],
    preparation: `Prije Beyond Botox Facial tretmana:
- Dolaziti s čistim licem
- Prekinuti sve retinol proizvode 7-10 dana prije
- Izbjegavati izlaganje suncu 48 sata prije
- Dolaziti opušteni i spremni za tretman`,
    procedure: `1. Čišćenje lica sa Circadia proizvodima za čišćenje lica

2. Dermaplaning

3. Kemijski piling laktičnom kiselinom ili enzimski piling

4. Aplikacija Firming Peptide Mask

5. Maska se suši 10 do 30 minuta

6. Uklanjanje maske

7. Circadia serum ovisno o tipu i stanju kože

8. Circadia krema ovisno o tipu i stanju kože

9. Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme

POKLON: Post Peel Home Care`,
    aftercare: `Nakon Beyond Botox Facial tretmana:
- Izbjegavati izravno sunce 7-10 dana
- Koristiti blage proizvode za njegu
- Redovito koristiti SPF zaštitu
- Izbjegavati agresivne proizvode 10-14 dana
- Piti dovoljno vode
- Redovite kontrole`,
    isNew: true
  }
]; 