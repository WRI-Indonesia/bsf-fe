export function formatDateRange(startDate?: string | null, endDate?: string | null): string {
  if (!startDate || !endDate) {
    return '';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return '';
  }

  const dayStart = start.toLocaleDateString('en-GB', { day: '2-digit' });
  const monthStart = start.toLocaleDateString('en-GB', { month: 'long' });
  const yearStart = start.getFullYear();

  const dayEnd = end.toLocaleDateString('en-GB', { day: '2-digit' });
  const monthEnd = end.toLocaleDateString('en-GB', { month: 'long' });
  const yearEnd = end.getFullYear();

  if (start.toDateString() === end.toDateString()) {
    return `${dayStart} ${monthStart} ${yearStart}`;
  }

  if (monthStart === monthEnd && yearStart === yearEnd) {
    return `${dayStart}-${dayEnd} ${monthStart} ${yearStart}`;
  }

  return `${dayStart} ${monthStart} - ${dayEnd} ${monthEnd} ${yearEnd}`;
}

export function formatParticipants(count?: string | number | null): string {
  if (count === null || count === undefined || count === '') {
    return '';
  }

  const num = typeof count === 'string' ? parseInt(count, 10) : count;

  if (isNaN(num)) {
    return String(count);
  }

  if (num <= 10) {
    return String(num);
  }

  if (num < 100) {
    const rounded = Math.floor(num / 10) * 10;
    return `${rounded}+`;
  }

  if (num < 1000) {
    const rounded = Math.floor(num / 100) * 100;
    return `${rounded}+`;
  }

  const rounded = Math.floor(num / 1000) * 1000;
  return `${rounded}+`;
}

export function getMediaUrl(image: unknown, fallback: string = '/events_1.png'): string {
  if (image && typeof image === 'object' && 'filename' in (image as Record<string, unknown>)) {
    return `/api/media/file/${(image as { filename: string }).filename}`;
  }
  return fallback;
}
