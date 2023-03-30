import { Budget } from '../../Models/budget'
import { Expenses } from '../../Models/expenses'
import connection from './connection'

export function getAllBudgets(
  userId: string,
  db = connection
): Promise<Budget[]> {
  return db('budgets').where({ user_id: userId }).select()
}

export async function addBudgets(
  newBudget: Partial<Budget>,
  userId: string,
  db = connection
): Promise<number> {
  return db('budgets').insert({
    user_id: userId,
    name: newBudget.name,
    amount: newBudget.amount,
    date: newBudget.date,
  })
}

export async function deleteBudget(
  budgetId: number,
  db = connection
): Promise<number> {
  return db('budgets').where({ id: budgetId }).del()
}

export async function updateBudget(
  id: number,
  newBudgetDetail: Partial<Budget>,
  db = connection
): Promise<Budget> {
  const [updatedBudget] = await db('budgets')
    .where({ id })
    .update({
      name: newBudgetDetail.name,
      amount: newBudgetDetail.amount,
    })
    .returning('*')
  return updatedBudget
}

export async function getAllExpenses(
  userId: number,
  db = connection
): Promise<Expenses[]> {
  return db('expenses').where({ user_id: userId }).select()
}

export async function getAllExpensesByCategory(
  budgetId: number,
  db = connection
): Promise<Expenses[]> {
  return db('expenses').where({ budget_id: budgetId }).select()
}

export async function updateExpense(
  id: number,
  newExpenseDetails: Partial<Expenses>,
  db = connection
): Promise<Expenses> {
  await db('expenses').where({ id }).update({
    category: newExpenseDetails.category,
    amount: newExpenseDetails.amount,
    date: newExpenseDetails.date,
    budget_id: newExpenseDetails.budget_id,
  })
  return db('expenses').where({ id }).select().first()
}

export async function deleteExpenses(
  id: number,
  db = connection
): Promise<number> {
  return db('expenses').where({ id }).del()
}

export async function addExpenses(
  userId: number,
  budgetId: number,
  newExpense: Partial<Expenses>,
  db = connection
) {
  return db('expenses').insert({
    user_id: userId,
    category: newExpense.category,
    amount: newExpense.amount,
    date: newExpense.date,
    budget_id: budgetId,
  })
}

export async function getBudgetById(id: number, db = connection) {
  return db('budgets').where({ id }).select().first()
}
export async function getExpenseById(id: number, db = connection) {
  return db('expenses').where({ id }).select().first()
}
export async function getTotalExpensesByBudgetId(
  budgetId: number,
  db = connection
): Promise<number> {
  const result = await db('expenses')
    .where({ budget_id: budgetId })
    .sum('amount as totalAmount')
    .first()
  return result?.totalAmount || 0
}
