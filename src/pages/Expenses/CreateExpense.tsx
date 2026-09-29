import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Expenses.css";

import { useBusinessContext } from "../../context/BusinessContext";
import { createExpense } from "../../api/expenses";

export default function CreateExpense() {
  const navigate = useNavigate();

  const { businessId } =
    useBusinessContext();

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [date, setDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    if (!businessId) {
      setError(
        "Aucune activité sélectionnée."
      );
      return;
    }

    if (!description.trim()) {
      setError(
        "La description est obligatoire."
      );
      return;
    }

    const numericAmount =
      Number(amount);

    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      setError(
        "Le montant doit être supérieur à 0."
      );
      return;
    }

    try {
      setLoading(true);

      await createExpense(
        businessId,
        {
          description:
            description.trim(),

          category:
            category.trim() || null,

          amount:
            numericAmount,

          date,
        }
      );

      navigate("/expenses", {
        replace: true,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer la dépense."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!businessId) {
    return (
      <section className="expenses-page">
        <div className="expenses-message">
          Aucune activité sélectionnée.
        </div>
      </section>
    );
  }

  return (
    <section className="expenses-page">

      <div className="expenses-header">
        <div>
          <Link to="/expenses">
            ← Retour aux dépenses
          </Link>

          <h2>
            Nouvelle dépense
          </h2>
        </div>
      </div>

      <form
        className="expense-form"
        onSubmit={handleSubmit}
      >

        <div className="expense-field">
          <label htmlFor="description">
            Description
          </label>

          <input
            id="description"
            type="text"
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="Ex : Achat de marchandises"
            disabled={loading}
          />
        </div>

        <div className="expense-field">
          <label htmlFor="category">
            Catégorie
          </label>

          <input
            id="category"
            type="text"
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value
              )
            }
            placeholder="Ex : Transport"
            disabled={loading}
          />
        </div>

        <div className="expense-field">
          <label htmlFor="amount">
            Montant
          </label>

          <input
            id="amount"
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(event) =>
              setAmount(
                event.target.value
              )
            }
            placeholder="Ex : 5000"
            disabled={loading}
          />
        </div>

        <div className="expense-field">
          <label htmlFor="date">
            Date
          </label>

          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) =>
              setDate(
                event.target.value
              )
            }
            disabled={loading}
          />
        </div>

        {error && (
          <div className="expenses-error">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="expenses-primary-button"
          disabled={loading}
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer la dépense"}
        </button>

      </form>
    </section>
  );
}