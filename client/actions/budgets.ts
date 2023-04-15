import { Budget, NewBudget, UpdateBudget } from '../../Models/budget'
import {
  addBudgetToUserId,
  deleteBudget,
  getBudgets,
  updateBudgetAPI,
} from '../apis/budget'
import type { ThunkAction } from '../store'

export const REQUEST_BUDGETS = 'REQUEST_BUDGETS'
export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS'
export const FAILURE_BUDGETS = 'FAILURE_BUDGETS'
export const ADD_BUDGET = 'ADD_BUDGET'
export const UPDATE_BUDGET = 'UPDATE_BUDGET'
export const DELETE_BUDGET = 'DELETE_BUDGET'

export type BudgetAction =
  | { type: typeof REQUEST_BUDGETS }
  | { type: typeof RECEIVE_BUDGETS; payload: Budget[] }
  | { type: typeof FAILURE_BUDGETS; payload: string }
  | { type: typeof ADD_BUDGET; payload: Budget }
  | { type: typeof UPDATE_BUDGET; payload: Budget }
  | { type: typeof DELETE_BUDGET; payload: number }

export function requestBudgets(): BudgetAction {
  return {
    type: REQUEST_BUDGETS,
  }
}
export function receiveBudgets(budgets: Budget[]): BudgetAction {
  return {
    type: RECEIVE_BUDGETS,
    payload: budgets,
  }
}

export function failureBudgets(errorMessage: string): BudgetAction {
  return {
    type: FAILURE_BUDGETS,
    payload: errorMessage,
  }
}

export function appendBudget(budget: Budget): BudgetAction {
  return {
    type: ADD_BUDGET,
    payload: budget,
  }
}

export function updatedBudget(budget: Budget): BudgetAction {
  return {
    type: UPDATE_BUDGET,
    payload: budget,
  }
}
export function deletedBudget(budgetId: number): BudgetAction {
  return {
    type: DELETE_BUDGET,
    payload: budgetId,
  }
}

export function fetchBudgets(
  token: string,
  year: string,
  month: string
): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return getBudgets(token, year, month)
      .then((budgets) => {
        dispatch(receiveBudgets(budgets))
      })
      .catch((err) => {
        dispatch(failureBudgets(err.message))
      })
  }
}

export function addBudget(budget: NewBudget, token: string): ThunkAction {
  return (dispatch) => {
    return addBudgetToUserId(budget, token)
      .then((budget) => {
        dispatch(appendBudget(budget))
      })
      .catch((err) => {
        dispatch(failureBudgets(err.message))
      })
  }
}

export function removeBudget(budgetId: number, token: string): ThunkAction {
  return (dispatch) => {
    return deleteBudget(budgetId, token)
      .then(() => {
        dispatch(deletedBudget(budgetId))
      })
      .catch((err) => {
        dispatch(failureBudgets(err.message))
      })
  }
}

export function updateBudget(
  budgetId: number,
  token: string,
  budgetDetail: UpdateBudget
): ThunkAction {
  return (dispatch) => {
    return updateBudgetAPI(budgetId, token, budgetDetail)
      .then((budget) => {
        dispatch(updatedBudget(budget))
      })
      .catch((err) => {
        dispatch(failureBudgets(err.message))
      })
  }
}
