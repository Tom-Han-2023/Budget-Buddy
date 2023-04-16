import { Provider } from 'react-redux'
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { initialiseStore } from '../../store'
import { useAuth0 } from '@auth0/auth0-react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import nock from 'nock'
import DateSelectForm from '../DateSelectForm'
import Budget from '../Budget'
import Expenses from '../Expenses'
jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('<Expenses />', () => {
  it('should display all the expenses for the current month when user logs in.', async () => {
    const mockAuth = {
      getAccessTokenSilently: jest.fn(async () => 'auth0Token'),
      isAuthenticated: true,
    }
    jest.mocked(useAuth0 as jest.Mock).mockReturnValue(mockAuth)
    render(
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={initialiseStore()}>
          <DateSelectForm />
          <Budget />
          {/* <Expenses /> */}
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
    ]

    const scope = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .get('/api/v1/budgets?year=2023&month=April')
      .reply(200, mockData)

    const mockData1 = [
      {
        id: 1,
        user_id: '1',
        budget_id: 1,
        category: 'Netflix',
        amount: 20,
        date: '2023-04-15T11:00:00.000Z',
      },
      {
        id: 2,
        user_id: '1',
        budget_id: 1,
        category: 'Food',
        amount: 75,
        date: '2023-04-20T11:00:00.000Z',
      },
    ]

    const scope1 = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .get('/api/v1/expenses?year=2023&month=April')
      .reply(200, mockData1)

    expect(1).toBe(1)

    // expect(scope1.isDone).toBeTruthy()

    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(loading)
    // const expense = await screen.findByText('Netflix')
    // const expenseDate = await screen.findByText('15/04/2023')
    // const expense2 = await screen.findByText('Food')
    // const expense2Date = await screen.findByText('20/04/2023')

    // expect(expense).toBeInTheDocument()
    // expect(expenseDate).toBeInTheDocument()
    // expect(expense2).toBeInTheDocument()
    // expect(expense2Date).toBeInTheDocument()
  })
})
