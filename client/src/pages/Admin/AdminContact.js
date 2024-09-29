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
      setFormData(portfolioData.contacts[0]); // Populate form with existing data
    }
  }, [portfolioData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      dispatch(showLoader(true));

      const token = localStorage.getItem("authToken");
      if (!token) {
        setAlertMessage("Authentication token is missing.");
        setAlertType("error");
        return;
      }

      const response = await axios.put(
        "http://127.0.0.1:8000/api/contact",
        {
          ...formData,
          _id: portfolioData.contacts[0]._id, // Include the ID for updating
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
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <form
        onSubmit={onFinish}
        className="max-w-4xl p-10 mx-auto space-y-8 rounded-lg shadow-2xl bg-gradient-to-r from-indigo-50 to-blue-50"
      >
        <h2 className="mb-6 text-3xl font-extrabold text-center text-violet-900">
          Manage Contact Section
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="videoUrl"
              className="block mb-2 text-lg font-medium text-violet-700"
            >
              Video URL
            </label>
            <input
              type="text"
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-3 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400"
              placeholder="Enter video URL"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="name"
              className="block mb-2 text-lg font-medium text-violet-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-3 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400"
              placeholder="Enter name"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="linkedinUrl"
              className="block mb-2 text-lg font-medium text-violet-700"
            >
              LinkedIn URL
            </label>
            <input
              type="text"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-3 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400"
              placeholder="Enter LinkedIn URL"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="expertise"
              className="block mb-2 text-lg font-medium text-violet-700"
            >
              Expertise
            </label>
            <input
              type="text"
              id="expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-3 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400"
              placeholder="Enter expertise"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-medium text-violet-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-3 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400"
              placeholder="Enter email"
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="location"
              className="block mb-2 text-lg font-medium text-violet-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full p-3 text-gray-800 placeholder-gray-400 border-2 border-gray-300 rounded-lg shadow-md bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400"
              placeholder="Enter location"
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 text-base font-medium text-white transition duration-300 border border-transparent rounded-md shadow-lg bg-violet-900 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700"
          >
            SAVE
          </button>
        </div>
        <div className="my-1">
          {alertMessage && (
            <div
              className={`p-4 mb-4 text-sm rounded ${
                alertType === "success"
                  ? "bg-green-200 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {alertMessage}
              <button
                onClick={() => setAlertMessage("")}
                className="float-right text-lg font-bold"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminContact;
