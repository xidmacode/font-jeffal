import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getExpenses,
  createExpense,
} from "../api/expenses";

import type {
  Expense,
  ExpenseCreate,
} from "../types/expense";

interface UseExpensesReturn {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addExpense: (
    data: ExpenseCreate
  ) => Promise<Expense>;
}

export function useExpenses(
  businessId: number | null
): UseExpensesReturn {
  const [expenses, setExpenses] =
    useState<Expense[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(
    async () => {
      if (!businessId) {
        setExpenses([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data =
          await getExpenses(
            businessId
          );

        setExpenses(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Impossible de charger les dépenses";

        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [businessId]
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addExpense = async (
    data: ExpenseCreate
  ): Promise<Expense> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    const expense =
      await createExpense(
        businessId,
        data
      );

    setExpenses((current) => [
      expense,
      ...current,
    ]);

    return expense;
  };

  return {
    expenses,
    loading,
    error,
    refresh,
    addExpense,
  };
}