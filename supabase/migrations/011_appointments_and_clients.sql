-- Clients table (CRM entity, separate from order aggregation)
CREATE TABLE IF NOT EXISTS clients (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  email      TEXT,
  phone      TEXT,
  notes      TEXT,
  -- source: manual | order_import | contact_form
  source     TEXT NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lowercase email uniqueness (nulls allowed — some clients only have phone)
CREATE UNIQUE INDEX IF NOT EXISTS idx_clients_email_unique
  ON clients (LOWER(email))
  WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_clients_name ON clients (name);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  -- Snapshot of treatment data from pricing.ts at time of booking
  treatment_id      TEXT NOT NULL,
  treatment_title   TEXT NOT NULL,
  price_cents       INTEGER NOT NULL DEFAULT 0,
  duration_minutes  INTEGER NOT NULL DEFAULT 60,
  -- Scheduling
  starts_at         TIMESTAMPTZ NOT NULL,
  ends_at           TIMESTAMPTZ NOT NULL,
  -- status: scheduled | confirmed | completed | cancelled | no_show
  status            TEXT NOT NULL DEFAULT 'scheduled',
  notes             TEXT,
  -- Google Calendar sync
  google_event_id   TEXT UNIQUE,
  google_calendar_id TEXT,
  last_synced_at    TIMESTAMPTZ,
  -- sync_source: admin | google
  sync_source       TEXT DEFAULT 'admin',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_starts_at  ON appointments (starts_at);
CREATE INDEX IF NOT EXISTS idx_appointments_client_id  ON appointments (client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status     ON appointments (status);

-- Prevent overlapping appointments for the single resource
-- (app-level validation also exists, but this is the DB safety net)
CREATE OR REPLACE FUNCTION check_appointment_overlap()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM appointments
    WHERE id <> COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
      AND status NOT IN ('cancelled', 'no_show')
      AND starts_at < NEW.ends_at
      AND ends_at   > NEW.starts_at
  ) THEN
    RAISE EXCEPTION 'Appointment overlaps with an existing appointment';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_appointment_overlap
  BEFORE INSERT OR UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION check_appointment_overlap();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Google Calendar connection (one row for the whole salon)
CREATE TABLE IF NOT EXISTS google_calendar_connections (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  calendar_id         TEXT NOT NULL DEFAULT 'primary',
  refresh_token       TEXT NOT NULL,
  access_token        TEXT,
  token_expiry        TIMESTAMPTZ,
  -- Push notification watch
  watch_channel_id    TEXT,
  watch_resource_id   TEXT,
  watch_expiration    TIMESTAMPTZ,
  -- Incremental sync
  sync_token          TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE TRIGGER trg_google_conn_updated_at
  BEFORE UPDATE ON google_calendar_connections
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
