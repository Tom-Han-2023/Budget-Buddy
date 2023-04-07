import { removeBudget } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'

interface Prop {
  budgetid: number
}

function DeleteBudget(prop: Prop) {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.token)

  function handleClick(budgetid: number, token: string) {
    dispatch(removeBudget(budgetid, token))
  }

  return (
    <>
      <button
        onClick={() =>
          handleClick(prop.budgetid, accessToken.accessToken as string)
        }
      >
        Delete Budget
      </button>
    </>
  )
}

export default DeleteBudget
