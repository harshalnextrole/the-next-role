/** A departure + return date pair for searching */
export interface DatePair {
  departure: string; // YYYY-MM-DD
  return: string;    // YYYY-MM-DD
}

/** Airport info from SerpAPI */
export interface SerpApiAirport {
  name: string;
  id: string;
  time: string;
}

/** A single flight segment from SerpAPI */
export interface SerpApiFlight {
  departure_airport: SerpApiAirport;
  arrival_airport: SerpApiAirport;
  duration: number; // minutes
  airline: string;
  airline_logo: string;
  flight_number: string;
}

/** Layover info from SerpAPI */
export interface SerpApiLayover {
  duration: number; // minutes
  name: string;
  id: string;
}

/** A complete flight result from SerpAPI Google Flights */
export interface SerpApiFlightResult {
  flights: SerpApiFlight[];
  layovers?: SerpApiLayover[];
  total_duration: number; // minutes
  price: number;
  type: string;
  airline_logo: string;
  departure_token?: string;
}

/** SerpAPI response structure */
export interface SerpApiResponse {
  best_flights?: SerpApiFlightResult[];
  other_flights?: SerpApiFlightResult[];
  search_metadata: {
    status: string;
    id: string;
  };
  error?: string;
}

/** A price observation we store */
export interface PriceRecord {
  id: string;
  departureDate: string;
  returnDate: string;
  price: number;
  currency: string;
  airline: string;
  route: string;
  totalDuration: number; // minutes (outbound)
  stops: number;
  maxLayoverMinutes: number;
  checkedAt: string; // ISO 8601
}

/** Lowest price tracker per date pair */
export interface LowestPriceEntry {
  lowestPrice: number;
  currency: string;
  airline: string;
  route: string;
  totalDuration: number;
  stops: number;
  lastUpdated: string;
}

/** Map of departure date -> lowest price entry */
export interface LowestPricesMap {
  [departureDate: string]: LowestPriceEntry;
}

/** Batch rotation state */
export interface SearchState {
  lastBatchIndex: number;
  lastRunDate: string;
}

/** Deal tier for a given price */
export type DealTier = 'exceptional' | 'good' | 'drop' | null;

/** Historical price stats for a route/date */
export interface HistoricalStats {
  avg: number;
  min: number;
  observations: number;
}

/** Alternative flight option (for showing top 3 options in email) */
export interface FlightOption {
  airline: string;
  route: string;
  price: number;
  totalDuration: number;
  stops: number;
  maxLayoverMinutes: number;
}

/** Email notification payload */
export interface PriceDropAlert {
  departureDate: string;
  returnDate: string;
  newPrice: number;
  previousPrice: number | null;
  currency: string;
  airline: string;
  route: string;
  totalDuration: number; // minutes
  stops: number;
  maxLayoverMinutes: number;
  dealTier: DealTier;
  historicalStats: HistoricalStats | null;
  /** Is this the very first time we're seeing this date? */
  isFirstObservation: boolean;
  /** Top cheapest options from different airlines (includes the primary) */
  alternatives: FlightOption[];
}
