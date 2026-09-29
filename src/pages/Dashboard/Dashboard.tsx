import "./Dashboard.css";

import { useSummary } from "../../hooks/useSummary";
import { useBusinessContext } from "../../context/BusinessContext";

export default function Dashboard() {
  const { businessId, currentBusiness } =
    useBusinessContext();

  const {
    summary,
    loading,
    error,
    refresh,
  } = useSummary(businessId);

  if (loading) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-loading">
          Chargement du tableau de bord...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="dashboard-page">
        <div className="dashboard-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void refresh()}
          >
            Réessayer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h2>Tableau de bord</h2>

          <p>
            {currentBusiness?.name ||
              "Mon activité"}
          </p>
        </div>
      </div>

      {!summary ? (
        <div className="dashboard-empty">
          Aucune donnée disponible.
        </div>
      ) : (
        <>
          <div className="dashboard-stats">

            <div className="dashboard-stat-card">
              <span>
                Chiffre d'affaires
              </span>

              <strong>
                {summary.revenue.toLocaleString(
                  "fr-FR"
                )} FCFA
              </strong>
            </div>

            <div className="dashboard-stat-card">
              <span>
                Dépenses
              </span>

              <strong>
                {summary.expenses.toLocaleString(
                  "fr-FR"
                )} FCFA
              </strong>
            </div>

            <div className="dashboard-stat-card">
              <span>
                Flux net
              </span>

              <strong>
                {summary.net_flow.toLocaleString(
                  "fr-FR"
                )} FCFA
              </strong>
            </div>

            <div className="dashboard-stat-card">
              <span>
                Nombre de ventes
              </span>

              <strong>
                {summary.sales_count}
              </strong>
            </div>

            <div className="dashboard-stat-card">
              <span>
                Valeur du stock
              </span>

              <strong>
                {summary.stock_value.toLocaleString(
                  "fr-FR"
                )} FCFA
              </strong>
            </div>

            <div className="dashboard-stat-card">
              <span>
                Marge brute
              </span>

              <strong>
                {summary.gross_margin.toLocaleString(
                  "fr-FR"
                )} FCFA
              </strong>
            </div>

            <div className="dashboard-stat-card">
              <span>
                Dettes restantes
              </span>

              <strong>
                {summary.remaining_debts.toLocaleString(
                  "fr-FR"
                )} FCFA
              </strong>
            </div>

          </div>

          <div className="dashboard-section">
            <div className="dashboard-section-header">
              <h3>
                Produits à faible stock
              </h3>

              <span>
                {summary.low_stock_products.length}
              </span>
            </div>

            {summary.low_stock_products.length ===
            0 ? (
              <p className="dashboard-no-alert">
                Aucun produit à faible stock.
              </p>
            ) : (
              <div className="low-stock-list">
                {summary.low_stock_products.map(
                  (product) => (
                    <div
                      key={product.id}
                      className="low-stock-item"
                    >
                      <div>
                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          {product.category ||
                            "Sans catégorie"}
                        </span>
                      </div>

                      <strong>
                        {product.stock_quantity}{" "}
                        {product.unit}
                      </strong>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}