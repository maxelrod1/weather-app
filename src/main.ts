import './styles/index.css';
import { WeatherForm } from './components/WeatherForm';

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
  weatherForm.onSubmit((zipCode) => {
    console.log('Zip code submitted:', zipCode);
    // TODO: Story 1.3 will implement actual weather fetching
    alert(`Weather lookup for zip code: ${zipCode}\n\n(API integration coming in Story 1.3)`);
  });
});

