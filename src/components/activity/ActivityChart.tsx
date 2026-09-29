import type { Summary } from "../../types/summary";

interface ActivityChartProps {
  summary: Summary;
}

export default function ActivityChart({
  summary,
}: ActivityChartProps) {
  const values = [
    {
      label: "Ventes",
      value: summary.total_sales,
    },
    {
      label: "Dépenses",
      value: summary.total_expenses,
    },
    {
      label: "Bénéfice",
      value: Math.max(
        0,
        summary.profit
      ),
    },
  ];

  const maxValue =
    Math.max(
      ...values.map(
        (item) => item.value
      ),
      1
    );

  return (
    <div className="activity-chart">

      <div className="activity-chart-header">
        <div>
          <h3>
            Résumé de l'activité
          </h3>

          <p>
            Comparaison des principaux indicateurs.
          </p>
        </div>
      </div>

      <div className="activity-chart-bars">

        {values.map((item) => {
          const percentage =
            (item.value /
              maxValue) *
            100;

          return (
            <div
              key={item.label}
              className="activity-chart-item"
            >
              <div className="activity-chart-label">
                <span>
                  {item.label}
                </span>

                <strong>
                  {item.value.toLocaleString(
                    "fr-FR"
                  )}{" "}
                  FCFA
                </strong>
              </div>

              <div className="activity-chart-track">
                <div
                  className="activity-chart-bar"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}