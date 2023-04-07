export const SET_YEAR = 'SET_YEAR'

export const setYear = (year: string): YearMonthAction => ({
  type: SET_YEAR,
  payload: year,
})

// Month Action Types
export const SET_MONTH = 'SET_MONTH'

// Month Action Creator
export const setMonth = (month: string): YearMonthAction => ({
  type: SET_MONTH,
  payload: month,
})

export type YearMonthAction =
  | { type: typeof SET_YEAR; payload: string }
  | { type: typeof SET_MONTH; payload: string }
