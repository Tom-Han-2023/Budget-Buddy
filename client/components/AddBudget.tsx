import { useEffect, useState } from 'react'
import { addBudget } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import { DatePicker } from '@mui/x-date-pickers'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AddBudget() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.token)
  const { year, month } = useAppSelector((state) => state.yearMonth)
  const [open, setOpen] = useState<boolean>(false)

  const [budget, setBudget] = useState({
    name: '',
    amount: 0,
    date: new Date(`${year}-${month}-01`),
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

  function handleSubmit() {
    dispatch(addBudget(budget, accessToken.accessToken as string))
    setBudget({ name: '', amount: 0, date: new Date(`${year}-${month}-02`) })
    handleClose()
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <AddCircleSharpIcon
        data-testid="add-budget-button"
        style={{ padding: 25 }}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Budget</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the details for the new Budget
          </DialogContentText>
          <TextField
            style={{ marginTop: 30 }}
            required
            margin="dense"
            id="budget-name"
            label="Budget Name"
            type="text"
            fullWidth
            value={budget.name}
            onChange={(e) => {
              setBudget({ ...budget, name: e.target.value })
            }}
          />
          <TextField
            required
            margin="dense"
            id="budget-amount"
            label="Budget Amount"
            type="number"
            fullWidth
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
            variant="standard"
          />
          <div style={{ marginTop: 30 }}>
            <DatePicker
              label={'The month, this budget belongs to'}
              views={['year', 'month']}
              value={budget.date}
              onChange={(newDate) =>
                setBudget({ ...budget, date: newDate || new Date() })
              }
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
