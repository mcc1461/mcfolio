// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";

const PrivateRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Check if a token is present

  return isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
