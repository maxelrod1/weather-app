# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **CDN/Edge:** Vercel Edge Network (automatic)
- **Deployment Trigger:** Git push to `main` branch

**Deployment Steps:**
1. Push code to GitHub repository
2. Vercel automatically detects changes
3. Runs build command
4. Deploys to edge network
5. Provides deployment URL

## CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

## Environments

| Environment | Frontend URL | Purpose |
|-------------|--------------|---------|
| Development | http://localhost:5173 | Local development |
| Preview | https://weather-app-<hash>.vercel.app | PR preview deployments |
| Production | https://weather-app.vercel.app | Live environment |
