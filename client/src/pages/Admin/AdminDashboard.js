import React from "react";
import { Tabs } from "antd";
import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminContact from "./AdminContact";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin-login");
  };

  return (
    <main className="min-h-screen bg-mc-white">
      <Header />
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="mt-10 text-center">
          <h1 className="text-4xl font-bold text-gray-700">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-500">
            Manage your portfolio sections
          </p>
        </div>

        <div className="flex flex-wrap justify-center mt-8 -mx-2">
          <div className="px-2 mb-2">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-white bg-blue-600 rounded w-fit hover:bg-blue-900"
            >
              Homepage
            </button>
          </div>
          <div className="px-2 mb-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-600 rounded w-fit hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="p-5 mx-auto mt-5 font-semibold">
          <Tabs
            defaultActiveKey="1"
            items={items}
            centered
            size="large"
            type="button"
            tabPosition="top"
            className="bg-mc-white custom-tabs responsive-tabs responsive-gutter"
          />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
