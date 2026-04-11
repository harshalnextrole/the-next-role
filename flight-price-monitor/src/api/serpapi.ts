import { CONFIG } from '../config.js';
import type { SerpApiResponse } from '../types/index.js';

/**
 * Search Google Flights via SerpAPI for business class flights.
 */
export async function searchFlights(
  departureDate: string,
  returnDate: string
): Promise<SerpApiResponse | null> {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    throw new Error('Missing SERPAPI_KEY environment variable');
  }

  const params = new URLSearchParams({
    engine: 'google_flights',
    departure_id: CONFIG.ORIGIN,
    arrival_id: CONFIG.DESTINATION,
    outbound_date: departureDate,
    return_date: returnDate,
    travel_class: '3', // Business class
    type: '1',         // Round trip
    stops: '2',        // Up to 1 stop
    currency: CONFIG.CURRENCY,
    hl: 'en',
    api_key: apiKey,
  });

  const url = `https://serpapi.com/search.json?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  SerpAPI error ${response.status}: ${errorText}`);
      return null;
    }

    const data = await response.json() as SerpApiResponse;

    if (data.error) {
      console.error(`  SerpAPI error: ${data.error}`);
      return null;
    }

    return data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  Error searching ${departureDate} → ${returnDate}: ${message}`);
    return null;
  }
}

/** Simple delay to respect rate limits */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
