import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import Register from "./pages/Admin/AdminRegister";
// import PrivateRoute from "./components/PrivateRoutes";
import { setPortfolioData, showLoader, setError } from "./redux/rootSlice";

const App = () => {
  const { loaderVisible, reloadData, error } = useSelector(
    (state) => state.root || {}
  );
  const dispatch = useDispatch();

  const API_URL =
    process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api/portfolio";
  console.log(API_URL);

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoader(true));
      dispatch(setError(null));
      const response = await axios.get(API_URL);
      console.log(response.data);
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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<Register />} />
        {/* <Route path="*" element={<Home />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
