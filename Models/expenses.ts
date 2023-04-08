export interface Expenses {
  id: number
  user_id: number
  budget_id: number | null
  category: string
  amount: number
  date: string
  budgetName: string
}

export type NewExpense = Omit<Expenses, 'id' | 'user_id' | 'budgetName'>

