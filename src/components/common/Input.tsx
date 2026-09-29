import type {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <div className="common-input-group">
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        className="common-input"
      />

      {error && (
        <small className="common-input-error">
          {error}
        </small>
      )}
    </div>
  );
}