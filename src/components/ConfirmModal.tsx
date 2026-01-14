import React from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";

// Type assertion for icons
const IconTimes = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;
const IconWarning = FaExclamationTriangle as React.FC<React.SVGProps<SVGSVGElement>>;

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="confirm-overlay" onClick={handleBackdropClick}>
      <div className="confirm-modal">
        <button
          className="exit-btn"
          onClick={onCancel}
          aria-label="Close confirmation dialog"
        >
          <IconTimes aria-hidden="true" />
        </button>

        <div className="confirm-icon">
          <IconWarning 
            aria-hidden="true"
            className={isDangerous ? "icon-danger" : "icon-warning"}
          />
        </div>

        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button
            className="cancel-btn"
            onClick={onCancel}
            autoFocus
          >
            {cancelText}
          </button>
          <button
            className={isDangerous ? "delete-btn" : "button"}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;