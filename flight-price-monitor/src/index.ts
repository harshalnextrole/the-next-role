import { generateDatePairs } from './utils/dates.js';
import { searchFlights, delay } from './api/serpapi.js';
import {
  findCheapestAcceptable,
  findTopCheapestByAirline,
  getAllAcceptable,
  extractRoute,
  getAirline,
  getMaxLayover,
} from './filters/flight-filter.js';
import {
  appendPriceHistory,
  getPreviousLowest,
  updateLowestPrice,
  readSearchState,
  updateSearchState,
  getHistoricalStats,
} from './storage/price-store.js';
import { sendPriceDropAlert } from './notifications/email.js';
import { CONFIG } from './config.js';
import type { PriceRecord, PriceDropAlert, DealTier, FlightOption } from './types/index.js';

/**
 * Classify a price into a deal tier.
 * Exceptional < $2,500 CAD | Good < $3,500 CAD | Regular drop otherwise
 */
function getDealTier(price: number): DealTier {
  if (price <= CONFIG.EXCEPTIONAL_DEAL_CAD) return 'exceptional';
  if (price <= CONFIG.GOOD_DEAL_CAD) return 'good';
  return null;
}

/**
 * Decide whether to send an alert.
 * Fires when:
 *   1. Price is a new historical low for this departure date, OR
 *   2. Price crosses into a deal tier the previous low wasn't in
 *      (e.g. was $3,800 → now $3,400 = enters "good deal" zone)
 */
function shouldSendAlert(price: number, previousLowest: number | null): boolean {
  if (previousLowest === null) return true; // First observation
  if (price < previousLowest) return true;  // New low

  // Check if we've crossed into a better deal tier
  const currentTier = getDealTier(price);
  const previousTier = getDealTier(previousLowest);
  if (currentTier !== null && currentTier !== previousTier) return true;

  return false;
}

/**
 * Select the next batch of dates to check.
 * Rotates through all dates, DATES_PER_RUN at a time.
 */
function getNextBatch(allDates: ReturnType<typeof generateDatePairs>): ReturnType<typeof generateDatePairs> {
  const state = readSearchState();
  const totalBatches = Math.ceil(allDates.length / CONFIG.DATES_PER_RUN);
  const nextIndex = (state.lastBatchIndex + 1) % totalBatches;

  const start = nextIndex * CONFIG.DATES_PER_RUN;
  const end = Math.min(start + CONFIG.DATES_PER_RUN, allDates.length);
  const batch = allDates.slice(start, end);

  updateSearchState({
    lastBatchIndex: nextIndex,
    lastRunDate: new Date().toISOString(),
  });

  console.log(`Batch ${nextIndex + 1}/${totalBatches} (dates ${start + 1}–${end} of ${allDates.length})\n`);
  return batch;
}

