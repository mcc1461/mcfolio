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
    if (token) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  return (
    <div className="pl-12 bg-inherit lg:pl-0 md:pl-0 sm:pl-0">
      <Header />

      {/* Reminder Box */}
      {isAdminLoggedIn && (
        <div className="p-4 text-center text-white bg-red-600">
          <p className="font-bold">
            You are still logged in as Admin! Please{" "}
            <span
              onClick={() => {
                localStorage.removeItem("authToken");
                setIsAdminLoggedIn(false);
              }}
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
