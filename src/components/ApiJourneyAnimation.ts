/**
 * API Journey Animation Component
 * 
 * EDUCATIONAL NOTE: Sequential Async Operations Visualization
 * 
 * This component demonstrates how to visualize a multi-step async process:
 * 1. Track current stage in component state
 * 2. Update UI when stage changes
 * 3. Use minimum display times for educational clarity
 * 4. Handle errors at any stage gracefully
 * 
 * This pattern is useful for any sequential API calls, data processing
 * pipelines, or multi-step workflows where user feedback is important.
 * 
 * Key Concepts Demonstrated:
 * - State-driven animations
 * - Progressive disclosure of system behavior
 * - Accessibility-first design (reduced motion, screen readers)
 * - Performance-optimized animations (GPU-accelerated transforms)
 */

/**
 * Possible stages in the API journey
 */
export type JourneyStage = 'idle' | 'geocoding' | 'weather' | 'complete';

/**
 * Configuration for each stage of the journey
 */
interface StageConfig {
  stage: JourneyStage;
  label: string;
  icon: string;
  ariaLabel: string;
}

/**
 * Constants for animation timing and stage configurations
 */
const MINIMUM_STAGE_DURATION = 1500; // 1.5 seconds per stage (educational pace)
const FADE_OUT_DURATION = 300; // milliseconds

/**
 * Stage configurations with user-friendly labels and icons
 */
const STAGE_CONFIGS: Record<JourneyStage, StageConfig> = {
  idle: {
    stage: 'idle',
    label: 'Ready',
    icon: '📍',
    ariaLabel: 'Ready to fetch weather',
  },
  geocoding: {
    stage: 'geocoding',
    label: 'Looking up your location...',
    icon: '🗺️',
    ariaLabel: 'Step 1 of 3: Looking up your location',
  },
  weather: {
    stage: 'weather',
    label: 'Getting weather data...',
    icon: '☁️',
    ariaLabel: 'Step 2 of 3: Getting weather data',
  },
  complete: {
    stage: 'complete',
    label: 'Complete!',
    icon: '✅',
    ariaLabel: 'Complete: Weather data loaded',
  },
};

/**
 * ApiJourneyAnimation Component
 * 
 * Displays an animated visualization of the API call journey,
 * showing geocoding → weather → complete stages with smooth transitions.
 */
export class ApiJourneyAnimation {
  private container: HTMLElement;
  private element: HTMLDivElement;
  private isVisible = false;
  private stageStartTime = 0;
  private stageQueue: Array<{ stage: JourneyStage; resolve: () => void }> = [];
  private isTransitioning = false;
  private isFirstStage = true;

  constructor(container: HTMLElement) {
    this.container = container;
    this.element = document.createElement('div');
    
    this.initialize();
  }

  /**
   * Initialize the component's DOM structure and styles
   */
  private initialize(): void {
    this.element.className = 'api-journey';
    this.element.setAttribute('data-testid', 'api-journey');
    this.element.setAttribute('role', 'status');
    this.element.setAttribute('aria-live', 'polite');
    this.element.setAttribute('aria-label', STAGE_CONFIGS.idle.ariaLabel);

    // Create the journey visualization
    this.element.innerHTML = `
      <div class="api-journey__overlay">
        <div class="api-journey__content">
          <div class="api-journey__stages">
            ${this.createStageElement('geocoding')}
            ${this.createStageElement('weather')}
            ${this.createStageElement('complete')}
          </div>
        </div>
      </div>
    `;

    // Initially hidden
    this.element.style.display = 'none';

    this.container.appendChild(this.element);
  }

  /**
   * Create HTML for a single stage element
   */
  private createStageElement(stage: JourneyStage): string {
    const config = STAGE_CONFIGS[stage];
    return `
      <div class="api-journey__stage" data-stage="${stage}" data-testid="stage-${stage}">
        <div class="api-journey__stage-icon">${config.icon}</div>
        <div class="api-journey__stage-label">${config.label}</div>
        ${stage !== 'complete' ? '<div class="api-journey__stage-arrow">→</div>' : ''}
      </div>
    `;
  }

