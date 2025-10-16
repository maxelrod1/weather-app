# Data Models

## WeatherData Interface

**Purpose:** Represents the complete weather information displayed to the user

**Key Attributes:**
- location: string - City, State name
- zipCode: string - User-entered zip code
- temperature: number - Current temperature in Fahrenheit
- temperatureUnit: string - "F" or "C"
- conditions: string - Weather description (e.g., "Partly Cloudy")
- humidity: number - Humidity percentage
- windSpeed: number - Wind speed in mph
- windDirection: string - Wind direction (e.g., "NW")
- feelsLike: number - Feels-like temperature
- icon: string (optional) - Weather icon URL or identifier
- timestamp: Date - When data was fetched

### TypeScript Interface

```typescript
interface WeatherData {
  location: string;
  zipCode: string;
  temperature: number;
  temperatureUnit: string;
  conditions: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  feelsLike: number;
  icon?: string;
  timestamp: Date;
}
```

### Relationships

- No database relationships (client-side only)
- Could be cached in localStorage for recent searches (future enhancement)

## Coordinates Interface

**Purpose:** Represents geographic coordinates obtained from geocoding service

**Key Attributes:**
- latitude: number - Latitude coordinate
- longitude: number - Longitude coordinate
- displayName: string - Formatted location name

### TypeScript Interface

```typescript
interface Coordinates {
  latitude: number;
  longitude: number;
  displayName: string;
}
```

## ApiError Interface

**Purpose:** Standardized error information for user feedback

**Key Attributes:**
- message: string - User-friendly error message
- code: string - Error code for debugging
- details?: any - Additional error context

### TypeScript Interface

```typescript
interface ApiError {
  message: string;
  code: string;
  details?: any;
}
```
