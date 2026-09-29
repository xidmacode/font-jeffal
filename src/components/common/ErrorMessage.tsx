interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className="error-message"
      role="alert"
    >
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
        >
          Réessayer
        </button>
      )}
    </div>
  );
}