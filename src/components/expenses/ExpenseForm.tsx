import { useState } from "react";

interface ExpenseFormProps {
  loading?: boolean;
  onSubmit: (data: {
    description: string;
    amount: number;
    category: string;
    expense_date: string;
  }) => void | Promise<void>;
  onCancel?: () => void;
}

export default function ExpenseForm({
  loading = false,
  onSubmit,
  onCancel,
}: ExpenseFormProps) {
  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [expenseDate, setExpenseDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    const numericAmount = Number(amount);

    if (!description.trim()) {
      setError(
        "La description est obligatoire."
      );
      return;
    }

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      setError(
        "Le montant doit être supérieur à zéro."
      );
      return;
    }

    if (!category.trim()) {
      setError(
        "La catégorie est obligatoire."
      );
      return;
    }

    if (!expenseDate) {
      setError(
        "La date est obligatoire."
      );
      return;
    }

    await onSubmit({
      description: description.trim(),
      amount: numericAmount,
      category: category.trim(),
      expense_date: expenseDate,
    });
  };

  return (
    <form
      className="expense-form"
      onSubmit={handleSubmit}
    >
      <div className="expense-form-field">
        <label htmlFor="expense-description">
          Description
        </label>

        <input
          id="expense-description"
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

      <div className="expense-form-field">
        <label htmlFor="expense-amount">
          Montant
        </label>

        <input
          id="expense-amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(event) =>
            setAmount(
              event.target.value
            )
          }
          placeholder="Ex : 50000"
          disabled={loading}
        />
      </div>

      <div className="expense-form-field">
        <label htmlFor="expense-category">
          Catégorie
        </label>

        <input
          id="expense-category"
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

      <div className="expense-form-field">
        <label htmlFor="expense-date">
          Date
        </label>

        <input
          id="expense-date"
          type="date"
          value={expenseDate}
          onChange={(event) =>
            setExpenseDate(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      {error && (
        <div className="expense-form-error">
          {error}
        </div>
      )}

      <div className="expense-form-actions">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Annuler
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer la dépense"}
        </button>
      </div>
    </form>
  );
}