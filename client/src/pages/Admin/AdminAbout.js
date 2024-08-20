import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../../redux/rootSlice";
import axios from "axios";

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.abouts[0]) {
      form.setFieldsValue(portfolioData.abouts[0]); // Ensure correct data structure for form fields
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",").map((skill) => skill.trim());
      values.skills = tempSkills;

      dispatch(showLoader(true));

      // Ensure correct API URL is used
      const response = await axios.put("http://localhost:8001/api/about", {
        ...values,
        _id: portfolioData.abouts[0]._id, // Pass correct ID for updating the document
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

  if (!portfolioData || !portfolioData.abouts[0]) {
    return <div>Loading...</div>; // Ensure correct loading state display
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
        <Form.Item name="imageUrl" className="form-item" label="Image Url">
          <Input type="text" placeholder="Image Url" />
        </Form.Item>
        <Form.Item name="title" className="form-item" label="Title">
          <Input type="text" placeholder="Title" />
        </Form.Item>
        <Form.Item name="desc1" className="form-item" label="Description 1">
          <Input.TextArea type="text" placeholder="Description 1" rows={5} />
        </Form.Item>
        <Form.Item name="desc2" className="form-item" label="Description 2">
          <Input.TextArea type="text" placeholder="Description 2" rows={5} />
        </Form.Item>
        <Form.Item name="desc3" className="form-item" label="Description 3">
          <Input.TextArea type="text" placeholder="Description 3" rows={5} />
        </Form.Item>
        <Form.Item name="desc4" className="form-item" label="Description 4">
          <Input.TextArea type="text" placeholder="Description 4" rows={5} />
        </Form.Item>
        <Form.Item name="skills" className="form-item" label="Skills">
          <Input.TextArea type="text" placeholder="Skills" rows={10} />
        </Form.Item>
        <Form.Item className="flex justify-end w-1/2 pr-3 lg:w-full md:w-full sm:w-full">
          <div className="flex justify-end w-full gap-1 pr-1">
            <Button type="primary" htmlType="submit" className="rounded-md">
              SAVE
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAbout;
