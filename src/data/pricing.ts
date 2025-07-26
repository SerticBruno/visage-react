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
  "Botox",
  "Dermalni Fileri",
  "Fototerapije",
  "Hijaluronidaza",
  "Kemijski Piling",
  "Kombinirani Paketi",
  "LED fototerapija",
  "Mezoterapija Dermapenom 4",
  "Mezoterapija Mesoject Gunom",
  "Plasmage",
  "PRP",
  "RRS",
  "Skin Boosteri",
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
    title: "Dermaplaning",
    description: "Čišćenje lica, dermaplaning, umirujuća maska",
    price: "70 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "facial-massage",
    title: "Masaža Lica",
    description: "Trajanje 30min",
    price: "20 EUR",
    category: "Beauty Tretmani",
    duration: "30 min"
  },
  {
    id: "firming-peptide-facial",
    title: "Firming Peptide Facial",
    description: "Čišćenje lica, maska, serum, krema, spf",
    price: "60 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "marshmallow-facial",
    title: "Marshmallow Facial",
    description: "Čišćenje lica, maska, serum, krema, spf",
    price: "60 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "signature-dermaplaning",
    title: "Signature Dermaplaning Facial",
    description: "Čišćenje lica, dermaplaning, enzimski piling, Marshmallow Whip Hydrating maska, serum, krema, spf",
    price: "100 EUR",
    category: "Beauty Tretmani",
    isPopular: true
  },
  {
    id: "beyond-botox-facial",
    title: "Beyond Botox Facial",
    description: "Čišćenje lica, dermaplaning, kemijski piling, Firming peptide maska, okoloočna njega, serum, krema, spf",
    price: "200 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "led-addon",
    title: "Dermalux LED Terapija Dodatak",
    description: "Kao dodatak beauty tretmanu u trajanju od 20min",
    price: "15 EUR",
    category: "Fototerapije",
    duration: "20 min"
  },
  {
    id: "led-single",
    title: "Dermalux LED Terapija",
    description: "1 tretman LED svjetlom u trajanju od 30min",
    price: "30 EUR",
    category: "Fototerapije",
    duration: "30 min"
  },
  {
    id: "led-standard",
    title: "Dermalux LED Standard Paket",
    description: "Paket od 4 tretmana LED svjetlom u trajanju od 30min",
    price: "108 EUR",
    category: "Fototerapije",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "led-classic",
    title: "Dermalux LED Classic Paket",
    description: "Paket od 6 tretmana LED svjetlom u trajanju od 30min",
    price: "165 EUR",
    category: "Fototerapije",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "led-premium",
    title: "Dermalux LED Premium Paket",
    description: "Paket od 12 tretmana LED svjetlom u trajanju od 30min",
    price: "305 EUR",
    category: "Fototerapije",
    isPackage: true,
    packageDetails: "12 tretmana"
  },

  // LED fototerapija
  {
    id: "led-fototerapija-single",
    title: "LED Fototerapija - Pojedinačni Tretman",
    description: "1 tretman LED fototerapije u trajanju od 20min",
    price: "25 EUR",
    category: "LED fototerapija",
    duration: "20 min"
  },
  {
    id: "led-fototerapija-standard",
    title: "LED Fototerapija - Standard Paket",
    description: "Paket od 6 tretmana LED fototerapije",
    price: "135 EUR",
    category: "LED fototerapija",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "led-fototerapija-premium",
    title: "LED Fototerapija - Premium Paket",
    description: "Paket od 10 tretmana LED fototerapije",
    price: "220 EUR",
    category: "LED fototerapija",
    isPackage: true,
    packageDetails: "10 tretmana"
  },
  {
    id: "led-fototerapija-addon",
    title: "LED Fototerapija - Dodatak",
    description: "Kao dodatak drugom tretmanu u trajanju od 15min",
    price: "15 EUR",
    category: "LED fototerapija",
    duration: "15 min"
  },
  {
    id: "brow-lift",
    title: "Brow Lift",
    description: "Laminacija i bojanje obrva",
    price: "25 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "brow-shaping",
    title: "Oblikovanje Obrva",
    description: "Čupanje obrva pincetom",
    price: "7 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "hd-brows",
    title: "HD Brows",
    description: "Oblikovanje i bojanje obrva",
    price: "10 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "brow-tint",
    title: "Bojanje Obrva ili Trepavica",
    description: "Profesionalno bojanje obrva ili trepavica",
    price: "4 EUR",
    category: "Beauty Tretmani"
  },
  {
    id: "brow-lash-tint",
    title: "Bojanje Obrva i Trepavica",
    description: "Profesionalno bojanje obrva i trepavica",
    price: "7 EUR",
    category: "Beauty Tretmani"
  },

  // Botox
  {
    id: "botox-25",
    title: "Botox 25",
    description: "25 jedinica botoxa",
    price: "105 EUR",
    category: "Botox"
  },
  {
    id: "botox-50",
    title: "Botox 50",
    description: "50 jedinica botoxa",
    price: "210 EUR",
    category: "Botox"
  },
  {
    id: "botox-100",
    title: "Botox 100",
    description: "100 jedinica botoxa",
    price: "420 EUR",
    category: "Botox"
  },

  // Dermalni Fileri
  {
    id: "aliaxin",
    title: "Aliaxin",
    description: "1 ml",
    price: "315 EUR",
    category: "Dermalni Fileri"
  },
  {
    id: "skin-architect-filler",
    title: "Skin Architect Filler",
    description: "1 ml",
    price: "315 EUR",
    category: "Dermalni Fileri"
  },

  // Hijaluronidaza
  {
    id: "hyaluronidase",
    title: "Hijaluronidaza",
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
    title: "Standard Paket",
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
    title: "Premium Paket",
    description: "4 tretmana kemijskog pilinga lica, vrata i dekoltea",
    price: "270 EUR",
    category: "Kemijski Piling",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "chemical-peel-duosomal",
    title: "Duosomal",
    description: "1 tretman kemijskog pilinga duosomal",
    price: "65 EUR",
    category: "Kemijski Piling"
  },
  {
    id: "chemical-peel-duosomal-package",
    title: "Duosomal Paket",
    description: "5 tretmana kemijskog pilinga Duosomal",
    price: "290 EUR",
    category: "Kemijski Piling",
    isPackage: true,
    packageDetails: "5 tretmana"
  },

  // Kombinirani Paketi
  {
    id: "kombinirani-standard",
    title: "Standard",
    description: "1 kemijski piling Dusomal, mezoterapija lica, TKN HA3 i skin architect maska",
    price: "380 EUR",
    category: "Kombinirani Paketi"
  },
  {
    id: "kombinirani-premium",
    title: "Premium",
    description: "2 kemijski piling Dusomal, mezoterapija lica, TKN HA3 i skin architect maska",
    price: "640 EUR",
    category: "Kombinirani Paketi"
  },
  {
    id: "kombinirani-botox-yzone",
    title: "Botox + Y Zona",
    description: "Kombinirani tretman 50 jedinica botoksa vrata i zatezanja i topljenja podbratka i vrata",
    price: "560 EUR",
    category: "Kombinirani Paketi"
  },
  {
    id: "kombinirani-botox-filler",
    title: "Botox + Dermalni Filer",
    description: "Kombinirani tretman 50 jedinica botoksa i 1mL dermalnog filera",
    price: "445 EUR",
    category: "Kombinirani Paketi"
  },
  {
    id: "kombinirani-meso-yzone",
    title: "Mezoterapija Lica + Y Zona",
    description: "Kombinirani tretman 4 mezoterapije lica mesoject gunom i tretman otapanja i zatezanja vrata i podbratka",
    price: "670 EUR",
    category: "Kombinirani Paketi"
  },
  {
    id: "kombinirani-meso-filler-botox",
    title: "Mezoterapija Lica i Vrata + Dermalni Filer + Botox",
    description: "1mL dermalnog filera + 50 jedinica botoksa",
    price: "845 EUR",
    category: "Kombinirani Paketi"
  },



  // Mezoterapija Dermapenom 4
  {
    id: "microneedling-face",
    title: "Microneedling Face",
    description: "1 tretman lica Dermapenom 4",
    price: "120 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "microneedling-face-standard",
    title: "Microneedling Face Standard Paket",
    description: "paket od 4 tretmana lica Dermapenom 4",
    price: "435 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "microneedling-face-premium",
    title: "Microneedling Face Premium Paket",
    description: "paket od 6 tretmana lica Dermapenom 4",
    price: "650 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "microneedling-beauty",
    title: "Microneedling Beauty",
    description: "1 tretman lica, vrata i dekoltea Dermapenom 4",
    price: "155 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "microneedling-beauty-standard",
    title: "Microneedling Beauty Standard Paket",
    description: "paket od 4 tretmana lica, vrata i dekoltea Dermapenom 4",
    price: "560 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "microneedling-beauty-premium",
    title: "Microneedling Beauty Premium Paket",
    description: "6 tretmana lica, vrata i dekoltea Dermapenom 4",
    price: "835 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "6 tretmana"
  },
  {
    id: "exo-face",
    title: "Exo Face",
    description: "1 tretman lica egzosomima",
    price: "175 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "exo-face-classic-dermapen",
    title: "Exo Face Classic",
    description: "Paket od 4 tretmana lica egzosomima",
    price: "630 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "exo-hair-dermapen",
    title: "Exo Hair",
    description: "1 tretman vlasišta egzosomima",
    price: "175 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "exo-hair-classic-dermapen",
    title: "Exo Hair Classic",
    description: "Paket od 4 tretmana vlasišta egzosomima",
    price: "630 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "y-zone-dermapen",
    title: "Y Zona",
    description: "5 tretmana topljenja i zatezanja podbratka i vrata",
    price: "540 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "hair-s-dermapen",
    title: "Hair S",
    description: "1 mezoterapija male zone vlasišta",
    price: "60 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "hair-s-standard-dermapen",
    title: "Hair S - Standard Paket",
    description: "5 mezoterapija male zone vlasišta",
    price: "270 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "hair-s-premium-dermapen",
    title: "Hair S - Premium Paket",
    description: "10 mezoterapija male zone vlasišta",
    price: "500 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "10 tretmana"
  },
  {
    id: "hair-l-dermapen",
    title: "Hair L",
    description: "1 mezoterapija velike zone vlasišta",
    price: "90 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "hair-l-standard-dermapen",
    title: "Hair L - Standard Paket",
    description: "5 mezoterapija velike zone vlasišta",
    price: "405 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "hair-l-premium-dermapen",
    title: "Hair L - Premium Paket",
    description: "10 mezoterapija velike zone vlasišta",
    price: "770 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "10 tretmana"
  },
  {
    id: "brows-dermapen",
    title: "Brows",
    description: "Nadoplata na tretman mezoterapije vlasišta",
    price: "10 EUR",
    category: "Mezoterapija Dermapenom 4"
  },
  {
    id: "brows-package-dermapen",
    title: "Brows Paket",
    description: "5 mezoterapija obrva",
    price: "185 EUR",
    category: "Mezoterapija Dermapenom 4",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "beard-dermapen",
    title: "Beard",
    description: "Nadoplata na tretman mezoterapije vlasišta",
    price: "20 EUR",
    category: "Mezoterapija Dermapenom 4"
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
    title: "Standard Paket",
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
    id: "premium-package",
    title: "Premium Paket",
    description: "4 mezoterapije lica i vrata",
    price: "470 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "4 tretmana"
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
    price: "630 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "10 tretmana"
  },
  {
    id: "exo-face",
    title: "Exo Face",
    description: "Jedan tretman lica egzosomima",
    price: "150 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "exo-face-classic",
    title: "Exo Face Classic",
    description: "Paket od 4 tretmana lica egzosomima",
    price: "540 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "exo-hair",
    title: "Exo Hair",
    description: "Jedan tretman vlasišta egzosomima",
    price: "150 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "exo-hair-classic",
    title: "Exo Hair Classic",
    description: "Paket od 4 tretmana vlasišta egzosomima",
    price: "540 EUR",
    category: "Mezoterapija Mesoject Gunom",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "brows-mesoject",
    title: "Brows",
    description: "Nadoplata na tretman mezoterapije vlasišta",
    price: "10 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },
  {
    id: "beard-mesoject",
    title: "Beard",
    description: "Nadoplata na tretman mezoterapije vlasišta",
    price: "15 EUR",
    category: "Mezoterapija Mesoject Gunom"
  },

  // Plasmage
  {
    id: "plasmage-eyes-standard",
    title: "Eyes Standard",
    description: "Tretman gornjeg ili donjeg kapka",
    price: "635 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-eyes-premium",
    title: "Eyes Premium",
    description: "Tretman gornjeg i donjeg kapka",
    price: "885 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-benign-removal",
    title: "Uklanjanje Dobroćudnih Promjena",
    description: "Uklanjanje 1 promjene",
    price: "20 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-anti-age",
    title: "Anti-Age Tretman",
    description: "Tretman uklanjanja bora plasmageom",
    price: "300 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-scar-s",
    title: "Scar S",
    description: "Terapija malog ožiljka plasmageom",
    price: "50 EUR",
    category: "Plasmage"
  },
  {
    id: "plasmage-scar-l",
    title: "Scar L",
    description: "Terapija velikog ožiljka plasmageom",
    price: "90 EUR",
    category: "Plasmage"
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
    title: "PRP Ideal",
    description: "2 PRP tretmana",
    price: "475 EUR",
    category: "PRP",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "prp-superior",
    title: "PRP Superior",
    description: "3 PRP tretmana",
    price: "675 EUR",
    category: "PRP",
    isPackage: true,
    packageDetails: "3 tretmana"
  },
  {
    id: "prp-classic",
    title: "PRP Classic",
    description: "4 PRP tretmana",
    price: "845 EUR",
    category: "PRP",
    isPackage: true,
    packageDetails: "4 tretmana"
  },

  // RRS
  {
    id: "rrs-xl-hair",
    title: "RRS XL Hair",
    description: "1 tretman vlasišta",
    price: "85 EUR",
    category: "RRS"
  },
  {
    id: "rrs-xl-hair-package",
    title: "RRS XL Hair",
    description: "5 tretmana vlasišta",
    price: "380 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "5 tretmana"
  },
  {
    id: "rrs-ha-eyes",
    title: "RRS HA Eyes",
    description: "1 tretman okoloočnog područja",
    price: "75 EUR",
    category: "RRS"
  },
  {
    id: "rrs-ha-eyes-package",
    title: "RRS HA Eyes Paket",
    description: "4 tretmana okoloočnog područja",
    price: "270 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "4 tretmana"
  },
  {
    id: "rrs-hyalift",
    title: "RRS Hyalift",
    description: "1 ampula RRS Hyalift",
    price: "160 EUR",
    category: "RRS"
  },
  {
    id: "rrs-hyalift-package",
    title: "RRS Hyalift Paket",
    description: "4 ampule RRS Hyalift",
    price: "575 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "4 ampule"
  },
  {
    id: "rrs-silisorg",
    title: "RRS Silisorg/Silisorg HA",
    description: "1 ampula",
    price: "80 EUR",
    category: "RRS"
  },
  {
    id: "rrs-tensor-lift",
    title: "RRS Tensor Lift",
    description: "1 ampula",
    price: "160 EUR",
    category: "RRS"
  },
  {
    id: "rrs-tensor-lift-package",
    title: "RRS Tensor Lift Paket",
    description: "4 ampule",
    price: "575 EUR",
    category: "RRS",
    isPackage: true,
    packageDetails: "4 ampule"
  },

  // Skin Boosteri
  {
    id: "skin-booster-tkn-ha3",
    title: "TKN HA3",
    description: "1 tretman TKN HA3",
    price: "265 EUR",
    category: "Skin Boosteri"
  },
  {
    id: "skin-booster-tkn-ha3-standard",
    title: "TKN HA3 - Standard Paket",
    description: "2 tretmana TKN HA3",
    price: "475 EUR",
    category: "Skin Boosteri",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "skin-booster-tkn-ha3-premium",
    title: "TKN HA3 - Premium Paket",
    description: "Premium paket - 3 tretmana TKN HA3",
    price: "640 EUR",
    category: "Skin Boosteri",
    isPackage: true,
    packageDetails: "3 tretmana"
  },
  {
    id: "skin-booster-profhilo",
    title: "Profhilo",
    description: "1 tretman Profhilo",
    price: "340 EUR",
    category: "Skin Boosteri"
  },
  {
    id: "skin-booster-profhilo-package",
    title: "Profhilo Paket",
    description: "2 tretmana Profhilo",
    price: "635 EUR",
    category: "Skin Boosteri",
    isPackage: true,
    packageDetails: "2 tretmana"
  },
  {
    id: "skin-booster-rrs-ha",
    title: "RRS HA Long Lasting",
    description: "1 tretman RRS HA Long Lasting",
    price: "285 EUR",
    category: "Skin Boosteri"
  },
  {
    id: "skin-booster-rrs-ha-package",
    title: "RRS HA Long Lasting Paket",
    description: "2 tretmana RRS HA Long Lasting",
    price: "500 EUR",
    category: "Skin Boosteri",
    isPackage: true,
    packageDetails: "2 tretmana"
  },

  // TOSKANI Proizvodi
  {
    id: "energizing-cleanser",
    title: "Energizing Cleanser",
    description: "200 ml",
    price: "40 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-cleanser",
    title: "Purifying Cleanser",
    description: "200 ml",
    price: "40 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "bamboo-hydratonic",
    title: "Bamboo Hydratonic",
    description: "200 ml",
    price: "30 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "nutritive-scrub",
    title: "Nutritive Scrub",
    description: "200 ml",
    price: "45 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-scrub",
    title: "Purifying Scrub",
    description: "200 ml",
    price: "45 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "total-recovery-gel",
    title: "Total Recovery Gel",
    description: "50 ml",
    price: "35 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-daily-cream",
    title: "Radiance Daily Cream SPF 30+",
    description: "50 ml",
    price: "60 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-eye-contour",
    title: "Radiance Eye Contour",
    description: "15 ml",
    price: "40 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-ultimate-mesoserum",
    title: "Radiance Ultimate Mesoserum",
    description: "30 ml",
    price: "75 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-intensive-serum",
    title: "Purifying Intensive Serum",
    description: "15 ml",
    price: "40 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-cream",
    title: "Purifying Cream",
    description: "50 ml",
    price: "56 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "skin-architect-mesoserum",
    title: "Skin Architect Mesoserum",
    description: "30 ml",
    price: "70 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "skin-architect-cream",
    title: "Skin Architect Cream",
    description: "50 ml",
    price: "60 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "glacier-pro-age-serum",
    title: "Glacier Pro Age Serum",
    description: "30 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "glacier-pro-age-cream",
    title: "Glacier Pro Age Cream",
    description: "50 ml",
    price: "60 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "retin-pro-age-serum",
    title: "Retin Pro Age Serum",
    description: "30 ml",
    price: "70 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "retin-pro-age-cream",
    title: "Retin Pro Age Cream",
    description: "50 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "unique-pro-age-serum",
    title: "Unique Pro Age Serum",
    description: "30 ml",
    price: "70 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "unique-pro-age-cream",
    title: "Unique Pro Age Cream",
    description: "50 ml",
    price: "65 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "anti-hair-loss-lotion",
    title: "Anti Hair-Loss Lotion",
    description: "100 ml",
    price: "45 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "densihair-boost-capsules",
    title: "DensiHair Boost Capsules",
    description: "30 kapsula",
    price: "35 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "night-reverse-advanced-serum",
    title: "Night Reverse Advanced Serum",
    description: "30 ml",
    price: "80 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "night-reverse-intensive-cream-mask",
    title: "Night Reverse Intensive Cream & Mask",
    description: "50 ml",
    price: "70 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "anti-ageing-eye-contour",
    title: "Anti Ageing Eye Contour",
    description: "15 ml",
    price: "45 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "anti-ageing-ha-ampule",
    title: "Anti-ageing + HA Ampule",
    description: "15 x 2 ml",
    price: "50 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "radiance-ampule",
    title: "Radiance Ampule",
    description: "15 x 2 ml",
    price: "50 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "sensitive-skin-ampule",
    title: "Sensitive Skin Ampule",
    description: "15 x 2 ml",
    price: "50 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "purifying-ampule",
    title: "Purifying Ampule",
    description: "15 x 2 ml",
    price: "50 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "lipo-proteoglycans-ampule",
    title: "Lipo Proteoglycans Ampule",
    description: "15 x 2 ml",
    price: "50 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "vitaflash-ampule",
    title: "Vitaflash Ampule",
    description: "15 x 2 ml",
    price: "30 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "sun-shield-d-facial-cream",
    title: "Sun Shiel-D Sun Fluid Facial Cream",
    description: "50ml",
    price: "36 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "sun-shield-d-facial-cream-tinted",
    title: "Sun Shiel-D Sun Fluid Facial Cream Tinted",
    description: "50ml",
    price: "39 EUR",
    category: "TOSKANI Proizvodi"
  },
  {
    id: "sun-shield-d-body-face-spray",
    title: "Sun Shiel-D Sun Body&Face Sprej",
    description: "200ml",
    price: "42 EUR",
    category: "TOSKANI Proizvodi"
  }
]; 