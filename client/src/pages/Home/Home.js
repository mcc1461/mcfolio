import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";
import VisitorCounter from "../../components/VisitorCounter"; // Retain VisitorCounter component

function Home() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");
    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Dynamically set header height
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
          className="fixed top-[72px] right-0 z-50 px-4 py-2 text-white bg-red-600"
          style={{ top: `${headerHeight}px` }}
        >
          <span className="text-sm md:text-base">
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
      {/* Main Content */}
      <div className="pt-[72px]">
        <Intro />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        <Sidebar />
      </div>
      {/* Visitor Counter */}
      <VisitorCounter /> {/* Restored visitor counter */}
      <Footer />
    </div>
  );
}

export default Home;
