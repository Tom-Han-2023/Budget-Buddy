import request from 'superagent'
import { Budget, NewBudget, UpdateBudget } from '../../Models/budget'

export async function getBudgets(
  token: string,
  year: string,
  month: string
): Promise<Budget[]> {
  const res = await request
    .get(`/api/v1/budgets`)
    .set('Authorization', `Bearer ${token}`)
    .query({ year, month })
  return res.body
}

export async function addBudgetToUserId(
  newBudget: NewBudget,
  token: string
): Promise<Budget> {
  const res = await request
    .post(`/api/v1/budgets`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...newBudget })
  return res.body
}

export async function deleteBudget(budgetId: number, token: string) {
  await request
    .delete(`/api/v1/budgets/${budgetId}`)
    .set('Authorization', `Bearer ${token}`)
}

export async function updateBudgetAPI(
  budgetId: number,
  token: string,
  budgetDetail: UpdateBudget
): Promise<Budget> {
  const res = await request
    .patch(`/api/v1/budgets/${budgetId}`)
    .send({ ...budgetDetail })
    .set('Authorization', `Bearer ${token}`)
  return res.body
}
