# External APIs

## Zippopotam.us Geocoding API

- **Purpose:** Convert US zip codes to geographic coordinates (latitude/longitude)
- **Documentation:** https://www.zippopotam.us/
- **Base URL(s):** `https://api.zippopotam.us/us`
- **Authentication:** None required (public API)
- **Rate Limits:** Fair use policy, no strict limits
- **CORS:** Enabled (works from browser)

**Key Endpoints Used:**
- `GET /us/{zipcode}` - Get location data for US zip code

**Integration Notes:** Zippopotam.us is a free, no-registration geocoding API that works perfectly for zip code lookups. It supports CORS, making it ideal for browser-based applications. Returns city name, state, latitude, and longitude.

## National Weather Service API

- **Purpose:** Fetch current weather conditions, forecasts, and location data for US zip codes
- **Documentation:** https://www.weather.gov/documentation/services-web-api
- **Base URL(s):** `https://api.weather.gov`
- **Authentication:** None required (public API)
- **Rate Limits:** No strict limits, but requests should include User-Agent header as per API guidelines

**Key Endpoints Used:**
- `GET /points/{latitude},{longitude}` - Get forecast URLs for coordinates
- `GET /gridpoints/{office}/{gridX},{gridY}/forecast` - Get detailed forecast
- `GET /gridpoints/{office}/{gridX},{gridY}` - Get current conditions and observations

**Integration Notes:** The NWS API requires latitude/longitude coordinates, not zip codes directly. We'll need a geocoding solution:

## Geocoding Solution (Zip to Lat/Lon)

**Option 1 - US Census Geocoding API (Recommended):**
- **Purpose:** Convert US zip codes to latitude/longitude
- **Documentation:** https://geocoding.geo.census.gov/geocoder/
- **Base URL(s):** `https://geocoding.geo.census.gov/geocoder/locations/`
- **Authentication:** None required (public API)
- **Rate Limits:** Reasonable use policy, no strict limits
- **Key Endpoint:** `GET /onelineaddress?address={zipcode}&benchmark=2020&format=json`

**Option 2 - OpenStreetMap Nominatim (Fallback):**
- **Base URL:** `https://nominatim.openstreetmap.org/`
- **Authentication:** None, but requires User-Agent header
- **Rate Limits:** 1 request/second for free usage
