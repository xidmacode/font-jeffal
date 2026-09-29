import { useCallback, useEffect, useState } from "react";

import {
  getMe,
  login,
} from "../api/auth";

import {
  clearToken,
} from "../api/client";

import type {
  User,
} from "../types/auth";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signIn: (
    phone: string,
    password: string
  ) => Promise<User>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const refreshUser = useCallback(
    async () => {
      setLoading(true);
      setError(null);

      try {
        const currentUser =
          await getMe();

        setUser(currentUser);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const token = localStorage.getItem(
      "jeffal_access_token"
    );

    if (!token) {
      setLoading(false);
      return;
    }

    void refreshUser();
  }, [refreshUser]);

  const signIn = async (
    phone: string,
    password: string
  ): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      await login(phone, password);

      const currentUser =
        await getMe();

      setUser(currentUser);

      return currentUser;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur de connexion";

      setError(message);
      setUser(null);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    clearToken();
    setUser(null);
    setError(null);
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: user !== null,
    signIn,
    signOut,
    refreshUser,
  };
}