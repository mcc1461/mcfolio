import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center h-scree bg-mc-blue-darker1">
      <div className="flex gap-4 text-4xl font-extrabold">
        <h1 className="text-primary-200 xx-m">M</h1>
        <h1 className="text-secondary-200 xx-u">u</h1>
        <h1 className="text-tertiary-200 xx-s">s</h1>
        <h1 className="text-quaternary-200 xx-c">C</h1>
        <h1 className="text-senary-200 xx-o">o</h1>
      </div>
    </div>
  );
};

export default Loader;
