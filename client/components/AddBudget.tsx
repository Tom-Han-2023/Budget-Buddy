import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { addBudget } from '../actions/budgets'
import { useAppDispatch } from '../hooks'

interface Props {
  token: string
}

export default function AddBudget(prop: Props) {
  const timestamp = Date.now()
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  const dispatch = useAppDispatch()

  const [budget, setBudget] = useState({
    name: '',
    amount: 0,
    date: formattedDate,
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBudget(budget, prop.token))
    setBudget({ name: '', amount: 0, date: formattedDate })
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
            setBudget({ ...budget, amount: parseInt(e.target.value) })
          }}
        />
        <label htmlFor="budget-date" hidden>
          Todays date
        </label>
        <input
          readOnly
          hidden
          type="number"
          name="budget-date"
          id="budget-date"
          value={formattedDate}
        />
        <button type="submit">Add Budget</button>
      </form>
    </>
  )
}
