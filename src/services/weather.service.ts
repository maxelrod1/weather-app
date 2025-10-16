/**
 * Weather service - Fetch weather data from National Weather Service API
 */

import { httpGet, toApiError } from './http.client';
import { WeatherData } from '../types/weather.types';
import { Coordinates } from '../types/coordinates.types';
import { NWSPointsResponse, NWSForecastResponse } from '../types/api.types';

const NWS_API_BASE_URL = 'https://api.weather.gov';

/**
 * Fetch weather data for given coordinates
 * @param coordinates - Latitude and longitude
 * @param zipCode - Original zip code (for result)
 * @returns WeatherData object
 * @throws Error if weather data cannot be fetched
 */
export async function getWeatherByCoordinates(
  coordinates: Coordinates,
  zipCode: string
): Promise<WeatherData> {
  try {
    // Step 1: Get forecast URLs from points endpoint
    const pointsUrl = `${NWS_API_BASE_URL}/points/${coordinates.latitude},${coordinates.longitude}`;
    const pointsData = await httpGet<NWSPointsResponse>(pointsUrl);

    // Step 2: Get forecast data
    const forecastUrl = pointsData.properties.forecast;
    const forecastData = await httpGet<NWSForecastResponse>(forecastUrl);

    // Get the current period (first period in the array)
    const currentPeriod = forecastData.properties.periods[0];

    if (!currentPeriod) {
      throw new Error('No weather data available');
    }

    // Parse wind speed (format: "10 mph" or "5 to 10 mph")
    const windSpeed = parseWindSpeed(currentPeriod.windSpeed);

    // Calculate feels-like temperature (simplified approximation)
    const feelsLike = calculateFeelsLike(
      currentPeriod.temperature,
      windSpeed,
      currentPeriod.relativeHumidity?.value || 50
    );

    const weatherData: WeatherData = {
      location: coordinates.displayName,
      zipCode,
      temperature: currentPeriod.temperature,
      temperatureUnit: currentPeriod.temperatureUnit,
      conditions: currentPeriod.shortForecast,
      humidity: currentPeriod.relativeHumidity?.value || 0,
      windSpeed,
      windDirection: currentPeriod.windDirection,
      feelsLike,
      timestamp: new Date(),
    };

    return weatherData;
  } catch (error) {
    const apiError = toApiError(error);

    // Provide user-friendly error messages
    if (apiError.code === 'NOT_FOUND') {
      throw new Error('Weather data not available for this location');
    }

    if (apiError.code === 'NETWORK_ERROR') {
      throw new Error('Unable to connect to weather service. Please check your internet connection.');
    }

    if (apiError.code === 'SERVER_ERROR') {
      throw new Error('Weather service is temporarily unavailable. Please try again later.');
    }

    throw new Error(`Failed to fetch weather data: ${apiError.message}`);
  }
}

/**
 * Parse wind speed string to number
 * Examples: "10 mph", "5 to 10 mph"
 */
function parseWindSpeed(windSpeedStr: string): number {
  // Extract numbers from string
  const numbers = windSpeedStr.match(/\d+/g);
  
  if (!numbers || numbers.length === 0) {
    return 0;
  }

  // If range (e.g., "5 to 10"), take the average
  if (numbers.length > 1) {
    const sum = numbers.reduce((acc, num) => acc + parseInt(num, 10), 0);
    return Math.round(sum / numbers.length);
  }

  return parseInt(numbers[0], 10);
}

/**
 * Calculate feels-like temperature using simplified wind chill/heat index
 * This is a simplified version - real calculation is more complex
 */
function calculateFeelsLike(temp: number, windSpeed: number, humidity: number): number {
  // For cold temperatures with wind (wind chill)
  if (temp <= 50 && windSpeed > 3) {
    // Simplified wind chill formula
    const windChill = 35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 
                      0.4275 * temp * Math.pow(windSpeed, 0.16);
    return Math.round(windChill);
  }

  // For hot temperatures with humidity (heat index)
  if (temp >= 80 && humidity > 40) {
    // Simplified heat index
    const heatIndex = temp + 0.5 * (humidity - 50) * 0.1;
    return Math.round(heatIndex);
  }

  // Otherwise, feels-like equals actual temperature
  return temp;
}

