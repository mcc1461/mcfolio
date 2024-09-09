import React from "react";

const Sidebar = () => {
  return (
    <div
      className="flex fixed left-0 bottom-0 w-[30px] px-6 lg:w-full md:w-full sm:w-full
    lg:static md:static sm:static lg:items-center md:items-center sm:items-center 
    lg:bg-mc-blue lg:py-10 md:bg-mc-blue md:py-10 sm:bg-mc-blue sm:py-10"
    >
      <div
        className="flex flex-col items-center w-[1%]
       lg:flex-row md:flex-row sm:flex-row lg:gap-2 md:gap-2 sm:gap-2
       lg:w-full md:w-full sm:w-full lg:items-center md:items-center sm:items-center"
      >
        <div className="w-[4px] h-32 bg-quinary-300 my-10 lg:hidden md:hidden sm:hidden"></div>
        <div className="flex flex-col gap-5 lg:flex-row md:flex-row sm:flex-row lg:w-full md:w-full sm:w-full lg:items-center md:items-center sm:items-center lg:justify-center md:justify-center sm:justify-center lg:bg-none">
          {/* GitHub Icon */}
          <a
            href="https://github.com/mcc1461/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 transition-colors duration-300 border-2 border-transparent rounded-full hover:border-quaternary-400 group"
          >
            <i className="text-2xl transition-colors duration-300 ri-github-fill text-quinary-300 group-hover:text-quaternary-500"></i>
          </a>

          {/* LinkedIn Icon */}
          <a
            href="https://www.linkedin.com/in/mcoskuncelebi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 transition-colors duration-300 border-2 border-transparent rounded-full hover:border-quaternary-400 group"
          >
            <i className="text-2xl transition-colors duration-300 ri-linkedin-fill text-quinary-300 group-hover:text-quaternary-500"></i>
          </a>

          {/* Medium Icon */}
          <a
            href="https://medium.com/@mcc1461a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 transition-colors duration-300 border-2 border-transparent rounded-full hover:border-quaternary-400 group"
          >
            <i className="text-2xl transition-colors duration-300 ri-medium-fill text-quinary-300 group-hover:text-quaternary-500"></i>
          </a>
        </div>
        <div className="w-[4px] h-32 bg-quinary-300 my-10 lg:hidden md:hidden sm:hidden"></div>
      </div>
    </div>
  );
};

export default Sidebar;
