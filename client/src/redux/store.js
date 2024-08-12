// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootSlice"; // Ensure this path is correct

const store = configureStore({
  reducer: {
    root: rootReducer, // Ensure root is the key here
  },
});

export default store;
