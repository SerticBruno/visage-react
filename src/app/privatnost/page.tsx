import { Metadata } from 'next';
import Link from 'next/link';
import { FaShieldAlt } from 'react-icons/fa';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { legalPageMetadata } from '@/lib/legal-metadata';
import { legalPaths, legalSeller } from '@/data/legal';
import {
  legalTableWrapClass,
  legalTableClass,
  legalTableHeadClass,
  legalTableHeaderCellClass,
  legalTableCellClass,
} from '@/components/legal/legal-styles';

export const metadata: Metadata = legalPageMetadata(
  'Politika privatnosti',
  'Politika privatnosti VISAGE Studio — GDPR, obrada osobnih podataka webshopa i usluga studija.',
  legalPaths.privacy
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Politika privatnosti"
      description="Kako prikupljamo, koristimo i štitimo vaše osobne podatke u skladu s GDPR-om."
      titleIcon={<FaShieldAlt size={48} className="text-white" />}
    >
      <h2>1. Voditelj obrade</h2>
      <p>
        Voditelj obrade osobnih podataka je {legalSeller.legalName}, sa sjedištem na adresi
        navedenoj u okviru podataka o prodavatelju. Za pitanja o privatnosti:{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>.
      </p>

      <h2>2. Koje podatke obrađujemo</h2>
      <h3>2.1. Podaci kupaca (webshop)</h3>
      <ul>
        <li>ime i prezime, adresa dostave i/ili računa;</li>
        <li>e-mail adresa i broj telefona;</li>
        <li>podaci o narudžbi (proizvodi, cijene, način dostave i plaćanja);</li>
        <li>podaci o plaćanju koje obrađuje Stripe (ne pohranjujemo pune podatke kartice);</li>
        <li>IP adresa i tehnički zapisi u logovima poslužitelja.</li>
      </ul>

      <h3>2.2. Podaci klijenata studija i kontakt obrasca</h3>
      <ul>
        <li>ime, kontakt, poruka i podaci potrebni za rezervaciju termina;</li>
        <li>medicinsko-kozmetički podaci koje dobrovoljno dostavite u svrhu tretmana (posebne kategorije samo uz zakonsku osnovu i privolu gdje je potrebno).</li>
      </ul>

      <h3>2.3. Newsletter</h3>
      <ul>
        <li>e-mail adresa i vrijeme prijave/odjave;</li>
        <li>evidencija privole za marketinške poruke.</li>
      </ul>

      <h3>2.4. Kolačići i analitika</h3>
      <p>
        Vidi <Link href={legalPaths.cookies}>Politiku kolačića</Link>. Analitički i
        marketinški kolačići aktiviraju se uz vašu privolu putem cookie bannera.
      </p>

      <h2>3. Svrhe i pravne osnove obrade</h2>
      <div className={legalTableWrapClass}>
        <table className={legalTableClass}>
          <thead className={legalTableHeadClass}>
            <tr>
              <th className={legalTableHeaderCellClass}>Svrha</th>
              <th className={legalTableHeaderCellClass}>Pravna osnova (GDPR čl. 6)</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Sklapanje i izvršenje ugovora o kupnji</td>
              <td className={legalTableCellClass}>Izvršenje ugovora</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Računovodstvo i porezne obveze</td>
              <td className={legalTableCellClass}>Zakonska obveza</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Newsletter i marketing</td>
              <td className={legalTableCellClass}>Privola (čl. 6 st. 1 t. a)</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Analitika web stranice</td>
              <td className={legalTableCellClass}>Privola ili legitimni interes*</td>
            </tr>
            <tr>
              <td className={legalTableCellClass}>Odgovor na upite i rezervacije</td>
              <td className={legalTableCellClass}>Predugovorne radnje / ugovor</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        * Za analitiku koristimo privolu putem cookie bannera gdje je to primjenjivo.
      </p>

      <h2>4. Primatelji i prijenos podataka</h2>
      <p>Podatke možemo dijeliti s pouzdanim obrađivačima:</p>
      <ul>
        <li>
          <strong>Stripe</strong> — obrada plaćanja (EU/SAD, standardni ugovorni uvjeti);
        </li>
        <li>
          <strong>Supabase</strong> — pohrana narudžbi i podataka webshopa;
        </li>
        <li>
          <strong>Vercel</strong> — hosting stranice i analitika;
        </li>
        <li>
          <strong>Google (Tag Manager / Analytics)</strong> — uz privolu, analitika prometa;
        </li>
        <li>
          prijevoznici <strong>BoxNow</strong> i <strong>GLS</strong> — dostava narudžbi;
        </li>
        <li>
          računovodstveni servis i nadležna tijela — kada to zakon zahtijeva.
        </li>
      </ul>
      <p>
        Prijenos izvan EGP-a dopušten je uz odgovarajuće jamstvo (npr. EU-US Data Privacy
        Framework, standardne ugovorne klauzule).
      </p>

      <h2>5. Rok čuvanja</h2>
      <ul>
        <li>podaci o narudžbama i računima — do isteka zakonskih rokova (npr. 11 godina za knjigovodstvenu dokumentaciju);</li>
        <li>podaci klijenata studija — prema propisima o zdravstvenoj dokumentaciji i ugovoru;</li>
        <li>newsletter — do odjave ili povlačenja privole;</li>
        <li>logovi i analitika — prema postavkama pružatelja, obično do 26 mjeseci.</li>
      </ul>

      <h2>6. Vaša prava</h2>
      <p>U skladu s GDPR-om imate pravo na:</p>
      <ul>
        <li>pristup i kopiju podataka;</li>
        <li>ispravak i dopunu;</li>
        <li>brisanje (&quot;pravo na zaborav&quot;) u zakonskim okvirima;</li>
        <li>ograničenje obrade;</li>
        <li>prenosivost podataka;</li>
        <li>prigovor obradi temeljene na legitimnom interesu;</li>
        <li>povlačenje privole bez utjecaja na zakonitost obrade prije povlačenja;</li>
        <li>podnošenje pritužbe AZOP-u (<a href="https://azop.hr" target="_blank" rel="noopener noreferrer">azop.hr</a>).</li>
      </ul>
      <p>
        Zahtjeve šaljite na <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>.
        Odgovorit ćemo u roku od jednog mjeseca.
      </p>

      <h2>7. Sigurnost</h2>
      <p>
        Primjenjujemo odgovarajuće tehničke i organizacijske mjere (HTTPS, ograničen pristup,
        sigurnosne politike dobavljača) kako bismo zaštitili osobne podatke od neovlaštenog
        pristupa, gubitka ili zlouporabe.
      </p>

      <h2>8. Maloljetnici</h2>
      <p>
        Usluge i webshop nisu namijenjeni osobama mlađim od 16 godina bez suglasnosti
        roditelja/skrbnika. Ako saznamo da smo prikupili podatke djeteta bez odgovarajuće
        suglasnosti, podatke ćemo izbrisati.
      </p>

      <h2>9. Izmjene politike</h2>
      <p>
        Politiku možemo ažurirati. O značajnim promjenama obavijestit ćemo putem stranice ili
        e-maila gdje je primjereno.
      </p>

      <h2>10. Povezani dokumenti</h2>
      <p>
        <Link href={legalPaths.cookies}>Politika kolačića</Link> ·{' '}
        <Link href={legalPaths.termsOfSale}>Uvjeti kupnje</Link> ·{' '}
        <Link href={legalPaths.seller}>Podaci o prodavatelju</Link>
      </p>
    </LegalPageLayout>
  );
}
