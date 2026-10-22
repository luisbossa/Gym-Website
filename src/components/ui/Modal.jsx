import { useEffect } from "react";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import Icon from "./Icon";
import "./Modal.css";

const Modal = ({ title, onClose, children, className = "" }) => {
  useEffect(() => {
    const onKeyDown = (event) => event.key === "Escape" && onClose();

    lockScroll();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" aria-label="Cerrar" onClick={onClose}>
          <Icon name="close" size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
