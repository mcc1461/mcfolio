import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <Intro />
      <div className="flex h-screen items-center justify-center">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-700">
            Welcome to my portfolio!
          </h2>
          <p className="text-lg text-center text-gray-700">
            I am a full stack developer with a passion for learning and creating
            new things. I have experience with JavaScript, React, Node.js, and
            more. I am always looking for new opportunities to learn and grow as
            a developer.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/about"
              className="text-lg font-bold text-blue-700 hover:underline"
            >
              About
            </Link>
            <Link
              to="/projects"
              className="text-lg font-bold text-blue-700 hover:underline"
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className="text-lg font-bold text-blue-700 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
