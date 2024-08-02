import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center gap-4 ml-2 bg-mc-blue pl-7">
      <h1 className="text-2xl font-semibold text-quaternary-100">{title}</h1>
      <hr className="flex w-[30vw] h-[3px] bg-quaternary-100"></hr>
    </div>
  );
};

export default SectionTitle;
