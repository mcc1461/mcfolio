import React, { useState } from "react";
import { useSelector } from "react-redux";
import about from "../../assets/About_MusCo.png";
import SectionTitle from "../../components/SectionTitle";

const About = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/About_MusCo.png?alt=media&token=3fa1bd96-5bbd-4fe2-8d00-8c44165748c3"
  );

  const handleImgError = () => {
    setImgSrc(about);
  };

  const { portfolioData } = useSelector((state) => state.root);

  // Provide default values to prevent errors
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
      <div className="section-A">
        <div className="flex flex-col items-center justify-center h-full overflow-auto bg-mc-blue lg:flex-row xl:flex-row xl2:flex-row">
          <div className="flex items-center justify-center w-full p-3 lg:w-1/2">
            <img
              src={imageUrl || imgSrc}
              alt="MusCo"
              onError={handleImgError}
              className="w-full h-auto max-w-[500px] rounded-lg bg-quaternary-100"
            />
          </div>
          <div className="w-full p-3 overflow-y-auto lg:w-1/2">
            <div>
              <h1 className="p-3 text-3xl font-bold md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl text-quaternary-100">
                {title || "About Me"}
              </h1>
              <p className="p-3 text-sm font-bold text-justify md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                {desc1}
              </p>
              <p className="p-3 text-sm font-bold text-justify md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                {desc2}
              </p>
              <p className="hidden p-3 text-sm font-bold text-justify lg:block xl:block xl2:block md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                {desc3}
              </p>
              <p className="hidden p-3 text-sm font-bold text-justify lg:block xl:block xl2:block md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-quinary-100">
                {desc4}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="section-B">
        <div className="flex flex-col items-center justify-center h-full p-5 overflow-auto bg-mc-blue">
          <h1 className="text-2xl font-bold text-primary-100 p-7">
            ***{" "}
            <span className="border-b-4 border-quaternary-200">
              IT Tools I Use
            </span>{" "}
            ***
          </h1>
          <ul className="flex flex-wrap gap-3 font-semibold text-md">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <li
                  key={index}
                  className="p-2 rounded-lg outline bg-quinary-200 text-secondary-700"
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
