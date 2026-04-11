import { generateDatePairs } from './utils/dates.js';
import { searchFlights, delay } from './api/amadeus.js';
import { findCheapestAcceptable, extractRoute, getMaxLayover } from './filters/flight-filter.js';
import { appendPriceHistory, getPreviousLowest, updateLowestPrice } from './storage/price-store.js';
import { sendPriceDropAlert } from './notifications/email.js';
import { CONFIG } from './config.js';
import type { PriceRecord, PriceDropAlert } from './types/index.js';

async function main(): Promise<void> {
  console.log('=== Flight Price Monitor ===');
  console.log(`Route: ${CONFIG.ORIGIN} → ${CONFIG.DESTINATION} (Business Class)`);
  console.log(`Window: ${CONFIG.SEARCH_START} to ${CONFIG.SEARCH_END_DEPARTURE}`);
  console.log(`Trip: ${CONFIG.TRIP_DURATION_DAYS} days | Max travel: ${CONFIG.MAX_TRAVEL_TIME_MINUTES / 60}h`);
  console.log(`Filters: ≤${CONFIG.MAX_STOPS} stop(s), ≤${CONFIG.MAX_LAYOVER_MINUTES / 60}h layover`);
  console.log('');

  const datePairs = generateDatePairs();
  console.log(`Checking ${datePairs.length} date combinations...\n`);

  let priceDrops = 0;
  let totalSearches = 0;
  let noResults = 0;

  for (const pair of datePairs) {
    totalSearches++;
    console.log(`[${totalSearches}/${datePairs.length}] ${pair.departure} → ${pair.return}`);

    const offers = await searchFlights(pair.departure, pair.return);
    console.log(`  Found ${offers.length} offers`);

    if (offers.length === 0) {
      noResults++;
      await delay(CONFIG.API_DELAY_MS);
      continue;
    }

    const cheapest = findCheapestAcceptable(offers);

    if (!cheapest) {
      console.log('  No offers match filters (stops/duration/layover)');
      await delay(CONFIG.API_DELAY_MS);
      continue;
    }

    const price = parseFloat(cheapest.price.total);
    const airline = cheapest.validatingAirlineCodes[0] || 'Unknown';
    const outbound = cheapest.itineraries[0];
    const returnItinerary = cheapest.itineraries[1];
    const route = extractRoute(outbound);
    const stops = outbound.segments.length - 1;
    const maxLayover = Math.max(getMaxLayover(outbound), getMaxLayover(returnItinerary));

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
      outboundDuration: outbound.duration,
      returnDuration: returnItinerary.duration,
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
        ? `PRICE DROP: $${previousLowest} → $${price} (-$${(previousLowest - price).toFixed(0)})`
        : `NEW LOWEST: $${price} (first observation)`;
      console.log(`  ${dropText}`);

      // Update lowest price
      updateLowestPrice(pair.departure, {
        lowestPrice: price,
        currency: CONFIG.CURRENCY,
        airline,
        route,
        outboundDuration: outbound.duration,
        returnDuration: returnItinerary.duration,
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
        outboundDuration: outbound.duration,
        returnDuration: returnItinerary.duration,
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
