import React, { useState } from "react";
import { useSelector } from "react-redux";
import photo from "../../assets/photo.jpg";

const Intro = () => {
  const [imgSrc, setImgSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/photo.jpg?alt=media&token=bf7055f0-a54d-4302-ae4c-ddf672167b4e"
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { portfolioData } = useSelector((state) => state.root);

  const intro = portfolioData?.intros?.length ? portfolioData?.intros[0] : {};

  const {
    welcomeText = "",
    firstName = "",
    lastName = "",
    description = "",
    details = "",
    cvLinkPdf = "",
    cvLinkDocx = "",
  } = intro;

  const handleImageError = () => {
    setImgSrc(photo);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleView = () => {
    window.open(cvLinkPdf, "_blank");
    setIsModalVisible(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvLinkDocx;
    link.download = "MusCo_CV.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsModalVisible(false);
  };

  return (
    <div className="homepage pt-[7vh] min-h-[100vh] bg-mc-blue pl-7 flex items-center justify-center md:flex-col-reverse sm:flex-col-reverse">
      {/* Ensure adequate padding from the header */}
      <div className="gap-7 py-7 w-[60vw] md:w-[90vw] sm:w-[90vw] md:text-center sm:text-center">
        {/* Display the welcome text */}
        <h1 className="p-3 text-4xl font-semibold sm:text-xl md:text-2xl lg:text-3xl text-quinary-100">
          {welcomeText}
        </h1>

        <h1 className="p-3 text-2xl font-bold gradient-text bg-clip-text sm:text-xl md:text-2xl lg:text-2xl">
          {firstName} {lastName}
        </h1>

        {/* Display the description */}
        <h1 className="w-4/5 p-3 text-3xl italic font-bold text-justify sm:text-lg md:text-xl lg:text-2xl md:text-center sm:text-center md:w-[90vw] sm:w-[90vw] text-quinary-100">
          {description}
        </h1>
        {/* Display the details */}
        {/* <h1 className="w-4/5 p-3 font-bold text-justify text-ms lg:text-lg xl:text-xl 2xl:text-2xl md:hidden sm:hidden xs:hidden text-quinary-100">
          {details}
        </h1> */}
        <h1 className="hidden w-4/5 p-3 text-sm font-bold text-justify lg:text-lg xl:text-xl 2xl:text-2xl lg:block xl:block 2xl:block text-quinary-100">
          {details}
        </h1>

        {/* Buttons container */}
        <div className="flex flex-wrap justify-end w-4/5 gap-4 mt-4 sm:w-full md:w-full md:justify-center sm:justify-center">
          {/* Button to navigate to the Projects section */}
          <a href="#Projects">
            <button className="px-5 py-1 text-xl font-bold tracking-wider transition-colors duration-300 border-2 rounded border-quinary-300 text-quinary-300 hover:bg-quinary-300 hover:text-mc-blue">
              Projects
            </button>
          </a>
          {/* Button for CV */}
          <button
            onClick={showModal}
            className="px-5 py-1 text-xl font-bold tracking-wider transition-colors duration-300 border-2 rounded border-quinary-300 text-quinary-300 hover:bg-quinary-300 hover:text-mc-blue"
          >
            CV
          </button>
        </div>
      </div>

      {/* Adjusted photo position and animation */}
      <div className="photo w-[30vw] md:w-[50vw] sm:w-[50vw] flex items-center justify-center">
        <img
          src={imgSrc}
          alt="Mustafa COSKUNCELEBI"
          onError={handleImageError}
          className="h-[35vh] md:h-[25vh] sm:h-[25vh] rounded-full transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:outline outline-4 outline-blue-400 animate-floating"
        />
      </div>

      {/* Modal for CV options */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">CV Options</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleView}
                className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                View PDF
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 font-semibold text-white rounded-lg bg-violet-500 hover:bg-violet-700"
              >
                Download DOCX
              </button>
            </div>
            <button
              onClick={handleCancel}
              className="mt-4 text-sm font-semibold text-red-500 hover:text-red-700"
            >
              Close &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intro;
