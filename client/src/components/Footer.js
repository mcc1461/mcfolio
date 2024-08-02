import React from "react";

const Footer = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.getFullYear(); // Format the date as needed

  return (
    <div className="text-center h-[7vh] border-t-2 bg-mc-blue-darker1 border-white ">
      <p className="text-lg text-gray-400">
        © <span>{formattedDate}</span> MC Portfolio
      </p>
    </div>
  );
};

export default Footer;
