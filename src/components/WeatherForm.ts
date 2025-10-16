import { validateZipCode, formatZipCode } from '../utils/validation';

/**
 * Weather Form Component
 * Handles zip code input and form submission
 */
export class WeatherForm {
  private container: HTMLElement;
  private formElement: HTMLFormElement;
  private inputElement: HTMLInputElement;
  private buttonElement: HTMLButtonElement;
  private errorElement: HTMLParagraphElement;
  private submitCallback: ((zipCode: string) => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.formElement = document.createElement('form');
    this.inputElement = document.createElement('input');
    this.buttonElement = document.createElement('button');
    this.errorElement = document.createElement('p');
    
    this.initialize();
  }

  private initialize(): void {
    this.createForm();
    this.attachEventListeners();
    this.render();
    this.focusInput();
  }

  private createForm(): void {
    // Form setup
    this.formElement.className = 'weather-form';
    this.formElement.setAttribute('data-testid', 'weather-form');

    // Input field setup
    this.inputElement.type = 'text';
    this.inputElement.inputMode = 'numeric';
    this.inputElement.placeholder = 'Enter ZIP code';
    this.inputElement.maxLength = 5;
    this.inputElement.className = 'weather-form__input';
    this.inputElement.setAttribute('data-testid', 'zip-input');
    this.inputElement.setAttribute('aria-label', 'Zip code input');
    this.inputElement.setAttribute('aria-describedby', 'zip-error');

    // Submit button setup
    this.buttonElement.type = 'submit';
    this.buttonElement.textContent = 'Get Weather';
    this.buttonElement.className = 'weather-form__button';
    this.buttonElement.setAttribute('data-testid', 'submit-button');
    this.buttonElement.disabled = true;

    // Error message setup
    this.errorElement.id = 'zip-error';
    this.errorElement.className = 'weather-form__error';
    this.errorElement.setAttribute('data-testid', 'error-message');
    this.errorElement.setAttribute('role', 'alert');
    this.errorElement.setAttribute('aria-live', 'polite');

    // Assemble form
    this.formElement.appendChild(this.inputElement);
    this.formElement.appendChild(this.buttonElement);
    this.formElement.appendChild(this.errorElement);
  }

  private attachEventListeners(): void {
    // Input event - format and validate as user types
    this.inputElement.addEventListener('input', () => {
      const formatted = formatZipCode(this.inputElement.value);
      this.inputElement.value = formatted;
      this.updateButtonState();
      this.clearError();
    });

    // Form submit event
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });

    // Prevent non-numeric input
    this.inputElement.addEventListener('keypress', (event) => {
      if (!/\d/.test(event.key) && event.key !== 'Enter') {
        event.preventDefault();
      }
    });
  }

  private updateButtonState(): void {
    const zipCode = this.inputElement.value;
    const isValid = validateZipCode(zipCode);
    this.buttonElement.disabled = !isValid;
    
    // Update visual state
    if (isValid) {
      this.buttonElement.classList.remove('weather-form__button--disabled');
    } else {
      this.buttonElement.classList.add('weather-form__button--disabled');
    }
  }

  private handleSubmit(): void {
    const zipCode = this.inputElement.value;
    
    if (!validateZipCode(zipCode)) {
      this.showError('Please enter a valid 5-digit zip code');
      return;
    }

    this.clearError();

    if (this.submitCallback) {
      this.submitCallback(zipCode);
    }
  }

  private showError(message: string): void {
    this.errorElement.textContent = message;
    this.errorElement.style.display = 'block';
    this.inputElement.setAttribute('aria-invalid', 'true');
  }

  private clearError(): void {
    this.errorElement.textContent = '';
    this.errorElement.style.display = 'none';
    this.inputElement.removeAttribute('aria-invalid');
  }

  private focusInput(): void {
    // Focus after a brief delay to ensure rendering is complete
    setTimeout(() => {
      this.inputElement.focus();
    }, 100);
  }

  private render(): void {
    this.container.innerHTML = '';
    this.container.appendChild(this.formElement);
  }

  /**
   * Register callback for form submission
   * @param callback - Function to call when form is submitted with valid zip code
   */
  public onSubmit(callback: (zipCode: string) => void): void {
    this.submitCallback = callback;
  }

  /**
   * Get the current input value
   */
  public getValue(): string {
    return this.inputElement.value;
  }

  /**
   * Clear the form
   */
  public clear(): void {
    this.inputElement.value = '';
    this.updateButtonState();
    this.clearError();
  }
}

