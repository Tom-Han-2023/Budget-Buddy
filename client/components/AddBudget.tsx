import { useEffect, useState } from 'react'
import { addBudget } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DatePicker, DateValidationError } from '@mui/x-date-pickers'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue'

export default function AddBudget() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.token)
  const { year, month } = useAppSelector((state) => state.yearMonth)

  const [budget, setBudget] = useState({
    name: '',
    amount: 0,
    date: new Date(),
  })

  useEffect(() => {
    setBudget((prevBudget) => {
      const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth()
      const startDate = new Date(parseInt(year), monthNumber, 1)
      const timezoneOffset = startDate.getTimezoneOffset() * 60 * 1000 // convert minutes to milliseconds
      const startDateLocal = new Date(startDate.getTime() - timezoneOffset)

      return { ...prevBudget, date: startDateLocal }
    })
  }, [year, month])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(addBudget(budget, accessToken.accessToken as string))
    setBudget({ name: '', amount: 0, date: new Date() })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="budget-name">Name of new Budget:</label>
        <input
          required
          type="text"
          id="budget-name"
          value={budget.name}
          onChange={(e) => {
            setBudget({ ...budget, name: e.target.value })
          }}
        />
        <label htmlFor="budget-amount">
          Amount to Allocated to this budget
        </label>
        <input
          required
          type="number"
          id="budget-amount"
          value={budget.amount}
          onChange={(e) => {
            const value = e.target.value
            if (value === '') {
              setBudget({ ...budget, amount: 0 })
            } else {
              const amount = Number(value)
              setBudget({ ...budget, amount })
            }
          }}
        />

        <DatePicker
          label={'The month, this budget belongs to'}
          views={['year', 'month']}
          value={budget.date}
          onChange={(
            newValue: Date | null,
            context: PickerChangeHandlerContext<DateValidationError>
          ) => {
            if (!context.validationError) {
              setBudget({ ...budget, date: newValue || new Date() })
            }
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
        <button type="submit">Add Budget</button>
      </form>
    </>
  )
}
