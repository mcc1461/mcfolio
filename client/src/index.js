import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

// Suppress the ResizeObserver loop error
if (typeof window !== "undefined") {
  window.addEventListener("error", function (e) {
    if (
      e.message ===
      "ResizeObserver loop completed with undelivered notifications."
    ) {
      e.stopImmediatePropagation();
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
