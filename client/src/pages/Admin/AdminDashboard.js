import React, { useState } from "react";
import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import AdminExperiences from "./AdminExperiences";
import AdminProjects from "./AdminProjects";
import AdminContact from "./AdminContact";
import { useNavigate } from "react-router-dom";

// Custom Tabs Component
const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items[0].key);

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex justify-center mb-4 space-x-4">
        {items.map((item) => (
          <button
            key={item.key}
            className={`px-4 py-2 font-semibold transition-colors duration-300 rounded ${
              activeTab === item.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 bg-white border rounded shadow">
        {items.map((item) => (
          <div
            key={item.key}
            className={activeTab === item.key ? "block" : "hidden"}
          >
            {item.children}
          </div>
        ))}
      </div>
    </div>
  );
};

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
        <div className="text-center mt-28">
          <h1 className="text-4xl font-bold text-violet-700 drop-shadow-md">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg italic text-gray-500">
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
          <Tabs items={items} />
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
