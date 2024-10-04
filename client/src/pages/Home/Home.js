import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";
import VisitorCounter from "../../components/VisitorCounter"; // Assuming this exists

function Home() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const headerRef = useRef(null); // Ref for Header
  const [headerHeight, setHeaderHeight] = useState(0);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");
    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Calculate header height to place warning under it
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [headerRef]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdminLogin");
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="relative min-h-screen bg-inherit">
      {/* Header */}
      <div ref={headerRef} className="relative z-50">
        <Header />
      </div>

      {/* Admin Warning */}
      {isAdminLoggedIn && (
        <div
          className="fixed z-40 w-full p-2 text-center text-white bg-red-600"
          style={{ top: `${headerHeight}px` }} // Ensures it's right below the header
        >
          <span>
            ADMIN LOGGED IN!{" "}
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
      <div className="fixed bottom-6 right-6">
        <VisitorCounter />
      </div>
    </div>
  );
}

export default Home;
