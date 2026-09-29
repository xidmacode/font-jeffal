import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getSales,
  createSale,
} from "../api/sales";

import type {
  Sale,
  SaleCreate,
} from "../types/sale";

interface UseSalesReturn {
  sales: Sale[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addSale: (
    data: SaleCreate
  ) => Promise<Sale>;
}

export function useSales(
  businessId: number | null
): UseSalesReturn {
  const [sales, setSales] =
    useState<Sale[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(
    async () => {
      if (!businessId) {
        setSales([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data =
          await getSales(businessId);

        setSales(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Impossible de charger les ventes";

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

  const addSale = async (
    data: SaleCreate
  ): Promise<Sale> => {
    if (!businessId) {
      throw new Error(
        "Aucune activité sélectionnée"
      );
    }

    const sale =
      await createSale(
        businessId,
        data
      );

    setSales((current) => [
      sale,
      ...current,
    ]);

    return sale;
  };

  return {
    sales,
    loading,
    error,
    refresh,
    addSale,
  };
} 