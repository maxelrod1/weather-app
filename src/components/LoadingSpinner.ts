/**
 * Loading Spinner Component
 * Shows a loading indicator during async operations
 */
export class LoadingSpinner {
  private container: HTMLElement;
  private spinnerElement: HTMLDivElement;
  private isVisible = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.spinnerElement = document.createElement('div');
    this.initialize();
  }

  private initialize(): void {
    this.spinnerElement.className = 'loading-spinner';
    this.spinnerElement.setAttribute('data-testid', 'loading-spinner');
    this.spinnerElement.setAttribute('role', 'status');
    this.spinnerElement.setAttribute('aria-live', 'polite');
    this.spinnerElement.setAttribute('aria-label', 'Loading weather data');

    this.spinnerElement.innerHTML = `
      <div class="loading-spinner__overlay">
        <div class="loading-spinner__content">
          <div class="loading-spinner__circle"></div>
          <p class="loading-spinner__text">Fetching weather data...</p>
        </div>
      </div>
    `;

    // Initially hidden
    this.hide();

    this.container.appendChild(this.spinnerElement);
  }

  /**
   * Show the loading spinner
   */
  public show(): void {
    if (!this.isVisible) {
      this.spinnerElement.style.display = 'flex';
      // Trigger reflow for animation
      this.spinnerElement.offsetHeight;
      this.spinnerElement.classList.add('loading-spinner--visible');
      this.isVisible = true;
    }
  }

  /**
   * Hide the loading spinner
   */
  public hide(): void {
    if (this.isVisible) {
      this.spinnerElement.classList.remove('loading-spinner--visible');
      // Wait for fade out animation before hiding
      setTimeout(() => {
        this.spinnerElement.style.display = 'none';
      }, 300);
      this.isVisible = false;
    }
  }

  /**
   * Check if spinner is currently visible
   */
  public isShowing(): boolean {
    return this.isVisible;
  }
}

