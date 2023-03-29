import { Budget } from '../../Models/budget'
import {
  ADD_BUDGET,
  BudgetAction,
  FAILURE_BUDGETS,
  RECEIVE_BUDGETS,
  REQUEST_BUDGETS,
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
        isLoading: false,
      }
    case FAILURE_BUDGETS:
      return {
        error: action.payload,
        data: [],
        isLoading: false,
      }
      case ADD_BUDGET:
      return {
        error: null,
        data: [...state.data, action.payload],
        isLoading: false,
      }
    default:
      return state
  }
}

export default budgetReducer
