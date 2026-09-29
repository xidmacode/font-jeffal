import { useBusinessContext } from "../context/BusinessContext";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const {
    businesses,
    currentBusiness,
    selectBusiness,
  } = useBusinessContext();

  const { user, signOut } =
    useAuthContext();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="header-title">
          JËFAL
        </h1>
      </div>

      <div className="header-right">
        {businesses.length > 0 && (
          <select
            value={
              currentBusiness?.id ?? ""
            }
            onChange={(event) =>
              selectBusiness(
                Number(event.target.value)
              )
            }
            aria-label="Sélectionner une activité"
          >
            {businesses.map(
              (business) => (
                <option
                  key={business.id}
                  value={business.id}
                >
                  {business.name}
                </option>
              )
            )}
          </select>
        )}

        <span className="header-user">
          {user?.name ||
            user?.phone ||
            "Utilisateur"}
        </span>

        <button
          type="button"
          onClick={signOut}
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}