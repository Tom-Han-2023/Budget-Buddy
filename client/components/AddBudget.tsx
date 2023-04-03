import { useState } from 'react'
import { useSelector } from 'react-redux'
import { addBudget } from '../actions/budgets'

import { useAppDispatch } from '../hooks'
import { RootState } from '../store'

export default function AddBudget() {
  const dispatch = useAppDispatch()
  const accessToken = useSelector((state: RootState) => state.tokenReducer)

  const [budget, setBudget] = useState({
    name: '',
    amount: 0,
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBudget(budget, accessToken.accessToken as string))
    setBudget({ name: '', amount: 0 })
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

        <button type="submit">Add Budget</button>
      </form>
    </>
  )
}
