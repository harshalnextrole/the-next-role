/** Flight search configuration — all constants in one place */
export const CONFIG = {
  /** Origin airport code */
  ORIGIN: 'YYZ',

  /** Destination airport code */
  DESTINATION: 'DEL',

  /** Trip duration in days */
  TRIP_DURATION_DAYS: 21,

  /** First possible departure date */
  SEARCH_START: '2026-10-01',

  /** Last possible departure date (return must be by Dec 31) */
  SEARCH_END_DEPARTURE: '2026-12-10',

  /** Days between each search date (to limit API calls) */
  DATE_INTERVAL_DAYS: 5,

  /** Maximum total travel time per direction in minutes (26 hours) */
  MAX_TRAVEL_TIME_MINUTES: 26 * 60,

  /** Maximum number of stops per direction */
  MAX_STOPS: 1,

  /** Maximum layover duration in minutes (6 hours) */
  MAX_LAYOVER_MINUTES: 6 * 60,

  /** Currency for price results */
  CURRENCY: 'CAD',

  /** Number of dates to check per run (to stay within free tier) */
  DATES_PER_RUN: 3,

  /** Delay between API calls in ms (respect rate limits) */
  API_DELAY_MS: 2000,
} as const;
