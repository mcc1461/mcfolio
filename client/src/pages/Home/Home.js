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
    <div className="relative min-h-screen bg-inherit">
      {/* Header */}
      <div className="relative z-50">
        <Header />
      </div>

      {/* Admin Warning */}
      {isAdminLoggedIn && (
        <div className="sticky top-0 z-40 w-full p-2 text-center text-white bg-red-600">
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

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="z-30 hidden w-1/4 text-white bg-gray-800 lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="w-full pt-4 lg:w-3/4">
          <Intro />
          <About />
          <Experiences />
          <Projects />
          <Contact />
        </div>
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
