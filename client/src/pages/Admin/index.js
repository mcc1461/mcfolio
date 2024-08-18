import React from "react";
import { Tabs } from "antd";
import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminContact from "./AdminContact";

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
      children: <AdminProjects />,
    },
    {
      key: "5",
      label: "Contact",
      children: <AdminContact />,
    },
  ];

  return (
    <main className="bg-mc-white">
      <Header />
      <div className="p-5 mx-auto mt-5 font-semibold lg:w-2/3 xl:w-2/3 xl2:w-1/2">
        <Tabs defaultActiveKey="5" items={items} />
      </div>
    </main>
  );
};

export default Admin;
