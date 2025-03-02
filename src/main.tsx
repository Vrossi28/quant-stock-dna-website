import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import "./localization/i18n.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);
