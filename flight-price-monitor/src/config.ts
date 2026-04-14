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

  /** Days between each search date — 2 days covers Oct 3, 5, 7... catching gaps */
  DATE_INTERVAL_DAYS: 2,

  /** Dates to check per run — 7/day × 30 days = 210 searches/month (under 250 free tier) */
  DATES_PER_RUN: 7,

  /** Maximum total travel time per direction in minutes (26 hours) */
  MAX_TRAVEL_TIME_MINUTES: 26 * 60,

  /** Maximum number of stops per direction */
  MAX_STOPS: 1,

  /** Maximum layover duration in minutes (8 hours) */
  MAX_LAYOVER_MINUTES: 8 * 60,

  /** Currency for price results */
  CURRENCY: 'CAD',

  /** Delay between API calls in ms (respect rate limits) */
  API_DELAY_MS: 2000,

  /**
   * Deal thresholds (CAD, round trip business class).
   * Alerts fire when price drops below these regardless of whether it's a new low.
   * Based on typical YYZ-DEL business class range of $3,500-$6,000 CAD.
   */
  GOOD_DEAL_CAD: 3500,
  EXCEPTIONAL_DEAL_CAD: 2500,
} as const;
