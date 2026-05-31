import { Metadata } from 'next';
import Link from 'next/link';
import { FaCookieBite } from 'react-icons/fa';
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
  'Politika kolačića',
  'Kako VISAGE Studio koristi kolačiće, Google Tag Manager i analitiku te kako upravljati privolama.',
  legalPaths.cookies
);

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Politika kolačića"
      description="Informacije o vrstama kolačića, svrhama obrade i načinu upravljanja privolama."
      titleIcon={<FaCookieBite size={48} className="text-white" />}
    >
      <h2>1. Što su kolačići</h2>
      <p>
        Kolačići (cookies) su male tekstualne datoteke koje se pohranjuju na vaš uređaj kada
        posjećujete web stranicu. Pomažu nam osigurati rad stranice, pamćenje postavki i —
        uz vašu privolu — analizu prometa.
      </p>

      <h2>2. Tko postavlja kolačiće</h2>
      <p>
        Kolačiće mogu postavljati {legalSeller.legalName} (prvostrani kolačići) te pouzdani
        pružatelji usluga (treće strane), npr. za plaćanje, analitiku ili oglašavanje, samo u
        opsegu dopuštenom vašom privolom.
      </p>

      <h2>3. Kategorije kolačića</h2>

      <h3>3.1. Nužni kolačići</h3>
      <p>
        Potrebni za osnovno funkcioniranje stranice (npr. košarica, sigurnost, sesija
        administratora). Ne zahtijevaju privolu jer su nužni za pružanje usluge koju ste
        zatražili.
      </p>

      <h3>3.2. Funkcionalni kolačići</h3>
      <p>
        Omogućuju pamćenje vaših izbora (npr. jezik, postavke sučelja). Aktiviraju se uz vašu
        privolu ili kada su nužni za traženu funkcionalnost.
      </p>

      <h3>3.3. Analitički kolačići</h3>
      <p>
        Pomažu nam razumjeti kako se stranica koristi (broj posjeta, popularne stranice).
        Koristimo Google Tag Manager (GTM) i, uz privolu, povezane alate analitike. Podaci se
        obrađuju u agregiranom obliku gdje je to moguće.
      </p>

      <h3>3.4. Marketinški kolačići</h3>
      <p>
        Služe za personalizirano oglašavanje i mjerenje učinkovitosti kampanja. Aktiviraju se
        samo ako odaberete &quot;Prihvati sve&quot; u banneru o kolačićima.
      </p>

      <h2>4. Pregled korištenih tehnologija</h2>
      <div className={legalTableWrapClass}>
        <table className={legalTableClass}>
          <thead className={legalTableHeadClass}>
            <tr>
              <th className={legalTableHeaderCellClass}>Naziv / pružatelj</th>
              <th className={legalTableHeaderCellClass}>Svrha</th>
              <th className={legalTableHeaderCellClass}>Kategorija</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>cookie-consent (lokalno)</td>
              <td className={legalTableCellClass}>Pamćenje vašeg izbora o kolačićima</td>
              <td className={legalTableCellClass}>Nužni</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Košarica / sesija</td>
              <td className={legalTableCellClass}>Rad webshopa i naplate</td>
              <td className={legalTableCellClass}>Nužni</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Stripe</td>
              <td className={legalTableCellClass}>Sigurno online plaćanje</td>
              <td className={legalTableCellClass}>Nužni</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className={legalTableCellClass}>Google Tag Manager</td>
              <td className={legalTableCellClass}>Upravljanje oznakama i analitikom</td>
              <td className={legalTableCellClass}>Analitički / marketinški*</td>
            </tr>
            <tr>
              <td className={legalTableCellClass}>Vercel Analytics</td>
              <td className={legalTableCellClass}>Agregirana analitika posjeta</td>
              <td className={legalTableCellClass}>Analitički*</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        * Aktivno samo uz privolu za analitičke/marketinške kolačiće, osim gdje je obrada
        nužna i ne zahtijeva privolu prema zakonu.
      </p>

      <h2>5. Upravljanje privolom</h2>
      <p>
        Pri prvom posjetu prikazujemo banner u kojem možete odabrati &quot;Samo nužni&quot; ili
        &quot;Prihvati sve&quot;. Svoj izbor možete promijeniti brisanjem kolačića u
        pregledniku i ponovnim učitavanjem stranice ili kontaktiranjem nas na{' '}
        <a href={`mailto:${legalSeller.email}`}>{legalSeller.email}</a>.
      </p>
      <p>
        Većina preglednika omogućuje blokiranje ili brisanje kolačića u postavkama. Ako
        onemogućite nužne kolačiće, neke funkcije webshopa možda neće raditi ispravno.
      </p>

      <h2>6. Osobni podaci</h2>
      <p>
        Podaci prikupljeni putem kolačića mogu predstavljati osobne podatke. Način obrade,
        pravna osnova i vaša prava opisani su u{' '}
        <Link href={legalPaths.privacy}>Politici privatnosti</Link>.
      </p>

      <h2>7. Izmjene</h2>
      <p>
        Politiku kolačića možemo povremeno ažurirati. Važeća verzija uvijek je objavljena na
        ovoj stranici s datumom posljednjeg ažuriranja.
      </p>
    </LegalPageLayout>
  );
}
