/**
 * Validation utilities for user input
 */

/**
 * Validates a US zip code
 * @param zipCode - The zip code string to validate
 * @returns true if valid, false otherwise
 */
export function validateZipCode(zipCode: string): boolean {
  // Must be exactly 5 characters
  if (zipCode.length !== 5) {
    return false;
  }

  // Must be all numeric
  if (!/^\d{5}$/.test(zipCode)) {
    return false;
  }

  // Should not be all zeros
  if (zipCode === '00000') {
    return false;
  }

  return true;
}

/**
 * Formats a zip code by removing non-numeric characters and limiting to 5 digits
 * @param input - Raw input string
 * @returns Formatted zip code string (max 5 digits)
 */
export function formatZipCode(input: string): string {
  // Remove all non-numeric characters
  const numericOnly = input.replace(/\D/g, '');
  
  // Limit to 5 digits
  return numericOnly.slice(0, 5);
}

/**
 * Gets a user-friendly validation error message
 * @param zipCode - The zip code that failed validation
 * @returns Error message string
 */
export function getZipCodeErrorMessage(zipCode: string): string {
  if (!zipCode || zipCode.length === 0) {
    return 'Please enter a zip code';
  }

  if (zipCode.length < 5) {
    return 'Zip code must be 5 digits';
  }

  if (!/^\d+$/.test(zipCode)) {
    return 'Zip code must contain only numbers';
  }

  if (zipCode === '00000') {
    return 'Please enter a valid zip code';
  }

  return 'Invalid zip code';
}

