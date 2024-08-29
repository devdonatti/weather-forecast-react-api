import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Importa el archivo CSS de Tailwind

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
