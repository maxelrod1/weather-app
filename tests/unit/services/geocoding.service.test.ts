import { describe, it, expect, vi, beforeEach } from 'vitest';
import { geocodeZipCode } from '@/services/geocoding.service';
import * as httpClient from '@/services/http.client';

// Mock the HTTP client
vi.mock('@/services/http.client');

describe('geocodeZipCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully geocode a valid zip code', async () => {
    const mockResponse = {
      'post code': '10001',
      country: 'United States',
      'country abbreviation': 'US',
      places: [
        {
          'place name': 'New York',
          longitude: '-73.9857',
          latitude: '40.7484',
          state: 'New York',
          'state abbreviation': 'NY',
        },
      ],
    };

    vi.mocked(httpClient.httpGet).mockResolvedValue(mockResponse);

    const result = await geocodeZipCode('10001');

    expect(result).toEqual({
      coordinates: {
        latitude: 40.7484,
        longitude: -73.9857,
        displayName: 'New York, NY',
      },
      address: 'New York, NY 10001',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
    });

    expect(httpClient.httpGet).toHaveBeenCalledWith(
      expect.stringContaining('10001')
    );
  });

  it('should throw error for zip code with no matches', async () => {
    const mockResponse = {
      'post code': '00000',
      country: 'United States',
      'country abbreviation': 'US',
      places: [], // Empty places array means not found
    };

    vi.mocked(httpClient.httpGet).mockResolvedValue(mockResponse);
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'Zip code not found or invalid',
      code: 'UNKNOWN',
    });

    await expect(geocodeZipCode('00000')).rejects.toThrow('Invalid zip code or location not found');
  });

  it('should handle network errors', async () => {
    vi.mocked(httpClient.httpGet).mockRejectedValue(new Error('Network error'));
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'Network error',
      code: 'NETWORK_ERROR',
    });

    await expect(geocodeZipCode('12345')).rejects.toThrow(
      'Unable to connect to geocoding service'
    );
  });

  it('should handle API not found errors', async () => {
    const httpError = new httpClient.HttpError('Not found', 404);
    vi.mocked(httpClient.httpGet).mockRejectedValue(httpError);
    vi.mocked(httpClient.toApiError).mockReturnValue({
      message: 'Not found',
      code: 'NOT_FOUND',
    });

    await expect(geocodeZipCode('99999')).rejects.toThrow('Location not found');
  });

  it('should format location name correctly', async () => {
    const mockResponse = {
      'post code': '94102',
      country: 'United States',
      'country abbreviation': 'US',
      places: [
        {
          'place name': 'San Francisco',
          longitude: '-122.4194',
          latitude: '37.7749',
          state: 'California',
          'state abbreviation': 'CA',
        },
      ],
    };

    vi.mocked(httpClient.httpGet).mockResolvedValue(mockResponse);

    const result = await geocodeZipCode('94102');

    expect(result.coordinates.displayName).toBe('San Francisco, CA');
  });
});

