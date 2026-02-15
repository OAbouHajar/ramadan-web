import '@testing-library/jest-dom'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage(props) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  }
})

// Mock geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
}

Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}