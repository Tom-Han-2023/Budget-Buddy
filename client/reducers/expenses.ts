import { Expenses } from '../../Models/expenses'
import {
  ADD_EXPENSE,
  ExpenseAction,
  DELETE_EXPENSE,
  FAILURE_EXPENSES,
  RECEIVE_EXPENSES,
  REQUEST_EXPENSES,
  UPDATE_EXPENSE,
} from '../actions/expenses'

const initialState: ExpenseState = {
  data: [],
  isLoading: false,
  error: null,
}

type ExpenseState = {
  data: Expenses[] | []
  error: string | null
  isLoading: boolean
}

function expenseReducer(
  state = initialState,
  action: ExpenseAction
): ExpenseState {
  switch (action.type) {
    case RECEIVE_EXPENSES:
      return {
        error: null,
        data: action.payload,
        isLoading: false,
      }
    case REQUEST_EXPENSES:
      return {
        error: null,
        data: [],
        isLoading: true,
      }
    case FAILURE_EXPENSES:
      return {
        error: action.payload,
        data: [...state.data],
        isLoading: false,
      }
    case ADD_EXPENSE:
      return {
        error: null,
        data: [...state.data, action.payload],
        isLoading: false,
      }
    case UPDATE_EXPENSE:
      return {
        error: null,
        data: state.data.map((expense) => {
          return expense.id === action.payload.id ? action.payload : expense
        }),
        isLoading: false,
      }
    case DELETE_EXPENSE:
      return {
        error: null,
        data: state.data.filter((expense) => {
          return expense.id !== action.payload
        }),
        isLoading: false,
      }
    default:
      return state
  }
}

export default expenseReducer
