'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/price-utils';
import { formatDateTime } from '@/lib/admin-labels';
import { APPOINTMENT_STATUS_LABELS, APPOINTMENT_STATUS_COLORS } from '@/lib/appointments';
import AppointmentModal from '@/components/admin/AppointmentModal';

type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  source: string;
  created_at: string;
};

type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

type Appointment = {
  id: string;
  treatment_title: string;
  price_cents: number;
  duration_minutes: number;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  notes: string | null;
};

type Order = {
  id: string;
  status: string;
  total_cents: number;
  subtotal_cents: number;
  discount_cents: number;
  promo_code: string | null;
  created_at: string;
  paid_at: string | null;
};

type Stats = {
  totalAppointments: number;
  completedAppointments: number;
  totalAppointmentsCents: number;
  totalOrdersCents: number;
  totalSpentCents: number;
};

export default function AdminKlijentProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [client, setClient] = useState<Client | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [clientRes, timelineRes] = await Promise.all([
        fetch(`/api/admin/clients/${id}`),
        fetch(`/api/admin/clients/${id}/timeline`),
      ]);

      const clientData = await clientRes.json();
      if (!clientRes.ok) { router.push('/admin/klijenti'); return; }
      setClient(clientData.client);
      setEditName(clientData.client.name);
      setEditEmail(clientData.client.email ?? '');
      setEditPhone(clientData.client.phone ?? '');
      setEditNotes(clientData.client.notes ?? '');

      const timelineData = await timelineRes.json();
      setAppointments(timelineData.appointments ?? []);
      setOrders(timelineData.orders ?? []);
      setStats(timelineData.stats ?? null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function saveClient() {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          email: editEmail || null,
          phone: editPhone || null,
          notes: editNotes || null,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setClient(data.client);
        setEditing(false);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleNewAppointmentSave(formData: {
    id?: string;
    client_id: string;
    treatment_id: string;
    starts_at: string;
    duration_minutes: number;
    price_cents: number;
    status: AppointmentStatus;
    notes: string;
  }) {
    const body = {
      client_id: formData.client_id,
      treatment_id: formData.treatment_id,
      starts_at: new Date(formData.starts_at).toISOString(),
      notes: formData.notes || null,
      status: formData.status,
      price_cents_override: formData.price_cents,
    };
    const res = await fetch('/api/admin/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Greška');
    await fetchData();
    setModalOpen(false);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!client) return null;

  const upcoming = appointments.filter(
    (a) => new Date(a.starts_at) >= new Date() && !['cancelled', 'no_show'].includes(a.status)
  );
  const past = appointments.filter(
    (a) => new Date(a.starts_at) < new Date() || ['cancelled', 'no_show'].includes(a.status)
  );

  return (
    <div className="max-w-4xl">
      {/* Back */}
      <div className="mb-5">
        <Link href="/admin/klijenti" className="text-sm text-gray-500 hover:text-gray-900">
          ← Natrag na klijente
        </Link>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Ime i prezime</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Bilješke (alergije, preferencije...)</label>
              <textarea
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveClient}
                disabled={saving}
                className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                {saving ? 'Sprema se...' : 'Spremi'}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="text-sm text-gray-500 hover:text-gray-900 px-3"
              >
                Odustani
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                {client.email && (
                  <a href={`mailto:${client.email}`} className="hover:text-gray-900">{client.email}</a>
                )}
                {client.phone && (
                  <a href={`tel:${client.phone}`} className="hover:text-gray-900">{client.phone}</a>
                )}
              </div>
              {client.notes && (
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-800">
                  <span className="font-medium">Bilješke: </span>{client.notes}
                </div>
              )}
            </div>
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-gray-400 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5"
            >
              Uredi
            </button>
          </div>
        )}

        {/* Stats row */}
        {stats && (
          <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-lg font-bold text-gray-900">{stats.totalAppointments}</div>
              <div className="text-xs text-gray-400">termina ukupno</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{stats.completedAppointments}</div>
              <div className="text-xs text-gray-400">završenih tretmana</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{formatPrice(stats.totalAppointmentsCents)}</div>
              <div className="text-xs text-gray-400">potrošeno na tretmane</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{formatPrice(stats.totalSpentCents)}</div>
              <div className="text-xs text-gray-400">ukupna potrošnja</div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming appointments */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Nadolazeći termini</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700"
          >
            + Novi termin
          </button>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {upcoming.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-400 text-sm">Nema nadolazećih termina</div>
          ) : (
            upcoming.map((a) => <AppointmentRow key={a.id} appt={a} />)
          )}
        </div>
      </div>

      {/* Past appointments */}
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Povijest tretmana {past.length > 0 && <span className="text-gray-400 font-normal">({past.length})</span>}
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {past.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-400 text-sm">Nema prošlih termina</div>
          ) : (
            past.map((a) => <AppointmentRow key={a.id} appt={a} />)
          )}
        </div>
      </div>

      {/* Webshop orders */}
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Webshop narudžbe {orders.length > 0 && <span className="text-gray-400 font-normal">({orders.length})</span>}
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {orders.length === 0 ? (
            <div className="px-5 py-8 text-center text-gray-400 text-sm">Nema webshop narudžbi</div>
          ) : (
            orders.map((o) => (
              <div key={o.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0">
                <div className="text-xs text-gray-400 w-32 shrink-0">{formatDateTime(o.created_at)}</div>
                <div className="flex-1">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    #{o.id.slice(0, 8)}
                  </Link>
                </div>
                <div className="text-sm font-medium text-gray-900">{formatPrice(o.total_cents)}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  o.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                  o.status === 'paid' || o.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                  o.status === 'shipped' || o.status === 'ready_for_pickup' ? 'bg-green-100 text-green-700' :
                  o.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {o.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* New appointment modal (pre-filled with this client) */}
      {modalOpen && (
        <AppointmentModal
          initialData={{
            client_id: client.id,
            client: { id: client.id, name: client.name, email: client.email, phone: client.phone },
          }}
          onSave={handleNewAppointmentSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function AppointmentRow({ appt }: { appt: Appointment }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0">
      <div className="text-sm text-gray-500 w-40 shrink-0">
        {new Date(appt.starts_at).toLocaleDateString('hr-HR', {
          weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
        })}
        {' '}
        <span className="font-medium text-gray-900">
          {new Date(appt.starts_at).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-gray-900 text-sm">{appt.treatment_title}</div>
        {appt.notes && <div className="text-gray-400 text-xs truncate">{appt.notes}</div>}
      </div>
      <div className="text-sm text-gray-600">{formatPrice(appt.price_cents)}</div>
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${APPOINTMENT_STATUS_COLORS[appt.status]}`}>
        {APPOINTMENT_STATUS_LABELS[appt.status]}
      </span>
    </div>
  );
}
