import React, { useEffect, useState } from "react";
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

      {/* Admin Logout Warning */}
      {isAdminLoggedIn && (
        <div className="z-50 w-full px-4 py-2 text-white bg-red-600 fixed top-[72px]">
          {/* Adjust `top-[72px]` to match your header height */}
          <div className="flex justify-end">
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
        </div>
      )}

      {/* Main Content */}
      <div className="pt-[72px]">
        {" "}
        {/* Add padding top equal to the header height */}
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
