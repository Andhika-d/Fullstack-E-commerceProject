import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
        <Toaster />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);