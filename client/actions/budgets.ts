import { Budget, NewBudget, UpdateBudget } from '../../Models/budget'
import {
  addBudgetToUserId,
  deleteBudget,
  fetchBudgetsByUserID,
  updateBudgetAPI,
} from '../apis/budget'
import type { ThunkAction } from '../store'

export const REQUEST_BUDGETS = 'REQUEST_BUDGETS'
export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS'
export const FAILURE_BUDGETS = 'FAILURE_BUDGETS'
export const ADD_BUDGETS = 'ADD_BUDGETS'

export type BudgetAction =
  | { type: typeof REQUEST_BUDGETS }
  | { type: typeof RECEIVE_BUDGETS; payload: Budget[] }
  | { type: typeof FAILURE_BUDGETS; payload: string }
  | { type: typeof ADD_BUDGETS; payload: Budget[] }

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

export function fetchBudgets(user_id: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return fetchBudgetsByUserID(user_id)
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

export function addBudgets(budget: NewBudget, userId: string): ThunkAction {
  return (dispatch) => {
    dispatch(requestBudgets())
    return addBudgetToUserId(budget, userId)
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
