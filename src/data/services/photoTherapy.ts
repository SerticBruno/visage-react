import { Service } from './types';

export const photoTherapy: Service = {
  id: 'foto-terapija',
  title: 'LED Fototerapija',
  akuzativTitle: 'Fototerapijom',
  description: 'Zlatni standard profesionalne LED fototerapije u službi zdrave i lijepe kože',
  longDescription: `[**Dermalux Flex MD**](https://dermaluxled.com/flex-md/ "‌") je medicinski CE certificirani uređaj koji omogućuje **vrhunske i neinvazivne** tretmane lica.

Koristi terapeutsku svjetlosnu energiju za **pomlađivanje** i **korekciju** **kože**. Djeluje na principu **fototerapije**, odnosno liječenja svjetlom, s dokazanim učincima.

 Koža apsorbira specifične valne duljine kako bi stimulirala **obnovu stanica**, potaknula **proizvodnju kolagena i elastina**, **riješila problematična stanja** te ubrzala **zacjeljivanje kože**.

Upravo je [Dermalux Flex MD ](https://dermaluxled.com/flex-md/ "‌")najmanje **3 puta snažniji** u usporedbi s ostalim LED uređajima te vrste. [Dermalux Flex MD](https://dermaluxled.com/results/ "‌") fototerapija je dokazana zbog svojih svjetlosnih **regenerativnih** i **protuupalnih** prednosti bez stvaranja traume za kožu, što ju čini **sigurnom** i prikladnom za **sve tipove kože.**

Tretman je **ugodan, bezbolan, siguran** te pruža niz dobrobiti za kožu.

Nakon samo **jednog tretmana** [Dermalux Flex MD](https://dermaluxled.com/results/ "‌") fototerapije klijenti mogu očekivati **trenutačno poboljšanje tonusa kože, hidratacije i sjaja**, dok terapeutsko svjetlo istovremeno potiče **dublje stanične procese za dugotrajne dobiti kože**.

Koristi se najčešće u **sinergiji s drugim estetskim tretmanima**: [mezoterapija](https://visage-react.vercel.app/usluge/mezoterapija "‌"), [beauty tretmani](https://visage-react.vercel.app/usluge/beauty-tretmani "‌") i [skin boosteri](https://visage-react.vercel.app/usluge/skin-boosteri "‌")

U **Visage studiju** koristimo  fototerapije, što osigurava **optimalne rezultate i maksimalnu sigurnost**. Svaki tretman je pažljivo planiran za postizanje željenih rezultata uz **minimalno vrijeme oporavka**.`,
  benefits: [
  ],
  image: '/images/services/dermalux/dermalux-nakon-tretmana-visage-estetski-studio.png'  ,
  heroImage: '/images/services/dermalux/dermalux-visage-estetski-studio.png',
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
      image: '/images/services/dermalux/dermalux-prednosti-visage-estetski-studio.jpg'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
      image: '/images/services/dermalux/dermalux-priprema-visage-estetski-studio.png'
    },
    { 
      id: 'tijek-tretmana', 
      label: 'Tijek tretmana', 
      icon: 'FaRegClock',
      image: '/images/services/dermalux/dermalux-tijek-zahvata-visage-estetski-studio.png'
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
      image: '/images/services/dermalux/dermalux-about-visage-estetski-studio.png'
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
    'kandidati': `LED Fototerapija je idealna za osobe koje žele:

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
    'nakon-tretmana': `Za najbolje rezultate preporuča se minimalno 10 LED Fototerapija. Fototerapije bi se radile 2 puta tjedno, a za određena stanja i na dnevnoj bazi.

Nakon fototerapije važno je:

- Koristiti zaštitu od sunca <a href="/katalog?product=31">Toskani Sun Shiel-D fluid</a>
- Koristiti preporučenu Toskani kućnu njegu za najbolje rezultate`,
    'cijena': `Cijena LED fototerapije ovisi o tipu tretmana i broju potrebnih sesija. Za optimalne rezultate preporučujemo minimalno 10 tretmana s intervalima od 2-3 puta tjedno. Za detaljne informacije o cijenama i mogućnostima plaćanja, dogovorite termin.`
  }
}; 