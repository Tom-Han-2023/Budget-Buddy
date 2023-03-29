import { removeBudget } from '../actions/budgets'
import { useAppDispatch } from '../hooks'

interface Prop {
  budgetid: number
  userId: string
}

function DeleteBudget(prop: Prop) {
  const dispatch = useAppDispatch()

  function handleClick(budgetid: number, userid: string) {
    dispatch(removeBudget(budgetid, userid))
  }

  return (
    <>
      <button onClick={() => handleClick(prop.budgetid, prop.userId)}>
        Delete Budget
      </button>
    </>
  )
}

export default DeleteBudget
