import { useState } from 'react'
import { updateBudget } from '../actions/budgets'
import { useAppDispatch, useAppSelector } from '../hooks'
import EditSharpIcon from '@mui/icons-material/EditSharp'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Prop {
  budgetid: number
  budgetName: string
  budgetAmount: number
}

function UpdateBudget(props: Prop) {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.token)
  const [budget, setBudget] = useState({
    name: props.budgetName,
    amount: props.budgetAmount,
  })
  const [open, setOpen] = useState<boolean>(false)

  function handleSubmit() {
    dispatch(
      updateBudget(props.budgetid, accessToken.accessToken as string, budget)
    )
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
      <EditSharpIcon onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the new details for the Budget
          </DialogContentText>
          <form>
            <TextField
              style={{ marginTop: 30 }}
              required
              margin="dense"
              id="new-budget-name"
              label="New Budget Name"
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
              id="new-budget-amount"
              label="New Budget Amount"
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

export default UpdateBudget
