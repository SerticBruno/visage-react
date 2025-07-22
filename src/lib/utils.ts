export function formatDate(date: Date): string {
  const months = {
    '01': 'siječnja',
    '02': 'veljače',
    '03': 'ožujka',
    '04': 'travnja',
    '05': 'svibnja',
    '06': 'lipnja',
    '07': 'srpnja',
    '08': 'kolovoza',
    '09': 'rujna',
    '10': 'listopada',
    '11': 'studenog',
    '12': 'prosinca'
  };

  const day = date.getDate();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}. ${months[month as keyof typeof months]} ${year}.`;
}

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export function toSentenceCase(text: string): string {
  // Convert title case to sentence case
  // Keep first letter capitalized, rest lowercase
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
} 