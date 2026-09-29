import type {
  ReactNode,
} from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="modal-close"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}