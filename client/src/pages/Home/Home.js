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

  // Check if admin is still logged in
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

  return (
    <div className="relative bg-inherit">
      {/* Header */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* Admin Warning */}
      {isAdminLoggedIn && (
        <div
          className="absolute left-0 right-0 z-50 p-4 text-center text-white bg-red-600"
          style={{ top: `${headerRef.current?.offsetHeight || 0}px` }} // Position based on the header height
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

      {/* Main Content */}
      <div className="mt-4">
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
