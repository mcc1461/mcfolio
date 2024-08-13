import React from "react";
import Header from "../../components/Header";
import AdminAbout from "./AdminAbout";
import AdminIntro from "./AdminIntro";
import { Tabs } from "antd";

const { TabPane } = Tabs; // Correctly destructuring TabPane from Tabs

const Admin = () => {
  return (
    <main className="bg-mc-white">
      <Header />
      <div className="p-5 mt-5 font-semibold">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Intro" key="1">
            <AdminIntro />
          </TabPane>
          <TabPane tab="About" key="2">
            <AdminAbout />
          </TabPane>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
