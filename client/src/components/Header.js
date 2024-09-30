import React from "react";
import VisitorCounter from "./VisitorCounter"; // Adjust the path if necessary

const Header = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full p-3 border-b-2 bg-mc-blue-darker1 border-lime-300">
      <h1 className="p-3 text-lg font-bold leading-tight text-center gradient-text sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
        MusCo Portfolio
      </h1>
      <VisitorCounter />
    </div>
  );
};

export default Header;
