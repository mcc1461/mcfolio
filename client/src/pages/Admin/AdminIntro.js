import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.intros?.[0]) {
      form.setFieldsValue(portfolioData.intros[0]);
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));
      const response = await axios.put("http://localhost:8001/api/intro", {
        ...values,
        _id: portfolioData.intros[0]._id,
      });
      dispatch(showLoader(false));
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error("Request failed: " + error.message);
    }
  };

  if (!portfolioData || !portfolioData.intros?.[0]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:w-full md:w-full sm:w-full">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          id="welcomeText"
          label="Welcome Text"
          name="welcomeText"
          rules={[{ required: true, message: "Please enter welcome text" }]}
        >
          <Input id="welcomeText" placeholder="Intro" />
        </Form.Item>

        <Form.Item
          id="firstName"
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input id="firstName" placeholder="First Name" />
        </Form.Item>

        <Form.Item
          id="lastName"
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input id="lastName" placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          id="caption"
          label="Caption"
          name="caption"
          rules={[{ required: true, message: "Please enter caption" }]}
        >
          <Input id="caption" placeholder="Caption" />
        </Form.Item>

        <Form.Item
          id="description"
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea id="description" placeholder="Description" rows={3} />
        </Form.Item>

        <Form.Item
          id="details"
          label="Details"
          name="details"
          rules={[{ required: true, message: "Please enter details" }]}
        >
          <Input.TextArea id="details" placeholder="Details" rows={10} />
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
