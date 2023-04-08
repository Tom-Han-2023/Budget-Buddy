import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { fetchBudgets } from '../actions/budgets'
import { setAccessToken } from '../actions/token'
import { setMonth, setYear } from '../actions/yearMonth'
import { useAppDispatch, useAppSelector } from '../hooks'
import AddBudget from './AddBudget'
import DateSelectForm from './DateSelectForm'
import DeleteBudget from './DeleteBudget'
import UpdateBudget from './UpdateBudget'

function Budget() {
  const { user, getAccessTokenSilently } = useAuth0()
  const budgets = useAppSelector((state) => state.budgets)
  const { accessToken } = useAppSelector((state) => state.token)
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const expenses = useAppSelector((state) => state.expenses)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear().toString()
    const currentMonth = currentDate.toLocaleString('default', {
      month: 'long',
    })
    dispatch(setMonth(currentMonth))
    dispatch(setYear(currentYear))
  }, [dispatch])

  useEffect(() => {
    if (accessToken === null) {
      getAccessTokenSilently({
        authorizationParams: {
          audience: 'https://budgets/api',
        },
      })
        .then((token) => {
          dispatch(setAccessToken(token))
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      dispatch(fetchBudgets(accessToken, year, month))
    }
  }, [dispatch, accessToken, getAccessTokenSilently, year, month])

  function calculateTotalSpent(budgetId: number) {
    const expensesByBudgetId = expenses.data.filter((expense) => {
      return expense.budget_id === budgetId
    })
    const totalSpent = expensesByBudgetId.reduce((sum, curr) => {
      return sum + curr.amount
    }, 0)
    return totalSpent
  }

  if (budgets.isLoading) {
    return (
      <div>
        <h1>page is loading</h1>
      </div>
    )
  }

  if (budgets.error) {
    return <div>{budgets.error}</div>
  }

  return (
    <>
      <h1>App</h1>
      <p>Welcome back {user?.name}</p>
      <p>React development has begun!</p>
      <DateSelectForm />

      <div>
        {budgets.data.map((budget, i) => {
          return (
            <div key={budget.id}>
              <h2>{budget.name}</h2>
              <p>Amount Allocated: ${budget.amount}</p>
              <p>Total Spent this month: ${calculateTotalSpent(budget.id)}</p>
              <DeleteBudget budgetid={budget.id} />
              <UpdateBudget
                budgetAmount={budget.amount}
                budgetName={budget.name}
                budgetid={budget.id}
              />
            </div>
          )
        })}
      </div>
      <AddBudget />
    </>
  )
}

export default Budget
