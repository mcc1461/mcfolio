import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"; // New icon

const Experiences = () => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];

  // Detect mobile device (simple user-agent check)
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  // Sort experiences by 'order' field ascending
  const sortedExperiences = [...experiences].sort((a, b) => {
    const orderA = a.order !== undefined ? Number(a.order) : Infinity;
    const orderB = b.order !== undefined ? Number(b.order) : Infinity;
    return orderA - orderB;
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
                  Conditionally attach event handlers by device type:
                  - Desktop: onMouseEnter/onMouseLeave
                  - Mobile: onClick (tap) to expand/collapse
                */
                onMouseEnter={
                  !isMobile ? () => handleMouseEnter(experience._id) : undefined
                }
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                onClick={
                  isMobile ? () => handleToggle(experience._id) : undefined
                }
              >
                {/* HEADER SECTION: period/location + icon */}
                <div
                  className={`flex justify-between items-center border-l-4 pl-2 py-2 ${
                    isExpanded
                      ? "border-quaternary-200 text-quaternary-300"
                      : "border-[#258d54] text-mc-white"
                  }`}
                >
                  {/* Left: Period + Location */}
                  <div>
                    {/* Period -> Larger font */}
                    <h2
                      className={`
                        font-semibold
                        text-xl sm:text-2xl md:text-3xl lg:text-4xl
                        ${isExpanded ? "text-quaternary-300" : "text-mc-white"}
                      `}
                    >
                      {experience.period}
                    </h2>
                    {experience.location.map((location, idx) => (
                      <p
                        key={`${experience._id}-${idx}`}
                        className={`
                          ${
                            isExpanded
                              ? "text-secondary-300 font-semibold"
                              : "text-secondary-100"
                          }
                          text-base sm:text-lg md:text-xl lg:text-2xl
                        `}
                      >
                        {location}
                      </p>
                    ))}
                  </div>

                  {/* Right: ArrowDownCircleIcon -> bigger + rotate when expanded */}
                  <ArrowDownCircleIcon
                    className={`
                      w-8 h-8 md:w-10 md:h-10
                      transition-transform duration-300
                      ${
                        isExpanded
                          ? "rotate-180 text-quaternary-200"
                          : "text-secondary-100"
                      }
                    `}
                  />
                </div>

                {/* BODY SECTION: Role + Description if expanded */}
                <div className="w-full mt-2">
                  <p
                    className="text-lg font-bold  text-quaternary-200 sm:text-xl md:text-2xl lg:text-3xl"
                  >
                    {experience.role}
                  </p>
                  {isExpanded && (
                    <p
                      className="text-base text-justify transition-opacity duration-300  text-quaternary-100 sm:text-lg md:text-xl lg:text-2xl"
                    >
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