  /**
   * Show the animation
   */
  public show(): void {
    if (!this.isVisible) {
      // Reset to clean state
      this.reset();
      
      this.element.style.display = 'flex';
      // Trigger reflow for animation
      this.element.offsetHeight;
      this.element.classList.add('api-journey--visible');
      this.isVisible = true;
      this.stageStartTime = performance.now();
    }
  }

  /**
   * Hide the animation with smooth fade-out
   */
  public hide(): void {
    if (this.isVisible) {
      this.element.classList.remove('api-journey--visible');
      // Wait for fade out animation before hiding
      setTimeout(() => {
        this.element.style.display = 'none';
      }, FADE_OUT_DURATION);
      this.isVisible = false;
    }
  }

  /**
   * Update to a new stage in the journey
   * 
   * EDUCATIONAL NOTE: Timing Coordination
   * 
   * This method ensures each stage displays for a minimum duration
   * to give users time to see and understand what's happening.
   * Even if the API call completes quickly, we hold the stage
   * display for educational value.
   * 
   * Uses a queue system to ensure stages transition sequentially
   * even when API calls complete instantly (due to caching).
   * 
   * @param stage - The new stage to transition to
   * @returns Promise that resolves when the stage is activated
   */
  public async updateStage(stage: JourneyStage): Promise<void> {
    return new Promise((resolve) => {
      // Add to queue
      this.stageQueue.push({ stage, resolve });
      
      // Process queue if not already processing
      if (!this.isTransitioning) {
        this.processStageQueue();
      }
    });
  }

  /**
   * Process the stage queue sequentially
   */
  private async processStageQueue(): Promise<void> {
    if (this.stageQueue.length === 0) {
      this.isTransitioning = false;
      return;
    }

    this.isTransitioning = true;
    const { stage, resolve } = this.stageQueue.shift()!;

    // Calculate elapsed time since last stage started
    const elapsed = performance.now() - this.stageStartTime;
    
    // First stage activates immediately, all others must wait minimum duration
    const remainingTime = this.isFirstStage ? 0 : Math.max(0, MINIMUM_STAGE_DURATION - elapsed);

    // Wait for minimum duration
    await new Promise(r => setTimeout(r, remainingTime));

    // Activate the stage
    this.activateStage(stage);
    this.stageStartTime = performance.now();
    this.isFirstStage = false;

    // Update ARIA label for screen readers
    const config = STAGE_CONFIGS[stage];
    this.element.setAttribute('aria-label', config.ariaLabel);

    // Resolve this stage's promise
    resolve();

    // Process next stage in queue (await to ensure sequential processing)
    await this.processStageQueue();
  }

  /**
   * Activate a specific stage visually
   */
  private activateStage(stage: JourneyStage): void {
    // Remove active class from all stages
    const stages = this.element.querySelectorAll('.api-journey__stage');
    stages.forEach((stageEl) => {
      stageEl.classList.remove('api-journey__stage--active');
      stageEl.classList.remove('api-journey__stage--completed');
    });

    // Find and activate the current stage
    const currentStageEl = this.element.querySelector(`[data-stage="${stage}"]`);
    if (currentStageEl) {
      currentStageEl.classList.add('api-journey__stage--active');
    }

    // Mark previous stages as completed
    if (stage === 'weather' || stage === 'complete') {
      const geocodingStage = this.element.querySelector('[data-stage="geocoding"]');
      if (geocodingStage) {
        geocodingStage.classList.add('api-journey__stage--completed');
      }
    }
    if (stage === 'complete') {
      const weatherStage = this.element.querySelector('[data-stage="weather"]');
      if (weatherStage) {
        weatherStage.classList.add('api-journey__stage--completed');
      }
    }
  }

  /**
   * Reset the animation to initial state
   */
  public reset(): void {
    this.stageStartTime = 0;
    this.stageQueue = [];
    this.isTransitioning = false;
    this.isFirstStage = true;
    
    // Remove all active/completed classes
    const stages = this.element.querySelectorAll('.api-journey__stage');
    stages.forEach((stageEl) => {
      stageEl.classList.remove('api-journey__stage--active');
      stageEl.classList.remove('api-journey__stage--completed');
    });

    this.element.setAttribute('aria-label', STAGE_CONFIGS.idle.ariaLabel);
  }

  /**
   * Check if the animation is currently visible
   */
  public isShowing(): boolean {
    return this.isVisible;
  }
}

