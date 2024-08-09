import React from "react";
import photo from "../../assets/photo.jpg";

const Intro = () => {
  return (
    <>
      <div className="homepage h-[93vh] bg-mc-blue pl-7 flex items-center justify-center  md:flex-col-reverse sm:flex-col-reverse">
        <div className="gap-7 py-7 w-[70vw] md:w-[90vw] sm:w-[90vw] md:text-center sm:text-center">
          <h1 className="p-3 text-4xl font-semibold sm:text-xl md:text-2xl lg:text-3xl text-quinary-100">
            Hi, I am
          </h1>
          <h1 className="p-3 text-4xl font-bold sm:text-xl md:text-2xl lg:text-3xl text-quaternary-100 md:text-wrap sm:text-wrap">
            Mustafa COSKUNCELEBI
          </h1>
          <h1 className="w-2/3 p-3 text-3xl italic font-bold text-justify sm:text-lg md:text-xl lg:text-2xl md:text-center sm:text-center md:w-[90vw] sm:w-[90vw] text-quinary-100">
            As a web developer, I bring ideas to life by creating interactive
            and flexible digital experiences.
          </h1>
          <h1 className="hidden w-2/3 p-3 font-bold text-justify text-ms lg:text-lg xl:text-xl xl2:text-2xl xl2:block xl:block lg:block text-quinary-100">
            I recently completed a Full Stack Web Development bootcamp, during
            which I specialized in the MERN-Stack (MongoDB, React, Node.js,
            Express.js). I am enthusiastic about the prospect of extending my
            knowledge and embracing new challenges, as a developer who is both
            dedicated and impassioned. I am constantly seeking opportunities to
            expand and innovate within the realm of web development.
          </h1>
          <a href="#Projects">
            <button className="px-5 py-1 mx-3 text-xl font-bold tracking-wider border-2 rounded border-quinary-300 text-quinary-300 ">
              Projects
            </button>
          </a>
        </div>
        <div className="photo w-[40vw] ">
          <img
            src={photo}
            alt=""
            className="h-[40vh] md:h-[25vh] sm:h-[25vh] rounded-full -mx-5"
          />
        </div>
      </div>
    </>
  );
};

export default Intro;
