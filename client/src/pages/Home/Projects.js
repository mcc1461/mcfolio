import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

const Projects = () => {
  const [activeId, setActiveId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const { portfolioData } = useSelector((state) => state.root);
  const projects = [...(portfolioData?.projects || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  // Detect mobile device (simple user-agent approach)
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  // Desktop hover handlers
  const handleMouseEnter = (id) => {
    setActiveId(id);
  };
  const handleMouseLeave = () => {
    setActiveId(null);
  };

  // Mobile tap handler (toggle)
  const handleToggle = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div id="Projects">
      <SectionTitle title="Projects" />
      <div className="flex flex-col items-center justify-center h-full overflow-hidden bg-mc-blue">
        <div className="flex flex-col w-full max-w-5xl px-4 mx-auto md:px-6 lg:px-8">
          {projects.length > 0 ? (
            projects.map((project) => {
              const isOpen = activeId === project._id;

              return (
                <div
                  key={project._id}
                  className="flex flex-col items-center justify-center w-full p-4 mb-4 rounded-lg shadow-lg gap-7 bg-mc-blue-darker1"
                  // Conditionally attach desktop or mobile listeners
                  onMouseEnter={
                    !isMobile ? () => handleMouseEnter(project._id) : undefined
                  }
                  onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                  onClick={
                    isMobile ? () => handleToggle(project._id) : undefined
                  }
                >
                  {/* HEADER with border + icon */}
                  <div
                    className={`w-full border-l-4 pl-2 py-2 flex items-center justify-between cursor-pointer ${
                      isOpen
                        ? "text-quaternary-300 border-quaternary-200"
                        : "text-mc-white border-[#258d54]"
                    }`}
                  >
                    {/* Project Type (large fonts) */}
                    <h2
                      className={`
                        font-semibold
                        text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl
                        ${isOpen ? "text-quaternary-300" : "text-mc-white"}
                      `}
                    >
                      {project.type}
                    </h2>

                    {/* Expand/Collapse Icon - rotates when open */}
                    <ArrowDownCircleIcon
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300
                        ${
                          isOpen
                            ? "rotate-180 text-quaternary-200"
                            : "text-secondary-100"
                        }
                      `}
                    />
                  </div>

                  {/* If open, show project image */}
                  {isOpen && project.image && (
                    <div className="flex flex-col w-full text-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  )}

                  {/* Project Title and Description */}
                  <div className="w-full">
                    <p className="mb-3 text-lg font-bold sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-quaternary-200">
                      {project.title}
                    </p>

                    {/* If open, show desc + buttons */}
                    {isOpen && (
                      <>
                        <p className="text-sm text-justify sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-xl text-quaternary-100">
                          {project.desc}
                        </p>

                        {/* Buttons: Link + Live (optional) */}
                        <div className="flex flex-wrap gap-3 mt-3">
                          {project.link && (
                            <button className="px-3 py-1 text-lg font-bold tracking-wider border-2 rounded sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl border-quinary-300 text-quinary-300 hover:border-quinary-500 hover:bg-quinary-200 hover:text-quinary-700">
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Link
                              </a>
                            </button>
                          )}
                          {project.live && (
                            <button className="px-3 py-1 text-lg font-bold tracking-wider border-2 rounded sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl border-quinary-300 text-quinary-300 hover:border-quinary-500 hover:bg-quinary-200 hover:text-quinary-700">
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Live
                              </a>
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-lg text-quaternary-300">No projects available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
