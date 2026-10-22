import { useCallback, useState } from "react";
import { ToastContext } from "./contexts";
import Icon from "../components/ui/Icon";
import "./Toast.css";

const TOAST_DURATION = 3500;
let nextId = 0;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback(
    (id) => setToasts((list) => list.filter((toast) => toast.id !== id)),
    []
  );

  // toast("Mensaje") o toast("Mensaje", "error")
  const toast = useCallback(
    (message, type = "success") => {
      nextId += 1;
      const id = nextId;
      setToasts((list) => [...list.slice(-2), { id, message, type }]);
      setTimeout(() => dismiss(id), TOAST_DURATION);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div className="toast-region" aria-live="polite">
        {toasts.map(({ id, message, type }) => (
          <div key={id} className={`toast toast--${type}`} role="status">
            <Icon name={type === "error" ? "alert" : "check"} size={18} />
            <span>{message}</span>
            <button type="button" aria-label="Cerrar aviso" onClick={() => dismiss(id)}>
              <Icon name="close" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
