import { useState } from "react";
import Modal from "../ui/Modal";
import Icon from "../ui/Icon";
import "./AuthModal.css";

const MIN_PASSWORD_LENGTH = 6;

const copy = {
  login: {
    title: "Bienvenido de nuevo",
    subtitle: "Inicia sesión para gestionar tu plan, tus programas y tus pedidos.",
    submit: "Iniciar sesión",
    switchText: "¿No tienes cuenta?",
    switchAction: "Crear cuenta",
  },
  register: {
    title: "Crea tu cuenta",
    subtitle: "Únete a Body Control y lleva el control de tu entrenamiento.",
    submit: "Crear cuenta",
    switchText: "¿Ya tienes cuenta?",
    switchAction: "Iniciar sesión",
  },
};

const AuthModal = ({ mode, onModeChange, onClose, onLogin, onRegister }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";
  const text = copy[mode];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (data.password.length < MIN_PASSWORD_LENGTH) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
      return;
    }
    if (isRegister && data.password !== data.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await (isRegister ? onRegister(data) : onLogin(data));
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setError("");
    onModeChange(isRegister ? "login" : "register");
  };

  return (
    <Modal title={text.title} onClose={onClose}>
      <div className="auth-header">
        <span className="auth-icon">
          <Icon name="user" size={22} />
        </span>
        <h2>{text.title}</h2>
        <p>{text.subtitle}</p>
      </div>

      {/* `key` reinicia el formulario al cambiar de modo */}
      <form key={mode} className="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <div className="field">
            <label htmlFor="auth-name">Nombre</label>
            <input id="auth-name" name="name" autoComplete="name" required autoFocus />
          </div>
        )}

        <div className="field">
          <label htmlFor="auth-email">Correo electrónico</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            autoFocus={!isRegister}
          />
        </div>

        <div className="field">
          <label htmlFor="auth-password">Contraseña</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            minLength={MIN_PASSWORD_LENGTH}
            required
          />
        </div>

        {isRegister && (
          <div className="field">
            <label htmlFor="auth-confirm">Confirmar contraseña</label>
            <input
              id="auth-confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
            />
          </div>
        )}

        {error && (
          <p className="form-error" role="alert">
            <Icon name="alert" size={16} /> {error}
          </p>
        )}

        <button type="submit" className="gold-btn auth-submit" disabled={isSubmitting}>
          {isSubmitting ? <span className="spinner" aria-hidden="true"></span> : null}
          {text.submit}
        </button>
      </form>

      <p className="auth-switch">
        {text.switchText}{" "}
        <button type="button" onClick={switchMode}>
          {text.switchAction}
        </button>
      </p>

      <p className="auth-note">
        <Icon name="lock" size={14} /> Modo demostración: tu cuenta se guarda solo en este
        navegador.
      </p>
    </Modal>
  );
};

export default AuthModal;
