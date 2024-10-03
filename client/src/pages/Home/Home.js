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

  // Check if authToken and isAdminLogin are present in localStorage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const adminStatus = localStorage.getItem("isAdminLogin");

    if (token && adminStatus === "true") {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdminLogin");
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="pl-12 bg-inherit lg:pl-0 md:pl-0 sm:pl-0">
      <Header />

      {/* Log-out warning */}
      {isAdminLoggedIn && (
        <div className="p-4 text-center text-white bg-red-600">
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
      <Footer />
    </div>
  );
}

export default Home;
