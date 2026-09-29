import { Link } from "react-router-dom";

import "./Debts.css";

import { useDebts } from "../../hooks/useDebts";
import { useBusinessContext } from "../../context/BusinessContext";

export default function Debts() {
  const { businessId } = useBusinessContext();

  const {
    debts,
    loading,
    error,
    refresh,
  } = useDebts(businessId);

  if (!businessId) {
    return (
      <section className="debts-page">
        <div className="debts-message">
          <h2>Dettes</h2>
          <p>
            Aucune activité sélectionnée.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="debts-page">
      <div className="debts-header">
        <div>
          <h2>Dettes</h2>

          <p>
            Suivez les crédits et les remboursements.
          </p>
        </div>

        <Link
          to="/debts/create"
          className="debts-primary-button"
        >
          Nouvelle dette
        </Link>
      </div>

      <div className="debts-toolbar">
        <button
          type="button"
          className="debts-secondary-button"
          onClick={() => void refresh()}
        >
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="debts-message">
          Chargement des dettes...
        </div>
      ) : error ? (
        <div className="debts-message debts-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void refresh()}
          >
            Réessayer
          </button>
        </div>
      ) : debts.length === 0 ? (
        <div className="debts-message">
          <h3>Aucune dette</h3>

          <p>
            Aucune dette n'a encore été enregistrée.
          </p>

          <Link
            to="/debts/create"
            className="debts-primary-button"
          >
            Ajouter une dette
          </Link>
        </div>
      ) : (
        <div className="debts-table-wrapper">
          <table className="debts-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Montant initial</th>
                <th>Montant restant</th>
                <th>Statut</th>
                <th>Échéance</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {debts.map((debt) => (
                <tr key={debt.id}>
                  <td>
                    {debt.customer_name}
                  </td>

                  <td>
                    {debt.amount.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    FCFA
                  </td>

                  <td>
                    {debt.remaining_amount.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    FCFA
                  </td>

                  <td>
                    {debt.status}
                  </td>

                  <td>
                    {debt.due_date
                      ? new Date(
                          debt.due_date
                        ).toLocaleDateString(
                          "fr-FR"
                        )
                      : "—"}
                  </td>

                  <td>
                    <Link
                      to={`/debts/${debt.id}`}
                      className="debt-link"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}