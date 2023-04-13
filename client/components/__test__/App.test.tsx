import { Provider } from 'react-redux'
import {
  screen,
  render,
  within,
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

describe('<Budget />', () => {
  it('addbudget, when addbudget button is pressed and modal is filled out and submitted', async () => {
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
    const mockData2 = {
      id: 3,
      user_id: 1,
      name: 'Transport',
      amount: 300,
      date: new Date('2023-04-01T11:00:00.000Z'),
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
      .post('/api/v1/budgets')
      .reply(200, mockData2)

    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    const budget1 = await screen.findByText('Groceries')
    expect(budget1).toBeInTheDocument()
    const addButton = screen.getByTestId('add-budget-button')
    userEvent.click(addButton)
    const dialogText = await screen.findByText(
      /Fill in the details for the new Budget/i
    )
    expect(dialogText).toBeInTheDocument()
    const budgetNameInput = await screen.findByLabelText(/Budget Name/i)
    userEvent.type(budgetNameInput, 'Transport')
    const budgetAmountInput = await screen.findByLabelText(/Budget Amount/i)
    userEvent.type(budgetAmountInput, '300')
    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    userEvent.click(submitButton)
    const budget2 = await screen.findByText('Transport')
    expect(scope2.isDone).toBeTruthy()
    expect(budget2).toBeInTheDocument()
  })
  it('should delete budget when delete button is pressed by user', async () => {
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
      .delete('/api/v1/budgets/1')
      .reply(200)

    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    await screen.findByText('Groceries')
    const deleteButton = screen.getByTestId('delete-budget-button')
    userEvent.click(deleteButton)

    expect(scope2.isDone).toBeTruthy()
    await waitFor(() => {
      expect(screen.queryByText('Groceries')).toBeNull()
    })
  })
})
