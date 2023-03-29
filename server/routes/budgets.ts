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
interface Query {
  userId: string
}

// /api/v1/budgets'
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query as Query
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
    const newBudget = { ...req.body }
    const updatedlist = await addBudgets(newBudget)
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
    const { userId } = req.query as unknown as Query
    const updatedBudgetList = await deleteBudget(budgetId, userId)
    res.json(updatedBudgetList)
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
