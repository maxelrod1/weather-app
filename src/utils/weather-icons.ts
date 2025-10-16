/**
 * Weather icon utilities
 * Maps weather conditions to emoji/unicode icons
 */

/**
 * Get weather icon emoji based on condition description
 * @param conditions - Weather condition string from API
 * @returns Emoji representing the weather
 */
export function getWeatherIcon(conditions: string): string {
  const condition = conditions.toLowerCase();

  // Clear/Sunny
  if (condition.includes('sunny') || condition.includes('clear')) {
    return '☀️';
  }

  // Partly Cloudy
  if (condition.includes('partly cloudy') || condition.includes('partly sunny')) {
    return '⛅';
  }

  // Cloudy/Overcast
  if (condition.includes('cloudy') || condition.includes('overcast')) {
    return '☁️';
  }

  // Rain
  if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
    if (condition.includes('light')) {
      return '🌦️';
    }
    return '🌧️';
  }

  // Thunderstorm
  if (condition.includes('thunder') || condition.includes('storm')) {
    return '⛈️';
  }

  // Snow
  if (condition.includes('snow') || condition.includes('flurr')) {
    return '🌨️';
  }

  // Fog/Mist
  if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) {
    return '🌫️';
  }

  // Windy
  if (condition.includes('wind') || condition.includes('breezy')) {
    return '💨';
  }

  // Night (if applicable)
  if (condition.includes('night')) {
    return '🌙';
  }

  // Default - partly cloudy
  return '⛅';
}

/**
 * Get a description of what the icon represents (for accessibility)
 * @param icon - The emoji icon
 * @returns Text description
 */
export function getIconDescription(icon: string): string {
  const iconMap: Record<string, string> = {
    '☀️': 'Sunny',
    '⛅': 'Partly Cloudy',
    '☁️': 'Cloudy',
    '🌦️': 'Light Rain',
    '🌧️': 'Rain',
    '⛈️': 'Thunderstorm',
    '🌨️': 'Snow',
    '🌫️': 'Fog',
    '💨': 'Windy',
    '🌙': 'Night',
  };

  return iconMap[icon] || 'Weather';
}

