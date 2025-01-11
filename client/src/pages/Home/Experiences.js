import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
// If you haven't installed Heroicons, run: npm i @heroicons/react
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Experiences = () => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];

  // Detect mobile device once (simple approach via user agent)
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  // Sort experiences by the 'order' field in ascending order
  const sortedExperiences = [...experiences].sort((a, b) => {
    const orderA = a.order !== undefined ? Number(a.order) : Infinity;
    const orderB = b.order !== undefined ? Number(b.order) : Infinity;
    return orderA - orderB; // ascending order
  });

  // For mobile: toggle on tap
  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // For desktop: set active on hover, clear on leave
  const handleMouseEnter = (id) => {
    setActiveId(id);
  };
  const handleMouseLeave = () => {
    setActiveId(null);
  };

  return (
    <>
      <SectionTitle title="Experiences" />
      <div className="flex flex-col items-center justify-center h-full bg-mc-blue">
        <div className="flex flex-col w-full max-w-5xl px-4 py-4 mx-auto md:px-6 lg:px-8">
          {sortedExperiences.map((experience) => {
            const isExpanded = activeId === experience._id;

            return (
              <div
                key={experience._id}
                className="w-full p-4 mb-4 rounded-lg shadow-lg bg-mc-blue-darker1"
                /*
                  Conditionally attach event handlers based on device type.
                  - Desktop: onMouseEnter / onMouseLeave
                  - Mobile: onClick (tap) to toggle
                */
                onMouseEnter={
                  !isMobile ? () => handleMouseEnter(experience._id) : undefined
                }
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                onClick={
                  isMobile ? () => handleToggle(experience._id) : undefined
                }
              >
                {/* HEADER: period & location + chevron */}
                <div
                  className={`flex justify-between items-center border-l-4 pl-2 py-2 ${
                    isExpanded
                      ? "border-quaternary-200 text-quaternary-300"
                      : "border-[#258d54] text-mc-white"
                  }`}
                >
                  {/* Left side: period / location */}
                  <div>
                    <h2
                      className={`text-lg sm:text-xl md:text-2xl font-semibold ${
                        isExpanded ? "text-quaternary-300" : "text-mc-white"
                      }`}
                    >
                      {experience.period}
                    </h2>
                    {experience.location.map((location, idx) => (
                      <p
                        key={`${experience._id}-${idx}`}
                        className={`text-sm sm:text-base md:text-lg ${
                          isExpanded
                            ? "text-secondary-300 font-semibold"
                            : "text-secondary-100"
                        }`}
                      >
                        {location}
                      </p>
                    ))}
                  </div>

                  {/* Right side: chevron icon */}
                  <ChevronDownIcon
                    className={`w-6 h-6 transition-transform duration-300 ${
                      isExpanded
                        ? "rotate-180 text-quaternary-200"
                        : "text-secondary-100"
                    }`}
                  />
                </div>

                {/* BODY: role + description (conditionally visible) */}
                <div className="w-full mt-2">
                  <p className="mb-2 text-lg font-bold sm:text-xl md:text-2xl text-quaternary-200">
                    {experience.role}
                  </p>
                  {isExpanded && (
                    <p className="text-sm text-justify transition-opacity duration-300 sm:text-base md:text-lg text-quaternary-100">
                      {experience.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Experiences;
