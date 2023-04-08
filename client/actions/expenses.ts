import { Expenses, NewExpense } from '../../Models/expenses'
import { addExpenseToUserId, deleteExpense, getExpenses } from '../apis/expense'
import type { ThunkAction } from '../store'

export const REQUEST_EXPENSES = 'REQUEST_EXPENSES'
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES'
export const FAILURE_EXPENSES = 'FAILURE_EXPENSES'
export const ADD_EXPENSE = 'ADD_EXPENSE'
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE'
export const DELETE_EXPENSE = 'DELETE_EXPENSE'

export type ExpenseAction =
  | { type: typeof REQUEST_EXPENSES }
  | { type: typeof RECEIVE_EXPENSES; payload: Expenses[] }
  | { type: typeof FAILURE_EXPENSES; payload: string }
  | { type: typeof ADD_EXPENSE; payload: Expenses }
  | { type: typeof UPDATE_EXPENSE; payload: Expenses }
  | { type: typeof DELETE_EXPENSE; payload: number }

export function requestExpenses(): ExpenseAction {
  return {
    type: REQUEST_EXPENSES,
  }
}
export function receiveExpenses(expenses: Expenses[]): ExpenseAction {
  return {
    type: RECEIVE_EXPENSES,
    payload: expenses,
  }
}

export function failureExpenses(errorMessage: string): ExpenseAction {
  return {
    type: FAILURE_EXPENSES,
    payload: errorMessage,
  }
}

export function appendExpense(expense: Expenses): ExpenseAction {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  }
}

export function updatedExpense(expense: Expenses): ExpenseAction {
  return {
    type: UPDATE_EXPENSE,
    payload: expense,
  }
}
export function deletedExpense(expenseId: number): ExpenseAction {
  return {
    type: DELETE_EXPENSE,
    payload: expenseId,
  }
}

export function fetchExpenses(
  token: string,
  year: string,
  month: string
): ThunkAction {
  return (dispatch) => {
    dispatch(requestExpenses())
    return getExpenses(token, year, month)
      .then((expenses) => {
        dispatch(receiveExpenses(expenses))
      })
      .catch((err) => {
        dispatch(failureExpenses(err.message))
      })
  }
}

export function addExpense(expense: NewExpense, token: string): ThunkAction {
  return (dispatch) => {
    return addExpenseToUserId(expense, token)
      .then((expense) => {
        dispatch(appendExpense(expense))
      })
      .catch((err) => {
        dispatch(failureExpenses(err.message))
      })
  }
}

export function removeExpense(expenseId: number, token: string): ThunkAction {
  return (dispatch) => {
    return deleteExpense(expenseId, token)
      .then((expenseId) => {
        dispatch(deletedExpense(expenseId))
      })
      .catch((err) => {
        dispatch(failureExpenses(err.message))
      })
  }
}

export function updateBudget(
  budgetId: number,
  token: string,
  budgetDetail: NewBudget
): ThunkAction {
  return (dispatch) => {
    return updateBudgetAPI(budgetId, token, budgetDetail)
      .then((budget) => {
        dispatch(updatedBudget(budget))
      })
      .catch((err) => {
        dispatch(failureExpenses(err.message))
      })
  }
}
