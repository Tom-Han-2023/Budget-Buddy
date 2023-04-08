import { removeExpense } from '../actions/expenses'
import { useAppDispatch, useAppSelector } from '../hooks'

interface Prop {
  expenseId: number
}

const DeleteExpense = (prop: Prop) => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.token)

  function handleClick(expenseId: number, token: string) {
    dispatch(removeExpense(expenseId, token))
  }

  return (
    <>
      <button
        onClick={() =>
          handleClick(prop.expenseId, accessToken.accessToken as string)
        }
      >
        Delete Budget
      </button>
    </>
  )
}

export default DeleteExpense
