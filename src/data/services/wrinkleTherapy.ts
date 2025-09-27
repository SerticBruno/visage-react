import { Service } from './types';

export const wrinkleTherapy: Service = {
  id: 'botox',
  title: 'Botox',
  akuzativTitle: 'terapijom bora lica',
  description: 'Glatka i osvježena koža bez bora',
  longDescription: `Ako želite kožu bez vidljivih bora i linija, <strong>botox je tretman za vas</strong>!

<strong>Botox je neuromodulator</strong> koji se koristi za privremeno opuštanje mišića koji uzrokuju bore na licu. Time se smanjuje kontrakcija mišića i sprječava nastanak novih bora.

Ovaj tretman je idealan za rješavanje <strong>dinamičkih bora</strong>, poput bora na čelu, oko očiju i između obrva.

Također se koristi i za <strong>medicinska stanja</strong>, poput migrena i hiperhidroze pazuha, stopala i dlanova.

<strong>Najčešće tretirane regije lica</strong> su čelo, područje oko očiju, glabela i usta.

<strong>Uobičajeno trajanje botoxa</strong> je između 3 i 6 mjeseci nakon čega se postupno vraća mišićna aktivnost i bore ponovno postaju vidljive.

Najčešće se koristi u <strong>sinergiji s drugim estetskim tretmanima</strong>: <a href="/usluge/mezoterapija">mezoterapija</a>, <a href="/usluge/skin-boosteri">skin boosteri</a> i <a href="/usluge/dermalni-fileri">dermalni fileri</a>.`,
  benefits: [
  ],
  image: '/images/services/botox/botox-visage-estetski-studio.webp',
  heroImage: '/images/services/botox-treatment-visage-estetski-studio.webp',
  metaDescription: 'Profesionalna terapija bora lica u VISAGE studiju u Siska. Smanjite i spriječite bore uz pomoć naprednih anti-aging metoda. Prirodni i dugotrajni rezultati.',
  metaKeywords: 'terapija bora, bore lica, prevencija bora, anti-aging, estetski studio Sisak, VISAGE studio, smanjenje bora',
  tags: ['terapija-bora', 'prevencija-bora', 'anti-aging', 'nježni-tretmani', 'lifting-lica'],
  isPopular: true,
  isBestseller: true,
  isRecommended: true,
  pricingCategory: 'Botox',
  relatedServices: ['mezoterapija', 'skin-boosteri', 'dermalni-fileri'],
  steps: [
    { 
      id: 'prednosti', 
      label: 'Prednosti', 
      icon: 'FaRegFileAlt',
      image: '/images/services/botox/botox-prednosti-visage-estetski-studio.webp'
    },
    { 
      id: 'kandidati', 
      label: 'Kandidati', 
      icon: 'FaUsers',
      image: '/images/services/botox/botox-kandidati-visage-estetski-studio.webp'
    },
    { 
      id: 'priprema', 
      label: 'Priprema', 
      icon: 'FaRegEdit',
    },
    { 
      id: 'tijek-tretmana', 
      label: 'Tijek tretmana', 
      icon: 'FaRegClock',
      image: '/images/services/botox/botox-tijek-zahvata-visage-estetski-studio.webp'
    },
    { 
      id: 'oporavak', 
      label: 'Oporavak', 
      icon: 'FaRegHospital'
    },
    { 
      id: 'nakon-tretmana', 
      label: 'Nakon tretmana', 
      icon: 'FaRegFile',
      image: '/images/services/botox/botox-nakon-tretmana-visage-estetski-studio.webp'
    },
    { 
      id: 'cijena', 
      label: 'Cijena', 
      icon: 'FaHandHoldingUsd'
    }
  ],
  stepContents: {
    'prednosti': `Prednosti terapije bore lica su:

- Brzi i vidljivi rezultati
- Smanjivanje vidljivosti postojećih bora
- Prevencija pojave novih bora
- Prirodni rezultati
- Sigurna metoda
- Minimalni downtime`,
    'kandidati': `Botox je idealan za osobe koje žele:

- Smanjiti postojeće bore i fine linije
- Spriječiti pojavu novih bora
- Postići prirodan izgled
- Tretirati hiperhidrozu
- Smanjiti migrene
- Tretirati bore na području čela, očiju, usta i okoloočnog područja`,
    'priprema': `Prije terapije bora potrebno je:

1. Dogovoriti konzultacije kako bismo napravili procjenu stanja kože
2. Preporuka odgovarajućih područja koja će se tretirati
3. Preporuka broja jedinica za optimalne rezultate`,
    'tijek-tretmana': `Tretman botoxom je precizan postupak koji se provodi u nekoliko faza. Svaka faza je pažljivo planirana kako bi osigurala optimalne rezultate i maksimalnu sigurnost.

1. Priprema kože - Čišćenje kože, dezinfekcija kože i nanošenje anestetske kreme.

2. Primjena botoxa - Precizna primjena dogovorenog broja jedinica u dogovorena područja.

3. Završna njega - Nanošenje After creama na tretirana područja uz minimalan pritisak.

4. Preporuka za kućnu njegu - Preporučujemo korištenje odgovarajućih Toskani proizvoda iz Pro Age linije i korištenje kreme sa zaštitnim faktorom Toskani Sun Shiel-D SPF50+.`,
    'oporavak': `Oporavak može trajati 1 do 2 dana, a prezentira se kao:

- Modrica
- Crvenilo
- Osjetljivost`,
    'nakon-tretmana': `Za najbolje rezultate preporučuje se protokol:

Napraviti botox svakih 3 do 6 mjeseci kako bi lice što duže održalo mladenački izgled i svježinu.
Od 30.-te godine preporučuje se koristiti kao prevencija protiv prvih znakova starenja.

Nakon botoxa preporučuje se:

- Izbjegavanje trljanja tretiranog područja
- Izbjegavanje treninga isti dan
- Ne lijegati u krevet između 6 do 12h kako bi se osiguralo optimalno djelovanje
- Ne saginjati se`,
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