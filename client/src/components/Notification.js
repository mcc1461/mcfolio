import React from "react";

const Notification = () => {
  return (
    <div
      className="fixed left-0 right-0 z-50 p-4 text-center text-white bg-blue-600"
      style={{ top: `${headerHeight}px` }} // Dynamically position below the header
    >
      {isAdminLoggedIn ? (
        <p className="font-bold">
          You are still logged in as Admin! Please{" "}
          <span
            onClick={handleLogout}
            className="underline cursor-pointer hover:text-gray-300"
          >
            log out
          </span>{" "}
          for security reasons.
        </p>
      ) : (
        <p className="font-bold">Welcome to the Website!</p>
      )}
    </div>
  );
};

export default Notification;
