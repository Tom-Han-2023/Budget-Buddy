import { Budget } from '../../Models/budget'
import { Expenses } from '../../Models/expenses'
import { useAppSelector } from '../hooks'

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
      <h2>Budget Summary</h2>
      <p>Total Budgeted: ${totalBudgeted}</p>
      <p>Total Spent: ${totalSpent}</p>
    </div>
  )
}

export default Total
