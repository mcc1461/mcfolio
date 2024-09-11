import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Modal, message } from "antd";
import { setPortfolioData, showLoader } from "../../redux/rootSlice";
import axios from "axios";

const { confirm } = Modal;

const AdminExperience = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // Memoize the experiences array
  const experiences = useSelector(
    (state) => state.root.portfolioData?.experiences || []
  );
  const memoizedExperiences = useMemo(() => experiences, [experiences]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  useEffect(() => {
    if (showEditModal) {
      if (selectedExperience) {
        // For editing, populate the form with the selected experience
        form.setFieldsValue({
          ...selectedExperience,
          location: selectedExperience.location.join(", "),
        });
      } else {
        form.resetFields();
      }
    }
  }, [showEditModal, selectedExperience, form]);

  const handleEditClick = (experience) => {
    setSelectedExperience(experience);
    setShowEditModal(true);
  };

  const handleDeleteClick = (experience) => {
    confirm({
      title: "Are you sure you want to delete this experience?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk: async () => {
        try {
          dispatch(showLoader(true));

          const response = await axios.delete(
            `http://localhost:8001/api/experiences/${experience._id}`
          );

          if (response.status === 200 && response.data.success) {
            message.success(response.data.message);
            getPortfolioData();
          } else {
            message.error("Failed to delete experience.");
          }
        } catch (error) {
          message.error("Failed to delete experience: " + error.message);
        } finally {
          dispatch(showLoader(false));
        }
      },
      onCancel() {},
    });
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedExperience(null);
    form.resetFields(); // Reset form fields after closing the modal
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));

      // Convert location back to an array
      values.location = values.location.split(",").map((loc) => loc.trim());

      const url = selectedExperience
        ? `http://localhost:8001/api/experiences/${selectedExperience._id}`
        : "http://localhost:8001/api/experiences";

      const method = selectedExperience ? "put" : "post";
      const response = await axios[method](url, values);

      if (
        response.status === 201 ||
        (response.status === 200 && response.data.success)
      ) {
        message.success(response.data.message);
        getPortfolioData();
        handleCloseModal();
      } else {
        message.error("Failed to save experience.");
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

  if (!memoizedExperiences || memoizedExperiences.length === 0) {
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
            form.resetFields();
            setShowEditModal(true);
          }}
        >
          Add Experience
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 border-spacing-1">
        {memoizedExperiences.map((experience) => (
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
        title={selectedExperience ? "Update Experience" : "Add Experience"}
        open={showEditModal}
        onCancel={handleCloseModal}
        footer={null}
        afterClose={() => form.resetFields()} // Reset form fields after modal is closed
      >
        {showEditModal && (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              id="role"
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please input the role!" }]}
            >
              <Input placeholder="Role" />
            </Form.Item>
            <Form.Item
              id="period"
              name="period"
              label="Period"
              rules={[{ required: true, message: "Please input the period!" }]}
            >
              <Input placeholder="Period" />
            </Form.Item>
            <Form.Item
              id="desc"
              name="desc"
              label="Description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea placeholder="Description" rows={5} />
            </Form.Item>
            <Form.Item
              id="location"
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please input the location!" },
              ]}
            >
              <Input placeholder="Location" />
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
        )}
      </Modal>
    </>
  );
};

export default AdminExperience;
