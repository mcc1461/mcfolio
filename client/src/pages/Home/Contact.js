import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
// import contactMe from "../../assets/MusCo_qr1.png";
import contactVideo from "../../assets/MusCo_WebDev.mp4";

const Contact = () => {
  const user = {
    name: "Mustafa COSKUNCELEBI",
    expertise: "Full Stack Web Developer",
    email: "musco.dev777@gmail.com",
    address: "Ankara, Turkey",
  };

  const [entered, setEntered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play();
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Adjust this value as needed
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <>
      <SectionTitle title="Contact" />
      {/* <div className="flex items-center justify-center h-full bg-mc-blue">
        <img src={contactMe} alt="Contact QR" className="h-[40vh] rounded" />
      </div> */}
      <div className="flex items-center justify-center h-full py-9 bg-mc-blue">
        <video
          ref={videoRef}
          src={contactVideo}
          alt="Contact Video"
          className="h-[40vh] rounded"
          controls={false}
          autoPlay={false}
        />
      </div>
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
