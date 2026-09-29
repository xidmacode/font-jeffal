import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getBusinesses,
} from "../api/businesses";

import type {
  Business,
} from "../types/business";

interface BusinessContextValue {
  businesses: Business[];
  currentBusiness: Business | null;
  businessId: number | null;
  loading: boolean;
  error: string | null;
  selectBusiness: (
    businessId: number
  ) => void;
  refreshBusinesses: () => Promise<void>;
}

const BusinessContext =
  createContext<
    BusinessContextValue | undefined
  >(undefined);

interface BusinessProviderProps {
  children: ReactNode;
}

const STORAGE_KEY =
  "jeffal_current_business_id";

export function BusinessProvider({
  children,
}: BusinessProviderProps) {
  const [businesses, setBusinesses] =
    useState<Business[]>([]);

  const [currentBusinessId, setCurrentBusinessId] =
    useState<number | null>(() => {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) {
        return null;
      }

      const parsed = Number(saved);

      return Number.isFinite(parsed)
        ? parsed
        : null;
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const refreshBusinesses = async () => {
    setLoading(true);
    setError(null);

    try {
      const data =
        await getBusinesses();

      setBusinesses(data);

      if (data.length === 0) {
        setCurrentBusinessId(null);
        localStorage.removeItem(
          STORAGE_KEY
        );
        return;
      }

      const currentExists =
        data.some(
          (business) =>
            business.id ===
            currentBusinessId
        );

      if (!currentExists) {
        const firstBusiness = data[0];

        setCurrentBusinessId(
          firstBusiness.id
        );

        localStorage.setItem(
          STORAGE_KEY,
          String(firstBusiness.id)
        );
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Impossible de charger les activités";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshBusinesses();
  }, []);

  const selectBusiness = (
    businessId: number
  ) => {
    const exists = businesses.some(
      (business) =>
        business.id === businessId
    );

    if (!exists) {
      return;
    }

    setCurrentBusinessId(
      businessId
    );

    localStorage.setItem(
      STORAGE_KEY,
      String(businessId)
    );
  };

  const currentBusiness =
    businesses.find(
      (business) =>
        business.id ===
        currentBusinessId
    ) ?? null;

  const value = useMemo(
    () => ({
      businesses,
      currentBusiness,
      businessId:
        currentBusinessId,
      loading,
      error,
      selectBusiness,
      refreshBusinesses,
    }),
    [
      businesses,
      currentBusiness,
      currentBusinessId,
      loading,
      error,
    ]
  );

  return (
    <BusinessContext.Provider
      value={value}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessContext(): BusinessContextValue {
  const context =
    useContext(BusinessContext);

  if (!context) {
    throw new Error(
      "useBusinessContext doit être utilisé à l'intérieur de BusinessProvider"
    );
  }

  return context;
}