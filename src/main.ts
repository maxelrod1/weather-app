import './styles/index.css';
import { WeatherForm } from './components/WeatherForm';
import { WeatherDisplay } from './components/WeatherDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { geocodeZipCode } from './services/geocoding.service';
import { getWeatherByCoordinates } from './services/weather.service';
import { getUserFriendlyErrorMessage, isRetryableError } from './utils/error-messages';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  // Create components
  const weatherForm = new WeatherForm(container as HTMLElement);
  const weatherDisplay = new WeatherDisplay(container as HTMLElement);
  const loadingSpinner = new LoadingSpinner(document.body);
  const errorMessage = new ErrorMessage(container as HTMLElement);
  
  // Store last zip code for retry functionality
  let lastZipCode = '';
  
  // Weather fetch function (can be called for initial request or retry)
  const fetchWeather = async (zipCode: string) => {
    try {
      // Hide any previous errors
      errorMessage.hide();
      
      // Show loading spinner
      loadingSpinner.show();
      
      console.log('Fetching weather for:', zipCode);
      
      // Step 1: Geocode the zip code
      const geocodeResult = await geocodeZipCode(zipCode);
      console.log('Geocoded to:', geocodeResult.coordinates.displayName);
      
      // Step 2: Fetch weather data
      const weatherData = await getWeatherByCoordinates(
        geocodeResult.coordinates,
        zipCode
      );
      
      // Hide loading spinner
      loadingSpinner.hide();
      
      // Display weather data in beautiful UI
      weatherDisplay.display(weatherData);
      
    } catch (error) {
      // Hide loading spinner
      loadingSpinner.hide();
      
      // Get user-friendly error message
      const friendlyMessage = getUserFriendlyErrorMessage(error);
      
      // Determine if error is retryable
      const canRetry = isRetryableError(error);
      
      // Show error message
      errorMessage.show(friendlyMessage, canRetry);
      
      // Log for debugging
      console.error('Weather fetch error:', error);
      
      // Hide weather display on error
      weatherDisplay.hide();
    }
  };
  
  // Handle form submission
  weatherForm.onSubmit(async (zipCode) => {
    lastZipCode = zipCode;
    await fetchWeather(zipCode);
  });
  
  // Handle retry button in error message
  errorMessage.onRetry(() => {
    if (lastZipCode) {
      fetchWeather(lastZipCode);
    }
  });
});

