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
      {/* Admin Warning */}
      {isAdminLoggedIn && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4 text-center text-white bg-red-600">
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

      {/* Adding a top padding to prevent the header from covering the content */}
      <div className={isAdminLoggedIn ? "pt-24" : ""}>
        <Header />
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
