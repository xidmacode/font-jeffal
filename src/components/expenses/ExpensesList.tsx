import type { Expense } from "../../types/expense";

interface ExpensesListProps {
  expenses: Expense[];
  onSelect?: (
    expense: Expense
  ) => void;
}

export default function ExpensesList({
  expenses,
  onSelect,
}: ExpensesListProps) {
  if (expenses.length === 0) {
    return (
      <div className="expenses-list-empty">
        <h3>
          Aucune dépense
        </h3>

        <p>
          Aucune dépense n'a encore été enregistrée.
        </p>
      </div>
    );
  }

  return (
    <div className="expenses-list">
      {expenses.map((expense) => (
        <article
          key={expense.id}
          className="expenses-list-item"
        >
          <div className="expenses-list-main">
            <strong>
              {expense.description}
            </strong>

            <span>
              Catégorie :{" "}
              {expense.category}
            </span>

            <span>
              {new Date(
                expense.expense_date
              ).toLocaleDateString(
                "fr-FR"
              )}
            </span>
          </div>

          <div className="expenses-list-amount">
            {expense.amount.toLocaleString(
              "fr-FR"
            )}{" "}
            FCFA
          </div>

          {onSelect && (
            <button
              type="button"
              onClick={() =>
                onSelect(expense)
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