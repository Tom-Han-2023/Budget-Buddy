export interface Budget {
  id: number
  user_id: number
  name: string
  amount: number | string
  date: Date
}

export type NewBudget = Omit<Budget, 'id' | 'user_id'>
export type UpdateBudget = Omit<NewBudget, 'date'>
