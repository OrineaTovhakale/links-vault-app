import React, { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

// Type assertions for icons
const IconSuccess = FaCheckCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const IconError = FaExclamationCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const IconInfo = FaInfoCircle as React.FC<React.SVGProps<SVGSVGElement>>;
const IconClose = FaTimes as React.FC<React.SVGProps<SVGSVGElement>>;

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <IconSuccess aria-hidden="true" />;
      case "error":
        return <IconError aria-hidden="true" />;
      case "info":
        return <IconInfo aria-hidden="true" />;
      default:
        return <IconSuccess aria-hidden="true" />;
    }
  };

  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="polite">
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-message">{message}</div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <IconClose aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toast;