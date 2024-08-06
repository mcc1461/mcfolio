import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Contact from "./Contact";

function Home() {
  return (
    <>
      <Header />
      <Intro />
      <About />
      <Experiences />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
