import React from "react";

const Footer = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.getFullYear(); // Format the date as needed

  return (
    <div className="text-center h-[7vh] border-t-2 bg-mc-blue-darker1 border-white py-3">
      <p className="italic text-gray-400 text-md">Designed and developed by</p>
      <p className="text-lg text-gray-400">
        <p>
          <span className="text-quinary-100">Mus</span>
          <span>tafa</span> <span>{}</span>
          <span className="text-quinary-100">Co</span>
          <span>skuncelebi</span> <span>{}</span>{" "}
          <span className="text-quinary-100">©</span>{" "}
          <span>{formattedDate}</span>
        </p>
      </p>
    </div>
  );
};

export default Footer;
