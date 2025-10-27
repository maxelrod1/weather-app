# Epic 2: API Journey Visualization - Brownfield Enhancement

## Epic Goal

Replace the current loading spinner with an animated horizontal visualization that shows users the step-by-step journey of their weather request through the geocoding and weather services, making the backend process visible and educational while enhancing the user experience.

---

## Epic Description

### Existing System Context

**Current Relevant Functionality:**
- Users enter a zip code and submit the form
- A loading spinner appears while data is fetched
- The app calls two services sequentially:
  1. Zippopotam.us API (geocoding: zip code → coordinates)
  2. National Weather Service API (weather data by coordinates)
- Results are displayed once both API calls complete

**Technology Stack:**
- Frontend: TypeScript, Vite, Tailwind CSS
- Components: WeatherForm, WeatherDisplay, LoadingSpinner, ErrorMessage
- Services: geocoding.service.ts, weather.service.ts, http.client.ts
- State Management: Event-driven architecture in main.ts

**Integration Points:**
- LoadingSpinner component (to be replaced)
- main.ts orchestration (fetchWeather function)
- Existing service layer (no changes needed)

### Enhancement Details

**What's Being Added:**
A new `ApiJourneyAnimation` component that visually represents the data flow through services with:
- **Stage 1:** "Looking up your location..." (geocoding in progress)
- **Stage 2:** "Getting weather data..." (weather API in progress)
- **Stage 3:** Transition to results display

**Visual Design:**
```
[📍 Zip Code Input] ──→ [🗺️ Finding Location] ──→ [☁️ Getting Weather] ──→ [🌤️ Results]
```

- Horizontal path layout
- Icons traveling along the path
- User-friendly language (no technical jargon)
- Deliberate educational pace (3-4 seconds total)
- Passive interaction (just watch it happen)

**How It Integrates:**
- Replaces the existing `LoadingSpinner` component
- Hooks into the same show/hide lifecycle
- Responds to progress events from the service layer
- Maintains error handling integration

**Success Criteria:**
- Loading state is more informative and educational
- Users understand the multi-step process
- Code demonstrates clean async/state management patterns
- Animation is smooth and performant
- Accessible (respects reduced motion preferences)

---

## Stories

### Story 2.1: Create API Journey Animation Component

**As a** developer,  
**I want** to create a reusable ApiJourneyAnimation component,  
**so that** I can display multi-stage progress with animations.

**Brief Description:**  
Build the core animation component with three stages (location lookup, weather fetch, complete), horizontal layout, icon-based visualization, and smooth transitions. Component should be state-driven and accept progress updates.

### Story 2.2: Integrate Journey Animation into Weather Fetch Flow

**As a** user,  
**I want** to see which step the app is on when fetching weather,  
**so that** I understand the process and know the app is working.

**Brief Description:**  
Replace LoadingSpinner with ApiJourneyAnimation in main.ts, emit progress events from service calls, and coordinate timing between actual API calls and animation stages. Ensure error states transition appropriately.

### Story 2.3: Polish and Accessibility Enhancements

**As a** user with accessibility needs,  
**I want** the animation to respect my motion preferences and work with screen readers,  
**so that** I have an equivalent experience regardless of my abilities.

**Brief Description:**  
Add reduced motion support, ARIA live regions for screen readers, ensure keyboard navigation works, add loading percentage or progress indicator, and optimize performance. Document the educational value in code comments.

---

## Compatibility Requirements

- [x] **Existing APIs remain unchanged** - No changes to geocoding or weather services
- [x] **UI changes follow existing patterns** - Uses same component architecture and styling approach
- [x] **Performance impact is minimal** - CSS animations, no heavy libraries
- [x] **Error handling preserved** - ErrorMessage component still handles failures
- [x] **Responsive design maintained** - Works on mobile, tablet, desktop

---

## Risk Mitigation

### Primary Risk
Animation timing doesn't match actual API response times (animations too fast or too slow).

### Mitigation
- Use minimum display times for each stage (e.g., 1.5 seconds per stage)
- If API completes early, hold animation until minimum time passes
- If API takes longer, extend animation naturally or add subtle looping
- Test with throttled network conditions

### Rollback Plan
- Keep LoadingSpinner component in codebase
- Simple flag to switch between old and new loading states
- Can rollback by changing one import in main.ts

---

## Definition of Done

- [x] All stories completed with acceptance criteria met
- [x] Existing functionality verified through testing
  - Weather lookup still works correctly
  - Error handling unchanged
  - Form validation unaffected
- [x] Integration points working correctly
  - Animation shows during API calls
  - Results display after animation completes
  - Errors interrupt animation appropriately
- [x] Documentation updated appropriately
  - Code comments explain the pattern
  - README mentions the educational aspect
  - Component usage documented
- [x] No regression in existing features
  - All previous tests still pass
  - Manual UAT confirms no breakage
- [x] Accessibility verified
  - Works with screen readers
  - Respects prefers-reduced-motion
  - Keyboard accessible
- [x] Performance acceptable
  - No jank or stuttering
  - Works on mobile devices
  - Lighthouse score maintained

---

## Technical Notes

### Animation Approach
- **Preferred:** CSS animations + JavaScript state management (no heavy libraries)
- **Icons:** Emojis or SVG icons (keep it simple)
- **Timing:** JavaScript setTimeout/Promise coordination
- **State:** Track current stage (idle → geocoding → weather → complete)

### Future Considerations
- **Vertical Layout:** If more services are added, consider vertical flow
- **Interactive Mode:** Future version could show request/response details on click
- **Customization:** Allow developers to configure stages for other multi-step processes
- **Timing Indicators:** Show estimated time remaining per stage

### Learning Objectives (for Developers)
This epic demonstrates:
1. **Sequential async operations** - Coordinating multiple API calls
2. **State-driven animations** - React to data flow
3. **Progressive enhancement** - Visual feedback improves UX
4. **Separation of concerns** - Animation separate from business logic
5. **Accessibility** - Motion preferences and screen readers

---

## Epic Status

**Status:** 📝 READY FOR PLANNING  
**Estimated Size:** Small (1-3 stories)  
**Risk Level:** Low  
**Priority:** Medium (enhancement, not critical)  
**Dependencies:** None  

---

## Next Steps

1. **Story Manager (SM):** Break down stories with detailed acceptance criteria
2. **Architect:** Quick review - any concerns with animation approach?
3. **Developer:** Implement stories sequentially
4. **QA:** Test across devices, accessibility, and error scenarios
5. **UAT:** Verify educational value and user experience

---

**Epic Owner:** Product Manager (John)  
**Created:** October 27, 2025  
**Updated:** October 27, 2025

