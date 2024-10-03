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
  const headerRef = useRef(null);

  console.log("Header Ref: ", headerRef);
  console.log("Header Height (before calculation): ", headerHeight);

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdminLogin");
    if (token && isAdmin === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Function to calculate the header height
  const calculateHeaderHeight = () => {
    if (headerRef.current) {
      const calculatedHeight = headerRef.current.getBoundingClientRect().height;
      console.log("Header Height Calculated: ", calculatedHeight);
      setHeaderHeight(calculatedHeight);
    }
  };

  // Use MutationObserver to detect changes in the header's layout
  useEffect(() => {
    if (headerRef.current) {
      calculateHeaderHeight(); // Initial calculation after mount

      const observer = new MutationObserver(() => {
        calculateHeaderHeight();
      });

      observer.observe(headerRef.current, { childList: true, subtree: true });

      // Cleanup observer when the component unmounts
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // Handle logout
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
          className="fixed right-0 z-50 px-4 py-2 text-white bg-red-600"
          style={{ top: `${headerHeight}px` }}
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
