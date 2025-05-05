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