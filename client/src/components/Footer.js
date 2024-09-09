import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.getFullYear();

  return (
    <div className="h-auto py-3 text-center border-t-2 border-white bg-mc-blue-darker1">
      <p className="italic text-gray-400 text-md">Designed and developed by</p>
      <div className="text-lg text-gray-400">
        <p>
          <span className="font-bold text-quinary-100">Mus</span>
          <span>tafa</span> <span>{}</span>
          <span className="font-bold text-quinary-100">Co</span>
          <span>skuncelebi</span> <span>{}</span>{" "}
          <span className="text-quinary-100">©</span>{" "}
          <span>{formattedDate}</span>
        </p>
      </div>
      <div className="flex items-center justify-center mt-4 space-x-4">
        {/* Admin Login Link */}
        <Link
          to="/login"
          className="px-3 py-1 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-600"
        >
          Admin Login
        </Link>

        {/* Separator */}
        <span className="text-3xl font-extrabold text-white">||</span>

        {/* Admin Register Link */}
        <Link
          to="/register"
          className="px-3 py-1 text-white transition duration-300 bg-green-500 rounded-full hover:bg-green-600"
        >
          Admin Register
        </Link>
      </div>

      {/* Empty Space Below */}
      <div className="mt-8"></div>
    </div>
  );
};

export default Footer;
