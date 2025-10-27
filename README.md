# Weather App by Zip Code ☀️⛈️

A simple, fast, and beautiful weather application that fetches current weather conditions for any US zip code using the National Weather Service API.

**🌐 Live Demo:** [https://weather-hspzqcor8-mikeaxelrod-4034s-projects.vercel.app](https://weather-hspzqcor8-mikeaxelrod-4034s-projects.vercel.app)

**Built with ❤️ by Howling Tempest using the BMAD Method**

> 🔗 **GitHub Repository:** [maxelrod1/weather-app](https://github.com/maxelrod1/weather-app)

## 🌤️ Features

- Enter any US zip code to get current weather conditions
- View temperature, weather conditions, humidity, wind speed, and more
- Clean, responsive design that works on mobile, tablet, and desktop
- Fast loading with modern build tools (Vite)
- Zero cost - uses free weather APIs and hosting
- **API Journey Visualization** - See the multi-step API process in action

## ✨ API Journey Visualization

This app includes an educational **API Journey Animation** that visualizes the multi-step process of fetching weather data. When you submit a zip code, you'll see:

1. 🗺️ **Geocoding Stage** - Converting zip code to coordinates
2. ☁️ **Weather Stage** - Fetching weather data from NWS
3. ✅ **Complete Stage** - Success! Ready to display results

### Educational Value

This feature demonstrates:
- **Sequential async operations** - How to coordinate multiple API calls
- **State-driven animations** - Using component state to drive visual feedback
- **Timing coordination** - Ensuring minimum display durations for user comprehension
- **Queue-based processing** - Handling fast API responses (cached data) gracefully

### Accessibility Features

- **Screen reader support** - ARIA live regions announce each stage
- **Reduced motion** - Respects `prefers-reduced-motion` user preference
- **Keyboard navigation** - Doesn't trap focus or interfere with keyboard users
- **Mobile optimized** - 60fps animations using GPU-accelerated transforms

### Code Example

```typescript
import { ApiJourneyAnimation } from './components/ApiJourneyAnimation';

// Initialize the animation
const apiJourney = new ApiJourneyAnimation(containerElement);

// Show and update stages during async operations
apiJourney.show();
await apiJourney.updateStage('geocoding');
const geocoded = await geocodeZipCode(zipCode);

await apiJourney.updateStage('weather');
const weather = await getWeather(geocoded.coordinates);

await apiJourney.updateStage('complete');
apiJourney.hide();
```

📚 **Learn More:**
- [Epic 2 - API Journey Visualization](./docs/prd/epic-2-api-journey-visualization.md)
- [Brainstorming Session](./docs/brainstorming-session-results.md)

## 🛠️ Tech Stack

- **Build Tool**: Vite 5.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4
- **Testing**: Vitest + Playwright
- **Linting**: ESLint + Prettier
- **Deployment**: Vercel (planned)

## 📋 Prerequisites

- Node.js >= 18.0
- npm >= 9.0

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd bmad-learn

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:5173)
npm run dev

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run linting
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
weather-app/
├── docs/                   # BMAD planning documents
│   ├── prd/               # Product Requirements (sharded)
│   ├── architecture/      # Architecture docs (sharded)
│   └── stories/           # User stories
├── src/
│   ├── main.ts            # Application entry point
│   ├── styles/            # CSS and styling
│   ├── services/          # API clients (coming soon)
│   ├── utils/             # Utility functions (coming soon)
│   └── types/             # TypeScript types (coming soon)
├── tests/                 # Test files
├── index.html             # Entry HTML
└── package.json           # Dependencies and scripts
```

## 🧪 Testing

- **Unit Tests**: Test individual functions and utilities
- **Integration Tests**: Test API integrations and data flows
- **E2E Tests**: Test complete user journeys with Playwright

```bash
npm run test              # Run unit and integration tests
npm run test:ui           # Run tests with visual UI
npm run test:e2e          # Run end-to-end tests
```

## 🌐 APIs Used

- **National Weather Service API** (weather.gov) - Free, no API key required
- **US Census Geocoding API** - Convert zip codes to coordinates

## 📖 Development Method

This project was built using the **BMAD Method** (Breakthrough Method for Agile AI-Driven Development), a structured framework that uses AI agents to guide development from concept to deployment.

## 🚀 Deployment

This app is ready to deploy to Vercel, Netlify, or GitHub Pages!

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📝 License

MIT License - feel free to use this project for learning and personal use.

See [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- Weather data provided by the National Weather Service
- Geocoding by Zippopotam.us
- Built with the BMAD Method framework
- © Howling Tempest, 2025

