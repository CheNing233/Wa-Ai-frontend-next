import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <NiceModal.Provider>
        <Provider>
          <App />
        </Provider>
      </NiceModal.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
