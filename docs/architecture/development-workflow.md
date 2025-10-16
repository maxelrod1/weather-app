# Development Workflow

## Local Development Setup

### Prerequisites

```bash
# Required: Node.js 18+ and npm 9+
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher

# Optional: VS Code with extensions
# - ESLint
# - Prettier
# - Tailwind CSS IntelliSense
```

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd weather-app

# Install dependencies
npm install

# Copy environment template (if needed)
cp .env.example .env

# Start development server
npm run dev
```

### Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Run unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Format code
npm run format

# Type check (TypeScript)
npm run type-check
```

## Environment Configuration

### Required Environment Variables

```bash
# .env.local (for local development)
# No environment variables required for basic functionality
# NWS and Census APIs are public and don't need keys

# Optional: For enhanced features
# VITE_ENABLE_ANALYTICS=true
# VITE_ERROR_TRACKING_DSN=<sentry-dsn>
```
