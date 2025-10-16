/**
 * Geographic coordinates types
 */

/**
 * Latitude and longitude coordinates
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
  displayName: string;
}

/**
 * Result from geocoding service
 */
export interface GeocodeResult {
  coordinates: Coordinates;
  address: string;
  city?: string;
  state?: string;
  zipCode: string;
}

