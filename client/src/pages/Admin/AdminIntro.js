import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { showLoader } from "../../redux/rootSlice";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [formData, setFormData] = useState({
    welcomeText: "",
    firstName: "",
    lastName: "",
    caption: "",
    description: "",
    details: "",
    cvLink: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (portfolioData?.intros?.[0]) {
      setFormData(portfolioData.intros[0]); // Populate the form with intro data
    }
  }, [portfolioData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFinish = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      dispatch(showLoader(true));

      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        setAlertMessage("Authentication token is missing.");
        setAlertType("error");
        return;
      }

      const response = await axios.put(
        "http://localhost:8001/api/intro",
        {
          ...formData,
          _id: portfolioData.intros[0]._id, // Ensure to send the ID of the intro
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );

      dispatch(showLoader(false));

      if (response.data.success) {
        setAlertMessage("Intro updated successfully.");
        setAlertType("success");
      } else {
        setAlertMessage(response.data.message || "Failed to update intro.");
        setAlertType("error");
      }
    } catch (error) {
      dispatch(showLoader(false));
      setAlertMessage(`Request failed: ${error.message}`);
      setAlertType("error");
    }
  };

  if (!portfolioData || !portfolioData.intros?.[0]) {
    return <div>Loading...</div>; // Show loading state if data is not available
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <form
        onSubmit={onFinish}
        className="max-w-4xl p-10 mx-auto space-y-8 rounded-lg shadow-2xl bg-gradient-to-r from-purple-50 to-indigo-50"
      >
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

        <h2 className="mb-6 text-3xl font-extrabold text-center text-purple-600">
          Update Intro Section
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <label
              htmlFor="welcomeText"
              className="block text-sm font-medium text-gray-700"
            >
              Welcome Text
            </label>
            <input
              type="text"
              name="welcomeText"
              id="welcomeText"
              value={formData.welcomeText}
              onChange={handleInputChange}
              className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
              placeholder="Enter Welcome Text"
            />
          </div>

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
              placeholder="Enter Last Name"
            />
          </div>

          <div>
            <label
              htmlFor="caption"
              className="block text-sm font-medium text-gray-700"
            >
              Caption
            </label>
            <input
              type="text"
              name="caption"
              id="caption"
              value={formData.caption}
              onChange={handleInputChange}
              className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
              placeholder="Enter Caption"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
            placeholder="Enter Description"
          />
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-sm font-medium text-gray-700"
          >
            Details
          </label>
          <textarea
            name="details"
            id="details"
            rows={10}
            value={formData.details}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
            placeholder="Enter Details"
          />
        </div>

        <div>
          <label
            htmlFor="cvLink"
            className="block text-sm font-medium text-gray-700"
          >
            CV Link
          </label>
          <input
            type="text"
            name="cvLink"
            id="cvLink"
            value={formData.cvLink}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-purple-500 focus:ring-purple-500 sm:text-sm hover:shadow-xl"
            placeholder="Enter CV Link"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center px-6 py-3 text-base font-medium text-white transition duration-300 bg-purple-600 border border-transparent rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminIntro;
