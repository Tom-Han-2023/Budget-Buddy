import express from 'express'
import {
  deleteExpenses,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from '../db/db'

const router = express.Router()

export default router
const userId = 1

// /api/v1/spendings'
router.get('/', async (req, res) => {
  try {
    const expenses = await getAllExpenses(userId)
    res.json(expenses)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the expenses :(',
    })
  }
})

// /api/v1/spendings/:id'
router.get('/:expenseid', async (req, res) => {
  try {
    const expenseId = parseInt(req.params.expenseid)
    const expense = await getExpenseById(expenseId)
    res.json(expense)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the expense :(',
    })
  }
})

// /api/v1/spendings/:id'
router.patch('/:expenseid', async (req, res) => {
  try {
    const expenseId = parseInt(req.params.expenseid)
    const newExpenseDetails = { ...req.body }
    const expense = await updateExpense(expenseId, newExpenseDetails)
    res.json(expense)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to update the expense :(',
    })
  }
})

// /api/v1/spendings/:id'
router.delete('/:expenseid', async (req, res) => {
  try {
    const expenseId = parseInt(req.params.expenseid)
    await deleteExpenses(expenseId)
    res.status(200).json('ok')
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete the expense :(',
    })
  }
})
