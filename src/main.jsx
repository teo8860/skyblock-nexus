import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./App.jsx";
import "./index.css";
import "./neon-style.css";
import "./neon-effects.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <AppRouter />
  </StrictMode>
);
