import type { Debt } from "../../types/debt";

interface DebtCardProps {
  debt: Debt;
  onSelect?: (debt: Debt) => void;
}

export default function DebtCard({
  debt,
  onSelect,
}: DebtCardProps) {
  const remaining =
    Math.max(
      0,
      debt.amount - debt.paid_amount
    );

  const isPaid =
    remaining === 0;

  return (
    <article className="debt-card">
      <div className="debt-card-header">
        <div>
          <h3>
            {debt.customer_name}
          </h3>

          <span>
            {debt.created_at
              ? new Date(
                  debt.created_at
                ).toLocaleDateString(
                  "fr-FR"
                )
              : "—"}
          </span>
        </div>

        <span
          className={
            isPaid
              ? "debt-status debt-status-paid"
              : "debt-status debt-status-pending"
          }
        >
          {isPaid
            ? "Payée"
            : "En cours"}
        </span>
      </div>

      <div className="debt-card-details">
        <div>
          <span>
            Montant initial
          </span>

          <strong>
            {debt.amount.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </strong>
        </div>

        <div>
          <span>
            Déjà payé
          </span>

          <strong>
            {debt.paid_amount.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </strong>
        </div>

        <div>
          <span>
            Reste
          </span>

          <strong>
            {remaining.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </strong>
        </div>
      </div>

      {onSelect && (
        <button
          type="button"
          onClick={() =>
            onSelect(debt)
          }
        >
          Voir les détails
        </button>
      )}
    </article>
  );
}