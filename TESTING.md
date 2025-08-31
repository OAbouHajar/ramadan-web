# Testing Documentation

This document describes the comprehensive testing setup for the Ramadan Web Application.

## Overview

The testing infrastructure includes unit tests, integration tests, and comprehensive coverage reporting to ensure the application works correctly and maintains quality over time.

## Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Testing utilities for React components
- **Jest DOM**: Custom Jest matchers for DOM assertions
- **JSDOM**: DOM implementation for testing browser-like environments

## Test Structure

```
src/
  __tests__/
    _app.test.js          # Tests for Next.js App component
    index.test.js         # Comprehensive tests for Home component
    integration.test.js   # Integration tests for full app behavior
jest.config.js            # Jest configuration
jest.setup.js             # Global test setup and mocks
```

## Test Categories

### Unit Tests (`index.test.js`)
- **Component Rendering**: Verifies all UI elements render correctly
- **State Management**: Tests component state initialization and updates
- **API Integration**: Mocks and tests external API calls
- **Error Handling**: Verifies graceful handling of failures
- **User Interactions**: Tests button clicks and popup functionality
- **Geolocation**: Tests location services integration

### Integration Tests (`integration.test.js`)
- **Complete Workflow**: Tests end-to-end user experience
- **Accessibility**: Verifies accessibility features
- **Arabic Text Support**: Ensures proper Arabic text rendering
- **Error Scenarios**: Tests complete failure scenarios

### App Tests (`_app.test.js`)
- **Next.js Integration**: Tests the main App component
- **Props Passing**: Verifies proper component prop handling

## Key Features Tested

### Geolocation Services
- ✅ Successful location detection
- ✅ Location permission denied
- ✅ Geolocation API not available
- ✅ Error message display

### API Integration
- ✅ Prayer times API (Aladhan)
- ✅ Geocoding API (geocode.maps.co)
- ✅ API error handling
- ✅ Response data processing

### User Interface
- ✅ Component rendering
- ✅ Styling and CSS classes
- ✅ Image display (sunrise/sunset icons)
- ✅ Button interactions
- ✅ Popup modal functionality

### Data Display
- ✅ Default values (--:-- times, موقعك city)
- ✅ Dynamic time updates
- ✅ City name display
- ✅ Arabic date/time formatting
- ✅ Du'aa text display

### Error Handling
- ✅ Network failures
- ✅ Invalid API responses
- ✅ Missing data graceful fallbacks

## Running Tests

### All Tests
```bash
npm test
```

### Tests with Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

## Coverage Targets

The project maintains high coverage standards:
- **Statements**: 85%+
- **Branches**: 85%+
- **Functions**: 85%+
- **Lines**: 85%+

## Test Utilities and Mocks

### Global Mocks
- **Navigator.geolocation**: Mocked for consistent testing
- **Axios**: HTTP requests mocked to avoid external dependencies
- **Console methods**: Silenced in tests to reduce noise
- **Date**: Mocked for consistent date testing

### Helper Functions
- `createMockPrayerTimesResponse()`: Generates mock API responses
- `createMockGeocodingResponse()`: Creates geocoding API mocks
- `mockGeolocationSuccess()`: Simulates successful location detection
- `mockGeolocationError()`: Simulates location permission errors

## Best Practices

### Test Organization
- Tests are grouped by functionality using `describe` blocks
- Each test focuses on a single behavior
- Tests are independent and can run in any order

### Assertions
- Use descriptive test names that explain the expected behavior
- Test both success and failure scenarios
- Verify visual elements and user interactions
- Check accessibility features

### Mocking Strategy
- Mock external dependencies (APIs, browser APIs)
- Use realistic mock data that matches actual API responses
- Test error conditions with appropriate mock failures

## Continuous Integration

The test suite is designed to run in CI/CD environments:
- No external network dependencies
- Consistent results across environments
- Fast execution time
- Comprehensive error reporting

## Adding New Tests

When adding new features:

1. **Write tests first** (TDD approach recommended)
2. **Cover happy path and edge cases**
3. **Update coverage thresholds if needed**
4. **Document any new test utilities**
5. **Ensure tests are fast and reliable**

### Example Test Structure

```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup for each test
  })

  it('should handle successful scenario', () => {
    // Test implementation
  })

  it('should handle error scenario', () => {
    // Test implementation
  })
})
```

## Debugging Tests

### Common Issues
- **Async operations**: Use `waitFor` for async state updates
- **Mock cleanup**: Always clear mocks in `beforeEach`
- **DOM queries**: Use appropriate testing-library queries
- **User events**: Use `userEvent` for realistic interactions

### Debugging Tips
- Use `screen.debug()` to see rendered DOM
- Add `console.log` in test files for debugging (removed in CI)
- Run individual tests with `npm test -- --testNamePattern="pattern"`

This testing setup ensures the Ramadan Web Application is reliable, maintainable, and provides a great user experience.