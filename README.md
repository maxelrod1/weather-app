# Weather App by Zip Code

A simple, fast, and beautiful weather application that fetches current weather conditions for any US zip code using the National Weather Service API.

## 🌤️ Features

- Enter any US zip code to get current weather conditions
- View temperature, weather conditions, humidity, wind speed, and more
- Clean, responsive design that works on mobile, tablet, and desktop
- Fast loading with modern build tools (Vite)
- Zero cost - uses free weather APIs and hosting

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

## 📝 License

MIT License - feel free to use this project for learning and personal use.

## 🙏 Acknowledgments

- Weather data provided by the National Weather Service
- Built with the BMAD Method framework

