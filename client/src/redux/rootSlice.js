// src/redux/rootSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  portfolioData: null,
  loaderVisible: false,
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
  },
});

export const { setPortfolioData, showLoader } = rootSlice.actions;
export default rootSlice.reducer;
