import { getDebt } from "../../api/debts";
import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import "./Debts.css";

import { useBusinessContext } from "../../context/BusinessContext";

import { getDebt } from "../../api/debts";

import type { Debt } from "../../types/debt";

export default function DebtDetails() {
  const { id } = useParams();

  const { businessId } =
    useBusinessContext();

  const [debt, setDebt] =
    useState<Debt | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const loadDebt =
      async () => {
        if (!businessId || !id) {
          setError(
            "Dette introuvable."
          );

          setLoading(false);
          return;
        }

        const debtId = Number(id);

        if (!Number.isFinite(debtId)) {
          setError(
            "Identifiant de dette invalide."
          );

          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const data =
            await getDebt(
              businessId,
              debtId
            );

          setDebt(data);
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Impossible de charger la dette."
          );
        } finally {
          setLoading(false);
        }
      };

    void loadDebt();
  }, [businessId, id]);

  if (loading) {
    return (
      <section className="debts-page">
        Chargement de la dette...
      </section>
    );
  }

  if (error) {
    return (
      <section className="debts-page">
        <div className="debts-message debts-error">
          {error}
        </div>
      </section>
    );
  }

  if (!debt) {
    return (
      <section className="debts-page">
        <div className="debts-message">
          Dette introuvable.
        </div>
      </section>
    );
  }

  return (
    <section className="debts-page">

      <div className="debt-details-header">
        <Link to="/debts">
          ← Retour aux dettes
        </Link>

        <h2>
          Dette de {debt.customer_name}
        </h2>
      </div>

      <div className="debt-details-card">

        <div className="debt-detail">
          <span>
            Client
          </span>

          <strong>
            {debt.customer_name}
          </strong>
        </div>

        <div className="debt-detail">
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

        <div className="debt-detail">
          <span>
            Montant restant
          </span>

          <strong>
            {debt.remaining_amount.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </strong>
        </div>

        <div className="debt-detail">
          <span>
            Statut
          </span>

          <strong>
            {debt.status}
          </strong>
        </div>

        <div className="debt-detail">
          <span>
            Échéance
          </span>

          <strong>
            {debt.due_date
              ? new Date(
                  debt.due_date
                ).toLocaleDateString(
                  "fr-FR"
                )
              : "—"}
          </strong>
        </div>

        <div className="debt-detail">
          <span>
            Description
          </span>

          <strong>
            {debt.description || "—"}
          </strong>
        </div>

      </div>

      <div className="debt-repayment-section">
        <h3>
          Remboursement
        </h3>

        <p>
          Les remboursements seront enregistrés
          depuis le formulaire dédié.
        </p>

        <Link
          to={`/debts/${debt.id}/repayment`}
          className="debts-primary-button"
        >
          Enregistrer un remboursement
        </Link>
      </div>

    </section>
  );
} 