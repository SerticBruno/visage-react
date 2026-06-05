export interface SupplierConfig {
  /** Marka proizvoda (mora odgovarati polju marka u katalogu) */
  marka: string;
  /** Naziv dobavljača / tvrtke */
  name: string;
  /** Email adresa za narudžbe */
  email: string;
  /** Ime kontakt osobe (opcionalno, za pozdrav u mailu) */
  contactName?: string;
}

function normalizeMarka(marka: string): string {
  return marka.trim().toLowerCase();
}

export function parseSuppliersConfig(): SupplierConfig[] {
  const raw = process.env.SUPPLIERS_JSON?.trim();
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((entry): SupplierConfig | null => {
        if (!entry || typeof entry !== 'object') return null;
        const row = entry as Record<string, unknown>;
        const marka = typeof row.marka === 'string' ? row.marka.trim() : '';
        const name = typeof row.name === 'string' ? row.name.trim() : '';
        const email = typeof row.email === 'string' ? row.email.trim() : '';
        const contactName =
          typeof row.contactName === 'string' ? row.contactName.trim() : undefined;

        if (!marka || !name || !email) return null;

        return { marka, name, email, contactName: contactName || undefined };
      })
      .filter((s): s is SupplierConfig => s !== null);
  } catch {
    console.error('SUPPLIERS_JSON nije valjan JSON');
    return [];
  }
}

export function getSupplierByMarka(
  marka: string,
  suppliers: SupplierConfig[] = parseSuppliersConfig()
): SupplierConfig | null {
  const key = normalizeMarka(marka);
  return suppliers.find((s) => normalizeMarka(s.marka) === key) ?? null;
}

export function getSuppliersMap(
  suppliers: SupplierConfig[] = parseSuppliersConfig()
): Map<string, SupplierConfig> {
  return new Map(suppliers.map((s) => [normalizeMarka(s.marka), s]));
}
