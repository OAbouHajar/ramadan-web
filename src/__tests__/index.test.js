import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Home from '../pages/index'

// Mock axios
jest.mock('axios')
const mockedAxios = axios

// Mock Date to have consistent tests
const mockDate = new Date('2024-01-01T12:00:00.000Z')
jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
Date.now = jest.fn(() => mockDate.getTime())

// Helper functions
const createMockPrayerTimesResponse = (imsak = '05:30', maghrib = '18:45') => ({
  data: {
    data: {
      timings: {
        Imsak: imsak,
        Maghrib: maghrib,
      },
    },
  },
})

const createMockGeocodingResponse = (city = 'Dublin') => ({
  data: {
    address: {
      city,
    },
  },
})

const createMockPosition = (lat = 53.3498, lon = -6.2603) => ({
  coords: {
    latitude: lat,
    longitude: lon,
  },
})

const mockGeolocationSuccess = (position = createMockPosition()) => {
  navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
    success(position)
  })
}

const mockGeolocationError = () => {
  navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
    error()
  })
}

const mockGeolocationNotAvailable = () => {
  Object.defineProperty(global.navigator, 'geolocation', {
    value: undefined,
    writable: true,
  })
}

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockedAxios.get.mockClear()
    // Reset geolocation mock to default
    Object.defineProperty(global.navigator, 'geolocation', {
      value: {
        getCurrentPosition: jest.fn(),
      },
      writable: true,
    })
  })

  describe('Initial Rendering', () => {
    it('renders the main page with default content', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      expect(screen.getByText('وقت الإمساك والإفطار اليوم حسب مدينتك')).toBeInTheDocument()
      expect(screen.getByText('موقعك')).toBeInTheDocument()
      expect(screen.getByText('وقت الإمساك')).toBeInTheDocument()
      expect(screen.getByText('وقت الإفطار')).toBeInTheDocument()
      expect(screen.getAllByText('--:--')).toHaveLength(2)
    })

    it('displays the du\'aa text', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      expect(screen.getByText('"اللهم إني لك صمت، وعلى رزقك أفطرت، ذهب الظمأ، وابتلت العروق، وثبت الأجر إن شاء الله."')).toBeInTheDocument()
    })

    it('displays the info button', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      expect(screen.getByRole('button', { name: 'كيف يعمل هذا الموقع؟' })).toBeInTheDocument()
    })

    it('displays the footer text', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      expect(screen.getByText('نسأل الله الثواب في هذا العمل والمغفرة في حال الخطأ')).toBeInTheDocument()
    })
  })

  describe('Date and Time Display', () => {
    it('displays the current date and day in Arabic', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      // Check if date is displayed (exact format may vary but should contain date elements)
      const dateElements = screen.getAllByText((content, element) => {
        return content.includes('2024') || content.includes('يناير') || content.includes('الإثنين')
      })
      expect(dateElements.length).toBeGreaterThan(0)
    })
  })

  describe('Geolocation Handling', () => {
    it('handles successful geolocation', async () => {
      const mockPosition = createMockPosition(53.3498, -6.2603)
      mockGeolocationSuccess(mockPosition)
      
      mockedAxios.get
        .mockResolvedValueOnce(createMockPrayerTimesResponse('05:30', '18:45'))
        .mockResolvedValueOnce(createMockGeocodingResponse('Dublin'))
      
      render(<Home />)
      
      await waitFor(() => {
        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled()
      })
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          'https://api.aladhan.com/v1/timings?latitude=53.3498&longitude=-6.2603&method=2'
        )
      })
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          'https://geocode.maps.co/reverse?lat=53.3498&lon=-6.2603&api_key=67c31985d47a1611200339icx19efd8'
        )
      })
    })

    it('shows error message when geolocation fails', () => {
      mockGeolocationError()
      render(<Home />)
      
      expect(screen.getByText('⚠️ يرجى تفعيل الموقع الجغرافي للحصول على أوقات الإمساك والإفطار بدقة.')).toBeInTheDocument()
    })

    it('shows error message when geolocation is not available', () => {
      mockGeolocationNotAvailable()
      render(<Home />)
      
      expect(screen.getByText('⚠️ يرجى تفعيل الموقع الجغرافي للحصول على أوقات الإمساك والإفطار بدقة.')).toBeInTheDocument()
    })
  })

  describe('API Calls and Data Display', () => {
    it('fetches and displays prayer times', async () => {
      mockGeolocationSuccess()
      mockedAxios.get
        .mockResolvedValueOnce(createMockPrayerTimesResponse('05:30', '18:45'))
        .mockResolvedValueOnce(createMockGeocodingResponse('Dublin'))
      
      render(<Home />)
      
      await waitFor(() => {
        expect(screen.getByText('05:30')).toBeInTheDocument()
        expect(screen.getByText('18:45')).toBeInTheDocument()
      })
    })

    it('fetches and displays city name', async () => {
      mockGeolocationSuccess()
      mockedAxios.get
        .mockResolvedValueOnce(createMockPrayerTimesResponse())
        .mockResolvedValueOnce(createMockGeocodingResponse('Cork'))
      
      render(<Home />)
      
      await waitFor(() => {
        expect(screen.getByText('Cork')).toBeInTheDocument()
      })
    })

    it('handles prayer times API error gracefully', async () => {
      mockGeolocationSuccess()
      mockedAxios.get
        .mockRejectedValueOnce(new Error('API Error'))
        .mockResolvedValueOnce(createMockGeocodingResponse())
      
      render(<Home />)
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled()
      })
      
      // Should still show default times
      expect(screen.getAllByText('--:--')).toHaveLength(2)
    })

    it('handles geocoding API error gracefully', async () => {
      mockGeolocationSuccess()
      mockedAxios.get
        .mockResolvedValueOnce(createMockPrayerTimesResponse())
        .mockRejectedValueOnce(new Error('Geocoding Error'))
      
      render(<Home />)
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled()
      })
      
      // Should still show default city
      expect(screen.getByText('موقعك')).toBeInTheDocument()
    })

    it('handles different city name sources', async () => {
      mockGeolocationSuccess()
      mockedAxios.get
        .mockResolvedValueOnce(createMockPrayerTimesResponse())
        .mockResolvedValueOnce({
          data: {
            address: {
              town: 'Galway'
            }
          }
        })
      
      render(<Home />)
      
      await waitFor(() => {
        expect(screen.getByText('Galway')).toBeInTheDocument()
      })
    })

    it('handles fallback city name when no address data is available', async () => {
      mockGeolocationSuccess()
      mockedAxios.get
        .mockResolvedValueOnce(createMockPrayerTimesResponse())
        .mockResolvedValueOnce({
          data: {
            address: {}
          }
        })
      
      render(<Home />)
      
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled()
      })
      
      // Should still show default city
      expect(screen.getByText('موقعك')).toBeInTheDocument()
    })
  })

  describe('Popup Functionality', () => {
    it('opens popup when info button is clicked', async () => {
      const user = userEvent.setup()
      mockGeolocationSuccess()
      render(<Home />)
      
      const infoButton = screen.getByRole('button', { name: 'كيف يعمل هذا الموقع؟' })
      await user.click(infoButton)
      
      expect(screen.getByText(/يعتمد هذا الموقع على الحسابات الفلكية/)).toBeInTheDocument()
      expect(screen.getByText('أسامة أبو حجر')).toBeInTheDocument()
    })

    it('closes popup when close button is clicked', async () => {
      const user = userEvent.setup()
      mockGeolocationSuccess()
      render(<Home />)
      
      // Open popup
      const infoButton = screen.getByRole('button', { name: 'كيف يعمل هذا الموقع؟' })
      await user.click(infoButton)
      
      // Close popup
      const closeButton = screen.getByRole('button', { name: 'إغلاق' })
      await user.click(closeButton)
      
      // Popup content should not be visible (except for the button)
      expect(screen.queryByText(/يعتمد هذا الموقع على الحسابات الفلكية/)).not.toBeInTheDocument()
    })

    it('renders popup with correct content and structure', async () => {
      const user = userEvent.setup()
      mockGeolocationSuccess()
      render(<Home />)
      
      const infoButton = screen.getByRole('button', { name: 'كيف يعمل هذا الموقع؟' })
      await user.click(infoButton)
      
      // Check for specific popup content
      expect(screen.getByText('نسأل الله الثواب في هذا العمل والمغفرة في حال الخطأ.')).toBeInTheDocument()
      expect(screen.getByText('المصمم:')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'إغلاق' })).toBeInTheDocument()
      
      // Check for link
      const linkedInLink = screen.getByRole('link', { name: 'أسامة أبو حجر' })
      expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/osamaabouhajar/')
      expect(linkedInLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Component Images', () => {
    it('renders sunrise and sunset icons', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      const sunriseIcon = screen.getByAltText('Sunrise')
      const sunsetIcon = screen.getByAltText('Sunset')
      
      expect(sunriseIcon).toBeInTheDocument()
      expect(sunriseIcon).toHaveAttribute('src', '/sunrise-icon1.png')
      expect(sunsetIcon).toBeInTheDocument()
      expect(sunsetIcon).toHaveAttribute('src', '/sunset-icon1.png')
    })
  })

  describe('Component Styling and Structure', () => {
    it('applies correct CSS classes for styling', () => {
      mockGeolocationSuccess()
      render(<Home />)
      
      // Check for key styling classes
      const container = screen.getByText('وقت الإمساك والإفطار اليوم حسب مدينتك').closest('div')
      expect(container).toHaveClass('text-center', 'p-4', 'w-full')
      
      // Check for prayer time containers
      const imsakContainer = screen.getByText('وقت الإمساك').closest('div')
      expect(imsakContainer).toHaveClass('bg-blue-900')
      
      const iftarContainer = screen.getByText('وقت الإفطار').closest('div')
      expect(iftarContainer).toHaveClass('bg-orange-900')
    })
  })
})