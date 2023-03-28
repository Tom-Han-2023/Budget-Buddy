import express from 'express'
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
const userId = 1
const timestamp = Date.now()
const date = new Date(timestamp)

const year = date.getFullYear()
const month = String(date.getMonth() + 1).padStart(2, '0')
const day = String(date.getDate()).padStart(2, '0')

const formattedDate = `${year}-${month}-${day}`

// /api/v1/budgets'
router.get('/', async (req, res) => {
  try {
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
router.post('/', async (req, res) => {
  try {
    const newBudget = { ...req.body, date: formattedDate }
    const updatedlist = await addBudgets(userId, newBudget)
    res.json(updatedlist)
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

router.patch('/:id', async (req, res) => {
  try {
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
router.delete('/:id', async (req, res) => {
  try {
    const budgetId = parseInt(req.params.id)
    await deleteBudget(budgetId)
    res.status(200).json('OK')
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
