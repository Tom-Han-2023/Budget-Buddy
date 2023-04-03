import express from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import {
  addBudgets,
  addExpenses,
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
    if (!userId) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const budgets = await getAllBudgets(userId)
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
    const newBudgetId = await addBudgets(newBudget, userId)
    res.json({ ...req.body, user_id: userId, id: newBudgetId[0] })
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
    const updatedBudget = await updateBudget(budgetId, newBudgetDetail)
    res.json(updatedBudget)
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
// /api/v1/budgets/:budgetId/expenses
router.post('/:budgetId/expenses', async (req, res) => {
  try {
    const budgetId = parseInt(req.params.budgetId)
    const newExpense = { ...req.body }
    await addExpenses(userId, budgetId, newExpense)
    res.status(200).json('ok')
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete the post :(',
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
