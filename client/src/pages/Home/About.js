import React from "react";
import about from "../../assets/About_MusCo.png";

const About = () => {
  return (
    <div>
      <div className="homepage h-[86vh] bg-mc-blue ml-2 pl-7 flex items-center justify-center">
        <div className="gap-7 py-7 w-[70vw]">
          <h1 className="p-3 text-5xl font-bold text-quaternary-100"></h1>
          <p className="w-2/3 p-3 text-xs italic font-bold text-justify text-quinary-100">
            MusCo, also known as Mustafa COSKUNCELEBI, is a dedicated full-stack
            developer with a strong specialization in the MERN stack. With a
            background in Management Information Systems, he brings a
            disciplined and organized approach to his work. His expertise in
            JavaScript, React.js, Node.js, and responsive web design showcases
            his commitment to best practices and efficient code. MusCo's ability
            to create maintainable, cross-browser compatible layouts highlights
            his proficiency in front-end and back-end development. Transitioning
            from a strategic role in the military to the dynamic field of web
            development, MusCo leverages his experience to excel in IT projects.
            His focus on continuous learning and innovation drives him to stay
            updated with the latest industry trends. MusCo is passionate about
            sharing his knowledge and insights, making him a valuable asset in
            the tech community. Whether working on complex IT projects or
            developing user-friendly web applications, MusCo consistently
            delivers high-quality results that exceed expectations.
          </p>
          <p className="w-2/3 p-3 font-bold text-justify text-ms text-quinary-100">
            Transitioning from a strategic role in the military to the dynamic
            field of web development, MusCo leverages his experience to excel in
            IT projects. His focus on continuous learning and innovation drives
            him to stay updated with the latest industry trends. MusCo is
            passionate about sharing his knowledge and insights, making him a
            valuable asset in the tech community. Whether working on complex IT
            projects or developing user-friendly web applications, MusCo
            consistently delivers high-quality results that exceed expectations.
          </p>
          <button className="px-5 py-1 mx-3 text-xl font-bold tracking-wider border-2 rounded border-quinary-300 text-quinary-300 ">
            Dive in
          </button>
        </div>

        <div>
          <img src={about} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
