import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, message } from "antd";
import { setPortfolioData, showLoader } from "../../redux/rootSlice";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const { confirm } = Modal;

const AdminProject = () => {
  const dispatch = useDispatch();

  // Memoized selector for projects
  const selectPortfolioData = (state) => state.root.portfolioData;
  const selectProjects = createSelector(
    [selectPortfolioData],
    (portfolioData) => portfolioData?.projects || []
  );

  const projects = useSelector(selectProjects);
  const memoizedProjects = useMemo(() => projects, [projects]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [form] = Form.useForm(); // Move the form instance inside the component

  useEffect(() => {
    if (showEditModal) {
      if (selectedProject) {
        form.setFieldsValue(selectedProject);
      } else {
        form.resetFields();
      }
    }
  }, [showEditModal, selectedProject, form]);

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleDeleteClick = (project) => {
    confirm({
      title: "Are you sure you want to delete this project?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk: async () => {
        try {
          dispatch(showLoader(true));

          const response = await axios.delete(
            `http://localhost:8001/api/projects/${project._id}`
          );

          if (response.status === 200 && response.data.success) {
            message.success(response.data.message);
            getPortfolioData();
          } else {
            message.error("Failed to delete project.");
          }
        } catch (error) {
          message.error("Failed to delete project: " + error.message);
        } finally {
          dispatch(showLoader(false));
        }
      },
      onCancel() {},
    });
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedProject(null);
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));
      const url = selectedProject
        ? `http://localhost:8001/api/projects/${selectedProject._id}`
        : "http://localhost:8001/api/projects";

      const method = selectedProject ? "put" : "post";
      const response = await axios[method](url, values);

      if (
        response.status === 201 ||
        (response.status === 200 && response.data.success)
      ) {
        message.success(response.data.message);
        getPortfolioData();
        handleCloseModal();
      } else {
        message.error("Failed to save project.");
      }
    } catch (error) {
      message.error("Request failed: " + error.message);
    } finally {
      dispatch(showLoader(false));
    }
  };

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoader(true));
      const response = await axios.get("http://localhost:8001/api/portfolio");
      dispatch(setPortfolioData(response.data));
    } catch (error) {
      message.error("Failed to fetch portfolio data: " + error.message);
    } finally {
      dispatch(showLoader(false));
    }
  }, [dispatch]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  if (!memoizedProjects || memoizedProjects.length === 0) {
    return <p>No projects available</p>;
  }

  return (
    <>
      <div className="flex justify-end mb-5">
        <Button
          className="px-5 py-1 rounded-md bg-primary-700 text-mc-white"
          type="button"
          onClick={() => {
            setSelectedProject(null);
            form.resetFields();
            setShowEditModal(true);
          }}
        >
          Add Project
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 gap-4 border-spacing-1 ">
          {memoizedProjects.map((project) => (
            <div
              key={project._id}
              className="col-span-1 p-5 border-2 border-gray-700 rounded-lg shadow-rounded-lg shadow-gray-900"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-[50%] h-auto rounded-lg"
                />
              </div>
              <h1 className="text-2xl font-bold text-quaternary-900">
                {project.type}
              </h1>
              <hr className="h-[3px] bg-gray-800" />
              <h3 className="text-xl font-semibold text-quaternary-700">
                {project.title}
              </h3>
              <p className="text-justify">{project.desc}</p>

              <div className="relative my-2">
                <div
                  className="h-[3px] w-full bg-[length:12px_3px] bg-repeat-x"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 3px, red 1.5px, transparent 1.5px), radial-gradient(circle at 9px, blue 1.5px, transparent 1.5px)",
                  }}
                ></div>
              </div>

              <h1 className="italic font-bold text-md text-quaternary-900">
                Project Image Url:
                <span className="text-mc-blue-darker3"> {project.image}</span>
              </h1>
              <h3 className="font-semibold text-normal text-quaternary-700">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer" // Added rel attribute here
                  className="p-1 rounded-md bg-mc-blue text-mc-white"
                >
                  {`Project Link: ${project.link}`}
                </a>
              </h3>

              <div className="flex justify-end gap-3 mb-5">
                <Button
                  className="px-5 py-1 rounded-md bg-primary-700 text-mc-white"
                  type="button"
                  onClick={() => handleEditClick(project)}
                >
                  Edit
                </Button>
                <Button
                  className="px-3 py-1 bg-red-700 rounded-md text-mc-white"
                  type="button"
                  onClick={() => handleDeleteClick(project)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={selectedProject ? "Update Project" : "Add Project"}
        open={showEditModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          form={form} // Connect form instance here
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            id="type"
            name="type"
            label="Type"
            rules={[
              { required: true, message: "Please input the project type!" },
            ]}
            autoComplete="off"
          >
            <Input placeholder="Type" />
          </Form.Item>
          <Form.Item
            id="title"
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the project title!" },
            ]}
            autoComplete="off"
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            id="desc"
            name="desc"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the project description!",
              },
            ]}
            autoComplete="off"
          >
            <Input.TextArea placeholder="Description" rows={5} />
          </Form.Item>
          <Form.Item
            id="image"
            name="image"
            label="Project Image URL"
            rules={[
              {
                required: true,
                message: "Please input the project image URL!",
              },
            ]}
            autoComplete="off"
          >
            <Input placeholder="URL" />
          </Form.Item>
          <Form.Item
            id="link"
            name="link"
            label="Project Link"
            rules={[
              {
                required: true,
                message: "Please input the project link!",
              },
            ]}
            autoComplete="off"
          >
            <Input placeholder="Link" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="rounded-lg">
              {selectedProject ? "Update" : "Add"}
            </Button>
            <Button
              type="danger"
              htmlType="button"
              className="ml-4 rounded-lg"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminProject;
