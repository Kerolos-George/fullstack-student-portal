import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import { store } from './store/store'

const theme = createTheme()

const renderApp = () => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

describe('App Component', () => {
  it('should render without crashing', () => {
    expect(() => renderApp()).not.toThrow()
  })

  it('should display login button when not authenticated', () => {
    renderApp()
    expect(screen.getByText('Login to Dashboard')).toBeInTheDocument()
  })
})
