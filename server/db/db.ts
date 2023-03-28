import { Budget } from '../../Models/budget'
import { Expenses } from '../../Models/expenses'
import connection from './connection'

export function getAllBudgets(
  userId: number,
  db = connection
): Promise<Budget[]> {
  return db('budgets').where({ user_id: userId }).select()
}

export async function addBudgets(
  userId: number,
  newBudget: Partial<Budget>,
  db = connection
): Promise<Budget[]> {
  await db('budgets').insert({
    user_id: userId,
    name: newBudget.name,
    amount: newBudget.amount,
    date: newBudget.date,
  })
  return db('budgets').where({ user_id: userId }).select()
}

export async function deleteBudget(
  id: number,
  db = connection
): Promise<number> {
  return db('budgets').where({ id }).del()
}

export async function updateBudgets(
  id: number,
  newBudgetDetail: Partial<Budget>,
  db = connection
): Promise<Budget> {
  await db('budgets').where({ id }).update({
    name: newBudgetDetail.name,
    amount: newBudgetDetail.amount,
    date: newBudgetDetail.date,
  })
  return db('budgets').where({ id }).select().first()
}

export async function getAllExpenses(
  userId: number,
  db = connection
): Promise<Expenses[]> {
  return db('expenses').where({ user_id: userId }).select()
}

export async function getAllExpensesByCategory(
  userId: number,
  budgetId: number,
  db = connection
): Promise<Expenses[]> {
  return db('expenses').where({ budget_id: budgetId, user_id: userId }).select()
}

export async function updateExpenses(
  id: number,
  newExpenseDetails: Partial<Expenses>,
  db = connection
): Promise<Expenses> {
  await db('expenses').where({ id }).update({
    category: newExpenseDetails.category,
    amount: newExpenseDetails.amount,
    date: newExpenseDetails.date,
  })
  return db('budget').where({ id }).select().first()
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
