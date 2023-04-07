import { combineReducers } from 'redux'
import budgetReducer from './budgets'
import expenseReducer from './expenses'
import tokenReducer from './token'
import yearMonthReducer from './yearMonth'

export default combineReducers({
  budgets: budgetReducer,
  token: tokenReducer,
  yearMonth: yearMonthReducer,
  expenses: expenseReducer,
})
