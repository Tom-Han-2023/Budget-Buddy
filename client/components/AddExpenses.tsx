import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { DatePicker } from '@mui/x-date-pickers'
import { addExpense } from '../actions/expenses'

export default function AddExpenses() {
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((state) => state.token)
  const budgets = useAppSelector((state) => state.budgets)
  const { year, month } = useAppSelector((state) => state.yearMonth)

  const [expense, setExpense] = useState({
    category: '',
    amount: 0,
    budget_id: null as number | null,
    date: new Date(`${year}-${month}-01`),
    budgetName: '',
  })

  useEffect(() => {
    setExpense((prevExpense) => {
      const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth()
      const startDate = new Date(parseInt(year), monthNumber, 1)
      const timezoneOffset = startDate.getTimezoneOffset() * 60 * 1000 // convert minutes to milliseconds
      const startDateLocal = new Date(startDate.getTime() - timezoneOffset)

      return { ...prevExpense, date: startDateLocal }
    })
  }, [year, month])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const budget = budgets.data.find(
      (budget) => budget.id === expense.budget_id
    )
    const updatedExpense = {
      ...expense,
      date: expense.date.toISOString(),
      budgetName: budget && budget.name ? budget.name : 'Uncategorized',
    }

    dispatch(addExpense(updatedExpense, accessToken as string))
    setExpense({
      category: '',
      amount: 0,
      budget_id: null,
      date: new Date(`${year}-${month}-01`),
      budgetName: '',
    })
  }

  if (budgets.isLoading) {
    return <></>
  }

  if (!budgets) {
    return <></>
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="expense-description">New Expense:</label>
        <input
          required
          type="text"
          id="expense-description"
          value={expense.category}
          onChange={(e) => {
            setExpense({ ...expense, category: e.target.value })
          }}
        />
        <label htmlFor="expense-amount">
          Amount to Allocated to this budget
        </label>
        <input
          required
          type="number"
          id="expense-amount"
          min={0}
          value={expense.amount}
          onChange={(e) => {
            const value = e.target.value
            if (value === '') {
              setExpense({ ...expense, amount: 0 })
            } else {
              const amount = Number(value)
              setExpense({ ...expense, amount })
            }
          }}
        />
        <DatePicker
          label={'expense-date'}
          value={expense.date}
          onChange={(newDate) => {
            setExpense({ ...expense, date: newDate || new Date() })
          }}
          slotProps={{
            textField: {
              helperText: 'MM / DD / YYYY',
            },
          }}
          minDate={new Date(`${year}-${month}-01`)}
          maxDate={
            new Date(
              new Date(`${year}-${month}-01`).getFullYear(),
              new Date(`${year}-${month}-01`).getMonth() + 1,
              0
            )
          }
        />
        <label htmlFor="expense-budget">Budget:</label>
        <select
          id="expense-budget"
          value={expense.budget_id === null ? '' : expense.budget_id}
          onChange={(e) => {
            const value = e.target.value
            const budgetId = value === '' ? null : Number(value)
            setExpense({ ...expense, budget_id: budgetId })
          }}
        >
          <option value="">Uncategorized</option>
          {budgets.data.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Expense</button>
      </form>
    </>
  )
}
