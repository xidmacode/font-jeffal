import type { ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`common-button common-button-${variant}`}
    >
      {loading ? "Chargement..." : children}
    </button>
  );
}