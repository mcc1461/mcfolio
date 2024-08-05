import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import SectionTitle from "../../components/SectionTitle";
import Experiences from "./Experiences";

function Home() {
  return (
    <>
      <Header />
      <Intro />
      <About />
      <Experiences />
      <Footer />
    </>
  );
}

export default Home;
