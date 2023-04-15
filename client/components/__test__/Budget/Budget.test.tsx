import { Provider } from 'react-redux'
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { initialiseStore } from '../../../store'
import { useAuth0 } from '@auth0/auth0-react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import nock from 'nock'
import DateSelectForm from '../../DateSelectForm'
import Budget from '../../Budget'

jest.mock('@auth0/auth0-react')

beforeEach(() => {
  jest.resetAllMocks()
})

afterAll(() => {
  jest.restoreAllMocks()
})

describe('<Budget />', () => {
  it('should display error message when failed to fetch budgets from database', async () => {
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

    const scope1 = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .get('/api/v1/budgets?year=2023&month=April')
      .reply(500, { error: 'There was an error trying to get the budgets :(' })
    const errorMessage = await waitFor(() =>
      screen.getByText(/internal Server Error/i)
    )
    expect(scope1.isDone).toBeTruthy()
    expect(errorMessage).toBeInTheDocument()
  })
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
    const cancelButton = await screen.findByRole('button', { name: /cancel/i })

    userEvent.click(cancelButton)

    await waitForElementToBeRemoved(dialogText)
    const queryText = await screen.queryByText(
      /Fill in the details for the new Budget/i
    )
    expect(queryText).toBeNull()
    userEvent.click(addButton)
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
  it('should display error message when failed to add budget to the database', async () => {
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
      .reply(500, { error: 'There was an error trying to add the budgets :(' })

    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    const budget1 = await screen.findByText('Groceries')
    expect(budget1).toBeInTheDocument()
    const addButton = screen.getByTestId('add-budget-button')
    userEvent.click(addButton)

    const budgetNameInput = await screen.findByLabelText(/Budget Name/i)
    userEvent.type(budgetNameInput, 'Transport')
    const budgetAmountInput = await screen.findByLabelText(/Budget Amount/i)
    userEvent.type(budgetAmountInput, '300')
    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    userEvent.click(submitButton)
    const errorMessage = await waitFor(() =>
      screen.getByText(/internal Server Error/i)
    )
    expect(scope2.isDone).toBeTruthy()
    expect(errorMessage).toBeInTheDocument()
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
  it('should display error message when failed to delete budget in the database', async () => {
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
      .reply(500, { error: 'There was an error trying to delete the post :(' })

    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    await screen.findByText('Groceries')
    const deleteButton = screen.getByTestId('delete-budget-button')
    userEvent.click(deleteButton)
    const errorMessage = await waitFor(() =>
      screen.getByText(/internal Server Error/i)
    )
    expect(scope2.isDone).toBeTruthy()
    expect(errorMessage).toBeInTheDocument()
  })
  it('should update budget detail when user clicks the edit button and fills the form', async () => {
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

    const mockData2 = {
      id: 1,
      user_id: 1,
      name: 'Rent',
      amount: 1000,
    }

    const scope2 = nock('http://localhost', {
      reqheaders: {
        authorization: 'Bearer auth0Token',
      },
    })
      .patch('/api/v1/budgets/1')
      .reply(200, mockData2)
    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    await screen.findByText('Groceries')
    const editButton = screen.getByTestId('edit-budget-button')
    userEvent.click(editButton)
    const dialogText = await screen.findByText(
      /Fill in the new details for the Budget/i
    )
    expect(dialogText).toBeInTheDocument()
    const cancelButton = await screen.findByRole('button', {
      name: /cancel/i,
    })
    userEvent.click(cancelButton)
    await waitForElementToBeRemoved(dialogText)
    const queryText = await screen.queryByText(
      /Fill in the details for the new Budget/i
    )
    expect(queryText).toBeNull()
    userEvent.click(editButton)
    const newBudgetNameInput = await screen.findByLabelText(/New Budget Name/i)
    userEvent.type(newBudgetNameInput, 'Rent')
    const newBudgetAmountInput = await screen.findByLabelText(
      /New Budget Amount/i
    )
    userEvent.type(newBudgetAmountInput, '1000')
    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    userEvent.click(submitButton)
    const budget2 = await screen.findByText('Rent')
    expect(scope2.isDone).toBeTruthy()
    expect(budget2).toBeInTheDocument()
    const queryText2 = await screen.queryByText('Groceries')
    expect(queryText2).toBeNull()
  })
  it('should display error message if failed to update budget in database', async () => {
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
      .patch('/api/v1/budgets/1')
      .reply(500, {
        error: 'There was an error trying to update the budget :(',
      })
    const loading = await screen.findByRole('heading', {
      name: 'page is loading',
    })

    expect(loading).toBeInTheDocument()
    expect(scope1.isDone).toBeTruthy()
    await screen.findByText('Groceries')
    const editButton = screen.getByTestId('edit-budget-button')
    userEvent.click(editButton)
    const newBudgetNameInput = await screen.findByLabelText(/New Budget Name/i)
    userEvent.type(newBudgetNameInput, 'Rent')
    const newBudgetAmountInput = await screen.findByLabelText(
      /New Budget Amount/i
    )
    userEvent.type(newBudgetAmountInput, '1000')
    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    userEvent.click(submitButton)
    const errorMessage = await waitFor(() =>
      screen.getByText(/internal Server Error/i)
    )
    expect(scope2.isDone).toBeTruthy()
    expect(errorMessage).toBeInTheDocument()
  })
})
