const knex = require('knex')
const config = require('../knexfile')
const testConnection = knex(config.test)

import {
  getAllBudgets,
  addBudgets,
  updateBudget,
  deleteBudget,
  getAllExpenses,
  addExpenses,
  updateExpense,
  deleteExpenses,
} from '../db'

beforeAll(() => {
  return testConnection.migrate.latest()
})

beforeEach(() => {
  return testConnection.seed.run()
})

describe('getAllBudgets', () => {
  it('should get all the budget of a user that is within the given month and year', async () => {
    const userId = '1'
    const month = 'March'
    const year = '2023'

    const response = await getAllBudgets(userId, year, month, testConnection)
    expect(response).toHaveLength(2)
    expect(response[0].name).toBe('Groceries')
    expect(response[1].amount).toBe(1000)
  })
})

describe('addBudgets', () => {
  it('should add budget to the database', async () => {
    const userId = '1'
    const newBudget = {
      name: 'Food',
      amount: 300,
      date: new Date('2023-03-21T11:00:00.000Z'),
    }

    const [{ id }] = await addBudgets(newBudget, userId, testConnection)
    expect(id).toBe(7)
    const budget = await testConnection('budgets')
      .where({ id })
      .select()
      .first()
    expect(budget.name).toBe('Food')
    expect(budget.amount).toBe(300)
  })
})

describe('deleteBudget', () => {
  it('should delete budget from the database', async () => {
    const budgetId = 1
    await deleteBudget(budgetId, testConnection)
    const budgets = await testConnection('budgets').select()
    expect(budgets).toHaveLength(5)
    expect(budgets[0].id).not.toBe(1)
  })
})
describe('updateBudget', () => {
  it('should update budget to the database', async () => {
    const budgetId = 1
    const newBudgetDetail = {
      name: 'Food',
      amount: 500,
    }
    await updateBudget(budgetId, newBudgetDetail, testConnection)
    const budget = await testConnection('budgets')
      .where({ id: 1 })
      .select()
      .first()
    expect(budget.name).toBe('Food')
    expect(budget.amount).toBe(500)
  })
})

describe('getAllExpenses', () => {
  it('should get all the expenses of a user that is within the given month and year', async () => {
    const userId = '1'
    const month = 'March'
    const year = '2023'

    const response = await getAllExpenses(userId, year, month, testConnection)
    expect(response).toHaveLength(3)
    expect(response[0].category).toBe('Food')
    expect(response[1].amount).toBe(75)
    expect(response[2].category).toBe('Rent')
  })
})

describe('addExpenses', () => {
  it('should add expense to the database', async () => {
    const userId = '1'
    const newExpense = {
      category: 'Toothpaste',
      amount: 10,
      date: '2023-03-20T11:00:00.000Z',
      budget_id: 2,
    }

    const [{ id }] = await addExpenses(userId, newExpense, testConnection)
    expect(id).toBe(10)
    const expenses = await testConnection('expenses')
      .where({ id })
      .select()
      .first()
    expect(expenses.category).toBe('Toothpaste')
    expect(expenses.amount).toBe(10)
    expect
  })
})

describe('deleteExpense', () => {
  it('should delete expense from the database', async () => {
    const expenseid = 1
    await deleteExpenses(expenseid, testConnection)
    const expenses = await testConnection('expenses').select()
    expect(expenses).toHaveLength(8)
    expect(expenses[0].id).not.toBe(1)
  })
})

describe('updateExpense', () => {
  it('should update expense to the database', async () => {
    const expenseId = 1
    const newExpenseDetail = {
      category: 'ToothPaste',
      amount: 500,
      date: '2023-03-20T11:00:00.000Z',
      budget_id: 2,
    }
    await updateExpense(expenseId, newExpenseDetail, testConnection)
    const expense = await testConnection('expenses')
      .where({ id: 1 })
      .select()
      .first()
    expect(expense.category).toBe('ToothPaste')
    expect(expense.amount).toBe(500)
    expect(expense.date).toBe('2023-03-20T11:00:00.000Z')
    expect(expense.budget_id).toBe(2)
  })
})
