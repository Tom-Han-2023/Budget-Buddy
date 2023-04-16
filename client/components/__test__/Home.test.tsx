import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { initialiseStore } from '../../store'
import { useAuth0 } from '@auth0/auth0-react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import Home from '../Home'
jest.mock('@auth0/auth0-react')
jest.mock('react-chartjs-2', () => ({
  Doughnut: () => null,
}))

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('<Home />', () => {
  it('should be rendered if the user has not logged in yet', async () => {
    const mockAuth = {
      isAuthenticated: false,
      loginWithRedirect: jest.fn(async () => null),
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)

    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={initialiseStore()}>
          <Home />
        </Provider>
      </LocalizationProvider>
    )
    const heading = screen.getByRole('heading', {
      name: 'Welcome to Budget Buddy',
    })
    expect(heading).toBeInTheDocument()
    const button = screen.getByText(/Get Started Now/i)

    await userEvent.click(button)

    expect(mockAuth.loginWithRedirect).toHaveBeenCalledTimes(1)

    expect(1).toBe(1)
  })
})
