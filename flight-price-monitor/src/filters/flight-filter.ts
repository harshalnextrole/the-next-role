import { CONFIG } from '../config.js';
import { parseDurationMinutes, computeLayoverMinutes } from '../utils/duration.js';
import type { FlightOffer, FlightItinerary } from '../types/index.js';

/**
 * Check if a single itinerary (one direction) meets our criteria:
 * - Max stops (segments - 1)
 * - Max total travel time
 * - Max layover duration at connecting airports
 */
function isItineraryAcceptable(itinerary: FlightItinerary): boolean {
  // Check number of stops (segments count - 1 = stops)
  const stops = itinerary.segments.length - 1;
  if (stops > CONFIG.MAX_STOPS) return false;

  // Check total travel time
  const totalMinutes = parseDurationMinutes(itinerary.duration);
  if (totalMinutes > CONFIG.MAX_TRAVEL_TIME_MINUTES) return false;

  // Check layover durations for connecting flights
  for (let i = 0; i < itinerary.segments.length - 1; i++) {
    const layover = computeLayoverMinutes(
      itinerary.segments[i].arrival.at,
      itinerary.segments[i + 1].departure.at
    );
    if (layover > CONFIG.MAX_LAYOVER_MINUTES) return false;
  }

  return true;
}

/**
 * Filter a flight offer — both outbound and return itineraries must be acceptable.
 */
export function isOfferAcceptable(offer: FlightOffer): boolean {
  return offer.itineraries.every(isItineraryAcceptable);
}

/**
 * Filter and sort offers, returning the cheapest acceptable one (or null).
 */
export function findCheapestAcceptable(offers: FlightOffer[]): FlightOffer | null {
  const acceptable = offers.filter(isOfferAcceptable);

  if (acceptable.length === 0) return null;

  acceptable.sort(
    (a, b) => parseFloat(a.price.total) - parseFloat(b.price.total)
  );

  return acceptable[0];
}

/**
 * Extract a human-readable route string from an itinerary.
 * E.g. "YYZ-FCO-DEL" for a 1-stop via Rome.
 */
export function extractRoute(itinerary: FlightItinerary): string {
  const codes = [itinerary.segments[0].departure.iataCode];
  for (const segment of itinerary.segments) {
    codes.push(segment.arrival.iataCode);
  }
  return codes.join('-');
}

/**
 * Get the maximum layover in minutes across all connections in an itinerary.
 */
export function getMaxLayover(itinerary: FlightItinerary): number {
  let maxLayover = 0;
  for (let i = 0; i < itinerary.segments.length - 1; i++) {
    const layover = computeLayoverMinutes(
      itinerary.segments[i].arrival.at,
      itinerary.segments[i + 1].departure.at
    );
    maxLayover = Math.max(maxLayover, layover);
  }
  return maxLayover;
}
