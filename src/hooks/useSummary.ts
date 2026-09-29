import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getSummary,
} from "../api/summary";

import type {
  BusinessSummary,
} from "../types/summary";

interface UseSummaryReturn {
  summary: BusinessSummary | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useSummary(
  businessId: number | null
): UseSummaryReturn {
  const [summary, setSummary] =
    useState<BusinessSummary | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(
    async () => {
      if (!businessId) {
        setSummary(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data =
          await getSummary(
            businessId
          );

        setSummary(data);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Impossible de charger le résumé";

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

  return {
    summary,
    loading,
    error,
    refresh,
  };
}