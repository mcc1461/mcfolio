import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "antd";
import photo from "../../assets/photo.jpg";

const Intro = () => {
  // Set a default image in case of an error
  const [imgSrc, setImgSrc] = useState(
    "https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/photo.jpg?alt=media&token=bf7055f0-a54d-4302-ae4c-ddf672167b4e"
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    cvLink, // Remove default value here
  } = intro;

  // Provide a default CV link if cvLink is missing or empty
  const defaultCvLink =
    "https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/CV_Mustafa_COSKUNCELEBI%20v.10.1.pdf?alt=media&token=71b4e1da-9033-45ef-9539-f36701162050";
  const finalCvLink = cvLink || defaultCvLink;

  // Handle image loading errors by falling back to a local image
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
    window.open(finalCvLink, "_blank");
    setIsModalVisible(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = finalCvLink;
    link.download = "MusCo_CV.pdf"; // You can set a default name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsModalVisible(false);
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
        {/* Buttons container */}
        <div className="flex flex-wrap gap-4 mt-4">
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
      {/* Display the user's photo */}
      <div className="photo w-[40vw] flex items-center justify-center md:w-full sm:w-full">
        <img
          src={imgSrc}
          alt="Mustafa COSKUNCELEBI"
          onError={handleImageError}
          className="h-[40vh] md:h-[25vh] sm:h-[25vh] rounded-full -mx-5"
        />
      </div>

      {/* Modal for CV options */}
      <Modal
        title="CV Options"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex justify-center gap-4">
          <Button onClick={handleView} type="primary">
            View CV
          </Button>
          <Button onClick={handleDownload}>Download CV</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Intro;
