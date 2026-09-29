import { useState } from "react";

import "./Profile.css";

import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const {
    user,
    logout,
  } = useAuth();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleLogout =
    async () => {
      try {
        setLoading(true);

        await logout();
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="profile-page">

      <div className="profile-header">
        <h2>
          Mon profil
        </h2>

        <p>
          Consultez les informations de votre compte.
        </p>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          {user?.name
            ? user.name
                .charAt(0)
                .toUpperCase()
            : "U"}
        </div>

        <div className="profile-information">

          <div className="profile-item">
            <span>
              Nom
            </span>

            <strong>
              {user?.name || "—"}
            </strong>
          </div>

          <div className="profile-item">
            <span>
              Email
            </span>

            <strong>
              {user?.email || "—"}
            </strong>
          </div>

          {user?.phone && (
            <div className="profile-item">
              <span>
                Téléphone
              </span>

              <strong>
                {user.phone}
              </strong>
            </div>
          )}

        </div>

        <button
          type="button"
          className="profile-logout-button"
          onClick={() =>
            void handleLogout()
          }
          disabled={loading}
        >
          {loading
            ? "Déconnexion..."
            : "Se déconnecter"}
        </button>

      </div>

    </section>
  );
}