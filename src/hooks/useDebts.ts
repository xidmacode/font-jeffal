import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getDebts,
  createDebt,
  addDebtPayment,
} from "../api/debts";

import type {
  Debt,
  DebtCreate,
  DebtPayment,
  DebtPaymentCreate,
} from "../types/debt";

interface UseDebtsReturn {
  debts: Debt[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addDebt: (
    data: DebtCreate
  ) => Promise<Debt>;
  addPayment: (
    debtId: number,
    data: DebtPaymentCreate
  ) => Promise<DebtPayment>;
}

export function useDebts(
  businessId: number | null
): UseDebtsReturn {
  const [debts, setDebts] =
    useState<Debt[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(
    async () => {
      if (!businessId) {
        setDebts([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data =
          await getDebts(businessId);

        setDebts(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Impossible de charger les dettes";

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

  const addDebt = async (
    data: DebtCreate
  ): Promise<Debt> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    const debt =
      await createDebt(
        businessId,
        data
      );

    setDebts((current) => [
      debt,
      ...current,
    ]);

    return debt;
  };

  const addPayment = async (
    debtId: number,
    data: DebtPaymentCreate
  ): Promise<DebtPayment> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    const payment =
      await addDebtPayment(
        businessId,
        debtId,
        data
      );

    await refresh();

    return payment;
  };

  return {
    debts,
    loading,
    error,
    refresh,
    addDebt,
    addPayment,
  };
}