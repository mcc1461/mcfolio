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
        <Tabs
          defaultActiveKey="1"
          items={items}
          centered
          size="large"
          type="card"
          tabBarGutter={10}
          tabBarStyle={{
            backgroundColor: "#99aab5",
            padding: "7px",
            borderRadius: "7px",
          }}
          tabPosition="top"
          className="bg-mc-white custom-tabs"
        />
      </div>
    </main>
  );
};

export default Admin;
