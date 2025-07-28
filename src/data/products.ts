export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  marka: string; // Brand field
  productType?: string; // New field for "Tip proizvoda"
  skinType?: string[]; // New field for "Tip kože"
  skinConcern?: string[]; // New field for "Problematika kože"
  image: string;
  price: string;
  oldPrice?: string;
  isPopular?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  isLimited?: boolean;
  features?: string[];
  volume?: string;
  activeIngredients?: string[];
  application?: string[];
  warnings?: string[];
  indications?: string[];
  tags?: string[];
  proTips?: ProTip[]; // New field for PRO TIP accordions
  // Optional properties for slider/card display
  link?: string; // Custom link for the product card
  benefits?: string[]; // Alternative to features for slider display
}

// Pro tip interface for product-specific tips
export interface ProTip {
  title: string;
  description: string;
}

export const productCategories = [
  'Čišćenje lica',
  'Tonik',
  'Piling',
  'Maska',
  'Krema',
  'Serum',
  'Sprej',
  'Okoloočna njega',
  'Zaštita od sunca',
  'Njega kose',
  'Noćna njega',
  'Ampule'
];

// New product types for "Tip proizvoda"
export const productTypes = [
  'Ampule',
  'Čišćenje lica',
  'Fluid',
  'Kapsule',
  'Krema',
  'Njega vlasišta',
  'Noćna njega',
  'Okoloočna njega',
  'Piling',
  'Serum',
  'Sprej',
  'Tonik',
  'Zaštita od sunca'
];

// New skin types for "Tip kože"
export const skinTypes = [
  'Masna koža',
  'Mješovita koža',
  'Normalna koža',
  'Osjetljiva koža',
  'Suha koža',
  'Zrela koža'
];

// New skin concerns for "Problematika kože"
export const skinConcerns = [
  'Akne i problematična koža',
  'Anti-aging njega',
  'Hiperpigmentacije',
  'Hidratacija',
  'Opadanje kose',
  'Regeneracija'
];

