import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Start with password hidden (false)
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8001/api/login", {
        email: user.email,
        password: user.password,
      });

      // Save the token in localStorage
      localStorage.setItem("authToken", response.data.token);

      // Navigate to the admin dashboard or other protected route
      navigate("/admin-dashboard");
    } catch (error) {
      setError("Invalid credentials");
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
            <label className="block mb-1 text-left text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Password hidden by default
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-300 rounded"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span
                className="absolute text-gray-500 cursor-pointer right-2 top-2"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? "👁️" : "🙈"}{" "}
                {/* Show eye icon based on password visibility */}
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
