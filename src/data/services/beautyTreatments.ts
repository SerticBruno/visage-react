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
  isPopular?: boolean;
  isNew?: boolean;
}

export const beautyTreatments: Service = {
  id: 'beauty-tretmani',
  title: 'Beauty tretmani',
  akuzativTitle: 'beauty tretmanima',
  description: 'Luksuzni beauty tretmani za potpuno opuštanje i njegu kože',
  longDescription: `Beauty tretmani su luksuzni tretmani za lice i tijelo koji pružaju potpuno opuštanje, duboku njegu i revitalizaciju kože. Ova premium iskustva kombinira najkvalitetnije proizvode s profesionalnim tehnikama za maksimalne rezultate.

Kroz pažljivo planirane tretmane, beauty tretmani pružaju duboku hidrataciju, poboljšanje tonusa kože i potpuno opuštanje. Svaki tretman je jedinstveno iskustvo koje kombinira terapeutske koristi s luksuznim ambijentom.

Beauty tretmani su idealni za sve tipove kože i pružaju trenutne rezultate opuštanja i osvježavanja. Posebno su učinkoviti za dehidriranu kožu, umornu kožu i osobe koje traže premium iskustvo njegovanja.

U Visage studiju nudimo različite vrste beauty tretmana, prilagođene vašim potrebama i željama. Svaki tretman je pažljivo planiran za optimalne rezultate i potpuno opuštanje.`,
  benefits: [
  ],
  image: '/images/services/socialmedia_peelings_combined.webp',
  heroImage: '/images/services/eyebrows-eyelashes-visage-estetski-studio.webp',
  metaDescription: 'Profesionalni beauty tretmani u VISAGE studiju u Siska. Luksuzni tretmani za lice i tijelo s premium proizvodima. Potpuno opuštanje i njega kože.',
  metaKeywords: 'beauty tretmani, njega kože, opuštanje, estetski studio Sisak, VISAGE studio, luksuzni tretmani, hidratacija kože',
  tags: ['beauty-tretmani', 'opuštanje', 'njega-kože', 'luksuzni-tretmani', 'hidratacija'],
  pricingCategory: 'Beauty Tretmani',
  relatedServices: ['kemijski-piling', 'mezoterapija', 'skin-boosteri'],
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
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
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
    'tijek-zahvata': `Tretman lica je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

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
    description: `Dermaplaning – neinvazivni mehanički piling u kojem se nježno uklanjaju površinski slojevi kože, uključujući i sitne dlačice. Ovaj tretman uklanja višak površinskih stanica kože i daje blistav ten.

Dermaplaning sa Circadijom predstavlja najnapredniji protokol svoje vrste. Temeljen na višegodišnjoj Circadia ekspertizi protokola te omogućuje najnaprednije dostupne rezultate na tržištu.

Circadia dermaplaning je poseban i drugačiji od ostalih tehnika dermaplaninga koje se nude na tržištu – koristimo specijalne vrste nožića (made in USA) i posebne protokole koji daju najbolje moguće rezultate ove tehnike!`,
    duration: '60 min',
    price: '45 €',
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
    description: `Marshmallow Facial – Circadia kozmetički protokol s Marshmallow Whip Hydrating maskom.

Maska hidratizira, a ljekoviti i umirujući biljni sastojci poboljšavaju opće zdravlje kože.`,
    duration: '75 min',
    price: '55 €',
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
    isNew: true
  },
  {
    id: 'firming-peptide-facial',
    title: 'Firming Peptide Facial',
    description: `Firming Peptide Facial – Circadia kozmetički potokol s Firming Peptide maskom koja pruža zatezanje i učvršćivanje kože.

Maska kombinira najnoviju tehnologija u području peptida, antioksidansa i znanosti o regeneraciji kože, rezultirajući mikrocirkulacijom, detoksikacijom te trenutnim zatezanjem i učvršćivanjem kože.`,
    duration: '90 min',
    price: '65 €',
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

7. Aplikacija Light Day Sunscreen Broad Spectrum SPF 37 kreme

UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!`,
    aftercare: `Nakon Firming Peptide Facial tretmana:
- Redovito koristiti SPF zaštitu
- Koristiti blage proizvode za njegu
- Izbjegavati agresivne proizvode 5-7 dana
- Redovite tretmane za održavanje rezultata
- Piti dovoljno vode`,
    isPopular: true
  },
  {
    id: 'signature-dermaplaning-facial',
    title: 'Signature Dermaplaning Facial',
    description: `Signature Dermaplaning Facial – Circadia kozmetički protokol koji koristi tehniku dermaplaninga i Marshmallow Whip Hydrating masku.

Terapeutski piling koji ostavlja vašu kožu sjajnom i glatkom.

Maska hidratizira, a ljekoviti i umirujući biljni sastojci poboljšavaju opće zdravlje kože.`,
    duration: '90 min',
    price: '75 €',
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
    isPopular: true
  },
  {
    id: 'beyond-botox-facial',
    title: 'Beyond Botox Facial',
    description: `CIRCADIA Beyond Botox Facial – Circadia kozmetički potokol koji koristi tehniku dermaplaninga i Firming Peptide masku za zatezanje i učvršćivanje.

Vaša tajna za čvršću i blistaviju kožu.

Maska kombinira najnoviju tehnologija u području peptida, antioksidansa i znanosti o regeneraciji kože, rezultirajući mikrocirkulacijom, detoksikacijom te trenutnim zatezanjem i učvršćivanjem kože.`,
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

POKLON: Post Peel Home Care

UPOZORENJE: Prilikom sušenja maska pruža osjećaj zatezanja!`,
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