import { Metadata } from 'next';
import { FaStore } from 'react-icons/fa';
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { legalPageMetadata } from '@/lib/legal-metadata';
import { legalPaths, legalSeller, formatSellerAddress } from '@/data/legal';
import { legalPanelClass } from '@/components/legal/legal-styles';
import Link from 'next/link';

export const metadata: Metadata = legalPageMetadata(
  'Podaci o prodavatelju',
  'Identifikacijski podaci prodavatelja VISAGE Studio webshopa u skladu sa zakonom o zaštiti potrošača.',
  legalPaths.seller
);

export default function SellerInfoPage() {
  return (
    <LegalPageLayout
      title="Podaci o prodavatelju"
      description="Identifikacijski podaci trgovca s kojim sklapate ugovor na daljinu putem webshopa."
      titleIcon={<FaStore size={48} className="text-white" />}
      showSellerBox={false}
    >
      <h2>Prodavatelj</h2>
      <p>
        U skladu s odredbama Zakona o zaštiti potrošača i propisa o poslovanju na daljinu, na
        webshopu <strong>{legalSeller.url}</strong> jasno objavljujemo sljedeće podatke o
        prodavatelju:
      </p>

      <dl className={`${legalPanelClass} grid gap-4 md:gap-5 text-slate-700`}>
        <div>
          <dt className="font-semibold text-slate-900">Trgovački naziv</dt>
          <dd>{legalSeller.tradeName}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Pravni oblik / puni naziv</dt>
          <dd>{legalSeller.legalName}</dd>
        </div>
        {legalSeller.oib && (
          <div>
            <dt className="font-semibold text-slate-900">OIB</dt>
            <dd>{legalSeller.oib}</dd>
          </div>
        )}
        {legalSeller.mbs && (
          <div>
            <dt className="font-semibold text-slate-900">MBS (matični broj subjekta)</dt>
            <dd>{legalSeller.mbs}</dd>
          </div>
        )}
        {legalSeller.court && (
          <div>
            <dt className="font-semibold text-slate-900">Sud registra</dt>
            <dd>{legalSeller.court}</dd>
          </div>
        )}
        {legalSeller.responsiblePerson && (
          <div>
            <dt className="font-semibold text-slate-900">Odgovorna osoba</dt>
            <dd>{legalSeller.responsiblePerson}</dd>
          </div>
        )}
        <div>
          <dt className="font-semibold text-slate-900">Sjedište / adresa</dt>
          <dd>{formatSellerAddress()}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">E-mail</dt>
          <dd>
            <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Telefon</dt>
          <dd>
            <a href={`tel:${legalSeller.phone}`}>{legalSeller.phoneDisplay}</a>
          </dd>
        </div>
      </dl>

      <h2>Predmet poslovanja</h2>
      <p>
        Prodaja kozmetičkih i srodnih proizvoda putem internetskog kataloga, uz pružanje
        estetskih i kozmetičkih usluga u studiju prema zasebnom dogovoru i cjeniku usluga.
      </p>

      <h2>Nadzorno tijelo</h2>
      <p>
        Za zaštitu potrošača nadležno je{' '}
        <a
          href="https://mingo.gov.hr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ministarstvo gospodarstva i održivog razvoja
        </a>
        . Za pitanja osobnih podataka nadležan je{' '}
        <a href="https://azop.hr/" target="_blank" rel="noopener noreferrer">
          Agencija za zaštitu osobnih podataka (AZOP)
        </a>
        .
      </p>

      <h2>Rješavanje sporova</h2>
      <p>
        Potrošač može podnijeti pritužbu putem e-maila{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>. Za izvansudsko
        rješavanje potrošačkih sporova nadležno je tijelo za alternativno rješavanje sporova
        utvrđeno važećim propisima Republike Hrvatske.
      </p>

      <p>
        Detaljnije uvjete kupnje, dostave i povrata potražite u dokumentima navedenim u podnožju
        stranice ili na stranici{' '}
        <Link href={legalPaths.termsOfSale}>Uvjeti kupnje</Link>.
      </p>
    </LegalPageLayout>
  );
}
