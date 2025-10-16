# Coding Standards

## Critical Rules

- **Service Layer for API Calls:** Never make direct fetch() calls from UI components - always use the service layer (`geocoding.service.ts`, `weather.service.ts`)
- **TypeScript Strict Mode:** Use strict TypeScript - all functions must have type annotations
- **Error Handling Required:** All async functions must have try-catch blocks with proper error handling
- **Component Data Attributes:** All interactive elements must have `data-testid` attributes for testing
- **No Hardcoded Values:** Use constants file for API URLs, timeout values, retry counts
- **Validation First:** Always validate user input before making API calls
- **User-Friendly Errors:** Never show raw API errors to users - transform to friendly messages

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case | `weather.service.ts` |
| Classes | PascalCase | `WeatherService` |
| Functions | camelCase | `getWeatherByZipCode()` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Types/Interfaces | PascalCase | `WeatherData` |
| CSS Classes | kebab-case | `weather-card` |
