/** A departure + return date pair for searching */
export interface DatePair {
  departure: string; // YYYY-MM-DD
  return: string;    // YYYY-MM-DD
}

/** A single flight segment (one takeoff-to-landing) */
export interface FlightSegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string; // ISO 8601
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string; // ISO 8601
  };
  carrierCode: string;
  number: string;
  duration: string; // ISO 8601 duration e.g. PT8H30M
  numberOfStops: number;
}

/** An itinerary (one direction: outbound or return) */
export interface FlightItinerary {
  duration: string; // ISO 8601 total duration e.g. PT14H30M
  segments: FlightSegment[];
}

/** A complete flight offer from Amadeus */
export interface FlightOffer {
  id: string;
  price: {
    currency: string;
    total: string;   // e.g. "4250.00"
    grandTotal: string;
  };
  itineraries: FlightItinerary[];
  validatingAirlineCodes: string[];
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
  outboundDuration: string;
  returnDuration: string;
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
  outboundDuration: string;
  returnDuration: string;
  stops: number;
  lastUpdated: string;
}

/** Map of departure date -> lowest price entry */
export interface LowestPricesMap {
  [departureDate: string]: LowestPriceEntry;
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
  outboundDuration: string;
  returnDuration: string;
  stops: number;
  maxLayoverMinutes: number;
}
