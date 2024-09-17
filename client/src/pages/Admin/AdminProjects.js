import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPortfolioData, showLoader } from "../../redux/rootSlice";
import axios from "axios";

const AdminProject = () => {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state) => state.root.portfolioData?.projects || []
  );

  // Sort projects by order
  const memoizedProjects = useMemo(
    () => [...projects].sort((a, b) => a.order - b.order),
    [projects]
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    desc: "",
    image: "",
    link: "",
    order: 0, // Added order field
  });
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    if (showEditModal) {
      if (selectedProject) {
        setFormData(selectedProject);
      } else {
        setFormData({
          type: "",
          title: "",
          desc: "",
          image: "",
          link: "",
          order: 0, // Reset order field
        });
      }
    }
  }, [showEditModal, selectedProject]);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (project) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        dispatch(showLoader(true));
        const token = localStorage.getItem("authToken");
        const response = await axios.delete(
          `http://localhost:8001/api/projects/${project._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200 && response.data.success) {
          setAlert({
            message: "Project deleted successfully.",
            type: "success",
          });
          getPortfolioData();
        } else {
          setAlert({ message: "Failed to delete project.", type: "error" });
        }
      } catch (error) {
        setAlert({ message: `Error: ${error.message}`, type: "error" });
      } finally {
        dispatch(showLoader(false));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoader(true));
      const token = localStorage.getItem("authToken");

      const url = selectedProject
        ? `http://localhost:8001/api/projects/${selectedProject._id}`
        : "http://localhost:8001/api/projects";
      const method = selectedProject ? "put" : "post";

      const response = await axios({
        method,
        url,
        data: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (
        response.status === 201 ||
        (response.status === 200 && response.data.success)
      ) {
        setAlert({ message: "Project saved successfully.", type: "success" });
        getPortfolioData();
        setShowEditModal(false);
      } else {
        setAlert({ message: "Failed to save project.", type: "error" });
      }
    } catch (error) {
      setAlert({ message: `Error: ${error.message}`, type: "error" });
    } finally {
      dispatch(showLoader(false));
    }
  };

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoader(true));
      const token = localStorage.getItem("authToken");

      const response = await axios.get("http://localhost:8001/api/portfolio", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setPortfolioData(response.data));
    } catch (error) {
      setAlert({ message: `Error: ${error.message}`, type: "error" });
    } finally {
      dispatch(showLoader(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  return (
    <>
      {/* Alert Message */}
      {alert.message && (
        <div
          className={`p-4 mb-4 text-sm rounded ${
            alert.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span>{alert.message}</span>
          <button
            onClick={() => setAlert({ message: "", type: "" })}
            className="float-right text-lg font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {/* Add Project Button */}
      <div className="flex justify-end mb-5">
        <button
          className="px-5 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          type="button"
          onClick={() => {
            setSelectedProject(null);
            setFormData({
              type: "",
              title: "",
              desc: "",
              image: "",
              link: "",
              order: 0, // Reset order field
            });
            setShowEditModal(true);
          }}
        >
          Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {memoizedProjects.map((project) => (
          <div
            key={project._id}
            className="p-5 bg-white border rounded-lg shadow-lg"
          >
            <div className="flex justify-center mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-[50%] h-auto rounded-lg"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{project.type}</h1>
            <hr className="my-2" />
            <h3 className="text-xl font-semibold text-gray-700">
              {project.title}
            </h3>
            <p className="mt-2 text-gray-600">{project.desc}</p>
            <p className="mt-2 text-gray-500">Order: {project.order}</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleEditClick(project)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => handleDeleteClick(project)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Project Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-2xl font-bold">
                {selectedProject ? "Update Project" : "Add Project"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    required
                    autoComplete="off"
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    autoComplete="off"
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="desc"
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({ ...formData, desc: e.target.value })
                    }
                    required
                    autoComplete="off"
                    className="block w-full mt-1 border-gray-300 rounded-md"
                    rows={4}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    required
                    autoComplete="off"
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="link"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    required
                    autoComplete="off"
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="order"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value),
                      })
                    }
                    required
                    autoComplete="off"
                    className="block w-full mt-1 border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 mr-2 text-white bg-gray-500 rounded-md"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    {selectedProject ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProject;
