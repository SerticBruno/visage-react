import { Service } from './types';

export const mesotherapy: Service = {
  id: 'mezoterapija',
  title: 'Mezoterapija',
  description: 'Dubinska hidratacija i revitalizacija kože uz pomoć mikroinjekcija',
  longDescription: `Mezoterapija je napredni tretman koji kombinira precizne mikroinjekcije s koktelom aktivnih sastojaka za dubinsku hidrataciju i revitalizaciju kože. Ovaj revolucionarni pristup omogućava direktnu primjenu nutritivnih sastojaka u srednji sloj kože, gdje su najefikasniji.

Kroz precizne mikroinjekcije, aktivni sastojci poput hijaluronske kiseline, vitamina, minerala i aminokiselina direktno se isporučuju u dermis, potičući prirodne procese regeneracije i obnove kože.

Mezoterapija je idealna za sve tipove kože i pruža vidljive rezultate već nakon prvog tretmana. Posebno je učinkovita za dehidriranu kožu, kožu s finim linijama i kožu koja izgleda umorno.

U Visage studiju koristimo najnoviju tehnologiju Mesoject Gun-a koja osigurava preciznost, minimalnu bol i optimalne rezultate. Svaki tretman je prilagođen individualnim potrebama vaše kože.`,
  benefits: [
  ],
  image: '/images/services/Mesoterapia-transdermica-facial.webp',
  heroImage: '/images/services/Mesoterapia-transdermica-facial.webp',
  metaDescription: 'Profesionalna mezoterapija u VISAGE studiju u Siska. Dubinska hidratacija i revitalizacija kože uz pomoć preciznih mikroinjekcija Mesoject Gun tehnologijom.',
  metaKeywords: 'mezoterapija, hidratacija kože, mikroinjekcije, estetski studio Sisak, VISAGE studio, Mesoject Gun, mezoterapija lica',
  tags: ['mezoterapija', 'hidratacija', 'mikroinjekcije', 'revitalizacija', 'mesoject-gun'],
  pricingCategory: 'Mezoterapija Mesoject Gunom',
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd',
      image: '/images/services/Mesoterapia-transdermica-facial.webp'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti mezoterapije:
- Dubinska hidratacija kože kroz direktnu primjenu hijaluronske kiseline
- Smanjivanje finih linija i bora poticanjem kolagena
- Poboljšanje tonusa i teksture kože
- Revitalizacija umorne i dehidrirane kože
- Prirodna regeneracija stanica i obnova kože
- Minimalno invazivni tretman s brzim oporavkom
- Vidljivi rezultati već nakon prvog tretmana
- Dugotrajni učinci kroz seriju tretmana`,
    'kandidati': `Mezoterapija je idealna za osobe koje žele:
- Poboljšati hidrataciju dehidrirane kože
- Smanjiti fine linije i bore
- Revitalizirati umornu kožu
- Poboljšati tonus i teksturu kože
- Prirodno potaknuti regeneraciju stanica
- Postići svjež i mladenački izgled

Pogodna je za sve tipove kože i dobne skupine, posebno za:
- Dehidriranu kožu
- Kožu s finim linijama
- Umornu kožu
- Kožu koja treba revitalizaciju`,
    'priprema': `Prije mezoterapije potrebno je:
1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Preporuka odgovarajućeg tipa koktela za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože (npr. retinol)
- Ne smijete laserski uklanjati dlačice`,
    'tijek-zahvata': `Tretman mezoterapijom je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Priprema kože - Čišćenje kože, primjena anestetičke kreme za komfort i dezinfekcija kože.

2. Primjena mezoterapije - Precizne mikroinjekcije Mesoject Gun-om s odabranim koktelom aktivnih sastojaka.

3. Završna njega - Nanošenje umirujućih proizvoda, regenerativnih seruma i zaštitnog krema s SPF faktorom.

4. Preporuka za kućnu njegu - Preporučujemo korištenje blagih proizvoda za čišćenje, hidratantnih kremova i obavezno korištenje SPF 50+ zaštite.`,
    'oporavak': `Oporavak može trajati nekoliko dana, uz blago crvenilo i osjetljivost kože. Nuspojave mogu uključivati:
1. Crvenilo
2. Osjetljivost
3. Peckanje
4. Male crvene točkice na mjestima injekcija`,
    'nakon-tretmana': `Nakon mezoterapije važno je:

- Zaštita od sunca - Obavezno koristite kremu sa zaštitnim faktorom SPF 50+ i izbjegavajte izravno izlaganje suncu.

- Njega kože - Koristite blage proizvode za čišćenje i hidrataciju kože, izbjegavajte agresivne proizvode.

- Izbjegavanje dodatnih tretmana - Tjedan dana nakon mezoterapije izbjegavajte druge estetske tretmane.

- Redovito praćenje - Pratite stanje kože i javite se ako primijetite bilo kakve neobične reakcije.`,
    'cijena': 'Cijena mezoterapije ovisi o području tretmana, tipu koktela i broju potrebnih tretmana. Za optimalne rezultate preporučujemo seriju od 3-6 tretmana s intervalima od 2-4 tjedna.'
  }
}; 