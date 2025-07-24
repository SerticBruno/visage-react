import { Service } from './types';

export const wrinkleTherapy: Service = {
  id: 'terapija-bora-lica',
  title: 'Terapija bora lica',
  description: 'Efikasna terapija za smanjenje i prevenciju bora lica',
  longDescription: `Terapija bora lica je specijalizirana metoda za smanjenje i prevenciju bora kroz napredne anti-aging tretmane. Ova revolucionarna metoda kombinira najnovije tehnologije i visokokvalitetne proizvode za optimalne rezultate.

Kroz precizne tretmane, terapija bora aktivira prirodne procese regeneracije kože, potičući produkciju kolagena i elastina. Ova metoda rezultira smanjenjem vidljivosti postojećih bora, prevencijom novih bora i poboljšanjem općeg izgleda kože.

Terapija bora je idealna za sve dobne skupine i pruža vidljive rezultate već nakon prvog tretmana. Posebno je učinkovita za fine linije, duboke bore, gubitak elastičnosti kože i opće poboljšanje tonusa lica.

U Visage studiju koristimo najkvalitetnije proizvode i tehnike za terapiju bora, prilagođene vašem tipu kože i specifičnim potrebama. Svaki tretman je pažljivo planiran za optimalne i dugotrajne rezultate.`,
  benefits: [
  ],
  image: '/images/services/manikura.webp',
  heroImage: '/images/services/botox-face-girl.webp',
  metaDescription: 'Profesionalna terapija bora lica u VISAGE studiju u Siska. Smanjite i spriječite bore uz pomoć naprednih anti-aging metoda. Prirodni i dugotrajni rezultati.',
  metaKeywords: 'terapija bora, bore lica, prevencija bora, anti-aging, estetski studio Sisak, VISAGE studio, smanjenje bora',
  tags: ['terapija-bora', 'prevencija-bora', 'anti-aging', 'nježni-tretmani', 'lifting-lica'],
  pricingCategory: 'Botox',
  relatedServices: ['dermalni-fileri', 'plasmage', 'mezoterapija'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/toskani-woman.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/toskani-woman.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/toskani-woman.webp'
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/toskani-woman.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
      image: '/images/services/toskani-woman.webp'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/toskani-woman.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti terapije bora lica:
- Smanjivanje vidljivosti postojećih bora
- Prevencija pojave novih bora
- Poboljšanje tonusa i teksture kože
- Poboljšanje elastičnosti kože
- Prirodni i dugotrajni rezultati
- Minimalno invazivni tretman
- Vidljivi rezultati već nakon prvog tretmana
- Sigurna metoda s minimalnim rizikom
- Stimulacija prirodne produkcije kolagena
- Anti-aging učinci`,
    'kandidati': `Terapija bora je idealna za osobe koje žele:
- Smanjiti postojeće bore i fine linije
- Spriječiti pojavu novih bora
- Poboljšati tonus i teksturu kože
- Poboljšati elastičnost kože
- Postići prirodan i mladenački izgled
- Koristiti napredne anti-aging metode

Pogodna je za sve dobne skupine, posebno za:
- Osobe s vidljivim borama i finim linijama
- Osobe s gubitkom elastičnosti kože
- Osobe koje žele prevenciju starenja
- Osobe koje žele poboljšati tonus lica`,
    'priprema': `Prije terapije bora potrebno je:
1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Preporuka odgovarajućeg tretmana za vaš tip kože
3. Preporuka broja tretmana za optimalne rezultate
4. Upute za pripremu kože prije tretmana

Tjedan dana prije tretmana:
- Izbjegavati izlaganje suncu
- Prekinuti korištenje agresivnih proizvoda za njegu kože
- Piti dovoljno vode za optimalnu hidrataciju kože
- Ne smijete laserski uklanjati dlačice`,
    'tijek-zahvata': `Tretman za smanjenje bora je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje.

2. Priprema kože - Dubinsko čišćenje kože, primjena anestetičke kreme, oznaka područja za tretman i dezinfekcija kože.

3. Primjena tretmana - Precizna primjena proizvoda, praćenje reakcije kože i masiranje područja.

4. Završna njega - Primjena umirujućih proizvoda, regenerativnih seruma i zaštitnog krema s SPF faktorom.

5. Preporuka za kućnu njegu - Preporučujemo korištenje blagih proizvoda za čišćenje, hidratantnih kremova i obavezno korištenje SPF 50+ zaštite.`,
    'oporavak': `Oporavak može trajati 1-2 dana, uz blago crvenilo i osjetljivost kože. Nuspojave mogu uključivati:
1. Crvenilo koje nestaje u roku od 1-2 dana
2. Osjetljivost kože
3. Blago peckanje na mjestima tretmana
4. Moguća mala modrica (rijetko)

Potrebno je izbjegavati izravno sunce 2 tjedna i koristiti blage proizvode za njegu kože.`,
    'nakon-tretmana': `Za najbolje rezultate se preporučuje protokol:

Nakon terapije bora važno je:

- Zaštita od sunca - Obavezno koristite kremu sa zaštitnim faktorom SPF 50+ i izbjegavajte izravno izlaganje suncu 2 tjedna.

- Njega kože - Koristite blage proizvode za čišćenje i hidrataciju kože, izbjegavajte agresivne proizvode.

- Izbjegavanje dodatnih tretmana - Tjedan dana nakon tretmana izbjegavajte druge estetske tretmane.

- Redovito praćenje - Pratite stanje kože i javite se ako primijetite bilo kakve neobične reakcije.

- Kontinuirana njega - Redovito koristite preporučene proizvode za njegu za održavanje rezultata.`,
    'cijena': `Cijena terapije bora ovisi o količini potrebnog Botoxa i području tretmana. Naši Botox tretmani uključuju:

- Botox 25 - 25 jedinica Botoxa za manje područja (npr. međuobrvno područje)
- Botox 50 - 50 jedinica Botoxa za srednja područja (npr. čelo i međuobrvno područje)
- Botox 100 - 100 jedinica Botoxa za veća područja (npr. čelo, međuobrvno područje, očne vijuge)

Botox je najučinkovitiji za:
- Smanjenje horizontalnih bora na čelu
- Smanjenje vertikalnih bora između obrva
- Smanjenje bora oko očiju (vrančići)
- Lifting obrva

Za optimalne rezultate preporučujemo redovite tretmane svakih 4-6 mjeseci. Za detaljne informacije o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 