'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type GoogleStatus = {
  connected: boolean;
  calendar_id: string | null;
  watch_expiration: string | null;
};

const GOOGLE_ERROR_MESSAGES: Record<string, string> = {
  table_missing:
    'Tablica google_calendar_connections ne postoji u bazi. Pokreni migraciju 011 u Supabase SQL Editoru.',
  no_refresh_token:
    'Google nije vratio refresh token. U Google Account → Security → Third-party access, ukloni VISAGE Studio i poveži ponovno.',
  token_exchange:
    'Token exchange nije uspio. Provjeri da GOOGLE_CALENDAR_REDIRECT_URI u .env.local točno odgovara URI-ju u Google Cloud Console.',
  missing_env: 'Nedostaju GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ili GOOGLE_CALENDAR_REDIRECT_URI u .env.local.',
  callback_failed: 'Neočekivana greška pri spremanju veze. Pogledaj terminal (npm run dev) za detalje.',
};

function PostavkeContent() {
  const searchParams = useSearchParams();
  const [googleStatus, setGoogleStatus] = useState<GoogleStatus | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageIsError, setMessageIsError] = useState(false);

  const googleConnectedParam = searchParams.get('google_connected');
  const googleErrorParam = searchParams.get('google_error');

  const loadStatus = () =>
    fetch('/api/admin/google-calendar/status')
      .then((r) => r.json())
      .then(setGoogleStatus);

  useEffect(() => {
    loadStatus();
  }, []);

  useEffect(() => {
    if (googleErrorParam) {
      const text =
        GOOGLE_ERROR_MESSAGES[googleErrorParam] ??
        `Greška pri spajanju s Googleom: ${googleErrorParam}`;
      setMessage(text);
      setMessageIsError(true);
      return;
    }

    if (googleConnectedParam) {
      loadStatus().then(() => {
        setMessage('Google Calendar uspješno spojen!');
        setMessageIsError(false);
      });
    }
  }, [googleConnectedParam, googleErrorParam]);

  async function syncNow() {
    setSyncing(true);
    try {
      const res = await fetch('/api/admin/google-calendar/sync', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error ?? 'Greška pri sinkronizaciji');
        setMessageIsError(true);
        return;
      }
      setMessage(
        `Sinkronizirano: ${data.imported} novih, ${data.updated} ažuriranih termina iz Google Calendara.`
      );
      setMessageIsError(false);
      await loadStatus();
    } catch {
      setMessage('Greška pri sinkronizaciji');
      setMessageIsError(true);
    } finally {
      setSyncing(false);
    }
  }

  async function disconnect() {
    if (!confirm('Jeste li sigurni? Termini neće biti izbrisani, samo veza s Googleom.')) return;
    setDisconnecting(true);
    await fetch('/api/admin/google-calendar/disconnect', { method: 'POST' });
    setGoogleStatus({ connected: false, calendar_id: null, watch_expiration: null });
    setMessage('Google Calendar odspojen.');
    setMessageIsError(false);
    setDisconnecting(false);
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Postavke</h1>

      {message && (
        <div className={`mb-6 rounded-lg px-4 py-3 text-sm border ${
          messageIsError
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {message}
          <button onClick={() => setMessage('')} className="ml-3 opacity-60 hover:opacity-100">×</button>
        </div>
      )}

      {googleConnectedParam && googleStatus && !googleStatus.connected && (
        <div className="mb-6 rounded-lg px-4 py-3 text-sm border bg-amber-50 border-amber-200 text-amber-800">
          Google OAuth je prošao, ali veza nije spremljena u bazu. Najvjerojatnije nije pokrenuta migracija{' '}
          <code className="font-mono text-xs">011_appointments_and_clients.sql</code> u Supabase.
        </div>
      )}

      {/* Google Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">Google Calendar</h2>
            <p className="text-sm text-gray-500 mt-1">
              Dvosmjerna sinkronizacija termina između admin dashboarda i Google Calendara.
            </p>
          </div>
          {googleStatus !== null && (
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              googleStatus.connected
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-gray-50 text-gray-500 border-gray-200'
            }`}>
              {googleStatus.connected ? 'Spojeno' : 'Nije spojeno'}
            </span>
          )}
        </div>

        {googleStatus === null && (
          <div className="mt-4 h-10 bg-gray-100 rounded animate-pulse" />
        )}

        {googleStatus !== null && (
          <div className="mt-5 space-y-4">
            {googleStatus.connected ? (
              <>
                <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600 space-y-1">
                  <div>Kalendar: <span className="font-medium">{googleStatus.calendar_id ?? 'primary'}</span></div>
                  {googleStatus.watch_expiration && (
                    <div>
                      Watch istječe: <span className="font-medium">
                        {new Date(googleStatus.watch_expiration).toLocaleDateString('hr-HR', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={syncNow}
                    disabled={syncing}
                    className="text-sm border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {syncing ? 'Sinkronizacija...' : '↻ Sinkroniziraj termine iz Googlea'}
                  </button>
                  <button
                    onClick={disconnect}
                    disabled={disconnecting}
                    className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    {disconnecting ? 'Odspajanje...' : 'Odspoji Google Calendar'}
                  </button>
                </div>
              </>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Nakon spajanja, novi termini iz admina automatski se dodaju u Google Calendar,
                  a promjene u Googleu se sinkroniziraju natrag u admin.
                </p>

                {!process.env.NEXT_PUBLIC_GOOGLE_CONFIGURED && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 mb-4">
                    <strong>Konfiguracija potrebna:</strong> Postavi{' '}
                    <code className="font-mono text-xs">GOOGLE_CLIENT_ID</code>,{' '}
                    <code className="font-mono text-xs">GOOGLE_CLIENT_SECRET</code> i{' '}
                    <code className="font-mono text-xs">GOOGLE_CALENDAR_REDIRECT_URI</code> u{' '}
                    <code className="font-mono text-xs">.env.local</code>.
                  </div>
                )}

                <a
                  href="/api/admin/google-calendar/oauth"
                  className="inline-block bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700"
                >
                  Poveži s Google Calendarom
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPostavkePage() {
  return (
    <Suspense>
      <PostavkeContent />
    </Suspense>
  );
}
