export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
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
  'Čišćenje',
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

export const products: Product[] = [
  {
    id: '1',
    title: 'Energizing Cleanser',
    description: 'Gel sredstvo za čišćenje uklanjanje prljavštinu, prašinu i šminku, zajedno s viškom masnoće i mrtvih stanica kože nakupljenim tijekom dana.',
    category: 'Čišćenje',
    image: '/images/products/toskanienergizingcleanser.webp',
    price: '40 EUR',
    oldPrice: '50 EUR',
    volume: '200 ml',
    isNew: true,
    activeIngredients: ['Cimet', 'Curcuma', 'Đumbir'],
    application: [
      'Nanesite svako jutro i noć, izravno na mokru kožu',
      'Emulgirajte proizvod na licu i vratu i nanesite laganim kružnim masažom tijekom 1 minute',
      'Uklonite proizvod mokrim ručnikom ili spužvom',
      'Nanesite Bamboo Hydratonic',
      'Nanesite adekvatni TOSKANI mesoserum i kremu'
    ],
    tags: ['čišćenje lica', 'normalna koža', 'mješovita koža', 'suha koža']
  },
  {
    id: '2',
    title: 'Purifying Cleanser',
    description: 'Gel bez ulja koji nježno čisti lice i područje oko očiju. Preporuča se za mješovitu i masnu kožu.',
    category: 'Čišćenje',
    image: '/images/products/TOSKANIpurifyingcleanser.webp',
    price: '40 EUR',
    oldPrice: '55 EUR',
    volume: '200 ml',
    isOnSale: true,
    activeIngredients: ['Hamamelis Virginiana Extract', 'Mliječna kiselina', 'Purifying Complex', 'Salvia Officinalis Extract', 'Urea'],
    application: [
      'Nanesite svako jutro i noć, izravno na mokru kožu',
      'Emulgirajte proizvod na licu i vratu i nanesite ga kružnim masažom tijekom 1 minute',
      'Uklonite proizvod s puno vode',
      'Nanesite Bamboo Hydratonic',
      'Prema potrebi nanesite kremu za pročišćavanje i intenzivni serum'
    ],
    tags: ['čišćenje lica', 'masna koža', 'mješovita koža']
  },
  {
    id: '3',
    title: 'Bamboo Hydratonic',
    description: 'Tonik bez ulja koji obnavlja kožu i temeljito čisti uklanjajući sve tragove prljavštine i šminke.',
    category: 'Tonik',
    image: '/images/products/toskanibamboohydratonic.webp',
    price: '30 EUR',
    oldPrice: '35 EUR',
    volume: '200 ml',
    isLimited: true,
    activeIngredients: ['Aloe Vera Ekstrakt', 'Bambusova voda', 'Ekstrakt javora', 'ekstrakti naranče i limuna'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje',
      'Nanesite laganom maglicom proizvoda na lice, uvijek održavajući razumnu udaljenost',
      'Koža će na kraju biti potpuno čista, svježa, glađa i spremna za sljedeće tretmane',
      'Kod kuće, kada završite s primjenom Bamboo Hydratonic-a, nanesite mesoserum i kremu'
    ],
    tags: ['tonik', 'svi tipovi kože']
  },
  {
    id: '4',
    title: 'Nutritive Scrub',
    description: 'Idealan za suhu i normalnu kožu, sadrži ulje Rosa Mochata, sjemenke i vitamin E koji učinkovito zaglađuju kožu.',
    category: 'Piling',
    image: '/images/products/toskaninutritivescrub.webp',
    price: '45 EUR',
    oldPrice: '55 EUR',
    volume: '200 ml',
    isNew: true,
    isOnSale: true,
    activeIngredients: ['Blueberry Extract', 'Lemon Extract', 'Maple Extract', 'Musk rose oil', 'Orange Extract', 'Vitamin E'],
    application: [
      'Uklonite šminku i temeljito očistite lice Energizing gel sredstvom za čišćenje',
      'Navlažite lice Bamboo Hydratonic-om ili (toplom) vodom',
      'Ulijte hranjivi piling na vrhove prstiju i nježno trljajte ruke',
      'Nježno masirajte lice, vrat i dekolte',
      'Pričekajte 10-15 minuta',
      'Isperite mlakom vodom i slijedite to prskanjem hladne vode',
      'Nanesite mesoserum i kremu TOSKANI'
    ],
    tags: ['piling', 'suha koža', 'normalna koža']
  },
  {
    id: '5',
    title: 'Purifying Scrub',
    description: 'Piling na bazi vode koji čisti kožu i preporučuje se za mješovitu i masnu kožu.',
    category: 'Piling',
    image: '/images/products/toskanipurifyingscrub.webp',
    price: '45 EUR',
    oldPrice: '55 EUR',
    volume: '200 ml',
    isLimited: true,
    isOnSale: true,
    activeIngredients: ['Hamamelis Virginiana Extract', 'Marokanska glina od lave', 'Vitamin E'],
    application: [
      'Uklonite šminku i očistite lice Energizing gel sredstvom za čišćenje',
      'Navlažite lice Bamboo hidratonskom ili (toplom) vodom',
      'Nanesite pročišćavajući piling uz pomoć prstiju',
      'Nježno masirajte piling po licu, vratu i dekolteu',
      'Neka piling djeluje na kožu oko 4 minute',
      'Uklonite proizvod vodom sobne temperature',
      'Nanesite mesoserum i kremu TOSKANI'
    ],
    tags: ['piling', 'masna koža', 'mješovita koža']
  },

  {
    id: '8',
    title: 'Total Recovery Gel',
    description: 'Obnavljajući, hidratantni i umirujući gel s aloe verom za mješovitu i masnu kožu.',
    category: 'Krema',
    image: '/images/products/toskanitotalrecoverygel.webp',
    price: '35 EUR',
    oldPrice: '45 EUR',
    volume: '50 ml',
    activeIngredients: ['Aloe Vera Ekstrakt', 'Ekstrakt mimoze Tenuiflora', 'Elastin', 'Hidrolizirani proteini pšenice', 'Kolagen', 'Shea Maslac', 'Vegetable Tensor'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje',
      'Nanesite gel za oporavak na cijelo lice i brzo ga razmažite',
      'Nanesite proizvod laganim tapkanjem prstiju po površini lica pola minute'
    ],
    tags: ['hidratacija', 'protiv iritacija', 'masna koža', 'mješovita koža', 'dnevna njega']
  },
  {
    id: '11',
    title: 'Radiance Daily Cream SPF 30+',
    description: 'Krema za svakodnevnu upotrebu koja je namijenjena ispravljanju znakova fotostarenja.',
    category: 'Krema',
    image: '/images/products/toskaniradiancedailycream.webp',
    price: '60 EUR',
    oldPrice: '75 EUR',
    volume: '50 ml',
    application: [
      'Nanesite jednom dnevno, ujutro',
      'Uklonite šminku i očistite kožu Energizing Cleanser gelom za čišćenje',
      'Nanesite male količine Radiance Mesoserum-a na cijelo lice',
      'Nanesite proizvod laganim tapkanjem prstiju 2-3 kapi po površini lica'
    ],
    tags: ['spf', 'hiperpigmentacije', 'fotostarenje', 'dnevna njega', 'svi tipovi kože']
  },
  {
    id: '13',
    title: 'Radiance Eye Contour',
    description: 'Učinkovita krema za područje oko očiju koja ublažava hiperpigmentacije i probleme s mikrocirkulacijom.',
    category: 'Okoloočna njega',
    image: '/images/products/toskaniradianceeyecontour.webp',
    price: '40 EUR',
    oldPrice: '75 EUR',
    volume: '15 ml',
    activeIngredients: ['Ekstrakt Aesculus Hippocastanum', 'Ekstrakti Ginkgo Bilobe', 'Hesperidin Metil halkon', 'Peptidi'],
    application: [
      'Uklonite šminku i očistite kožu energizirajućim sredstvom za čišćenje',
      'Nanesite male količine Radiance Mesoserum-a na cijelo lice',
      'Nanesite proizvod laganim tapkanjem prstiju po površini lica pola minute'
    ],
    tags: ['okoloočna njega', 'hiperpigmentacije', 'posvjetljivanje podočnjaka']
  },
  {
    id: '14',
    title: 'Radiance Ultimate Mesoserum',
    description: 'Serum prikladan za sve tipove kože i učinkovit saveznik u borbi protiv hiperpigmentacija i pjega.',
    category: 'Serum',
    image: '/images/products/toskaniRADIANCE-ULTIMATE-MESOSERUM.webp',
    price: '75 EUR',
    oldPrice: '100 EUR',
    volume: '30 ml',
    activeIngredients: ['Alfa Arbutin', 'Aspergillus Ferment', 'Azelaična kiselina', 'Azeloglicina', 'Ferulinska kiselina', 'Kojična kiselina', 'Mliječna kiselina', 'Niacinamid', 'Retinol', 'traneksamična kiselina', 'Vitamin C'],
    application: [
      'Uklonite šminku i očistite kožu Energizing Cleanser gelom za čišćenje',
      'Nanesite malu količinu Radiance Mesoserum-a na cijelo lice',
      'Nanesite proizvod laganim tapkanjem prstiju 2-3 kapi po površini lica'
    ],
    tags: ['serum', 'hiperpigmentacije', 'fotostarenje', 'svi tipovi kože']
  },
  {
    id: '15',
    title: 'Purifying Intensive Serum',
    description: 'Gel za isušivanje koji je antibakterijski i vrlo učinkovit protiv mrlja i nesavršenosti.',
    category: 'Serum',
    image: '/images/products/toskanipurifyingIntensiveSerum.webp',
    price: '40 EUR',
    oldPrice: '55 EUR',
    volume: '15 ml',
    activeIngredients: ['Purifying actives', 'Purifying Complex', 'Salicylic Acid'],
    application: [
      'Uklonite šminku i očistite kožu Purifying sredstvom za čišćenje',
      'Nanesite sitne točkice Purifying kreme na cijelo lice',
      'Koristite kratke lagane, ali čvrste poteze za nanošenje proizvoda'
    ],
    tags: ['serum', 'akne', 'prištići', 'lokalizirano liječenje']
  },
  {
    id: '16',
    title: 'Purifying Cream',
    description: 'Tekuća emulzija prikladna za masnu i kožu sklonu aknama.',
    category: 'Krema',
    image: '/images/products/TOSKANIPurifyingCream.webp',
    price: '56 EUR',
    oldPrice: '75 EUR',
    volume: '50 ml',
    activeIngredients: ['Ekstrakt lista Hamamelis virginiana', 'Lactic Acid', 'Purifying actives', 'Purifying Complex', 'Rhodosorus Marinus Extract', 'Salicylic Acid', 'Zinc'],
    application: [
      'Uklonite šminku i očistite kožu Purifying gel sredstvom za čišćenje',
      'Nanesite sitne točkice pročišćujuće kreme na cijelo lice',
      'Koristite kratke lagane, ali čvrste poteze za nanošenje proizvoda'
    ],
    tags: ['krema', 'akne', 'prištići', 'masna koža']
  },
  {
    id: '17',
    title: 'Skin Architect Mesoserum',
    description: 'Serum za popravak i učvršćivanje. Osigurava snažne njegujuće i hidratantne efekte.',
    category: 'Serum',
    image: '/images/products/Toskani-Skin-Architect-Mesoserum-1.webp',
    price: '70 EUR',
    oldPrice: '90 EUR',
    volume: '30 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Prirodni Kolagen', 'Tokoferol', 'Vitamin E'],
    application: [
      'Preporučuje se nanošenje Skin Architect Mesoseruma prije Skin Architect kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera',
      'Nanesite malu količinu Skin Architect Mesoseruma na cijelo lice'
    ],
    tags: ['serum', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '18',
    title: 'Skin Architect Cream',
    description: 'Visoko koncentrirana krema protiv bora koja koristi prirodne sastojke za poboljšanje izgleda finih linija i dubokih bora.',
    category: 'Krema',
    image: '/images/products/toskaniskinarchitectcream.webp',
    price: '60 EUR',
    oldPrice: '80 EUR',
    volume: '50 ml',
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Elastin', 'Hijaluronska kiselina', 'L-Carnitine', 'Organic Silicon', 'Prirodni Kolagen', 'Retinol', 'Shea Maslac', 'Tokoferol', 'Vitamin E'],
    application: [
      'Preporučuje se nanošenje Skin Architect Mesoseruma prije Skin Architect kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera',
      'Nanesite malu količinu Skin Architect Mesoseruma na cijelo lice'
    ],
    tags: ['krema', 'anti-age', 'njega nakon dermalnih filera', 'njega nakon skin boostera', 'svi tipovi kože']
  },
  {
    id: '20',
    title: 'Glacier Pro Age Serum',
    description: 'Lagani serum koji nakon nanošenja pruža osjećaj hidratacije i svježine.',
    category: 'Serum',
    image: '/images/products/toskaniGlacierSerum.webp',
    price: '65 EUR',
    oldPrice: '85 EUR',
    volume: '30 ml',
    activeIngredients: ['Nicotinamide (B3)', 'Derived from vitamin C', 'Glacier termal water', 'Pseudoalteromona ferment extract'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Preporučuje se nanošenje Glacier Pro Age seruma prije Glacier Pro Age kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera'
    ],
    tags: ['serum', 'anti-age', '20+ godina', 'svi tipovi kože']
  },
  {
    id: '21',
    title: 'Glacier Pro Age Cream',
    description: 'Lagana krema koja daje svježi finiš tijekom nanošenja koji se jako dobro razmazuje i brzo upija.',
    category: 'Krema',
    image: '/images/products/toskaniGlacierCream.webp',
    price: '60 EUR',
    oldPrice: '80 EUR',
    volume: '50 ml',
    activeIngredients: ['Encapsuled ceramide', 'Glacier termal water', 'Kaempherol', 'Liposomal hyaluronic acid'],
    application: [
      'Nanesite jednom ujutro i navečer na čistu kožu',
      'Preporučuje se nanošenje Glacier Pro Age seruma prije Glacier Pro Age kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera'
    ],
    tags: ['krema', 'anti-age', '20+ godina', 'svi tipovi kože']
  },
  {
    id: '22',
    title: 'Retin Pro Age Serum',
    description: 'Lagan i gladak serum koji daje osjećaj hranjivosti nakon nanošenja.',
    category: 'Serum',
    image: '/images/products/toskaniRetinProAge_Serum.webp',
    price: '70 EUR',
    oldPrice: '90 EUR',
    volume: '30 ml',
    activeIngredients: ['Bakuchiol (99% Pure Bakuchiol)', 'Kappaphycus alvarezii extract and Caesalpinia spinosa fruit extract', 'Plant extract of tara and red algae', 'Retinal (retinaldehyde) Lipocapsules', 'Retinol like: Nicotiana Benthamiana Hexapeptide-40 sh-Polypeptide-76'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Preporučuje se nanošenje Retin Pro Age seruma prije Retin Pro Age kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera'
    ],
    tags: ['serum', 'anti-age', '30+/40 godina', 'svi tipovi kože', 'osjetljiva koža']
  },
  {
    id: '23',
    title: 'Retin Pro Age Cream',
    description: 'Lako upijajuća krema koja pruža njegujući osjećaj.',
    category: 'Krema',
    image: '/images/products/toskaniRetinCream.webp',
    price: '65 EUR',
    oldPrice: '85 EUR',
    volume: '50 ml',
    activeIngredients: ['Kappaphycus alvarezii extract and Caesalpinia spinosa fruit extract', 'Plant based Collagen-Like: Acacia', 'Plant extract of tara and red algae', 'Retinol like: Nicotiana Benthamiana Hexapeptide-40 sh-Polypeptide-76', 'Sodium Retinoyl Hyaluronate (HA+ retinoic acid)'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Preporučuje se nanošenje Retin Pro Age seruma prije Retin Pro Age kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera'
    ],
    tags: ['krema', 'anti-age', '30+/40 godina', 'svi tipovi kože', 'osjetljiva koža']
  },
  {
    id: '24',
    title: 'Unique Pro Age Serum',
    description: 'Hranjivi i luksuzni dnevni serum za svakodnevnu primjenu sa širokim izborom anti-age aktivnih sastojaka.',
    category: 'Serum',
    image: '/images/products/toskaniUniqueProAge_Serum.webp',
    price: '70 EUR',
    oldPrice: '90 EUR',
    volume: '30 ml',
    activeIngredients: ['Bacuri butter', 'Cell oil', 'Manosa-6-fosfato', 'Olea Vita PLF', 'Plant based Collagen Fragment'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Preporučuje se nanošenje Unique Pro Age seruma prije Unique Pro Age kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera'
    ],
    tags: ['serum', 'anti-age', '45+ godina', 'svi tipovi kože']
  },
  {
    id: '25',
    title: 'Unique Pro Age Cream',
    description: 'Hranjivi i luksuzni dnevni tretman za svakodnevnu primjenu sa širokim izborom anti-age aktivnih sastojaka.',
    category: 'Krema',
    image: '/images/products/toskaniUniqueCream.webp',
    price: '65 EUR',
    oldPrice: '85 EUR',
    volume: '50 ml',
    activeIngredients: ['4D Hyaluronic Acid', 'Aminobutyric acid (GABA)', 'Bacuri butter', 'Nourishing Oils: (Meadowfoam, Canola Oil, Helianthus Annuus, Argan, Polyglutamic Acid (PGA)'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Preporučuje se nanošenje Unique Pro Age seruma prije Unique Pro Age kreme',
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera'
    ],
    tags: ['krema', 'anti-age', '45+ godina', 'svi tipovi kože']
  },
  {
    id: '26',
    title: 'Anti Hair-Loss Lotion',
    description: 'Jedinstveno i inovativno rješenje za zaustavljanje gubitka kose i jačanje nove i postojeće kose.',
    category: 'Njega kose',
    image: '/images/products/Anti-hair-loss-lotion.webp',
    price: '45 EUR',
    oldPrice: '45 EUR',
    volume: '100 ml',
    activeIngredients: ['Aminexil', 'Biotin (B8)', 'Nicotinamide (B3)', 'Pyridoxine (B6)', 'Sabal serrulata', 'Vitamin E', 'Vitamin H', 'Zinc'],
    application: [
      'Nanesite proizvod jednom dnevno tijekom najmanje 3 mjeseca liječenja',
      'Masirajte vlasište i ostavite da se prirodno osuši',
      'Izbjegavajte kontakt s očima, ustima i drugim sluznicama'
    ],
    tags: ['sprej', 'njega vlasišta', 'zaustavljanje gubitka kose', 'jačanje kose', 'alopecija']
  },
  {
    id: '27',
    title: 'DensiHair Boost Capsules',
    description: 'Dodatak prehrani koji sadrži Sabal serrulata, vitamine i aminokiseline za jačanje kose i zaustavljanje gubitka kose.',
    category: 'Njega kose',
    image: '/images/products/toskaniDensiHair-Boost-capsules.webp',
    price: '35 EUR',
    oldPrice: '45 EUR',
    volume: '30 kapsula',
    activeIngredients: ['Aminokiseline Lysine', 'Arginine', 'Biotin (B8)', 'Cistin', 'Sabal serrulata', 'Selen', 'Zinc'],
    application: [
      'Uzmite 2 kapsule na dan kao "šok" tretman prvih 3 mjeseca',
      'Nakon toga uzmite 1 kapsulu dnevno za održavanje rezultata'
    ],
    tags: ['kapsule', 'njega vlasišta', 'dodatak prehrani', 'zaustavljanje gubitka kose', 'jačanje kose']
  },
  {
    id: '28',
    title: 'Night Reverse Advanced Serum',
    description: 'Napredni noćni serum za obnavljanje i regeneraciju kože tijekom noći.',
    category: 'Noćna njega',
    image: '/images/products/toskani-night-reverse-serum.webp',
    price: '80 EUR',
    volume: '30 ml',
    isNew: true,
    activeIngredients: ['Retinol', 'Niacinamid', 'Hijaluronska kiselina', 'Peptidi'],
    application: [
      'Nanesite navečer na čistu kožu',
      'Koristite 2-3 kapi seruma na cijelo lice',
      'Nanesite laganim tapkanjem prstiju',
      'Slijedite s noćnom kremom'
    ],
    tags: ['noćna njega', 'anti-age', 'regeneracija', 'svi tipovi kože']
  },
  {
    id: '29',
    title: 'Night Reverse Intensive Cream & Mask',
    description: 'Intenzivna noćna krema i maska za duboku regeneraciju i obnavljanje kože.',
    category: 'Noćna njega',
    image: '/images/products/toskani-night-cream.jpg',
    price: '70 EUR',
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
    id: '30',
    title: 'Night Reverse Advanced Serum',
    description: 'Napredni noćni serum za obnavljanje i regeneraciju kože tijekom noći.',
    category: 'Serum',
    image: '/images/products/toskani-night-reverse-serum.webp',
    price: '80 EUR',
    volume: '30 ml',
    isNew: true,
    activeIngredients: ['Retinol', 'Niacinamid', 'Hijaluronska kiselina', 'Peptidi'],
    application: [
      'Nanesite navečer na čistu kožu',
      'Koristite 2-3 kapi seruma na cijelo lice',
      'Nanesite laganim tapkanjem prstiju',
      'Slijedite s noćnom kremom'
    ],
    tags: ['serum', 'noćna njega', 'anti-age', 'regeneracija', 'svi tipovi kože']
  },
  {
    id: '31',
    title: 'Night Reverse Intensive Cream & Mask',
    description: 'Intenzivna noćna krema i maska za duboku regeneraciju i obnavljanje kože.',
    category: 'Maska',
    image: '/images/products/toskani-night-cream.jpg',
    price: '70 EUR',
    volume: '50 ml',
    isNew: true,
    activeIngredients: ['Retinol', 'Vitamin E', 'Shea maslac', 'Hijaluronska kiselina'],
    application: [
      'Nanesite navečer na čistu kožu',
      'Može se koristiti kao noćna krema ili maska',
      'Za masku: nanesite deblji sloj i ostavite 15-20 minuta',
      'Za noćnu kremu: nanesite tanak sloj'
    ],
    tags: ['maska', 'noćna njega', 'anti-age', 'regeneracija', 'svi tipovi kože']
  },
  {
    id: '32',
    title: 'Anti Ageing Eye Contour',
    description: 'Posebno formuliran hidratantni serum za smanjenje umora, tretiranje bora, osvježavanje područja oko očiju, hidrataciju i umirivanje nježne kože oko očiju. Njegovi aktivni sastojci koji djeluju u sinergiji kako bi se oduprli pojavi bora, umanjili bore i već formirane linije. Također pomaže u sprječavanju gubitka čvrstoće, pomaže koži da se vrati u njezino prirodno zdravlje i pruža ukupni učinak pomlađivanja.',
    category: 'Okoloočna njega',
    image: '/images/products/toskani-anti-ageing-eye-contour.webp',
    price: '45 EUR',
    volume: '15 ml',
    isNew: true,
    activeIngredients: ['Acetyl Hexapeptide-8', 'DMAE', 'Ekstrakti Ginkgo Bilobe', 'Hijaluronska kiselina', 'Maslinovo ulje', 'Organski silicij'],
    application: [
      'Nanesite ujutro i navečer na čistu kožu',
      'Nanesite laganim tapkanjem prstiju po području oko očiju',
      'Izbjegavajte direktan kontakt s očima',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['okoloočna njega', 'anti-age', 'ublažavanje finih linija', 'hidratacija', 'umirivanje']
  },
  {
    id: '33',
    title: 'Anti-ageing + HA Ampule',
    description: 'Intenzivna ampula s hijaluronskom kiselinom za anti-age tretman i duboku hidrataciju.',
    category: 'Ampule',
    image: '/images/products/antiageing_box_ampule.webp',
    price: '50 EUR',
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
    id: '34',
    title: 'Radiance Ampule',
    description: 'Ampula za posvjetljivanje i ujednačavanje tena.',
    category: 'Ampule',
    image: '/images/products/radiance_box_purifying_box_ampule.webp',
    price: '50 EUR',
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
    id: '35',
    title: 'Sensitive Skin Ampule',
    description: 'Umirujuća ampula za osjetljivu kožu.',
    category: 'Ampule',
    image: '/images/products/sensitive_box_purifying_box_ampule.webp',
    price: '50 EUR',
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
    id: '36',
    title: 'Purifying Ampule',
    description: 'Ampula za pročišćavanje i kontrolu masnoće.',
    category: 'Ampule',
    image: '/images/products/purifying_box_ampule.webp',
    price: '50 EUR',
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
    id: '37',
    title: 'Lipo Proteoglycans Ampule',
    description: 'Ampula s lipo proteoglikanima za učvršćivanje i obnavljanje kože.',
    category: 'Ampule',
    image: '/images/products/lipoproteoglycans_box_purifying_box_ampule.webp',
    price: '50 EUR',
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
    id: '38',
    title: 'Vitaflash Ampule',
    description: 'Ampula s vitaminima za trenutno osvježavanje i energiziranje kože.',
    category: 'Ampule',
    image: '/images/products/vitaflash_box_purifying_box_ampule.webp',
    price: '30 EUR',
    volume: '15x2ml',
    isNew: true,
    activeIngredients: ['Vitamin C', 'Vitamin E', 'Vitamin B3', 'Vitamin B5'],
    application: [
      'Koristite jednu ampulu dnevno',
      'Nanesite na čistu kožu',
      'Slijedite s odgovarajućom kremom'
    ],
    tags: ['ampule', 'vitamini', 'osvježavanje', 'energiziranje']
  },
  {
    id: '39',
    title: 'Sun Shiel-D Sun Fluid Facial Cream',
    description: 'Lagana fluidna krema za zaštitu lica od sunca.',
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
    id: '40',
    title: 'Sun Shiel-D Sun Fluid Facial Cream Tinted',
    description: 'Lagana fluidna krema s tonom za zaštitu lica od sunca.',
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
    id: '41',
    title: 'Sun Shiel-D Sun Body&Face Sprej',
    description: 'Sprej za zaštitu tijela i lica od sunca.',
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
  }
]; 