import request from 'superagent'
import { Budget, NewBudget, UpdateBudget } from '../../Models/budget'

export function fetchBudgetsByUserID(userId: string): Promise<Budget[]> {
  return request
    .get(`/api/v1/budgets`)
    .query({ userId })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function addBudgetToUserId(
  newBudget: NewBudget,
  user_id: string
): Promise<Budget[]> {
  return request
    .post(`/api/v1/budgets`)
    .send({ ...newBudget, user_id })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function deleteBudget(
  budgetId: number,
  userId: string
): Promise<Budget[]> {
  return request
    .delete(`/api/v1/budgets/${budgetId}`)
    .query({ userId })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}

export function updateBudgetAPI(
  budgetId: number,
  user_id: string,
  budgetDetail: UpdateBudget
): Promise<Budget[]> {
  return request
    .patch(`/api/v1/budgets/${budgetId}`)
    .send({ ...budgetDetail, user_id })
    .then((res) => res.body)
    .catch((err) => {
      console.error(err)
      throw err
    })
}
