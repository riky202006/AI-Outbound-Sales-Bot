import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { AIProvider } from "./context/AIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <AIProvider>

      <App />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.1)",
            backdropFilter: "blur(20px)",
          },
        }}
      />

    </AIProvider>

  </React.StrictMode>
);