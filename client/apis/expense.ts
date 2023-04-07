import request from 'superagent'
import { Expenses, NewExpense } from '../../Models/expenses'

export function getExpenses(
  token: string,
  year: string,
  month: string
): Promise<Expenses[]> {
  return request
    .get(`/api/v1/expenses`)
    .set('Authorization', `Bearer ${token}`)
    .query({ year, month })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function addExpenseToUserId(
  newExpense: NewExpense,
  token: string
): Promise<Expenses> {
  return request
    .post(`/api/v1/expenses/`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...newExpense })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}
