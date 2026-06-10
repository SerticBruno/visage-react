'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { formatPrice } from '@/lib/price-utils';
import { APPOINTMENT_STATUS_LABELS } from '@/lib/appointments';
import { toDatetimeLocalValue } from '@/lib/datetime-local';

type Treatment = {
  id: string;
  title: string;
  category: string;
  price: string;
  price_cents: number;
  duration: string | null;
  duration_minutes: number;
};

type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
};

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

type AppointmentFormData = {
  id?: string;
  client_id: string;
  client?: Client;
  treatment_id: string;
  starts_at: string; // local datetime-local string
  duration_minutes: number;
  price_cents: number;
  status: AppointmentStatus;
  notes: string;
};

type Props = {
  initialData?: Partial<AppointmentFormData>;
  onSave: (data: AppointmentFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  onClose: () => void;
};

export default function AppointmentModal({ initialData, onSave, onDelete, onClose }: Props) {
  const isEdit = Boolean(initialData?.id);

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [clientSearch, setClientSearch] = useState(initialData?.client?.name ?? '');
  const [clientResults, setClientResults] = useState<Client[]>([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const clientSearchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [form, setForm] = useState<AppointmentFormData>({
    id: initialData?.id,
    client_id: initialData?.client_id ?? '',
    client: initialData?.client,
    treatment_id: initialData?.treatment_id ?? '',
    starts_at: toDatetimeLocalValue(initialData?.starts_at),
    duration_minutes: initialData?.duration_minutes ?? 60,
    price_cents: initialData?.price_cents ?? 0,
    status: initialData?.status ?? 'scheduled',
    notes: initialData?.notes ?? '',
  });

  useEffect(() => {
    fetch('/api/admin/treatments')
      .then((r) => r.json())
      .then((d) => {
        setTreatments(d.treatments ?? []);
        setCategories(d.categories ?? []);
      });
  }, []);

  const searchClients = useCallback((q: string) => {
    if (clientSearchRef.current) clearTimeout(clientSearchRef.current);
    if (!q.trim()) { setClientResults([]); return; }
    clientSearchRef.current = setTimeout(async () => {
      const res = await fetch(`/api/admin/clients?q=${encodeURIComponent(q)}&limit=8`);
      const data = await res.json();
      setClientResults(data.clients ?? []);
      setShowClientDropdown(true);
    }, 250);
  }, []);

  function selectTreatment(id: string) {
    const t = treatments.find((t) => t.id === id);
    if (!t) return;
    setForm((f) => ({
      ...f,
      treatment_id: id,
      duration_minutes: t.duration_minutes,
      price_cents: t.price_cents,
    }));
  }

  function selectClient(client: Client) {
    setForm((f) => ({ ...f, client_id: client.id, client }));
    setClientSearch(client.name);
    setShowClientDropdown(false);
    setClientResults([]);
  }

  async function createNewClient() {
    if (!newClientName.trim()) return;
    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newClientName.trim(),
          email: newClientEmail.trim() || null,
          phone: newClientPhone.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      selectClient(data.client);
      setShowNewClientForm(false);
      setNewClientName(''); setNewClientEmail(''); setNewClientPhone('');
    } catch {
      setError('Greška pri kreiranju klijenta');
    }
  }

  async function handleSave() {
    setError('');
    if (!form.client_id) { setError('Odaberite klijenta'); return; }
    if (!form.treatment_id) { setError('Odaberite tretman'); return; }
    if (!form.starts_at) { setError('Unesite datum i vrijeme'); return; }
    setSaving(true);
    try {
      await onSave(form);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri spremanju');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!onDelete) return;
    if (!confirm('Jeste li sigurni da želite obrisati ovaj termin?')) return;
    setDeleting(true);
    try {
      await onDelete();
    } catch {
      setError('Greška pri brisanju');
      setDeleting(false);
    }
  }

  const selectedTreatment = treatments.find((t) => t.id === form.treatment_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEdit ? 'Uredi termin' : 'Novi termin'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Client selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Klijent *</label>
            <div className="relative">
              <input
                type="text"
                value={clientSearch}
                onChange={(e) => {
                  setClientSearch(e.target.value);
                  if (!e.target.value) setForm((f) => ({ ...f, client_id: '', client: undefined }));
                  searchClients(e.target.value);
                }}
                onFocus={() => clientSearch && setShowClientDropdown(true)}
                placeholder="Pretraži po imenu, emailu ili telefonu..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              {showClientDropdown && clientResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {clientResults.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => selectClient(c)}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-0"
                    >
                      <div className="font-medium text-gray-900">{c.name}</div>
                      {(c.email || c.phone) && (
                        <div className="text-gray-400 text-xs">{c.email ?? c.phone}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {form.client_id && form.client && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <span className="bg-gray-100 rounded px-2 py-0.5 font-medium">{form.client.name}</span>
                {form.client.phone && <span className="text-gray-400">{form.client.phone}</span>}
                <button
                  onClick={() => { setForm((f) => ({ ...f, client_id: '', client: undefined })); setClientSearch(''); }}
                  className="text-gray-400 hover:text-red-500 text-xs ml-auto"
                >
                  ×
                </button>
              </div>
            )}

            {!showNewClientForm ? (
              <button
                onClick={() => setShowNewClientForm(true)}
                className="mt-2 text-sm text-gray-500 hover:text-gray-800 underline"
              >
                + Novi klijent
              </button>
            ) : (
              <div className="mt-3 bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
                <p className="text-sm font-medium text-gray-700">Novi klijent</p>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="Ime i prezime *"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="email"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <input
                  type="tel"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <div className="flex gap-2">
                  <button
                    onClick={createNewClient}
                    className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Dodaj
                  </button>
                  <button
                    onClick={() => setShowNewClientForm(false)}
                    className="text-sm text-gray-500 hover:text-gray-800 px-2"
                  >
                    Odustani
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Treatment selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tretman *</label>
            <select
              value={form.treatment_id}
              onChange={(e) => selectTreatment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
            >
              <option value="">Odaberi tretman...</option>
              {categories.map((cat) => {
                const catTreatments = treatments.filter((t) => t.category === cat);
                if (catTreatments.length === 0) return null;
                return (
                  <optgroup key={cat} label={cat}>
                    {catTreatments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} — {t.price}{t.duration ? ` (${t.duration})` : ''}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          {/* Date & time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Datum i vrijeme *</label>
              <input
                type="datetime-local"
                value={form.starts_at}
                onChange={(e) => setForm((f) => ({ ...f, starts_at: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trajanje (min)</label>
              <input
                type="number"
                value={form.duration_minutes}
                onChange={(e) => setForm((f) => ({ ...f, duration_minutes: parseInt(e.target.value, 10) || 60 }))}
                min={5}
                step={5}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          {/* Price & status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cijena</label>
              <div className="relative">
                <input
                  type="number"
                  value={form.price_cents / 100}
                  onChange={(e) => setForm((f) => ({ ...f, price_cents: Math.round(parseFloat(e.target.value || '0') * 100) }))}
                  step={0.5}
                  min={0}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">EUR</span>
              </div>
              {selectedTreatment && (
                <p className="text-xs text-gray-400 mt-1">
                  Cjenik: {selectedTreatment.price}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AppointmentStatus }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
              >
                {Object.entries(APPOINTMENT_STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Napomene</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              placeholder="Interne bilješke (neće biti vidljive klijentu)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
            />
          </div>

          {/* Summary */}
          {form.client_id && form.treatment_id && (
            <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600 border border-gray-200">
              <span className="font-medium">{form.client?.name}</span>
              {' · '}
              <span>{selectedTreatment?.title}</span>
              {' · '}
              <span className="font-medium">{formatPrice(form.price_cents)}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div>
            {isEdit && onDelete && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                {deleting ? 'Brisanje...' : 'Obriši termin'}
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg"
            >
              Odustani
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              {saving ? 'Spremanje...' : isEdit ? 'Spremi promjene' : 'Dodaj termin'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
