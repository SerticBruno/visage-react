import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import { FaShieldAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Politika privatnosti | VISAGE Studio',
  description: 'Saznajte kako VISAGE Studio štiti vaše osobne podatke i kako ih koristimo u skladu s GDPR regulativom.',
  keywords: 'privatnost, GDPR, osobni podaci, VISAGE Studio, politika privatnosti',
};

const PrivacyPolicy = () => {
  return (
    <>
      <HeroSection
        title="Politika privatnosti"
        description="Vaša privatnost nam je važna. Saznajte kako štitimo i koristimo vaše osobne podatke."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-100 p-4 rounded-full">
              <FaShieldAlt size={32} className="text-slate-600" />
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Uvod</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                VISAGE Studio (dalje: "mi", "naš", "nas") posvećen je zaštiti vaše privatnosti. 
                Ova Politika privatnosti objašnjava kako prikupljamo, koristimo, čuvamo i štitimo 
                vaše osobne podatke kada koristite naše usluge ili posjećujete našu web stranicu.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Posljednje ažuriranje:</strong> {new Date().toLocaleDateString('hr-HR')}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Koje podatke prikupljamo</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Osobni podaci</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Prikupljamo sljedeće osobne podatke kada koristite naše usluge:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• Ime i prezime</li>
                  <li>• Email adresa</li>
                  <li>• Broj telefona</li>
                  <li>• Datum rođenja</li>
                  <li>• Adresa</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Tehnički podaci</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Automatski prikupljamo određene tehničke podatke kada posjećujete našu web stranicu:
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li>• IP adresa</li>
                  <li>• Tip preglednika</li>
                  <li>• Operacijski sustav</li>
                  <li>• Kolačići (cookies)</li>
                  <li>• Podaci o korištenju stranice</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Kako koristimo vaše podatke</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Vaše osobne podatke koristimo za sljedeće svrhe:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Pružanje usluga</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Koristimo vaše podatke za pružanje estetskih tretmana, zakazivanje termina, 
                    komunikaciju o vašim tretmanima i slanje potrebnih informacija.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Komunikacija</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Slanjem newslettera, obavijesti o akcijama, novim uslugama i važnim informacijama 
                    vezanim za vaše tretmane.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Poboljšanje usluga</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Analizom podataka o korištenju naših usluga kako bismo poboljšali kvalitetu 
                    i personalizirali vaše iskustvo.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">Zakonske obveze</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Ispunjavanjem zakonskih obveza, uključujući računovodstvene i porezne obveze.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Kako štitimo vaše podatke</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Implementiramo odgovarajuće sigurnosne mjere za zaštitu vaših osobnih podataka:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Enkripcija podataka</li>
                <li>• Sigurnosni protokoli</li>
                <li>• Redovite sigurnosne provjere</li>
                <li>• Ograničen pristup podacima</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Vaša prava</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                U skladu s GDPR regulativom, imate sljedeća prava:
              </p>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Pravo na pristup:</strong> Imate pravo zatražiti pristup svojim osobnim podacima</li>
                <li><strong>Pravo na ispravak:</strong> Možete zatražiti ispravak netočnih podataka</li>
                <li><strong>Pravo na brisanje:</strong> Možete zatražiti brisanje svojih podataka u određenim okolnostima</li>
                <li><strong>Pravo na ograničenje obrade:</strong> Možete zatražiti ograničenje obrade vaših podataka</li>
                <li><strong>Pravo na prenosivost:</strong> Možete zatražiti prenos vaših podataka</li>
                <li><strong>Pravo na prigovor:</strong> Možete se usprotiviti obradi vaših podataka</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Kolačići (Cookies)</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Naša web stranica koristi kolačiće za poboljšanje korisničkog iskustva. 
                Kolačići su male tekstualne datoteke koje se pohranjuju na vašem uređaju.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Nužni kolačići:</strong> Potrebni za osnovno funkcioniranje stranice</li>
                <li><strong>Analitički kolačići:</strong> Koriste se za analizu prometa i korištenja stranice</li>
                <li><strong>Marketing kolačići:</strong> Koriste se za personalizirane oglase</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Dijeljenje podataka</h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                Ne prodajemo, ne iznajmljujemo niti ne dijelimo vaše osobne podatke s trećim stranama, 
                osim u sljedećim slučajevima:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• S vašim izričitim pristankom</li>
                <li>• Kada je to potrebno za pružanje usluga (npr. pružatelji usluga)</li>
                <li>• Kada to zahtijeva zakon</li>
                <li>• Za zaštitu naših prava i sigurnosti</li>
              </ul>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Zadržavanje podataka</h2>
              <p className="text-slate-700 leading-relaxed">
                Vaše osobne podatke čuvamo samo onoliko dugo koliko je potrebno za ispunjavanje 
                svrha za koje su prikupljeni ili koliko zahtijeva zakon. Podaci o klijentima 
                obično čuvamo 10 godina nakon posljednjeg kontakta.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Kontakt</h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Za sva pitanja vezana uz ovu Politiku privatnosti ili za ostvarivanje vaših prava, 
                kontaktirajte nas:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">VISAGE Studio</h3>
                  <div className="space-y-2 text-slate-700">
                    <p>Ulica Stjepana i Antuna Radića 49</p>
                    <p>44 000, Sisak</p>
                    <p>Hrvatska</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Kontakt informacije</h3>
                  <div className="space-y-2 text-slate-700">
                    <p>Email: contact@visagestudio.hr</p>
                    <p>Telefon: 091 110 50 20</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <p className="text-sm text-slate-600">
                Ova Politika privatnosti može se povremeno ažurirati. Molimo vas da redovito 
                provjeravate ovu stranicu za najnovije informacije.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 