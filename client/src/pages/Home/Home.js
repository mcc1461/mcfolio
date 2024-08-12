// src/pages/Home/Home.js

import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="pl-12 bg-inherit lg:pl-0 md:pl-0 sm:pl-0">
      <Header />
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
