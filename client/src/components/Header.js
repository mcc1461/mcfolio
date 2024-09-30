import React from "react";
import VisitorCounter from "./VisitorCounter"; // Adjust the path if necessary

const Header = () => {
  return (
    <div className="relative p-3 h-[7vh] bg-mc-blue-darker1 flex justify-center items-center border-b-2 border-lime-300 z-50">
      <h1 className="p-3 text-2xl font-bold leading-tight text-center gradient-text sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
        MusCo Portfolio
      </h1>
      <VisitorCounter />
    </div>
  );
};

export default Header;
