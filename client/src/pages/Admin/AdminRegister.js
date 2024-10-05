import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminRegistration = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    specialCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSpecialCode, setShowSpecialCode] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerAdmin = async (e) => {
    e.preventDefault();

    if (admin.password !== admin.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("https://musco.dev/api/register", {
        email: admin.email,
        password: admin.password,
        specialCode: admin.specialCode,
      });

      // You can use the response here if necessary
      if (response.status === 201) {
        navigate("/admin-login");
      }
    } catch (error) {
      setError("Invalid special code or error registering admin");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Admin Registration
        </h2>
        <div className="mb-4 text-center text-red-500">
          <p>This is a restricted area for Admins only!</p>
          <p>Access is limited and requires the special code.</p>
        </div>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={registerAdmin} className="grid gap-4">
          <div>
            <label className="block mb-1 text-left text-gray-600">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter admin email"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="block mb-1 text-left text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              autoComplete="new-password"
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute text-2xl text-gray-600 top-9 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}{" "}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block mb-1 text-left text-gray-600">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.confirmPassword}
              onChange={(e) =>
                setAdmin({ ...admin, confirmPassword: e.target.value })
              }
              autoComplete="new-password"
            />
            {/* Toggle Confirm Password Visibility */}
            <button
              type="button"
              className="absolute text-2xl text-gray-600 top-9 right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Special Code Field */}
          <div className="relative">
            <label className="block mb-1 text-left text-gray-600">
              Special Code
            </label>
            <input
              id="specialCode"
              name="specialCode"
              type={showSpecialCode ? "text" : "password"}
              placeholder="Enter the special code"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.specialCode}
              onChange={(e) =>
                setAdmin({ ...admin, specialCode: e.target.value })
              }
              autoComplete="off"
            />
            {/* Toggle Special Code Visibility */}
            <button
              type="button"
              className="absolute text-2xl text-gray-600 top-9 right-3"
              onClick={() => setShowSpecialCode(!showSpecialCode)}
            >
              {showSpecialCode ? "👁️" : "🙈"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Register
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

export default AdminRegistration;
