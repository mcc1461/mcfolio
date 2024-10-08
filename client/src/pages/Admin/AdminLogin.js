import React, { useState } from "react";
import axios from "axios"; // Axios for sending HTTP requests
import { useNavigate } from "react-router-dom"; // React Router for navigation

const Login = () => {
  // State to hold admin email and password
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to hold error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Navigation hook to programmatically navigate between routes

  // Function to handle form submission and login the admin
  const loginUser = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send login request to the server with email and password
      const response = await axios.post("https://musco.dev/api/admin-login", {
        email: admin.email,
        password: admin.password,
      });

      console.log("Login response received:", response.data);

      // Save both the auth token and the isAdminLogin flag in localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAdminLogin", "true");

      // Navigate to the admin dashboard upon successful login
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data?.message);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      ); // Set the error state with the server's error message or a generic error
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-red-500">
          Admin Access Only
        </h2>
        <p className="mb-4 text-sm text-center text-gray-700">
          This section is restricted to authorized personnel.
        </p>
        {error && <p className="mb-4 text-red-500">{error}</p>}{" "}
        {/* Display error if any */}
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
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })} // Update state on input change
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
                type={showPassword ? "text" : "password"} // Toggle between text and password types
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded"
                value={admin.password}
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                } // Update state on input change
              />
              <span
                className="absolute text-gray-500 cursor-pointer right-2 top-2"
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
              >
                {showPassword ? "🙈" : "👁️"}{" "}
                {/* Toggle eye icon for password visibility */}
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
            onClick={() => navigate("/")} // Navigate back to the homepage
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
