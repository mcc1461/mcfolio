import React, { useState } from "react";
import { useSelector } from "react-redux";
import photo from "../../assets/photo.jpg";

const Intro = () => {
  // Set a default image in case of an error
  const [imgSrc, setImgSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/photo.jpg?alt=media&token=bf7055f0-a54d-4302-ae4c-ddf672167b4e"
  );

  // Retrieve portfolioData from the Redux store
  const { portfolioData } = useSelector((state) => state.root);

  // Safely access the intro array and check if it has any data
  const intro = portfolioData?.intros?.length ? portfolioData?.intros[0] : {};

  // Destructure values with default empty strings
  const {
    welcomeText = "",
    firstName = "",
    lastName = "",
    description = "",
    details = "",
  } = intro;

  // Handle image loading errors by falling back to a local image
  const handleImageError = () => {
    setImgSrc(photo);
  };

  return (
    <div className="homepage h-[93vh] bg-mc-blue pl-7 flex items-center justify-center md:flex-col-reverse sm:flex-col-reverse">
      <div className="gap-7 py-7 w-[70vw] md:w-[90vw] sm:w-[90vw] md:text-center sm:text-center">
        {/* Display the welcome text */}
        <h1 className="p-3 text-4xl font-semibold sm:text-xl md:text-2xl lg:text-3xl text-quinary-100">
          {welcomeText}
        </h1>
        {/* Display the user's name */}
        <h1 className="p-3 text-4xl font-bold sm:text-xl md:text-2xl lg:text-3xl text-quaternary-100 md:text-wrap sm:text-wrap">
          {firstName} {lastName}
        </h1>
        {/* Display the description */}
        <h1 className="w-2/3 p-3 text-3xl italic font-bold text-justify sm:text-lg md:text-xl lg:text-2xl md:text-center sm:text-center md:w-[90vw] sm:w-[90vw] text-quinary-100">
          {description}
        </h1>
        {/* Display the details */}
        <h1 className="hidden w-2/3 p-3 font-bold text-justify text-ms lg:text-lg xl:text-xl xl2:text-2xl xl2:block xl:block lg:block text-quinary-100">
          {details}
        </h1>
        {/* Button to navigate to the Projects section */}
        <a href="#Projects">
          <button className="px-5 py-1 mx-3 text-xl font-bold tracking-wider border-2 rounded border-quinary-300 text-quinary-300">
            Projects
          </button>
        </a>
      </div>
      {/* Display the user's photo */}
      <div className="photo w-[40vw] flex items-center justify-center md:w-full sm:w-full">
        <img
          src={imgSrc}
          alt="Mustafa COSKUNCELEBI"
          onError={handleImageError}
          className="h-[40vh] md:h-[25vh] sm:h-[25vh] rounded-full -mx-5"
        />
      </div>
    </div>
  );
};

export default Intro;
