import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import {
  useAuthContext,
} from "../context/AuthContext";

export default function ProtectedRoute() {
  const {
    isAuthenticated,
    loading,
  } = useAuthContext();

  const location = useLocation();

  if (loading) {
    return (
      <div className="route-loader">
        Chargement...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  return <Outlet />;
}