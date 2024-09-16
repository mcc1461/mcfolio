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
      form.setFieldsValue(portfolioData.abouts[0]); // Populate form with data
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      // Ensure skills is a string before splitting
      if (typeof values.skills === "string") {
        const tempSkills = values.skills
          .split(",")
          .map((skill) => skill.trim());
        values.skills = tempSkills;
      } else if (Array.isArray(values.skills)) {
        // If it's already an array, use it as is
        values.skills = values.skills.map((skill) => skill.trim());
      }

      dispatch(showLoader(true));

      // Get token from localStorage (or Redux if needed)
      const token = localStorage.getItem("authToken");

      if (!token) {
        message.error("Authentication token is missing.");
        return;
      }

      // Make the PUT request with the Bearer token in the headers
      const response = await axios.put(
        "http://localhost:8001/api/about",
        {
          ...values,
          _id: portfolioData.abouts[0]._id, // Use correct ID for update
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token
          },
        }
      );

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
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="lg:w-full md:w-full sm:w-full xl:w-[200%] xl2:w-[200%]">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item
          id="imageUrl"
          name="imageUrl"
          className="form-item"
          label="Image Url"
          autoComplete="off"
        >
          <Input type="text" placeholder="Image Url" />
        </Form.Item>
        <Form.Item id="title" name="title" className="form-item" label="Title">
          <Input type="text" placeholder="Title" />
        </Form.Item>
        <Form.Item
          id="desc1"
          name="desc1"
          className="form-item"
          label="Description 1"
          autoComplete="off"
        >
          <Input.TextArea type="text" placeholder="Description 1" rows={5} />
        </Form.Item>
        <Form.Item
          id="desc2"
          name="desc2"
          className="form-item"
          label="Description 2"
          autoComplete="off"
        >
          <Input.TextArea type="text" placeholder="Description 2" rows={5} />
        </Form.Item>
        <Form.Item
          id="desc3"
          name="desc3"
          className="form-item"
          label="Description 3"
          autoComplete="off"
        >
          <Input.TextArea type="text" placeholder="Description 3" rows={5} />
        </Form.Item>
        <Form.Item
          id="desc4"
          name="desc4"
          className="form-item"
          label="Description 4"
          autoComplete="off"
        >
          <Input.TextArea type="text" placeholder="Description 4" rows={5} />
        </Form.Item>
        <Form.Item
          id="skills"
          name="skills"
          className="form-item"
          label="Skills"
          autoComplete="off"
        >
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
