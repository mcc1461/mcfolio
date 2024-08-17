import React from "react";
import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import { Tabs } from "antd";
import AdminExperiences from "./AdminExperiences";

const Admin = () => {
  const items = [
    {
      key: "1",
      label: "Intro",
      children: <AdminIntro />,
    },
    {
      key: "2",
      label: "About",
      children: <AdminAbout />,
    },
    {
      key: "3",
      label: "Experiences",
      children: <AdminExperiences />,
    },
    {
      key: "4",
      label: "Projects",
      children: <AdminExperiences />,
    },
  ];

  return (
    <main className="bg-mc-white">
      <Header />
      <div className="p-5 mt-5 font-semibold">
        <Tabs defaultActiveKey="3" items={items} />
      </div>
    </main>
  );
};

export default Admin;
