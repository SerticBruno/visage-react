import { Service } from './types';

export const mesotherapy: Service = {
  id: 'mezoterapija',
  title: 'Mezoterapija',
  description: 'Dubinska hidratacija i revitalizacija kože',
  longDescription: 'Mezoterapija je napredni tretman koji kombinira mikroinjekcije s koktelom aktivnih sastojaka za dubinsku hidrataciju i revitalizaciju kože. Ovaj tretman je idealan za sve tipove kože i pruža vidljive rezultate već nakon prvog tretmana.',
  benefits: [
    'Dubinska hidratacija kože',
    'Poboljšanje tonusa i teksture',
    'Smanjenje finih linija',
    'Poticanje proizvodnje kolagena',
    'Ujednačavanje tena',
    'Prirodan i dugotrajan rezultat'
  ],
  image: '/images/services/Mesoterapia-transdermica-facial.webp',
  heroImage: '/images/services/botox-face-girl.webp',
  metaDescription: 'Profesionalna mezoterapija u VISAGE studiju u Siska. Dubinska hidratacija i revitalizacija kože uz pomoć mikroinjekcija.',
  metaKeywords: 'mezoterapija, hidratacija kože, mikroinjekcije, estetski studio Sisak, VISAGE studio',
  steps: [
    { id: 'opis-zahvata', label: 'Opis zahvata', icon: 'FaRegFileAlt' },
    { id: 'kandidati', label: 'Kandidati', icon: 'FaUsers' },
    { id: 'priprema', label: 'Priprema', icon: 'FaRegEdit' },
    { id: 'tijek-zahvata', label: 'Tijek zahvata', icon: 'FaRegClock' },
    { id: 'oporavak', label: 'Oporavak', icon: 'FaRegHospital' },
    { id: 'mjere-opreza', label: 'Mjere opreza', icon: 'FaRegFile' },
    { id: 'cijena', label: 'Cijena', icon: 'FaHandHoldingUsd' }
  ],
  stepContents: {
    'opis-zahvata': 'Mezoterapija je minimalno invazivni tretman koji uključuje primjenu mikroinjekcija s koktelom aktivnih sastojaka direktno u srednji sloj kože. Ovo omogućuje optimalnu apsorpciju i učinkovitost aktivnih sastojaka.',
    'kandidati': 'Mezoterapija je pogodna za:\n- Dehidriranu kožu\n- Kožu s finim linijama\n- Kožu koja izgleda umorno\n- Kožu koja treba revitalizaciju\n- Sve tipove kože',
    'priprema': 'Prije tretmana:\n- Izbjegavati sunčanje 1 tjedan prije\n- Doći s očišćenom kožom\n- Konzultirati se s terapeutom o povijesti kože\n- Izbjegavati alkohol 24h prije',
    'tijek-zahvata': 'Tretman uključuje:\n1. Očišćavanje kože\n2. Primjena anestetičke kreme\n3. Primjena mikroinjekcija\n4. Primjena maski za smirenje\n5. Primjena zaštitnih proizvoda',
    'oporavak': 'Nakon tretmana:\n- Blago crvenilo koje nestaje u roku od 24h\n- Moguća osjetljivost kože\n- Potrebno je izbjegavati sunčanje\n- Pratiti upute terapeuta za njegu',
    'mjere-opreza': 'Važne mjere opreza:\n- Koristiti SPF 50+ svaki dan\n- Izbjegavati sunčanje 1 tjedan\n- Ne koristiti agresivne proizvode\n- Pratiti upute terapeuta za njegu',
    'cijena': 'Cijena tretmana ovisi o:\n- Tipu koktela\n- Području koje se tretira\n- Broju tretmana\n\nKontaktirajte nas za detaljnu ponudu.'
  }
}; 