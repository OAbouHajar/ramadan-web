import { render, screen } from '@testing-library/react'
import MyApp from '../pages/_app'

// Simple test component for testing _app
const TestComponent = () => <div>Test Component</div>

describe('MyApp', () => {
  it('renders the component passed to it', () => {
    render(<MyApp Component={TestComponent} pageProps={{}} />)
    
    expect(screen.getByText('Test Component')).toBeInTheDocument()
  })
  
  it('passes pageProps to the component', () => {
    const TestComponentWithProps = ({ testProp }) => <div>{testProp}</div>
    const testProps = { testProp: 'Hello World' }
    
    render(<MyApp Component={TestComponentWithProps} pageProps={testProps} />)
    
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})