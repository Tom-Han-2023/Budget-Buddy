import request from 'superagent'
import { Budget, NewBudget, UpdateBudget } from '../../Models/budget'

export function getBudgets(token: string): Promise<Budget[]> {
  return request
    .get(`/api/v1/budgets`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function addBudgetToUserId(
  newBudget: NewBudget,
  token: string
): Promise<Budget> {
  return request
    .post(`/api/v1/budgets`)
    .set('Authorization', `Bearer ${token}`)
    .send({ ...newBudget })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function deleteBudget(
  budgetId: number,
  token: string
): Promise<number> {
  return request
    .delete(`/api/v1/budgets/${budgetId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function updateBudgetAPI(
  budgetId: number,
  token: string,
  budgetDetail: UpdateBudget
): Promise<Budget> {
  return request
    .patch(`/api/v1/budgets/${budgetId}`)
    .send({ ...budgetDetail })
    .set('Authorization', `Bearer ${token}`)
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}