// Brands for "Marke"
export const brands = [
  'TOSKANI',
  'Profhilo'
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Energizing Cleanser',
    description: `Gel sredstvo za čišćenje lica uklanjanja prljavštinu, prašinu i šminku, višak masnoće i mrtvih stanica kože nakupljenih tijekom dana.

Gel za čišćenje lica čuva neke slojeve masnoće na koži što sprječava isušivanje kože. Čisti, pročišćava i tonizira kožu.`,
    category: 'Čišćenje lica',
    marka: 'TOSKANI',
    productType: 'Čišćenje lica',
    skinType: ['Suha koža', 'Normalna koža', 'Mješovita koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije'],
    image: '/images/products/energizing-cleanser-visage-estetski-studio.webp',
    price: '40 EUR',
    volume: '200 ml',
    activeIngredients: ['Cimet', 'Curcuma', 'Đumbir'],
    application: [
      'Nanesite dva puta dnevno, svako jutro i noć, izravno na mokru kožu'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za potpuno čišćenje i pripremu lica, koristite s <a href='#' data-product-id='3'>Toskani Bamboo tonikom</a> i <a href='#' data-product-id='4'>Nutritive pilingom</a>."
      }
    ],
    tags: ['čišćenje lica', 'normalna koža', 'mješovita koža', 'suha koža']
  },
  {
    id: '2',
    title: 'Purifying Cleanser',
    description: `Gel bez ulja koji nježno čisti lice i područje oko očiju. Preporučuje se za mješovitu i masnu kožu.

Ovaj gel za čišćenje uklanja nečistoće i višak sebuma koji začepljuju pore i dovode do stvaranja komedona i prištića na koži sklonoj aknama.

Purifying Cleanser regulira proizvodnju sebuma i ostavlja kožu čistom, svježom, glatkom i mirnom.

Ovaj gel za čišćenje može se koristiti i na tijelu.`,
    category: 'Čišćenje lica',
    marka: 'TOSKANI',
    productType: 'Čišćenje lica',
    skinType: ['Masna koža', 'Mješovita koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/purifying-cleanser-visage-estetski-studio-sisak.webp',
    price: '40 EUR',
    volume: '200 ml',
    activeIngredients: ['Hamamelis Virginiana Extract', 'Mliječna kiselina', 'Purifying Complex', 'Salvia Officinalis Extract', 'Urea'],
    application: [
      'Nanesite jednom dnevno, navečer, izravno na mokru kožu'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolje čišćenje lica sklono aknama, koristite ovaj proizvod 3 puta tjedno u kombinaciji s <a href='#' data-product-id='5'>Toskani Purifying pilingom</a>, koji ćete koristiti 2 puta tjedno."
      }
    ],
    tags: ['čišćenje lica', 'masna koža', 'mješovita koža']
  },
  {
    id: '3',
    title: 'Bamboo Hydratonic',
    description: `Tonik bez ulja koji obnavlja kožu i temeljito čisti uklanjajući sve tragove prljavštine i šminke.

Pogodan je za sve tipove kože.

Ovaj tonik sa svježim mirisom revitalizira i hidratizira kožu za potpuno pročišćen i osvježen osjećaj.

Kombinira visoku koncentraciju biljnih ekstrakata kao što su bambus, limun i naranča, koji su prirodni izvor alfa-hidroksi kiselina.`,
    category: 'Tonik',
    marka: 'TOSKANI',
    productType: 'Tonik',
    skinType: ['Masna koža', 'Mješovita koža', 'Osjetljiva koža', 'Suha koža', 'Normalna koža'],
    skinConcern: ['Akne i problematična koža', 'Anti-aging njega', 'Hiperpigmentacije'],
    image: '/images/products/bamboo-hydratonic-visage-estetski-studio.webp',
    price: '30 EUR',
    volume: '200 ml',
    activeIngredients: ['Aloe Vera Ekstrakt', 'Bambusova voda', 'Ekstrakt javora', 'ekstrakti naranče i limuna'],
    application: [
      'Pošpricajte 2 do 3 puta po čistom licu'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti s Toskani Energizing gelom za čišćenje lica, Toskani Nutritive pilingom, odgovarajućom Toskani kremom, Toskani serumom i Toskani Sun Shiel-D fluidom."
      }
    ],
    tags: ['tonik', 'svi tipovi kože']
  },
  {
    id: '4',
    title: 'Nutritive Scrub',
    description: `Nutritive piling je idealan za suhu i normalnu kožu.

Sadrži ulje Rosa Mochata, sjemenke i vitamin E koji učinkovito zaglađuju kožu i smanjuju nesavršenosti za zdraviji i mlađi izgled.

Nutritive piling ostavlja kožu osvježenom, vidljivo čišću i mekšom uz zdrav sjaj u koji ćete se zaljubiti.`,
    category: 'Piling',
    marka: 'TOSKANI',
    productType: 'Piling',
    skinType: ['Suha koža', 'Normalna koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije'],
    image: '/images/products/nutritive-scrub-visage-estetski-studio.webp',
    price: '45 EUR',
    volume: '200 ml',
    activeIngredients: ['Blueberry Extract', 'Lemon Extract', 'Maple Extract', 'Musk rose oil', 'Orange Extract', 'Vitamin E'],
    application: [
      'Navlažite lice Toskani Bamboo tonikom ili toplom vodom. Nikada ne koristite vruću vodu. Može isušiti i oštetiti kožu',
      'Ulijte piling na vrhove prstiju i nježno trljajte ruke kako biste stvorili pjenušavu pjenu',
      'Pilingom nježno masirajte lice, vrat i dekolte, ravnomjernim kružnim pokretima i usredotočite se na problematična područja kao što su t-zona, brada i kutovi usta',
      'Pričekajte 10-15 minuta i isperite lice mlakom vodom.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom, Toskani serumom i Toskani Sun Shiel-D fluidom."
      }
    ],
    tags: ['piling', 'suha koža', 'normalna koža']
  },
  {
    id: '5',
    title: 'Purifying Scrub',
    description: `Piling na bazi vode koji čisti kožu i preporučuje se za mješovitu i masnu kožu.

Formuliran s marokanskom glinom, ovaj piling uklanja višak ulja i stanica s površinskih slojeva kože pročišćavajući pore. Koža izgleda sjajnije, dok su sjaj i suhoća svedeni na minimum.

Ekstrakt hamamelisa s adstringentnim svojstvima ostavlja osvježenu i ujednačenu kožu.`,
    category: 'Piling',
    marka: 'TOSKANI',
    productType: 'Piling',
    skinType: ['Masna koža', 'Mješovita koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/purifying-scrub-visage-estetski-studio.webp',
    price: '45 EUR',
    volume: '200 ml',
    activeIngredients: ['Hamamelis Virginiana Extract', 'Marokanska glina od lave', 'Vitamin E'],
    application: [
      'Navlažite lice Toskani Bamboo tonikom ili toplom vodom. Nikada ne koristite vruću vodu. Može isušiti i oštetiti kožu',
      'Ulijte piling na vrhove prstiju i nježno trljajte ruke kako biste stvorili pjenušavu pjenu',
      'Pilingom nježno masirajte lice, vrat i dekolte, ravnomjernim kružnim pokretima i usredotočite se na problematična područja kao što su t-zona, brada i kutovi usta',
      'Pričekajte 4 minute i isperite lice mlakom vodom.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Purifying gelom za čišćenje lica, Toskani Purifying kremom, Toskani Purifying Intensive serumom i Toskani Sun Shiel-D fluidom."
      }
    ],
    tags: ['piling', 'masna koža', 'mješovita koža']
  },
  {
    id: '6',
    title: 'Total Recovery Cream',
    description: `Zaštitna, hidratantna i hranjiva krema koja pruža moćnu regeneraciju suhe i normalne kože.

Pruža snažne učinke obnavljanja kože.

Poboljšava izgled oštećene kože.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Regeneracija'],
    image: '/images/products/total-recovery-cream-visage-estetski-studio.webp',
    price: '55 EUR',
    volume: '50 ml',
    activeIngredients: ['Acetil dipeptid-3 aminoheksanoat', 'Acetil heksapeptid-46', 'Allantoin', 'Betaine', 'Bisabolol', 'Diaminopropionoyl Tripeptide-33', 'Resveratrol', 'Tokoferol'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje, a tonizirajte bambusovim hidratonikom',
      'Nanesite kremu za oporavak po cijelom licu i brzo se razmažite',
      'Nanesite proizvod laganim tapkanjem prstiju po površini lica pola minute. Možete koristiti sve prste obje ruke sa svake strane lica. Ne produžujte je silom niti agresivno trljajući kožu',
      'Pustite da to potpuno utone prije nego što nanesete temelj i uobičajeni make-up'
    ],
    tags: ['hidratacija', 'protiv iritacija', 'suha koža', 'normalna koža', 'dnevna njega', 'njega nakon kemijskog pilinga', 'njega nakon mezoterapije']
  },

  {
    id: '7',
    title: 'Total Recovery Gel',
    description: `Obnavljajući, hidratantni i umirujući gel s aloe verom za mješovitu i masnu kožu.

Štiti i vlaži epidermu, pogodujući oporavku osjetljive kože nakon iritacija ili invazivnih tretmana.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža'],
    skinConcern: ['Regeneracija'],
    image: '/images/products/total-recovery-gel-visage-estetski-studio.webp',
    price: '37 EUR',
    volume: '50 ml',
    activeIngredients: ['Aloe Vera Ekstrakt', 'Ekstrakt mimoze Tenuiflora', 'Elastin', 'Hidrolizirani proteini pšenice', 'Kolagen', 'Shea Maslac', 'Vegetable Tensor'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje, a tonizirajte bambusovim hidratonikom',
      'Nanesite gel za oporavak na cijelo lice i brzo ga razmažite',
      'Nanesite proizvod laganim tapkanjem prstiju po površini lica pola minute. Možete koristiti sve prste obje ruke sa svake strane lica. Ne produžujte je silom ili agresivno trljajući kožu',
      'Neka se potpuno upije prije nanošenja podloge i normalne šminke. Preporučuje se nanošenje dva puta dnevno (ujutro i navečer) ili onoliko puta koliko je potrebno'
    ],
    tags: ['hidratacija', 'protiv iritacija', 'masna koža', 'mješovita koža', 'dnevna njega', 'njega nakon kemijskog pilinga', 'njega nakon mezoterapije']
  },
  {
    id: '8',
    title: 'Radiance Daily Cream SPF30+',
    description: `Krema je za svakodnevnu upotrebu koja je namijenjena ispravljanju znakova fotostarenja.

Pogodna je za sve tipove kože.

Sprječava dehidraciju, gubitak sjaja, mlitavost i pojavu bora i mrlja. Osim toga, Radiance dnevna krema ima visoki zaštitni faktor za zaštitu od oštećenja uzrokovanih izlaganjem suncu.

Sadrži liposomske aktivne sastojke za promicanje maksimalne učinkovitosti proizvoda.

Preporučuje se kao njega dehidrirane kože, kože s tamnim mrljama, foto-ostarjeloj koži, koži nejednake pigmentacije.`,
    category: 'Zaštita od sunca',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža'],
    skinConcern: ['Hiperpigmentacije'],
    image: '/images/products/radiance-daily-cream-visage-estetski-studio.webp',
    price: '60 EUR',
    volume: '50 ml',
    application: [
      'Nanesite dva puta dnevno, ujutro i navečer.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Radiance Ultimate serumom, Radiance Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima za ujednačavanje tona kože, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['spf', 'hiperpigmentacije', 'fotostarenje', 'dnevna njega', 'svi tipovi kože']
  },
  {
    id: '9',
    title: 'Antiaging Eye Contour',
    description: `Posebno formuliran hidratantni serum za smanjenje umora, tretiranje bora, osvježavanje područja oko očiju, hidrataciju i umirivanje nježne kože oko očiju. 
    
    Njegovi aktivni sastojci koji djeluju u sinergiji kako bi se oduprli pojavi bora, umanjili bore i već formirane linije. Također pomaže u sprječavanju gubitka čvrstoće, pomaže koži da se vrati u njezino prirodno zdravlje i pruža ukupni učinak pomlađivanja.`,
    category: 'Okoloočna njega',
    marka: 'TOSKANI',
    productType: 'Okoloočna njega',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/anti-ageing-eye-contour-visage-estetski-studio.webp',
    price: '45 EUR',
    volume: '15 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Ekstrakti Ginkgo Bilobe', 'Hijaluronska kiselina', 'Maslinovo ulje', 'Organski silicij'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Nanesite laganim tapkanjem prstiju po području oko očiju',
      'Izbjegavajte direktan kontakt s očima',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['okoloočna njega', 'anti-age', 'ublažavanje finih linija']
  },
  {
    id: '10',
    title: 'Radiance Eye Contour',
    description: 'Učinkovita krema za područje oko očiju koja ublažuje hiperpigmentacije i probleme s mikrocirkulacijom, koji uzrokuju podočnjake. Umanjite vrećice ispod očiju i podočnjake, pomažući drenaži i mikrocirkulaciji područja oko očiju i kapaka.',
    category: 'Okoloočna njega',
    marka: 'TOSKANI',
    productType: 'Okoloočna njega',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Hiperpigmentacije', 'Anti-aging njega'],
    image: '/images/products/radiance-eye-contour-visage-estetski-studio.webp',
    price: '65 EUR',
    volume: '15 ml',
    activeIngredients: ['Ekstrakt Aesculus Hippocastanum', 'Ekstrakti Ginkgo Bilobe', 'Hesperidin Metil halkon', 'Peptidi'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje, a tonizirajte Bamboo hydra tonikom',
      'Nanesite male količine Radiance Mesoserum-a na cijelo lice i brzo se širite',
      'Nanesite proizvod laganim tapkanjem prstiju po površini lica pola minute. Možete koristiti sve prste obje ruke sa svake strane lica. Ne produžujte je silom ili agresivno trljajući kožu',
      'Tek kad je Radiance Mesoserum potpuno suh, možete nanijeti Radiance Eye Contour',
      'Radiance Daily kremu na isti način. Ostavite da se krema upije prije nanošenja bilo koje vrste šminke'
    ],
    tags: ['okoloočna njega', 'hiperpigmentacije', 'posvjetljivanje podočnjaka']
  },
  {
    id: '11',
    title: 'Radiance Ultimate Mesoserum',
    description: `Serum prikladan za sve tipove kože i učinkovit saveznik u borbi protiv hiperpigmentacija i pjega.

Posebno razvijen za ujednačavanje tona kože i smanjenje nesavršenosti: sprječava razvoj novih diskoloracija kože, hidrira, sprječava i uklanja tamne mrlje uzrokovane suncem, vraća sjaj i zdravi izgled koži, poboljšava izgled ožiljaka.

Vaš novi saveznik u borbi protiv hiperpigmentacija s učinkovitim djelovanjem već u 1. mjesecu upotrebe!`,
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Hiperpigmentacije'],
    image: '/images/products/radiance-ultimate-mesoserum-estetski-studio-visage-sisak.jpg',
    price: '77 EUR',
    volume: '30 ml',
    activeIngredients: ['Alfa Arbutin', 'Aspergillus Ferment', 'Azelaična kiselina', 'Azeloglicina', 'Ferulinska kiselina', 'Kojična kiselina', 'Mliječna kiselina', 'Niacinamid', 'Retinol', 'traneksamična kiselina', 'Vitamin C'],
    application: [
      'Nanesite malu količinu seruma dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Daily Radiance kremom SPF30+, Toskani Radiance Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima za ujednačavanje tona kože, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'hiperpigmentacije', 'fotostarenje', 'svi tipovi kože']
  },
  {
    id: '12',
    title: 'Purifying Intensive Serum',
    description: `Serum za isušivanje koji je antibakterijski i vrlo učinkovit protiv mrlja i nesavršenosti.

Ovaj tretman treba povremeno koristiti kako bi se ubrzao nestanak lokaliziranih mrlja, štiteći ih od trenja i bakterija.

Intenzivni serum indiciran je za lokalizirano liječenje mrlja i upala.`,
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Masna koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/purifying-intensive-serum-visage-estetski-studio.webp',
    price: '42 EUR',
    volume: '15 ml',
    activeIngredients: ['Purifying actives', 'Purifying Complex', 'Salicylic Acid'],
    application: [
      'Kada se pojave akne, prištići i miteseri, s vremena na vrijeme tijekom dana lokalno nanesite Purifying Intensive serum preko zone s aktivnim lezijama.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Purifying gelom za čišćenje lica, Toskani Purifying pilingom, Toskani Purifying kremom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji pomažu u rješavanju problematične kože, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'akne', 'prištići', 'lokalizirano liječenje']
  },
  {
    id: '13',
    title: 'Purifying Cream',
    description: `Krema prikladna za masnu i kožu sklonu aknama.

Njeni aktivni sastojci djeluju zajedno kako bi smanjili upalu, smanjili bakterije i regulirali proizvodnju sebuma.

Purifying krema također pomaže koži u borbi protiv slobodnih radikala i pruža vrlo nježan piling uz održavanje razine potrebne hidratacije u koži.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Masna koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/purifying-cream-visage-estetski-studio.webp',
    price: '58 EUR',
    volume: '50 ml',
    activeIngredients: ['Ekstrakt lista Hamamelis virginiana', 'Lactic Acid', 'Purifying actives', 'Purifying Complex', 'Rhodosorus Marinus Extract', 'Salicylic Acid', 'Zinc'],
    application: [
      'Nanesite kremu dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Purifying Intensive serumom, koji nanosite na lokalizirane upale, Toskani Purifying pilingom, Toskani Purifying gelom za čišćenje lica i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji pomažu u rješavanju problematične kože, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['krema', 'akne', 'prištići', 'masna koža']
  },
  {
    id: '14',
    title: 'Skin Architect Mesoserum',
    description: `Serum za popravak i učvršćivanje. Osigurava snažne njegujuće i hidratantne efekte.

Pomaže pri minimiziranju vidljivih znakova starenja.

Skin Architect mesoserum je serum koji rješava jedan od najfrustrirajućijih znakova starenja: opuštenu kožu.`,
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/skin-architect-mesoserum-visage-estetski-studio.webp',
    price: '78 EUR',
    volume: '30 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Prirodni Kolagen', 'Tokoferol', 'Vitamin E'],
    application: [
      'Nanesite malu količinu seruma na cijelo lice dva puta na dan, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Skin Architect kremom, Antiaging Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima s anti-age učincima, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '15',
    title: 'Skin Architect Cream',
    description: `Visoko koncentrirana krema protiv bora koja koristi prirodne sastojke za poboljšanje izgleda finih linija i dubokih bora.

Sadrži medicinsku hijaluronsku kiselinu i acetil heksapeptid-8 kao liposomski biomimetički peptid. Oni, s ostalim sastojcima, pomažu odgoditi učinke starenja na koži i pružaju snažno hidratantno i hranjivo djelovanje.

Koži pruža čvrstoću i elastičnost uz primjetan lifting učinak. Hijaluronska kiselina niske molekularne težine (<100Kda), za dublju i dugotrajniju hidrataciju.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/skin-architect-cream-visage-estetski-studio.webp',
    price: '68 EUR',
    volume: '50 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Organic Silicon', 'Prirodni Kolagen', 'Retinol', 'Shea Maslac', 'Tokoferol', 'Vitamin E'],
    application: [
      'Nanesite malu količinu kreme na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Toskani Skin Architect serumom, Toskani Antiaging Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima s anti-age učincima, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['krema', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '16',
    title: 'Night Reverse Advanced Serum',
    description: `Noćni serum s Total Restoring Complexom, koji poništava štetu od svakodnevnog stresa i aktivira prirodni mehanizam obnove kože.

Pomaže popraviti kožu od oštećenja uzrokovanih sunčevim zračenjem, zagađenjem, temperaturnim promjenama i lošim navikama.

Jača barijeru kože, pogodan je za sve tipove kože, no najviše se preporučuje suhoj i dehidriranoj koži.`,
    category: 'Noćna njega',
    marka: 'TOSKANI',
    productType: 'Noćna njega',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/night-reverse-serum-visage-estetski-studio.png',
    price: '85 EUR',
    volume: '30 ml',
    activeIngredients: ['Probiotici', 'algae extract', 'Byfida ferment Lysate', 'tetrapeptide-26', 'TRC (Total Restoring Complex)'],
    application: [
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite Anti Anging Eye Contour na područje oko očiju.',
      'Nanesite jednu ili dvije kapljice Night Reverse seruma u malu količinu Skin Architect kreme.',
      'Nanesite nježno tapkajući prstima po površini vase kože pola minute. Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
    ],
    tags: ['serum', 'noćna njega', 'anti-age', 'svi tipovi kože', 'suha koža', 'dehidrirana koža']
  },
  {
    id: '17',
    title: 'Glacier Pro Age Serum',
    description: `Lagani serum koji nakon nanošenja pruža osjećaj hidratacije i svježine.

Sadrži Alpsku termalnu vodu i ekstrakt morskog podrijetla koji pomaže zagladiti bore pružajući koži čvrstoću, hidrataciju i elastičnost.

Pomaže u sprječavanju prvih znakova starenja. Jača kožnu barijeru. Pogodan je za biološku dob 20+ godina i sve tipove kože.`,
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/glacier-pro-age-serum-visage-estetski-studio.png',
    price: '70 EUR',
    volume: '30 ml',
    activeIngredients: ['Nicotinamide (B3)', 'Derived from vitamin C', 'Glacier termal water', 'Pseudoalteromona ferment extract'],
    application: [
      'Nanesite malu količinu seruma na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Glacier Pro Age kremom, Radiance Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'anti-age', '20+ godina', 'svi tipovi kože']
  },
  {
    id: '18',
    title: 'Glacier Pro Age Cream',
    description: `Lagana krema koja daje svježi finiš tijekom nanošenja koji se jako dobro razmazuje i brzo upija.

Pomaže u sprječavanju prvih znakova starenja, pruža maksimalnu hidrataciju te jača barijeru kože.

Pogodno za biološku dob 20+ godina i sve tipove kože.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/glacier-pro-age-cream-visage-estetski-studio.png',
    price: '65 EUR',
    volume: '50 ml',
    activeIngredients: ['Encapsuled ceramide', 'Glacier termal water', 'Kaempherol', 'Liposomal hyaluronic acid'],
    application: [
      'Nanesite malu količinu kreme na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Glacier Pro Age serumom, Radiance Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['krema', 'anti-age', '20+ godina', 'svi tipovi kože']
  },
  {
    id: '19',
    title: 'Retin Pro Age Serum',
    description: `Lagan i gladak serum koji daje osjećaj hranjivosti nakon nanošenja.

Sastoji se od kompleksa biljnog retinola i liposomalnog retinaldehida s velikom snagom učvršćivanja i protiv bora.

Pogodan za biološku dob 30+/40 godina i za sve tipove kože.`,
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/retin-pro-age-serum-visage-estetski-studio.webp',
    price: '75 EUR',
    volume: '30 ml',
    activeIngredients: ['Bakuchiol (99% Pure Bakuchiol)', 'Kappaphycus alvarezii extract and Caesalpinia spinosa fruit extract', 'Plant extract of tara and red algae', 'Retinal (retinaldehyde) Lipocapsules', 'Retinol like: Nicotiana Benthamiana Hexapeptide-40 sh-Polypeptide-76'],
    application: [
      'Nanesite malu količinu seruma na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    warnings: [
      'Ne sadrži retinol! Ovaj proizvod sadrži derivate retinola koji nisu fotoosjetljivi i potpuno su sigurni za korištenje. Pogodan je i za osjetljivu kožu te ne zahtijeva posebne mjere opreza.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Retin Pro Age kremom, Antiaging Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'anti-age', '30+/40 godina', 'svi tipovi kože', 'osjetljiva koža']
  },
  {
    id: '20',
    title: 'Retin Pro Age Cream',
    description: `Lako upijajuća krema koja pruža njegujući osjećaj.

Sadrži spoj nastao od hijaluronske i retinoične kiseline te retinola biljnog podrijetla koji daje snagu protiv bora, zaglađuje nesavršenosti i ujednačava ton.

Pogodan za biološku dob 30+/40 godina i za sve tipove kože.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/toskani-retin-pro-age-estetski-studio-visage-sisak.png',
    price: '70 EUR',
    volume: '50 ml',
    activeIngredients: ['Kappaphycus alvarezii extract and Caesalpinia spinosa fruit extract', 'Plant based Collagen-Like: Acacia', 'Plant extract of tara and red algae', 'Retinol like: Nicotiana Benthamiana Hexapeptide-40 sh-Polypeptide-76', 'Sodium Retinoyl Hyaluronate (HA+ retinoic acid)'],
    application: [
      'Nanesite malu količinu kreme na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    warnings: [
      'Ne sadrži retinol! Ovaj proizvod sadrži derivate retinola koji nisu fotoosjetljivi i potpuno su sigurni za korištenje. Pogodan je i za osjetljivu kožu te ne zahtijeva posebne mjere opreza.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Retin Pro Age serumom, Antiaging Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['krema', 'anti-age', '30+/40 godina', 'svi tipovi kože', 'osjetljiva koža']
  },
  {
    id: '21',
    title: 'Unique Pro Age Serum',
    description: `Hranjivi i luksuzni dnevni serum za svakodnevnu primjenu.

S posebno biranim kompleksima anti-age aktivnih sastojaka koji ciljano djeluju na razne tipove znakova starenja: zategnutost, marionetske bore, Y zona (oval lica i vrat).

Pogodno za biološku dob 45+ godina i za sve tipove kože.`,
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/unique-pro-age-serum-visage-estetski-studio.webp',
    price: '75 EUR',
    volume: '30 ml',
    activeIngredients: ['Bacuri butter', 'Cell oil', 'Manosa-6-fosfato', 'Olea Vita PLF', 'Plant based Collagen Fragment'],
    application: [
      'Nanesite malu količinu seruma na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Unique Pro Age kremom, Antiaging Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'anti-age', '45+ godina', 'svi tipovi kože']
  },
  {
    id: '22',
    title: 'Unique Pro Age Cream',
    description: `Globalni anti-aging za zrelu i suhu kožu.

S posebno biranim kompleksima anti-age aktivnih sastojaka koji ciljano djeluju na razne tipove znakova starenja: zategnutost, marionetske bore, Y zona (oval lica i vrat).

Pogodno za biološku dob 45+ godina i sve tipove kože.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/toskani-unique-pro-age-cream-visage-estetski-studio.png',
    price: '70 EUR',
    volume: '50 ml',
    activeIngredients: ['4D Hyaluronic Acid:: cross-linked, high, medium and low molecular weight', 'Aminobutyric acid (GABA):', 'Bacuri butter', 'Nourishing Oils: (Meadowfoam, Canola Oil, Helianthus Annuus, Argan, Polyglutamic Acid (PGA)'],
    application: [
      'Nanesite malu količinu kreme na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Unique Pro Age serumom, Antiaging Eye Contour okoloočnom njegom i Toskani Sun Shiel-D fluidom. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['krema', 'anti-age', '45+ godina', 'svi tipovi kože']
  },
  {
    id: '23',
    title: 'Anti Hair-Loss Lotion',
    description: `Jedinstveno i inovativno rješenje za zaustavljanje gubitka kose i jačanje nove i postojeće kose.

Losion protiv gubitka kose tretman je posebno formuliran za zaustavljanje gubitka kose.

Namijenjeno svim vrstama alopecije i za svakodnevnu njegu fine, krhke i nježne kose.

Losion protiv gubitka kose jača i revitalizira folikul dlake stimulirajući fazu rasta, povećavajući gustoću i poboljšavajući strukturu kose.

Ovaj losion pruža intenzivno djelovanje bez ostavljanja ostataka na kosi i vlasištu.`,
    category: 'Njega vlasišta',
    marka: 'TOSKANI',
    productType: 'Sprej',
    skinConcern: ['Opadanje kose'],
    image: '/images/products/anti-hair-loss-lotion-visage-estetski-studio.webp',
    price: '36 EUR',
    volume: '100 ml',
    activeIngredients: ['Aminexil', 'Biotin (B8)', 'Nicotinamide (B3)', 'Pyridoxine (B6)', 'Sabal serrulata', 'Vitamin E', 'Vitamin H', 'Zinc'],
    application: [
      'Nanesite proizvod jednom dnevno tijekom najmanje 3 mjeseca liječenja',
      'Masirajte vlasište i ostavite da se prirodno osuši. Može se primijeniti izravno kao intenzivni dnevni tretman ili kao preventivni tretman svaki drugi dan.',
      'Izbjegavajte kontakt s očima, ustima i drugim sluznicama'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s DensiHair Boost kapsulama i mezoterapijom vlasišta."
      }
    ],
    tags: ['sprej', 'njega vlasišta', 'zaustavljanje gubitka kose', 'jačanje kose', 'alopecija']
  },
  {
    id: '24',
    title: 'DensiHair Boost Capsules',
    description: `Dodatak prehrani koji sadrži Sabal serrulata, vitamine i aminokiseline za jačanje kose i zaustavljanje gubitka kose.`,
    category: 'Njega vlasišta',
    marka: 'TOSKANI',
    productType: 'Kapsule',
    skinConcern: ['Opadanje kose'],
    image: '/images/products/densihair-boost-capsules-visage-estetski-studio.webp',
    price: '37 EUR',
    volume: '30 kapsula',
    activeIngredients: ['Aminokiseline Lysine', 'Arginine', 'Biotin (B8)', 'Cistin', 'Sabal serrulata', 'Selen', 'Zinc'],
    application: [
      'Uzmite 2 kapsule na dan kao "šok" tretman prvih 3 mjeseca.',
      'Nakon toga uzmite 1 kapsulu dnevno za održavanje rezultata.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Anti Hair-Loss losionom i mezoterapijom vlasišta."
      }
    ],
    tags: ['kapsule', 'njega vlasišta', 'dodatak prehrani', 'zaustavljanje gubitka kose', 'jačanje kose']
  },
  {
    id: '25',
    title: 'Night Reverse Intensive Cream & Mask',
    description: `Night Reverse Intensive krema i maska je 2 u 1 proizvod za noć. Snažno obnavlja vašu kožu oštećenu vanjskim čimbenicima. Formula ove kreme inspirirana je epigenetikom. Time se sprječava prerano starenje i dehidracija kože.

Krema je namijenjena svima koji pare od kože bez sjaja, oštećene kože koja je redovito izložena utjecajima iz okoline. Također, za kožu kojoj nedostaje hidratacije.

Višestruko regenerirajući noćni tretman za resetiranje kože i obnavljanje od dnevnih oštećenja.`,
    category: 'Noćna njega',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/toskani-night-reverse-estetski-studio-visage-sisak.png',
    price: '75 EUR',
    volume: '50 ml',
    isNew: true,
    activeIngredients: [
      'Hijaluronska kiselina',
      'Skin Reset Complex'
    ],
    application: [
      'Nanesite malu količinu seruma jednom dnevno, navečer',
      'Za najbolji učinak koristiti s Night Reverse Intensive serumom. Prvo nakapajte 2 do 3 kapi Night Reverse Intensive Seruma, a zatim nanesite ovu kremu',
      'Ako želite da djeluje kao noćna maska nanesite više proizvoda i ujutro se umijte'
    ],
    tags: ['noćna njega', 'maska', 'anti-age', 'regeneracija', 'svi tipovi kože', 'epigenetika', 'skin reset complex']
  },
  {
    id: '26',
    title: 'Anti-ageing + HA Ampule',
    description: `Anti Ageing + HA ampule pružaju čvrstoću i svjetlinu koži vašeg lica, omekšavajući bore i znakove umora. Učvršćuje i pruža trenutačnu i dugotrajnu hidrataciju.

    Sadrži probiotike, funkcionalne peptide, čimbenike rasta i hijaluronsku kiselinu koji pomažu smanjiti i usporiti znakove starenja.

    Intenzivna njega od 30 dana.`,
    category: 'Ampule',
    marka: 'TOSKANI',
    productType: 'Ampule',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/anti-ageing-ha-ampule-visage-estetski-studio.webp',
    price: '52 EUR',
    volume: '15 ampula x 2 ml',
    isNew: true,
    activeIngredients: [
      'Faktori rasta',
      'Hijaluronska kiselina',
      'Peptidi',
      'Probiotici'
    ],
    application: [
      'Nanesite pola ampule jednom dnevno, ujutro'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite ovaj proizvod s odgovarajućom Toskani kremom, Toskani serumom i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: [
      'ampule',
      'anti-age',
      'hijaluronska kiselina',
      'hidratacija',
      'peptidi',
      'probiotici',
      '30-dnevna kura'
    ]
  },
  {
    id: '27',
    title: 'Radiance Ampule',
    description: `Radiance ampule su intenzivan dnevni tretman koji sadrži kompleks za posvjetljivanje posljednje generacije koji može prodrijeti i osloboditi 5 različitih aktivnih sastojaka u određenim slojevima kože, a da je ne oštećuje.

    Pojačava i ujednačava ton kože, sprječava dehidraciju, gubitak sjaja, ispravlja znakove fotostarenja, mlohavost i pojavu mrlja.

    Intenzivna njega od 30 dana.`,
    category: 'Ampule',
    marka: 'TOSKANI',
    productType: 'Ampule',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija'],
    image: '/images/products/radiance-ampule-visage-estetski-studio.webp',
    price: '52 EUR',
    volume: '15 ampula x 2 ml',
    isNew: true,
    activeIngredients: [
      'Azeloglicin',
      'Bisabolol',
      'Fitinska kiselina',
      'Vitamin B3',
      'Vitamin C'
    ],
    application: [
      'Nanesite pola ampule jednom dnevno, ujutro'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite ovaj proizvod s <a href='#' data-product-id='8'>Toskani Radiance Daily Cream SPF30+</a>, <a href='#' data-product-id='11'>Toskani Radiance Ultimate Mesoserumom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: [
      'ampule',
      'posvjetljivanje',
      'ujednačavanje tena',
      'vitamin C',
      '30-dnevna kura',
      'kompleks za posvjetljivanje',
      'fotostarenje'
    ]
  },
  {
    id: '28',
    title: 'Sensitive Skin Ampule',
    description: `Sensitive skin ampule su intenzivan dnevni tretman, obogaćen prirodnim ekstraktima čija svojstva smiruju, štite i revitaliziraju kožu.

    Hidratiziraju kožu, poboljšavaju elastičnost i strukturu kože i imaju antioksidirajuća svojstva.

    Intenzivna njega od 30 dana.`,
    category: 'Ampule',
    marka: 'TOSKANI',
    productType: 'Ampule',
    skinType: ['Osjetljiva koža'],
    skinConcern: ['Hidratacija'],
    image: '/images/products/sensitive-skin-ampule-visage-estetski-studio.webp',
    price: '52 EUR',
    volume: '15 ampula x 2 ml',
    isNew: true,
    activeIngredients: [
      'Ekstrakt Myrothamnus Flabellifolia',
      'Ekstrakt Rhodosorus Marinus',
      'Vitamin B5',
      'Vitamin C'
    ],
    application: [
      'Nanesite pola ampule jednom dnevno, ujutro',
      'Za jako osjetljivu kožu, nanijeti koliko god puta je potrebno tijekom dana'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite ove proizvode s <a href='#' data-product-id='7'>Total Recovery gelom</a> ili <a href='#' data-product-id='6'>Total Recovery kremom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: [
      'ampule',
      'osjetljiva koža',
      'umirivanje',
      'regeneracija',
      'antioksidansi',
      '30-dnevna kura',
      'intenzivni tretman'
    ]
  },
  {
    id: '29',
    title: 'Purifying Ampule',
    description: `Purifying ampule - intenzivni svakodnevni hidratantni tretman za masnu kožu sklonu aknama.

    Sastojci pomažu u ponovnom balansiranju lipidnog sloja kože, sprječavajući pojavu nesavršenosti. Pomažu u zatvaranju pora i toniranju kože zahvaljujući svom adstringentnom učinku.

    Održavaju gladak i mat ten, reguliraju sebum te umanjuju tragove i ožiljke na koži.

    Intenzivna njega od 30 dana.`,
    category: 'Ampule',
    marka: 'TOSKANI',
    productType: 'Ampule',
    skinType: ['Masna koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/purifying-ampule-visage-estetski-studio.webp',
    price: '52 EUR',
    volume: '15 ampula x 2 ml',
    isNew: true,
    activeIngredients: [ 'Ekstrakt Cleome Gynandra', 'Ekstrakt Rhodosorus Marinus', 'Vitamin B5', 'Vitamin C', 'Vitamin E', 'Cink PCA' ],
    application: [
      'Nanesite pola ampule jednom dnevno, ujutro'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='2'>Toskani Purifying gelom za čišćenje lica</a>, <a href='#' data-product-id='5'>Toskani Purifying pilingom</a>, <a href='#' data-product-id='13'>Toskani Purifying kremom</a>, <a href='#' data-product-id='12'>Toskani Intensive serumom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: [ 'ampule', 'pročišćavanje', 'kontrola masnoće', 'akne', 'regulacija sebuma', 'zatvaranje pora', '30-dnevna kura']
  },
  {
    id: '30',
    title: 'Lipo Proteoglycans Ampule',
    description: `Lipo Proteoglycans ampule su intenzivan dnevni tretman koji pomaže u obnavljanju vezivnog tkiva i stimulaciji proizvodnje kolagena. Formuliran s liposomskim proteoglikanima prirodnog porijekla, koji dubinski hidratiziraju i posjeduju svojstva učvršćivanja te posvjetljuju kožu. Intenzivna dnevna kura od 30 dana.`,
    category: 'Ampule',
    marka: 'TOSKANI',
    productType: 'Ampule',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/lipo-proteoglycans-ampule-visage-estetski-studio.webp',
    price: '52 EUR',
    volume: '15 ampula x 2 ml',
    isNew: true,
    activeIngredients: [
      'Proteoglikani',
      'Vitamin C',
      'Vitamin F'
    ],
    application: [
      'Nanesite pola ampule jednom dnevno'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom, Toskani serumom i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: [
      'ampule',
      'učvršćivanje',
      'obnavljanje',
      'anti-age',
      'stimulacija kolagena',
      '30-dnevna kura',
      'liposomski proteoglikani'
    ]
  },
  {
    id: '31',
    title: 'SUN SHIEL-D Fluid SPF50+',
    description: `Fluid za lice ultra lagane teksture koji je pogodan i za osjetljivu kožu.

Nije komedogen, što ga čini dobrim izborom i za masnu kožu.

Vrlo je visoke fotozaštite SPF50+ i poboljšava sintezu vitamina D.

Pruža širok spektar zaštite od sunca, što je ključno za zaštitu kože od oštećenja uzrokovanih različitim vrstama zračenja kao što su UVA, UVB, IR, HEV.`,
    category: 'Zaštita od sunca',
    marka: 'TOSKANI',
    productType: 'Fluid',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Akne i problematična koža', 'Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Regeneracija'],
    image: '/images/products/toskani-sun-shield-visage-estetski-studio.png',
    price: '36 EUR',
    volume: '50ml',
    isNew: true,
    activeIngredients: ['Lithops Cell Nectar', 'Glikokaliks'],
    application: [
      'Nanesite fluid 30 minuta prije izlaganja suncu',
      'Nanesite 1 do 2 puta tijekom dana (ujutro i popodne)'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom i Toskani serumom."
      }
    ],
    tags: ['spf', 'zaštita od sunca', 'lice', 'fluidna tekstura', 'nekomedogen']
  },
  {
    id: '32',
    title: 'Sun Shiel-d Tonirani Fluid SPF50+',
    description: `Tonirani fluid za lice ultra lagane teksture koji je pogodan i za osjetljivu kožu te pomaže ujednačiti ton kože.

Nije komedogen, što ga čini dobrim izborom i za masnu kožu.

Vrlo je visoke fotozaštite SPF50+ i poboljšava sintezu vitamina D.

Pruža širok spektar zaštite od sunca, što je ključno za zaštitu kože od oštećenja uzrokovanih različitim vrstama zračenja kao što su UVA, UVB, IR, HEV.`,
    category: 'Zaštita od sunca',
    marka: 'TOSKANI',
    productType: 'Fluid',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Akne i problematična koža', 'Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Regeneracija'],
    image: '/images/products/sun-shiel-d-tonirani-fluid-spf50-visage-estetski-studio.png',
    price: '39 EUR',
    volume: '50ml',
    isNew: true,
    activeIngredients: ['Lithops Cell Nectar', 'Glikokaliks'],
    application: [
      'Nanesite fluid 30 minuta prije izlaganja suncu',
      'Nanesite 1 do 2 puta tijekom dana (ujutro i popodne)'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom i Toskani serumom."
      }
    ],
    tags: ['spf', 'zaštita od sunca', 'lice', 'fluidna tekstura', 'toner', 'nekomedogen']
  },
  {
    id: '33',
    title: 'Sun Shiel-D Body & Facial Sprej SPF50+',
    description: `Sprej za lice i tijelo ultra lagane teksture koji je pogodan i za osjetljivu kožu.

Vrlo je visoke fotozaštite SPF50+ i poboljšava sintezu vitamina D.

Pruža širok spektar zaštite od sunca, što je ključno za zaštitu kože od oštećenja uzrokovanih različitim vrstama zračenja kao što su UVA, UVB, IR, HEV.

Vodootporan je.`,
    category: 'Zaštita od sunca',
    marka: 'TOSKANI',
    productType: 'Sprej',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Regeneracija'],
    image: '/images/products/toskani-sun-shield-body-spray-visage-estetski-studio.webp',
    price: '42 EUR',
    volume: '200ml',
    isNew: true,
    activeIngredients: ['Lithops Cell Nectar', 'Glikokaliks'],
    application: [
      'Protresite prije upotrebe',
      'Nanesite sprej 30 minuta prije izlaganja suncu',
      'Nanesite 1 do 2 puta tijekom dana (ujutro i popodne)'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom i Toskani serumom."
      }
    ],
    tags: ['spf', 'zaštita od sunca', 'tijelo i lice', 'sprej', 'vodootporan']
  },
  {
    id: '34',
    title: 'Profhilo Haenkenium',
    description: `Anti-age krema preoblikuje lice, vrat i dekolte, dajući elastičnost i čvrstoću te ublažavajući sitne bore.

Zahvaljujući povezanosti hijaluronskih kiselina niske i velike molekularne težine i Haenkenium® (ekstrakt Salvia haenkei), Profhilo Haenkenium krema djeluje kao štit za slobodne radikale.

Vraća zaštitnu barijeru osjetljive kože koja je iritirana i crvena zbog oksidativnog stresa ili nakon estetskih tretmana.

Sinergistički učinak kompleksa hijaluronske kiseline: HA visoke molekularne težine obnavlja i održava integritet hidrolipidnog sloja kože, HA niske molekularne težine održava optimalnu hidriranost kože.`,
    category: 'Krema',
    marka: 'Profhilo',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/profhilo-haenkenium-estetski-studio-visage-sisak.png',
    price: '54 EUR',
    volume: '50 ml',
    activeIngredients: ['Hijaluronska kiselina visoke molekularne težine', 'Hijaluronska kiselina niske molekularne težine', 'Haenkenium® (ekstrakt Salvia haenkei)'],
    application: [
      'Nanijeti kremu dva puta dnevno na očišćeno lice, vrat i dekolte.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti kao kućna njega nakon tretmana Profhilo. Njegu nadopuniti Toskani Sun Shiel-D fluidom i Toskani Anti-Ageing + HA"
      }
    ],
    tags: ['krema', 'anti-age', 'profhilo', 'hijaluronska kiselina', 'njega nakon tretmana', 'svi tipovi kože']
  },
  {
    id: '35',
    title: 'Vitaflash Ampule',
    description: `Vitaflash ampula je proizvod za povremenu upotrebu koji pruža trenutačni efekt liftinga.

Preporuka za korištenje prije bitnih događaja za intenzivan "blic" efekt.

Sadrži aktivne sastojke koji pružaju trenutačni efekt liftinga, omekšavaju bore i posvjetljavaju kožu. Imaju snažan antioksidativni učinak, smanjuju znakove starenja i umora, pružajući svježiji i mlađi izgled.`,
    category: 'Ampule',
    marka: 'TOSKANI',
    productType: 'Ampule',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija', 'Hiperpigmentacije'],
    image: '/images/products/vitaflash-ampule-visage-estetski-studio.webp',
    price: '30 EUR',
    volume: '15 ampula x 2 ml',
    isNew: true,
    activeIngredients: [
      'Kolagen',
      'Elastin',
      'Ekstrakt mimoze',
      'Biljni tenzor',
      'Vitamin C'
    ],
    application: [
      'Nanesite pola ampule jednom dnevno, ujutro'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom, Toskani serumom i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: [
      'ampule',
      'lifting efekt',
      'anti-age',
      'trenutni efekti',
      'posvjetljivanje',
      'posebne prilike',
      'antioksidansi'
    ]
  }
]; 

// Utility function to get popular products
export const getPopularProducts = () => {
  const popularProductIds = ['11', '15', '8', '19'];
  return products.filter(product => popularProductIds.includes(product.id));
};