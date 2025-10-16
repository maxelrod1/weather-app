# Monitoring and Observability

## Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics (basic performance metrics)
- **Error Tracking:** Console logging for development; optional Sentry integration for production
- **Performance Monitoring:** Web Vitals tracking (LCP, FID, CLS)
- **User Analytics:** Optional Google Analytics or Plausible (privacy-focused)

## Key Metrics

**Frontend Metrics:**
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- **JavaScript errors:** Track unhandled exceptions
- **API response times:** Monitor geocoding and weather API latency
- **User interactions:** Track successful vs failed weather lookups

**API Health:**
- **Success rate:** % of successful weather lookups
- **Error rate:** % of failed API calls by error type
- **Response time:** Average time from zip code submission to display
- **User behavior:** Most searched zip codes, peak usage times

---
