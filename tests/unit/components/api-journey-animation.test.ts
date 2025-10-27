import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { ApiJourneyAnimation } from '../../../src/components/ApiJourneyAnimation';

describe('ApiJourneyAnimation', () => {
  let container: HTMLElement;
  let animation: ApiJourneyAnimation;

  // Mock matchMedia for all tests
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div');
    document.body.appendChild(container);
    animation = new ApiJourneyAnimation(container);
  });

  describe('Initialization', () => {
    it('should create the component in the container', () => {
      const element = container.querySelector('[data-testid="api-journey"]');
      expect(element).toBeTruthy();
    });

    it('should initialize hidden', () => {
      expect(animation.isShowing()).toBe(false);
      const element = container.querySelector('[data-testid="api-journey"]') as HTMLElement;
      expect(element.style.display).toBe('none');
    });

    it('should have correct ARIA attributes', () => {
      const element = container.querySelector('[data-testid="api-journey"]');
      expect(element?.getAttribute('role')).toBe('status');
      expect(element?.getAttribute('aria-live')).toBe('polite');
      expect(element?.hasAttribute('aria-label')).toBe(true);
    });

    it('should create all three stage elements', () => {
      const geocodingStage = container.querySelector('[data-testid="stage-geocoding"]');
      const weatherStage = container.querySelector('[data-testid="stage-weather"]');
      const completeStage = container.querySelector('[data-testid="stage-complete"]');

      expect(geocodingStage).toBeTruthy();
      expect(weatherStage).toBeTruthy();
      expect(completeStage).toBeTruthy();
    });
  });

  describe('show() method', () => {
    it('should make the component visible', () => {
      animation.show();
      
      expect(animation.isShowing()).toBe(true);
      const element = container.querySelector('[data-testid="api-journey"]') as HTMLElement;
      expect(element.style.display).toBe('flex');
      expect(element.classList.contains('api-journey--visible')).toBe(true);
    });

    it('should not duplicate show calls', () => {
      animation.show();
      animation.show();
      
      expect(animation.isShowing()).toBe(true);
    });
  });

  describe('hide() method', () => {
    it('should hide the component', async () => {
      animation.show();
      expect(animation.isShowing()).toBe(true);

      animation.hide();
      expect(animation.isShowing()).toBe(false);

      const element = container.querySelector('[data-testid="api-journey"]') as HTMLElement;
      expect(element.classList.contains('api-journey--visible')).toBe(false);
    });

    it('should eventually set display to none after animation', async () => {
      animation.show();
      animation.hide();

      // Wait for fade out animation (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));

      const element = container.querySelector('[data-testid="api-journey"]') as HTMLElement;
      expect(element.style.display).toBe('none');
    });
  });

  describe('updateStage() method', () => {
    beforeEach(() => {
      animation.show();
    });

    it('should activate geocoding stage', async () => {
      animation.updateStage('geocoding');

      // Wait for minimum stage duration (1500ms)
      await new Promise(resolve => setTimeout(resolve, 1600));

      const geocodingStage = container.querySelector('[data-stage="geocoding"]');
      expect(geocodingStage?.classList.contains('api-journey__stage--active')).toBe(true);
    });

    it('should transition from geocoding to weather stage', async () => {
      animation.updateStage('geocoding');
      await new Promise(resolve => setTimeout(resolve, 1600));

      animation.updateStage('weather');
      await new Promise(resolve => setTimeout(resolve, 1600));

      const weatherStage = container.querySelector('[data-stage="weather"]');
      expect(weatherStage?.classList.contains('api-journey__stage--active')).toBe(true);

      const geocodingStage = container.querySelector('[data-stage="geocoding"]');
      expect(geocodingStage?.classList.contains('api-journey__stage--completed')).toBe(true);
    });

    it('should transition to complete stage', async () => {
      animation.updateStage('geocoding');
      await new Promise(resolve => setTimeout(resolve, 1600));

      animation.updateStage('weather');
      await new Promise(resolve => setTimeout(resolve, 1600));

      animation.updateStage('complete');
      await new Promise(resolve => setTimeout(resolve, 1600));

      const completeStage = container.querySelector('[data-stage="complete"]');
      expect(completeStage?.classList.contains('api-journey__stage--active')).toBe(true);

      const geocodingStage = container.querySelector('[data-stage="geocoding"]');
      const weatherStage = container.querySelector('[data-stage="weather"]');
      expect(geocodingStage?.classList.contains('api-journey__stage--completed')).toBe(true);
      expect(weatherStage?.classList.contains('api-journey__stage--completed')).toBe(true);
    });

    it('should update ARIA label when stage changes', async () => {
      const element = container.querySelector('[data-testid="api-journey"]');

      animation.updateStage('geocoding');
      await new Promise(resolve => setTimeout(resolve, 1600));

      const ariaLabel = element?.getAttribute('aria-label');
      expect(ariaLabel).toContain('Looking up your location');
    });
  });

  describe('reset() method', () => {
    it('should reset to idle state', async () => {
      animation.show();
      animation.updateStage('geocoding');
      await new Promise(resolve => setTimeout(resolve, 1600));

      animation.updateStage('weather');
      await new Promise(resolve => setTimeout(resolve, 1600));

      animation.reset();

      // Check that no stages are active
      const stages = container.querySelectorAll('.api-journey__stage');
      stages.forEach(stage => {
        expect(stage.classList.contains('api-journey__stage--active')).toBe(false);
        expect(stage.classList.contains('api-journey__stage--completed')).toBe(false);
      });

      // Check ARIA label is reset
      const element = container.querySelector('[data-testid="api-journey"]');
      const ariaLabel = element?.getAttribute('aria-label');
      expect(ariaLabel).toContain('Ready');
    });
  });

  describe('isShowing() method', () => {
    it('should return false when hidden', () => {
      expect(animation.isShowing()).toBe(false);
    });

    it('should return true when visible', () => {
      animation.show();
      expect(animation.isShowing()).toBe(true);
    });

    it('should return false after hide', () => {
      animation.show();
      animation.hide();
      expect(animation.isShowing()).toBe(false);
    });
  });

  describe('Stage labels and icons', () => {
    it('should display correct label for geocoding stage', () => {
      const geocodingStage = container.querySelector('[data-stage="geocoding"]');
      const label = geocodingStage?.querySelector('.api-journey__stage-label');
      expect(label?.textContent).toContain('Looking up your location');
    });

    it('should display correct label for weather stage', () => {
      const weatherStage = container.querySelector('[data-stage="weather"]');
      const label = weatherStage?.querySelector('.api-journey__stage-label');
      expect(label?.textContent).toContain('Getting weather data');
    });

    it('should display correct label for complete stage', () => {
      const completeStage = container.querySelector('[data-stage="complete"]');
      const label = completeStage?.querySelector('.api-journey__stage-label');
      expect(label?.textContent).toContain('Complete');
    });

    it('should display icons for all stages', () => {
      const geocodingIcon = container.querySelector('[data-stage="geocoding"] .api-journey__stage-icon');
      const weatherIcon = container.querySelector('[data-stage="weather"] .api-journey__stage-icon');
      const completeIcon = container.querySelector('[data-stage="complete"] .api-journey__stage-icon');

      expect(geocodingIcon?.textContent).toBeTruthy();
      expect(weatherIcon?.textContent).toBeTruthy();
      expect(completeIcon?.textContent).toBeTruthy();
    });
  });

  describe('Data attributes for testing', () => {
    it('should have data-testid on main element', () => {
      const element = container.querySelector('[data-testid="api-journey"]');
      expect(element).toBeTruthy();
    });

    it('should have data-testid on all stages', () => {
      const geocodingStage = container.querySelector('[data-testid="stage-geocoding"]');
      const weatherStage = container.querySelector('[data-testid="stage-weather"]');
      const completeStage = container.querySelector('[data-testid="stage-complete"]');

      expect(geocodingStage).toBeTruthy();
      expect(weatherStage).toBeTruthy();
      expect(completeStage).toBeTruthy();
    });

    it('should have data-stage attributes', () => {
      const geocodingStage = container.querySelector('[data-stage="geocoding"]');
      const weatherStage = container.querySelector('[data-stage="weather"]');
      const completeStage = container.querySelector('[data-stage="complete"]');

      expect(geocodingStage?.getAttribute('data-stage')).toBe('geocoding');
      expect(weatherStage?.getAttribute('data-stage')).toBe('weather');
      expect(completeStage?.getAttribute('data-stage')).toBe('complete');
    });
  });
});

