/**
 * User-friendly error message utilities
 */

/**
 * Get user-friendly error message based on error type
 * @param error - Error object or message
 * @returns User-friendly error message
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Network errors
    if (message.includes('network') || message.includes('connection')) {
      return "Can't connect to the internet. Please check your connection and try again.";
    }

    // Geocoding errors
    if (message.includes('location not found') || message.includes('invalid zip')) {
      return "We couldn't find that zip code. Please check and try again.";
    }

    if (message.includes('geocoding')) {
      return 'Having trouble finding that location. Please try a different zip code.';
    }

    // Weather service errors
    if (message.includes('weather data not available')) {
      return 'Weather data is not available for this location right now.';
    }

    if (message.includes('temporarily unavailable')) {
      return 'The weather service is temporarily busy. Please try again in a moment.';
    }

    if (message.includes('timeout')) {
      return 'The request is taking too long. Please try again.';
    }

    // Return the original message if it's already user-friendly
    if (!message.includes('failed') && !message.includes('error')) {
      return error.message;
    }
  }

  // Generic fallback
  return 'Something went wrong. Please try again.';
}

/**
 * Determine if an error is retryable
 * @param error - Error object
 * @returns True if the user can retry
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // These errors can be retried
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('temporarily') ||
      message.includes('busy')
    );
  }
  
  return true; // Default to allowing retry
}

