import { combineReducers } from 'redux'
import budgetReducer from './budgets'
import tokenReducer from './token'

export default combineReducers({
  budgetReducer,
  tokenReducer,
})
