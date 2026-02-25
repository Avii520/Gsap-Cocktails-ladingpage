import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Result from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Result />
  </StrictMode>,
);
