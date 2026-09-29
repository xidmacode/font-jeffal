import { Link } from "react-router-dom";

import "./Expenses.css";

import { useExpenses } from "../../hooks/useExpenses";
import { useBusinessContext } from "../../context/BusinessContext";

export default function Expenses() {
  const { businessId } = useBusinessContext();

  const {
    expenses,
    loading,
    error,
    refresh,
  } = useExpenses(businessId);

  if (!businessId) {
    return (
      <section className="expenses-page">
        <div className="expenses-message">
          <h2>Dépenses</h2>
          <p>Aucune activité sélectionnée.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="expenses-page">
      <div className="expenses-header">
        <div>
          <h2>Dépenses</h2>
          <p>Gérez les dépenses de votre activité.</p>
        </div>

        <Link
          to="/expenses/create"
          className="expenses-primary-button"
        >
          Nouvelle dépense
        </Link>
      </div>

      <div className="expenses-toolbar">
        <button
          type="button"
          className="expenses-secondary-button"
          onClick={() => void refresh()}
        >
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="expenses-message">
          Chargement des dépenses...
        </div>
      ) : error ? (
        <div className="expenses-message expenses-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void refresh()}
          >
            Réessayer
          </button>
        </div>
      ) : expenses.length === 0 ? (
        <div className="expenses-message">
          <h3>Aucune dépense</h3>

          <p>
            Vous n'avez encore enregistré aucune dépense.
          </p>

          <Link
            to="/expenses/create"
            className="expenses-primary-button"
          >
            Ajouter une dépense
          </Link>
        </div>
      ) : (
        <div className="expenses-table-wrapper">
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th>Montant</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    {new Date(
                      expense.created_at
                    ).toLocaleDateString("fr-FR")}
                  </td>

                  <td>
                    {expense.description}
                  </td>

                  <td>
                    {expense.category || "—"}
                  </td>

                  <td>
                    {expense.amount.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    FCFA
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