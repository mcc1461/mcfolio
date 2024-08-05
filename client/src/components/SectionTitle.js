import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center bg-mc-blue pl-7">
      <h1 className="text-3xl font-semibold text-quaternary-100 whitespace-nowrap">
        {title}
      </h1>
      <div className="flex-1 ml-4 mr-7">
        <hr className="w-full border-0 border-t-4 border-dotted border-quaternary-100" />
      </div>
    </div>
  );
};

export default SectionTitle;
