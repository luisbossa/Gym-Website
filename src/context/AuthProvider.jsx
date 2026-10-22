import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "./contexts";
import { readStorage, writeStorage } from "../utils/storage";
import AuthModal from "../components/auth/AuthModal";

// Modo demostración: sin backend, las cuentas viven en el localStorage de este navegador
const USERS_KEY = "bc_users";
const SESSION_KEY = "bc_session";

const normalizeEmail = (email) => email.trim().toLowerCase();

const hashPassword = async (email, password) => {
  const text = `${email}:${password}`;

  if (window.crypto?.subtle) {
    const buffer = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  // crypto.subtle solo existe en contextos seguros (https / localhost)
  let hash = 5381;
  for (const char of text) hash = (hash * 33) ^ char.charCodeAt(0);
  return `djb2-${(hash >>> 0).toString(16)}`;
};

const createUser = (name, email, passwordHash) => ({
  name: name.trim(),
  email,
  passwordHash,
  createdAt: new Date().toISOString(),
  membership: null,
  programs: {},
  orders: [],
});

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, {}));
  const [sessionEmail, setSessionEmail] = useState(() => readStorage(SESSION_KEY, null));
  const [modalMode, setModalMode] = useState(null);

  // Refs para que las acciones pendientes vean la sesión nueva sin esperar un render
  const sessionRef = useRef(sessionEmail);
  const pendingActionRef = useRef(null);

  useEffect(() => writeStorage(USERS_KEY, users), [users]);
  useEffect(() => writeStorage(SESSION_KEY, sessionEmail), [sessionEmail]);

  // Mantiene sincronizadas varias pestañas abiertas
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === USERS_KEY) setUsers(readStorage(USERS_KEY, {}));
      if (event.key === SESSION_KEY) {
        const email = readStorage(SESSION_KEY, null);
        sessionRef.current = email;
        setSessionEmail(email);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const startSession = useCallback((email) => {
    sessionRef.current = email;
    setSessionEmail(email);
    setModalMode(null);

    const pendingAction = pendingActionRef.current;
    pendingActionRef.current = null;
    pendingAction?.();
  }, []);

  const register = useCallback(
    async ({ name, email, password }) => {
      const key = normalizeEmail(email);
      if (users[key]) throw new Error("Ya existe una cuenta con ese correo.");

      const passwordHash = await hashPassword(key, password);
      setUsers((all) => ({ ...all, [key]: createUser(name, key, passwordHash) }));
      startSession(key);
    },
    [users, startSession]
  );

  const login = useCallback(
    async ({ email, password }) => {
      const key = normalizeEmail(email);
      const account = users[key];
      const passwordHash = await hashPassword(key, password);

      if (!account || account.passwordHash !== passwordHash) {
        throw new Error("Correo o contraseña incorrectos.");
      }
      startSession(key);
    },
    [users, startSession]
  );

  const logout = useCallback(() => {
    sessionRef.current = null;
    setSessionEmail(null);
  }, []);

  // Aplica `updater` al usuario con sesión activa y lo persiste
  const updateUser = useCallback((updater) => {
    const email = sessionRef.current;
    if (!email) return;
    setUsers((all) => (all[email] ? { ...all, [email]: updater(all[email]) } : all));
  }, []);

  // Ejecuta `action` si hay sesión; si no, pide iniciar sesión y la ejecuta al terminar
  const requireAuth = useCallback((action, mode = "login") => {
    if (sessionRef.current) {
      action();
      return;
    }
    pendingActionRef.current = action;
    setModalMode(mode);
  }, []);

  const openAuth = useCallback((mode = "login") => {
    pendingActionRef.current = null;
    setModalMode(mode);
  }, []);

  const closeAuth = useCallback(() => {
    pendingActionRef.current = null;
    setModalMode(null);
  }, []);

  const user = sessionEmail ? (users[sessionEmail] ?? null) : null;

  const value = useMemo(
    () => ({ user, register, login, logout, updateUser, requireAuth, openAuth }),
    [user, register, login, logout, updateUser, requireAuth, openAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {modalMode && (
        <AuthModal
          mode={modalMode}
          onModeChange={setModalMode}
          onClose={closeAuth}
          onLogin={login}
          onRegister={register}
        />
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
