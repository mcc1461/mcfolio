import React, { useState, useEffect } from "react";

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility of the component

  useEffect(() => {
    // Check if the visitor counter was closed during this session
    const isClosed = sessionStorage.getItem("visitorCounterClosed");

    if (isClosed) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    const getUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error("Error fetching IP address:", error);
        return null;
      }
    };

    const updateVisitorCount = async () => {
      const userIP = await getUserIP();

      // Get today's date in 'YYYY-MM-DD' format
      const today = new Date().toISOString().slice(0, 10);

      // Retrieve the last counted date from localStorage
      const lastCountedDate = localStorage.getItem("lastCountedDate");

      if (userIP) {
        if (lastCountedDate !== today) {
          // If the last counted date is not today, increment the count
          try {
            // Get the token from local storage (if needed)
            const token = localStorage.getItem("authToken");

            const response = await fetch(
              "https://musco.dev/api/visitor-count",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token ? `Bearer ${token}` : "", // Include the token if available
                },
                body: JSON.stringify({ ip: userIP }),
              }
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setVisitorCount(data.count);

            // Update the last counted date to today
            localStorage.setItem("lastCountedDate", today);
          } catch (error) {
            console.error("Error updating visitor count:", error);
            setVisitorCount("Error");
          } finally {
            setLoading(false);
          }
        } else {
          // If already counted today, simply fetch the current count without incrementing
          try {
            const response = await fetch(
              "https://musco.dev/api/visitor-count",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setVisitorCount(data.count);
          } catch (error) {
            console.error("Error fetching visitor count:", error);
            setVisitorCount("Error");
          } finally {
            setLoading(false);
          }
        }
      } else {
        console.error("User IP not available.");
        setVisitorCount("Error");
        setLoading(false);
      }
    };

    updateVisitorCount();
  }, []);

  // Function to close the VisitorCounter and store the state in sessionStorage
  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("visitorCounterClosed", "true");
  };

  // If loading or if the component is set to not visible, return null
  if (
    loading ||
    !isVisible ||
    visitorCount === null ||
    visitorCount === "Error"
  ) {
    return null;
  }

  return (
    <div className="fixed z-50 flex items-center px-6 py-3 text-sm text-white transition transform rounded-full shadow-lg bg-gradient-to-r from-purple-700 via-fuchsia-700 to-indigo-700 top-32 right-5 sm:text-base hover:scale-105 hover:shadow-xl opacity-90 sm:top-24 md:top-24">
      {/* The opacity-90 class makes the visitor counter slightly transparent */}
      <div className="flex items-center">
        <div className="mr-3 text-lg font-semibold text-white sm:text-base md:text-lg">
          Visitors: {visitorCount}
        </div>
        {/* Close Button using Tailwind CSS */}
        <button
          className="flex items-center justify-center w-5 h-5 ml-4 text-xl text-white transition duration-150 ease-in-out border-2 border-white rounded-full hover:text-gray-200"
          onClick={handleClose}
          aria-label="Close Visitor Counter"
        >
          &times; {/* This is the 'X' symbol for the close button */}
        </button>
      </div>
    </div>
  );
};

export default VisitorCounter;
