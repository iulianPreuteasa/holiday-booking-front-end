import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppController from "./controllers/AppController";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <AppController />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
