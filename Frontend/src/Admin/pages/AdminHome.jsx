import React, { useState } from "react";
import AllTasks from "./AllTasks";
import AllEmployees from "./AllEmployees";
import AllGroups from "./AllGroups";
import CompletedTasks from "./CompletedTasks";
import Sidebar from "../components/Home/Sidebar";


const AdminHome = () => {
  const [selectedSection, setSelectedSection] = useState("AllTasks");

  const renderSection = () => {
    switch (selectedSection) {
      case "AllTasks":
        return <AllTasks />;
      case "AllEmployees":
        return <AllEmployees />;
      case "AllGroups":
        return <AllGroups />;
      case "CompletedTasks":
        return <CompletedTasks />;
      default:
        return <AllTasks />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onSelectSection={setSelectedSection} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 border rounded border-black-1000">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminHome;
