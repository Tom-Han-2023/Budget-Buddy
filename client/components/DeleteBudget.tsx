import { removeBudget } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'

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
      <DeleteSharpIcon
        data-testid="delete-budget-button"
        onClick={() =>
          handleClick(prop.budgetid, accessToken.accessToken as string)
        }
      />
    </>
  )
}

export default DeleteBudget
