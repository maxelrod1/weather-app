/**
 * API response types and error handling
 */

/**
 * Standard API error format
 */
export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

/**
 * US Census Geocoding API response
 */
export interface CensusGeocodeResponse {
  result: {
    addressMatches: Array<{
      coordinates: {
        x: number; // longitude
        y: number; // latitude
      };
      addressComponents: {
        city: string;
        state: string;
        zip: string;
      };
      matchedAddress: string;
    }>;
  };
}

/**
 * National Weather Service API - Points endpoint response
 */
export interface NWSPointsResponse {
  properties: {
    forecast: string;
    forecastGridData: string;
    relativeLocation: {
      properties: {
        city: string;
        state: string;
      };
    };
  };
}

/**
 * National Weather Service API - Gridpoint endpoint response
 */
export interface NWSGridpointResponse {
  properties: {
    temperature: {
      value: number;
      unitCode: string;
    };
    relativeHumidity: {
      value: number;
    };
    windSpeed: {
      value: number;
      unitCode: string;
    };
    windDirection: {
      value: number;
    };
    shortForecast?: string;
    dewpoint?: {
      value: number;
    };
  };
}

/**
 * National Weather Service API - Forecast endpoint response
 */
export interface NWSForecastResponse {
  properties: {
    periods: Array<{
      temperature: number;
      temperatureUnit: string;
      windSpeed: string;
      windDirection: string;
      shortForecast: string;
      detailedForecast: string;
      relativeHumidity?: {
        value: number;
      };
    }>;
  };
}

