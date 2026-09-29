import {
  useEffect,
} from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer =
      window.setTimeout(
        onClose,
        duration
      );

    return () =>
      window.clearTimeout(
        timer
      );
  }, [
    onClose,
    duration,
  ]);

  return (
    <div
      className={`toast toast-${type}`}
      role="status"
    >
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
      >
        ×
      </button>
    </div>
  );
}