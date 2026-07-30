import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StudioApp from "./StudioApp";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudioApp />
  </StrictMode>,
);
