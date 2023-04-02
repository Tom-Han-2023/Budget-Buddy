import { Budget } from '../../Models/budget'
import {
  ADD_BUDGET,
  BudgetAction,
  DELETE_BUDGET,
  FAILURE_BUDGETS,
  RECEIVE_BUDGETS,
  REQUEST_BUDGETS,
  UPDATE_BUDGET,
} from '../actions/budgets'

const initialState: BudgetState = {
  data: [],
  isLoading: false,
  error: null,
}

type BudgetState = {
  data: Budget[] | []
  error: string | null
  isLoading: boolean
}

function budgetReducer(
  state = initialState,
  action: BudgetAction
): BudgetState {
  switch (action.type) {
    case RECEIVE_BUDGETS:
      return {
        error: null,
        data: action.payload,
        isLoading: false,
      }
    case REQUEST_BUDGETS:
      return {
        error: null,
        data: [],
        isLoading: true,
      }
    case FAILURE_BUDGETS:
      return {
        error: action.payload,
        data: [...state.data  ],
        isLoading: false,
      }
    case ADD_BUDGET:
      return {
        error: null,
        data: [...state.data, action.payload],
        isLoading: false,
      }
    case UPDATE_BUDGET:
      return {
        error: null,
        data: state.data.map((budget) => {
          return budget.id === action.payload.id ? action.payload : budget
        }),
        isLoading: false,
      }
    case DELETE_BUDGET:
      return {
        error: null,
        data: state.data.filter((budget) => {
          return budget.id !== action.payload
        }),
        isLoading: false,
      }
    default:
      return state
  }
}

export default budgetReducer
