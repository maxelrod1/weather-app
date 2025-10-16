/**
 * Geocoding service - Convert zip codes to coordinates
 * Uses US Census Geocoding API
 */

import { httpGet, toApiError } from './http.client';
import { GeocodeResult, Coordinates } from '../types/coordinates.types';
import { CensusGeocodeResponse } from '../types/api.types';

const CENSUS_GEOCODING_BASE_URL =
  'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';

/**
 * Convert zip code to geographic coordinates
 * @param zipCode - 5-digit US zip code
 * @returns GeocodeResult with coordinates and location info
 * @throws Error if zip code not found or geocoding fails
 */
export async function geocodeZipCode(zipCode: string): Promise<GeocodeResult> {
  try {
    const url = `${CENSUS_GEOCODING_BASE_URL}?address=${zipCode}&benchmark=2020&format=json`;

    const response = await httpGet<CensusGeocodeResponse>(url);

    // Check if we got any results
    if (!response.result?.addressMatches || response.result.addressMatches.length === 0) {
      throw new Error('Zip code not found or invalid');
    }

    const match = response.result.addressMatches[0];

    // Extract coordinates (Note: Census API returns x=longitude, y=latitude)
    const coordinates: Coordinates = {
      latitude: match.coordinates.y,
      longitude: match.coordinates.x,
      displayName: formatLocationName(
        match.addressComponents.city,
        match.addressComponents.state
      ),
    };

    const result: GeocodeResult = {
      coordinates,
      address: match.matchedAddress,
      city: match.addressComponents.city,
      state: match.addressComponents.state,
      zipCode: match.addressComponents.zip,
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

