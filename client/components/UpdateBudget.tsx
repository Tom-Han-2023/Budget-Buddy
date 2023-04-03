import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateBudget } from '../actions/budgets'
import { useAppDispatch } from '../hooks'
import { RootState } from '../store'

interface Prop {
  budgetid: number
  budgetName: string
  budgetAmount: number
}

function UpdatedBudget(props: Prop) {
  const dispatch = useAppDispatch()
  const accessToken = useSelector((state: RootState) => state.tokenReducer)
  const [budget, setBudget] = useState({
    name: props.budgetName,
    amount: props.budgetAmount,
  })
  const [clicked, setClicked] = useState<boolean>(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(
      updateBudget(props.budgetid, accessToken.accessToken as string, budget)
    )
    setClicked(false)
  }

  return (
    <>
      <button onClick={() => setClicked(true)}>Edit Budget</button>
      {clicked && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-budget-name">New Budget Name:</label>
          <input
            required
            type="text"
            name="new-budget-name"
            id="new-budget-name"
            value={budget.name}
            onChange={(e) => {
              setBudget({ ...budget, name: e.target.value })
            }}
          />
          <label htmlFor="new-budget-amount">
            New amount allocated to this budget
          </label>
          <input
            required
            type="number"
            name="new-budget-amount"
            id="new-budget-amount"
            value={budget.amount}
            onChange={(e) => {
              setBudget({ ...budget, amount: parseInt(e.target.value) })
            }}
          />{' '}
          <button type="submit">Update Budget</button>
        </form>
      )}
    </>
  )
}

export default UpdatedBudget
