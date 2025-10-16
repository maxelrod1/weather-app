# Project Structure

```plaintext
weather-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Run tests on PR
│       └── deploy.yml              # Deploy to Vercel on main
├── public/
│   ├── favicon.ico                 # App favicon
│   └── assets/                     # Static assets (icons, images)
├── src/
│   ├── main.ts                     # Application entry point
│   ├── index.html                  # HTML template
│   ├── styles/
│   │   ├── index.css               # Tailwind imports and global styles
│   │   └── components.css          # Component-specific styles
│   ├── services/
│   │   ├── geocoding.service.ts    # Geocoding API client
│   │   ├── weather.service.ts      # Weather API client
│   │   └── http.client.ts          # Shared HTTP utilities
│   ├── utils/
│   │   ├── validation.ts           # Input validation functions
│   │   ├── formatters.ts           # Data formatting utilities
│   │   └── error-handler.ts        # Error handling utilities
│   ├── types/
│   │   ├── weather.types.ts        # WeatherData interface
│   │   ├── coordinates.types.ts    # Coordinates interface
│   │   └── api.types.ts            # API response types
│   └── components/                 # UI components (if using React)
│       ├── WeatherForm.tsx
│       ├── WeatherDisplay.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
├── tests/
│   ├── unit/
│   │   ├── services/
│   │   │   ├── geocoding.service.test.ts
│   │   │   └── weather.service.test.ts
│   │   └── utils/
│   │       ├── validation.test.ts
│   │       └── formatters.test.ts
│   ├── integration/
│   │   └── weather-flow.test.ts
│   └── e2e/
│       └── weather-app.spec.ts
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                     # Prettier configuration
├── index.html                      # Entry HTML (Vite convention)
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── vite.config.ts                  # Vite configuration
├── playwright.config.ts            # Playwright E2E config
├── vitest.config.ts                # Vitest testing config
└── README.md                       # Project documentation
```
