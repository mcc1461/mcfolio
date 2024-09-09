import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../../redux/rootSlice";
import axios from "axios";

const AdminContact = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);

  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.contacts[0]) {
      form.setFieldsValue(portfolioData.contacts[0]);
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));

      // Send a PUT request to update the contact data
      const response = await axios.put("/api/contact", {
        ...values,
        _id: portfolioData?.contacts[0]._id,
      });

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Request failed: " + error.message);
    } finally {
      dispatch(showLoader(false));
    }
  };

  if (!portfolioData || !portfolioData?.contacts[0]) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:w-full md:w-full sm:w-full">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item name="videoUrl" className="form-item" label="Video URL">
          <Input type="text" placeholder="Video URL" />
        </Form.Item>
        <Form.Item name="name" className="form-item" label="Name">
          <Input type="text" placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="linkedinUrl"
          className="form-item"
          label="LinkedIn URL"
        >
          <Input type="text" placeholder="LinkedIn URL" />
        </Form.Item>
        <Form.Item name="expertise" className="form-item" label="Expertise">
          <Input type="text" placeholder="Expertise" />
        </Form.Item>
        <Form.Item name="email" className="form-item" label="Email">
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="location" className="form-item" label="Location">
          <Input type="text" placeholder="Location" />
        </Form.Item>
        <Form.Item className="flex justify-end w-1/2 pr-3 lg:w-full md:w-full sm:w-full">
          <div className="flex justify-end w-full gap-1 pr-1">
            <Button type="primary" htmlType="submit" className="rounded-lg">
              SAVE
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminContact;
