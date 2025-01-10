import React, { useState, useEffect, useRef } from "react";
import SectionTitle from "../../components/SectionTitle";
import contactVideo from "../../assets/MusCo_WebDev.mp4";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import AlertMessage from "../../components/AlertMessage"; // Import the AlertMessage component

const Contact = () => {
  const [entered, setEntered] = useState(false); // Tracks hover state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailData, setEmailData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [alert, setAlert] = useState(null);
  const [isMobile, setIsMobile] = useState(false); // Detect mobile device
  const [clickCount, setClickCount] = useState(0); // Track click count for mobile

  const videoRef = useRef(null);
  const formRef = useRef(null);
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Initialize EmailJS with your Public Key (if required).
  useEffect(() => {
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, [publicKey]);

  // Detect if the user is on a mobile device
  useEffect(() => {
    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  // Check if video is already playing
  const isVideoPlaying = (video) => {
    return !!(
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > 2
    );
  };

  // Use Intersection Observer to play/pause video based on visibility
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

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // Retrieve contact data from Redux (optional if your code uses it)
  const { portfolioData } = useSelector((state) => state.root);
  const user = portfolioData?.contacts?.[0] || {
    name: "Unavailable",
    linkedinUrl: "#",
    expertise: "Information not available",
    email: "No email provided",
    location: "Location not available",
  };

  // Show/hide modal
  const showModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalVisible(true);
  };
  const handleCancel = () => setIsModalVisible(false);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => ({ ...prev, [name]: value }));
  };

  // Send the form email to yourself (no auto-reply to the sender)
  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!emailData.user_name || !emailData.user_email || !emailData.message) {
      setAlert({ type: "error", message: "Please fill in all fields." });
      return;
    }

    try {
      await emailjs.sendForm(
        "service_musco777", // Your EmailJS service ID
        "template_n19oxg6", // Your EmailJS template ID
        formRef.current,
        publicKey // Your public key (user ID) if needed
      );

      setAlert({ type: "success", message: "Email sent successfully!" });
      setEmailData({ user_name: "", user_email: "", message: "" });
      setIsModalVisible(false);
    } catch (error) {
      console.log("FAILED...", error);
      setAlert({ type: "error", message: "Failed to send email." });
    }
  };

  // Close alert
  const closeAlert = () => setAlert(null);

  // Double-click handler for mobile
  const handleClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      setClickCount(clickCount + 1);

      // Only open the modal if clicked twice
      if (clickCount === 1) {
        showModal(e);
        setClickCount(0);
      }

      // Reset click count after 300ms to register it as a single click
      setTimeout(() => setClickCount(0), 300);
    } else {
      // For desktops, open on first click
      showModal(e);
    }
  };

  // Simulate hover on touch
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
      <div className="grid w-full grid-cols-2 py-10 gap-7 bg-mc-blue md:grid-cols-1 sm:grid-cols-1 justify-items-center">
        {/* Video Section */}
        <div className="flex justify-end w-full sm:justify-center md:justify-center">
          <video
            ref={videoRef}
            className="w-[75%] max-w-[500px] min-w-[250px] rounded-lg"
            controls={false}
            muted
            playsInline
            onMouseEnter={() => videoRef.current.play()}
            onMouseLeave={() => videoRef.current.pause()}
            onTouchStart={handleTouch}
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
        <div className="flex justify-start w-full px-4 lg:max-w-[600px] md:justify-center sm:justify-center">
          <div
            className={`w-fit max-w-[70%] flex flex-col items-start py-4 px-10 rounded-lg shadow-lg gap-3 border-l-4 pl-2 ${
              entered
                ? "bg-mc-blue-darker3 text-quaternary-300 border-quaternary-200"
                : "bg-mc-blue-darker1 text-mc-white border-[#258d54]"
            }`}
            onMouseEnter={() => setEntered(true)}
            onMouseLeave={() => setEntered(false)}
            onTouchStart={handleTouch}
          >
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={`flex items-center text-2xl sm:text-xl md:text-2xl font-bold ${
                entered
                  ? "underline cursor-pointer text-quaternary-300"
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
            <div className="mt-2 text-xl font-bold md:text-xl sm:text-lg text-quaternary-200">
              <p className="mb-2">Expertise: {user.expertise}</p>
              <p className="mb-2">Email: {user.email}</p>
              <p className="mb-2">Location: {user.location}</p>
              <button
                className="px-4 py-2 mt-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleClick}
              >
                Write to Me
              </button>
              {isMobile && (
                <p className="mt-2 text-sm text-gray-400">
                  Click 3 times to send a message
                </p>
              )}
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
