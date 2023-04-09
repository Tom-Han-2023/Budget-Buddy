import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { DatePicker } from '@mui/x-date-pickers'
import { addExpense } from '../actions/expenses'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

export default function AddExpenses() {
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((state) => state.token)
  const budgets = useAppSelector((state) => state.budgets)
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const [open, setOpen] = useState<boolean>(false)

  const [expense, setExpense] = useState({
    category: '',
    amount: 0,
    budget_id: null as number | null,
    date: new Date(`${year}-${month}-01`),
    budgetName: '',
  })

  useEffect(() => {
    setExpense((prevExpense) => {
      const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth()
      const startDate = new Date(parseInt(year), monthNumber, 1)
      const timezoneOffset = startDate.getTimezoneOffset() * 60 * 1000 // convert minutes to milliseconds
      const startDateLocal = new Date(startDate.getTime() - timezoneOffset)

      return { ...prevExpense, date: startDateLocal }
    })
  }, [year, month])

  function handleSubmit() {
    const budget = budgets.data.find(
      (budget) => budget.id === expense.budget_id
    )
    const updatedExpense = {
      ...expense,
      date: expense.date.toISOString(),
      budgetName: budget && budget.name ? budget.name : 'Uncategorized',
    }

    dispatch(addExpense(updatedExpense, accessToken as string))
    setExpense({
      category: '',
      amount: 0,
      budget_id: null,
      date: new Date(`${year}-${month}-01`),
      budgetName: '',
    })
    handleClose()
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (budgets.isLoading) {
    return <></>
  }

  if (!budgets) {
    return <></>
  }

  return (
    <>
      <AddCircleSharpIcon style={{ padding: 25 }} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the new details of the Expense
          </DialogContentText>
          <form>
            <TextField
              style={{ marginTop: 30 }}
              required
              margin="dense"
              id="expense-description"
              label="Expense Description"
              type="text"
              fullWidth
              value={expense.category}
              onChange={(e) => {
                setExpense({ ...expense, category: e.target.value })
              }}
            />
            <TextField
              required
              margin="dense"
              id="expense-amount"
              label="Expense Amount"
              type="number"
              fullWidth
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
              variant="standard"
            />
            <div style={{ marginTop: 30 }}>
              <FormControl fullWidth required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="budget-category">Budget Category</InputLabel>
                <Select
                  labelId="budget-category"
                  id="budget-category"
                  value={expense.budget_id === null ? '' : expense.budget_id}
                  label="Budget Category"
                  onChange={(e) => {
                    const value = e.target.value
                    const budgetId = value === '' ? null : Number(value)
                    setExpense({ ...expense, budget_id: budgetId })
                  }}
                >
                  <MenuItem value="">Uncategorized</MenuItem>
                  {budgets.data.map((budget) => (
                    <MenuItem value={budget.id} key={budget.id}>
                      {budget.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div style={{ marginTop: 30 }}>
              <DatePicker
                label={'expense-date'}
                value={expense.date}
                onChange={(newDate) =>
                  setExpense({ ...expense, date: newDate || new Date() })
                }
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
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
