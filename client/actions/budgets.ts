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

export type BudgetAction =
  | { type: typeof REQUEST_BUDGETS }
  | { type: typeof RECEIVE_BUDGETS; payload: Budget[] }
  | { type: typeof FAILURE_BUDGETS; payload: string }
  | { type: typeof ADD_BUDGET; payload: Budget }

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

export function fetchBudgets(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return getBudgets(token)
      .then((budgets) => {
        dispatch(receiveBudgets(budgets))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureBudgets(err.message))
        } else {
          dispatch(failureBudgets('An unknown error occurred'))
        }
      })
  }
}

export function addBudget(budget: NewBudget, token: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return addBudgetToUserId(budget, token)
      .then((budget) => {
        dispatch(appendBudget(budget))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureBudgets(err.message))
        } else {
          dispatch(failureBudgets('An unknown error occurred'))
        }
      })
  }
}

export function removeBudget(budgetId: number, userId: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return deleteBudget(budgetId, userId)
      .then((budgets) => {
        console.log(budgets)
        dispatch(receiveBudgets(budgets))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureBudgets(err.message))
        } else {
          dispatch(failureBudgets('An unknown error occurred'))
        }
      })
  }
}

export function updateBudget(
  budgetId: number,
  userId: string,
  budgetDetail: UpdateBudget
): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return updateBudgetAPI(budgetId, userId, budgetDetail)
      .then((budgets) => {
        console.log(budgets)
        dispatch(receiveBudgets(budgets))
      })
      .catch((err) => {
        if (err instanceof Error) {
          dispatch(failureBudgets(err.message))
        } else {
          dispatch(failureBudgets('An unknown error occurred'))
        }
      })
  }
}
