import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";

function Home() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null); // Ref to get the header height

  // Check if admin is still logged in
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
  }, [headerRef]);

  // Handle logout logic
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

      {/* Main Content */}
      <div style={{ marginTop: `${headerHeight + 64}px` }}>
        {" "}
        {/* Adjust margin based on header and notification bar */}
        <Intro />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        <Sidebar />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
