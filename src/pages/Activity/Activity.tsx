import "./Activity.css";

import { useSummary } from "../../hooks/useSummary";
import { useBusinessContext } from "../../context/BusinessContext";

import ActivityChart from "../../components/activity/ActivityChart";
import ActivityStats from "../../components/activity/ActivityStats";

export default function Activity() {
  const { businessId } =
    useBusinessContext();

  const {
    summary,
    loading,
    error,
    refresh,
  } = useSummary(businessId);

  if (!businessId) {
    return (
      <section className="activity-page">
        <div className="activity-message">
          <h2>Activité</h2>

          <p>
            Aucune activité sélectionnée.
          </p>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="activity-page">
        <div className="activity-message">
          Chargement des données...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="activity-page">
        <div className="activity-message activity-error">
          <p>{error}</p>

          <button
            type="button"
            onClick={() => void refresh()}
          >
            Réessayer
          </button>
        </div>
      </section>
    );
  }

  if (!summary) {
    return (
      <section className="activity-page">
        <div className="activity-message">
          Aucune donnée disponible.
        </div>
      </section>
    );
  }

  return (
    <section className="activity-page">

      <div className="activity-header">
        <div>
          <h2>
            Activité
          </h2>

          <p>
            Suivez l'évolution de votre activité.
          </p>
        </div>

        <button
          type="button"
          className="activity-refresh-button"
          onClick={() => void refresh()}
        >
          Actualiser
        </button>
      </div>

      <ActivityStats
        summary={summary}
      />

      <div className="activity-chart-container">
        <ActivityChart
          summary={summary}
        />
      </div>

    </section>
  );
}