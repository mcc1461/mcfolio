import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

// Suppress the ResizeObserver loop error
if (typeof window !== "undefined") {
  const resizeObserverErrDiv = document.createElement("div");
  const resizeObserverErrMsg =
    "ResizeObserver loop completed with undelivered notifications.";
  resizeObserverErrDiv.setAttribute(
    "style",
    "z-index: 9999; position: fixed; top: 0; left: 0;"
  );
  resizeObserverErrDiv.innerHTML = resizeObserverErrMsg;
  resizeObserverErrDiv.setAttribute("aria-hidden", "true");
  window.addEventListener("resize", () => {
    if (document.body.contains(resizeObserverErrDiv)) {
      document.body.removeChild(resizeObserverErrDiv);
    }
    document.body.appendChild(resizeObserverErrDiv);
    setTimeout(() => {
      if (document.body.contains(resizeObserverErrDiv)) {
        document.body.removeChild(resizeObserverErrDiv);
      }
    }, 3000);
  });
}

window.addEventListener("error", function (e) {
  if (
    e.message ===
    "ResizeObserver loop completed with undelivered notifications."
  ) {
    e.stopImmediatePropagation();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
