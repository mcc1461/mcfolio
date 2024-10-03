import React, { useEffect } from "react";

const AlertMessage = ({ type, message, onClose }) => {
  const bgColor = type === "success" ? "bg-green-700" : "bg-red-700";
  const borderColor =
    type === "success" ? "border-green-500" : "border-red-500";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onClose]);

  return (
    <div className="fixed z-50 top-4 right-4 w-80">
      <div
        className={`relative p-4 rounded shadow-lg text-white ${bgColor} ${borderColor} border-b-4`}
      >
        <div className="flex items-center justify-between">
          <p className="font-bold">
            {type === "success" ? "Success" : "Error"}
          </p>
          <button onClick={onClose} className="ml-4 text-xl font-bold">
            &times;
          </button>
        </div>
        <p>{message}</p>

        {/* Animated shrinking bottom bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-white animate-shrink" />
      </div>
    </div>
  );
};

export default AlertMessage;
