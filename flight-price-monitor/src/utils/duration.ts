/**
 * Parse an ISO 8601 duration string (e.g. "PT14H30M") into total minutes.
 * Handles hours and minutes. Days are converted to hours (PT1DT2H = 26H).
 */
export function parseDurationMinutes(duration: string): number {
  const match = duration.match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 0;

  const days = parseInt(match[1] || '0', 10);
  const hours = parseInt(match[2] || '0', 10);
  const minutes = parseInt(match[3] || '0', 10);

  return days * 24 * 60 + hours * 60 + minutes;
}

/**
 * Compute layover duration in minutes between two ISO timestamps.
 * E.g. between arrival at a connecting airport and next departure.
 */
export function computeLayoverMinutes(arrivalAt: string, departureAt: string): number {
  const arrival = new Date(arrivalAt).getTime();
  const departure = new Date(departureAt).getTime();
  return Math.round((departure - arrival) / (1000 * 60));
}

/**
 * Format minutes into a human-readable string like "14h 30m"
 */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
