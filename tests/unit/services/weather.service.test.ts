import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getWeatherByCoordinates } from '@/services/weather.service';
import * as httpClient from '@/services/http.client';
import { Coordinates } from '@/types/coordinates.types';

// Mock the HTTP client
vi.mock('@/services/http.client');

describe('getWeatherByCoordinates', () => {
  const mockCoordinates: Coordinates = {
    latitude: 40.7484,
    longitude: -73.9857,
    displayName: 'New York, NY',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully fetch weather data', async () => {
    const mockPointsResponse = {
      properties: {
        forecast: 'https://api.weather.gov/gridpoints/OKX/32,34/forecast',
        forecastGridData: 'https://api.weather.gov/gridpoints/OKX/32,34',
        relativeLocation: {
          properties: {
            city: 'New York',
            state: 'NY',
          },
        },
      },
    };

    const mockForecastResponse = {
      properties: {
        periods: [
          {
            temperature: 72,
            temperatureUnit: 'F',
            windSpeed: '10 mph',
            windDirection: 'NW',
            shortForecast: 'Partly Cloudy',
            detailedForecast: 'Partly cloudy with a high of 72.',
            relativeHumidity: {
              value: 65,
            },
          },
        ],
      },
    };

    vi.mocked(httpClient.httpGet)
      .mockResolvedValueOnce(mockPointsResponse)
      .mockResolvedValueOnce(mockForecastResponse);

    const result = await getWeatherByCoordinates(mockCoordinates, '10001');

    expect(result).toMatchObject({
      location: 'New York, NY',
      zipCode: '10001',
      temperature: 72,
      temperatureUnit: 'F',
      conditions: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 10,
      windDirection: 'NW',
    });

    expect(result.feelsLike).toBeDefined();
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should parse wind speed range correctly', async () => {
    const mockPointsResponse = {
      properties: {
        forecast: 'https://api.weather.gov/gridpoints/OKX/32,34/forecast',
        forecastGridData: 'https://api.weather.gov/gridpoints/OKX/32,34',
        relativeLocation: {
          properties: { city: 'Test', state: 'TS' },
        },
      },
    };

    const mockForecastResponse = {
      properties: {
        periods: [
          {
            temperature: 65,
            temperatureUnit: 'F',
            windSpeed: '5 to 10 mph',
            windDirection: 'SW',
            shortForecast: 'Clear',
            detailedForecast: 'Clear skies.',
            relativeHumidity: { value: 50 },
          },
        ],
      },
    };

    vi.mocked(httpClient.httpGet)
      .mockResolvedValueOnce(mockPointsResponse)
      .mockResolvedValueOnce(mockForecastResponse);

    const result = await getWeatherByCoordinates(mockCoordinates, '12345');

    // Average of 5 and 10 is 7.5, rounded to 8
    expect(result.windSpeed).toBe(8);
  });

  it('should handle missing humidity data', async () => {
    const mockPointsResponse = {
      properties: {
        forecast: 'https://api.weather.gov/gridpoints/OKX/32,34/forecast',
        forecastGridData: 'https://api.weather.gov/gridpoints/OKX/32,34',
        relativeLocation: {
          properties: { city: 'Test', state: 'TS' },
        },
      },
    };

    const mockForecastResponse = {
      properties: {
        periods: [
          {
            temperature: 70,
            temperatureUnit: 'F',
            windSpeed: '5 mph',
            windDirection: 'N',
            shortForecast: 'Sunny',
            detailedForecast: 'Sunny skies.',
            // No relativeHumidity
          },
        ],
      },
    };

    vi.mocked(httpClient.httpGet)
      .mockResolvedValueOnce(mockPointsResponse)
      .mockResolvedValueOnce(mockForecastResponse);

    const result = await getWeatherByCoordinates(mockCoordinates, '12345');

    expect(result.humidity).toBe(0);
  });

  it('should throw error when no weather periods available', async () => {
    const mockPointsResponse = {
      properties: {
        forecast: 'https://api.weather.gov/gridpoints/OKX/32,34/forecast',
        forecastGridData: 'https://api.weather.gov/gridpoints/OKX/32,34',
        relativeLocation: {
          properties: { city: 'Test', state: 'TS' },
        },
      },
    };

    const mockForecastResponse = {
      properties: {
        periods: [],
      },
    };

    vi.mocked(httpClient.httpGet)
      .mockResolvedValueOnce(mockPointsResponse)
      .mockResolvedValueOnce(mockForecastResponse);
    
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'No weather data available',
      code: 'DATA_ERROR',
    });

    await expect(
      getWeatherByCoordinates(mockCoordinates, '12345')
    ).rejects.toThrow();
  });

  it('should handle network errors', async () => {
    vi.mocked(httpClient.httpGet).mockRejectedValue(new Error('Network error'));
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'Network error',
      code: 'NETWORK_ERROR',
    });

    await expect(
      getWeatherByCoordinates(mockCoordinates, '12345')
    ).rejects.toThrow('Unable to connect to weather service');
  });

  it('should handle API not found errors', async () => {
    const httpError = new httpClient.HttpError('Not found', 404);
    vi.mocked(httpClient.httpGet).mockRejectedValue(httpError);
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'Not found',
      code: 'NOT_FOUND',
    });

    await expect(
      getWeatherByCoordinates(mockCoordinates, '12345')
    ).rejects.toThrow('Weather data not available');
  });

  it('should handle server errors', async () => {
    const httpError = new httpClient.HttpError('Server error', 500);
    vi.mocked(httpClient.httpGet).mockRejectedValue(httpError);
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'Server error',
      code: 'SERVER_ERROR',
    });

    await expect(
      getWeatherByCoordinates(mockCoordinates, '12345')
    ).rejects.toThrow('Weather service is temporarily unavailable');
  });
});

