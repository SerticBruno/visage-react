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
  "Mesosynergy",
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
    category: "Beauty Tretmani"
  },
  {
    id: "brow-shaping",
    title: "OBLIKOVANJE OBRVA",
    description: "Čupanje obrva pincetom",
    price: "7 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "hd-brows",
    title: "HD BROWS",
    description: "Oblikovanje i bojanje obrva",
    price: "10 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "brow-tint",
    title: "BOJANJE OBRVA ILI TREPAVICA",
    description: "Profesionalno bojanje obrva ili trepavica",
    price: "4 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "brow-lash-tint",
    title: "BOJANJE OBRVA I TREPAVICA",
    description: "Profesionalno bojanje obrva i trepavica",
    price: "7 EUR",
    category: "Beauty Tretmani"
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
  {
    id: "chemical-peel-duosomal",
    title: "Dusomal",
    description: "1 tretman kemijskog pilinga duosomal",
    price: "65 EUR",
    category: "Kemijski Piling"
  },
  {
    id: "chemical-peel-duosomal-package",
    title: "Duosomal paket",
    description: "5 tretmana kemijskog pilinga Duosomal",
    price: "290 EUR",
    category: "Kemijski Piling",
    isPackage: true,
    packageDetails: "5 tretmana"
  },

  // Mezoterapija Mesoject Gunom
  {
    id: "mesoject-standard",
    title: "Standard",
    description: "1 mezoterapija lica",
    price: "95 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "mesoject-standard-package",
    title: "STANDARD PAKET",
    description: "4 mezoterapije lica i Hydraboost usana",
    price: "340 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "mesoject-premium",
    title: "Premium",
    description: "1 mezoterapija lica, vrata i dekoltea",
    price: "130 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "mesoject-duosomal-standard",
    title: "Duosomal Standard",
    description: "1 kemijski piling Duosomal, mezoterapiju lica i skin architect masku",
    price: "130 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "mesoject-duosomal-standard-package",
    title: "Duosomal Standard Paket",
    description: "5 kemijski piling Duosomal, mezoterapiju lica i skin architect masku",
    price: "520 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "mesoject-brow-package",
    title: "BROW PAKET",
    description: "5 mezoterapija obrva",
    price: "90 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "mesoject-hair-s",
    title: "Hair S",
    description: "1 mezoterapija male zone vlasišta",
    price: "45 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "mesoject-hair-s-standard",
    title: "Hair S - Standard Paket",
    description: "5 mezoterapija male zone vlasišta",
    price: "200 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "mesoject-hair-s-premium",
    title: "Hair S - Premium Paket",
    description: "10 mezoterapija male zone vlasišta",
    price: "360 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "10 tretmana"
  },
  {
    id: "mesoject-hair-l",
    title: "Hair L",
    description: "1 mezoterapija velike zone vlasišta",
    price: "75 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "mesoject-hair-l-standard",
    title: "Hair L - Standard Paket",
    description: "5 mezoterapija velike zone vlasišta",
    price: "335 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "mesoject-hair-l-premium",
    title: "Hair L - Premium Paket",
    description: "10 mezoterapija velike zone vlasišta",
    price: "600 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "10 tretmana"
  },

  // Mezoterapija Dermapenom 4
  {
    id: "microneedling-face",
    title: "Microneedling Face",
    description: "1 tretman lica Dermapenom 4 i odgovarajućom DP Dermaceuticals mezoterapijskim koktelima",
    price: "120 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "microneedling-face-standard",
    title: "Microneedling Face Standard Paket",
    description: "paket od 4 tretmana lica Dermapenom 4 i odgovarajućom DP Dermaceuticals mezoterapijskim koktelima",
    price: "435 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "microneedling-face-premium",
    title: "Microneedling Face Premium Paket",
    description: "paket od 6 tretmana lica Dermapenom 4 i odgovarajućom DP Dermaceuticals mezoterapijskim koktelima",
    price: "650 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "microneedling-beauty",
    title: "Microneedling Beauty",
    description: "1 tretman lica, vrata i dekoltea Dermapenom 4 i odgovarajućim DP Dermaceuticals mezoterapijskim koktelima",
    price: "155 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "microneedling-beauty-standard",
    title: "Microneedling Beauty Standard Paket",
    description: "paket od 4 tretmana lica, vrata i dekoltea Dermapenom 4 i odgovarajućim DP Dermaceuticals mezoterapijskim koktelima",
    price: "560 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "microneedling-beauty-premium",
    title: "Microneedling Beauty Premium Paket",
    description: "6 tretmana lica, vrata i dekoltea Dermapenom 4 i odgovarajućim DP Dermaceuticals mezoterapijskim koktelima",
    price: "835 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "exo-face",
    title: "Exo Face",
    description: "1 tretman lica DP Dermaceuticals egzosomima",
    price: "320 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "exo-face-standard",
    title: "Exo Face Standard Paket",
    description: "paket od 2 tretmana lica DP Dermaceuticals egzosomima",
    price: "575 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "exo-face-premium",
    title: "Exo Face Premium Paket",
    description: "paket od 4 tretmana lica DP Dermaceuticals egzosomima",
    price: "1090 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "exo-beauty",
    title: "Exo Beauty",
    description: "1 tretman lica, vrata i dekoltea DP Dermaceuticals egzosomima",
    price: "450 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "exo-beauty-standard",
    title: "Exo Beauty Standard Paket",
    description: "2 tretmana lica, vrata i dekoltea DP Dermaceuticals egzosomima",
    price: "810 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "exo-beauty-premium",
    title: "Exo Beauty Premium Paket",
    description: "4 tretmana lica, vrata i dekoltea DP Dermaceuticals egzosomima",
    price: "1090 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "exo-hair",
    title: "Exo Hair",
    description: "1 tretman vlasišta DP Dermaceuticals egzosomima",
    price: "320 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "exo-hair-standard",
    title: "Exo Hair Standard Paket",
    description: "paket od 2 tretmana vlasišta DP Dermaceuticals egzosomima",
    price: "575 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "exo-hair-premium",
    title: "Exo Hair Premium Paket",
    description: "4 tretmana vlasišta DP Dermaceuticals egzosomima",
    price: "608 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },

  // Plasmage
  {
    id: "plasmage-eyes-standard",
    title: "EYES STANDARD",
    description: "Tretman gornjeg ili donjeg kapka",
    price: "635 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-eyes-premium",
    title: "EYES PREMIUM",
    description: "Tretman gornjeg i donjeg kapka",
    price: "885 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-benign-removal",
    title: "UKLANJANJE DOBROĆUDNIH PROMJENA",
    description: "Uklanjanje 1 promjene",
    price: "20 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-anti-age",
    title: "ANTI-AGE TRETMAN",
    description: "Tretman uklanjanja bora plasmageom",
    price: "300 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-scar-s",
    title: "SCAR S",
    description: "Terapija malog ožiljka plasmageom",
    price: "50 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-scar-l",
    title: "SCAR L",
    description: "Terapija velikog ožiljka plasmageom",
    price: "90 EUR",
    category: "Plasmage"
  },

  // RRS
  {
    id: "rrs-xl-hair",
    title: "RRS XL HAIR",
    description: "1 tretman vlasišta",
    price: "85 EUR",
    category: "RRS"
  },
  {
    id: "rrs-xl-hair-package",
    title: "RRS XL HAIR",
    description: "5 tretmana vlasišta",
    price: "380 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "rrs-ha-eyes",
    title: "RRS HA EYES",
    description: "1 tretman okoloočnog područja",
    price: "75 EUR",
    category: "RRS"
  },
  {
    id: "rrs-ha-eyes-package",
    title: "RRS HA EYES PAKET",
    description: "4 tretmana okoloočnog područja",
    price: "270 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "rrs-hyalift",
    title: "RRS HYALIFT",
    description: "1 ampula RRS Hyalift",
    price: "160 EUR",
    category: "RRS"
  },
  {
    id: "rrs-hyalift-package",
    title: "RRS HYALIFT PAKET",
    description: "4 ampule RRS Hyalift",
    price: "575 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "4 ampule"
  },
  {
    id: "rrs-silisorg",
    title: "RRS SILISORG/SILISORG HA",
    description: "1 ampula",
    price: "80 EUR",
    category: "RRS"
  },
  {
    id: "rrs-tensor-lift",
    title: "RRS TENSOR LIFT",
    description: "1 ampula",
    price: "160 EUR",
    category: "RRS"
  },
  {
    id: "rrs-tensor-lift-package",
    title: "RRS TENSOR LIFT PAKET",
    description: "4 ampule",
    price: "575 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "4 ampule"
  },

  // Skin Booster
  {
    id: "skin-booster-tkn-ha3",
    title: "TKN HA3",
    description: "1 tretman TKN HA3",
    price: "265 EUR",
    category: "Skin Booster"
  },
  {
    id: "skin-booster-tkn-ha3-standard",
    title: "TKN HA3 - Standard Paket",
    description: "2 tretmana TKN HA3",
    price: "475 EUR",
    category: "Skin Booster",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "skin-booster-tkn-ha3-premium",
    title: "TKN HA3 - Premium Paket",
    description: "Premium paket - 3 tretmana TKN HA3",
    price: "640 EUR",
    category: "Skin Booster",
    isPackage: true,
    packageDetails: "3 tretmana"
  },
  {
    id: "skin-booster-profhilo",
    title: "Profhilo",
    description: "1 tretman Profhilo",
    price: "340 EUR",
    category: "Skin Booster"
  },
  {
    id: "skin-booster-profhilo-package",
    title: "Profhilo paket",
    description: "2 tretmana Profhilo",
    price: "635 EUR",
    category: "Skin Booster",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "skin-booster-rrs-ha",
    title: "RRS HA Long Lasting",
    description: "1 tretman RRS HA Long Lasting",
    price: "285 EUR",
    category: "Skin Booster"
  },
  {
    id: "skin-booster-rrs-ha-package",
    title: "RRS HA Long Lasting Paket",
    description: "2 tretmana RRS HA Long Lasting",
    price: "500 EUR",
    category: "Skin Booster",
    isPackage: true,
    packageDetails: "2 tretmana"
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

  // Bio Sculpture
  {
    id: "bio-sculpture-evo2-gel-lak-s",
    title: "EVO 2 GEL LAK S",
    description: "Comby manikura jednobojni trajni lak kratkih noktiju, njega ethos vitaminskom dozom, ethos bademovim uljem i piling",
    price: "25 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-evo2-gel-lak-l",
    title: "EVO 2 GEL LAK L",
    description: "Comby manikura jednobojni trajni lak dugih noktiju, njega ethos vitaminskom dozom, ethos bademovim uljem i piling",
    price: "27 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-evo2-feet",
    title: "EVO 2 FEET",
    description: "Comby manikura, trajni lak na nogama i njegu s ethos bademovim uljem i kremom za pete",
    price: "25 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-evo2-manikura",
    title: "EVO 2 MANIKURA",
    description: "Comby manikura, ethos baza, njega ethos vitaminskom dozom, ethos bademovim uljem i piling",
    price: "10 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-removal",
    title: "SKIDANJE TRAJNOG LAKA",
    description: "Naplaćuje se samo skidanje tuđeg rada",
    price: "3 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-repair",
    title: "POPRAVAK 1 NOKTA",
    description: "Popravak jednog nokta",
    price: "3 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-extension",
    title: "PRODULJENJE 1 NOKTA",
    description: "Produljenje jednog nokta",
    price: "4 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-nail-art",
    title: "NAIL ART",
    description: "Nail art dekoracija",
    price: "2 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-almond-oil",
    title: "ETHOS ALMOND OIL",
    description: "14 ml",
    price: "13 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-rosehip-oil",
    title: "ETHOS ROSEHIP CUTICLE OIL",
    description: "14 ml",
    price: "13 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-blackcurrent",
    title: "ETHOS BLACKCURRENT",
    description: "14 ml",
    price: "13 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-jasmine-oil",
    title: "ETHOS JASMINE CUTICLE OIL",
    description: "14 ml",
    price: "13 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-refill",
    title: "REFILL",
    description: "1 ml",
    price: "1 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-raspa",
    title: "RAŠPA ORLIT EXTREME",
    description: "100/180",
    price: "2 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-apricot-scrub",
    title: "APRICOT KERNEL SCRUB",
    description: "75 ml",
    price: "15 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-heel-balm",
    title: "HEEL BALM",
    description: "75 ml",
    price: "15 EUR",
    category: "Bio Sculpture"
  },
  {
    id: "bio-sculpture-mint-mask",
    title: "MINT MASK",
    description: "75 ml",
    price: "15 EUR",
    category: "Bio Sculpture"
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
  },

  // Mesosynergy
  {
    id: "mesosynergy-standard",
    title: "Standard",
    description: "1 kemijski piling Dusomal, mezoterapija lica, TKN HA3 i skin architect maska",
    price: "380 EUR",
    category: "Mesosynergy"
  },
  {
    id: "mesosynergy-premium",
    title: "Premium",
    description: "2 kemijski piling Dusomal, mezoterapija lica, TKN HA3 i skin architect maska",
    price: "640 EUR",
    category: "Mesosynergy"
  }
]; 