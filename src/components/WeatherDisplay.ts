import { WeatherData } from '../types/weather.types';
import { getWeatherIcon, getIconDescription } from '../utils/weather-icons';

/**
 * Weather Display Component
 * Shows weather information in a beautiful card
 */
export class WeatherDisplay {
  private container: HTMLElement;
  private displayElement: HTMLDivElement;
  private isVisible = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.displayElement = document.createElement('div');
    this.initialize();
  }

  private initialize(): void {
    this.displayElement.className = 'weather-display';
    this.displayElement.setAttribute('data-testid', 'weather-display');
    this.displayElement.setAttribute('role', 'region');
    this.displayElement.setAttribute('aria-label', 'Weather information');
    
    // Initially hidden
    this.hide();
    
    this.container.appendChild(this.displayElement);
  }

  /**
   * Display weather data
   * @param weather - Weather data to display
   */
  public display(weather: WeatherData): void {
    const icon = getWeatherIcon(weather.conditions);
    const iconDescription = getIconDescription(icon);

    this.displayElement.innerHTML = `
      <div class="weather-card">
        <!-- Location Header -->
        <div class="weather-header">
          <h2 class="weather-location" data-testid="weather-location">
            ${this.escapeHtml(weather.location)}
          </h2>
          <p class="weather-zip">ZIP: ${weather.zipCode}</p>
        </div>

        <!-- Main Temperature Display -->
        <div class="weather-main">
          <div class="weather-icon" role="img" aria-label="${iconDescription}">
            ${icon}
          </div>
          <div class="weather-temp-group">
            <div class="weather-temperature" data-testid="weather-temperature">
              ${weather.temperature}°${weather.temperatureUnit}
            </div>
            <div class="weather-conditions" data-testid="weather-conditions">
              ${this.escapeHtml(weather.conditions)}
            </div>
          </div>
        </div>

        <!-- Weather Details Grid -->
        <div class="weather-details">
          <div class="weather-detail-card">
            <div class="weather-detail-label">Feels Like</div>
            <div class="weather-detail-value" data-testid="feels-like">
              ${weather.feelsLike}°${weather.temperatureUnit}
            </div>
          </div>
          
          <div class="weather-detail-card">
            <div class="weather-detail-label">Humidity</div>
            <div class="weather-detail-value" data-testid="humidity">
              ${weather.humidity}%
            </div>
          </div>
          
          <div class="weather-detail-card">
            <div class="weather-detail-label">Wind</div>
            <div class="weather-detail-value" data-testid="wind">
              ${weather.windSpeed} mph ${weather.windDirection}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="weather-footer">
          <p class="weather-timestamp">
            Updated: ${this.formatTime(weather.timestamp)}
          </p>
          <p class="weather-source">
            Data from National Weather Service
          </p>
        </div>
      </div>
    `;

    this.show();
  }

  /**
   * Show the weather display with animation
   */
  private show(): void {
    if (!this.isVisible) {
      this.displayElement.style.display = 'block';
      // Trigger reflow for animation
      this.displayElement.offsetHeight;
      this.displayElement.classList.add('weather-display--visible');
      this.isVisible = true;
    }
  }

  /**
   * Hide the weather display
   */
  public hide(): void {
    this.displayElement.style.display = 'none';
    this.displayElement.classList.remove('weather-display--visible');
    this.isVisible = false;
  }

  /**
   * Clear the weather display
   */
  public clear(): void {
    this.displayElement.innerHTML = '';
    this.hide();
  }

  /**
   * Escape HTML to prevent XSS
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Format timestamp for display
   */
  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

