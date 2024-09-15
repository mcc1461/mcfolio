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
      <div className="container px-4 mx-auto">
        <div className="mt-10 text-center">
          <h1 className="text-4xl font-bold text-gray-700">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-500">
            Manage your portfolio sections
          </p>
        </div>

        {/* Updated button container */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 sm:gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 mb-2 text-white bg-blue-600 rounded hover:bg-blue-900 sm:mb-0"
          >
            Return to Homepage
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 mb-2 text-white bg-red-600 rounded hover:bg-red-700 sm:mb-0"
          >
            Logout
          </button>
        </div>

        <div className="flex-wrap p-5 mx-auto mt-5 font-semibold lg:w-2/3 xl:w-2/3 xl2:w-1/2">
          <Tabs
            defaultActiveKey="1"
            items={items}
            centered
            size="large"
            type="button"
            tabBarGutter={10}
            tabBarStyle={{
              padding: "7px",
              borderRadius: "7px",
            }}
            tabPosition="top"
            className="bg-mc-white custom-tabs responsive-tabs"
          />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
