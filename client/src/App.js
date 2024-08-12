// src/App.js

import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolioData, showLoader } from "./redux/rootSlice";
import Home from "./pages/Home/Home"; // Adjust the path if needed
import AdminAbout from "./pages/Admin/AdminAbout";

const App = () => {
  const state = useSelector((state) => state.root || {});
  const { loaderVisible = false, portfolioData = null } = state;
  const dispatch = useDispatch();

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoader(true)); // Show loader before data fetch
      const response = await axios.get("/api/portfolio/data");
      const { data } = response; // Extract only the data part of the response

      // Filter or sanitize data if needed
      const sanitizedData = {
        intros: data.intros || [],
        abouts: data.abouts || [],
        experiences: data.experiences || [],
        projects: data.projects || [],
        contacts: data.contacts || [],
      };

      dispatch(setPortfolioData(sanitizedData)); // Dispatch sanitized data
      console.log(sanitizedData);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(showLoader(false)); // Hide loader after data fetch
    }
  }, [dispatch]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  useEffect(() => {
    console.log(portfolioData);
  }, [portfolioData]);

  return (
    <Router>
      {loaderVisible && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/admin" element={<AdminAbout />} />
        <Route path="/projects" element={<div>Projects</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </Router>
  );
};

export default App;
