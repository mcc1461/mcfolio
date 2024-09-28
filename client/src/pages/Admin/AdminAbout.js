import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../../redux/rootSlice";
import axios from "axios";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    desc1: "",
    desc2: "",
    desc3: "",
    desc4: "",
    skills: "",
  });

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (portfolioData?.abouts[0]) {
      setFormData(portfolioData.abouts[0]); // Populate form with data
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
      if (typeof formData.skills === "string") {
        const tempSkills = formData.skills
          .split(",")
          .map((skill) => skill.trim());
        formData.skills = tempSkills;
      }

      dispatch(showLoader(true));

      const token = localStorage.getItem("authToken");

      if (!token) {
        setAlertMessage("Authentication token is missing.");
        setAlertType("error");
        return;
      }

      const response = await axios.put(
        "http://localhost:8000/api/about",
        {
          ...formData,
          _id: portfolioData.abouts[0]._id, // Use correct ID for update
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token
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

  if (!portfolioData || !portfolioData.abouts[0]) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <form
        onSubmit={onFinish}
        className="max-w-4xl p-10 mx-auto space-y-8 rounded-lg shadow-2xl bg-gradient-to-r from-indigo-50 to-blue-50"
      >
        <h2 className="mb-6 text-3xl font-extrabold text-center text-violet-900">
          Manage About Section
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <label
              htmlFor="imageUrl"
              className="block font-medium text-violet-900 text-md"
            >
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block font-medium text-violet-900 text-md"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="desc1"
            className="block font-medium text-violet-900 text-md"
          >
            Description 1
          </label>
          <textarea
            name="desc1"
            id="desc1"
            rows={4}
            value={formData.desc1}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="desc2"
            className="block font-medium text-violet-900 text-md"
          >
            Description 2
          </label>
          <textarea
            name="desc2"
            id="desc2"
            rows={4}
            value={formData.desc2}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="desc3"
            className="block font-medium text-violet-900 text-md"
          >
            Description 3
          </label>
          <textarea
            name="desc3"
            id="desc3"
            rows={4}
            value={formData.desc3}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="desc4"
            className="block font-medium text-violet-900 text-md"
          >
            Description 4
          </label>
          <textarea
            name="desc4"
            id="desc4"
            rows={4}
            value={formData.desc4}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block font-medium text-violet-900 text-md"
          >
            Skills (comma-separated)
          </label>
          <textarea
            name="skills"
            id="skills"
            rows={2}
            value={formData.skills}
            onChange={handleInputChange}
            className="block w-full mt-1 transition duration-300 border-gray-300 rounded-lg shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:shadow-xl"
          />

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="inline-flex justify-center px-6 py-3 text-base font-medium text-white transition duration-300 border border-transparent rounded-md shadow-lg bg-violet-900 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700"
            >
              SAVE
            </button>
          </div>
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

export default AdminAbout;
