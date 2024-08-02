import React from "react";
import Header from "../../components/Header";
import Intro from "./Intro";
import Footer from "../../components/Footer";
import About from "./About";
import SectionTitle from "../../components/SectionTitle";

function Home() {
  return (
    <>
      <Header />
      <Intro />
      <SectionTitle title="About" />
      <About />
      <Footer />
    </>
  );
}

export default Home;
