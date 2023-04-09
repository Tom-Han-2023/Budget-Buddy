import { SET_YEAR, SET_MONTH, YearMonthAction } from '../actions/yearMonth'

type YearMonthState = {
  year: string
  month: string
}

const initialState: YearMonthState = {
  year: '2023',
  month: 'March',
}

function yearMonthReducer(
  state = initialState,
  action: YearMonthAction
): YearMonthState {
  {
    switch (action.type) {
      case SET_YEAR:
        return {
          ...state,
          year: action.payload,
        }
      case SET_MONTH:
        return {
          ...state,
          month: action.payload,
        }
      default:
        return state
    }
  }
}
export default yearMonthReducer
