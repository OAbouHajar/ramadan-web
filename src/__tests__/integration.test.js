import { render, screen, act } from '@testing-library/react'
import Home from '../pages/index'

describe('Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset geolocation mock
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn(),
      },
      writable: true,
    })
  })

  it('renders all components together in a cohesive layout', () => {
    // Mock successful geolocation
    navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: { latitude: 53.3498, longitude: -6.2603 }
      })
    })

    render(<Home />)

    // Check that all major components are rendered together
    expect(screen.getByText('وقت الإمساك والإفطار اليوم حسب مدينتك')).toBeInTheDocument()
    expect(screen.getByAltText('Sunrise')).toBeInTheDocument()
    expect(screen.getByAltText('Sunset')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'كيف يعمل هذا الموقع؟' })).toBeInTheDocument()
    expect(screen.getByText('نسأل الله الثواب في هذا العمل والمغفرة في حال الخطأ')).toBeInTheDocument()
  })

  it('handles complete geolocation failure gracefully', () => {
    // Mock geolocation not available
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    })

    render(<Home />)

    // Should show error message
    expect(screen.getByText('⚠️ يرجى تفعيل الموقع الجغرافي للحصول على أوقات الإمساك والإفطار بدقة.')).toBeInTheDocument()
    
    // Should still show default content
    expect(screen.getByText('موقعك')).toBeInTheDocument()
    expect(screen.getAllByText('--:--')).toHaveLength(2)
  })

  it('maintains accessibility features', () => {
    navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
      success({ coords: { latitude: 53.3498, longitude: -6.2603 } })
    })

    render(<Home />)

    // Check that images have alt text
    const sunriseIcon = screen.getByAltText('Sunrise')
    const sunsetIcon = screen.getByAltText('Sunset')
    expect(sunriseIcon).toBeInTheDocument()
    expect(sunsetIcon).toBeInTheDocument()

    // Check that buttons are properly marked
    const infoButton = screen.getByRole('button', { name: 'كيف يعمل هذا الموقع؟' })
    expect(infoButton).toBeInTheDocument()

    // Check that external links have proper attributes
    // Note: This will be checked when popup is opened in other tests
  })

  it('displays Arabic text correctly throughout the application', () => {
    navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
      success({ coords: { latitude: 53.3498, longitude: -6.2603 } })
    })

    render(<Home />)

    // Check for various Arabic text elements
    expect(screen.getByText('وقت الإمساك والإفطار اليوم حسب مدينتك')).toBeInTheDocument()
    expect(screen.getByText('وقت الإمساك')).toBeInTheDocument()
    expect(screen.getByText('وقت الإفطار')).toBeInTheDocument()
    expect(screen.getByText('موقعك')).toBeInTheDocument()
    expect(screen.getByText('كيف يعمل هذا الموقع؟')).toBeInTheDocument()
    expect(screen.getByText('نسأل الله الثواب في هذا العمل والمغفرة في حال الخطأ')).toBeInTheDocument()
  })
})