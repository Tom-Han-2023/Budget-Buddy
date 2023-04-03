import { useSelector } from 'react-redux'
import { removeBudget } from '../actions/budgets'
import { useAppDispatch } from '../hooks'
import { RootState } from '../store'

interface Prop {
  budgetid: number
}

function DeleteBudget(prop: Prop) {
  const dispatch = useAppDispatch()
  const accessToken = useSelector((state: RootState) => state.tokenReducer)

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
