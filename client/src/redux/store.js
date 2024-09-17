// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice"; // Ensure this path is correct

const store = configureStore({
  reducer: {
    root: rootReducer, // Ensure root is the key here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 100, // Increase the threshold to 100ms to avoid warnings for large actions
        ignoredActions: [], // Add any actions you want to ignore from serializable checks
        ignoredPaths: ["root.portfolioData"], // Ignore the portfolioData if it's large
      },
      immutableCheck: {
        warnAfter: 100, // Increase the threshold to 100ms to avoid warnings for large states
      },
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development only
});

export default store;
