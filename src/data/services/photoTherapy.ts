import { Service } from './types';

export const photoTherapy: Service = {
  id: 'foto-terapija',
  title: 'Dermalux LED fototerapija',
  akuzativTitle: 'Fototerapijom',
  description: 'Zlatni standard profesionalne led fototerapije u službi zdrave i lijepe kože',
  longDescription: `<strong>Zlatni standard led fototerapije u službi zdrave i lijepe kože</strong>

<strong>Dermalux Flex MD</strong> je medicinski CE certificirani uređaj koji omogućuje <strong>vrhunske i neinvazivne tretmane lica</strong>.

Djeluje na principu <strong>fototerapije</strong>, odnosno liječenja svjetlom. Koža apsorbira specifične valne duljine kako bi stimulirala <strong>obnovu stanica</strong>, potaknula <strong>proizvodnju kolagena i elastina</strong>, riješila problematična stanja te ubrzala <strong>zacjeljivanje kože</strong>.

Tretman je <strong>ugodan, bezbolan, siguran</strong> te pruža niz dobrobiti za kožu.

Nakon samo <strong>jednog tretmana</strong> Flex MD LED fototerapije klijenti mogu očekivati <strong>trenutačno poboljšanje tonusa kože, hidratacije i sjaja</strong>, dok terapeutsko svjetlo istovremeno potiče <strong>dublje stanične procese za dugotrajne dobiti kože</strong>.

Koristi se najčešće u <strong>sinergiji s drugim estetskim tretmanima</strong>: <a href="/usluge/mezoterapija">mezoterapija</a>, <a href="/usluge/beauty-tretmani">beauty tretmani</a> i <a href="/usluge/skin-boosteri">skin boosteri</a>

U <strong>Visage studiju</strong> koristimo najnoviju tehnologiju fototerapije, što osigurava <strong>optimalne rezultate i maksimalnu sigurnost</strong>. Svaki tretman je pažljivo planiran za postizanje željenih rezultata uz <strong>minimalno vrijeme oporavka</strong>.`,
  benefits: [
  ],
  image: '/images/services/mezoterapija/mezoterapija-tijek-zahvata-visage-estetski-studio.webp',
  heroImage: '/images/services/mezoterapija/mezoterapija-visage-estetski-studio.jpg',
  metaDescription: 'Profesionalna fototerapija u VISAGE studiju u Siska. Napredni tretmani kože svjetlom za akne, ožiljke i poboljšanje tonusa kože. Sigurni i učinkoviti rezultati.',
  metaKeywords: 'fototerapija, svjetlosna terapija, akne, ožiljci, hiperpigmentacija, estetski studio Sisak, VISAGE studio, tretman kože svjetlom',
  tags: ['fototerapija', 'svjetlosna-terapija', 'akne', 'ožiljci', 'hiperpigmentacija', 'nježni-tretmani'],
  pricingCategory: 'Fototerapije',
  relatedServices: ['mezoterapija', 'beauty-tretmani', 'skin-boosteri'],
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
      id: 'tijek-tretmana', 
      label: 'Tijek tretmana', 
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
    'prednosti': `Prednosti LED fototerapije:

- Potiče stvaranje kolagena i elastina
- Potiče obnovu stanica
- Pomlađuje lice i smanjuje vidljivost bora
- Umanjuje pigmentacije
- Tretira crvenilo i iritacije te psorijazu
- Pomaže pri liječenju problematične kože sklone aknama
- Pomaže u zacjeljivanju kože nakon operativnih zahvata
- Može se kombinirati s ostalim tretmanima radi pojačanja učinka tretmana
- Pogodan i siguran za sve tipove kože`,
    'kandidati': `LED fototerapija je idealna za osobe koje žele:

- Poboljšanje tonusa i teksture kože
- Tretmani akni i ožiljaka
- Smanjenje hiperpigmentacija
- Tretirati i liječiti crvenilo i psorijazu
- Ubrzati zacjeljivanje rana
- Prirodne rezultate`,
    'priprema': `Prije LED fototerapije potrebno je:

1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Odabir odgovarajućeg tretmana prema vašim potrebama
3. Prijedlog broja tretmana`,
    'tijek-tretmana': `Tretman LED fototerapije je precizan postupak koji se provodi u nekoliko faza:

1. Priprema kože - Čišćenje kože, piling i nanošenje odgovarajuće maske koja je fotopropusna

2. Primjena LED fototerapije - Precizna primjena odgovarajuće kombinacije svjetlosti. Tretman traje 20 minuta ako se radi u kombinaciji s drugim tretmanom ili 30 minuta, ako se radi kao zaseban tretman.

Tijekom tretmana su oči zaštićene posebnim naočalama i preporuka je da ih držite zatvorenima.

3. Završna njega - Uklanjanje maske. Nanošenje <a href="/katalog?product=7">Toskani Total Recovery gela</a> i <a href="/katalog?product=31">Sun Shiel-D fluida</a>

4. Preporuka za kućnu njegu - Preporučujemo korištenje <a href="/katalog?product=7">Toskani Total Recovery gela</a> i <a href="/katalog?product=31">Sun Shiel-D fluida</a>.`,
    'oporavak': `Oporavak je minimalan i uključuje blago i privremeno crvenilo tretiranog područja zbog pojačane cirkulacije. Koža može biti topla na dodir.`,
    'nakon-tretmana': `Za najbolje rezultate preporuča se minimalno 10 LED fototerapija. Fototerapije bi se radile 2 puta tjedno, a za određena stanja i na dnevnoj bazi.

Nakon fototerapije važno je:

- Koristiti zaštitu od sunca <a href="/katalog?product=31">Toskani Sun Shiel-D fluid</a>
- Koristiti preporučenu Toskani kućnu njegu za najbolje rezultate`,
    'cijena': `Cijena LED fototerapije ovisi o tipu tretmana i broju potrebnih sesija. Za optimalne rezultate preporučujemo minimalno 10 tretmana s intervalima od 2-3 puta tjedno. Za detaljne informacije o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 