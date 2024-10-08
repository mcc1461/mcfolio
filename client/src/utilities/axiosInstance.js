// axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://musco.dev/api", // Set your API base URL
  // You can set other default configurations here
});

// Set up request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config before it is sent
    // For example, attach the authorization token if it exists
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Set up response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("Axios error:", error);
    // You can perform additional actions here, such as logging out the user if unauthorized
    return Promise.reject(error);
  }
);

export default axiosInstance;
