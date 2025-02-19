import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import App from "./App.jsx";
import { UrlContextProvider } from "./context/UrlContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UrlContextProvider>
    <App />
    <ToastContainer />
  </UrlContextProvider>
);
