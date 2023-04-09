import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import {
  addExpenses,
  deleteExpenses,
  getAllExpenses,
  getExpenseById,
  updateExpense,
} from '../db/db'

const router = express.Router()

export default router

// /api/v1/expenses'
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { year, month } = req.query
    const userId = req.auth?.sub
    if (!userId || !year || !month) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }

    const expenses = await getAllExpenses(
      userId,
      year as string,
      month as string
    )
    const AllExpenses = expenses.map((expense) => {
      return expense.budgetName
        ? expense
        : { ...expense, budgetName: 'Uncategorized' }
    })
    res.json(AllExpenses)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the expenses :(',
    })
  }
})

// /api/v1/expenses/
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userId = req.auth?.sub
    if (!userId) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const newExpense = { ...req.body }
    const [{ id }] = await addExpenses(userId, newExpense)
    res.json({ id, user_id: userId, ...req.body })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete the post :(',
    })
  }
})

// /api/v1/expenses/:id'
router.get('/:expenseid', checkJwt, async (req: JwtRequest, res) => {
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

// /api/v1/expenses/:id'
router.patch('/:expenseid', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userId = req.auth?.sub
    if (!userId) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const expenseId = parseInt(req.params.expenseid)
    const newExpenseDetails = { ...req.body }
    await updateExpense(expenseId, newExpenseDetails)
    res.json({ id: expenseId, user_id: userId, ...req.body })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to update the expense :(',
    })
  }
})

// /api/v1/expenses/:id'
router.delete('/:expenseid', checkJwt, async (req: JwtRequest, res) => {
  try {
    const expenseId = parseInt(req.params.expenseid)
    await deleteExpenses(expenseId)
    res.json(expenseId)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete the expense :(',
    })
  }
})
