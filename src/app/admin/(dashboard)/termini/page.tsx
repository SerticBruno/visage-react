'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, dateFnsLocalizer, SlotInfo, View, ViewsProps } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths, startOfDay } from 'date-fns';
import { hr } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@/components/admin/admin-calendar.css';
import AppointmentModal from '@/components/admin/AppointmentModal';
import RollingWeekView, { ROLLING_WEEK_VIEW } from '@/components/admin/RollingWeekView';
import { APPOINTMENT_EVENT_COLORS, APPOINTMENT_STATUS_LABELS, APPOINTMENT_STATUS_COLORS } from '@/lib/appointments';
import { formatPrice } from '@/lib/price-utils';
import Link from 'next/link';

const calendarViews = { [ROLLING_WEEK_VIEW]: RollingWeekView };

const WORKDAY_START = new Date(1970, 0, 1, 7, 0, 0);
const WORKDAY_END = new Date(1970, 0, 1, 21, 0, 0);

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales: { hr },
});

type Client = { id: string; name: string; email: string | null; phone: string | null };
type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

type Appointment = {
  id: string;
  client_id: string;
  clients: Client;
  treatment_id: string;
  treatment_title: string;
  price_cents: number;
  duration_minutes: number;
  starts_at: string;
  ends_at: string;
  status: AppointmentStatus;
  notes: string | null;
  google_event_id: string | null;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: Appointment;
};

type Stats = { today: number; thisWeek: number; noShowThisMonth: number };

function toLocalDatetimeValue(isoString: string): string {
  return new Date(isoString).toISOString().slice(0, 16);
}

function toISOFromLocal(localDt: string): string {
  return new Date(localDt).toISOString();
}

