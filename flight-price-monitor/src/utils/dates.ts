import { CONFIG } from '../config.js';
import type { DatePair } from '../types/index.js';

/**
 * Generate date pairs spaced CONFIG.DATE_INTERVAL_DAYS apart
 * from CONFIG.SEARCH_START to CONFIG.SEARCH_END_DEPARTURE.
 * Each return date is TRIP_DURATION_DAYS after departure.
 */
export function generateDatePairs(): DatePair[] {
  const pairs: DatePair[] = [];
  const start = new Date(CONFIG.SEARCH_START + 'T00:00:00Z');
  const lastDeparture = new Date(CONFIG.SEARCH_END_DEPARTURE + 'T00:00:00Z');
  const current = new Date(start);

  while (current <= lastDeparture) {
    const returnDate = new Date(current);
    returnDate.setUTCDate(returnDate.getUTCDate() + CONFIG.TRIP_DURATION_DAYS);

    pairs.push({
      departure: formatDate(current),
      return: formatDate(returnDate),
    });

    current.setUTCDate(current.getUTCDate() + CONFIG.DATE_INTERVAL_DAYS);
  }

  return pairs;
}

/** Format a Date as YYYY-MM-DD */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
