interface LoaderProps {
  text?: string;
}

export default function Loader({
  text = "Chargement...",
}: LoaderProps) {
  return (
    <div
      className="loader-container"
      role="status"
      aria-live="polite"
    >
      <div className="loader-spinner" />

      <span>{text}</span>
    </div>
  );
}