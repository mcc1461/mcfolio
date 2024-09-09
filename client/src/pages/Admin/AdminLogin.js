import React, { useState } from "react"; // Import the React library
import axios from "axios"; // Import the axios library
import { message } from "antd"; // Import the message component from the antd library
import { useDispatch } from "react-redux"; // Import the useDispatch hook from the react-redux library
import { showLoader } from "../../redux/rootSlice"; // Import the showLoader action creator

const AdminLogin = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch(); // Import the useDispatch hook from the react-redux library

  const login = async () => {
    try {
      dispatch(showLoader(true));
      const response = await axios.post(
        "http://localhost:8001/api/login",
        user
      );
      if (response.status === 200 && response.data.success) {
        message.success(response.data.message);
        // Redirect to the admin page
      } else {
        message.error("Failed to login.");
      }
    } catch (error) {
      message.error("Failed to login: " + error.message);
    } finally {
      dispatch(showLoader(false));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-5 p-5 border border-gray-500 shadow w-96">
        <h1 className="text-xl font-semibold text-white">Musco - Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-2"
        />
        <button
          type="button"
          onClick={login}
          className="p-2 text-white bg-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin; // Export the AdminLogin component
