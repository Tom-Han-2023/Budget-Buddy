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
      <Typography variant="h4" component="h1" gutterBottom>
        Budget Summary
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Budgeted: <strong>${totalBudgeted} </strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total Spent: <strong>${totalSpent} </strong>
      </Typography>
    </div>
  )
}

export default Total
