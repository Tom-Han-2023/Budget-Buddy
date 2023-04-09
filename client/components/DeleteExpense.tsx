import { removeExpense } from '../actions/expenses'
import { useAppDispatch, useAppSelector } from '../hooks'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'

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
      <DeleteSharpIcon
        onClick={() =>
          handleClick(prop.expenseId, accessToken.accessToken as string)
        }
      />
    </>
  )
}

export default DeleteExpense
