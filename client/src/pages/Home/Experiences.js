import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

const Experiences = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Correctly access the experiences array from portfolioData
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];

  return (
    <>
      <SectionTitle title="Experiences" />
      <div className="flex flex-col items-center justify-center h-full overflow-hidden bg-mc-blue">
        <div className="flex flex-col w-full max-w-6xl px-4">
          {" "}
          {/* Added `px-4` for padding */}
          {experiences.map((experience) => (
            <div
              key={experience._id} // Unique key for each experience using _id
              className="flex flex-col items-center justify-center w-full p-4 m-4 mr-8 rounded-lg shadow-lg gap-7 bg-mc-blue-darker1"
              onMouseEnter={() => setHoveredId(experience._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Period and Location Section */}
              <div
                className={`w-full border-l-4 pl-2 cursor-pointer ${
                  hoveredId === experience._id
                    ? "text-quaternary-300 border-quaternary-200"
                    : "text-mc-white border-[#258d54]"
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-semibold ${
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
                      key={`${experience._id}-location-${index}`} // Unique key combining _id and index for locations
                      className={`text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl ${
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

              {/* Role and Description Section */}
              <div className="w-full">
                <p className="mb-3 text-lg font-bold sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-quaternary-200">
                  {experience.role}
                </p>
                {hoveredId === experience._id && (
                  <p className="text-sm text-justify transition-opacity duration-300 sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl text-quaternary-100">
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
