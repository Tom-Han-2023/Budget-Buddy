import express from 'express'
import { Month, Year } from '../../Models/monthYear'
import checkJwt, { JwtRequest } from '../auth0'
import { addBudgets, deleteBudget, getAllBudgets, updateBudget } from '../db/db'

const router = express.Router()

// /api/v1/budgets'
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const userId = req.auth?.sub

    const { year, month } = req.query
    if (!userId) {
      console.error('No userId')
      return res.status(401).send('Unauthorized')
    }
    const budgets = await getAllBudgets(userId, year as Year, month as Month)
    budgets.forEach((budget) => {
      budget.amount = parseInt(budget.amount as string)
    })
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
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'There was an error trying to delete the post :(',
    })
  }
})

export default router
