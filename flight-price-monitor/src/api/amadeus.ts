import Amadeus from 'amadeus';
import { CONFIG } from '../config.js';
import type { FlightOffer } from '../types/index.js';

let client: Amadeus | null = null;

function getClient(): Amadeus {
  if (!client) {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Missing AMADEUS_CLIENT_ID or AMADEUS_CLIENT_SECRET environment variables'
      );
    }

    client = new Amadeus({
      clientId,
      clientSecret,
      hostname: 'production', // Use 'test' for sandbox (cached data)
    });
  }

  return client;
}

/**
 * Search for business class flight offers for a specific date pair.
 * Returns raw Amadeus flight offers.
 */
export async function searchFlights(
  departureDate: string,
  returnDate: string
): Promise<FlightOffer[]> {
  const amadeus = getClient();

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: CONFIG.ORIGIN,
      destinationLocationCode: CONFIG.DESTINATION,
      departureDate,
      returnDate,
      adults: 1,
      travelClass: 'BUSINESS',
      currencyCode: CONFIG.CURRENCY,
      max: CONFIG.MAX_RESULTS_PER_SEARCH,
    });

    return response.data as FlightOffer[];
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  Error searching ${departureDate} → ${returnDate}: ${message}`);
    return [];
  }
}

/** Simple delay to respect rate limits */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
