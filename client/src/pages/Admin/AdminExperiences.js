import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolioData, showLoader } from "../../redux/rootSlice";
import { selectMemoizedExperiences } from "../../redux/selectors"; // Import the memoized selector
import axios from "axios";

const AdminExperience = () => {
  const dispatch = useDispatch();

  // Use the memoized experiences from the new selector
  const experiences = useSelector(selectMemoizedExperiences);

  const [formData, setFormData] = useState({
    role: "",
    period: "",
    desc: "",
    location: "",
    order: 0,
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [experienceToDelete, setExperienceToDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (showEditModal) {
      if (selectedExperience) {
        setFormData({
          ...selectedExperience,
          location: selectedExperience.location.join(", "),
        });
      } else {
        setFormData({
          role: "",
          period: "",
          desc: "",
          location: "",
          order: 0,
        });
      }
    }
  }, [showEditModal, selectedExperience]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "order" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoader(true));

      const values = {
        ...formData,
        location: formData.location.split(",").map((loc) => loc.trim()),
      };

      const token = localStorage.getItem("authToken");
      console.log(token);

      const url = selectedExperience
        ? `https://musco.dev/api/experiences/${selectedExperience._id}`
        : `https://musco.dev/api/experiences`;

      const method = selectedExperience ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.status === 201 ||
        (response.status === 200 && response.data.success)
      ) {
        setAlertMessage(response.data.message);
        setAlertType("success");
        getPortfolioData();
        setShowEditModal(false);
      } else {
        setAlertMessage("Failed to save experience.");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage(
        "Request failed: " + (error.response?.data?.message || error.message)
      );
      setAlertType("error");
      console.log(error.response?.data?.message || error.message);
    } finally {
      dispatch(showLoader(false));
    }
  };

  function handleEditClick(experience) {
    setSelectedExperience(experience);
    setFormData({
      ...experience,
      location: experience.location.join(", "),
    });
    setShowEditModal(true);
  }

  const handleAddClick = () => {
    setSelectedExperience(null);
    setFormData({
      role: "",
      period: "",
      desc: "",
      location: "",
      order: 0,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (experience) => {
    setExperienceToDelete(experience);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      dispatch(showLoader(true));

      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://musco.dev/api/experiences/${experienceToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.success) {
        setAlertMessage(response.data.message);
        setAlertType("success");
        getPortfolioData();
      } else {
        setAlertMessage("Failed to delete experience.");
        setAlertType("error");
      }
    } catch (error) {
      setAlertMessage("Failed to delete experience: " + error.message);
      setAlertType("error");
    } finally {
      dispatch(showLoader(false));
      setShowConfirmModal(false);
      setExperienceToDelete(null);
    }
  };

  const cancelDelete = () => {
    setExperienceToDelete(null);
    setShowConfirmModal(false);
  };

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoader(true));
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api/portfolio",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setPortfolioData(response.data));
    } catch (error) {
      setAlertMessage("Failed to fetch portfolio data: " + error.message);
      setAlertType("error");
    } finally {
      dispatch(showLoader(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  return (
    <>
      {/* Alert message */}
      {alertMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            alertType === "success"
              ? "bg-green-100 text-green-700"
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
      <h2 className="mb-6 text-3xl font-extrabold text-center text-violet-900">
        Manage Experiences Section
      </h2>
      {/* Add Experience Button */}
      <div className="flex justify-end mb-5">
        <button
          className="px-5 py-2 text-white rounded-md bg-violet-900 hover:bg-violet-700"
          type="button"
          onClick={handleAddClick}
        >
          Add Experience
        </button>
      </div>

      {/* Experiences list */}
      <div className="grid grid-cols-1 gap-4">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="p-5 bg-white border rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-bold text-red-700">
              {experience.period}
            </h1>
            <hr className="my-2" />
            <h3 className="text-xl font-semibold text-blue-900">
              {experience.role}
            </h3>
            <p className="mt-2 text-gray-600">{experience.desc}</p>
            <div className="mt-2 text-orange-700">
              {experience.location.map((loc, index) => (
                <p key={`${experience._id}-location-${index}`}>{loc}</p>
              ))}
            </div>
            <p className="mt-2 italic text-gray-300">
              Order: {experience.order}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleEditClick(experience)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => handleDeleteClick(experience)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Experience Modal */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              aria-hidden="true"
              onClick={() => setShowEditModal(false)}
            ></div>

            {/* Modal content */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-lg overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
              <div className="px-6 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <h2 className="mb-4 text-2xl font-bold">
                  {selectedExperience ? "Update Experience" : "Add Experience"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="role"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="block w-full mt-1 bg-blue-100 border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Role"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="period"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Period
                    </label>
                    <input
                      type="text"
                      name="period"
                      id="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      required
                      className="block w-full mt-1 bg-blue-100 border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Period"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      name="desc"
                      id="desc"
                      value={formData.desc}
                      onChange={handleInputChange}
                      required
                      className="block w-full mt-1 bg-blue-100 border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Description"
                      rows={5}
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="block w-full mt-1 bg-blue-100 border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Location"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="order"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      id="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      required
                      className="block w-full mt-1 bg-blue-100 border-gray-500 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Order"
                    />
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      {selectedExperience ? "Update" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              aria-hidden="true"
              onClick={cancelDelete}
            ></div>

            {/* Modal content */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle">
              <div className="px-6 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <h2 className="mb-4 text-xl font-bold">Confirm Delete</h2>
                <p className="mb-4">
                  Are you sure you want to delete this experience? <br /> This
                  action cannot be undone.
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={confirmDelete}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminExperience;
