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
  const headerRef = useRef(null); // Ref to get the header height
  const [headerHeight, setHeaderHeight] = useState(0); // State to store header height

  // Check if admin is still logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");

    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Dynamically calculate and store the height of the header
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
      <div className="mt-4">
        {isAdminLoggedIn && (
          <div
            className="sticky p-4 text-center text-white bg-red-600"
            style={{ top: `${headerHeight}px` }} // Dynamically position below header
          >
            <p className="font-bold">
              You are still logged in as Admin! Please{" "}
              <span
                onClick={handleLogout}
                className="underline cursor-pointer hover:text-gray-300"
              >
                log out
              </span>{" "}
              for security reasons.
            </p>
          </div>
        )}
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
