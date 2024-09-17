import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
import contactVideo from "../../assets/MusCo_WebDev.mp4";
import { useSelector } from "react-redux";
import { Modal, Button, Input, message } from "antd";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [entered, setEntered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailData, setEmailData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const videoRef = useRef(null);
  const formRef = useRef(null); // Ref for the form
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY; // Replace with your EmailJS public key

  // Initialize EmailJS (use your actual public key)
  useEffect(() => {
    emailjs.init(publicKey);
  }, [publicKey]);

  // Add utility function to check if video is playing
  const isVideoPlaying = (video) => {
    return !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    );
  };

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          videoRef.current &&
          !isVideoPlaying(videoRef.current)
        ) {
          videoRef.current.play().catch((error) => {
            console.error("Play error:", error);
          });
        } else if (
          !entry.isIntersecting &&
          videoRef.current &&
          isVideoPlaying(videoRef.current)
        ) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
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

  const { portfolioData } = useSelector((state) => state.root);

  const user = portfolioData?.contacts?.[0] || {
    name: "Unavailable",
    linkedinUrl: "#",
    expertise: "Information not available",
    email: "No email provided",
    location: "Location not available",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handling the form submission using emailjs.sendForm()
  const handleSendEmail = (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!emailData.user_name || !emailData.user_email || !emailData.message) {
      message.error("Please fill in all fields.");
      return;
    }

    emailjs
      .sendForm(
        "service_ldfrkag", // Replace with your EmailJS service ID
        "template_n19oxg6", // Replace with your EmailJS template ID
        formRef.current // Reference to the form
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          message.success("Email sent successfully!");
          setIsModalVisible(false);
          setEmailData({ user_name: "", user_email: "", message: "" }); // Reset form data
        },
        (error) => {
          console.log("FAILED...", error);
          message.error("Failed to send email.");
        }
      );
  };

  return (
    <>
      <SectionTitle title="Contact" />
      <div className="flex flex-col items-center justify-center h-full gap-7 lg:flex-row lg:gap-4 xl:flex-row xl2:flex-row xl:gap-4 xl2:gap-4 py-9 bg-mc-blue">
        <div className="flex items-center justify-center w-full lg:w-1/2 xl:w-1/2 xl2:w-1/2 lg:justify-end xl:justify-end xl2:justify-end">
          <video
            ref={videoRef}
            className="h-[40vh] lg:h-[30vh] md:h-[26vh] sm:h-[20vh] rounded"
            controls={false}
            autoPlay
            muted
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/MusCo_WebDev.mp4?alt=media&token=fdfdbce7-3449-44a1-819c-8f8c03bd6a30"
              type="video/mp4"
            />
            <source src={contactVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
              href={user.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={`flex items-center text-lg md:text-xl lg:text-2xl font-semibold ${
                entered
                  ? "text-quaternary-300 underline cursor-pointer"
                  : "text-mc-white"
              }`}
            >
              {user.name}
              <span className="inline-block px-2">
                <button
                  className={`px-1 text-base font-semibold rounded-lg cursor-pointer md:text-lg lg:text-xl transition-opacity duration-300 ${
                    entered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  LinkedIn
                </button>
              </span>
            </a>
            <div className="w-full mt-5">
              <p className="mb-3 text-base font-bold md:text-lg lg:text-xl text-quaternary-200">
                Expertise: {user.expertise}
              </p>
              <p className="mb-3 text-base font-bold md:text-lg lg:text-xl text-quaternary-200">
                Email: {user.email}
              </p>
              <p className="mb-3 text-base font-bold md:text-lg lg:text-xl text-quaternary-200">
                Location: {user.location}
              </p>
              {/* Add Write to Me button */}
              <Button
                type="primary"
                className="mt-4 rounded-lg"
                onClick={showModal}
              >
                Write to Me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Email */}
      <Modal
        title="Send an Email"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Custom footer with form
      >
        {/* Form for EmailJS */}
        <form ref={formRef} onSubmit={handleSendEmail}>
          <input type="hidden" name="contact_number" value="697483" />
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Your Name"
              name="user_name"
              value={emailData.user_name}
              onChange={handleInputChange}
              required
            />
            <Input
              placeholder="Your Email"
              name="user_email"
              value={emailData.user_email}
              onChange={handleInputChange}
              required
            />
            <Input.TextArea
              placeholder="Your Message"
              name="message"
              rows={4}
              value={emailData.message}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit" className="ml-4">
              Send
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Contact;
