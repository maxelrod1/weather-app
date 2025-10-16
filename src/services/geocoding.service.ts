/**
 * Geocoding service - Convert zip codes to coordinates
 * Uses zippopotam.us API (free, no key required, CORS-enabled)
 */

import { httpGet, toApiError } from './http.client';
import { GeocodeResult, Coordinates } from '../types/coordinates.types';

const ZIPPOPOTAM_BASE_URL = 'https://api.zippopotam.us/us';

/**
 * Zippopotam API response format
 */
interface ZippopotamResponse {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: Array<{
    'place name': string;
    longitude: string;
    latitude: string;
    state: string;
    'state abbreviation': string;
  }>;
}

/**
 * Convert zip code to geographic coordinates
 * @param zipCode - 5-digit US zip code
 * @returns GeocodeResult with coordinates and location info
 * @throws Error if zip code not found or geocoding fails
 */
export async function geocodeZipCode(zipCode: string): Promise<GeocodeResult> {
  try {
    const url = `${ZIPPOPOTAM_BASE_URL}/${zipCode}`;

    const response = await httpGet<ZippopotamResponse>(url);

    // Check if we got any results
    if (!response.places || response.places.length === 0) {
      throw new Error('Zip code not found or invalid');
    }

    const place = response.places[0];

    // Extract coordinates
    const coordinates: Coordinates = {
      latitude: parseFloat(place.latitude),
      longitude: parseFloat(place.longitude),
      displayName: formatLocationName(place['place name'], place['state abbreviation']),
    };

    const result: GeocodeResult = {
      coordinates,
      address: `${place['place name']}, ${place['state abbreviation']} ${zipCode}`,
      city: place['place name'],
      state: place['state abbreviation'],
      zipCode: response['post code'],
    };

    return result;
  } catch (error) {
    const apiError = toApiError(error);
    
    // Provide user-friendly error messages
    if (apiError.code === 'NOT_FOUND') {
      throw new Error('Location not found for this zip code');
    }
    
    if (apiError.code === 'NETWORK_ERROR') {
      throw new Error('Unable to connect to geocoding service. Please check your internet connection.');
    }

    if (apiError.message.includes('not found') || apiError.message.includes('invalid')) {
      throw new Error('Invalid zip code or location not found');
    }

    throw new Error(`Geocoding failed: ${apiError.message}`);
  }
}

/**
 * Format location name for display
 */
function formatLocationName(city: string, state: string): string {
  if (city && state) {
    return `${city}, ${state}`;
  }
  return city || state || 'Unknown Location';
}