async function main(): Promise<void> {
  console.log('=== Flight Price Monitor ===');
  console.log(`Route: ${CONFIG.ORIGIN} → ${CONFIG.DESTINATION} (Business Class)`);
  console.log(`Window: ${CONFIG.SEARCH_START} to ${CONFIG.SEARCH_END_DEPARTURE}`);
  console.log(`Trip: ${CONFIG.TRIP_DURATION_DAYS} days | Max travel: ${CONFIG.MAX_TRAVEL_TIME_MINUTES / 60}h`);
  console.log(`Thresholds: Good deal <$${CONFIG.GOOD_DEAL_CAD} | Exceptional <$${CONFIG.EXCEPTIONAL_DEAL_CAD}`);
  console.log('');

  const allDatePairs = generateDatePairs();
  const datePairs = getNextBatch(allDatePairs);

  let alerts = 0;
  let totalSearches = 0;
  let noResults = 0;

  for (const pair of datePairs) {
    totalSearches++;
    console.log(`[${totalSearches}/${datePairs.length}] ${pair.departure} → ${pair.return}`);

    const response = await searchFlights(pair.departure, pair.return);

    if (!response) {
      console.log('  No response from API');
      noResults++;
      await delay(CONFIG.API_DELAY_MS);
      continue;
    }

    const bestCount = response.best_flights?.length ?? 0;
    const otherCount = response.other_flights?.length ?? 0;
    console.log(`  Found ${bestCount + otherCount} flights (${bestCount} best, ${otherCount} other)`);

    const cheapest = findCheapestAcceptable(response);

    if (!cheapest) {
      console.log('  No flights match filters (duration/layover)');
      await delay(CONFIG.API_DELAY_MS);
      continue;
    }

    // Log diagnostics: all airlines observed and their cheapest price
    const allAcceptable = getAllAcceptable(response);
    const airlineSummary = new Map<string, number>();
    for (const f of allAcceptable) {
      const a = getAirline(f);
      if (!airlineSummary.has(a) || airlineSummary.get(a)! > f.price) {
        airlineSummary.set(a, f.price);
      }
    }
    console.log(`  Airlines seen (cheapest each): ${
      Array.from(airlineSummary.entries())
        .sort((a, b) => a[1] - b[1])
        .map(([a, p]) => `${a} $${p}`)
        .join(', ')
    }`);

    const price = cheapest.price;
    const airline = getAirline(cheapest);
    const route = extractRoute(cheapest);
    const stops = cheapest.flights.length - 1;
    const maxLayover = getMaxLayover(cheapest);
    const dealTier = getDealTier(price);
    const tierLabel = dealTier === 'exceptional' ? ' *** EXCEPTIONAL DEAL ***'
      : dealTier === 'good' ? ' ** GOOD DEAL **'
      : '';

    console.log(`  Cheapest: $${price} ${CONFIG.CURRENCY} | ${airline} | ${route} | ${stops} stop(s)${tierLabel}`);

    // Build top 3 alternatives (different airlines) for the email
    const topOptions = findTopCheapestByAirline(response, 3);
    const alternatives: FlightOption[] = topOptions.map((f) => ({
      airline: getAirline(f),
      route: extractRoute(f),
      price: f.price,
      totalDuration: f.total_duration,
      stops: f.flights.length - 1,
      maxLayoverMinutes: getMaxLayover(f),
    }));

    // Save to history
    const record: PriceRecord = {
      id: Date.now().toString(),
      departureDate: pair.departure,
      returnDate: pair.return,
      price,
      currency: CONFIG.CURRENCY,
      airline,
      route,
      totalDuration: cheapest.total_duration,
      stops,
      maxLayoverMinutes: maxLayover,
      checkedAt: new Date().toISOString(),
    };
    appendPriceHistory(record);

    const previousLowest = getPreviousLowest(pair.departure);
    const historicalStats = getHistoricalStats(pair.departure);

    if (shouldSendAlert(price, previousLowest)) {
      const dropText = previousLowest
        ? `${previousLowest} → $${price} (-$${previousLowest - price})`
        : `first observation`;
      console.log(`  ALERT: $${dropText}`);

      updateLowestPrice(pair.departure, {
        lowestPrice: price,
        currency: CONFIG.CURRENCY,
        airline,
        route,
        totalDuration: cheapest.total_duration,
        stops,
        lastUpdated: new Date().toISOString(),
      });

      const alert: PriceDropAlert = {
        departureDate: pair.departure,
        returnDate: pair.return,
        newPrice: price,
        previousPrice: previousLowest,
        currency: CONFIG.CURRENCY,
        airline,
        route,
        totalDuration: cheapest.total_duration,
        stops,
        maxLayoverMinutes: maxLayover,
        dealTier,
        historicalStats,
        isFirstObservation: previousLowest === null,
        alternatives,
      };

      await sendPriceDropAlert(alert);
      alerts++;
    } else {
      console.log(`  No change (lowest: $${previousLowest})`);
    }

    await delay(CONFIG.API_DELAY_MS);
  }

  console.log('\n=== Summary ===');
  console.log(`Searches: ${totalSearches} | No results: ${noResults} | Alerts sent: ${alerts}`);
  console.log(`Completed at: ${new Date().toISOString()}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
