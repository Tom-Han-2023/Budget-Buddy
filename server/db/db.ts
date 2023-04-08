import { Budget, UpdateBudget } from '../../Models/budget'
import { Expenses } from '../../Models/expenses'
import connection from './connection'

export function getAllBudgets(
  userId: string | number,
  year: string,
  month: string,
  db = connection
): Promise<Budget[]> {
  const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth()

  const startDate = new Date(parseInt(year), monthNumber, 1)
  const endDate = new Date(parseInt(year), monthNumber + 1, 1)
  endDate.setHours(-1, 0, 0, 0)

  const timezoneOffset = startDate.getTimezoneOffset() * 60 * 1000 // convert minutes to milliseconds
  const startDateLocal = new Date(
    startDate.getTime() - timezoneOffset
  ).toISOString()
  const endDateLocal = new Date(
    endDate.getTime() - timezoneOffset
  ).toISOString()

  return db('budgets')
    .where('user_id', userId)
    .whereBetween('date', [startDateLocal, endDateLocal])
    .select('id', 'user_id', 'name', 'amount')
}

export async function addBudgets(
  newBudget: Partial<Budget>,
  userId: string | number,
  db = connection
): Promise<{ id: number }[]> {
  return db('budgets')
    .insert({
      user_id: userId,
      name: newBudget.name,
      amount: newBudget.amount,
      date: newBudget.date,
    })
    .returning(['id'])
}

export async function deleteBudget(
  budgetId: number,
  db = connection
): Promise<number> {
  return db('budgets').where({ id: budgetId }).del()
}

export async function updateBudget(
  id: number,
  newBudgetDetail: UpdateBudget,
  db = connection
) {
  return db('budgets').where({ id }).update({
    name: newBudgetDetail.name,
    amount: newBudgetDetail.amount,
  })
}

export async function getAllExpenses(
  userId: number | string,
  year: string,
  month: string,
  db = connection
): Promise<Expenses[]> {
  const monthNumber = new Date(Date.parse(`${month} 1, ${year}`)).getMonth()

  const startDate = new Date(parseInt(year), monthNumber, 1)
  const endDate = new Date(parseInt(year), monthNumber + 1, 1)
  endDate.setHours(-1, 0, 0, 0)

  const timezoneOffset = startDate.getTimezoneOffset() * 60 * 1000 // convert minutes to milliseconds
  const startDateLocal = new Date(
    startDate.getTime() - timezoneOffset
  ).toISOString()
  const endDateLocal = new Date(
    endDate.getTime() - timezoneOffset
  ).toISOString()

  return db('expenses')
    .leftJoin('budgets', 'expenses.budget_id', 'budgets.id')
    .where({ 'expenses.user_id': userId })
    .whereBetween('expenses.date', [startDateLocal, endDateLocal])
    .select('expenses.*', 'budgets.name as budgetName')
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
  userId: number | string,
  newExpense: Partial<Expenses>,
  db = connection
) {
  return db('expenses')
    .insert({
      user_id: userId,
      category: newExpense.category,
      amount: newExpense.amount,
      date: newExpense.date,
      budget_id: newExpense.budget_id,
    })
    .returning(['id'])
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
