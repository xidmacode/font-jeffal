import type { Debt } from "../../types/debt";

import DebtCard from "./DebtCard";

interface DebtListProps {
  debts: Debt[];
  onSelect?: (
    debt: Debt
  ) => void;
}

export default function DebtList({
  debts,
  onSelect,
}: DebtListProps) {
  if (debts.length === 0) {
    return (
      <div className="debt-list-empty">
        <h3>
          Aucune dette
        </h3>

        <p>
          Aucune dette n'a encore été enregistrée.
        </p>
      </div>
    );
  }

  return (
    <div className="debt-list">
      {debts.map((debt) => (
        <DebtCard
          key={debt.id}
          debt={debt}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}