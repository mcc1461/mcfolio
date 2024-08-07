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

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, []);

  return (
    <>
      <SectionTitle title="Contact" />
      <div className="flex flex-col items-center justify-center h-full gap-7 lg:flex-row lg:gap-2 xl:flex-row xl2:flex-row xl:gap-2 xl2:gap-1 py-9 bg-mc-blue">
        <div className="flex items-center justify-center w-full outline-dotted outline-yellow-300 lg:w-1/2 xl:w-1/2 xl2:w-1/2 lg:justify-end xl:justify-end xl2:justify-end">
          <video
            ref={videoRef}
            src={contactVideo}
            alt="Contact Video"
            className="h-[40vh] lg:h-[30vh] md:h-[26vh] sm:h-[20vh] rounded"
            controls={false}
            autoPlay={true}
            muted
          />
        </div>
        <div
          className="flex flex-col items-center justify-center w-full h-full px-5 bg-mc-blue lg:w-1/2 xl:w-1/2 xl2:w-1/2 lg:items-start xl:items-start xl2:items-start"
          onMouseEnter={() => setEntered(true)}
          onMouseLeave={() => setEntered(false)}
        >
          <div
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-lg gap-4 ${
              entered
                ? "bg-mc-blue-darker3 text-quaternary-300 border-quaternary-200"
                : "bg-mc-blue-darker1 text-mc-white border-[#258d54]"
            } border-l-4 pl-2`}
          >
            <a
              href="https://www.linkedin.com/in/mcoskuncelebi/"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center text-lg md:text-xl lg:text-2xl font-semibold ${
                entered
                  ? "text-quaternary-300 underline cursor-pointer"
                  : "text-mc-white"
              }`}
            >
              {user.name}
              {entered && (
                <span className="px-2">
                  <button className="px-1 text-base font-semibold rounded-lg cursor-pointer md:text-lg lg:text-xl outline outline-4 outline-secondary-300 text-mc-orange">
                    LinkedIn
                  </button>
                </span>
              )}
            </a>
            <div className="w-full">
              <p className="mb-3 text-base font-bold md:text-lg lg:text-xl text-quaternary-200">
                Email: {user.email}
              </p>
              <p className="mb-3 text-base font-bold md:text-lg lg:text-xl text-quaternary-200">
                Expertise: {user.expertise}
              </p>
              <p className="mb-3 text-base font-bold md:text-lg lg:text-xl text-quaternary-200">
                Address: {user.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
