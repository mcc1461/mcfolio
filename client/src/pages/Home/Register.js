import React, { useState } from "react";
import axios from "axios"; // For making HTTP requests
import { useNavigate } from "react-router-dom";

const AdminRegistration = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    specialCode: "", // Add a field for the special code
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerAdmin = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (admin.password !== admin.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8001/api/register", {
        email: admin.email,
        password: admin.password,
        specialCode: admin.specialCode, // Send the special code to the server
      });

      // Navigate to login after successful registration
      navigate("/admin-login");
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
              type="email"
              placeholder="Enter admin email"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.confirmPassword}
              onChange={(e) =>
                setAdmin({ ...admin, confirmPassword: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-left text-gray-600">
              Special Code
            </label>
            <input
              type="text"
              placeholder="Enter the special code"
              className="w-full p-2 border border-gray-300 rounded"
              value={admin.specialCode}
              onChange={(e) =>
                setAdmin({ ...admin, specialCode: e.target.value })
              }
            />
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
