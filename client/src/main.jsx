import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Ant Design styles are handled by ConfigProvider
import App from "./App.tsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
