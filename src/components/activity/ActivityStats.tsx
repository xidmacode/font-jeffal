import type { Summary } from "../../types/summary";

interface ActivityStatsProps {
  summary: Summary;
}

export default function ActivityStats({
  summary,
}: ActivityStatsProps) {
  return (
    <div className="activity-stats">

      <div className="activity-stat-card">
        <span>
          Chiffre d'affaires
        </span>

        <strong>
          {summary.total_sales.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA
        </strong>
      </div>

      <div className="activity-stat-card">
        <span>
          Dépenses
        </span>

        <strong>
          {summary.total_expenses.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA
        </strong>
      </div>

      <div className="activity-stat-card">
        <span>
          Bénéfice
        </span>

        <strong>
          {summary.profit.toLocaleString(
            "fr-FR"
          )}{" "}
          FCFA
        </strong>
      </div>

      <div className="activity-stat-card">
        <span>
          Nombre de ventes
        </span>

        <strong>
          {summary.sales_count}
        </strong>
      </div>

    </div>
  );
}