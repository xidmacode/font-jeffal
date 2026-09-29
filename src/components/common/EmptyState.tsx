import type {
  ReactNode,
} from "react";

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  message,
  action,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>

      {message && (
        <p>{message}</p>
      )}

      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
}