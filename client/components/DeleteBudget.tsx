import { removeBudget } from '../actions/budgets'
import { useAppDispatch } from '../hooks'

interface Prop {
  budgetid: number
  token: string
}

function DeleteBudget(prop: Prop) {
  const dispatch = useAppDispatch()

  function handleClick(budgetid: number, token: string) {
    dispatch(removeBudget(budgetid, token))
  }

  return (
    <>
      <button onClick={() => handleClick(prop.budgetid, prop.token)}>
        Delete Budget
      </button>
    </>
  )
}

export default DeleteBudget
