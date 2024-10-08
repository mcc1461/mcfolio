import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Maintain show/hide password logic
  const navigate = useNavigate();

  // Handle login form submission
  const loginUser = async (e) => {
    e.preventDefault();

    try {
      // Debug log for login values
      console.log("Login email:", admin.email);
      console.log("Login password:", admin.password);

      // Send login request to the server
      const response = await axios.post("https://musco.dev/api/admin-login", {
        email: admin.email,
        password: admin.password,
      });

      console.log("Login response received:", response.data);

      // Save both authToken and isAdminLogin flag in localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAdminLogin", "true");

      // Navigate to the admin dashboard or another protected route
      navigate("/admin-dashboard");
    } catch (error) {
      // Handle error: Use server error message if available
      console.error("Login error:", error.response?.data?.message);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-red-500">
          Admin Access Only
        </h2>
        <p className="mb-4 text-sm text-center text-gray-700">
          This section is restricted to authorized personnel. If you are not an
          admin, please go back to the homepage.
        </p>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={loginUser} className="grid gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-left text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-left text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full p-2 border border-gray-300 rounded"
                value={admin.password}
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                }
              />
              <span
                className="absolute text-gray-500 cursor-pointer right-2 top-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"} {/* Toggle show/hide password */}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
