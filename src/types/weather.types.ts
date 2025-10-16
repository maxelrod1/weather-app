/**
 * Weather data types and interfaces
 */

/**
 * Complete weather information for display
 */
export interface WeatherData {
  location: string;
  zipCode: string;
  temperature: number;
  temperatureUnit: string;
  conditions: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  feelsLike: number;
  icon?: string;
  timestamp: Date;
}

/**
 * Simplified weather data for quick display
 */
export interface WeatherSummary {
  temperature: number;
  conditions: string;
  location: string;
}

