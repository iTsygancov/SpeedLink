import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

document.addEventListener("DOMContentLoaded", function () {
  createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
