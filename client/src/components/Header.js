// Header.js
import React from "react";
import VisitorCounter from "./VisitorCounter"; // Adjust the path if necessary

const Header = () => {
  return (
    <div className="relative p-3 h-[7vh] bg-mc-blue-darker1 flex justify-center items-center border-b-2 border-lime-300 z-50">
      <h1 className="h-full p-3 mt-2 text-xl font-bold gradient-text sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        MusCo Portfolio
      </h1>
      <VisitorCounter />
    </div>
  );
};

export default Header;
