import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../../redux/rootSlice";
import axios from "axios";

const AdminContact = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const [formData, setFormData] = useState({
    videoUrl: "",
    name: "",
    linkedinUrl: "",
    expertise: "",
    email: "",
    location: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (portfolioData?.contacts[0]) {
      setFormData(portfolioData.contacts[0]);
    }
  }, [portfolioData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onFinish = async () => {
    try {
      dispatch(showLoader(true));

      const token = localStorage.getItem("authToken");
      if (!token) {
        setAlertMessage("Authentication token is missing.");
        setAlertType("error");
        return;
      }

      const response = await axios.put(
        "/api/contact",
        {
          ...formData,
          _id: portfolioData?.contacts[0]._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAlertMessage(response.data.message);
        setAlertType("success");
      } else {
        setAlertMessage(response.data.message);
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("Request failed: " + error.message);
      setAlertType("error");
    } finally {
      dispatch(showLoader(false));
    }
  };

  if (!portfolioData || !portfolioData?.contacts[0]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white shadow-xl rounded-2xl">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Manage Contact Information
      </h2>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            alertType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alertMessage}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Video URL
          </label>
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-400"
            placeholder="Enter video URL"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-400"
            placeholder="Enter name"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            LinkedIn URL
          </label>
          <input
            type="text"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-400"
            placeholder="Enter LinkedIn URL"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Expertise
          </label>
          <input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-400"
            placeholder="Enter expertise"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-400"
            placeholder="Enter email"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 text-gray-800 placeholder-gray-400"
            placeholder="Enter location"
          />
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={onFinish}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition ease-in-out duration-300 transform hover:scale-105"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminContact;
