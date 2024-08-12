import React from "react";

const Sidebar = () => {
  return (
    <div
      className="flex fixed left-0 bottom-0 w-[30px] px-6  lg:w-full md:w-full sm:w-full
    lg:static md:static sm:static lg:items-center md:items-center sm:items-center 
    lg:bg-mc-blue lg:py-10  md:bg-mc-blue md:py-10  sm:bg-mc-blue sm:py-10"
    >
      <div
        className="flex flex-col items-center w-[1%]
       lg:flex-row md:flex-row sm:flex-row lg:gap-2 md:gap-2 sm:gap-2
       lg:w-full md:w-full sm:w-full lg:items-center md:items-center sm:items-center"
      >
        <div className="w-[4px] h-32 bg-quinary-300 my-10 lg:hidden md:hidden sm:hidden"></div>
        <div className="flex flex-col gap-5 lg:flex-row md:flex-row sm:flex-row lg:w-full md:w-full sm:w-full lg:items-center md:items-center sm:items-center lg:justify-center md:justify-center sm:justify-center lg:bg-none">
          <a href="https://github.com/mcc1461/">
            <i className="ri-github-fill text-quinary-300 text-2xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/mcoskuncelebi">
            <i className="ri-linkedin-fill text-quinary-300  text-2xl"></i>
          </a>
          <a href="https://medium.com/@mcc1461a">
            <i className="ri-medium-fill text-quinary-300 text-2xl"></i>
          </a>
        </div>
        <div className="w-[4px] h-32 bg-quinary-300 my-10 lg:hidden md:hidden sm:hidden"></div>
      </div>
    </div>
  );
};

export default Sidebar;
