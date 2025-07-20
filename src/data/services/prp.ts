import { Service } from './types';

export const prp: Service = {
  id: 'prp',
  title: 'PRP',
  description: 'PRP terapija za poticanje prirodne regeneracije kože',
  longDescription: `PRP (Platelet Rich Plasma) terapija je revolucionarna metoda koja koristi vlastite trombocite pacijenta za poticanje prirodne regeneracije kože. Ova potpuno prirodna i sigurna metoda omogućava direktnu primjenu koncentriranih faktora rasta u kožu.

Kroz precizne mikroinjekcije, vlastiti trombociti pacijenta se isporučuju u dermis, potičući prirodne procese regeneracije i obnove kože. PRP terapija aktivira vlastite mehanizme popravka kože, što rezultira poboljšanjem tonusa, teksture i općeg izgleda kože.

PRP terapija je idealna za sve tipove kože i pruža vidljive rezultate već nakon prvog tretmana. Posebno je učinkovita za kožu koja treba revitalizaciju, kožu s finim linijama i kožu koja izgleda umorno.

U Visage studiju koristimo najnapredniju opremu za pripremu PRP-a, što osigurava optimalnu koncentraciju trombocita i maksimalne rezultate. Svaki tretman je prilagođen individualnim potrebama vaše kože.`,
  benefits: [
  ],
  image: '/images/services/plasmage-hero.webp',
  heroImage: '/images/services/Mesoterapia-transdermica-facial.webp',
  metaDescription: 'Profesionalna PRP terapija u VISAGE studiju u Siska. Koristite vlastite trombocite za regeneraciju kože. Prirodna i sigurna metoda s vidljivim rezultatima.',
  metaKeywords: 'PRP terapija, regeneracija kože, trombociti, estetski studio Sisak, VISAGE studio, PRP lica, prirodna regeneracija',
  tags: ['prp', 'regeneracija', 'prirodni-tretmani', 'minimalno-invazivni', 'trombociti'],
  pricingCategory: 'PRP',
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/woman-face-visage-estetski-studio.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/woman-face-visage-estetski-studio.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/woman-face-visage-estetski-studio.webp'
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/woman-face-visage-estetski-studio.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/woman-face-visage-estetski-studio.webp'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/woman-face-visage-estetski-studio.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti PRP terapije:
- Potpuno prirodna metoda koja koristi vlastite stanice pacijenta
- Potiče prirodnu regeneraciju kože kroz faktore rasta
- Poboljšava tonus i teksturu kože
- Smanjuje fine linije i bore
- Revitalizira umornu i dehidriranu kožu
- Minimalno invazivni tretman s brzim oporavkom
- Vidljivi rezultati već nakon prvog tretmana
- Dugotrajni učinci kroz seriju tretmana
- Sigurna metoda bez rizika od alergijskih reakcija`,
    'kandidati': `PRP terapija je idealna za osobe koje žele:
- Potaknuti prirodnu regeneraciju kože
- Poboljšati tonus i teksturu kože
- Smanjiti fine linije i bore
- Revitalizirati umornu kožu
- Koristiti potpuno prirodnu metodu
- Postići svjež i mladenački izgled

Pogodna je za sve tipove kože i dobne skupine, posebno za:
- Umornu kožu koja treba revitalizaciju
- Kožu s finim linijama i borama
- Dehidriranu kožu
- Kožu koja treba poboljšanje tonusa`,
    'priprema': `Prije PRP terapije potrebno je:
1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Preporuka broja tretmana za optimalne rezultate
3. Upute za pripremu kože prije tretmana
4. Analiza krvi (po potrebi)

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože
- Izbjegavati alkohol i pušenje
- Ne smijete laserski uklanjati dlačice`,
    'tijek-zahvata': `Tretman PRP (Platelet Rich Plasma) je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje.

2. Priprema kože - Dubinsko čišćenje kože, priprema za uzimanje krvi, dezinfekcija kože.

3. Primjena PRP - Uzimanje krvi, priprema plazme, precizne mikroinjekcije i masiranje područja.

4. Završna njega - Primjena umirujućih proizvoda, regenerativnih seruma i zaštitnog krema s SPF faktorom.

5. Preporuka za kućnu njegu - Preporučujemo korištenje blagih proizvoda za čišćenje, hidratantnih kremova i obavezno korištenje SPF 50+ zaštite.`,
    'oporavak': `Oporavak može trajati nekoliko dana, uz blago crvenilo i osjetljivost kože. Nuspojave mogu uključivati:
1. Crvenilo
2. Osjetljivost
3. Peckanje
4. Male crvene točkice na mjestima injekcija
5. Moguća mala modrica na mjestima injekcija

Redoviti tretmani svakih 4-6 tjedana daju najbolje rezultate.`,
    'nakon-tretmana': `Nakon PRP terapije važno je:

- Zaštita od sunca - Obavezno koristite kremu sa zaštitnim faktorom SPF 50+ i izbjegavajte izravno izlaganje suncu 2 tjedna.

- Njega kože - Koristite blage proizvode za čišćenje i hidrataciju kože, izbjegavajte agresivne proizvode.

- Izbjegavanje dodatnih tretmana - Tjedan dana nakon PRP terapije izbjegavajte druge estetske tretmane.

- Redovito praćenje - Pratite stanje kože i javite se ako primijetite bilo kakve neobične reakcije.

- Hidratacija - Piti dovoljno vode za optimalnu hidrataciju kože.`,
    'cijena': `Cijena PRP terapije:
- Pojedinačni tretman: 600 kn
- Paket od 3 tretmana: 1.500 kn
- Paket od 6 tretmana: 2.800 kn

Cijene uključuju:
- Konzultaciju s našim stručnjacima
- Tretman PRP terapijom
- Naknadnu njegu kože
- Savjete za kućnu njegu

Za optimalne rezultate preporučujemo seriju od 3-6 tretmana s intervalima od 4-6 tjedana. Za više informacija o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 