import React from "react";
import { DatePicker, Button } from "antd";

const AdminAbout = () => {
  return (
    <>
      <div>AdminAbout</div>
      <div className="text-white">
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </div>
      <div className="text-white">
        MCC © {new Date().getFullYear()} | All Rights Reserved
      </div>
    </>
  );
};

export default AdminAbout;
