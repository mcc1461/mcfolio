import React from "react";
import VisitorCounter from "./VisitorCounter"; // Adjust the path if necessary
import Logo from "../../public/assets/Musco777.gif"; // Adjust the path if necessary

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-3 bg-mc-blue-darker1 flex justify-center items-center border-b-2 border-lime-300 h-[7vh] sm:h-[5vh] md:h-[6vh] lg:h-[7vh]">
      {/* Add the logo to the left */}
      <div className="flex items-center mr-4">
        <img
          src={Logo}
          alt="MusCo Logo"
          className="w-10 h-10 rounded-lg sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
        />
      </div>

      <h1 className="p-3 text-xl font-bold gradient-text sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl whitespace-nowrap">
        MusCo Portfolio
      </h1>

      <VisitorCounter />
    </div>
  );
};

export default Header;
