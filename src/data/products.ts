export interface Product {
  id: string;
  title: string;
  description: string;
  previewDescription?: string;
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
  isBestseller?: boolean; // New field for bestseller tag
  isForDay?: boolean; // New field for day use tag
  isForNight?: boolean; // New field for night use tag
  isRecommended?: boolean; // New field for recommended tag
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
  // Image sizing properties
  imageNeedsResize?: boolean; // Flag for images that need smaller sizing
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
  'Osjetljiva koža i koža sklona rozaceji',
  'Umirivanje kože'
];

// Brands for "Marke"
export const brands = [
  'TOSKANI',
  'Profhilo',
  'Circadia'
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Energizing Cleanser',
    description: `Gel sredstvo za čišćenje lica uklanjanja prljavštinu, prašinu i šminku, višak masnoće i mrtvih stanica kože nakupljenih tijekom dana.

Gel za čišćenje lica čuva neke slojeve masnoće na koži što sprječava isušivanje kože. Čisti, pročišćava i tonizira kožu.`,
    previewDescription: 'Gel sredstvo za čišćenje lica koje nježno čisti i tonizira kožu, čuvajući prirodnu hidrataciju',
    category: 'Čišćenje lica',
    marka: 'TOSKANI',
    productType: 'Čišćenje lica',
    skinType: ['Suha koža', 'Normalna koža', 'Mješovita koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije'],
    image: '/images/products/energizing-cleanser-visage-estetski-studio.webp',
    price: '40 EUR',
    volume: '200 ml',
    isPopular: true,
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
    previewDescription: 'Gel bez ulja koji regulira proizvodnju sebuma i čisti kožu sklonu aknama',
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
    previewDescription: 'Tonik koji revitalizira i hidratizira kožu s prirodnim ekstraktima bambusa, limuna i naranče',
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
        description: "Za najbolji učinak, koristiti s <a href='#' data-product-id='1'>Toskani Energizing gelom za čišćenje lica</a>, <a href='#' data-product-id='4'>Toskani Nutritive pilingom</a>, odgovarajućom Toskani kremom, Toskani serumom i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
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
    previewDescription: 'Piling koji zaglađuje kožu i smanjuje nesavršenosti s uljem Rosa Mochata i vitaminom E',
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
        description: "Za najbolji učinak, koristite s odgovarajućom Toskani kremom, Toskani serumom i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='2'>Toskani Purifying gelom za čišćenje lica</a>, <a href='#' data-product-id='13'>Toskani Purifying kremom</a>, <a href='#' data-product-id='12'>Toskani Purifying Intensive serumom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: ['piling', 'masna koža', 'mješovita koža']
  },
  {
    id: '6',
    title: 'Total Recovery Cream',
    description: `Zaštitna, hidratantna i hranjiva krema koja pruža moćnu regeneraciju suhe i normalne kože.

Pruža snažne učinke obnavljanja kože. Poboljšava izgled oštećene kože.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Suha koža', 'Normalna koža'],
    skinConcern: ['Umirivanje kože', 'Hidratacija', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/total-recovery-cream-visage-estetski-studio.webp',
    price: '55 EUR',
    volume: '50 ml',
    activeIngredients: ['Acetil dipeptid-3 aminoheksanoat', 'Acetil heksapeptid-46', 'Allantoin', 'Betaine', 'Bisabolol', 'Diaminopropionoyl Tripeptide-33', 'Resveratrol', 'Tokoferol'],
    application: [
      'Nanesite 2 puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristite kao kućnu njegu nakon tretmana mezoterapije."
      }
    ],
    tags: ['hidratacija', 'protiv iritacija', 'suha koža', 'normalna koža', 'dnevna njega', 'njega nakon kemijskog pilinga', 'njega nakon mezoterapije']
  },

  {
    id: '7',
    title: 'Total Recovery Gel',
    description: `Obnavljajući, hidratantni i umirujući gel s aloe verom za normalnu, mješovitu i masnu kožu.

Štiti i vlaži epidermu, pogodujući oporavku osjetljive kože nakon iritacija ili invazivnih tretmana.`,
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Umirivanje kože', 'Hidratacija', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/total-recovery-gel-visage-estetski-studio.webp',
    price: '37 EUR',
    volume: '50 ml',
    activeIngredients: ['Aloe Vera Ekstrakt', 'Ekstrakt mimoze Tenuiflora', 'Elastin', 'Hidrolizirani proteini pšenice', 'Kolagen', 'Shea Maslac', 'Vegetable Tensor'],
    application: [
      'Koristite 2 puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristite kao kućnu njegu nakon tretmana mezoterapije."
      }
    ],
    tags: ['hidratacija', 'protiv iritacija', 'normalna koža', 'mješovita koža', 'masna koža', 'dnevna njega', 'njega nakon kemijskog pilinga', 'njega nakon mezoterapije']
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
    isPopular: true,
    application: [
      'Nanesite dva puta dnevno, ujutro i navečer.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='11'>Toskani Radiance Ultimate serumom</a>, <a href='#' data-product-id='10'>Radiance Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima za ujednačavanje tona kože, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['spf', 'hiperpigmentacije', 'fotostarenje', 'dnevna njega', 'svi tipovi kože']
  },
  {
    id: '9',
    title: 'Antiaging Eye Contour',
    description: `Posebno formuliran hidratantni serum za smanjenje umora, tretiranje bora, osvježavanje područja oko očiju, hidrataciju i umirivanje nježne kože oko očiju.

Njegovi aktivni sastojci koji djeluju u sinergiji kako bi se oduprli pojavi bora, umanjili bore i već formirane linije.

Također pomaže u sprječavanju gubitka čvrstoće, pomaže koži da se vrati u njezino prirodno zdravlje i pruža ukupni učinak pomlađivanja.`,
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
      'Nanesite dva puta dnevno, ujutro i navečer na čistu kožu',
      'Lagano umasirajte u okoloočno područje'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim Toskani proizvodima iz Anti-Age njege."
      }
    ],
    tags: ['okoloočna njega', 'anti-age', 'ublažavanje finih linija']
  },
  {
    id: '10',
    title: 'Radiance Eye Contour',
    description: `Učinkovita krema za područje oko očiju koja ublažuje hiperpigmentacije i probleme s mikrocirkulacijom, koji uzrokuju podočnjake.

Umanjite vrećice ispod očiju i podočnjake, pomažući drenaži i mikrocirkulaciji područja oko očiju i kapaka.`,
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
      'Nanesite dva puta dnevno, ujutro i navečer na čistu kožu',
      'Lagano umasirajte u okoloočno područje'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='8'>Toskani Radiance Daily Cream SPF30+</a>, <a href='#' data-product-id='11'>Toskani Radiance Ultimate serumom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>."
      }
    ],
    tags: ['okoloočna njega', 'hiperpigmentacije', 'posvjetljivanje podočnjaka']
  },
  {
    id: '11',
    title: 'Radiance Ultimate Mesoserum',
    description: `Serum prikladan za sve tipove kože i učinkovit saveznik u borbi protiv hiperpigmentacija i pjega.

Posebno razvijen za ujednačavanje tona kože i smanjenje nesavršenosti: sprječava razvoj novih diskoloracija kože, hidrira, sprječava i uklanja tamne mrlje uzrokovane suncem, vraća sjaj i zdravi izgled koži, poboljšava izgled ožiljaka.

Vaš novi saveznik u borbi protiv hiperpigmentacija s učinkovitim djelovanjem već u 1. mjesecu upotrebe!`,
    previewDescription: 'Vaš novi saveznik u borbi protiv hiperpigmentacija koji učinkovito ujednačava ton kože i smanjuje nesavršenosti',
    category: 'Serum',
    marka: 'TOSKANI',
    productType: 'Serum',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Hiperpigmentacije'],
    image: '/images/products/radiance-ultimate-mesoserum-estetski-studio-visage-sisak.jpg',
    price: '77 EUR',
    volume: '30 ml',
    isPopular: true,
    isRecommended: true,
    benefits: [
      'uklanja hiperpigmentacije i sprječava razvoj novih',
      'vraća sjaj i zdravi izgled koži',
      'poboljšava izgled ožiljaka'
    ],
    activeIngredients: ['Alfa Arbutin', 'Aspergillus Ferment', 'Azelaična kiselina', 'Azeloglicina', 'Ferulinska kiselina', 'Kojična kiselina', 'Mliječna kiselina', 'Niacinamid', 'Retinol', 'traneksamična kiselina', 'Vitamin C'],
    application: [
      'Nanesite malu količinu seruma dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='8'>Toskani Daily Radiance kremom SPF30+</a>, <a href='#' data-product-id='10'>Toskani Radiance Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima za ujednačavanje tona kože, kao što su mezoterapija i kemijski piling."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='2'>Toskani Purifying gelom za čišćenje lica</a>, <a href='#' data-product-id='5'>Toskani Purifying pilingom</a>, <a href='#' data-product-id='13'>Toskani Purifying kremom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji pomažu u rješavanju problematične kože, kao što su mezoterapija i kemijski piling."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='12'>Toskani Purifying Intensive serumom</a>, koji nanosite na lokalizirane upale, <a href='#' data-product-id='5'>Toskani Purifying pilingom</a>, <a href='#' data-product-id='2'>Toskani Purifying gelom za čišćenje lica</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji pomažu u rješavanju problematične kože, kao što su mezoterapija i kemijski piling."
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
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža', 'Zrela koža'],
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='15'>Toskani Skin Architect kremom</a>, <a href='#' data-product-id='9'>Antiaging Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima s anti-age učincima, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '15',
    title: 'Skin Architect krema',
    description: `Visoko koncentrirana krema protiv bora koja koristi prirodne sastojke za poboljšanje izgleda finih linija i dubokih bora.

Sadrži medicinsku hijaluronsku kiselinu i acetil heksapeptid-8 kao liposomski biomimetički peptid. Oni, s ostalim sastojcima, pomažu odgoditi učinke starenja na koži i pružaju snažno hidratantno i hranjivo djelovanje.

Koži pruža čvrstoću i elastičnost uz primjetan lifting učinak. Hijaluronska kiselina niske molekularne težine (<100Kda), za dublju i dugotrajniju hidrataciju.`,
    previewDescription: 'Visoko koncentrirana krema protiv bora koja pruža koži čvrstoću i elastičnost uz primjetan lifting učinak.',
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža', 'Zrela koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/skin-architect-cream-visage-estetski-studio.webp',
    price: '68 EUR',
    volume: '50 ml',
    isPopular: true,
    isRecommended: true,
    benefits: [
      'poboljšanje čvrstoće, teksture i hidratacije kože',
      'poboljšanje izgleda finih linija i bora'
    ],
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Organic Silicon', 'Prirodni Kolagen', 'Retinol', 'Shea Maslac', 'Tokoferol', 'Vitamin E'],
    application: [
      'Nanesite malu količinu kreme na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='14'>Toskani Skin Architect serumom</a>, <a href='#' data-product-id='9'>Toskani Antiaging Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima s anti-age učincima, kao što su mezoterapija i kemijski piling."
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
    isForNight: true,
    isPopular: true,
    isRecommended: true,
    activeIngredients: ['Probiotici', 'algae extract', 'Byfida ferment Lysate', 'tetrapeptide-26', 'TRC (Total Restoring Complex)'],
    application: [
      'Nanesite jednu pumpicu seruma jednom dnevno, navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='9'>Toskani Anti Aging Eye Contour okoloočnom kremom</a>, <a href='#' data-product-id='25'>Toskani Night Reverse Advanced kremom</a> ili <a href='#' data-product-id='15'>Toskani Skin Architect kremom</a>. Nanesite jednu pumpicu seruma u kremu i nanesite na lice. Za najbolje rezultate koristiti s odgovarajućim Toskani proizvodima iz Anti-Age njege."
      }
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='18'>Glacier Pro Age kremom</a>, <a href='#' data-product-id='10'>Radiance Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='17'>Glacier Pro Age serumom</a>, <a href='#' data-product-id='10'>Radiance Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='20'>Retin Pro Age kremom</a>, <a href='#' data-product-id='9'>Antiaging Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='19'>Retin Pro Age serumom</a>, <a href='#' data-product-id='9'>Antiaging Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
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
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža', 'Zrela koža'],
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='22'>Unique Pro Age kremom</a>, <a href='#' data-product-id='9'>Antiaging Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
      }
    ],
    tags: ['serum', 'anti-age', '45+ godina', 'svi tipovi kože']
  },
  {
    id: '22',
    title: 'Unique Pro Age krema',
    description: `Globalni anti-aging za zrelu i suhu kožu.

S posebno biranim kompleksima anti-age aktivnih sastojaka koji ciljano djeluju na razne tipove znakova starenja: zategnutost, marionetske bore, Y zona (oval lica i vrat).

Pogodno za biološku dob 45+ godina i sve tipove kože.`,
    previewDescription: 'Globalni anti-aging za zrelu i suhu kožu s posebno biranim kompleksima anti-age aktivnih sastojaka',
    category: 'Krema',
    marka: 'TOSKANI',
    productType: 'Krema',
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža', 'Zrela koža'],
    skinConcern: ['Anti-aging njega', 'Hidratacija'],
    image: '/images/products/toskani-unique-pro-age-cream-visage-estetski-studio.png',
    price: '70 EUR',
    volume: '50 ml',
    isPopular: true,
    benefits: [
      'poboljšava zategnutost kože',
      'poboljšava čvrstoću kože',
      'dubinski hidratizira'
    ],
    activeIngredients: ['4D Hyaluronic Acid:: cross-linked, high, medium and low molecular weight', 'Aminobutyric acid (GABA):', 'Bacuri butter', 'Nourishing Oils: (Meadowfoam, Canola Oil, Helianthus Annuus, Argan, Polyglutamic Acid (PGA)'],
    application: [
      'Nanesite malu količinu kreme na cijelo lice dva puta dnevno, ujutro i navečer'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='21'>Unique Pro Age serumom</a>, <a href='#' data-product-id='9'>Antiaging Eye Contour okoloočnom njegom</a> i <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a>. Koristiti kao dodatak profesionalnim tretmanima koji imaju anti-age učinke, kao što su mezoterapija i kemijski piling."
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
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='24'>DensiHair Boost kapsulama</a> i mezoterapijom vlasišta."
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
    description: `Night Reverse Intensive krema i maska je 2 u 1 proizvod za noć. Snažno obnavlja vašu kožu oštećenu vanjskim čimbenicima.

Formula ove kreme inspirirana je epigenetikom. Time se sprječava prerano starenje i dehidracija kože.

Krema je namijenjena svima koji pare od kože bez sjaja, oštećene kože koja je redovito izložena utjecajima iz okoline. Također, za kožu kojoj nedostaje hidratacije.

Višestruko regenerirajući noćni tretman za resetiranje kože i obnavljanje od dnevnih oštećenja.`,
    category: 'Noćna njega',
    marka: 'TOSKANI',
    productType: 'Krema',
    isForNight: true,
    skinType: ['Normalna koža', 'Suha koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/toskani-night-reverse-estetski-studio-visage-sisak.png',
    price: '75 EUR',
    volume: '50 ml',
    isNew: true,
    isRecommended: true,
    activeIngredients: [
      'Hijaluronska kiselina',
      'Skin Reset Complex'
    ],
    application: [
      'Nanesite malu količinu kreme jednom dnevno, navečer',
      'Ako želite da djeluje kao noćna maska nanesite više proizvoda i ujutro se umijte'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='9'>Toskani Anti Aging okoloočnom kremom</a>, <a href='#' data-product-id='16'>Toskani Night Reverse Advanced serumom</a>. Nanesite jednu pumpicu seruma u malu količinu kreme i nanesite na lice. Za najbolje rezultate koristiti s odgovarajućim Toskani proizvodima iz Anti-Age njege."
      }
    ],
    tags: ['noćna njega', 'maska', 'anti-age', 'Umirivanje kože', 'svi tipovi kože', 'epigenetika', 'skin reset complex']
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
      'Umirivanje kože',
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
    title: 'Sun Shiel-D fluid',
    description: `Fluid za lice ultra lagane teksture koji je pogodan i za osjetljivu kožu. Nije komedogen, što ga čini dobrim izborom i za masnu kožu. 
    
    Vrlo je visoke fotozaštite SPF50+ i poboljšava sintezu vitamina D. Pruža širok spektar zaštite od sunca, što je ključno za zaštitu kože od oštećenja uzrokovanih različitim vrstama zračenja kao što su UVA, UVB, IR, HEV.`,
    previewDescription: 'Regenerativna zaštita kože od sunca koja potiče i poboljšava sintezu vitamina D',
    category: 'Zaštita od sunca',
    marka: 'TOSKANI',
    productType: 'Fluid',
    skinType: ['Normalna koža', 'Suha koža', 'Osjetljiva koža', 'Mješovita koža', 'Masna koža'],
    skinConcern: ['Akne i problematična koža', 'Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/toskani-sun-shield-visage-estetski-studio.png',
    price: '36 EUR',
    volume: '50ml',
    isNew: true,
    isRecommended: true,
    isPopular: true,
    benefits: [
      'zaštita od UVA, UVB, IR, HEV zračenja',
      'potiče sintezu vitamina D',
      'potiče dubinsku hidrataciju'
    ],
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
    skinConcern: ['Akne i problematična koža', 'Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
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
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože'],
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
  },
  {
    id: '35',
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
        description: "Za najbolji učinak, koristiti kao kućna njega nakon tretmana Profhilo. Njegu nadopuniti <a href='#' data-product-id='31'>Toskani Sun Shiel-D fluidom</a> i <a href='#' data-product-id='26'>Toskani Anti-Ageing + HA</a>"
      }
    ],
    tags: ['krema', 'anti-age', 'profhilo', 'hijaluronska kiselina', 'njega nakon tretmana', 'svi tipovi kože']
  },
  {
    id: '36',
    title: 'Cleansing Gel with Salicylic Acid',
    description: `Lagani gel za čišćenje koji stvara kremastu pjenu koja dubinski čisti i uklanja višak sebuma, dok beta-hidroksi salicilna kiselina pomaže omekšavanju i pilingu kože.

Namijenjen masnoj koži i koži sklonoj aknama.

Može se koristiti i na tijelu.`,
    category: 'Čišćenje lica',
    marka: 'Circadia',
    productType: 'Čišćenje lica',
    skinType: ['Masna koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/circadia/circadia-cleansing-gel-visage-estetski-studio.webp',
    price: '34 EUR',
    volume: '118 ml',
    activeIngredients: ['Sodium C14-16 Olefin Sulfonate Sulfate', 'Panthenol (provitamin B5)', 'Cocoamidopropyl betaine', 'Linoleamidopropyl PG-dimonium chloride phosphate', 'Salicylic acid'],
    application: [
      'Nanesite malu količinu na vrhove prstiju, nježno zapjenite na licu i dobro isperite. Izbjegavajte područje oko očiju.',
      'Koristi se svaka 2 do 3 dana.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s <a href='#' data-product-id='spot-stop'>Circadia Spot Stop serumom</a>, <a href='#' data-product-id='daytime-control'>Circadia Daytime Control losionom</a>, <a href='#' data-product-id='white-willow-juniper'>Circadia White Willow & Juniper Clearing tonikom</a> i <a href='#' data-product-id='light-day-spf37'>Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom</a>."
      }
    ],
    tags: ['čišćenje lica', 'masna koža', 'akne i problematična koža', 'circadia marka'],
    imageNeedsResize: true
  },
  {
    id: '37',
    title: 'Micro-Exfoliating Honey Cleanser',
    description: `Gel s pilingom za čišćenje lica. Patentirane mikrokuglice prirodnog pčelinjeg voska nježno čiste i pilingiraju dok apsorbiraju višak ulja.

Pogodan za sve tipove kože.

Pogodan za svakodnevno korištenje.`,
    category: 'Čišćenje lica',
    marka: 'Circadia',
    productType: 'Čišćenje lica',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Akne i problematična koža', 'Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože'],
    image: '/images/products/circadia/circadia-micro-exfoliating-honey-visage-estetski-studio.webp',
    price: '55 EUR',
    volume: '236 ml',
    activeIngredients: ['Stepan Mild PCL', 'HoneyBeads®', 'Cocomidopropyl betaine'],
    application: [
      'Nanesite količinu veličine novčića na vrhove prstiju i nanesite na lice. Nježno umasirajte i isperite temeljito.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti s odgovarajućim <a href='#' data-product-id='circadia-tonik'>Circadia tonikom</a>, <a href='#' data-product-id='circadia-serum'>Circadia serumom</a> i <a href='#' data-product-id='circadia-krema'>Circadia kremom</a>, ovisno o tipu kože i problematici. Koristiti s <a href='#' data-product-id='light-day-spf37'>Light Day Suncreen Broad Spectrum SPF37 kremom</a>."
      }
    ],
    tags: ['čišćenje lica', 'piling', 'svi tipovi kože', 'sve problematike (osim opadanje kose)'],
    imageNeedsResize: true
  },
  {
    id: '38',
    title: 'Vitamin Veil Cleanser',
    description: `Jedinstveni nepjenušavi čistač na bazi sojinog ulja koji nježno uklanja šminku, prljavštinu i nečistoće ostavljajući za sobom nevidljivu koprenu antioksidansa.

Čistač na bazi ulja, koji je odličan za suhu i dehidriranu kožu.

Pomaže očuvanju barijere kože i sadrži mješavinu prirodnih ulja i vitamina E.`,
    category: 'Čišćenje lica',
    marka: 'Circadia',
    productType: 'Čišćenje lica',
    skinType: ['Suha koža', 'Normalna koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože'],
    image: '/images/products/circadia/circadia-vitamin-veil-cleanser-visage-estetski-studio.webp',
    price: '55 EUR',
    volume: '236 ml',
    activeIngredients: ['Soybean Oil (GMO-free)', 'Cranberry Oil', 'Seabuckthorn Oil', 'Meadowsweet Oil Coumarins', 'Tocopherol (Vitamin E)'],
    application: [
      'Nanesite čistač na vrhove prstiju i nanesite ga po cijelom licu i vratu. Dobro isperite.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti u kombinaciji s <a href='#' data-product-id='39'>Circadia Lipid Replacing Cleansing gelom</a> kako biste napravili double-cleansing. Koristite ga s odgovarajućim <a href='#' data-product-id='circadia-tonik'>Circadia tonikom</a>, <a href='#' data-product-id='circadia-serum'>Circadia serumom</a> i <a href='#' data-product-id='circadia-krema'>Circadia kremom</a>, ovisno o tipu kože i problematici. Na kraju nanesite <a href='#' data-product-id='light-day-spf37'>Light Day Sunscreen Broad Spectrum SPF37 kremu</a>."
      }
    ],
    tags: ['čišćenje lica', 'suha koža', 'normalna koža', 'sva problematika (osim opadanja kose)'],
    imageNeedsResize: true
  },
  {
    id: '39',
    title: 'Lipid Replacing Cleansing Gel',
    description: `Osvježavajući gel za čišćenje lica koji učinkovito uklanja prljavštinu, šminku i višak lipida bez oštećenja barijere kože ili denaturacije keratina.

Namijenjen svim tipovima kože, posebno normalnoj i mješovitoj koži.`,
    category: 'Čišćenje lica',
    marka: 'Circadia',
    productType: 'Čišćenje lica',
    skinType: ['Normalna koža', 'Mješovita koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože'],
    image: '/images/products/circadia/circadia-lipid-replacing-gel-visage-estetski-studio.webp',
    price: '55 EUR',
    volume: '236 ml',
    activeIngredients: ['Stepan Mild PCL', 'Panthenol (provitamin B5)', 'Allantoin', 'Mallow (Malva Sylvestris) leaf extract', 'Seaweed (Laminaria japonica) extract', 'Sacha inchi (Plukenetia Volubilis seed, a.k.a. "Incan-peanut") extract'],
    application: [
      'Nanesite malu količinu na vrhove prstiju. Napravite pjenu na licu i isperite temeljito.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim <a href='#' data-product-id='circadia-tonik'>Circadia tonikom</a>, <a href='#' data-product-id='circadia-serum'>Circadia serumom</a> i <a href='#' data-product-id='circadia-krema'>Circadia kremom</a>, ovisno o tipu kože i problematici. Koristite s <a href='#' data-product-id='light-day-spf37'>Light Day Sunscreen Broad Spectrum SPF37 kremom</a>."
      }
    ],
    tags: ['čišćenje lica', 'svi tipovi kože (osim masna koža)', 'sve problematike (osim opadanja kose)'],
    imageNeedsResize: true
  },
  {
    id: '40',
    title: 'Amandola Milk Cleanser',
    description: `Njegujući čistač od bademovog mlijeka koji sadrži mliječnu kiselinu i mandeličnu kiselinu koje nježno eksfoliraju, hidratiziraju i posvjetljuju oštećenu kožu.

Posebno namijenjen suhoj, dehidriranoj koži i koži sklonoj hiperpigmentacijama.`,
    category: 'Čišćenje lica',
    marka: 'Circadia',
    productType: 'Čišćenje lica',
    skinType: ['Suha koža', 'Normalna koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože'],
    image: '/images/products/circadia/circadia-amandola-milk-visage-estetski-studio.webp',
    price: '55 EUR',
    volume: '236 ml',
    activeIngredients: ['Lactic acid', 'Mandelic acid', 'Oat protein', 'Supreme amande douce Natural (Sweet almond milk)'],
    application: [
      'Nanesite količinu čistača veličine novčića na vrhove prstiju i nanesite ga po cijelom licu i vratu. Dobro isperite.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim <a href='#' data-product-id='circadia-tonik'>Circadia tonikom</a>, <a href='#' data-product-id='circadia-serum'>Circadia serumom</a> i <a href='#' data-product-id='circadia-krema'>Circadia kremom</a>, ovisno o tipu i problematici kože. Koristite s <a href='#' data-product-id='light-day-spf37'>Light Day Sunscreen Broad Spectrum SPF37</a>."
      }
    ],
    tags: ['čišćenje lica', 'svi tipovi kože', 'sve problematike (osim opadanja kose)'],
    imageNeedsResize: true
  },
  {
    id: '41',
    title: 'Vitamin C Reversal Serum',
    description: `Moćan serum za borbu protiv starenja koji sadrži najstabilniji oblik vitamina C za povećanje čvrstoće i neutralizaciju slobodnih radikala.

Ovaj lagani serum također sadrži hijaluronsku kiselinu i vitamin B5 za hidrataciju i umirenje.

Namijenjen svim tipovima kože, a posebno za anti-age djelovanje.

Posvjetljuje i učvršćuje kožu.`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije'],
    image: '/images/products/circadia/CircadiaVitaminC.webp',
    price: '89 EUR',
    volume: '15 ml',
    activeIngredients: ['Magnesium ascorbyl phosphate (Vitamin C)', 'Sodium hyaluronate', 'Panthenol'],
    application: [
      'Ujutro i uvečer nakon čišćenja, poprskajte lice i zatim nanesite nekoliko kapi na vrhove prstiju te lagano tapkajte po licu i vratu.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Circadia Blueberry & White Tea Hydrating tonikom, AquaPorin Hydrating kremom i Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['serum', 'svi tipovi kože', 'anti-age', 'hiperpigmentacije'],
    imageNeedsResize: true
  },
  {
    id: '42',
    title: 'Licorice & Bearberry Brightening Mist',
    description: `Tonik s nevjerojatnom kombinacijom sladića, medvjeđeg grožđa i drugih prirodnih ekstrakata koji su poznati po posvjetljivanju kože.

Pomaže u posvjetljivanju tamnih mrlja i poboljšanju sjaja. Hidratizira i omekšava kožu.

Namijenjena oštećenoj koži, koži s pigmentacijama, koži sa znakovima starenja i melazmom nakon trudnoće.

Ne sadrži hidrokinone ili kojnu kiselinu.`,
    category: 'Tonik',
    marka: 'Circadia',
    productType: 'Tonik',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Hiperpigmentacije'],
    image: '/images/products/circadia/CircadiaLicorice&BearberryBrighteningMist.webp',
    price: '47 EUR',
    volume: '118 ml',
    activeIngredients: ['MariMoist (Chondrus Crispus extract)', 'Extracts of Licorice, bearberry, and Mulberry', 'Melfade PF (Bearberry leaf extract and magnesium ascorbyl phosphate)', 'Melanostatin 5'],
    application: [
      'Nanesite dva puta na dan, nakon čišćenja kože. Zatvorite oči i lagano poprskajte lice.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti nakon čišćenja lica s Circadia Amandola Milk gelom za čišćenje. Zatim nanesite Circadia Bright White serum i Circadia White Veil Brightener kremu. Koristite s Circadia Light Day Sunscreen Broad Spectrum SPF37."
      }
    ],
    tags: ['tonik', 'svi tipovi kože', 'hiperpigmentacije'],
    imageNeedsResize: true
  },
  {
    id: '43',
    title: 'Bright White Serum',
    description: `Lagani mliječni serum formuliran je s moćnim antioksidansima i inhibitorima proizvodnje melanina kako bi posvijetlio kožu i smanjio pojavu hiperpigmentacije.

Namijenjen oštećenoj koži, koži s pigmentacijama i znakovima starenja. Posvjetljuje hiperpigmentacijske mrlje, mrlje od sunca i melazme nakon trudnoće.

Hidratizira kožu i posvjetljuje ju.

Koristi se kao spot tretman.`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Hiperpigmentacije'],
    image: '/images/products/circadia/CirciadiaBrightWhite.webp',
    price: '77 EUR',
    volume: '15 ml',
    activeIngredients: ['Regufade (Trans-Resveratrol)', 'BV-OSC (Tetrahexyldecyl Ascorbate)', 'Vitamin E acetate (Alpha-tocopherol acetate)', 'Phenylethyl Resorcinol (SymWhite)', 'Marrubium Stem cell extract', 'Tyrostat-11(Rumex Occidentalis extract)'],
    application: [
      'U večernjim satima, tretirajte problematična područja.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Circadia Licorice & Bearberry Brightening tonikom, Circadia White Veil Brightener kremom i Circadia Light Day Sunscreen Broad Spectrum SPF37."
      }
    ],
    tags: ['serum', 'svi tipovi kože', 'hiperpigmentacije'],
    imageNeedsResize: true
  },
  {
    id: '44',
    title: 'White Veil Brightener',
    description: `Svilenkasti, brzo upijajući losion sadrži SepiWhite MSH, Chromabright i b-White, koji su klinički pokazali da osvjetljavaju hiperpigmentiranu kožu i posvjetljuju ten.

Namijenjen oštećenoj koži, koži s pigmentacijama i znakovima starenja.

Učinkovito posvjetljuje neravnomjerno pigmentiranu kožu

Inhibira proizvodnju tirozinaze.

Ne sadrži hidrokinon ili kojnu kiselinu.`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Hiperpigmentacije'],
    image: '/images/products/circadia/CircadiaWhiteVeilBrightener.webp',
    price: '101 EUR',
    volume: '59 ml',
    activeIngredients: ['Niacinamide', 'Alpha-Arbutin', 'SepiWhite MSH (Undecylenoyl phenylalanine)', 'B-white (Oligopeptide-68)', 'K3 Vita C (Aminopropyl ascorbyl phosphate)', 'Chromobright (Dimethylmethoxy chromanyl palmitate)'],
    application: [
      'Nanesite svake večeri na čitavo lice nakon čišćenja.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Circadia Licorice & Bearberry Brightening tonikom, Circadia Bright Light serumom ili Circadia Vitamin C Reversal serumom te Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'svi tipovi kože', 'hiperpigmentacije'],
    imageNeedsResize: true
  },
  {
    id: '45',
    title: 'Light Day Sunscreen Broad Spectrum SPF37',
    description: `Lagana krema koja sadrži ekstrakt kulture matičnih stanica grožđa kako bi poboljšao fotoprotekciju i odgodio starenje stanica. Brzo se upija i ima elegantan osjećaj, namijenjen je svakodnevnoj uporabi.

Sadrži UVA/UVB zaštitu.

Namijenjen je svim tipovima kože i ima hidratantna i anti-age svojstva.`,
    category: 'Zaštita od sunca',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije', 'Hidratacija', 'Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/circadia/CircadiaLightDaySunscreenBroadSpectrumSPF37.webp',
    price: '69 EUR',
    volume: '59 ml',
    activeIngredients: ['SolaStay (Ethylhexyl Methoxycrylene)', 'PhytoCellTech Solar Vitis (grape stem cell extract)', 'Lipochroman 6 (Dimethylmethoxy chromanol)', 'Preventhilia (Diaminopropionoyl Tripeptide-33)'],
    application: [
      'Nanesite obilno (oko 2 g ili 1/3 žličice) na lice, vrat i uši 15 minuta prije izlaganja suncu.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite svaki dan uz odgovarajući Circadia tonik, Circadia serum i Circadia kremu, ovisno o tipu i problematici kože."
      }
    ],
    tags: ['krema', 'zaštita od sunca', 'svi tipovi kože', 'sve problematike (osim opadanja kose)'],
    imageNeedsResize: true
  },
  {
    id: '46',
    title: 'Serum 71',
    description: `Serum 71 je formulacija bogata hranjivim sastojcima i pojačivačima imuniteta s moćnim triom traneksamične, mandelične i azelaične kiseline.

Sadrži Beta glukan druge generacije i Neodermyl®, bakarni peptid nove generacije koji pomaže u obnavljanju kolagena i elastina.

Pogodan za sve tipove kože.

Ima anti-aging svojstva i svojstva posvjetljivanja kože.`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega', 'Hiperpigmentacije'],
    image: '/images/products/circadia/CircadiaSerum71.webp',
    price: '89 EUR',
    volume: '15 ml',
    activeIngredients: ['Tranexamic Acid: 2%', 'Azelaic Acid: 0.3%', 'Mandelic Acid: 5%', 'CM-Glucan Forte', 'NeoDermyl'],
    application: [
      'Svaku večer nanesite jednu pumpicu seruma na lice.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim Circadia tonikom, Circadia AquaPorin Hydratating kremom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['serum', 'svi tipovi kože', 'anti-age', 'hiperpigmentacije'],
    imageNeedsResize: true
  },
  {
    id: '47',
    title: 'Nighttime Repair',
    description: `Ova napredna formula cilja na znakove starenja popravljajući oštećenja i sprječavajući daljnju štetu. S dodatnom snagom vitamina A, peptida i ceramida, nudi poboljšane koristi. Ne samo da štiti od UV oštećenja i pomaže u popravku DNA, već učinkovito smanjuje pojavu bora poticanjem sinteze kolagena.

Smanjuje bore i povećava čvrstoću i elastičnost kože. Pomlađuje stanice kože i nudi visoku antioksidativnu zaštitu.

Pogodan za korištenje na oštećenoj koži i koži koja pokazuje prve znakove starenja`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/CircadiaNighttimeRepair.webp',
    price: '93 EUR',
    isForNight: true,
    volume: '59 ml',
    warnings: [
      'Sadrži umjerenu količinu Vitamina A (0,3%) koja je pogodna za početak korištenja proizvoda s retinolom!'
    ],
    activeIngredients: ['Vitamin A (Retinyl acetate)', 'SK-Influx', 'Synchrolife® (Rosmarinus Officinalis, Extract (and) Palmitoyl Tetrapeptide-7 (and) Chrysin)', 'TECA', 'Timecode'],
    application: [
      'U večernjim satima, nanijeti jednu pumpicu na čistu kožu lica i vrata potezima prema gore.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite u kombinaciji s odgovarajućim Circadia tonikom, Circadia Vitamin C Reversal serumom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'svi tipovi kože', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '48',
    title: 'Nighttime Repair Plus',
    description: `S većim postotkom vitamina A od Nighttime Repair. Ova napredna formula cilja na znakove starenja ispravljajući štetu i sprječavajući daljnja oštećenja kože. S dodanom snagom vitamina A, peptida i ceramida, pruža poboljšane koristi.

Namijenjen zreloj koži ili koži s većim oštećenjima

Smanjuje bore, povećava elastičnost i čvrstoću kože, nudi visoku antioksidacijsku zaštitu i oživljava stanice kože.`,
    category: 'Krema',
    marka: 'Circadia',
    isForNight: true,
    productType: 'Krema',
    skinType: ['Zrela koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/CircadianighttimeRepairPlus.webp',
    price: '116 EUR',
    volume: '59 ml',
    activeIngredients: ['Vitamin A (Retinyl acetate)', 'SK-Influx', 'Synchrolife® (Rosmarinus Officinalis, Extract (and) Palmitoyl Tetrapeptide-7 (and) Chrysin)', 'TECA', 'Timecode'],
    application: [
      'Uvečer, na čistu kožu lica i vrata nanijeti jednu pumpicu potezima prema gore.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite u kombinaciji s odgovarajućim Circadia tonikom, Circadia Vitamin C Reversal serumom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'zrela koža', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '49',
    title: 'MeriStem serum',
    description: `Serum koji sadrži egzotične ekstrakte matičnih stanica jabuke i planinskog ljiljana koji sinergijski djeluju kako bi usporili starenje dok istovremeno štite kožu od oštećenja slobodnih radikala.

Sadrži sastojke koji pomažu stanicama kože da izgrade novo tkivo te je bogat antioksidansima.

Smanjuje bore i fine linije te revitalizira kožu i čini ju elastičnom.

Namijenjen svim tipovima kože.`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/CircadiaMeriStemSerum.webp',
    price: '62 EUR',
    volume: '15 ml',
    activeIngredients: ['Apple (Malus Domestica) stem cell extract', 'Distinctive Phytostem Edelweiss stem cell extract (Leontopodium alpinum meristem cell culture extract)', 'Aloe Vera Gel-Eco (Aloe barbadensis) extract', 'Cyclopeptide-5'],
    application: [
      'Koristite ujutro i navečer na očišćenoj koži.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim Circadia tonikom, Circadia Phito-Pep 1.6 kremom i Circadia Light Day Sunscreen Broad Spectrum SPF37."
      }
    ],
    tags: ['serum', 'svi tipovi kože', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '50',
    title: 'Phito-Pep 1.6',
    description: `PhiTo-Pep 1.6 je hidratantna krema obogaćena peptidima koja održava vrhunsko stanje kože, optimalnu funkciju barijere i razinu vlage s mješavinom hidratantnih agensa, peptida i biljnih ekstrakata posebno za klijente koji počinju primjećivati znakove starenja.

Ovaj proizvod također može biti korišten kao alternativni tretman vitaminu A (retinolu) za zrelu kožu.

Štiti kožu od oštećenja slobodnim radikalima koji uzrokuju oštećenje lipida i DNA te ima antioksidativna svojstva.

Namijenjen svim tipovima kože.`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/CircadiaPhito-Pep1.6krema.webp',
    price: '85 EUR',
    volume: '59 ml',
    application: [
      'Nakon čišćenja kože i nanošenja seruma nanesite malu količinu kreme na lice i vrat.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti s odgovarajućim Circadia tonikom, Circadia MeriStem serumom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'svi tipovi kože', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '51',
    title: 'Revita-Cyte Complex',
    description: `Formuliran kao alternativa za vitamin A losion koji se koristi kada su retinoidi kontraindicirani.

Losion s peptidima, antioksidantima, biljnim sastojcima i vitaminima koji stiti od okolišnih i UV oštećenja

Ovaj kompleks protiv bora s anti-age učinkom pomaže koži da se osjeća i izgleda čvršće i glađe, pružajući istovremeno trenutačnu mekoću pri nanošenju.

Namijenjen osjetljivoj i oštećenoj koži, koži osjetljivoj na Vitamin A, koži sa znakovima starenja, suhoj koži.

Namijenjen za sve tipove kože.`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/Revita-CyteComplex.webp',
    price: '153 EUR',
    volume: '59 ml',
    activeIngredients: ['EUK-134', 'Pepha-ctive (Microalgae extract)', 'Revitalin PF (Purified mitochondrial and cytoplasmic fraction from yeast)', 'Oat Beta Glucan', 'Thymulen 4 (Acetyl-Tetrapeptide-2)', 'Exo-T (Exopolysaccharide from microorganisms living in rims of Polynesian atolls)', 'Chronocyclin (Chronopeptide)', 'Tocopherol (Vitamin E)'],
    application: [
      'Koristite svake večeri, nakon čišćenja i nanošenja seruma. Količinu graška na vrhovima prstiju i nježno nanesite na lice i vrat uz lagane pokrete prema gore.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim Circadia tonikom, Circadia Cyto-Comm i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'svi tipovi kože', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '52',
    title: 'Cyto-Comm',
    description: `Ovaj lagani hidratantni serum dizajniran je za poboljša prirodne komunikacijske puteve kože, čime pomaže u procesima popravka i restrukturiranja.

Komunikacija između stanica vitalna je za zdravlje kože!

Odličan za kožu kojoj nedostaje kolagena i elastičnosti.

Posebna formulacija amino-kiselina smanjuje opuštenost kože i bore, dok peptidi smanjuju pojavu sitnih linija i bora.

Namijenjen svim tipovima kože, posebno koži sa znakovima starenja`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/CircadiaCytoComm.webp',
    price: '69 EUR',
    volume: '15 ml',
    activeIngredients: ['DermalRx LuShield (Osmanthus Fragrans Flower Extract)', 'DermCom (Crocus Crysanthus bulb extract)', 'Progeline (F3acetyl Tripeptide-2)', 'Vita C (Aminopropyl ascorbyl phosphate)', 'L-Glycine', 'L-Lysine', 'L-Proline', 'L-Valine', 'L-Alanine'],
    application: [
      'Uvečer, nakon čišćenja i toniranja, nanesite Cyto-Comm.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s odgovarajućim Circadia tonikom, Circadia Revita-Cyte Complex kremom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['serum', 'svi tipovi kože', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '53',
    title: 'Myo-Cyte Plus',
    description: `Ovaj nagrađivani serum sadrži Matrixyl®, Matrixyl® 3000, Snap 8 i InylineTM, kako bi znatno poboljšao izgled izražajnih linija.

Multi-peptidna formula inhibira određene spojeve koji uzrokuju bore u koži te je odličan za mimičke i duboke bore.

Stimulira proizvodnju i regeneraciju kolagena i povećava elastičnost kože.

Namijenjen je zreloj koži.`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Zrela koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/circadia/CircadiaMyo-CytePlus.webp',
    price: '220 EUR',
    volume: '15 ml',
    activeIngredients: ['Matrixyl™ (Palmitoyl Pentapeptide)', 'Matrixyl 3000™ (Palmitoyl Pentapeptide-3)', 'Snap-8 (Acetyl Octapeptide-3)', 'Inyline (Acetyl Hexapeptide-30)', 'Hyaluronic Acid', 'L-Proline', 'L-Carnosine', 'L-Threonine', 'L-Glycine', 'Passion Flower Extract'],
    application: [
      'Ujutro i navečer nakon čišćenja, nanesite jednu ili dvije kapi na vrhove prstiju i nježno umasirajte na područja izraženih bora na licu (čelo, oko usta i vanjski kut očiju). Ne nanosite na kapke.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak koristite s odgovarajućim Circadia tonikom, Circadia AquaPorin Hydrating kremom i Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['serum', 'svi tipovi kože', 'anti-age'],
    imageNeedsResize: true
  },
  {
    id: '54',
    title: 'Post Peel Balm',
    description: `Ova umirujuća krema odlična je za upotrebu nakon kemijskih pilinga kako bi smirila i umirila kožu.

Sadrži kompleks lipida identičan koži koji povećava kapacitet zadržavanja vode i pruža polu-okluzivnu i zaštitnu barijeru.

Brzo upijajući balzam koji smiruje kožu.`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Masna koža', 'Mješovita koža', 'Normalna koža', 'Suha koža', 'Osjetljiva koža'],
    skinConcern: ['Hidratacija', 'Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/circadia/CircadiaPostPeel.webp',
    price: '77 EUR',
    volume: '59 ml',
    activeIngredients: ['Thermostressine (Acetyl Tetrapeptide-22)', 'Panthenol (provitamin B5)', 'Royal Jelly', 'Squalane butter 45 (squalane, Caprylic/ Capric Triglyceride, Behenyl Behenate, and Tribehenin)', 'Meadowfoam Seed Oil Enhanced [Vegetable oil (Olus Oil)]'],
    application: [
      'Nanesite dva puta dnevno, ujutro i navečer, ili koliko je god potrebno kroz dan kako bi umirio kožu.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Koristite nakon kemijskog pilinga, mezoterapije ili PRP tretmana. Ne nanosite na oštećenu kožu. Koristite s Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'svi tipovi kože', 'hidratacija', 'Umirivanje kože'],
    imageNeedsResize: true
  },
  {
    id: '55',
    title: 'Chrono-Calm',
    description: `Chrono-Calm je lagani hidratantni serum na bazi vode koji umiruje kronično iritiranu kožu i poboljšava izgled crvenila i proširenih kapilara.

Sadrži peptide koji smanjuju crvenilo lica i proširenje krvnih žila te biljne ekstrakte koji aktiviraju sustav popravka kože te imaju protuupalna i antioksidativna svojstva.

Namijenjen osjetljivoj koži, koži sklonoj crvenilu, iziritiranoj koži, koži s vidljivim kapilarima i rosaceom`,
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Serum',
    skinType: ['Osjetljiva koža'],
    skinConcern: ['Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/circadia/CircadiaChronoCalm.webp',
    price: '69 EUR',
    volume: '15 ml',
    activeIngredients: ['Telangyn (AcetylTripeptide-33)', 'MAXnolia (Extract blend of Magnolia bark and grape seeds)', 'Panthenol- (provitamin B5)', 'Aldavine (two sulphated polysaccharides extracted from algae)', 'Abbysine PF (Exopolysaccharide from an extremophile living in deep-sea hydrothermal vents)', 'Ginger extract Anti-inflammatory', 'Marshmallow extract', 'QuenchT'],
    application: [
      'Nanesite dva puta dnevno na očišćenu kožu.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Circadia Aloe & Calendula tonikom, Circadia Tranquili kremom i Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['serum', 'osjetljiva koža', 'Umirivanje kože'],
    imageNeedsResize: true
  },
  {
    id: '56',
    title: 'Tranquili-Cream',
    description: `Krema osmišljena za osobe s osjetljivom kožom i/ili rozacejom.

Sadrži hidratizirajuće agense i moćne antiiritante koji pomažu u smanjenju crvenila i osjećaja svrbeža te poboljšavaju mekoću i ugodnost kože pri nanošenju.

Ekstrakti biljaka djeluju na smanjenje crvenila, iritacija i svrbeža kože. Sadrži peptide i njegujuće lipidne komplekse koji pomažu obnoviti integritet barijere kože.

Odmah nakon uporabe koža je manje iritirana, mekša i hidratizirana.`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Osjetljiva koža'],
    skinConcern: ['Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/circadia/CircadiaTranquilicream.webp',
    price: '69 EUR',
    volume: '15 ml',
    activeIngredients: ['SepiCalm VG (Sodium palmitoyl proline and Nymphaea alba flower extract)', 'DermCom (Crocus Crysanthus bulb extract)', 'Caresoft (Purified fraction of Curculigo orchioides root)', 'Symsitive 1609 (4-t-Butylcyclohexanol)', 'Marrubium Stem cell (Marrubium vulgare meristem cell culture)'],
    application: [
      'Ujutro i navečer, nakon čišćenja i toniziranja lica te nanošenja odgovarajućeg seruma, nanesite lagano na lice i vrat.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Circadia Aloe & Calendula tonikom, Circadia Chrono-Calm serumom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'osjetljiva koža', 'Umirivanje kože'],
    imageNeedsResize: true
  },
  {
    id: '57',
    title: 'Aloe & Calendula Calming Mist',
    description: `Umirujuća mješavina aloe, kalendule, cvijeta bazge, ruže i ekstrakata morske bičevine pomaže smiriti nelagodu povezanu s rozacejom i osjetljivom kožom.

Ekstrakt aloe potiče zacjeljivanje kože i ima umirujuće djelovanje.

Hidratizira i umiruje nadraženu kožu te smiruje tegobe povezane s rosaceom i nadraženom kožom.`,
    category: 'Tonik',
    marka: 'Circadia',
    productType: 'Tonik',
    skinType: ['Osjetljiva koža'],
    skinConcern: ['Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/circadia/CircadiaAloe&CalendulaMist.webp',
    price: '38 EUR',
    volume: '118 ml',
    activeIngredients: ['MariMoist (Chondrus Crispus extract)', 'SepiCalm VG (Sodium palmitoyl proline and Nymphaea alba flower extract)', 'Aloe Vera Gel (Aloe Barbadensis Leaf extract)', 'Calendula (Calendula officinalis)', 'Chamomile extract [Chamomilla Recutita (Matricaria) Flower]', 'Elderflower (Sambucus Nigra Flower) extract', 'Rose (Rosa Centifolia Flower) extract'],
    application: [
      'Nakon čišćenja, zatvorite oči i lagano poprskajte.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristite s Circadia Chrono-Calm serumom, Circadia Tranquili kremom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['tonik', 'osjetljiva koža', 'Osjetljiva koža i koža sklona rozaceji', 'umirivanje kože'],
    imageNeedsResize: true
  },
  {
    id: '58',
    title: 'Rose-Ease Relief Cream',
    description: `Ova krema pomaže smiriti crvenilo i iritaciju povezanu s rosaceom, dok pomaže u kontroli grinja demodexa, za koju se smatra da pridonosi rosacei.

Za osobe kojima je dijagnosticirana rozacea. Lagan je i podržava funkciju barijere i zadržavanje vlage.`,
    category: 'Krema',
    marka: 'Circadia',
    productType: 'Krema',
    skinType: ['Osjetljiva koža'],
    skinConcern: ['Umirivanje kože', 'Osjetljiva koža i koža sklona rozaceji'],
    image: '/images/products/circadia/CircadiaRoseEaseRelief.webp',
    price: '85 EUR',
    volume: '50 g',
    activeIngredients: ['Linoleic Esters', 'Evening Primrose', 'Rosemary', 'Cinnamon oil'],
    application: [
      'Ujutro i navečer nakon čišćenja lagano nanesite na zahvaćena područja.',
      'Započnite s korištenjem 2 do 3 puta tjedno, a zatim postupno povećavajte broj korištenja u tjednu.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti s Aloe & Calendula Calming tonikom, Circadia Chrono-Calm serumom i Circadia Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['krema', 'osjetljiva koža', 'Osjetljiva koža i koža sklona rozaceji'],
    imageNeedsResize: true
  },
  {
    id: 'emergency-eye-lift',
    title: 'Emergency Eye Lift',
    description: 'Ovaj kristalno prozirni gel trenutno zateže i podiže područje oko očiju te popunjava fine linije za mlađi izgled. Ima učinak trenutačnog zatezanje i učvršćivanja područja oko očiju. Hidratizira i popunjava fine linije i bore. Namijenjen je svim tipovima kože. Savršen je za primjenu prije posebnog događaja, s dugotrajnim rezultatima. Dužim korištenjem pomlađuje područje oko očiju.',
    previewDescription: 'Kristalno prozirni gel za trenutno zatezanje i podizanje područja oko očiju',
    category: 'Serum',
    marka: 'Circadia',
    productType: 'Gel',
    skinType: ['Svi tipovi kože'],
    skinConcern: ['Anti-age', 'Hidratacija', 'Okoloočno područje'],
    image: '/images/products/circadia/CircadiaEmergencyEyeLift.webp',
    price: '69 EUR',
    volume: '15 ml',
    activeIngredients: ['Sodium Hyaluronate', 'Panthenol (provitamin B5)', 'Pentacare (Hydrolyzed gluten and Ceratonia Siliqua Gum)', 'Pephatight (Microalgae extract)', 'Distinctive Phytostem Gardenia stem cell extract (Gardenia jasminoides meristem cell culture)'],
    application: [
      'Koristite po potrebi. Nanesite jednu kap na vrh prsta i nježno umasirajte.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, nanesite gel, stavite silikonski jastučić za okoloočno područje i držite ga dok se ne osuši. Koristite ga s Circadia Vitamin C serumom, Circadia AquaPorin Hydrating kremom i Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom. Možete ga koristiti kao make-up primer."
      }
    ],
    tags: ['okoloočno područje', 'svi tipovi kože', 'anti-age', 'hidratacija'],
    imageNeedsResize: true
  },
  {
    id: 'full-circle-eye-repair',
    title: 'Full Circle Eye Repair',
    description: 'Pojačava prirodni ciklus obnove kože dok pomaže u sprječavanju nastanka novih linija i smanjenju natečenosti. Peptidi potiču, popravljaju i povećavaju formiranje kolagena te smanjuju nastanak novih linija. Vitamin A jača potpornu tkivu, pomaže u rastu i popravku epidermisa, potiče fibroblastične stanice da proizvode kolagen i zadebljavaju kožu, poboljšavajući čvrstoću i elastičnost. Djeluje na smanjenje nakupljanja tekućine na području oko očiju.',
    previewDescription: 'Set za okoloočnu njegu koji pojačava prirodni ciklus obnove kože',
    category: 'Set',
    marka: 'Circadia',
    productType: 'Set',
    skinType: ['Svi tipovi kože'],
    skinConcern: ['Anti-age', 'Hidratacija', 'Okoloočna njega', 'Hiperpigmentacije'],
    image: '/images/products/circadia/CircadiaFullCircleEyeRepair.webp',
    price: '154 EUR',
    volume: '30 ml',
    activeIngredients: ['Argireline (acetyl hexapeptide-8)', 'Haloxyl (N-hydroxylsuccinimide, Chrysin, Palmitoyl oligopeptide, Palmitoyl Tetrapep-tide-7)', 'A2G (L-ascorbic acid 2-glucoside)'],
    application: [
      'Set se sastoji od dnevne i noćne okoloočne njege. Nanesite malu količinu proizvoda ujutro i navečer na čisto lice.'
    ],
    proTips: [
      {
        title: "Glow tip",
        description: "Za najbolji učinak, koristiti s Circadia Vitamin C serumom, Circadia AquaPorin Hydrating kremom i Light Day Sunscreen Broad Spectrum SPF37 kremom sa zaštitnim faktorom."
      }
    ],
    tags: ['okoloočna njega', 'svi tipovi kože', 'anti-age', 'hidratacija', 'hiperpigmentacije'],
    imageNeedsResize: true
  }
  
]; 

// Utility function to get popular products
export const getPopularProducts = () => {
  const popularProductIds = ['15', '31', '22', '11'];
  const popularProducts: Product[] = [];
  
  for (const id of popularProductIds) {
    const product = products.find(p => p.id === id);
    if (product) {
      popularProducts.push(product);
    }
  }
  
  return popularProducts;
};