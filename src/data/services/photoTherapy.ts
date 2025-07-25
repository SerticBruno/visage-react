import { Service } from './types';

export const photoTherapy: Service = {
  id: 'foto-terapija',
  title: 'Fototerapija',
  akuzativTitle: 'Fototerapijom',
  description: 'Napredna fototerapija za tretman kože svjetlom',
  longDescription: `Fototerapija je revolucionarna metoda tretmana kože koja koristi kontrolirane valove svjetlosti za stimulaciju prirodnih procesa regeneracije kože. Ova napredna tehnologija pruža učinkovite rezultate bez invazivnih postupaka.

Kroz precizno kalibrirane svjetlosne impulse, fototerapija stimulira proizvodnju kolagena, poboljšava cirkulaciju i aktivira prirodne mehanizme oporavka kože. Svaki tretman je prilagođen individualnim potrebama i stanju kože.

Fototerapija je idealna za različite probleme kože i pruža vidljive rezultate kroz seriju tretmana. Posebno je učinkovita za akne, ožiljke, hiperpigmentaciju i općenito poboljšanje tonusa i teksture kože.

U Visage studiju koristimo najnoviju tehnologiju fototerapije, što osigurava optimalne rezultate i maksimalnu sigurnost. Svaki tretman je pažljivo planiran za postizanje željenih rezultata uz minimalno vrijeme oporavka.`,
  benefits: [
  ],
  image: '/images/services/mezoterapija/mezoterapija-tijek-zahvata-visage-estetski-studio.webp',
  heroImage: '/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg',
  metaDescription: 'Profesionalna fototerapija u VISAGE studiju u Siska. Napredni tretmani kože svjetlom za akne, ožiljke i poboljšanje tonusa kože. Sigurni i učinkoviti rezultati.',
  metaKeywords: 'fototerapija, svjetlosna terapija, akne, ožiljci, hiperpigmentacija, estetski studio Sisak, VISAGE studio, tretman kože svjetlom',
  tags: ['fototerapija', 'svjetlosna-terapija', 'akne', 'ožiljci', 'hiperpigmentacija', 'nježni-tretmani'],
  pricingCategory: 'Fototerapije',
  relatedServices: ['kemijski-piling', 'mezoterapija', 'skin-boosteri'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/mezoterapija/mezoterapija-kandidati-visage-estetski-studio.jpg'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/mezoterapija/mezoterapija-priprema-visage-estetski-studio.jpg'
    },
    { 
      id: 'tijek-zahvata', 
      label: 'Tijek zahvata', 
      icon: 'FaRegClock',
      image: '/images/services/mezoterapija/mezoterapija-tijek-zahvata-visage-estetski-studio.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital',
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/mezoterapija/mezoterapija-nakon-tretmana-visage-estetski-studio.jpg'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti fototerapije:
- Neinvazivna metoda tretmana kože
- Stimulacija proizvodnje kolagena
- Poboljšanje cirkulacije u koži
- Smanjenje upalnih procesa
- Ujednačavanje tonusa kože
- Smanjenje ožiljaka i hiperpigmentacije
- Sigurna i nježna metoda
- Vidljivi rezultati kroz seriju tretmana
- Minimalno vrijeme oporavka
- Prilagođeno različitim tipovima kože`,
    'kandidati': `Fototerapija je idealna za osobe koje žele:
- Tretman akni i ožiljaka
- Poboljšanje tonusa i teksture kože
- Smanjenje hiperpigmentacije
- Stimulaciju proizvodnje kolagena
- Neinvazivne metode tretmana
- Prirodne rezultate bez kemikalija

Pogodna je za sve tipove kože, posebno za:
- Osobe s problemima akni
- Osobe s ožiljcima nakon akni
- Osobe s hiperpigmentacijom
- Osobe koje traže poboljšanje tonusa kože`,
    'priprema': `Prije fototerapije potrebno je:
1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Odabir odgovarajućeg tretmana prema vašim potrebama
3. Upute za pripremu kože prije tretmana

Dan prije tretmana:
- Očistiti kožu od kozmetike
- Izbjeći izlaganje suncu
- Piti dovoljno vode za optimalnu hidrataciju
- Dolaziti s čistom i suhom kožom`,
    'tijek-zahvata': `Tretman fototerapije je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Konzultacija i procjena - Detaljna analiza stanja kože, odabir odgovarajućeg tretmana, plan postupka i objašnjenje.

2. Priprema kože - Čišćenje kože, uklanjanje kozmetike i priprema za tretman.

3. Primjena tretmana - Precizna primjena svjetlosnih impulsa, praćenje reakcije kože i prilagodba intenziteta.

4. Završna njega - Primjena umirujućih proizvoda i zaštitnih kremi.

5. Preporuka za kućnu njegu - Preporučujemo korištenje SPF zaštite i redovitu njegu kože.`,
    'oporavak': `Oporavak je minimalan, uz pravilnu njegu kože. Nuspojave mogu uključivati:
1. Blago crvenilo kože koje nestaje u roku od nekoliko sati
2. Osjetljivost na sunce u prvih 24-48 sati
3. Moguće blago suhoće kože
4. Potreba za dodatnom hidratacijom

Potrebno je izbjegavati sunce 24-48 sati i koristiti SPF zaštitu.`,
    'nakon-tretmana': `Za najbolje rezultate se preporučuje protokol:

Nakon fototerapije važno je:

- Zaštita od sunca - Izbjegavajte izravno izlaganje suncu 24-48 sati nakon tretmana.

- SPF zaštita - Koristite SPF 30+ zaštitu svaki dan, čak i u zatvorenom prostoru.

- Umirujuća njega - Koristite umirujuće proizvode ako osjetite blago crvenilo.

- Redovito praćenje - Pratite stanje kože i javite se ako primijetite bilo kakve probleme.

- Kontinuirana njega - Redovito koristite preporučene proizvode za njegu za održavanje rezultata.

- Izbjegavanje agresivnih proizvoda - Ne koristite retinoide ili AHA kiseline 48 sati nakon tretmana.`,
    'cijena': `Cijena fototerapije ovisi o tipu tretmana i broju potrebnih sesija. Naši fototerapijski tretmani uključuju:

- Tretman akni i ožiljaka
- Tretman hiperpigmentacije
- Poboljšanje tonusa kože
- Stimulacija proizvodnje kolagena
- Kombinirani tretmani s drugim metodama

Za optimalne rezultate preporučujemo seriju od 6-8 tretmana s intervalima od 2-4 tjedna. Za detaljne informacije o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 