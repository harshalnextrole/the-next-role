import { generateDatePairs } from './utils/dates.js';
import { searchFlights, delay } from './api/serpapi.js';
import { findCheapestAcceptable, extractRoute, getAirline, getMaxLayover } from './filters/flight-filter.js';
import { appendPriceHistory, getPreviousLowest, updateLowestPrice, readSearchState, updateSearchState } from './storage/price-store.js';
import { sendPriceDropAlert } from './notifications/email.js';
import { CONFIG } from './config.js';
import type { PriceRecord, PriceDropAlert } from './types/index.js';

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

  // Save state
  updateSearchState({
    lastBatchIndex: nextIndex,
    lastRunDate: new Date().toISOString(),
  });

  console.log(`Batch ${nextIndex + 1}/${totalBatches} (dates ${start + 1}-${end} of ${allDates.length})\n`);
  return batch;
}

async function main(): Promise<void> {
  console.log('=== Flight Price Monitor ===');
  console.log(`Route: ${CONFIG.ORIGIN} → ${CONFIG.DESTINATION} (Business Class)`);
  console.log(`Window: ${CONFIG.SEARCH_START} to ${CONFIG.SEARCH_END_DEPARTURE}`);
  console.log(`Trip: ${CONFIG.TRIP_DURATION_DAYS} days | Max travel: ${CONFIG.MAX_TRAVEL_TIME_MINUTES / 60}h`);
  console.log(`Filters: ≤${CONFIG.MAX_STOPS} stop(s), ≤${CONFIG.MAX_LAYOVER_MINUTES / 60}h layover`);
  console.log('');

  const allDatePairs = generateDatePairs();
  const datePairs = getNextBatch(allDatePairs);

  let priceDrops = 0;
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

    const price = cheapest.price;
    const airline = getAirline(cheapest);
    const route = extractRoute(cheapest);
    const stops = cheapest.flights.length - 1;
    const maxLayover = getMaxLayover(cheapest);

    console.log(`  Cheapest: $${price} ${CONFIG.CURRENCY} | ${airline} | ${route} | ${stops} stop(s)`);

    // Build the price record
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

    // Save to history
    appendPriceHistory(record);

    // Check for price drop
    const previousLowest = getPreviousLowest(pair.departure);

    if (previousLowest === null || price < previousLowest) {
      const dropText = previousLowest
        ? `PRICE DROP: $${previousLowest} → $${price} (-$${previousLowest - price})`
        : `NEW LOWEST: $${price} (first observation)`;
      console.log(`  ${dropText}`);

      // Update lowest price
      updateLowestPrice(pair.departure, {
        lowestPrice: price,
        currency: CONFIG.CURRENCY,
        airline,
        route,
        totalDuration: cheapest.total_duration,
        stops,
        lastUpdated: new Date().toISOString(),
      });

      // Send notification
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
      };

      await sendPriceDropAlert(alert);
      priceDrops++;
    } else {
      console.log(`  No change (lowest: $${previousLowest})`);
    }

    await delay(CONFIG.API_DELAY_MS);
  }

  console.log('\n=== Summary ===');
  console.log(`Searches: ${totalSearches}`);
  console.log(`No results: ${noResults}`);
  console.log(`Price drops/new lows: ${priceDrops}`);
  console.log(`Completed at: ${new Date().toISOString()}`);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
