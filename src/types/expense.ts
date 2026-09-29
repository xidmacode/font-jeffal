export interface Expense {
  id: number;
  business_id?: number;
  amount: number;
  category: string;
  description?: string | null;
  date?: string;
  created_at?: string;
}

export interface ExpenseCreate {
  amount: number;
  category: string;
  description?: string;
  date?: string;
}