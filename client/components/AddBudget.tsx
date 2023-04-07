import { useState } from 'react'
import { addBudget } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function AddBudget() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.token)

  const [budget, setBudget] = useState({
    name: '',
    amount: 0,
    date: new Date(),
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBudget(budget, accessToken.accessToken as string))
    setBudget({ name: '', amount: 0, date: new Date() })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="budget-name">Name of new Budget:</label>
        <input
          required
          type="text"
          name="budget-name"
          id="budget-name"
          value={budget.name}
          onChange={(e) => {
            setBudget({ ...budget, name: e.target.value })
          }}
        />
        <label htmlFor="budget-amount">
          Amount to Allocated to this budget
        </label>
        <input
          required
          type="number"
          name="budget-amount"
          id="budget-amount"
          value={budget.amount}
          onChange={(e) => {
            const value = e.target.value
            if (value === '') {
              setBudget({ ...budget, amount: 0 })
            } else {
              const amount = Number(value)
              setBudget({ ...budget, amount })
            }
          }}
        />
        <label htmlFor="budget-date">Month and Year</label>
        <DatePicker
          selected={budget.date}
          onChange={(date: Date) => setBudget({ ...budget, date })}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          id="budget-date"
        />
        <button type="submit">Add Budget</button>
      </form>
    </>
  )
}
