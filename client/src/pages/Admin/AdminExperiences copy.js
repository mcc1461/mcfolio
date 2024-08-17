import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, message } from "antd";
import { setPortfolioData, showLoader } from "../../redux/rootSlice";
import axios from "axios";

const AdminExperience = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root || {});
  const { experiences } = portfolioData || {};
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleEditClick = (experience) => {
    setSelectedExperience(experience);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (experience) => {
    try {
      dispatch(showLoader(true));
      await axios.delete(
        `http://localhost:8061/api/portfolio/data/experience/${experience._id}`
      );
      dispatch(showLoader(false));
      // Refresh the portfolio data after deletion
      getPortfolioData();
    } catch (error) {
      dispatch(showLoader(false));
      alert("Failed to delete experience: " + error.message);
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedExperience(null);
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));

      // **Ensure correct API URL is used**
      const response = await axios.post(
        "http://localhost:8061/api/portfolio/data/add-experience",
        {
          values,
        }
      );
      dispatch(showLoader(false));

      // **Correct success check**
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error("Request failed: " + error.message); // **Provide more detailed error messages**
    } finally {
      dispatch(showLoader(false));
    }
  };

  const getPortfolioData = async () => {
    try {
      dispatch(showLoader(true));
      const response = await axios.get("/api/portfolio/data");
      dispatch(setPortfolioData(response.data));
      dispatch(showLoader(false));
    } catch (error) {
      dispatch(showLoader(false));
      console.error("Failed to fetch portfolio data: ", error.message);
    }
  };

  if (!experiences || experiences.length === 0) {
    return <p>No experiences available</p>;
  }

  return (
    <>
      <div className="flex justify-end mb-5">
        <Button
          className="px-5 py-1 rounded-md bg-primary-700 text-mc-white"
          type="button"
          onClick={() => {
            setSelectedExperience(null);
            setShowEditModal(true);
          }}
        >
          Add Experience
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 border-spacing-1">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="col-span-1 p-5 border-2 border-gray-700 rounded-lg shadow-rounded-lg shadow-gray-900"
          >
            <h1 className="text-2xl font-bold text-quaternary-900">
              {experience.period}
            </h1>
            <hr className="h-[3px] bg-gray-800" />
            <h3 className="text-xl font-semibold text-quaternary-700">
              {experience.role}
            </h3>
            <p className="text-justify">{experience.desc}</p>
            <div className="font-semibold text-md text-quaternary-800">
              {experience.location.map((location, index) => (
                <p key={`${experience._id}-location-${index}`}>{location}</p>
              ))}
            </div>
            <div className="flex justify-end gap-3 mb-5">
              <Button
                className="px-5 py-1 rounded-md bg-primary-700 text-mc-white"
                type="button"
                onClick={() => handleEditClick(experience)}
              >
                Edit
              </Button>
              <Button
                className="px-3 py-1 bg-red-700 rounded-md text-mc-white"
                type="button"
                onClick={() => handleDeleteClick(experience)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={selectedExperience ? "Edit Experience" : "Add Experience"}
        open={showEditModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form
          layout="vertical"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 24 }}
          initialValues={selectedExperience}
          onFinish={onFinish}
        >
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please input the role!" }]}
          >
            <Input type="text" placeholder="Role" />
          </Form.Item>
          <Form.Item
            name="period"
            label="Period"
            rules={[{ required: true, message: "Please input the period!" }]}
          >
            <Input type="text" placeholder="Period" />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea type="text" placeholder="Description" rows={5} />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input type="text" placeholder="Location" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" className="rounded-lg">
              {selectedExperience ? "Update" : "Add"}
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

export default AdminExperience;
