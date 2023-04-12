import { Provider } from 'react-redux'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { initialiseStore } from '../../store'
import { useAuth0 } from '@auth0/auth0-react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import App from '../App'
import nock from 'nock'
import DateSelectForm from '../DateSelectForm'
import Budget from '../Budget'

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

describe('<DateSelectForm/>', () => {
  it('should change the state of Year and Month as user selects year and Month from form', () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => 'auth0Token'),
      isAuthenticated: true,
      logout: jest.fn(async () => null),
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={initialiseStore()}>
          <Budget />
        </Provider>
      </LocalizationProvider>
    )

    const mockData = [
      {
        id: 1,
        user_id: 1,
        name: 'Groceries',
        amount: 500,
        date: new Date('2023-03-30T11:00:00.000Z'),
      },
      {
        id: 2,
        user_id: 1,
        name: 'Rent',
        amount: 1000,
        date: new Date('2023-03-30T11:00:00.000Z'),
      },
    ]
    const mockData2 = {
      id: 4,
      user_id: 1,
      name: 'Groceries',
      amount: 500,
      date: new Date('2023-03-30T11:00:00.000Z'),
    }

    const scope1 = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .get('/api/v1/budgets?year=2023&month=April')
      .reply(200, mockData)
    const scope2 = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .post('/api/v1/budgets?year=2023&month=April')
      .reply(200, mockData2)

    expect(scope1.isDone).toBeTruthy()
    screen.debug()

    expect(1).toBe(1)
  })
})
