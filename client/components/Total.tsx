import { Budget } from '../../Models/budget'
import { Expenses } from '../../Models/expenses'
import { useAppSelector } from '../hooks'
import Typography from '@mui/material/Typography'

function Total() {
  const budgets = useAppSelector((state) => state.budgets)
  const expenses = useAppSelector((state) => state.expenses)

  const totalBudgeted = budgets.data
    .map((budgets) => {
      return budgets
    })
    .reduce((sum: number, budget: Budget) => {
      return sum + budget.amount
    }, 0)

  const totalSpent = expenses.data
    .map((expenses) => {
      return expenses
    })
    .reduce((sum: number, expense: Expenses) => {
      return sum + expense.amount
    }, 0)

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        <h2>Budget Summary</h2>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <p>Total Budgeted: ${totalBudgeted}</p>
      </Typography>
      <Typography variant="body1" gutterBottom>
        <p>Total Spent: ${totalSpent}</p>
      </Typography>
    </div>
  )
}

export default Total
