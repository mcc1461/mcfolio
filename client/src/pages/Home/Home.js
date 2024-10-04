import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";
import VisitorCounter from "../../components/VisitorCounter"; // Assuming this exists as per previous discussions

function Home() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");
    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdminLogin");
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-inherit grid grid-rows-[auto,auto,1fr]">
      {/* Define a grid with three rows: header, warning (conditionally empty), and main content */}

      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Admin Warning */}
      {isAdminLoggedIn ? (
        <div className="z-50 p-4 text-center text-white bg-red-600">
          <span>
            Admin Logged In!{" "}
            <span
              onClick={handleLogout}
              className="font-bold underline cursor-pointer hover:text-gray-300"
            >
              LOG OUT
            </span>
          </span>
        </div>
      ) : (
        <div className="p-4">
          {" "}
          {/* Empty space for warning if admin not logged in */}
        </div>
      )}

      {/* Main Content */}
      <div className="mt-4">
        <Intro />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        <Sidebar />
      </div>

      {/* Visitor Counter */}
      <div className="fixed bottom-6 right-6">
        <VisitorCounter />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
