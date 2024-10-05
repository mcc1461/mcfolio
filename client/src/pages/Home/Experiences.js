import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

const Experiences = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];

  // Sort experiences by the 'order' field in ascending order
  const sortedExperiences = [...experiences].sort((a, b) => {
    const orderA = a.order !== undefined ? Number(a.order) : Infinity;
    const orderB = b.order !== undefined ? Number(b.order) : Infinity;
    return orderA - orderB; // Ascending order
  });

  return (
    <>
      <SectionTitle title="Experiences" />
      <div className="flex flex-col items-center justify-center h-full overflow-hidden bg-mc-blue">
        <div className="flex flex-col w-full max-w-5xl px-4 mx-auto md:px-6 lg:px-8">
          {sortedExperiences.map((experience) => (
            <div
              key={experience._id}
              className="flex flex-col items-center justify-center w-full p-4 mb-4 rounded-lg shadow-lg gap-7 bg-mc-blue-darker1"
              onMouseEnter={() => setHoveredId(experience._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`w-full border-l-4 pl-2 cursor-pointer ${
                  hoveredId === experience._id
                    ? "text-quaternary-300 border-quaternary-200"
                    : "text-mc-white border-[#258d54]"
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold ${
                    hoveredId === experience._id
                      ? "text-quaternary-300"
                      : "text-mc-white"
                  }`}
                >
                  {experience.period}
                </h2>
                {experience.location.map((location, index) => (
                  <p
                    key={`${experience._id}-${index}`}
                    className={`text-sm sm:text-base lg:text-lg xl:text-xl ${
                      hoveredId === experience._id
                        ? "text-secondary-300 font-semibold"
                        : "text-secondary-100"
                    }`}
                  >
                    {location}
                  </p>
                ))}
              </div>
              <div className="w-full">
                <p className="mb-3 text-lg font-bold sm:text-xl lg:text-2xl xl:text-3xl text-quaternary-200">
                  {experience.role}
                </p>
                {hoveredId === experience._id && (
                  <p className="text-sm text-justify transition-opacity duration-300 sm:text-base lg:text-lg xl:text-xl text-quaternary-100">
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
