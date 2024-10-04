import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";
import VisitorCounter from "../../components/VisitorCounter";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation

function Home() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");
    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdminLogin");
    setIsAdminLoggedIn(false);
  };

  // Navigate to Admin Dashboard
  const handleAdminDashboard = () => {
    navigate("/admin-dashboard"); // Adjust based on your actual admin dashboard route
  };

  return (
    <div className="relative min-h-screen bg-inherit">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="pl-12 bg-inherit lg:pl-0 md:pl-0 sm:pl-0">
        <Intro />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        <Sidebar />
        <Footer />
      </div>

      {/* Visitor Counter */}
      <VisitorCounter />

      {/* Admin Warning and Admin Dashboard Button */}
      {isAdminLoggedIn && (
        <div className="fixed flex flex-col items-end gap-3 bottom-5 right-5">
          {/* Admin Dashboard Button */}

          <button
            onClick={handleAdminDashboard}
            className="flex items-center justify-center px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Admin Dashboard
          </button>
          {/* Admin Logout Warning */}
          <div className="flex items-center justify-between p-3 text-sm text-white bg-red-600 rounded-lg shadow-lg opacity-90">
            <span>ADMIN LOGGED IN!</span>
            <button
              onClick={handleLogout}
              className="ml-4 text-xs font-bold underline cursor-pointer hover:text-gray-300"
            >
              LOG OUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
