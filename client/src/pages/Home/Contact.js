import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
import contactVideo from "../../assets/MusCo_WebDev.mp4";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const AlertMessage = ({ type, message, onClose }) => {
  const bgColor =
    type === "success"
      ? "bg-green-700 border-green-700 text-white"
      : "bg-red-700 border-red-700 text-white";

  useEffect(() => {
    if (type === "success") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <div className="fixed z-50 top-4 right-4">
      <div className={`border-l-4 p-4 ${bgColor} rounded shadow`} role="alert">
        <div className="flex items-center justify-between">
          <p className="font-bold">
            {type === "success" ? "Success" : "Error"}
          </p>
          <button onClick={onClose} className="ml-4 text-xl font-bold">
            &times;
          </button>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

const Contact = () => {
  const [entered, setEntered] = useState(false); // Tracks hover state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailData, setEmailData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [alert, setAlert] = useState(null);

  const videoRef = useRef(null);
  const formRef = useRef(null);
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    emailjs.init(publicKey);
  }, [publicKey]);

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
          videoRef.current
            .play()
            .catch((error) => console.error("Play error:", error));
        } else if (
          !entry.isIntersecting &&
          videoRef.current &&
          isVideoPlaying(videoRef.current)
        ) {
          videoRef.current.pause();
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

  const showModal = () => setIsModalVisible(true);

  const handleCancel = () => setIsModalVisible(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailData.user_name || !emailData.user_email || !emailData.message) {
      setAlert({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      await emailjs.sendForm(
        "service_5l5jxcc", // Ensure this is the correct service ID
        "template_7bu07o5", // Ensure this is the correct template ID
        formRef.current
      );

      const templateParams = {
        user_email: emailData.user_email,
        reply_to: "info@musco.dev", // Your email to send reply from
        user_name: emailData.user_name,
      };

      await emailjs.send("service_5l5jxcc", "template_qqfkusw", templateParams); // Ensure auto-reply template ID is correct

      setAlert({ type: "success", message: "Email sent successfully!" });
      setEmailData({ user_name: "", user_email: "", message: "" });
      setIsModalVisible(false);
    } catch (error) {
      console.log("FAILED...", error);
      setAlert({ type: "error", message: "Failed to send email." });
    }
  };

  const closeAlert = () => setAlert(null);

  // Add touch effect on phones
  const handleTouch = () => {
    setEntered(true);
    setTimeout(() => {
      setEntered(false);
    }, 3000);
  };

  return (
    <>
      {alert && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />
      )}
      <SectionTitle title="Contact" />
      <div className="grid items-center w-full min-h-screen grid-cols-2 gap-4 md:grid-cols-1 sm:grid-cols-1 justify-items-center bg-mc-blue">
        {/* Video Section */}
        <div className="flex justify-center w-full lg:justify-items-center lg:justify-end">
          <video
            ref={videoRef}
            className="w-full lg:h-[40vh] h-[40vh] lg:rounded-lg rounded-none min-w-[350px] max-w-[500px]  justify-self-end"
            controls={false}
            muted
            playsInline
            onMouseEnter={() => videoRef.current.play()}
            onMouseLeave={() => videoRef.current.pause()}
            onTouchStart={handleTouch} // Handle touch to simulate hover
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/musco-portfolio.appspot.com/o/MusCo_WebDev.mp4?alt=media&token=fdfdbce7-3449-44a1-819c-8f8c03bd6a30"
              type="video/mp4"
            />
            <source src={contactVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Section */}
        <div className="w-full lg:max-w-[600px] px-4 flex flex-col items-center lg:justify-items-center lg:justify-start">
          <div
            className={`flex flex-col items-center lg:items-start justify-center p-4 rounded-lg shadow-lg gap-3 ${
              entered
                ? "bg-mc-blue-darker3 text-quaternary-300 border-quaternary-200"
                : "bg-mc-blue-darker1 text-mc-white border-[#258d54]"
            } border-l-4 pl-2 justify-self-start`}
            onMouseEnter={() => setEntered(true)}
            onMouseLeave={() => setEntered(false)}
            onTouchStart={handleTouch} // Handle touch to simulate hover
          >
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={`flex items-center text-2xl sm:text-xl md:text-2xl font-bold ${
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
            <div className="w-full mt-2 text-lg font-bold md:text-xl sm:text-lg text-quaternary-200">
              <p className="mb-2">Expertise: {user.expertise}</p>
              <p className="mb-2">Email: {user.email}</p>
              <p className="mb-2">Location: {user.location}</p>
              <button
                className="px-4 py-2 mt-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={showModal}
              >
                Write to Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Send an Email</h2>
            <form ref={formRef} onSubmit={handleSendEmail}>
              <input type="hidden" name="contact_number" value="697483" />
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  name="user_name"
                  value={emailData.user_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  name="user_email"
                  value={emailData.user_email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  name="message"
                  rows={4}
                  value={emailData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 mr-4 text-gray-700 bg-gray-300 rounded-lg"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
