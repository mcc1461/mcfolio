import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";

const Contact = () => {
  const user = {
    name: "Mustafa COSKUNCELEBI",
    expertise: "Full Stack Web Developer",
    email: "mcc1461a@gmail.com",
    address: "Ankara, Turkey",
  };

  const [entered, setEntered] = useState(false);

  return (
    <>
      <SectionTitle title="Contact" />
      <div
        className="flex flex-col items-center justify-center h-full bg-mc-blue"
        onMouseEnter={() => setEntered(true)}
        onMouseLeave={() => setEntered(false)}
      >
        <div
          className={`flex flex-col items-center justify-center p-4 m-4 rounded-lg shadow-lg gap-7 ${
            entered
              ? "bg-mc-blue-darker3 text-quaternary-300 border-quaternary-200"
              : "bg-mc-blue-darker1 text-mc-white border-[#258d54]"
          } border-l-4 pl-2 `}
        >
          <a
            href="https://www.linkedin.com/in/mcoskuncelebi/"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center text-2xl font-semibold ${
              entered
                ? "text-quaternary-300 underline cursor-pointer"
                : "text-mc-white"
            }`}
          >
            {user.name}
            {entered && (
              <span className="px-2">
                <button className="px-1 text-lg font-semibold rounded-lg cursor-pointer outline outline-4 outline-secondary-300 text-mc-orange">
                  LinkedIn
                </button>
              </span>
            )}
          </a>
          <div className="w-full">
            <p className="mb-3 text-2xl font-bold text-quaternary-200">
              Email: {user.email}
            </p>
            <p className="mb-3 text-2xl font-bold text-quaternary-200">
              Expertise: {user.expertise}
            </p>
            <p className="mb-3 text-2xl font-bold text-quaternary-200">
              Address: {user.address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
