import { CONFIG } from '../config.js';
import type { SerpApiFlightResult, SerpApiResponse } from '../types/index.js';

/**
 * Check if a flight result meets our criteria:
 * - Max total travel time (outbound)
 * - Max layover duration
 * Note: stops are already filtered by SerpAPI (stops=2 = up to 1 stop)
 */
function isFlightAcceptable(result: SerpApiFlightResult): boolean {
  // Check total travel time
  if (result.total_duration > CONFIG.MAX_TRAVEL_TIME_MINUTES) return false;

  // Check layover durations (layovers may be undefined for direct flights)
  for (const layover of (result.layovers ?? [])) {
    if (layover.duration > CONFIG.MAX_LAYOVER_MINUTES) return false;
  }

  return true;
}

/**
 * Get all flight results from a SerpAPI response (best + other flights).
 */
function getAllFlights(response: SerpApiResponse): SerpApiFlightResult[] {
  const flights: SerpApiFlightResult[] = [];
  if (response.best_flights) flights.push(...response.best_flights);
  if (response.other_flights) flights.push(...response.other_flights);
  return flights;
}

/**
 * Filter and sort results, returning the cheapest acceptable one (or null).
 */
export function findCheapestAcceptable(response: SerpApiResponse): SerpApiFlightResult | null {
  const allFlights = getAllFlights(response);
  const acceptable = allFlights.filter(isFlightAcceptable);

  if (acceptable.length === 0) return null;

  acceptable.sort((a, b) => a.price - b.price);
  return acceptable[0];
}

/**
 * Return the top N cheapest acceptable flights, each from a DIFFERENT airline
 * (so we see diversity, not 3 Etihad flights at slightly different prices).
 */
export function findTopCheapestByAirline(
  response: SerpApiResponse,
  n: number
): SerpApiFlightResult[] {
  const allFlights = getAllFlights(response);
  const acceptable = allFlights.filter(isFlightAcceptable);
  acceptable.sort((a, b) => a.price - b.price);

  const seen = new Set<string>();
  const result: SerpApiFlightResult[] = [];

  for (const flight of acceptable) {
    const airline = getAirline(flight);
    if (seen.has(airline)) continue;
    seen.add(airline);
    result.push(flight);
    if (result.length >= n) break;
  }

  return result;
}

/**
 * Return ALL acceptable flights sorted by price (for logging/diagnostics).
 */
export function getAllAcceptable(response: SerpApiResponse): SerpApiFlightResult[] {
  const allFlights = getAllFlights(response);
  const acceptable = allFlights.filter(isFlightAcceptable);
  acceptable.sort((a, b) => a.price - b.price);
  return acceptable;
}

/**
 * Extract a human-readable route string from a flight result.
 * E.g. "YYZ-FCO-DEL" for a 1-stop via Rome.
 */
export function extractRoute(result: SerpApiFlightResult): string {
  const codes = [result.flights[0].departure_airport.id];
  for (const flight of result.flights) {
    codes.push(flight.arrival_airport.id);
  }
  return codes.join('-');
}

/**
 * Get the primary airline name from a flight result.
 */
export function getAirline(result: SerpApiFlightResult): string {
  return result.flights[0]?.airline || 'Unknown';
}

/**
 * Get the maximum layover in minutes across all connections.
 */
export function getMaxLayover(result: SerpApiFlightResult): number {
  if (!result.layovers || result.layovers.length === 0) return 0;
  return Math.max(...result.layovers.map((l) => l.duration));
}
