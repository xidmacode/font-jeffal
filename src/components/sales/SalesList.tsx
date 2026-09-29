import type { Sale } from "../../types/sale";

interface SalesListProps {
  sales: Sale[];
  onSelect?: (
    sale: Sale
  ) => void;
}

export default function SalesList({
  sales,
  onSelect,
}: SalesListProps) {
  if (sales.length === 0) {
    return (
      <div className="sales-list-empty">
        <h3>
          Aucune vente
        </h3>

        <p>
          Aucune vente n'a encore été enregistrée.
        </p>
      </div>
    );
  }

  return (
    <div className="sales-list">

      {sales.map((sale) => (
        <article
          key={sale.id}
          className="sales-list-item"
        >

          <div className="sales-list-main">

            <strong>
              Vente #{sale.id}
            </strong>

            <span>
              {new Date(
                sale.created_at
              ).toLocaleDateString(
                "fr-FR"
              )}
            </span>

            {sale.customer_name && (
              <span>
                Client :{" "}
                {sale.customer_name}
              </span>
            )}

          </div>

          <div className="sales-list-amount">
            {sale.total_amount.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </div>

          <div className="sales-list-status">
            {sale.payment_status ||
              "—"}
          </div>

          {onSelect && (
            <button
              type="button"
              onClick={() =>
                onSelect(sale)
              }
            >
              Voir
            </button>
          )}

        </article>
      ))}

    </div>
  );
}