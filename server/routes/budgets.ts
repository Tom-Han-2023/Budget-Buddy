import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import {
  addBudgets,
  deleteBudget,
  getAllBudgets,
  getAllExpensesByCategory,
  getBudgetById,
  getTotalExpensesByBudgetId,
  updateBudget,
} from '../db/db'

const router = express.Router()

// /api/v1/budgets'
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userId = req.auth?.sub

    const { year, month } = req.query
    if (!userId || !year || !month) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const budgets = await getAllBudgets(userId, year as string, month as string)
    res.json(budgets)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the budgets :(',
    })
  }
})

// /api/v1/budgets'
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const newBudget = { ...req.body }
    const userId = req.auth?.sub
    if (!userId) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const [{ id }] = await addBudgets(newBudget, userId)
    res.json({ id, user_id: userId, ...req.body })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to add the budgets :(',
    })
  }
})

// /api/v1/budgets/:id
router.get('/:budgetId', async (req, res) => {
  try {
    const budgetId = parseInt(req.params.budgetId)
    const budget = await getBudgetById(budgetId)
    res.json(budget)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the expense :(',
    })
  }
})

// /api/v1/budgets/:id

router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userId = req.auth?.sub
    if (!userId) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const budgetId = parseInt(req.params.id)
    const newBudgetDetail = { ...req.body }
    await updateBudget(budgetId, newBudgetDetail)
    res.json({ id: budgetId, user_id: userId, ...req.body })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to update the budget :(',
    })
  }
})

// /api/v1/budgets/:id
router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const budgetId = parseInt(req.params.id)
    await deleteBudget(budgetId)
    res.json(budgetId)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete the post :(',
    })
  }
})

// /api/v1/budgets/:budgetId/expenses
router.get('/:budgetId/expenses', async (req, res) => {
  try {
    const budgetId = parseInt(req.params.budgetId)
    const expensesUnderBudget = await getAllExpensesByCategory(budgetId)
    res.json(expensesUnderBudget)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get all expenses under budget :(',
    })
  }
})

// /api/v1/budgets/:budgetid/expenses/total'
router.get('/:budgetId/expenses/total', async (req, res) => {
  try {
    const budgetId = parseInt(req.params.budgetId)
    const totalExpense = await getTotalExpensesByBudgetId(budgetId)
    res.json(totalExpense)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to get the total expenses :(',
    })
  }
})

export default router
