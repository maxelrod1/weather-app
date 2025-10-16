# Requirements

## Functional

- **FR1**: User shall be able to enter a US zip code in an input field
- **FR2**: User shall be able to submit the zip code to fetch weather data
- **FR3**: System shall fetch weather data from a free, open weather API (e.g., National Weather Service API or OpenWeatherMap)
- **FR4**: System shall display current temperature for the requested location
- **FR5**: System shall display weather conditions description (e.g., "Sunny", "Cloudy", "Rainy")
- **FR6**: System shall display location name corresponding to the zip code
- **FR7**: System shall validate that the entered zip code is in correct format (5 digits)
- **FR8**: System shall display appropriate error messages for invalid zip codes or failed API requests
- **FR9**: System shall display additional weather details: humidity, wind speed, and feels-like temperature

## Non Functional

- **NFR1**: The application shall respond to weather requests within 3 seconds under normal conditions
- **NFR2**: The application shall work on modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- **NFR3**: The user interface shall be responsive and work on mobile, tablet, and desktop screen sizes
- **NFR4**: The application shall use a free weather API that requires no payment or credit card
- **NFR5**: The code shall include basic error handling and logging for debugging
- **NFR6**: The application shall be deployable to a free hosting platform (e.g., Vercel, Netlify, GitHub Pages)
