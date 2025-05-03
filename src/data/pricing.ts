export interface PricingItem {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  duration?: string;
  features?: string[];
  isPopular?: boolean;
  isPackage?: boolean;
  packageDetails?: string;
}

export const pricingCategories = [
  "Konzultacije",
  "Beauty Tretmani",
  "Brow & Lash",
  "Bio Sculpture",
  "Botox",
  "Dermalni Fileri",
  "Hijaluronidaza",
  "Kemijski Piling",
  "Mezoterapija Dermapenom 4",
  "Mezoterapija Mesoject Gunom",
  "Plasmage",
  "PRP",
  "RRS",
  "Skin Booster",
  "TOSKANI Proizvodi"
];

export const pricingData: PricingItem[] = [
  // Konzultacije
  {
    id: "consultation",
    title: "Konzultacije",
    description: "Ako tretman radite kod nas cijena konzultacija se oduzima od cijene tretmana",
    price: "40 EUR",
    category: "Konzultacije"
  },

  // Beauty Tretmani
  {
    id: "dermaplaning",
    title: "DERMAPLANING",
    description: "Čišćenje lica, dermaplaning, umirujuća maska",
    price: "70 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "facial-massage",
    title: "MASAŽA LICA",
    description: "Trajanje 30min",
    price: "20 EUR",
    category: "Beauty Tretmani",
    duration: "30 min"
  },
  {
    id: "firming-peptide-facial",
    title: "FIRMING PEPTIDE FACIAL",
    description: "Čišćenje lica, maska, serum, krema, spf",
    price: "60 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "marshmallow-facial",
    title: "MARSHMALLOW FACIAL",
    description: "Čišćenje lica, maska, serum, krema, spf",
    price: "60 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "signature-dermaplaning",
    title: "SIGNATURE DERMAPLANING FACIAL",
    description: "Čišćenje lica, dermaplaning, enzimski piling, Marshmallow Whip Hydrating maska, serum, krema, spf",
    price: "100 EUR",
    category: "Beauty Tretmani",
    isPopular: true
  },
  {
    id: "beyond-botox-facial",
    title: "BEYOND BOTOX FACIAL",
    description: "Čišćenje lica, dermaplaning, kemijski piling, Firming peptide maska, okoloočna njega, serum, krema, spf",
    price: "200 EUR",
    category: "Beauty Tretmani"
  },

  // LED Terapija
  {
    id: "led-addon",
    title: "Dermalux LED Terapija Dodatak",
    description: "Kao dodatak nekom beauty tretmanu u trajanju od 20min",
    price: "15 EUR",
    category: "Beauty Tretmani",
    duration: "20 min"
  },
  {
    id: "led-single",
    title: "Dermalux LED Terapija",
    description: "1 tretman LED svjetlom u trajanju od 30min",
    price: "30 EUR",
    category: "Beauty Tretmani",
    duration: "30 min"
  },
  {
    id: "led-standard",
    title: "Dermalux LED Standard Paket",
    description: "Paket od 4 tretmana LED svjetlom u trajanju od 30min",
    price: "108 EUR",
    category: "Beauty Tretmani",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "led-classic",
    title: "Dermalux LED Classic Paket",
    description: "Paket od 6 tretmana LED svjetlom u trajanju od 30min",
    price: "165 EUR",
    category: "Beauty Tretmani",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "led-premium",
    title: "Dermalux LED Premium Paket",
    description: "Paket od 12 tretmana LED svjetlom u trajanju od 30min",
    price: "305 EUR",
    category: "Beauty Tretmani",
    isPackage: true,
    packageDetails: "12 tretmana"
  },

  // Brow & Lash
  {
    id: "brow-lift",
    title: "BROW LIFT",
    description: "Laminacija i bojanje obrva",
    price: "25 EUR",
    category: "Brow & Lash"
  },
  {
    id: "brow-shaping",
    title: "OBLIKOVANJE OBRVA",
    description: "Čupanje obrva pincetom",
    price: "7 EUR",
    category: "Brow & Lash"
  },
  {
    id: "hd-brows",
    title: "HD BROWS",
    description: "Oblikovanje i bojanje obrva",
    price: "10 EUR",
    category: "Brow & Lash"
  },
  {
    id: "brow-tint",
    title: "BOJANJE OBRVA ILI TREPAVICA",
    description: "Profesionalno bojanje obrva ili trepavica",
    price: "4 EUR",
    category: "Brow & Lash"
  },
  {
    id: "brow-lash-tint",
    title: "BOJANJE OBRVA I TREPAVICA",
    description: "Profesionalno bojanje obrva i trepavica",
    price: "7 EUR",
    category: "Brow & Lash"
  },

  // Botox
  {
    id: "botox-25",
    title: "BOTOX 25",
    description: "25 jedinica botoxa",
    price: "105 EUR",
    category: "Botox"
  },
  {
    id: "botox-50",
    title: "BOTOX 50",
    description: "50 jedinica botoxa",
    price: "210 EUR",
    category: "Botox"
  },
  {
    id: "botox-100",
    title: "BOTOX 100",
    description: "100 jedinica botoxa",
    price: "420 EUR",
    category: "Botox"
  },

  // Dermalni Fileri
  {
    id: "aliaxin",
    title: "ALIAXIN",
    description: "1 ml",
    price: "315 EUR",
    category: "Dermalni Fileri"
  },
  {
    id: "skin-architect-filler",
    title: "SKIN ARCHITECT FILLER",
    description: "1 ml",
    price: "315 EUR",
    category: "Dermalni Fileri"
  },

  // Hijaluronidaza
  {
    id: "hyaluronidase",
    title: "HIJALURONIDAZA",
    description: "Enzim za razgradnju hijaluronske kiseline",
    price: "53 EUR",
    category: "Hijaluronidaza"
  },

  // Kemijski Piling
  {
    id: "chemical-peel-standard",
    title: "Standard",
    description: "1 tretman kemijskog pilinga lica",
    price: "55 EUR",
    category: "Kemijski Piling"
  },
  {
    id: "chemical-peel-standard-package",
    title: "Standard paket",
    description: "4 tretmana kemijskog pilinga lica",
    price: "195 EUR",
    category: "Kemijski Piling",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "chemical-peel-premium",
    title: "Premium",
    description: "1 tretman kemijskog pilinga lica, vrata i dekoltea",
    price: "75 EUR",
    category: "Kemijski Piling"
  },
  {
    id: "chemical-peel-premium-package",
    title: "Premium paket",
    description: "4 tretmana kemijskog pilinga lica, vrata i dekoltea",
    price: "270 EUR",
    category: "Kemijski Piling",
    isPackage: true,
    packageDetails: "4 tretmana"
  },

  // PRP
  {
    id: "prp-single",
    title: "PRP",
    description: "1 PRP tretman (4 ml)",
    price: "265 EUR",
    category: "PRP"
  },
  {
    id: "prp-ideal",
    title: "PRP IDEAL",
    description: "2 PRP tretmana",
    price: "475 EUR",
    category: "PRP",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "prp-superior",
    title: "PRP SUPERIOR",
    description: "3 PRP tretmana",
    price: "675 EUR",
    category: "PRP",
    isPackage: true,
    packageDetails: "3 tretmana"
  },
  {
    id: "prp-classic",
    title: "PRP CLASSIC",
    description: "4 PRP tretmana",
    price: "845 EUR",
    category: "PRP",
    isPackage: true,
    packageDetails: "4 tretmana"
  },

  // TOSKANI Proizvodi
  {
    id: "energizing-cleanser",
    title: "ENERGIZING CLEANSER GEL",
    description: "200 ml",
    price: "40 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-cleanser",
    title: "PURIFYING CLEANSER",
    description: "200 ml",
    price: "44 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "bamboo-toner",
    title: "BAMBOO TONER TONIK",
    description: "200 ml",
    price: "28 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "nutritive-scrub",
    title: "NUTRITIVE SCRUB",
    description: "200 ml",
    price: "44 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-scrub",
    title: "PURIFYING SCRUB",
    description: "200 ml",
    price: "44 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "antistress-mask",
    title: "ANTISTRESS MASK",
    description: "200 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "total-recovery-gel",
    title: "TOTAL RECOVERY GEL",
    description: "50 ml",
    price: "37 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "total-recovery-cream",
    title: "TOTAL RECOVERY CREAM",
    description: "50 ml",
    price: "60 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "anti-pollution-cream",
    title: "ANTI-POLLUTION TOTAL DEFENSE CREAM 50+",
    description: "50 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "sun-protection",
    title: "SUN PROTECTION CREME SPF 50",
    description: "50 ml",
    price: "35 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-daily-cream",
    title: "RADIANCE DAILY CREAM SPF 30+",
    description: "50 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "anti-ageing-eye",
    title: "ANTI AGEING EYE CONTOUR",
    description: "15 ml",
    price: "45 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-eye",
    title: "RADIANCE EYE CONTOUR",
    description: "15 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-mesoserum",
    title: "RADIANCE ULTIMATE MESOSERUM",
    description: "30 ml",
    price: "85 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-serum",
    title: "PURIFYING INTENSIVE SERUM",
    description: "15 ml",
    price: "45 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-cream",
    title: "PURIFYING CREAM",
    description: "50 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "skin-architect-mesoserum",
    title: "Skin Architect Mesoserum",
    description: "30 ml",
    price: "80 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "skin-architect-cream",
    title: "SKIN ARCHITECT CREAM",
    description: "50 ml",
    price: "70 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "night-reverse-serum",
    title: "NIGHT REVERSE ADVANCED SERUM",
    description: "30 ml",
    price: "87 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "night-reverse-cream",
    title: "NIGHT REVERSE INTENSIVE CREAM & MASK",
    description: "50 ml",
    price: "80 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "anti-hair-loss",
    title: "ANTI-HAIR LOSS LOTION",
    description: "100 ml",
    price: "37 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "densihair-boost",
    title: "DENSIHAIR BOOST KAPSULE",
    description: "30 kapsula",
    price: "38 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "glacier-pro-age-cream",
    title: "GLACIER PRO AGE KREMA",
    description: "50 ml",
    price: "70 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "glacier-pro-age-serum",
    title: "GLACIER PRO AGE SERUM",
    description: "30 ml",
    price: "75 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "retin-pro-age-cream",
    title: "RETIN PRO AGE KREMA",
    description: "50 ml",
    price: "75 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "retin-pro-age-serum",
    title: "RETIN PRO AGE SERUM",
    description: "30 ml",
    price: "80 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "unique-pro-age-cream",
    title: "UNIQUE PRO AGE KREMA",
    description: "50 ml",
    price: "75 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "unique-pro-age-serum",
    title: "UNIQUE PRO AGE SERUM",
    description: "30 ml",
    price: "80 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "myotec-eye-lift",
    title: "MYOTEC EYE LIFT KREMA",
    description: "15 ml",
    price: "55 EUR",
    category: "TOSKANI Proizvodi"
  }
]; 