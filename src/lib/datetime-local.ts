/** Format a Date (or ISO string from API) for `<input type="datetime-local">` in browser local time. */
export function toDatetimeLocalValue(input?: Date | string | null): string {
  let date: Date;

  if (!input) {
    date = new Date();
    date.setMinutes(0, 0, 0);
    date.setHours(date.getHours() + 1);
  } else if (typeof input === 'string') {
    // Already in datetime-local shape — keep as-is (from slot click after fix)
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(input)) {
      return input;
    }
    date = new Date(input);
  } else {
    date = input;
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Parse datetime-local input value and return ISO string for API/DB (UTC). */
export function fromDatetimeLocalValue(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Neispravan datum i vrijeme');
  }
  return date.toISOString();
}
