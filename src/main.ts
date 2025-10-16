import './styles/index.css';
import { WeatherForm } from './components/WeatherForm';
import { geocodeZipCode } from './services/geocoding.service';
import { getWeatherByCoordinates } from './services/weather.service';
import { WeatherData } from './types/weather.types';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  // Create weather form
  const weatherForm = new WeatherForm(container as HTMLElement);
  
  // Handle form submission
  weatherForm.onSubmit(async (zipCode) => {
    try {
      // Show loading state (Story 1.5 will improve this)
      console.log('Fetching weather for:', zipCode);
      
      // Step 1: Geocode the zip code
      const geocodeResult = await geocodeZipCode(zipCode);
      console.log('Geocoded to:', geocodeResult.coordinates.displayName);
      
      // Step 2: Fetch weather data
      const weatherData: WeatherData = await getWeatherByCoordinates(
        geocodeResult.coordinates,
        zipCode
      );
      
      // Display weather data (Story 1.4 will create proper UI)
      displayWeatherAlert(weatherData);
      
    } catch (error) {
      // Handle errors (Story 1.5 will improve error handling)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(`Error: ${errorMessage}`);
      console.error('Weather fetch error:', error);
    }
  });
});

/**
 * Temporary function to display weather in an alert
 * Story 1.4 will replace this with a proper UI component
 */
function displayWeatherAlert(weather: WeatherData): void {
  const message = `
🌤️ Weather for ${weather.location}

🌡️ Temperature: ${weather.temperature}°${weather.temperatureUnit}
🤔 Feels Like: ${weather.feelsLike}°${weather.temperatureUnit}
☁️ Conditions: ${weather.conditions}
💧 Humidity: ${weather.humidity}%
💨 Wind: ${weather.windSpeed} mph ${weather.windDirection}

Data from: National Weather Service
Time: ${weather.timestamp.toLocaleTimeString()}
  `.trim();
  
  alert(message);
}