export default function AdminTerminiPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, noShowThisMonth: 0 });
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [view] = useState<View>(ROLLING_WEEK_VIEW as View);
  const [currentDate, setCurrentDate] = useState(() => startOfDay(new Date()));
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [googleConnected, setGoogleConnected] = useState<boolean | null>(null);
  const [syncing, setSyncing] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [prefillStartsAt, setPrefillStartsAt] = useState<string | undefined>();

  const loadAppointments = useCallback(async () => {
    const params = new URLSearchParams();
    const from = subMonths(currentDate, 1);
    const to = addMonths(currentDate, 2);
    params.set('from', from.toISOString());
    params.set('to', to.toISOString());
    if (statusFilter) params.set('status', statusFilter);

    const res = await fetch(`/api/admin/appointments?${params}`);
    const data = await res.json();
    setAppointments(data.appointments ?? []);
  }, [currentDate, statusFilter]);

  const syncGoogleInBackground = useCallback(async () => {
    try {
      const statusRes = await fetch('/api/admin/google-calendar/status');
      const status = await statusRes.json();
      const connected = status.connected ?? false;
      setGoogleConnected(connected);

      if (!connected) return;

      setSyncing(true);
      await fetch('/api/admin/google-calendar/sync', { method: 'POST' });
      await loadAppointments();
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  }, [loadAppointments]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/appointments/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Initial load: appointments first, Google sync in background
  useEffect(() => {
    let cancelled = false;

    async function init() {
      setInitialLoading(true);
      try {
        await Promise.all([loadAppointments(), fetchStats()]);
        if (!cancelled) setInitialLoading(false);
        if (!cancelled) syncGoogleInBackground();
      } catch (e) {
        console.error(e);
        if (!cancelled) setInitialLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- mount only

  const skipFilterReload = useRef(true);

  // Reload when date range or filter changes (skip initial mount)
  useEffect(() => {
    if (initialLoading) return;
    if (skipFilterReload.current) {
      skipFilterReload.current = false;
      return;
    }

    let cancelled = false;
    async function reload() {
      setRefreshing(true);
      try {
        await loadAppointments();
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setRefreshing(false);
      }
    }

    reload();
    return () => { cancelled = true; };
  }, [currentDate, statusFilter, initialLoading, loadAppointments]);

  async function handleManualSync() {
    setSyncing(true);
    try {
      await fetch('/api/admin/google-calendar/sync', { method: 'POST' });
      await loadAppointments();
      await fetchStats();
    } catch (e) {
      console.error(e);
    } finally {
      setSyncing(false);
    }
  }

  async function refreshAfterMutation() {
    await Promise.all([loadAppointments(), fetchStats()]);
  }

  const events: CalendarEvent[] = useMemo(
    () =>
      appointments.map((a) => ({
        id: a.id,
        title: `${a.treatment_title} — ${a.clients?.name ?? ''}`,
        start: new Date(a.starts_at),
        end: new Date(a.ends_at),
        resource: a,
      })),
    [appointments]
  );

  function eventStyleGetter(event: CalendarEvent) {
    const color = APPOINTMENT_EVENT_COLORS[event.resource.status] ?? '#6b7280';
    return {
      style: {
        backgroundColor: color,
        borderColor: color,
        color: '#fff',
        borderRadius: '6px',
        fontSize: '11px',
        padding: '2px 4px',
      },
    };
  }

  function handleSelectSlot(slot: SlotInfo) {
    setPrefillStartsAt(new Date(slot.start).toISOString().slice(0, 16));
    setEditingAppointment(null);
    setModalOpen(true);
  }

  function handleSelectEvent(event: CalendarEvent) {
    setEditingAppointment(event.resource);
    setPrefillStartsAt(undefined);
    setModalOpen(true);
  }

  async function handleSave(formData: {
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
      starts_at: toISOFromLocal(formData.starts_at),
      notes: formData.notes || null,
      status: formData.status,
      price_cents_override: formData.price_cents,
    };

    const isEdit = Boolean(formData.id);
    const url = isEdit
      ? `/api/admin/appointments/${formData.id}`
      : '/api/admin/appointments';
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Greška');

    await refreshAfterMutation();
    setModalOpen(false);
  }

  async function handleDelete() {
    if (!editingAppointment) return;
    const res = await fetch(`/api/admin/appointments/${editingAppointment.id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Greška pri brisanju');
    await refreshAfterMutation();
    setModalOpen(false);
  }

  const modalInitialData = editingAppointment
    ? {
        id: editingAppointment.id,
        client_id: editingAppointment.client_id,
        client: editingAppointment.clients,
        treatment_id: editingAppointment.treatment_id,
        starts_at: toLocalDatetimeValue(editingAppointment.starts_at),
        duration_minutes: editingAppointment.duration_minutes,
        price_cents: editingAppointment.price_cents,
        status: editingAppointment.status,
        notes: editingAppointment.notes ?? '',
      }
    : prefillStartsAt
    ? { starts_at: prefillStartsAt }
    : undefined;

  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.today}</div>
          <div className="text-sm text-gray-500 mt-1">termina danas</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{stats.thisWeek}</div>
          <div className="text-sm text-gray-500 mt-1">termina ovaj tjedan</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-500">{stats.noShowThisMonth}</div>
          <div className="text-sm text-gray-500 mt-1">no-show ovaj mjesec</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <button
          onClick={() => { setEditingAppointment(null); setPrefillStartsAt(undefined); setModalOpen(true); }}
          className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          + Novi termin
        </button>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          <option value="">Svi statusi</option>
          {Object.entries(APPOINTMENT_STATUS_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-2">
          {googleConnected && (
            <button
              onClick={handleManualSync}
              disabled={syncing}
              className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
            >
              {syncing ? 'Sinkronizacija...' : '↻ Sinkroniziraj Google'}
            </button>
          )}
          {googleConnected !== null && (
            <span className={`text-xs px-2 py-1 rounded-full border ${
              googleConnected
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-gray-50 text-gray-500 border-gray-200'
            }`}>
              {googleConnected ? '✓ Google Calendar' : 'Google Calendar nije spojen'}
            </span>
          )}
          <Link
            href="/admin/klijenti"
            className="text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-2"
          >
            Klijenti
          </Link>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden relative">
        {(initialLoading || refreshing || syncing) && (
          <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-gray-100 overflow-hidden">
            <div className="h-full bg-gray-900 animate-pulse w-1/3" />
          </div>
        )}
        <div style={{ height: 720 }} className="p-2 visage-admin-calendar">
          {initialLoading ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-400">
              Učitavanje termina...
            </div>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              views={calendarViews as ViewsProps<CalendarEvent, object>}
              view={view}
              date={currentDate}
              onNavigate={setCurrentDate}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventStyleGetter}
              culture="hr"
              formats={{
                dayFormat: (d: Date) =>
                  d.toLocaleDateString('hr-HR', { weekday: 'short', day: 'numeric' }),
                dayHeaderFormat: (d: Date) =>
                  d.toLocaleDateString('hr-HR', { weekday: 'short', day: 'numeric', month: 'numeric' }),
              }}
              messages={{
                today: 'Danas',
                previous: '←',
                next: '→',
                noEventsInRange: 'Nema termina u odabranom periodu',
                showMore: (count) => `+${count} više`,
              }}
              min={WORKDAY_START}
              max={WORKDAY_END}
              step={30}
              timeslots={2}
              components={{
                event: ({ event }) => (
                  <div className="truncate leading-tight">
                    <span className="font-medium">{event.resource.treatment_title}</span>
                    <span className="opacity-80"> · {event.resource.clients?.name}</span>
                  </div>
                ),
              }}
            />
          )}
        </div>
      </div>

      {/* Upcoming list below calendar */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Nadolazeći termini</h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {appointments
            .filter((a) => new Date(a.starts_at) >= new Date() && !['cancelled', 'no_show'].includes(a.status))
            .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
            .slice(0, 10)
            .map((a) => (
              <div
                key={a.id}
                onClick={() => { setEditingAppointment(a); setModalOpen(true); }}
                className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
              >
                <div className="text-sm text-gray-500 w-32 shrink-0">
                  {new Date(a.starts_at).toLocaleDateString('hr-HR', { weekday: 'short', day: 'numeric', month: 'short' })}
                  {' '}
                  <span className="font-medium text-gray-900">
                    {new Date(a.starts_at).toLocaleTimeString('hr-HR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{a.treatment_title}</div>
                  <div className="text-gray-400 text-xs">{a.clients?.name}</div>
                </div>
                <div className="text-sm text-gray-600">{formatPrice(a.price_cents)}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${APPOINTMENT_STATUS_COLORS[a.status]}`}>
                  {APPOINTMENT_STATUS_LABELS[a.status]}
                </span>
              </div>
            ))}
          {appointments.filter((a) => new Date(a.starts_at) >= new Date() && !['cancelled', 'no_show'].includes(a.status)).length === 0 && (
            <div className="px-5 py-8 text-center text-gray-400 text-sm">Nema nadolazećih termina</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <AppointmentModal
          initialData={modalInitialData}
          onSave={handleSave}
          onDelete={editingAppointment ? handleDelete : undefined}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
