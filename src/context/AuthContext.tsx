import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import { useAuth } from "../hooks/useAuth";
import type { User } from "../types/auth";

interface AuthContextValue {
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

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const auth = useAuth();

  const value = useMemo(
    () => ({
      user: auth.user,
      loading: auth.loading,
      error: auth.error,
      isAuthenticated:
        auth.isAuthenticated,
      signIn: auth.signIn,
      signOut: auth.signOut,
      refreshUser: auth.refreshUser,
    }),
    [
      auth.user,
      auth.loading,
      auth.error,
      auth.isAuthenticated,
      auth.signIn,
      auth.signOut,
      auth.refreshUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext doit être utilisé à l'intérieur de AuthProvider"
    );
  }

  return context;
}