import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux"; // **Combined import statement**
import { showLoader } from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

const AdminIntro = () => {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.intros) {
      console.log("Setting form fields with:", portfolioData.intros);
      form.setFieldsValue(portfolioData.intros[0]); // **Use correct data structure for form fields**
    }
  }, [portfolioData, form]);

  const onFinish = async (values) => {
    try {
      dispatch(showLoader(true));

      // **Ensure correct API URL is used**
      const response = await axios.post(
        "http://localhost:8061/api/portfolio/data/intro",
        {
          ...values,
          _id: portfolioData.intros[0]._id, // **Pass correct ID for updating the document**
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

  if (!portfolioData || !portfolioData.intros) {
    return <div>Loading...</div>; // **Ensure correct loading state display**
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
        <Form.Item
          name="welcomeText"
          className="form-item"
          label="Welcome Text"
        >
          <Input type="text" placeholder="Intro" />
        </Form.Item>
        <Form.Item name="firstName" className="form-item" label="First Name">
          <Input type="text" placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" className="form-item" label="Last Name">
          <Input type="text" placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="caption" className="form-item" label="Caption">
          <Input type="text" placeholder="Caption" />
        </Form.Item>
        <Form.Item name="description" className="form-item" label="Description">
          <Input.TextArea type="text" placeholder="Description" rows={3} />
        </Form.Item>
        <Form.Item name="details" className="form-item" label="Details">
          <Input.TextArea type="text" placeholder="Details" rows={10} />
        </Form.Item>
        <Form.Item className="flex justify-end w-1/2 pr-3 lg:w-full md:w-full sm:w-full">
          <div className="flex justify-end w-full gap-1 pr-1">
            <Button type="primary" htmlType="submit" className="rounded-lg ">
              SAVE
            </Button>
          </div>{" "}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminIntro;
