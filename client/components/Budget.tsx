import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { fetchBudgets } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import AddBudget from './AddBudget'
import DeleteBudget from './DeleteBudget'
import UpdatedBudget from './UpdateBudget'

function Budget() {
  const { logout, user } = useAuth0()
  const dispatch = useAppDispatch()
  const budgets = useAppSelector((state) => state.budgetReducer)
  function handleSignOut() {
    logout()
  }

  useEffect(() => {
    dispatch(fetchBudgets(user?.sub as string))
  }, [dispatch, user])

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
              <DeleteBudget budgetid={budget.id} userId={user?.sub as string} />
              <UpdatedBudget
                budgetAmount={budget.amount}
                budgetName={budget.name}
                budgetid={budget.id}
                userId={user?.sub as string}
              />
            </div>
          )
        })}
      </div>
      <AddBudget />

      <button onClick={handleSignOut}>Sign Out</button>
    </>
  )
}

export default Budget
