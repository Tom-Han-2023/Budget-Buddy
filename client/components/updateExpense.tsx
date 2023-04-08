import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue'
import { DatePicker, DateValidationError } from '@mui/x-date-pickers'
import { updateExpense } from '../actions/expenses'

interface Prop {
  expenseId: number
  budget_id: number | null
  category: string
  expenseAmount: number
  date: string
  budgetName: string
}

interface State {
  budget_id: number | null
  category: string
  amount: number
  date: Date
}

function UpdateExpense(props: Prop) {
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((state) => state.token)
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const budgets = useAppSelector((state) => state.budgets)
  const [expense, setExpense] = useState<State>({
    budget_id: props.budget_id,
    category: props.category,
    amount: props.expenseAmount,
    date: new Date(props.date),
  })
  const [clicked, setClicked] = useState<boolean>(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const budget = budgets.data.find(
      (budget) => budget.id === expense.budget_id
    )
    const updatedExpense = {
      ...expense,
      date: expense.date.toISOString(),
      budgetName: budget && budget.name ? budget.name : 'Uncategorized',
    }
    dispatch(
      updateExpense(props.expenseId, updatedExpense, accessToken as string)
    )
    setClicked(false)
  }

  return (
    <>
      <button onClick={() => setClicked(true)}>Edit Expense</button>
      {clicked && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-expense-description">
            New Description of expense:
          </label>
          <input
            required
            type="text"
            name="new-expense-description"
            id="new-budget-name"
            value={expense.category}
            onChange={(e) => {
              setExpense({ ...expense, category: e.target.value })
            }}
          />
          <label htmlFor="new-budget-amount">New amount for this expense</label>
          <input
            required
            type="number"
            name="new-expense-amount"
            id="new-expense-amount"
            value={expense.amount}
            onChange={(e) => {
              const value = e.target.value
              if (value === '') {
                setExpense({ ...expense, amount: 0 })
              } else {
                const amount = Number(value)
                setExpense({ ...expense, amount })
              }
            }}
          />
          <label htmlFor="expense-budget">Budget:</label>
          <select
            id="expense-budget"
            value={expense.budget_id === null ? '' : expense.budget_id}
            onChange={(e) => {
              const value = e.target.value
              const budgetId = value === '' ? null : Number(value)
              setExpense({ ...expense, budget_id: budgetId })
            }}
          >
            <option value="">Uncategorized</option>
            {budgets.data.map((budget) => (
              <option key={budget.id} value={budget.id}>
                {budget.name}
              </option>
            ))}
          </select>

          <DatePicker
            label={'expense-date'}
            value={expense.date}
            onChange={(
              newValue: Date | null,
              context: PickerChangeHandlerContext<DateValidationError>
            ) => {
              if (!context.validationError) {
                setExpense({ ...expense, date: newValue || new Date() })
              }
            }}
            slotProps={{
              textField: {
                helperText: 'MM / DD / YYYY',
              },
            }}
            minDate={new Date(`${year}-${month}-01`)}
            maxDate={
              new Date(
                new Date(`${year}-${month}-01`).getFullYear(),
                new Date(`${year}-${month}-01`).getMonth() + 1,
                0
              )
            }
          />

          <button type="submit">Update expense</button>
        </form>
      )}
    </>
  )
}

export default UpdateExpense
