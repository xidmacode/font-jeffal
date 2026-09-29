import { apiFetch } from "./client";

import type {
  Expense,
  ExpenseCreate,
} from "../types/expense";

function expensesUrl(
  businessId: number
): string {
  return `/businesses/${businessId}/expenses`;
}

export function getExpenses(
  businessId: number
): Promise<Expense[]> {
  return apiFetch<Expense[]>(
    `${expensesUrl(businessId)}/`
  );
}

export function createExpense(
  businessId: number,
  data: ExpenseCreate
): Promise<Expense> {
  return apiFetch<Expense>(
    `${expensesUrl(businessId)}/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}