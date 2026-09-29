import { Link } from "react-router-dom";

import "./Sales.css";

import { useSales } from "../../hooks/useSales";
import { useBusinessContext } from "../../context/BusinessContext";

export default function Sales() {
  const { businessId } =
    useBusinessContext();

  const {
    sales,
    loading,
    error,
    refresh,
  } = useSales(businessId);

  if (!businessId) {
    return (
      <section className="sales-page">
        <div className="sales-message">
          <h2>Ventes</h2>
          <p>
            Aucune activité sélectionnée.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="sales-page">
      <div className="sales-header">
        <div>
          <h2>Ventes</h2>

          <p>
            Consultez et gérez vos ventes.
          </p>
        </div>

        <Link
          to="/sales/create"
          className="sales-primary-button"
        >
          Nouvelle vente
        </Link>
      </div>

      <div className="sales-toolbar">
        <button
          type="button"
          className="sales-secondary-button"
          onClick={() => void refresh()}
        >
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="sales-message">
          Chargement des ventes...
        </div>
      ) : error ? (
        <div className="sales-message sales-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void refresh()}
          >
            Réessayer
          </button>
        </div>
      ) : sales.length === 0 ? (
        <div className="sales-message">
          <h3>
            Aucune vente
          </h3>

          <p>
            Vous n'avez encore enregistré
            aucune vente.
          </p>

          <Link
            to="/sales/create"
            className="sales-primary-button"
          >
            Enregistrer une vente
          </Link>
        </div>
      ) : (
        <div className="sales-table-wrapper">
          <table className="sales-table">
            <thead>
              <tr>
                <th>
                  Date
                </th>

                <th>
                  Client
                </th>

                <th>
                  Montant
                </th>

                <th>
                  Statut
                </th>

                <th>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>
                    {new Date(
                      sale.created_at
                    ).toLocaleDateString(
                      "fr-FR"
                    )}
                  </td>

                  <td>
                    {sale.customer_name ||
                      "Client comptant"}
                  </td>

                  <td>
                    {sale.total_amount.toLocaleString(
                      "fr-FR"
                    )}{" "}
                    FCFA
                  </td>

                  <td>
                    {sale.payment_status ||
                      "—"}
                  </td>

                  <td>
                    <span>
                      #{sale.id}
                    </span>
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