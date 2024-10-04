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
  const [headerHeight, setHeaderHeight] = useState(0); // Track header height
  const headerRef = useRef(null);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");
    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Dynamically set header height on mount
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
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
      <div ref={headerRef}>
        <Header />
      </div>

      {/* Admin Logout Warning */}
      {isAdminLoggedIn && (
        <div
          className="fixed left-0 right-0 z-50 px-4 py-2 text-white bg-red-600"
          style={{ top: `${headerHeight}px` }} // Place right beneath the header
        >
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
  );
}

export default Home;
