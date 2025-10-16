import { describe, it, expect } from 'vitest';
import { validateZipCode, formatZipCode, getZipCodeErrorMessage } from '@/utils/validation';

describe('validateZipCode', () => {
  describe('valid zip codes', () => {
    it('should return true for valid 5-digit zip code', () => {
      expect(validateZipCode('12345')).toBe(true);
      expect(validateZipCode('90210')).toBe(true);
      expect(validateZipCode('10001')).toBe(true);
    });
  });

  describe('invalid zip codes', () => {
    it('should return false for zip codes that are too short', () => {
      expect(validateZipCode('1234')).toBe(false);
      expect(validateZipCode('123')).toBe(false);
      expect(validateZipCode('1')).toBe(false);
    });

    it('should return false for zip codes that are too long', () => {
      expect(validateZipCode('123456')).toBe(false);
      expect(validateZipCode('1234567')).toBe(false);
    });

    it('should return false for non-numeric zip codes', () => {
      expect(validateZipCode('abcde')).toBe(false);
      expect(validateZipCode('1234a')).toBe(false);
      expect(validateZipCode('12-34')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validateZipCode('')).toBe(false);
    });

    it('should return false for all zeros', () => {
      expect(validateZipCode('00000')).toBe(false);
    });

    it('should return false for zip codes with spaces', () => {
      expect(validateZipCode('12 345')).toBe(false);
      expect(validateZipCode(' 12345')).toBe(false);
      expect(validateZipCode('12345 ')).toBe(false);
    });
  });
});

describe('formatZipCode', () => {
  it('should remove non-numeric characters', () => {
    expect(formatZipCode('abc123def')).toBe('123');
    expect(formatZipCode('12-345')).toBe('12345');
    expect(formatZipCode('12 345')).toBe('12345');
  });

  it('should limit to 5 digits', () => {
    expect(formatZipCode('123456789')).toBe('12345');
    expect(formatZipCode('1234567')).toBe('12345');
  });

  it('should handle mixed input', () => {
    expect(formatZipCode('1a2b3c4d5e6f')).toBe('12345');
    expect(formatZipCode('zip: 90210')).toBe('90210');
  });

  it('should handle empty input', () => {
    expect(formatZipCode('')).toBe('');
  });

  it('should handle already valid zip codes', () => {
    expect(formatZipCode('12345')).toBe('12345');
    expect(formatZipCode('90210')).toBe('90210');
  });
});

describe('getZipCodeErrorMessage', () => {
  it('should return appropriate message for empty zip code', () => {
    expect(getZipCodeErrorMessage('')).toBe('Please enter a zip code');
  });

  it('should return appropriate message for short zip code', () => {
    expect(getZipCodeErrorMessage('123')).toBe('Zip code must be 5 digits');
    expect(getZipCodeErrorMessage('1234')).toBe('Zip code must be 5 digits');
  });

  it('should return appropriate message for non-numeric zip code', () => {
    expect(getZipCodeErrorMessage('abcde')).toBe('Zip code must contain only numbers');
    expect(getZipCodeErrorMessage('12a45')).toBe('Zip code must contain only numbers');
  });

  it('should return appropriate message for all zeros', () => {
    expect(getZipCodeErrorMessage('00000')).toBe('Please enter a valid zip code');
  });

  it('should return generic message for other invalid cases', () => {
    // This is a catch-all for any edge cases
    const result = getZipCodeErrorMessage('999999');
    expect(result).toBeTruthy();
    expect(typeof result).toBe('string');
  });
});

