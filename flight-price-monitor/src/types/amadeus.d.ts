declare module 'amadeus' {
  interface AmadeusConfig {
    clientId: string;
    clientSecret: string;
    hostname?: 'production' | 'test';
  }

  interface FlightOffersSearchGetParams {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    currencyCode?: string;
    max?: number;
  }

  interface AmadeusResponse {
    data: unknown[];
    result: {
      statusCode: number;
    };
  }

  interface FlightOffersSearch {
    get(params: FlightOffersSearchGetParams): Promise<AmadeusResponse>;
  }

  interface Shopping {
    flightOffersSearch: FlightOffersSearch;
  }

  class Amadeus {
    constructor(config: AmadeusConfig);
    shopping: Shopping;
  }

  export default Amadeus;
}
