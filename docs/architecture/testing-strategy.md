# Testing Strategy

## Testing Pyramid

```plaintext
        E2E Tests (5%)
       /              \
    Integration (15%)
   /                  \
  Unit Tests (80%)
```

## Test Organization

### Unit Tests

```plaintext
tests/unit/
├── services/
│   ├── geocoding.service.test.ts    # Test geocoding API calls
│   └── weather.service.test.ts      # Test weather API calls
└── utils/
    ├── validation.test.ts           # Test zip code validation
    └── formatters.test.ts           # Test data formatting
```

### Integration Tests

```plaintext
tests/integration/
└── weather-flow.test.ts             # Test complete weather lookup flow
```

### E2E Tests

```plaintext
tests/e2e/
└── weather-app.spec.ts              # Test user journey end-to-end
```

## Test Examples

### Unit Test Example

```typescript
// tests/unit/utils/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validateZipCode } from '@/utils/validation';

describe('validateZipCode', () => {
  it('should return true for valid 5-digit zip code', () => {
    expect(validateZipCode('12345')).toBe(true);
    expect(validateZipCode('90210')).toBe(true);
  });

  it('should return false for invalid zip codes', () => {
    expect(validateZipCode('1234')).toBe(false);    // Too short
    expect(validateZipCode('123456')).toBe(false);  // Too long
    expect(validateZipCode('abcde')).toBe(false);   // Not numeric
    expect(validateZipCode('')).toBe(false);        // Empty
  });
});
```

### Integration Test Example

```typescript
// tests/integration/weather-flow.test.ts
import { describe, it, expect, vi } from 'vitest';
import { getWeatherByZipCode } from '@/services/weather.service';

describe('Weather Lookup Flow', () => {
  it('should fetch weather data for valid zip code', async () => {
    const zipCode = '10001'; // NYC
    const result = await getWeatherByZipCode(zipCode);

    expect(result).toBeDefined();
    expect(result.location).toContain('New York');
    expect(result.temperature).toBeTypeOf('number');
    expect(result.conditions).toBeTypeOf('string');
  });

  it('should throw error for invalid zip code', async () => {
    await expect(getWeatherByZipCode('00000')).rejects.toThrow();
  });
});
```

### E2E Test Example

```typescript
// tests/e2e/weather-app.spec.ts
import { test, expect } from '@playwright/test';

test('user can search weather by zip code', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Enter zip code
  const input = page.locator('input[placeholder*="ZIP"]');
  await input.fill('10001');

  // Click submit button
  const submitButton = page.locator('button:has-text("Get Weather")');
  await submitButton.click();

  // Wait for results
  await page.waitForSelector('[data-testid="weather-results"]', { timeout: 5000 });

  // Verify weather data is displayed
  const location = page.locator('[data-testid="location"]');
  await expect(location).toContainText('New York');

  const temperature = page.locator('[data-testid="temperature"]');
  await expect(temperature).toBeVisible();
});

test('user sees error for invalid zip code', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const input = page.locator('input[placeholder*="ZIP"]');
  await input.fill('999');

  const submitButton = page.locator('button:has-text("Get Weather")');
  await submitButton.click();

  // Verify error message
  const errorMessage = page.locator('[data-testid="error-message"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('valid 5-digit');
});
```
