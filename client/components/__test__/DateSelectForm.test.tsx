import { Provider } from 'react-redux'
import { screen, render, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { initialiseStore } from '../../store'
import { useAuth0 } from '@auth0/auth0-react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import nock from 'nock'
import DateSelectForm from '../DateSelectForm'
import Budget from '../Budget'

jest.mock('@auth0/auth0-react')


beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('<DateSelectForm/>', () => {
  it('should change the state of Year and Month as user selects year and Month from form', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => 'auth0Token'),
      isAuthenticated: true,
      logout: jest.fn(async () => null),
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={initialiseStore()}>
          <DateSelectForm />
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
        date: new Date('2023-04-15T11:00:00.000Z'),
      },
      {
        id: 2,
        user_id: 1,
        name: 'Rent',
        amount: 1000,
        date: new Date('2023-04-15T11:00:00.000Z'),
      },
    ]
    const mockData2 = [
      {
        id: 4,
        user_id: 1,
        name: 'Transport',
        amount: 500,
        date: new Date('2024-04-22T11:00:00.000Z'),
      },
    ]
    const mockData3 = [
      {
        id: 5,
        user_id: 1,
        name: 'Subscription',
        amount: 200,
        date: new Date('2024-03-11T11:00:00.000Z'),
      },
    ]

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
      .get('/api/v1/budgets?year=2024&month=April')
      .reply(200, mockData2)
    const scope3 = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .get('/api/v1/budgets?year=2024&month=March')
      .reply(200, mockData3)

    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    const budget1 = await screen.findByText('Groceries')
    expect(budget1).toBeInTheDocument()

    const selectEl = await screen.findByLabelText(/Year/i)
    userEvent.click(selectEl)
    const optionsPopupEl = await screen.findByRole('listbox', {
      name: /Year/i,
    })
    userEvent.click(within(optionsPopupEl).getByText(/2024/i))
    await waitFor(
      () => !screen.findByRole('heading', { name: 'page is loading' })
    )

    const budget2 = await screen.findByText('Transport')
    expect(budget2).toBeInTheDocument()
    expect(scope2.isDone).toBeTruthy()

    const monthSelectEl = await screen.findByLabelText(/Month/i)
    userEvent.click(monthSelectEl)
    const monthOptionsPopupEl = await screen.findByRole('listbox', {
      name: /Month/i,
    })
    userEvent.click(within(monthOptionsPopupEl).getByText(/March/i))
    await waitFor(
      () => !screen.findByRole('heading', { name: 'page is loading' })
    )
    expect(scope3.isDone).toBeTruthy()
    const budget3 = await screen.findByText('Subscription')
    expect(budget3).toBeInTheDocument()
  })
})
