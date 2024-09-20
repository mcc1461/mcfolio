import React from "react";

const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center bg-mc-blue pl-7 pt-9">
      <h3 className="text-3xl font-semibold text-secondary-300 whitespace-nowrap">
        {title}
      </h3>

      <div className="flex-1 ml-4 mr-7">
        <hr className="w-full border-0 border-t-4 border-dotted border-secondary-300" />
      </div>
    </div>
  );
};

export default SectionTitle;
