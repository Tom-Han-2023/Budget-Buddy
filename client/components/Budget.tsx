import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { fetchBudgets } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import AddBudget from './AddBudget'
import DeleteBudget from './DeleteBudget'
import UpdatedBudget from './UpdateBudget'

function Budget() {
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0()
  const dispatch = useAppDispatch()
  const budgets = useAppSelector((state) => state.budgetReducer)
  const [token, setToken] = useState<null | string>(null)

  useEffect(() => {
    getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://budgets/api',
      },
    })
      .then((accessToken) => {
        setToken(accessToken)
        dispatch(fetchBudgets(accessToken))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [dispatch, getAccessTokenSilently])

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
      <div>
        {budgets.data.map((budget, i) => {
          return (
            <div key={i}>
              <h2>{budget.name}</h2>
              <p>Amount Allocated: ${budget.amount}</p>
              <p>Date Budget was created: {budget.date}</p>
              <DeleteBudget budgetid={budget.id} token={token as string} />
              <UpdatedBudget
                budgetAmount={budget.amount}
                budgetName={budget.name}
                budgetid={budget.id}
                token={token as string}
              />
            </div>
          )
        })}
      </div>
      <AddBudget token={token} />
    </>
  )
}

export default Budget
