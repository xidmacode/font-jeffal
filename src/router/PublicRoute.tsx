import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useAuthContext,
} from "../context/AuthContext";

export default function PublicRoute() {
  const {
    isAuthenticated,
    loading,
  } = useAuthContext();

  if (loading) {
    return (
      <div className="route-loader">
        Chargement...
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
}