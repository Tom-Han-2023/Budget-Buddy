import { useEffect } from 'react'
import { fetchExpenses } from '../actions/expenses'
import { useAppDispatch, useAppSelector } from '../hooks'
import AddExpenses from './AddExpenses'

const Expenses = () => {
  const expenses = useAppSelector((state) => state.expenses)
  const accessToken = useAppSelector((state) => state.token)
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (accessToken.accessToken) {
      dispatch(fetchExpenses(accessToken.accessToken, year, month))
    }
  }, [dispatch, accessToken, year, month])

  if (expenses.isLoading) {
    return (
      <div>
        <h1>page is loading</h1>
      </div>
    )
  }

  if (expenses.error) {
    return <div>{expenses.error}</div>
  }

  return (
    <>
      <div>
        {expenses.data.map((expense) => {
          return (
            <div key={expense.id}>
              <h2>{expense.category}</h2>
              <p>Amount: ${expense.amount}</p>
              <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
              <p>Budget Category: {expense.budgetName}</p>

              {/* <DeleteExpenses expensesid={expense.id} /> */}
              {/* <UpdatedExpenses
                expensesAmount={expense.amount}
                budgetName={expense.budgetname}
                expenseid={expense.id}
              /> */}
            </div>
          )
        })}
      </div>
      <AddExpenses />
    </>
  )
}

export default Expenses
