import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Los estilos globales van primero para que los de cada componente puedan sobrescribirlos
import "./styles/global.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
