/**
 * Error Message Component
 * Displays user-friendly error messages with optional retry
 */
export class ErrorMessage {
  private container: HTMLElement;
  private errorElement: HTMLDivElement;
  private isVisible = false;
  private autoDismissTimeout?: number;
  private retryCallback?: () => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.errorElement = document.createElement('div');
    this.initialize();
  }

  private initialize(): void {
    this.errorElement.className = 'error-message';
    this.errorElement.setAttribute('data-testid', 'error-message');
    this.errorElement.setAttribute('role', 'alert');
    this.errorElement.setAttribute('aria-live', 'assertive');

    // Initially hidden
    this.hide();

    this.container.appendChild(this.errorElement);
  }

  /**
   * Display an error message
   * @param message - Error message to display
   * @param showRetry - Whether to show retry button
   * @param autoDismiss - Auto dismiss after 5 seconds
   */
  public show(message: string, showRetry = false, autoDismiss = false): void {
    // Clear any existing auto-dismiss timeout
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
    }

    this.errorElement.innerHTML = `
      <div class="error-message__content">
        <div class="error-message__icon">⚠️</div>
        <div class="error-message__text">
          ${this.escapeHtml(message)}
        </div>
        <div class="error-message__actions">
          ${showRetry ? '<button class="error-message__retry" data-action="retry">Try Again</button>' : ''}
          <button class="error-message__close" data-action="close" aria-label="Close error message">×</button>
        </div>
      </div>
    `;

    // Attach event listeners
    this.attachEventListeners();

    // Show the error
    if (!this.isVisible) {
      this.errorElement.style.display = 'block';
      // Trigger reflow for animation
      this.errorElement.offsetHeight;
      this.errorElement.classList.add('error-message--visible');
      this.isVisible = true;
    }

    // Auto dismiss if requested
    if (autoDismiss) {
      this.autoDismissTimeout = window.setTimeout(() => {
        this.hide();
      }, 5000);
    }
  }

  /**
   * Hide the error message
   */
  public hide(): void {
    if (this.isVisible) {
      this.errorElement.classList.remove('error-message--visible');
      // Wait for fade out animation before hiding
      setTimeout(() => {
        this.errorElement.style.display = 'none';
        this.errorElement.innerHTML = '';
      }, 300);
      this.isVisible = false;
    }

    // Clear auto-dismiss timeout
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
    }
  }

  /**
   * Set callback for retry button
   */
  public onRetry(callback: () => void): void {
    this.retryCallback = callback;
  }

  /**
   * Attach event listeners to buttons
   */
  private attachEventListeners(): void {
    const closeButton = this.errorElement.querySelector('[data-action="close"]');
    const retryButton = this.errorElement.querySelector('[data-action="retry"]');

    if (closeButton) {
      closeButton.addEventListener('click', () => this.hide());
    }

    if (retryButton && this.retryCallback) {
      retryButton.addEventListener('click', () => {
        this.hide();
        if (this.retryCallback) {
          this.retryCallback();
        }
      });
    }
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
   * Check if error is currently visible
   */
  public isShowing(): boolean {
    return this.isVisible;
  }
}

