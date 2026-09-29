import {
  useState,
} from "react";

interface RepaymentFormProps {
  debtId: number;
  remainingAmount: number;
  loading?: boolean;

  onSubmit: (
    data: {
      debt_id: number;
      amount: number;
      payment_date: string;
      note: string;
    }
  ) => void | Promise<void>;

  onCancel?: () => void;
}

export default function RepaymentForm({
  debtId,
  remainingAmount,
  loading = false,
  onSubmit,
  onCancel,
}: RepaymentFormProps) {
  const [
    amount,
    setAmount,
  ] = useState("");

  const [
    paymentDate,
    setPaymentDate,
  ] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const [
    note,
    setNote,
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

    if (
      !Number.isFinite(
        numericAmount
      ) ||
      numericAmount <= 0
    ) {
      setError(
        "Le montant du remboursement est invalide."
      );
      return;
    }

    if (
      numericAmount >
      remainingAmount
    ) {
      setError(
        "Le remboursement ne peut pas dépasser le montant restant."
      );
      return;
    }

    if (!paymentDate) {
      setError(
        "La date du remboursement est obligatoire."
      );
      return;
    }

    await onSubmit({
      debt_id: debtId,
      amount: numericAmount,
      payment_date: paymentDate,
      note: note.trim(),
    });
  };

  return (
    <form
      className="repayment-form"
      onSubmit={handleSubmit}
    >
      <div className="repayment-remaining">
        <span>
          Montant restant
        </span>

        <strong>
          {remainingAmount.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA
        </strong>
      </div>

      <div className="repayment-form-field">
        <label htmlFor="repayment-amount">
          Montant du remboursement
        </label>

        <input
          id="repayment-amount"
          type="number"
          min="1"
          max={remainingAmount}
          step="1"
          value={amount}
          onChange={(event) =>
            setAmount(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      <div className="repayment-form-field">
        <label htmlFor="repayment-date">
          Date
        </label>

        <input
          id="repayment-date"
          type="date"
          value={paymentDate}
          onChange={(event) =>
            setPaymentDate(
              event.target.value
            )
          }
          disabled={loading}
        />
      </div>

      <div className="repayment-form-field">
        <label htmlFor="repayment-note">
          Note
        </label>

        <textarea
          id="repayment-note"
          value={note}
          onChange={(event) =>
            setNote(
              event.target.value
            )
          }
          rows={3}
          placeholder="Note facultative"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="repayment-form-error">
          {error}
        </div>
      )}

      <div className="repayment-form-actions">
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
            : "Enregistrer le remboursement"}
        </button>
      </div>
    </form>
  );
}