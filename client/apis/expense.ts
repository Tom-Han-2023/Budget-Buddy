import request from 'superagent'
import { Expenses, NewExpense } from '../../Models/expenses'

export async function getExpenses(
  token: string,
  year: string,
  month: string
): Promise<Expenses[]> {
  const res = await request
    .get(`/api/v1/expenses`)
    .set('Authorization', `Bearer ${token}`)
    .query({ year, month })
  return res.body
}

export async function addExpenseToUserId(
  newExpense: NewExpense,
  token: string
): Promise<Expenses> {
  const res = await request
    .post(`/api/v1/expenses/`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...newExpense })
  return res.body
}

export async function deleteExpense(expenseId: number, token: string) {
  const res = await request
    .delete(`/api/v1/expenses/${expenseId}`)
    .set('Authorization', `Bearer ${token}`)
  return res.body
}

export async function updateExpenseAPI(
  expenseId: number,
  token: string,
  expenseDetail: NewExpense
): Promise<Expenses> {
  const res = await request
    .patch(`/api/v1/expenses/${expenseId}`)
    .send({ ...expenseDetail })
    .set('Authorization', `Bearer ${token}`)
  return res.body
}
