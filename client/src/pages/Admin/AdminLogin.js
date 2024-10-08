import React, { useState } from "react";
import axios from "axios"; // Axios for sending HTTP requests
import { useNavigate } from "react-router-dom"; // React Router for navigation

const Login = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To display error messages
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate(); // For navigation

  // Handle login form submission
  const loginUser = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      // Make a POST request to your backend API for login
      const response = await axios.post("https://musco.dev/api/admin-login", {
        email: admin.email,
        password: admin.password,
      });

      console.log("Login response received:", response.data);

      // Save the token and isAdminLogin flag to localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("isAdminLogin", "true");

      // Navigate to the admin dashboard
      navigate("/admin-dashboard");
    } catch (error) {
      // Display error message
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error("Login error:", error.response?.data?.message);
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
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })} // Update email state
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
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded"
                value={admin.password}
                onChange={(e) =>
                  setAdmin({ ...admin, password: e.target.value })
                } // Update password state
              />
              <span
                className="absolute text-gray-500 cursor-pointer right-2 top-2"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? "🙈" : "👁️"} {/* Toggle eye icon */}
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
      </div>
    </div>
  );
};

export default Login;
