import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { experiences } from "../../resources/experiences";

const Experiences = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <SectionTitle title="Experiences" />
      <div className="flex flex-col items-center justify-center h-full overflow-auto bg-mc-blue lg:flex-row xl:flex-row xl2:flex-row">
        <div className="flex flex-col w-full max-w-6xl">
          {experiences.map((experience) => (
            <div
              key={experience._id}
              className="flex flex-col items-center justify-center p-4 m-4 rounded-lg shadow-lg lg:flex-row xl:flex-row xl2:flex-row gap-7 bg-mc-blue-darker1"
              onMouseEnter={() => setHoveredId(experience._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`w-full lg:w-[35%] border-l-4 pl-2 cursor-pointer ${
                  hoveredId === experience._id
                    ? "text-quaternary-300 border-quaternary-200"
                    : "text-mc-white border-[#258d54]"
                }`}
              >
                <h2
                  className={`text-2xl font-semibold ${
                    hoveredId === experience._id
                      ? "text-quaternary-300"
                      : "text-mc-white"
                  }`}
                >
                  {experience.period}
                </h2>
                <div className="flex flex-col text-lg">
                  {experience.location.map((location, index) => (
                    <p
                      key={index}
                      className={`${
                        hoveredId === experience._id
                          ? "text-secondary-300 font-semibold"
                          : "text-secondary-100"
                      }`}
                    >
                      {location}
                    </p>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-[65%]">
                <p className="mb-3 text-2xl font-bold text-quaternary-200">
                  {experience.role}
                </p>
                {hoveredId === experience._id && (
                  <p className="text-lg text-justify transition-opacity duration-300 text-quaternary-100">
                    {experience.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Experiences;
