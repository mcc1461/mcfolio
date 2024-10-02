import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Projects = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Correctly access the projects array from portfolioData
  const { portfolioData } = useSelector((state) => state.root);

  // Create a shallow copy of the projects array before sorting
  const projects = [...(portfolioData?.projects || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div id="Projects">
      <SectionTitle title="Projects" />
      <div className="flex flex-col items-center justify-center h-full overflow-auto bg-mc-blue lg:flex-row xl:flex-row xl2:flex-row scrollable-container">
        <div className="flex flex-col w-full max-w-6xl">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id} // Use the actual _id from each project as the key
                className="flex flex-col items-center justify-center p-4 m-4 rounded-lg shadow-lg lg:flex-row xl:flex-row xl2:flex-row gap-7 bg-mc-blue-darker1"
                onMouseEnter={() => setHoveredId(project._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Left Section (Project Type) */}
                <div
                  className={`w-full lg:w-[35%] min-w-[250px] border-l-4 pl-2 cursor-pointer ${
                    hoveredId === project._id
                      ? "text-quaternary-300 border-quaternary-200"
                      : "text-mc-white border-[#258d54]"
                  }`}
                >
                  <h2
                    className={`text-2xl font-semibold ${
                      hoveredId === project._id
                        ? "text-quaternary-300"
                        : "text-mc-white"
                    }`}
                  >
                    {project.type}
                  </h2>
                </div>

                {/* Image Section */}
                {hoveredId === project._id && (
                  <div className="flex flex-col text-lg w-full lg:w-[35%]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}

                {/* Right Section (Text and Description) */}
                <div className="w-full lg:w-[65%] min-w-[300px]">
                  <p className="mb-3 text-2xl font-bold text-quaternary-200">
                    {project.title}
                  </p>
                  {hoveredId === project._id && (
                    <>
                      <p className="text-lg text-justify text-quaternary-100">
                        {project.desc}
                      </p>
                      <button className="px-3 py-1 mt-3 text-xl font-bold tracking-wider border-2 rounded border-quinary-300 text-quinary-300 hover:border-quinary-500 hover:bg-quinary-200 hover:text-quinary-700">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-lg"
                        >
                          Link
                        </a>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg text-quaternary-300">No projects available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
