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
  'Njega kose'
];

export const products: Product[] = [
  {
    id: '1',
    title: 'Energizing Cleanser',
    description: 'Gel sredstvo za čišćenje uklanjanje prljavštinu, prašinu i šminku, zajedno s viškom masnoće i mrtvih stanica kože nakupljenim tijekom dana.',
    category: 'Čišćenje',
    image: '/images/products/toskanienergizingcleanser.webp',
    price: '40 €',
    oldPrice: '50 €',
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
    price: '44 €',
    oldPrice: '55 €',
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
    price: '28 €',
    oldPrice: '35 €',
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
    price: '44 €',
    oldPrice: '55 €',
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
    price: '44 €',
    oldPrice: '55 €',
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
    id: '6',
    title: 'Antistress Mask',
    description: 'Hranjiva, umirujuća i osvježavajuća maska za sve tipove kože.',
    category: 'Maska',
    image: '/images/products/toskaniantistressmask.webp',
    price: '65 €',
    oldPrice: '75 €',
    volume: '200 ml',
    activeIngredients: ['Aloe Vera Ekstrakt', 'Ekstrakt kamilice', 'Maslinovo ulje', 'Mentol'],
    application: [
      'Uklonite šminku i očistite kožu Energizing Cleanserom',
      'Premažite fini, jednoliki sloj po licu, vratu i dekolteu',
      'Pričekajte 15 minuta i uklonite spužvama ili pamukom navlaženim vodom'
    ],
    tags: ['maska', 'umirujuća svojstva', 'hidratacija', 'svi tipovi kože']
  },
  {
    id: '8',
    title: 'Total Recovery Gel',
    description: 'Obnavljajući, hidratantni i umirujući gel s aloe verom za mješovitu i masnu kožu.',
    category: 'Krema',
    image: '/images/products/toskanitotalrecoverygel.webp',
    price: '37 €',
    oldPrice: '45 €',
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
    price: '65 €',
    oldPrice: '75 €',
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
    description: 'Učinkovita krema za područje oko očiju koja ublažuje hiperpigmentacije i probleme s mikrocirkulacijom.',
    category: 'Okoloočna njega',
    image: '/images/products/toskaniradianceeyecontour.webp',
    price: '65 €',
    oldPrice: '75 €',
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
    price: '85 €',
    oldPrice: '100 €',
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
    price: '45 €',
    oldPrice: '55 €',
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
    price: '65 €',
    oldPrice: '75 €',
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
    price: '80 €',
    oldPrice: '90 €',
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
    price: '70 €',
    oldPrice: '80 €',
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
    id: '19',
    title: 'Night Reverse Advanced Serum',
    description: 'Noćni serum s Total Restoring Complexom, koji poništava štetu od svakodnevnog stresa i aktivira prirodni mehanizam obnove kože.',
    category: 'Serum',
    image: '/images/products/toskaniantiagenightdrops.webp',
    price: '87 €',
    oldPrice: '95 €',
    volume: '30 ml',
    activeIngredients: ['Probiotici', 'algae extract', 'Byfida ferment Lysate', 'tetrapeptide-26', 'TRC (Total Restoring Complex)'],
    application: [
      'Uklonite šminku i očistite kožu pomoću Energizing Cleansera',
      'Nanesite Night Reverse Advanced Serum na područje oko očiju',
      'Nanesite jednu ili dvije kapljice Night Reverse seruma u malu količinu Skin Architect kreme'
    ],
    tags: ['serum', 'noćna njega', 'anti-age', 'svi tipovi kože', 'suha koža', 'dehidrirana koža']
  },
  {
    id: '20',
    title: 'Glacier Pro Age Serum',
    description: 'Lagani serum koji nakon nanošenja pruža osjećaj hidratacije i svježine.',
    category: 'Serum',
    image: '/images/products/toskaniGlacierSerum.webp',
    price: '75 €',
    oldPrice: '85 €',
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
    price: '70 €',
    oldPrice: '80 €',
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
    price: '80 €',
    oldPrice: '90 €',
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
    price: '75 €',
    oldPrice: '85 €',
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
    price: '80 €',
    oldPrice: '90 €',
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
    price: '75 €',
    oldPrice: '85 €',
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
    price: '37 €',
    oldPrice: '45 €',
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
    price: '38 €',
    oldPrice: '45 €',
    volume: '30 kapsula',
    activeIngredients: ['Aminokiseline Lysine', 'Arginine', 'Biotin (B8)', 'Cistin', 'Sabal serrulata', 'Selen', 'Zinc'],
    application: [
      'Uzmite 2 kapsule na dan kao "šok" tretman prvih 3 mjeseca',
      'Nakon toga uzmite 1 kapsulu dnevno za održavanje rezultata'
    ],
    tags: ['kapsule', 'njega vlasišta', 'dodatak prehrani', 'zaustavljanje gubitka kose', 'jačanje kose']
  }
]; 