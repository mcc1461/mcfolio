import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";
import VisitorCounter from "../../components/VisitorCounter"; // Assuming VisitorCounter is a separate component

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
    <div className="relative bg-inherit">
      {/* Header */}
      <Header />

      {/* Main Content Grid Layout */}
      <div className="grid grid-rows-[auto_auto_1fr]">
        {/* Admin Logout Warning */}
        {isAdminLoggedIn && (
          <div className="fixed top-0 z-50 w-full px-4 py-2 text-center text-white bg-red-600">
            <span>
              Admin!{" "}
              <span
                onClick={handleLogout}
                className="font-bold underline cursor-pointer hover:text-gray-300"
              >
                LOG OUT
              </span>
            </span>
          </div>
        )}

        {/* Visitor Counter */}
        <VisitorCounter />

        {/* Main Content */}
        <div className="mt-4">
          <Intro />
          <About />
          <Experiences />
          <Projects />
          <Contact />
          <Sidebar />
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
