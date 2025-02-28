import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import NiceModal from "@ebay/nice-modal-react";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";

import "@/styles/globals.css";
import { app } from "@/app/app.tsx";


const consoleError = console.error;
const consoleWarn = console.warn;

// 屏蔽 React 警告
// eslint-disable-next-line no-console
console.error = function(...args) {
  const message = args.join(" ");

  // 屏蔽 嵌套子组件
  if (message.includes("cannot appear as a descendant of"))
    return;
  if (message.includes("Warning: findDOMNode is deprecated and will be removed in the next major release"))
    return;
  if (message.includes("TransformControls: The attached 3D object must be a part of the scene graph"))
    return;
  if (message.includes("aria"))
    return;
  consoleError.apply(console, args);
};

console.warn = function(...args) {
  const message = args.join(" ");

  if (message.includes("aria"))
    return;
  consoleWarn.apply(console, args);
};

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

app.showVersion();
