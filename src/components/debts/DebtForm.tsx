import {
  useState,
} from "react";

interface DebtFormProps {
  loading?: boolean;

  onSubmit: (
    data: {
      customer_name: string;
      amount: number;
      due_date: string | null;
      description: string;
    }
  ) => void | Promise<void>;

  onCancel?: () => void;
}

export default function DebtForm({
  loading = false,
  onSubmit,
  onCancel,
}: DebtFormProps) {
  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    dueDate,
    setDueDate,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    const numericAmount =
      Number(amount);

    if (!customerName.trim()) {
      setError(
        "Le nom du client est obligatoire."
      );
      return;
    }

    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      setError(
        "Le montant est invalide."
      );
      return;
    }

    await onSubmit({
      customer_name:
        customerName.trim(),

      amount:
        numericAmount,

      due_date:
        dueDate || null,

      description:
        description.trim(),
    });
  };

  return (
    <form
      className="debt-form"
      onSubmit={handleSubmit}
    >
      <div className="debt-form-field">
        <label htmlFor="debt-customer">
          Nom du client
        </label>

        <input
          id="debt-customer"
          type="text"
          value={customerName}
          onChange={(event) =>
            setCustomerName(
              event.target.value
            )
          }
          placeholder="Ex : Mamadou"
          disabled={loading}
        />
      </div>

      <div className="debt-form-field">
        <label htmlFor="debt-amount">
          Montant
        </label>

        <input
          id="debt-amount"
          type="number"
          min="1"
          step="1"
          value={amount}
          onChange={(event) =>
            setAmount(
              event.target.value
            )
          }
          placeholder="Ex : 25000"
          disabled={loading}
        />
      </div>

      <div className="debt-form-field">
        <label htmlFor="debt-due-date">
          Date d'échéance
        </label>

        <input
          id="debt-due-date"
          type="date"
          value={dueDate}
          onChange={(event) =>
            setDueDate(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      <div className="debt-form-field">
        <label htmlFor="debt-description">
          Description
        </label>

        <textarea
          id="debt-description"
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          rows={4}
          placeholder="Informations complémentaires"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="debt-form-error">
          {error}
        </div>
      )}

      <div className="debt-form-actions">
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
            : "Enregistrer la dette"}
        </button>
      </div>
    </form>
  );
}