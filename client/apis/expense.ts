import request from 'superagent'
import { Expenses, NewExpense } from '../../Models/expenses'

export async function getExpenses(
  token: string,
  year: string,
  month: string
): Promise<Expenses[]> {
  try {
    const res = await request
      .get(`/api/v1/expenses`)
      .set('Authorization', `Bearer ${token}`)
      .query({ year, month })
    return res.body
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function addExpenseToUserId(
  newExpense: NewExpense,
  token: string
): Promise<Expenses> {
  try {
    const res = await request
      .post(`/api/v1/expenses/`)
      .set('Authorization', `Bearer ${token}`)
      .send({ ...newExpense })
    return res.body
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function deleteExpense(expenseId: number, token: string) {
  try {
    const res = await request
      .delete(`/api/v1/expenses/${expenseId}`)
      .set('Authorization', `Bearer ${token}`)
    return res.body
  } catch (err) {
    console.error(err)
    throw err
  }
}
