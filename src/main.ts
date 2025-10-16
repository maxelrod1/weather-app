import './styles/index.css';
import { WeatherForm } from './components/WeatherForm';
import { WeatherDisplay } from './components/WeatherDisplay';
import { geocodeZipCode } from './services/geocoding.service';
import { getWeatherByCoordinates } from './services/weather.service';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  // Create weather form
  const weatherForm = new WeatherForm(container as HTMLElement);
  
  // Create weather display
  const weatherDisplay = new WeatherDisplay(container as HTMLElement);
  
  // Handle form submission
  weatherForm.onSubmit(async (zipCode) => {
    try {
      // Show loading state (Story 1.5 will improve this)
      console.log('Fetching weather for:', zipCode);
      
      // Step 1: Geocode the zip code
      const geocodeResult = await geocodeZipCode(zipCode);
      console.log('Geocoded to:', geocodeResult.coordinates.displayName);
      
      // Step 2: Fetch weather data
      const weatherData = await getWeatherByCoordinates(
        geocodeResult.coordinates,
        zipCode
      );
      
      // Display weather data in beautiful UI
      weatherDisplay.display(weatherData);
      
    } catch (error) {
      // Handle errors (Story 1.5 will improve error handling)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(`Error: ${errorMessage}`);
      console.error('Weather fetch error:', error);
      
      // Hide weather display on error
      weatherDisplay.hide();
    }
  });
});

