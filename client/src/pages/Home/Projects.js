import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline"; // Icon

const Experiences = () => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];

  // Detect mobile device (simple user-agent approach)
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  // Sort experiences by 'order' field (ascending)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const orderA = a.order !== undefined ? Number(a.order) : Infinity;
    const orderB = b.order !== undefined ? Number(b.order) : Infinity;
    return orderA - orderB;
  });

  // For mobile: toggle on tap
  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  // For desktop: expand on hover, collapse on mouse leave
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
                  Conditionally attach event handlers based on device:
                  - Desktop: onMouseEnter / onMouseLeave
                  - Mobile: onClick
                */
                onMouseEnter={
                  !isMobile ? () => handleMouseEnter(experience._id) : undefined
                }
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                onClick={
                  isMobile ? () => handleToggle(experience._id) : undefined
                }
              >
                {/* HEADER: Period & Locations + Icon */}
                <div
                  className={`flex justify-between items-center border-l-4 pl-2 py-2 ${
                    isExpanded
                      ? "border-quaternary-200 text-quaternary-300"
                      : "border-[#258d54] text-mc-white"
                  }`}
                >
                  {/* LEFT: Period & Locations */}
                  <div>
                    {/* PERIOD -> Large on bigger screens */}
                    <h2
                      className={`
                        font-semibold
                        text-lg
                        sm:text-2xl
                        md:text-4xl
                        lg:text-5xl
                        xl:text-6xl
                        ${isExpanded ? "text-quaternary-300" : "text-mc-white"}
                      `}
                    >
                      {experience.period}
                    </h2>
                    {experience.location.map((loc, idx) => (
                      <p
                        key={`${experience._id}-${idx}`}
                        className={`
                          ${
                            isExpanded
                              ? "text-secondary-300 font-semibold"
                              : "text-secondary-100"
                          }
                          text-sm
                          sm:text-lg
                          md:text-2xl
                          lg:text-3xl
                          xl:text-4xl
                        `}
                      >
                        {loc}
                      </p>
                    ))}
                  </div>

                  {/* RIGHT: Icon -> Larger on bigger breakpoints */}
                  <ArrowDownCircleIcon
                    className={`
                      transition-transform duration-300
                      ${
                        isExpanded
                          ? "rotate-180 text-quaternary-200"
                          : "text-secondary-100"
                      }
                      w-8 h-8
                      sm:w-10 sm:h-10
                      md:w-12 md:h-12
                      lg:w-14 lg:h-14
                      xl:w-16 xl:h-16
                    `}
                  />
                </div>

                {/* BODY: Role & Description (visible if expanded) */}
                <div className="w-full mt-2">
                  <p className="text-base font-bold  text-quaternary-200 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                    {experience.role}
                  </p>
                  {isExpanded && (
                    <p className="text-sm text-justify transition-opacity duration-300  text-quaternary-100 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl">
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
