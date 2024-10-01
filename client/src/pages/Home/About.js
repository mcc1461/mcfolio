import React, { useState } from "react";
import { useSelector } from "react-redux";
import about from "../../assets/About_MusCo.png";
import SectionTitle from "../../components/SectionTitle";
import Logo from "../../assets/Musco777.gif"; // Added Logo

const About = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/About_MusCo.png?alt=media&token=3fa1bd96-5bbd-4fe2-8d00-8c44165748c3"
  );

  const handleImgError = () => {
    setImgSrc(about);
  };

  const { portfolioData } = useSelector((state) => state.root);

  const aboutData = portfolioData?.abouts?.[0] || {
    desc1: "",
    desc2: "",
    desc3: "",
    desc4: "",
    imageUrl: "",
    skills: [],
    title: "",
  };

  const { desc1, desc2, desc3, desc4, imageUrl, skills, title } = aboutData;

  return (
    <>
      <SectionTitle title="About" />

      {/* Full width container with no side margins */}
      <div className="flex justify-center w-full min-h-screen bg-mc-blue">
        {/* Flex container with logo and image on the left, text on the right */}
        <div className="flex flex-col lg:flex-row items-center justify-center h-full w-full max-w-[1400px] lg:space-x-8 p-5">
          {/* Left section for logo and image */}
          <div className="flex flex-col items-center justify-center w-full lg:w-[40%] space-y-5">
            {/* Logo */}
            <img
              src={Logo}
              alt="MusCo Logo"
              className="w-[350px] h-[180px] rounded-lg object-contain mb-5" // Ensure it's rectangular
            />
            {/* About Image */}
            <img
              src={imageUrl || imgSrc}
              alt="MusCo"
              onError={handleImgError}
              className="w-full h-auto max-w-[400px] rounded-lg bg-quaternary-100"
            />
          </div>

          {/* Right section with text and added padding for larger screens */}
          <div className="flex flex-col justify-start w-full lg:w-[50%] p-5 lg:pl-10 lg:pr-10">
            <div>
              <h1 className="text-4xl font-bold sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-quaternary-100">
                {title || "About Me"}
              </h1>
              <h1 className="p-3 text-2xl font-bold text-justify sm:text-lg md:text-xl lg:text-2xl text-quinary-100">
                {desc1}
              </h1>
              <h1 className="p-3 text-2xl font-bold text-justify sm:text-lg md:text-xl lg:text-2xl text-quinary-100">
                {desc2}
              </h1>
              <h1 className="hidden p-3 text-2xl font-bold text-justify lg:block sm:text-xl md:text-xl lg:text-2xl text-quinary-100">
                {desc3}
              </h1>
              <h1 className="hidden p-3 text-2xl font-bold text-justify lg:block sm:text-xl md:text-xl lg:text-2xl text-quinary-100">
                {desc4}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="w-full bg-mc-blue">
        <div className="flex flex-col items-center justify-center h-full p-5 overflow-auto bg-mc-blue">
          <h1 className="text-4xl font-bold sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-primary-100 p-7">
            ***{" "}
            <span className="border-b-4 border-quaternary-200">
              IT Tools I Use
            </span>{" "}
            ***
          </h1>
          <ul className="flex flex-wrap gap-4 text-xl font-semibold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <li
                  key={index}
                  className="p-3 rounded-lg outline bg-quinary-200 text-secondary-700"
                >
                  {skill}
                </li>
              ))
            ) : (
              <li className="text-lg text-quaternary-300">
                No skills available
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;
