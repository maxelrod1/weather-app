import './styles/index.css';

console.log('Weather App Initialized');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  
  if (!app) {
    console.error('App element not found');
    return;
  }
  
  // Remove loading message
  const loadingElement = app.querySelector('.loading');
  if (loadingElement) {
    loadingElement.textContent = 'Weather app is ready!';
  }
  
  console.log('App loaded successfully');
});

