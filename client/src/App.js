import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin";
import About from "./pages/Home/About";
import Projects from "./pages/Home/Projects";
import Experiences from "./pages/Home/Experiences";
import Contact from "./pages/Home/Contact";
import { setPortfolioData, showLoader, setError } from "./redux/rootSlice";

const App = () => {
  const { loaderVisible, reloadData, error } = useSelector(
    (state) => state.root || {}
  );
  const dispatch = useDispatch();

  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:8061/api/portfolio/data";

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoader(true));
      dispatch(setError(null));
      const response = await axios.get(API_URL);
      dispatch(setPortfolioData(response.data));
    } catch (error) {
      dispatch(
        setError("Failed to load portfolio data. Please try again later.")
      );
    } finally {
      dispatch(showLoader(false));
    }
  }, [dispatch, API_URL]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData, getPortfolioData]);

  return (
    <Router>
      {loaderVisible && <Loader />}
      {error && <div className="error-message">{error}</div>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/intro" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
