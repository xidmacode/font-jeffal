import type {
  SelectHTMLAttributes,
  ReactNode,
} from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export default function Select({
  label,
  error,
  id,
  children,
  ...props
}: SelectProps) {
  return (
    <div className="common-select-group">
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}

      <select
        id={id}
        {...props}
        className="common-select"
      >
        {children}
      </select>

      {error && (
        <small className="common-select-error">
          {error}
        </small>
      )}
    </div>
  );
}