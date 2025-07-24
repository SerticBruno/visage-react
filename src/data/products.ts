export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
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
  indications?: string[];
  tags?: string[];
}

export const productCategories = [
  'Čišćenje lica',
  'Tonik',
  'Piling',
  'Maska',
  'Krema',
  'Serum',
  'Okoloočna njega',
  'Zaštita od sunca',
  'Njega kose',
  'Noćna njega',
  'Ampule'
];

// New product types for "Tip proizvoda"
export const productTypes = [
  'Čistač',
  'Tonik',
  'Scrub',
  'Krema',
  'Serum',
  'Okoloočna njega',
  'SPF krema',
  'Sprej',
  'Kapsule',
  'Ampule'
];

// New skin types for "Tip kože"
export const skinTypes = [
  'Masna i mješovita koža',
  'Osjetljiva koža',
  'Suha i normalna koža'
];

// New skin concerns for "Problematika kože"
export const skinConcerns = [
  'Akne i problematična koža',
  'Anti-aging njega',
  'Hiperpigmentacije',
  'Opadanje kose'
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Energizing Cleanser',
    description: `Gel sredstvo za čišćenje uklanjanje prljavštinu, prašinu i šminku, zajedno s viškom masnoće i mrtvih stanica kože nakupljenim tijekom dana.

Gel za čišćenje čuva neke slojeve masnoće na koži što sprječava isušivanje kože.

Čisti, pročišćava i tonizira kožu.`,
    category: 'Čišćenje',
    productType: 'Čistač',
    skinType: ['Suha i normalna koža', 'Osjetljiva koža'],
    skinConcern: ['Anti-aging njega'],
    image: '/images/products/toskanienergizingcleanser.webp',
    price: '40 EUR',
    volume: '200 ml',
    activeIngredients: ['Cimet', 'Curcuma', 'Đumbir'],
    application: [
      'Nanesite svako jutro i noć, izravno na mokru kožu',
      'Emulgirajte proizvod na licu i vratu i nanesite laganom kružnom masažom tijekom 1 minute',
      'Uklonite proizvod mokrim ručnikom ili spužvom',
      'Nanesite Bamboo Hydratonic',
      'Nanesite adekvatni TOSKANI mesoserum i kremu'
    ],
    tags: ['čišćenje lica', 'normalna koža', 'mješovita koža', 'suha koža']
  },
  {
    id: '2',
    title: 'Purifying Cleanser',
    description: `Gel bez ulja koji nježno čisti lice i područje oko očiju. Preporuča se za mješovitu i masnu kožu.

Ovaj gel za čišćenje uklanja nečistoće i višak sebuma koji začepljuju pore i dovode do stvaranja komedona i prištića na koži sklonoj aknama.

Purifying Cleanser regulira proizvodnju sebuma i ostavlja kožu čistom, svježom, glatkom i mirnom.

Ovo sredstvo za čišćenje može se koristiti i na tijelu.`,
    category: 'Čišćenje',
    productType: 'Čistač',
    skinType: ['Masna i mješovita koža'],
    skinConcern: ['Akne i problematična koža'],
    image: '/images/products/TOSKANIpurifyingcleanser.webp',
    price: '40 EUR',
    volume: '200 ml',
    activeIngredients: ['Hamamelis Virginiana Extract', 'Mliječna kiselina', 'Purifying Complex', 'Salvia Officinalis Extract', 'Urea'],
    application: [
      'Nanesite svako jutro i noć, izravno na mokru kožu',
      'Emulgirajte proizvod na licu i vratu i nanesite ga kružnom masažom tijekom 1 minute',
      'Uklonite proizvod s puno vode',
      'Nanesite Bamboo Hydratonic',
      'Prema potrebi nanesite kremu za pročišćavanje i intenzivni serum'
    ],
    tags: ['čišćenje lica', 'masna koža', 'mješovita koža']
  },
  {
    id: '3',
    title: 'Bamboo Hydratonic',
    description: `Tonik bez ulja koji obnavlja kožu i temeljito čisti uklanjajući sve tragove prljavštine i šminke. Pogodan je za sve tipove kože.

Ovaj tonik sa svježim mirisom revitalizira i hidratizira kožu za potpuno pročišćen i osvježen osjećaj.

Kombinira visoku koncentraciju biljnih ekstrakata kao što su bambus, limun i naranča, koji su prirodni izvor alfa-hidroksi kiselina.`,
    category: 'Tonik',
    productType: 'Tonik',
    skinType: ['Masna i mješovita koža', 'Osjetljiva koža', 'Suha i normalna koža'],
    skinConcern: ['Anti-aging njega', 'Akne i problematična koža', 'Hiperpigmentacije'],
    image: '/images/products/toskanibamboohydratonic.webp',
    price: '30 EUR',
    volume: '200 ml',
    activeIngredients: ['Aloe Vera Ekstrakt', 'Bambusova voda', 'Ekstrakt javora', 'ekstrakti naranče i limuna'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje kako biste uklonili nečistoću s lica',
      'Nanesite laganom maglicom proizvoda na lice, uvijek održavajući razumnu udaljenost, ili pomoću pamučne podloge',
      'Koža će na kraju biti potpuno čista, svježa, glađa i spremna za sljedeće tretmane (profesionalna upotreba)',
      'Kod kuće, kada završite s primjenom Bamboo Hydratonic-a, nanesite mesoserum i kremu koji odgovaraju vašem tipu kože'
    ],
    tags: ['tonik', 'svi tipovi kože']
  },
  {
    id: '4',
    title: 'Nutritive Scrub',
    description: `Idealan za suhu i normalnu kožu, TOSKANI Nutritive Scrub sadrži ulje Rosa Mochata, sjemenke i vitamin E koji učinkovito zaglađuju kožu i smanjuju nesavršenosti za zdraviji i mlađi izgled.

Ovaj piling ostavlja kožu osvježenom, vidljivo čišću i mekšom uz zdrav sjaj u koji ćete se zaljubiti.`,
    category: 'Piling',
    productType: 'Scrub',
    skinType: ['Suha i normalna koža', 'Osjetljiva koža'],
    image: '/images/products/toskaninutritivescrub.webp',
    price: '45 EUR',
    volume: '200 ml',
    activeIngredients: ['Blueberry Extract', 'Lemon Extract', 'Maple Extract', 'Musk rose oil', 'Orange Extract', 'Vitamin E'],
    application: [
      'Uklonite šminku i temeljito očistite lice Energizing gel sredstvom za čišćenje',
      'Navlažite lice Bamboo Hydratonic-om ili (toplom) vodom. Nikada ne koristite vruću vodu. Može isušiti i oštetiti kožu',
      'Ulijte hranjivi piling na vrhove prstiju i nježno trljajte ruke kako biste stvorili pjenušavu pjenu',
      'Nutritivnim pilingom nježno masirajte lice, vrat i dekolte, ravnomjernim kružnim pokretima i usredotočite se na problematična područja kao što su t-zona, brada i kutovi usta',
      'Pričekajte 10-15 minuta',
      'Zatim isperite mlakom vodom i slijedite to prskanjem hladne vode kako biste stegnuli i zatvorili pore',
      'Kad završite, nježno tapkajte lice ručnikom. Ne trljajte ili grubo sušite lice. Uvijek budite nježni',
      'Nanesite mesoserum i kremu TOSKANI koji su prikladniji za vašu kožu'
    ],
    tags: ['piling', 'suha koža', 'normalna koža']
  },
  {
    id: '5',
    title: 'Purifying Scrub',
    description: `Piling na bazi vode koji čisti kožu i preporučuje se za mješovitu i masnu kožu.

Formuliran s marokanskom glinom, ovaj piling uklanja višak ulja i stanica sa površinskih slojeva kože pročišćavajući pore.

Koža izgleda sjajnije, dok su sjaj i suhoća svedeni na minimum.

Formuliran je s ekstraktom hamamelisa s adstringentnim svojstvima, koji ostavlja osvježenu i ujednačenu kožu.`,
    category: 'Piling',
    productType: 'Scrub',
    skinType: ['Masna i mješovita koža'],
    image: '/images/products/toskanipurifyingscrub.webp',
    price: '45 EUR',
    volume: '200 ml',
    activeIngredients: ['Hamamelis Virginiana Extract', 'Marokanska glina od lave', 'Vitamin E'],
    application: [
      'Uklonite šminku i očistite lice Energizing gel sredstvom za čišćenje',
      'Navlažite lice Bamboo hidratonskom ili (toplom) vodom.',
      'Nanesite pročišćavajući piling uz pomoć prstiju.',
      'Nježno masirajte piling po licu, vratu i dekolteu',
      'Koristite ravnomjerne kružne pokrete i usredotočite se na problematična područja poput t-zone, brade i kutova usta',
      'Neka piling djeluje na kožu oko 4 minute.',
      'Zatim uklonite proizvod vodom sobne temperature.',
      'Kad završite, nježno tapkajte lice ručnikom.',
      'Nanesite mesoserum i kremu TOSKANI koji su prikladni za vašu kožu'
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
    productType: 'Krema',
    skinType: ['Suha i normalna koža'],
    image: '/images/products/toskanitotalrecoverycream.webp',
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
    productType: 'Krema',
    skinType: ['Osjetljiva koža'],
    image: '/images/products/toskanitotalrecoverygel.webp',
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
    title: 'Radiance Daily Cream SPF 30+',
    description: `Krema je za svakodnevnu upotrebu koja je namijenjena ispravljanju znakova fotostarenja. Pogodna je za sve tipove kože.

Sprječava dehidraciju, gubitak sjaja, mlitavost i pojavu bora i mrlja.

Osim toga, Radiance dnevna krema ima visoki zaštitni faktor za zaštitu od oštećenja uzrokovanih izlaganjem suncu.

Sadrži liposomske aktivne sastojke za promicanje maksimalne učinkovitosti proizvoda.

Preporuča se kao njega dehidrirane kože, kože s tamnim mrljama, foto-ostarjeloj koži, koži nejednake pigmentacije te kao dodatak profesionalnim tretmanima za ujednačavanje tona kože (Spot Out Kit Plus, kemijski piling)`,
    category: 'Krema',
    productType: 'SPF krema',
    skinType: ['Osjetljiva koža', 'Suha i normalna koža'],
    image: '/images/products/toskaniradiancedailycream.webp',
    price: '60 EUR',
    volume: '50 ml',
    application: [
      'Nanesite jednom dnevno, ujutro.',
      'Uklonite šminku i očistite kožu Energizing Cleanser gelom za čišćenje, a tonizirajte Bamboo hidratonikom',
      'Nanesite male količine Radiance Mesoserum-a na cijelo lice',
      'Nanesite proizvod laganim tapkanjem prstiju 2-3 kapi po površini lica, vrata i dekoltea pola minute. Možete koristiti sve prste obje ruke sa svake strane lica. Ne produžujte je silom ili agresivno trljajući kožu',
      'Tek kad je Radiance Mesoserum potpuno suh, možete nanijeti Radiance Eye Contour i Radiance kremu na isti način.',
      'Ostavite da se krema upije prije nanošenja bilo koje vrste šminke'
    ],
    tags: ['spf', 'hiperpigmentacije', 'fotostarenje', 'dnevna njega', 'svi tipovi kože']
  },
  {
    id: '9',
    title: 'Anti Ageing Eye Contour',
    description: 'Posebno formuliran hidratantni serum za smanjenje umora, tretiranje bora, osvježavanje područja oko očiju, hidrataciju i umirivanje nježne kože oko očiju. Njegovi aktivni sastojci koji djeluju u sinergiji kako bi se oduprli pojavi bora, umanjili bore i već formirane linije. Također pomaže u sprječavanju gubitka čvrstoće, pomaže koži da se vrati u njezino prirodno zdravlje i pruža ukupni učinak pomlađivanja.',
    category: 'Okoloočna njega',
    image: '/images/products/toskani-anti-ageing-eye-contour.webp',
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
    image: '/images/products/toskaniradianceeyecontour.webp',
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

Posebno razvijen za ujednačavanje tona kože i smanjenje nesavršenosti: sprječava razvoj novih diskoloracija kože, hidrira, spriječava i uklanja tamne mrlje uzrokovane suncem, vraća sjaj i zdravi izgled koži, poboljšava izgled ožiljaka.

Vaš novi saveznik u borbi protiv hiperpigmetacija sa učinkovitim djelovanjem već u 1. mjesecu upotrebe!`,
    category: 'Serum',
    image: '/images/products/toskaniRADIANCE-ULTIMATE-MESOSERUM.webp',
    price: '77 EUR',
    volume: '30 ml',
    activeIngredients: ['Alfa Arbutin', 'Aspergillus Ferment', 'Azelaična kiselina', 'Azeloglicina', 'Ferulinska kiselina', 'Kojična kiselina', 'Mliječna kiselina', 'Niacinamid', 'Retinol', 'traneksamična kiselina', 'Vitamin C'],
    application: [
      'Uklonite šminku i očistite kožu Energizing Cleanser gelom za čišćenje, a tonizirajte Bamboo hidratonikom',
      'Nanesite malu količinu Radiance Mesoserum-a na cijelo lice',
      'Nanesite proizvod laganim tapkanjem prstiju 2-3 kapi po površini lica, vrata i dekoltea pola minute. Možete koristiti sve prste obje ruke sa svake strane lica. Ne produžujte je silom ili agresivno trljajući kožu',
      'Tek kad je Radiance Mesoserum potpuno suh, možete nanijeti Radiance Eye Contour i Radiance kremu na isti način.',
      'Ostavite da se krema upije prije nanošenja bilo koje vrste šminke'
    ],
    tags: ['serum', 'hiperpigmentacije', 'fotostarenje', 'svi tipovi kože']
  },
  {
    id: '12',
    title: 'Purifying Intensive Serum',
    description: `Gel za isušivanje koji je antibakterijski i vrlo učinkovit protiv mrlja i nesavršenosti.

Ovaj tretman treba povremeno koristiti kako bi se ubrzao nestanak lokaliziranih mrlja, štiteći ih od trenja i bakterija.

Intenzivni serum indiciran je za lokalizirano liječenje mrlja.`,
    category: 'Serum',
    image: '/images/products/toskanipurifyingIntensiveSerum.webp',
    price: '42 EUR',
    volume: '15 ml',
    activeIngredients: ['Purifying actives', 'Purifying Complex', 'Salicylic Acid'],
    application: [
      'Uklonite šminku i očistite kožu Purifying sredstvom za čišćenje, a tonizirajte Bamboo hidratonikom',
      'Nanesite sitne točkice Purifying kreme na cijelo lice, a zatim lagano i brzo pomiješajte cijelo lice',
      'Koristite kratke lagane, ali čvrste poteze za nanošenje proizvoda. Ne istežite, ne povlačite i ne trljajte kožu',
      'Dok je krema još mokra, pola minute polako tapkajte površinom lica. Možete vrlo lagano koristiti sve prste na obje ruke s obje strane lica',
      'Kada se pojave akne, prištići i miteseri, s vremena na vrijeme tijekom dana lokalno nanesite Purifying Intensive serum preko zone s aktivnim lezijama.'
    ],
    tags: ['serum', 'akne', 'prištići', 'lokalizirano liječenje']
  },
  {
    id: '13',
    title: 'Purifying Cream',
    description: `Tekuća emulzija prikladna za masnu i kožu sklonu aknama.

Njeni aktivni sastojci djeluju zajedno kako bi smanjili upalu, smanjili bakterije i regulirali proizvodnju sebuma.

Purifying krema također pomaže koži u borbi protiv slobodnih radikala i pruža vrlo nježan piling uz održavanje razine potrebne hidratacije u koži.

Ova fluidna emulzija ublažava nelagodu kože i preporučljivo je koristiti kremu dva puta dnevno, ujutro i navečer.`,
    category: 'Krema',
    image: '/images/products/TOSKANIPurifyingCream.webp',
    price: '58 EUR',
    volume: '50 ml',
    activeIngredients: ['Ekstrakt lista Hamamelis virginiana', 'Lactic Acid', 'Purifying actives', 'Purifying Complex', 'Rhodosorus Marinus Extract', 'Salicylic Acid', 'Zinc'],
    application: [
      'Uklonite šminku i očistite kožu Purifying gel sredstvom za čišćenje, a tonizirajte Bamboo hidratonikom',
      'Nanesite sitne točkice pročišćujuće kreme na cijelo lice, a zatim lagano i brzo pomiješajte cijelo lice',
      'Koristite kratke lagane, ali čvrste poteze za nanošenje proizvoda. Ne istežite, ne povlačite i ne trljajte kožu',
      'Dok je krema još mokra, pola minute polako tapkajte površinom lica. Možete vrlo lagano koristiti sve prste na obje ruke s obje strane lica',
      'Kada se pojave lokalizirani provali, s vremena na vrijeme tijekom dana lokalno nanesite Purifying Intensive serum preko zone s aktivnim lezijama'
    ],
    tags: ['krema', 'akne', 'prištići', 'masna koža']
  },
  {
    id: '14',
    title: 'Skin Architect Mesoserum',
    description: `Serum za popravak i učvršćivanje. Osigurava snažne njegujuće i hidratantne efekte.

Pomaže pri minimiziranju vidljivih znakova starenja.

Skin Architect mesoserum je serum koji rješava jedan od najfrustrirajućih znakova starenja: opuštenu kožu.`,
    category: 'Serum',
    image: '/images/products/Toskani-Skin-Architect-Mesoserum-1.webp',
    price: '78 EUR',
    volume: '30 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Prirodni Kolagen', 'Tokoferol', 'Vitamin E'],
    application: [
      'Preporučuje se nanošenje Skin Architect Mesoseruma prije Skin Architect kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu Skin Architect Mesoseruma na cijelo lice te brzo razmažite',
      'Nanesite proizvod nježno tapkajući prstima po površini vase kože pola minute. Možete koristiti sve prste na objema rukama sa svake strane vašeg lica. Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.',
      'Tek kada se Skin Architect Mesoserum u potpunosti osuši možete staviti Antiaging Eye Contour i Skin Architect kremu na isti način. Pustite kremu da se u potpunosti upije prije nego nanesete bilo kakvu vrstu šminke.'
    ],
    tags: ['serum', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '15',
    title: 'Skin Architect Cream',
    description: `Visoko koncentrirana krema protiv bora koja koristi prirodne sastojke za poboljšanje izgleda finih linija i dubokih bora.

Sadrži medicinsku hijaluronsku kiselinu i acetil heksapeptid-8 kao liposomski biomimetički peptid.

Oni, zajedno s ostalim sastojcima, pomažu odgoditi učinke starenja na koži i pružaju snažno hidratantno i hranjivo djelovanje.

Koži pruža čvrstoću i elastičnost uz primjetan lifting učinak.

Hijaluronska kiselina niske molekularne težine (<100Kda), za dublju i dugotrajniju hidrataciju.`,
    category: 'Krema',
    image: '/images/products/toskaniskinarchitectcream.webp',
    price: '68 EUR',
    volume: '50 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Organic Silicon', 'Prirodni Kolagen', 'Retinol', 'Shea Maslac', 'Tokoferol', 'Vitamin E'],
    application: [
      'Preporučuje se nanošenje Skin Architect Mesoseruma prije Skin Architect kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu Skin Architect Mesoseruma na cijelo lice te brzo razmažite',
      'Nanesite proizvod nježno tapkajući prstima po površini vase kože pola minute.  Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.',
      'Tek kada se Skin Architect Mesoserum u potpunosti osuši možete staviti Antiaging Eye Contour i Skin Architect kremu na isti način. Pustite kremu da se u potpunosti upije prije nego nanesete bilo kakvu vrstu šminke.'
    ],
    tags: ['krema', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '16',
    title: 'Night Reverse Advanced Serum',
    description: `Noćni serum s Total Restoring Complexom, koji poništava štetu od svakodnevnog stresa i aktivira prirodni mehanizam obnove kože.

Pomaže popraviti kožu od oštećenja uzrokovanih sunčevim zračenjem, zagađenjem, temperaturnim promjenama i lošim navikama.

Jača barijeru kože, pogodan je za sve tipove kože, no najviše se preporučuje suhoj i dehidriranoj koži.`,
    category: 'Serum',
    image: '/images/products/toskani-night-reverse-serum.webp',
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

Pomaže u sprječavanju prvih znakova starenja.

Jača kožnu barijeru.

Pogodan je za biološku dob 20+ godina i sve tipove kože.`,
    category: 'Serum',
    image: '/images/products/toskaniGlacierSerum.webp',
    price: '70 EUR',
    volume: '30 ml',
    activeIngredients: ['Nicotinamide (B3)', 'Derived from vitamin C', 'Glacier termal water', 'Pseudoalteromona ferment extract'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu.',
      'Preporučuje se nanošenje Glacier Pro Age seruma prije Glacier Pro Age kreme.',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu seruma na cijelo lice te brzo razmažite i umasirajte.',
      'Nanesite proizvod nježno tapkajući prstima po površini vase kože pola minute. Možete koristiti sve prste na objema rukama sa svake strane vašeg lica. Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
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
    image: '/images/products/toskaniGlacierCream.webp',
    price: '65 EUR',
    volume: '50 ml',
    activeIngredients: ['Encapsuled ceramide', 'Glacier termal water', 'Kaempherol', 'Liposomal hyaluronic acid'],
    application: [
      'Nanesite jednom ujutro i navečer na čistu kožu.',
      'Preporučuje se nanošenje Glacier Pro Age seruma prije Glacier Pro Age kreme.',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu kreme na cijelo lice te brzo razmažite i umasirajte.',
      'Nanesite proizvod nježno tapkajući prstima po površini vase kože pola minute. Možete koristiti sve prste na objema rukama sa svake strane vašeg lica. Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
    ],
    tags: ['krema', 'anti-age', '20+ godina', 'svi tipovi kože']
  },
  {
    id: '19',
    title: 'Retin Pro Age Serum',
    description: `Lagan i gladak serum koji daje osjećaj hranjivosti nakon nanošenja.

Sastoji se od kompleksa biljnog retinola i liposomalnog retinaldehida s velikom snagom učvršćivanja i protiv bora.

NE SADRŽI RETINOL! Sadrži derivate retinola koji nisu fotoosjetljivi stoga je serum pogodan i za osjetljivu kožu.

Pogodan za biološku dob 30+/40 godina i za sve tipove kože.`,
    category: 'Serum',
    image: '/images/products/toskaniRetinProAge_Serum.webp',
    price: '75 EUR',
    volume: '30 ml',
    activeIngredients: ['Bakuchiol (99% Pure Bakuchiol)', 'Kappaphycus alvarezii extract and Caesalpinia spinosa fruit extract', 'Plant extract of tara and red algae', 'Retinal (retinaldehyde) Lipocapsules', 'Retinol like: Nicotiana Benthamiana Hexapeptide-40 sh-Polypeptide-76'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu.',
      'Preporučuje se nanošenje Retin Pro Age seruma prije Retin Pro Age kreme.',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu seruma na cijelo lice te brzo razmažite i umasirajte.',
      'Nanesite proizvod nježno tapkajući prstima po površini vase kože pola minute. Možete koristiti sve prste na objema rukama sa svake strane vašeg lica. Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
    ],
    tags: ['serum', 'anti-age', '30+/40 godina', 'svi tipovi kože', 'osjetljiva koža']
  },
  {
    id: '20',
    title: 'Retin Pro Age Cream',
    description: `Lako upijajuća krema koja pruža njegujući osjećaj.

Sadrži spoj nastao od hijaluronske i retinoične kiseline te retinola biljnog podrijetla koji daje snagu protiv bora, zaglađuje nesavršenosti i ujednačava ton.

NE SADRŽI RETINOL! Sadrži derivate retinola koji nisu fotoosjetljivi stoga je serum pogodan i za osjetljivu kožu.

Pogodan za biološku dob 30+/40 godina i za sve tipove kože.`,
    category: 'Krema',
    image: '/images/products/toskaniRetinCream.webp',
    price: '70 EUR',
    volume: '50 ml',
    activeIngredients: ['Kappaphycus alvarezii extract and Caesalpinia spinosa fruit extract', 'Plant based Collagen-Like: Acacia', 'Plant extract of tara and red algae', 'Retinol like: Nicotiana Benthamiana Hexapeptide-40 sh-Polypeptide-76', 'Sodium Retinoyl Hyaluronate (HA+ retinoic acid)'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu.',
      'Preporučuje se nanošenje Retin Pro Age seruma prije Retin Pro Age kreme.',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu kreme na cijelo lice te brzo razmažite i umasirajte.',
      'Nanesite proizvod nježno tapkajući prstima po površini vase kože pola minute. Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
    ],
    tags: ['krema', 'anti-age', '30+/40 godina', 'svi tipovi kože', 'osjetljiva koža']
  },
  {
    id: '21',
    title: 'Unique Pro Age Serum',
    description: `Hranjivi i luksuzni dnevni serum za svakodnevnu primjenu sa širokim izborom anti-age aktivnih sastojaka usmjerenih na svaki od problema koji najviše zabrinjavaju: zategnutost, marionetske bore, Y zona (oval lica i vrat).

Pogodno za biološku dob 45+ godina i za sve tipove kože.`,
    category: 'Serum',
    image: '/images/products/toskaniUniqueProAge_Serum.webp',
    price: '75 EUR',
    volume: '30 ml',
    activeIngredients: ['Bacuri butter', 'Cell oil', 'Manosa-6-fosfato', 'Olea Vita PLF', 'Plant based Collagen Fragment'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu.',
      'Preporučuje se nanošenje Unique Pro Age seruma prije Unique Pro Age kreme.',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu seruma na cijelo lice.',
      'Nanesite proizvod nježno tapkajući prstima po površini vaše kože pola minute.  Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
    ],
    tags: ['serum', 'anti-age', '45+ godina', 'svi tipovi kože']
  },
  {
    id: '22',
    title: 'Unique Pro Age Cream',
    description: `Hranjivi i luksuzni dnevni tretman za svakodnevnu primjenu sa širokim izborom anti-age aktivnih sastojaka usmjerenih na svaki od problema koji najviše zabrinjavaju: zategnutost, marionetske bore, Y zona (oval lica i vrat).

Pogodno za biološku dob 45+ godina i sve tipove kože.`,
    category: 'Krema',
    image: '/images/products/toskaniUniqueCream.webp',
    price: '70 EUR',
    volume: '50 ml',
    activeIngredients: ['4D Hyaluronic Acid:: cross-linked, high, medium and low molecular weight', 'Aminobutyric acid (GABA):', 'Bacuri butter', 'Nourishing Oils: (Meadowfoam, Canola Oil, Helianthus Annuus, Argan, Polyglutamic Acid (PGA)'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu.',
      'Preporučuje se nanošenje Unique Pro Age seruma prije Unique Pro Age kreme.',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera te tonificirajte s Bamboo Hydratonicom.',
      'Nanesite malu količinu kreme na cijelo lice te brzo razmažite i umasirajte.',
      'Nanesite proizvod nježno tapkajući prstima po površini vaše kože pola minute.  Ne nanosite primjenjujući silu ili agresivno trljajući površinu kože.'
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
    category: 'Njega kose',
    image: '/images/products/Anti-hair-loss-lotion.webp',
    price: '36 EUR',
    volume: '100 ml',
    activeIngredients: ['Aminexil', 'Biotin (B8)', 'Nicotinamide (B3)', 'Pyridoxine (B6)', 'Sabal serrulata', 'Vitamin E', 'Vitamin H', 'Zinc'],
    application: [
      'Nanesite proizvod jednom dnevno tijekom najmanje 3 mjeseca liječenja',
      'Masirajte vlasište i ostavite da se prirodno osuši. Može se primijeniti izravno kao intenzivni dnevni tretman ili kao preventivni tretman svaki drugi dan.',
      'Izbjegavajte kontakt s očima, ustima i drugim sluznicama'
    ],
    tags: ['sprej', 'njega vlasišta', 'zaustavljanje gubitka kose', 'jačanje kose', 'alopecija']
  },
  {
    id: '24',
    title: 'DensiHair Boost Capsules',
    description: `Dodatak prehrani koji sadrži Sabal serrulata, vitamine i aminokiseline za jačanje kose i zaustavljanje gubitka kose.`,
    category: 'Njega kose',
    image: '/images/products/toskaniDensiHair-Boost-capsules.webp',
    price: '37 EUR',
    volume: '30 kapsula',
    activeIngredients: ['Aminokiseline Lysine', 'Arginine', 'Biotin (B8)', 'Cistin', 'Sabal serrulata', 'Selen', 'Zinc'],
    application: [
      'Uzmite 2 kapsule na dan kao "šok" tretman prvih 3 mjeseca. Nakon toga uzmite 1 kapsulu dnevno za održavanje rezultata.'
    ],
    tags: ['kapsule', 'njega vlasišta', 'dodatak prehrani', 'zaustavljanje gubitka kose', 'jačanje kose']
  },
  {
    id: '25',
    title: 'Night Reverse Intensive Cream & Mask',
    description: `Intenzivna noćna krema i maska za duboku regeneraciju i obnavljanje kože.`,
    category: 'Noćna njega',
    image: '/images/products/toskani-night-cream.jpg',
    price: '75 EUR',
    volume: '50 ml',
    isNew: true,
    activeIngredients: ['Retinol', 'Vitamin E', 'Shea maslac', 'Hijaluronska kiselina'],
    application: [
      'Nanesite navečer na čistu kožu',
      'Može se koristiti kao noćna krema ili maska',
      'Za masku: nanesite deblji sloj i ostavite 15-20 minuta',
      'Za noćnu kremu: nanesite tanak sloj'
    ],
    tags: ['noćna njega', 'maska', 'anti-age', 'regeneracija', 'svi tipovi kože']
  },
  {
    id: '26',
    title: 'Anti-ageing + HA Ampule',
    description: `Intenzivna ampula s hijaluronskom kiselinom za anti-age tretman i duboku hidrataciju.`,
    category: 'Ampule',
    productType: 'Ampule',
    skinType: ['Suha i normalna koža'],
    image: '/images/products/antiageing_box_ampule.webp',
    price: '52 EUR',
    volume: '15x2ml',
    isNew: true,
    activeIngredients: ['Hijaluronska kiselina', 'Peptidi', 'Anti-age kompleks'],
    application: [
      'Koristite jednu ampulu dnevno',
      'Nanesite na čistu kožu',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['ampule', 'anti-age', 'hijaluronska kiselina', 'hidratacija']
  },
  {
    id: '27',
    title: 'Radiance Ampule',
    description: `Ampula za posvjetljivanje i ujednačavanje tena.`,
    category: 'Ampule',
    image: '/images/products/radiance_box_purifying_box_ampule.webp',
    price: '52 EUR',
    volume: '15x2ml',
    isNew: true,
    activeIngredients: ['Vitamin C', 'Niacinamid', 'Azelaična kiselina'],
    application: [
      'Koristite jednu ampulu dnevno',
      'Nanesite na čistu kožu',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['ampule', 'posvjetljivanje', 'ujednačavanje tena', 'vitamin C']
  },
  {
    id: '28',
    title: 'Sensitive Skin Ampule',
    description: `Umirujuća ampula za osjetljivu kožu.`,
    category: 'Ampule',
    productType: 'Ampule',
    skinType: ['Osjetljiva koža'],
    image: '/images/products/sensitive_box_purifying_box_ampule.webp',
    price: '52 EUR',
    volume: '15x2ml',
    isNew: true,
    activeIngredients: ['Aloe Vera', 'Centella Asiatica', 'Panthenol'],
    application: [
      'Koristite jednu ampulu dnevno',
      'Nanesite na čistu kožu',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['ampule', 'osjetljiva koža', 'umirivanje', 'regeneracija']
  },
  {
    id: '29',
    title: 'Purifying Ampule',
    description: `Ampula za pročišćavanje i kontrolu masnoće.`,
    category: 'Ampule',
    productType: 'Ampule',
    skinType: ['Masna i mješovita koža'],
    image: '/images/products/purifying_box_ampule.webp',
    price: '52 EUR',
    volume: '15x2ml',
    isNew: true,
    activeIngredients: ['Salicylic Acid', 'Zinc', 'Purifying Complex'],
    application: [
      'Koristite jednu ampulu dnevno',
      'Nanesite na čistu kožu',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['ampule', 'pročišćavanje', 'kontrola masnoće', 'akne']
  },
  {
    id: '30',
    title: 'Lipo Proteoglycans Ampule',
    description: `Ampula s lipo proteoglikanima za učvršćivanje i obnavljanje kože.`,
    category: 'Ampule',
    image: '/images/products/lipoproteoglycans_box_purifying_box_ampule.webp',
    price: '52 EUR',
    volume: '15x2ml',
    isNew: true,
    activeIngredients: ['Lipo Proteoglycans', 'Kolagen', 'Elastin'],
    application: [
      'Koristite jednu ampulu dnevno',
      'Nanesite na čistu kožu',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['ampule', 'učvršćivanje', 'obnavljanje', 'anti-age']
  },
  {
    id: '31',
    title: 'Sun Shiel-D Sun Fluid Facial Cream',
    description: `Lagana fluidna krema za zaštitu lica od sunca.`,
    category: 'Zaštita od sunca',
    image: '/images/products/toskani-sun-shield-facial-cream.webp',
    price: '36 EUR',
    volume: '50ml',
    isNew: true,
    activeIngredients: ['SPF 50+', 'UVA/UVB zaštita', 'Hijaluronska kiselina'],
    application: [
      'Nanesite 20 minuta prije izlaganja suncu',
      'Ponovite nanošenje svaka 2 sata',
      'Nanesite na čistu kožu'
    ],
    tags: ['spf', 'zaštita od sunca', 'lice', 'fluidna tekstura']
  },
  {
    id: '32',
    title: 'Sun Shiel-D Sun Fluid Facial Cream Tinted',
    description: `Lagana fluidna krema s tonom za zaštitu lica od sunca.`,
    category: 'Zaštita od sunca',
    image: '/images/products/toskani-sun-shield-facial-cream-tinted.webp',
    price: '39 EUR',
    volume: '50ml',
    isNew: true,
    activeIngredients: ['SPF 50+', 'UVA/UVB zaštita', 'Hijaluronska kiselina', 'Toner'],
    application: [
      'Nanesite 20 minuta prije izlaganja suncu',
      'Ponovite nanošenje svaka 2 sata',
      'Nanesite na čistu kožu'
    ],
    tags: ['spf', 'zaštita od sunca', 'lice', 'fluidna tekstura', 'toner']
  },
  {
    id: '33',
    title: 'Sun Shiel-D Sun Body&Face Sprej',
    description: `Sprej za zaštitu tijela i lica od sunca.`,
    category: 'Zaštita od sunca',
    image: '/images/products/toskani-sun-shield-body-face-spray.webp',
    price: '42 EUR',
    volume: '200ml',
    isNew: true,
    activeIngredients: ['SPF 50+', 'UVA/UVB zaštita', 'Vodootporna formula'],
    application: [
      'Nanesite 20 minuta prije izlaganja suncu',
      'Ponovite nanošenje svaka 2 sata',
      'Nanesite na čistu kožu'
    ],
    tags: ['spf', 'zaštita od sunca', 'tijelo i lice', 'sprej', 'vodootporna']
  },
  {
    id: '34',
    title: 'Profhilo Haenkenium',
    description: `Anti-age krema preoblikuje lice, vrat i dekolte, dajući elastičnost i čvrstoću te ublažavajući sitne bore.

Zahvaljujući povezanosti hijaluronskih kiselina niske i velike molekularne težine i Haenkenium® (ekstrakt Salvia haenkei), Profhilo Haenkenium krema djeluje kao štit za slobodne radikale.

Vraća zaštitnu barijeru osjetljive kože koja je iritirana i crvena zbog oksidativnog stresa ili nakon dermostetskih tretmana.

Sinergistički učinak kompleksa hijaluronske kiseline: HA visoke molekularne težine obnavija i održava integritet hidrolipidnog sloja kože, HA niske molekularne težine održava optimalnu hidriranost kože.`,
    category: 'Krema',
    image: '/images/products/profhilo-haenkenium-visage-estetski-studio.webp',
    price: '54 EUR',
    volume: '50 ml',
    activeIngredients: ['Hijaluronska kiselina visoke molekularne težine', 'Hijaluronska kiselina niske molekularne težine', 'Haenkenium® (ekstrakt Salvia haenkei)'],
    application: [
      'Nanijeti kremu ujutro i/ili navečer na očišćeno lice, vrat i dekolte.'
    ],
    tags: ['krema', 'anti-age', 'profhilo', 'hijaluronska kiselina', 'njega nakon tretmana', 'svi tipovi kože']
  }
]; 