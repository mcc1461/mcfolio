// src/redux/rootSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolioData: null,
  loaderVisible: false,
  error: null,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setPortfolioData: (state, action) => {
      // Ensure that the action payload is properly sanitized
      state.portfolioData = action.payload;
    },
    showLoader: (state, action) => {
      state.loaderVisible = action.payload;
    },
    hideLoader: (state) => {
      state.loaderVisible = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPortfolioData, showLoader, setError } = rootSlice.actions;
export default rootSlice.reducer;
