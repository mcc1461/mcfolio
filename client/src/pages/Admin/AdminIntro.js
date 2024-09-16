import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { showLoader } from "../../redux/rootSlice";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.intros?.[0]) {
      form.setFieldsValue(portfolioData.intros[0]); // Populate the form with intro data
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));

      // Get token from Redux or any other place where it's stored
      const token = localStorage.getItem("authToken"); // Adjust this line based on your token storage

      const response = await axios.put(
        "http://localhost:8001/api/intro",
        {
          ...values,
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
        message.success("Intro updated successfully.");
      } else {
        message.error(response.data.message || "Failed to update intro.");
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error(`Request failed: ${error.message}`);
    }
  };

  if (!portfolioData || !portfolioData.intros?.[0]) {
    return <div>Loading...</div>; // Show loading state if data is not available
  }

  return (
    <div className="lg:w-full md:w-full sm:w-full">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Welcome Text"
          name="welcomeText"
          rules={[{ required: true, message: "Please enter welcome text" }]}
        >
          <Input placeholder="Enter Welcome Text" />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ required: true, message: "Please enter caption" }]}
        >
          <Input placeholder="Enter Caption" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea placeholder="Enter Description" rows={3} />
        </Form.Item>

        <Form.Item
          label="Details"
          name="details"
          rules={[{ required: true, message: "Please enter details" }]}
        >
          <Input.TextArea placeholder="Enter Details" rows={10} />
        </Form.Item>

        <Form.Item label="CV Link" name="cvLink">
          <Input type="text" placeholder="Enter CV Link" />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button type="primary" htmlType="submit" className="rounded-lg">
            SAVE
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminIntro;
