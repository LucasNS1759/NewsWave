import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
const queryClient = new QueryClient();

let idioma = window.localStorage.getItem("lng");

i18next.init({
  interpolation: { escapeValue: false },
  lng: idioma ? JSON.parse(idioma) : "es",
  resources: {
    es: {
      global: global_es,
    },
    en: { global: global_en },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <App />
          </Provider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
